package client.messages.commands;

import client.MapleCharacter;
import client.MapleClient;
import client.SkillFactory;
import constants.GameConstants;
import constants.ServerConstants;
import constants.ServerConstants.PlayerGMRank;
import handling.channel.ChannelServer;
import handling.login.LoginServer;
import handling.world.World;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import server.MapleInventoryManipulator;
import server.MaplePortal;
import server.MapleShopFactory;
import server.Timer.EventTimer;
import server.maps.MapleMap;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import tools.FileoutputUtil;
import tools.StringUtil;
import tools.packet.CField;
import tools.packet.CWvsContext;

/**
 *
 * @author Eric
 * @rev: 2.7 - Added a new !tickle power command.
 * 
 */
public class DonatorCommand {
    static boolean usedCommandDonator;

    public static PlayerGMRank getPlayerLevelRequired() {
        return PlayerGMRank.DONATOR;
    }
    
    public static boolean executeDonatorCommand(MapleClient c, String[] splitted) {
        MapleCharacter player = c.getPlayer();
        MapleMap targetmap;
        MapleMap map = c.getPlayer().getMap();
        StringBuilder sb = new StringBuilder();
        if (!player.isGM() && GameConstants.isJail(c.getPlayer().getMapId())) {
            c.getPlayer().dropMessage(1, "You may not use commands in this map.");
            return true;
        }
        if (!player.isGM() && c.getPlayer().inJQ()) {
            switch (splitted[0].substring(1).toLowerCase()) {
                case "exit":
                    if (GameConstants.isJail(c.getPlayer().getMapId())) {
                        player.dropMessage(6, "Nice try. :)");
                        return true;
                    }
                    player.changeMap(100000000); // should i give a choice fm/henesys?
                    return true;
                default: 
                    player.dropMessage(-1, "You can't use @commands during a Jump Quest. To exit the Jump Quest, type @exit.");
                    return false;
            }
        }
        if (!player.isGM() && c.getPlayer().inTutorial()) {
            switch (splitted[0].substring(1).toLowerCase()) {
                case "leave":
                    if (GameConstants.isJail(c.getPlayer().getMapId())) {
                        player.dropMessage(6, "Nice try. :)");
                        return true;
                    }
                    c.getSession().write(CWvsContext.clearMidMsg());
                    player.changeMap(100000000); // should i give a choice fm/henesys?
                    return true;
                default: 
                    player.dropMessage(-1, "The only way to leave this map is via @leave.");
                    return false;
            }
        }
        if (player.gmLevel() >= 1) {
             if (player.gmLevel() < 3 && usedCommandDonator == false) {
                    FileoutputUtil.log("DonorLog.txt", "\r\nIGN: " + player.getName() + " || Command: " + InternCommand.joinStringFrom(splitted, 0) + " \r\n");
                    usedCommandDonator = true;
                    EventTimer.getInstance().schedule(new Runnable() {
                        @Override
                        public void run() {
                           usedCommandDonator = false;  
                        }
                    }, 10);
                }
            switch (splitted[0].substring(1).toLowerCase()) {
                case "general":
                    MapleShopFactory.getInstance().getShop(180001).sendShop(c);
                     return true;
                case "goto":
                    HashMap<String, Integer> gotomaps = new HashMap<String, Integer>();
                    gotomaps.put("henesys", 100000000);
                    gotomaps.put("ellinia", 101000000);
                    gotomaps.put("perion", 102000000);
                    gotomaps.put("kerning", 103000000);
                    gotomaps.put("harbor", 104000000);
                    gotomaps.put("sleepywood", 105000000);
                    gotomaps.put("florina", 120000300);
                    gotomaps.put("orbis", 200000000);
                    gotomaps.put("happyville", 209000000);
                    gotomaps.put("elnath", 211000000);
                    gotomaps.put("ludibrium", 220000000);
                    gotomaps.put("aquaroad", 230000000);
                    gotomaps.put("leafre", 240000000);
                    gotomaps.put("mulung", 250000000);
                    gotomaps.put("herbtown", 251000000);
                    gotomaps.put("omegasector", 221000000);
                    gotomaps.put("koreanfolktown", 222000000);
                    gotomaps.put("newleafcity", 600000000);
                    gotomaps.put("showatown", 801000000);
                    gotomaps.put("zipangu", 800000000);
                    gotomaps.put("ariant", 260000100);
                    gotomaps.put("nautilus", 120000000);
                    gotomaps.put("boatquay", 541000000);
                    gotomaps.put("malaysia", 550000000);
                    gotomaps.put("erev", 130000000);
                    gotomaps.put("ellin", 300000000);
                    gotomaps.put("kampung", 551000000);
                    gotomaps.put("singapore", 540000000);
                    gotomaps.put("amoria", 680000000);
                    gotomaps.put("rien", 140000000);
                    if (splitted.length < 2) {
                        c.getPlayer().dropMessage(6, "Syntax: !goto <mapname>");
                    } else {
                        if (gotomaps.containsKey(splitted[1])) {
                            targetmap = c.getChannelServer().getMapFactory().getMap(gotomaps.get(splitted[1]));
                            if (targetmap == null) {
                                c.getPlayer().dropMessage(6, "Map does not exist");
                                return true;
                            }
                            MaplePortal targetPortal = targetmap.getPortal(0);
                            c.getPlayer().changeMap(targetmap, targetPortal);
                        } else {
                            if (splitted[1].equals("locations")) {
                                c.getPlayer().dropMessage(6, "Use !goto <location>. Locations are as follows:");
                                for (String s : gotomaps.keySet()) {
                                    sb.append(s).append(", ");
                                }
                                c.getPlayer().dropMessage(6, sb.substring(0, sb.length() - 2));
                            } else {
                                c.getPlayer().dropMessage(6, "Invalid command syntax - Use !goto <location>. For a list of locations, use !goto locations.");
                            }
                        }
                    }
                    return true;    
                case "dcommands":
                case "dcommand":
                    player.dropNPC("[" + ServerConstants.SERVER_NAME + "'s #rDonor#k Commands]\r\n!dnotice <message> - A world message with [Donor]\r\n!dbuff - Gives you donator buffs\r\n!donline - Advanced @online command showing all channels\r\n!donor - Warps you to Donator Island!\r\n!tickle - Notifies you when a player clicks on you.\r\n!dvac - Item vacs. Cooldown: 10 minutes\r\n!cgender <male/female/shemale> - Change your gender <3");
                    return true;
                default:
                    if (c.getPlayer().gmLevel() >= 2) {
                        return SuperDonatorCommand.executeSuperDonatorCommand(c, splitted);
                    } else {
                        return PlayerCommand.executePlayerCommands(c, splitted);
                    }
            }
        } else {
            return true;
        }
    }
}
