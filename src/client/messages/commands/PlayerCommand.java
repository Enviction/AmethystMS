package client.messages.commands;

//import client.MapleInventory;
//import client.MapleInventoryType;
import client.inventory.Item;
import server.RankingWorker;
import client.MapleCharacter;
import constants.ServerConstants.PlayerGMRank;
import client.MapleClient;
import client.MapleStat;
import client.PlayerStats;
import client.SkillFactory;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.messages.MessageType;
import client.messages.commands.CommandExecute.TradeExecute;
import constants.GameConstants;
import constants.ServerConstants;
import handling.channel.ChannelServer;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import scripting.NPCScriptManager;
import server.ItemInformation;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.Randomizer;
import server.RankingWorker.RankingInformation;
import server.Timer.EtcTimer;
import server.life.ChangeableStats;
import server.life.Element;
import server.life.ElementalEffectiveness;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;


import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.FileoutputUtil;
import tools.StringUtil;
import tools.packet.CWvsContext;

/**
 *
 * @author Emilyx3
 */
public class PlayerCommand {

    public static PlayerGMRank getPlayerLevelRequired() {
        return PlayerGMRank.NORMAL;
    }

    public static class STR extends DistributeStatCommands {

        public STR() {
            stat = MapleStat.STR;
        }
    }

    public static class DEX extends DistributeStatCommands {

        public DEX() {
            stat = MapleStat.DEX;
        }
    }

    public static class INT extends DistributeStatCommands {

        public INT() {
            stat = MapleStat.INT;
        }
    }

    public static class LUK extends DistributeStatCommands {

        public LUK() {
            stat = MapleStat.LUK;
        }
    }

    public abstract static class DistributeStatCommands extends CommandExecute {

        protected MapleStat stat = null;

        private void setStat(MapleCharacter player, int amount) {
            switch (stat) {
                case STR:
                    player.getStat().setStr((short) amount, player);
                    player.updateSingleStat(MapleStat.STR, player.getStat().getStr());
                    break;
                case DEX:
                    player.getStat().setDex((short) amount, player);
                    player.updateSingleStat(MapleStat.DEX, player.getStat().getDex());
                    break;
                case INT:
                    player.getStat().setInt((short) amount, player);
                    player.updateSingleStat(MapleStat.INT, player.getStat().getInt());
                    break;
                case LUK:
                    player.getStat().setLuk((short) amount, player);
                    player.updateSingleStat(MapleStat.LUK, player.getStat().getLuk());
                    break;
            }
        }

        private int getStat(MapleCharacter player) {
            switch (stat) {
                case STR: return player.getStat().getStr();
                case DEX: return player.getStat().getDex();
                case INT: return player.getStat().getInt();
                case LUK: return player.getStat().getLuk();
                default:  throw new RuntimeException(); //Will never happen.
            }
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            int change = 0;
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            if (change == 0) {
                c.getPlayer().dropMessage(5, "You must enter a number greater than 0 to add AP, or less than to remove AP with an AP Reset."); 
               
                return 0;
            }
            if (change < 0){ // NEED TO MODIFY THIS TO ACCEPT AP RESET SCROLLS. ITEM ID 5050000
                if(c.getPlayer().haveItem(5050000, Math.abs(change))){
                    if((getStat(c.getPlayer()) - Math.abs(change)) < 4){
                        c.getPlayer().dropMessage(5, "Your stat can not go below 4.");
                        return 0;
                    }
                    setStat(c.getPlayer(), getStat(c.getPlayer()) - Math.abs(change));
                    c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() + Math.abs(change)));
                    c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
                    c.getPlayer().dropMessage(5, StringUtil.makeEnumHumanReadable(stat.name()) + " has been lowered by " + Math.abs(change) + ".");
                    c.getPlayer().removeItem(5050000, change);
                    return 1;
                } else {
                    c.getPlayer().dropMessage(5, "You don't have enough AP Reset for that.");
                    return 1;
                }
            }
            if (c.getPlayer().getRemainingAp() < change) {
                c.getPlayer().dropMessage(5, "You don't have enough AP for that.");
                return 0;
            }
            setStat(c.getPlayer(), getStat(c.getPlayer()) + change);
            c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() - change));
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
            c.getPlayer().dropMessage(5, StringUtil.makeEnumHumanReadable(stat.name()) + " has been raised by " + change + ".");
            return 1;
        }
    }
    
    public static class hp extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            int change = 0;
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            if (change <= 0) {
                c.getPlayer().dropMessage(5, "You must enter a number greater than 0.");
                return 0;
            }
            if (c.getPlayer().getRemainingAp() < change) {
                c.getPlayer().dropMessage(5, "You don't have enough AP for that.");
                return 0;
            }
            int job = c.getPlayer().getJob();
            final PlayerStats stat = c.getPlayer().getStat();
            int maxhp = stat.getMaxHp();
            int oldhp = maxhp;
            for(int i=0;i<change;i++){
                if (GameConstants.isBeginnerJob(job)) { // Beginner
                    maxhp += Randomizer.rand(8, 12);
                } else if ((job >= 100 && job <= 132) || (job >= 3200 && job <= 3212) || (job >= 1100 && job <= 1112) || (job >= 3100 && job <= 3112)) { // Warrior
                    maxhp += Randomizer.rand(36, 42);
                } else if ((job >= 200 && job <= 232) || (GameConstants.isEvan(job))) { // Magician
                    maxhp += Randomizer.rand(10, 20);
                } else if ((job >= 300 && job <= 322) || (job >= 400 && job <= 434) || (job >= 1300 && job <= 1312) || (job >= 1400 && job <= 1412) || (job >= 3300 && job <= 3312) || (job >= 2300 && job <= 2312)) { // Bowman
                    maxhp += Randomizer.rand(16, 20);
                } else if ((job >= 510 && job <= 512) || (job >= 1510 && job <= 1512)) {
                    maxhp += Randomizer.rand(28, 32);
                } else if ((job >= 500 && job <= 532) || (job >= 3500 && job <= 3512) || job == 1500) { // Pirate
                    maxhp += Randomizer.rand(18, 22);
                } else if (job >= 1200 && job <= 1212) { // Flame Wizard
                    maxhp += Randomizer.rand(15, 21);
                } else if (job >= 2000 && job <= 2112) { // Aran
                    maxhp += Randomizer.rand(38, 42);
                } else { // GameMaster
                    maxhp += Randomizer.rand(50, 100);
                }
                if(c.getPlayer().getHcMode() == 1){
                    int hpDiff = maxhp - oldhp;
                    maxhp += (hpDiff * (GameConstants.hpMultiplier - 1));
                }
                c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() + 1));
                stat.setMaxHp(maxhp, c.getPlayer());
                c.getPlayer().updateSingleStat(MapleStat.MAXHP, (int) maxhp);
            }
                c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() - change));
                c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
            return 1;
        }
    }

    public static class mp extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            int change = 0;
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(5, "Invalid number entered.");
                return 0;
            }
            //no negatives, too buggy
            if (change <= 0 /*&& c.getPlayer().getItemQuantity(5050000, true) < Math.abs(change)*/) {
                c.getPlayer().dropMessage(5, "You must enter a positive number.");
                return 0;
            }
            if(change <= 0 && c.getPlayer().getStat().getMaxMp() <= 500){
                c.getPlayer().dropMessage(MessageType.ERROR, "You must have at least 500 MP to do that.");
                return 0;
            }
            if (change > 0 && c.getPlayer().getRemainingAp() < change) {
                c.getPlayer().dropMessage(5, "You don't have enough AP for that.");
                return 0;
            }
            int job = c.getPlayer().getJob();
            final PlayerStats stat = c.getPlayer().getStat();
            int maxmp = stat.getMaxMp();
            int oldhp = maxmp;
            int apResetConsumed = 0;
            for(int i=0;i<Math.abs(change);i++){
                if (GameConstants.isBeginnerJob(job)) { // Beginner
                    maxmp += Randomizer.rand(8, 12);
                } else if ((job >= 100 && job <= 132) || (job >= 3200 && job <= 3212) || (job >= 1100 && job <= 1112) || (job >= 3100 && job <= 3112)) { // Warrior
                    maxmp += Randomizer.rand(36, 42);
                } else if ((job >= 200 && job <= 232) || (GameConstants.isEvan(job))) { // Magician
                    maxmp += Randomizer.rand(10, 20);
                } else if ((job >= 300 && job <= 322) || (job >= 400 && job <= 434) || (job >= 1300 && job <= 1312) || (job >= 1400 && job <= 1412) || (job >= 3300 && job <= 3312) || (job >= 2300 && job <= 2312)) { // Bowman
                    maxmp += Randomizer.rand(16, 20);
                } else if ((job >= 510 && job <= 512) || (job >= 1510 && job <= 1512)) {
                    maxmp += Randomizer.rand(28, 32);
                } else if ((job >= 500 && job <= 532) || (job >= 3500 && job <= 3512) || job == 1500) { // Pirate
                    maxmp += Randomizer.rand(18, 22);
                } else if (job >= 1200 && job <= 1212) { // Flame Wizard
                    maxmp += Randomizer.rand(15, 21);
                } else if (job >= 2000 && job <= 2112) { // Aran
                    maxmp += Randomizer.rand(38, 42);
                } else { // GameMaster
                    maxmp += Randomizer.rand(50, 100);
                }
                if(c.getPlayer().getHcMode() == 1){
                    int hpDiff = maxmp - stat.getMaxMp();
                    maxmp += (hpDiff * (GameConstants.hpMultiplier - 1));
                }
                int mpDiff = maxmp - stat.getMaxMp();
                if(change < 0){
                    if(c.getPlayer().getHpApUsed() >= Math.abs(change)){
                        if(c.getPlayer().getStat().getMaxMp() <= 500){
                            c.getPlayer().dropMessage(MessageType.ERROR, "Reset failed: The minimum MP is 500.");
                        } else {
                            mpDiff *= -1;
                            maxmp += (2 * mpDiff);
                            c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() - 1));
                            apResetConsumed++;
                        }
                    } else {
                        maxmp = stat.getMaxMp();
                        c.getPlayer().dropMessage(MessageType.ERROR, "You do not have sufficient points invested in HP or MP to do that.");
                    }
                } else {
                    c.getPlayer().setHpApUsed((short) (c.getPlayer().getHpApUsed() + 1));
                }
                stat.setMaxMp(maxmp, c.getPlayer());
                c.getPlayer().updateSingleStat(MapleStat.MAXMP, (int) maxmp);
            }
            if(apResetConsumed > 0){
                c.getPlayer().removeItem(5050000, -apResetConsumed);
            }
            if(change > 0 || (change < 0 && (apResetConsumed > 0))){
                c.getPlayer().setRemainingAp((short) (c.getPlayer().getRemainingAp() - change));
            }
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
            return 1;
        }
    }
    
    public static class Online extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            //
            c.getPlayer().dropMessage(MessageType.SYSTEM, "Online characters: ");
            for(ChannelServer ch : ChannelServer.getAllInstances()){
                StringBuilder sb = new StringBuilder("Channel ");
                sb.append(Integer.toString(ch.getChannel()));
                sb.append(": ");
                for(MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()){
                    if(chr != null && chr.getClient().getLoginState() == MapleClient.LOGIN_LOGGEDIN && 
                            chr.getCData(chr, GameConstants.ONLINE_TOGGLE_DISPLAY) == 0 && !chr.isGM()){
                        sb.append(chr.getName());
                        sb.append(", ");
                    }
                }
                c.getPlayer().dropMessage(MessageType.SYSTEM, sb.toString());
            }
            return 1;
        }
    }
    
    public static class ToggleOnline extends CommandExecute {
        public int execute(MapleClient c, String[] splitted){
            if(c.getPlayer().getCData(c.getPlayer(), GameConstants.ONLINE_TOGGLE_DISPLAY) == 1){
                c.getPlayer().setCData(GameConstants.ONLINE_TOGGLE_DISPLAY, -1);
                c.getPlayer().dropMessage(MessageType.SYSTEM, "You will now show up in the list of online players.");
            } else {
                c.getPlayer().setCData(GameConstants.ONLINE_TOGGLE_DISPLAY, 1);
                c.getPlayer().dropMessage(MessageType.SYSTEM, "You will no longer show up in the list of online players.");
            }
            return 1;
        }
    }

    public static class Stats extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            c.getPlayer().dropMessage(6, "Extra stats for character ID " + c.getPlayer().getName() + ":");
            c.getPlayer().dropMessage(6, "Base HP: " + c.getPlayer().getStat().getMaxHp());
            c.getPlayer().dropMessage(6, "Base MP: " + c.getPlayer().getStat().getMaxMp());
            c.getPlayer().dropMessage(6, "EXP/Meso/Drop Rate: " + c.getPlayer().getStat().getExpBuff()  + "% / " + c.getPlayer().getStat().getMesoBuff() + "% / " + c.getPlayer().getStat().getDropBuff() + "%");
            c.getPlayer().dropMessage(6, "Physical Attack Total: " + c.getPlayer().getStat().getTotalWatk());
            c.getPlayer().dropMessage(6, "Magical Attack Total: " + c.getPlayer().getStat().getTotalMagic());
            c.getPlayer().dropMessage(6, "Boss Damage Total: " + (int)Math.floor(c.getPlayer().getStat().bossdam_r) + "%");
            c.getPlayer().dropMessage(6, "Ignore Enemy DEF Total: " + Math.round(c.getPlayer().getStat().ignoreTargetDEF) + "%");
            //c.getPlayer().dropMessage(6, "Accuracy (Please Ignore, may be wrong): " + c.getPlayer().getStat().getAccuracy());
            return 1;
        }
    }
    
    public static class Exp extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            long expCurrent = (long)(c.getPlayer().getExp() / GameConstants.getAbove200ExpMultiplier(c.getPlayer().getLevel()));
            long expToLevel = (long)(GameConstants.getExpNeededForLevel(c.getPlayer().getLevel()) / GameConstants.getAbove200ExpMultiplier(c.getPlayer().getLevel()));
            long expDiff = expToLevel - expCurrent;
            if(c.getPlayer().getLevel() == 250){
                expCurrent = 0;
                expToLevel = 0;
                expDiff = 0;
                c.getPlayer().setExp(0);
            }
            c.getPlayer().dropMessage(6, "Your EXP is currently " + expCurrent + " / " + expToLevel);
            c.getPlayer().dropMessage(6, "Need " + expDiff + " more EXP to level up.");
            return 1;
        }
    }
    
    public static class Mob extends CommandExecute {

        public int execute(MapleClient c, String[] splitted) {
            MapleMonster mob = null;
            for (MapleMapObject monstermo : c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 100000, Arrays.asList(MapleMapObjectType.MONSTER))) {
                mob = (MapleMonster) monstermo;
                if (mob.isAlive()) {
                    final StringBuilder sb = new StringBuilder();
                    final MapleMonsterStats oStats = mob.getStats();
                    final ChangeableStats nStats = mob.getChangedStats();
                    sb.append(oStats.getName());
                    if(c.getPlayer().isGM()){
                        sb.append("ID ");
                        sb.append(oStats.getId());
                    }
                    sb.append(" | Level ");
                    sb.append(nStats != null ? nStats.level : oStats.getLevel());
                    sb.append(" with ");
                    sb.append(/*nStats != null ? nStats.hp : */mob.getHp());
                    sb.append("/");
                    sb.append(mob.getMobMaxHp());
                    sb.append("hp");
                    sb.append(" || Targetting : ");
                    final MapleCharacter chr = mob.getController();
                    sb.append(chr != null ? chr.getName() : "none");
                    sb.append(", gives ");
                    int exp = nStats != null ? nStats.exp : oStats.getExp();
                    sb.append(exp * 9); //server EXP rate
                    sb.append(" Base EXP | ");
                    for(Element e : Element.values()){
                        if(mob.getEffectiveness(e) != ElementalEffectiveness.NORMAL){
                            sb.append(mob.getEffectiveness(e).toString());
                            sb.append(" to ");
                            sb.append(e.toString());
                            sb.append(" | ");
                        }
                    }
                    c.getPlayer().dropMessage(6, sb.toString());
                    break;
                }
            }
            if (mob == null) {
                c.getPlayer().dropMessage(6, "No monster was found.");
            }
            return 1;
        }
    }
    
    public static class search extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length == 1) {
                c.getPlayer().dropMessage(6, splitted[0] + ": <ITEM>");
            } else if (splitted.length == 2) {
                c.getPlayer().dropMessage(6, "Provide something to search.");
            } else {
                String type = splitted[1];
                String search = StringUtil.joinStringFrom(splitted, 2);
                MapleData data = null;
                MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("net.sf.odinms.wzpath") + "/" + "String.wz"));
                c.getPlayer().dropMessage(6, "<<Type: " + type + " | Search: " + search + ">>");
                 if (type.equalsIgnoreCase("ITEM")) {
                    List<String> retItems = new ArrayList<>();
                    for (ItemInformation itemPair : MapleItemInformationProvider.getInstance().getAllItems()) {
                        if (itemPair != null && itemPair.name != null && itemPair.name.toLowerCase().contains(search.toLowerCase())) {
                            retItems.add(itemPair.itemId + " - " + itemPair.name);
                        }
                    }
                    if (retItems != null && retItems.size() > 0) {
                        for (String singleRetItem : retItems) {
                            c.getPlayer().dropMessage(6, singleRetItem);
                        }
                    } else {
                        c.getPlayer().dropMessage(6, "No Items Found");
                    }
                
                } else {
                    c.getPlayer().dropMessage(6, "Sorry, you are only allowed to search ITEMS.");
                }
            }
            return 0;
        }
    }
    
    public static class npc extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().hasBlockedInventory()) {
                c.getPlayer().dropMessage(5, "You may not use this command here.");
                return 0;
            }
            NPCScriptManager.getInstance().start(c, 9310008);
            return 1;
        }
    }

    public static class CheckDrops extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            NPCScriptManager.getInstance().start(c, 9010000);
            return 1;
        }
    }


    public static class Dispose extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.removeClickedNPC();
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(CWvsContext.enableActions());
            return 1;
        }
    }

    public static class TSmega extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().setSmega();
            return 1;
        }
    }

    public static class ToggleSmega extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().setSmega();
            return 1;
        }
    }
    
    public static class Check extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getCSPoints(1) + " NX.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getDPoints() + " donation points.");
            c.getPlayer().dropMessage(6, "You currently have " + c.getPlayer().getVPoints() + " voting points.");
            c.getPlayer().dropMessage(6, "The time is currently " + FileoutputUtil.CurrentReadable_TimeGMT() + " GMT.");
            c.removeClickedNPC();
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(CWvsContext.enableActions());
            return 1;
        }
    }
    
    public static class GM extends CommandExecute {
        @Override
        public int execute(MapleClient c, String[] splitted){
            int cooldown = 300000; //milliseconds
            
            int lastUseTime = c.getPlayer().getCData(c.getPlayer(), ServerConstants.Q_GMDELAY);
            String message = c.getPlayer().getName() + "[CH" + c.getChannel() + "]:" + StringUtil.joinStringFrom(splitted, 1);
            if(lastUseTime + cooldown <= System.currentTimeMillis()){
                c.getPlayer().setCData(ServerConstants.Q_GMDELAY, -lastUseTime);
                c.getPlayer().setCData(ServerConstants.Q_GMDELAY, (int)System.currentTimeMillis());
                for(ChannelServer ch : ChannelServer.getAllInstances()){
                    for(MapleCharacter chr : ch.getPlayerStorage().getAllCharacters()){
                        if(chr.getGMLevel() >= 3){
                            chr.dropMessage(MessageType.SYSTEM, message);
                        }
                    }
                }
                c.getPlayer().dropMessage(MessageType.SYSTEM, "The message has been sent.");
            } else {
                int remainingSeconds = (int)(System.currentTimeMillis() - (lastUseTime + cooldown)) / 1000;
                c.getPlayer().dropMessage(MessageType.SYSTEM, "You cannot send a message yet.\r\n[Cooldown: " + Integer.toString(remainingSeconds) + " sec]");
            }
            return 1;
        }
    }

    public static class Help extends CommandExecute {
        private String helpCommands;
        @Override
        public int execute(final MapleClient c, String[] splitted) {
                         helpCommands = "#k#eMapleCrystal Commands \r\n"
                                     +  "#k#e@npc #k#n - <#rUniversal System NPC#n#k>\r\n"  
                                     //+  "#k#e@exp #k#n - <#rShow EXP table above Lv200#n#k>\r\n" 
                                     +  "#k#e@online #k#n - <#rShow who's online#n#k>\r\n"
                                     +  "#k#e@toggleonline #k#n - <#rHide yourself from online list#n#k>\r\n"
                                     +  "#k#e@stats #k#n - <#rDisplay extra character stats#n#k>\r\n"
                                     +  "#k#e@check #k#n - <#rDisplays various information#n#k>\r\n" 
                                     +  "#k#e@mob #k#n - <#rInformation on the closest monster#n#k>\r\n"  
                                     +  "#k#e@str, @dex, @int, @luk, @hp #k#n - <#rAmount to add#n#k>\r\n" 
                                     //+  "#k#e@tsmega / @togglesmega #k#n - <#rToggle SMegas on and off#n#k>\r\n"     
                                     +  "#k#e@dispose #k#n - <#rIf you are unable to attack or talk to any NPC#n#k>\r\n";
                                    
                         
            c.getPlayer().showInstruction(helpCommands, 420, 5);
            int numShow = 6; //Number of times to send packet, each send lengthens duration by 3s
            for(int i = 3000; i < 3000 * numShow; i+= 3000){
                EtcTimer.getInstance().schedule(new Runnable(){
                    @Override
                    public void run(){
                        c.getPlayer().showInstruction(helpCommands, 420, 5);
                    }
                }, i);
            }
            return 1;
        }
    }
    


    public static class TradeHelp extends TradeExecute {
        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(-2, "[System] : <@offerequip, @offeruse, @offersetup, @offeretc, @offercash> <quantity> <name of the item>");
            return 1;
        }
    }

    public abstract static class OfferCommand extends TradeExecute {

        protected int invType = -1;

        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(-2, "[Error] : <quantity> <name of item>");
            } else if (c.getPlayer().getLevel() < 70) {
                c.getPlayer().dropMessage(-2, "[Error] : Only level 70+ may use this command");
            } else {
                int quantity = 1;
                try {
                    quantity = Integer.parseInt(splitted[1]);
                } catch (Exception e) { //swallow and just use 1
                }
                String search = StringUtil.joinStringFrom(splitted, 2).toLowerCase();
                Item found = null;
                final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                for (Item inv : c.getPlayer().getInventory(MapleInventoryType.getByType((byte) invType))) {
                    if (ii.getName(inv.getItemId()) != null && ii.getName(inv.getItemId()).toLowerCase().contains(search)) {
                        found = inv;
                        break;
                    }
                }
                if (found == null) {
                    c.getPlayer().dropMessage(-2, "[Error] : No such item was found (" + search + ")");
                    return 0;
                }
                if (GameConstants.isPet(found.getItemId()) || GameConstants.isRechargable(found.getItemId())) {
                    c.getPlayer().dropMessage(-2, "[Error] : You may not trade this item using this command");
                    return 0;
                }
                if (quantity > found.getQuantity() || quantity <= 0 || quantity > ii.getSlotMax(found.getItemId())) {
                    c.getPlayer().dropMessage(-2, "[Error] : Invalid quantity");
                    return 0;
                }
                if (!c.getPlayer().getTrade().setItems(c, found, (byte) -1, quantity)) {
                    c.getPlayer().dropMessage(-2, "[Error] : This item could not be placed");
                    return 0;
                } else {
                    c.getPlayer().getTrade().chatAuto("[System] : " + c.getPlayer().getName() + " offered " + ii.getName(found.getItemId()) + " x " + quantity);
                }
            }
            return 1;
        }
    }

    public static class OfferEquip extends OfferCommand {

        public OfferEquip() {
            invType = 1;
        }
    }

    public static class OfferUse extends OfferCommand {

        public OfferUse() {
            invType = 2;
        }
    }

    public static class OfferSetup extends OfferCommand {

        public OfferSetup() {
            invType = 3;
        }
    }

    public static class OfferEtc extends OfferCommand {

        public OfferEtc() {
            invType = 4;
        }
    }

    public static class OfferCash extends OfferCommand {

        public OfferCash() {
            invType = 5;
        }
    }
    
/*    public static class Vote extends CommandExecute{

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getSession().write(CWvsContext.ingameVote());
            c.getSession().write(CWvsContext.enableActions());
            return 1;
        }
    }*/
}
