package tools.packet;

import client.InnerSkillValueHolder;
import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleCoolDownValueHolder;
import client.MapleQuestStatus;
import client.MapleTrait;
import client.Skill;
import client.SkillEntry;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import client.inventory.MapleRing;
import constants.GameConstants;
import constants.ServerConstants;
import handling.Buffstat;
import handling.world.MapleCharacterLook;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.SimpleTimeZone;
import server.MapleItemInformationProvider;
import server.MapleShop;
import server.MapleShopItem;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shops.AbstractPlayerStore;
import server.shops.IMaplePlayerShop;
import tools.BitTools;
import tools.Pair;
import tools.StringUtil;
import tools.Triple;
import tools.data.MaplePacketLittleEndianWriter;

public class PacketHelper {

    public static final long FT_UT_OFFSET = 116444592000000000L;
    public static final long MAX_TIME = 150842304000000000L;
    public static final long ZERO_TIME = 94354848000000000L;
    public static final long PERMANENT = 150841440000000000L;

    public static final long getKoreanTimestamp(long realTimestamp) {
        return getTime(realTimestamp);
    }

    public static final long getTime(long realTimestamp) {
        if (realTimestamp == -1L) {
            return 150842304000000000L;
        }
        if (realTimestamp == -2L) {
            return 94354848000000000L;
        }
        if (realTimestamp == -3L) {
            return 150841440000000000L;
        }
        return realTimestamp * 10000L + 116444592000000000L;
    }

    public static long getFileTimestamp(long timeStampinMillis, boolean roundToMinutes) {
        if (SimpleTimeZone.getDefault().inDaylightTime(new Date())) {
            timeStampinMillis -= 3600000L;
        }
        long time;

        if (roundToMinutes) {
            time = timeStampinMillis / 1000L / 60L * 600000000L;
        } else {
            time = timeStampinMillis * 10000L;
        }
        return time + 116444592000000000L;
    }

    public static void addQuestInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        boolean idk = true;

        final List<MapleQuestStatus> started = chr.getStartedQuests();
        mplew.write(1);

        mplew.writeShort(started.size());
        for (final MapleQuestStatus q : started) {
            mplew.writeShort(q.getQuest().getId());
            if (q.hasMobKills()) {
                StringBuilder sb = new StringBuilder();
                for (Iterator i$ = q.getMobKills().values().iterator(); i$.hasNext();) {
                    int kills = ((Integer) i$.next()).intValue();
                    sb.append(StringUtil.getLeftPaddedStr(String.valueOf(kills), '0', 3));
                }
                mplew.writeMapleAsciiString(sb.toString());
            } else {
                mplew.writeMapleAsciiString(q.getCustomData() == null ? "" : q.getCustomData());
            }

        }

        mplew.writeShort(0);

        mplew.write(1);

        final List<MapleQuestStatus> completed = chr.getCompletedQuests();
        mplew.writeShort(completed.size());
        for (MapleQuestStatus q : completed) {
            mplew.writeShort(q.getQuest().getId());
            mplew.writeLong(getTime(q.getCompletionTime()));
        }
    }

    public static final void addSkillInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        final Map<Skill, SkillEntry> skills = chr.getSkills();
        boolean useOld = skills.size() < 500;

        mplew.write(useOld ? 1 : 0);
        if (useOld) {
            mplew.writeShort(skills.size());
            for (Map.Entry skill : skills.entrySet()) {
                mplew.writeInt(((Skill) skill.getKey()).getId());
                mplew.writeInt(((SkillEntry) skill.getValue()).skillevel);
                addExpirationTime(mplew, ((SkillEntry) skill.getValue()).expiration);

                if (((Skill) skill.getKey()).isFourthJob()) {
                    mplew.writeInt(((SkillEntry) skill.getValue()).masterlevel);
                }
            }
        } else {
            final Map<Integer, Integer> skillsWithoutMax = new LinkedHashMap<>();
            final Map<Integer, Long> skillsWithExpiration = new LinkedHashMap<>();
            final Map<Integer, Byte> skillsWithMax = new LinkedHashMap<>();

            for (final Entry<Skill, SkillEntry> skill : skills.entrySet()) {
                skillsWithoutMax.put(Integer.valueOf(((Skill) skill.getKey()).getId()), Integer.valueOf(((SkillEntry) skill.getValue()).skillevel));
                if (((SkillEntry) skill.getValue()).expiration > 0L) {
                    skillsWithExpiration.put(Integer.valueOf(((Skill) skill.getKey()).getId()), Long.valueOf(((SkillEntry) skill.getValue()).expiration));
                }
                if (((Skill) skill.getKey()).isFourthJob()) {
                    skillsWithMax.put(Integer.valueOf(((Skill) skill.getKey()).getId()), Byte.valueOf(((SkillEntry) skill.getValue()).masterlevel));
                }
            }

            int amount = skillsWithoutMax.size();
            mplew.writeShort(amount);
            for (final Entry<Integer, Integer> x : skillsWithoutMax.entrySet()) {
                mplew.writeInt(((Integer) x.getKey()).intValue());
                mplew.writeInt(((Integer) x.getValue()).intValue());
            }
            mplew.writeShort(0);

            amount = skillsWithExpiration.size();
            mplew.writeShort(amount);
            for (final Entry<Integer, Long> x : skillsWithExpiration.entrySet()) {
                mplew.writeInt(((Integer) x.getKey()).intValue());
                mplew.writeLong(((Long) x.getValue()).longValue());
            }
            mplew.writeShort(0);

            amount = skillsWithMax.size();
            mplew.writeShort(amount);
            for (final Entry<Integer, Byte> x : skillsWithMax.entrySet()) {
                mplew.writeInt(((Integer) x.getKey()).intValue());
                mplew.writeInt(((Byte) x.getValue()).byteValue());
            }
            mplew.writeShort(0);
        }
    }

    public static final void addCoolDownInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        final List<MapleCoolDownValueHolder> cd = chr.getCooldowns();

        mplew.writeShort(cd.size());
        for (MapleCoolDownValueHolder cooling : cd) {
            mplew.writeInt(cooling.skillId);
            mplew.writeInt((int) (cooling.length + cooling.startTime - System.currentTimeMillis()) / 1000);
        }
    }

    public static final void addRocksInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        int[] mapz = chr.getRegRocks();
        for (int i = 0; i < 5; i++) {
            mplew.writeInt(mapz[i]);
        }

        int[] map = chr.getRocks();
        for (int i = 0; i < 10; i++) {
            mplew.writeInt(map[i]);
        }

        int[] maps = chr.getHyperRocks();
        for (int i = 0; i < 13; i++) {
            mplew.writeInt(maps[i]);
        }
        for (int i = 0; i < 13; i++) {
            mplew.writeInt(maps[i]);
        }
    }

    public static final void addRingInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeShort(0);

        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> aRing = chr.getRings(true);
        List<MapleRing> cRing = aRing.getLeft();
        mplew.writeShort(cRing.size());
        for (MapleRing ring : cRing) {
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeAsciiString(ring.getPartnerName(), 13);
            mplew.writeLong(ring.getRingId());
            mplew.writeLong(ring.getPartnerRingId());
        }
        List<MapleRing> fRing = aRing.getMid();
        mplew.writeShort(fRing.size());
        for (MapleRing ring : fRing) {
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeAsciiString(ring.getPartnerName(), 13);
            mplew.writeLong(ring.getRingId());
            mplew.writeLong(ring.getPartnerRingId());
            mplew.writeInt(ring.getItemId());
        }
        List<MapleRing> mRing = aRing.getRight();
        mplew.writeShort(mRing.size());
        int marriageId = 30000;
        for (MapleRing ring : mRing) {
            mplew.writeInt(marriageId);
            mplew.writeInt(chr.getId());
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeShort(3);
            mplew.writeInt(ring.getItemId());
            mplew.writeInt(ring.getItemId());
            mplew.writeAsciiString(chr.getName(), 13);
            mplew.writeAsciiString(ring.getPartnerName(), 13);
        }
    }

    public static void addInventoryInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(chr.getMeso());
        mplew.writeInt(0);
        mplew.write(chr.getInventory(MapleInventoryType.EQUIP).getSlotLimit());
        mplew.write(chr.getInventory(MapleInventoryType.USE).getSlotLimit());
        mplew.write(chr.getInventory(MapleInventoryType.SETUP).getSlotLimit());
        mplew.write(chr.getInventory(MapleInventoryType.ETC).getSlotLimit());
        mplew.write(chr.getInventory(MapleInventoryType.CASH).getSlotLimit());

        MapleQuestStatus stat = chr.getQuestNoAdd(MapleQuest.getInstance(122700));
        if ((stat != null) && (stat.getCustomData() != null) && (Long.parseLong(stat.getCustomData()) > System.currentTimeMillis())) {
            mplew.writeLong(getTime(Long.parseLong(stat.getCustomData())));
        } else {
            mplew.writeLong(getTime(-2L));
        }
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        List<Item> equipped = iv.newList();
        Collections.sort(equipped);
        for (Item item : equipped) {
            if ((item.getPosition() < 0) && (item.getPosition() > -100)) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }
        }
        mplew.writeShort(0);
        for (Item item : equipped) {
            if ((item.getPosition() <= -100) && (item.getPosition() > -1000)) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }

        }

        mplew.writeShort(0);
        iv = chr.getInventory(MapleInventoryType.EQUIP);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0);
        for (Item item : equipped) {
            if ((item.getPosition() <= -1000) && (item.getPosition() > -1100)) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }
        }
        mplew.writeShort(0);
        for (Item item : equipped) {
            if ((item.getPosition() <= -1100) && (item.getPosition() > -1200)) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }
        }
        mplew.writeShort(0);
        for (Item item : equipped) {
            if (item.getPosition() <= -1200) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }

        }

        mplew.writeShort(0);

        mplew.writeShort(0);
        iv = chr.getInventory(MapleInventoryType.USE);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.write(0);
        iv = chr.getInventory(MapleInventoryType.SETUP);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.write(0);
        iv = chr.getInventory(MapleInventoryType.ETC);
        for (Item item : iv.list()) {
            if (item.getPosition() < 100) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }
        }
        mplew.write(0);
        iv = chr.getInventory(MapleInventoryType.CASH);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.write(0);
        for (int i = 0; i < chr.getExtendedSlots().size(); i++) {
            mplew.writeInt(i);
            mplew.writeInt(chr.getExtendedSlot(i));
            for (Item item : chr.getInventory(MapleInventoryType.ETC).list()) {
                if ((item.getPosition() > i * 100 + 100) && (item.getPosition() < i * 100 + 200)) {
                    addItemPosition(mplew, item, false, true);
                    addItemInfo(mplew, item, chr);
                }
            }
            mplew.writeInt(-1);
        }

        mplew.writeInt(-1);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.write(0);
    }

    public static final void addCharStats(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(chr.getId());
        mplew.writeAsciiString(chr.getName(), 13);
        mplew.write(chr.getGender());
        mplew.write(chr.getSkinColor());
        mplew.writeInt(chr.getFace());
        mplew.writeInt(chr.getHair());
        mplew.writeZeroBytes(24);
        mplew.write(chr.getLevel());
        mplew.writeShort(chr.getJob());
        chr.getStat().connectData(mplew);
        mplew.writeShort(chr.getRemainingAp());
        if (GameConstants.isSeparatedSp(chr.getJob())) {
            int size = chr.getRemainingSpSize();
            mplew.write(size);
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (chr.getRemainingSp(i) > 0) {
                    mplew.write(i + 1);
                    mplew.write(chr.getRemainingSp(i));
                }
            }
        } else {
            mplew.writeShort(chr.getRemainingSp());
        }
        mplew.writeInt(chr.getExp());
        mplew.writeInt(chr.getFame());
        mplew.writeInt(chr.getGachExp());
        mplew.writeInt(chr.getMapId());
        mplew.write(chr.getInitialSpawnpoint());
        mplew.writeInt(0);
        mplew.writeShort(chr.getSubcategory());
        if (GameConstants.isDemon(chr.getJob())) {
            mplew.writeInt(chr.getDemonMarking());
        }
        mplew.write(chr.getFatigue());
        mplew.writeInt(GameConstants.getCurrentDate());
        for (MapleTrait.MapleTraitType t : MapleTrait.MapleTraitType.values()) {
            mplew.writeInt(chr.getTrait(t).getTotalExp());
        }
        for (MapleTrait.MapleTraitType t : MapleTrait.MapleTraitType.values()) {
            mplew.writeShort(0);
        }

        mplew.write(0);
        mplew.writeInt(-35635200);
        mplew.writeInt(21968699);
        mplew.writeInt(chr.getStat().pvpExp);
        mplew.write(chr.getStat().pvpRank);
        mplew.writeInt(chr.getBattlePoints());
        mplew.write(5);
        mplew.writeInt(0);

        mplew.write(0);
        mplew.write(new byte[]{59, 55, 79, 1, 0, 64, -32, -3});
        mplew.writeShort(0);
        mplew.writeZeroBytes(3);

        for (int i = 0; i < 6; i++) {
            mplew.writeZeroBytes(9);
        }

        mplew.writeInt(-1778686763);
        mplew.writeInt(311);
    }

    public static final void addCharLook(MaplePacketLittleEndianWriter mplew, MapleCharacterLook chr, boolean mega) {
        mplew.write(chr.getGender());
        mplew.write(chr.getSkinColor());
        mplew.writeInt(chr.getFace());
        mplew.writeInt(chr.getJob());
        mplew.write(mega ? 0 : 1);
        mplew.writeInt(chr.getHair());

        final Map<Byte, Integer> myEquip = new LinkedHashMap<>();
        final Map<Byte, Integer> maskedEquip = new LinkedHashMap<>();
        final Map<Byte, Integer> equip = chr.getEquips();
        for (final Entry<Byte, Integer> item : equip.entrySet()) {
            if (((Byte) item.getKey()).byteValue() < -127) {
                continue;
            }
            byte pos = (byte) (((Byte) item.getKey()).byteValue() * -1);

            if ((pos < 100) && (myEquip.get(Byte.valueOf(pos)) == null)) {
                myEquip.put(Byte.valueOf(pos), item.getValue());
            } else if ((pos > 100) && (pos != 111)) {
                pos = (byte) (pos - 100);
                if (myEquip.get(Byte.valueOf(pos)) != null) {
                    maskedEquip.put(Byte.valueOf(pos), myEquip.get(Byte.valueOf(pos)));
                }
                myEquip.put(Byte.valueOf(pos), item.getValue());
            } else if (myEquip.get(Byte.valueOf(pos)) != null) {
                maskedEquip.put(Byte.valueOf(pos), item.getValue());
            }

        }

        for (Map.Entry entry : myEquip.entrySet()) {
            mplew.write(((Byte) entry.getKey()).byteValue());
            mplew.writeInt(((Integer) entry.getValue()).intValue());
        }
        mplew.write(255);
        mplew.write(255);

        for (Map.Entry entry : maskedEquip.entrySet()) {
            mplew.write(((Byte) entry.getKey()).byteValue());
            mplew.writeInt(((Integer) entry.getValue()).intValue());
        }
        mplew.write(255);

        Integer cWeapon = (Integer) equip.get(Byte.valueOf((byte) -111));
        mplew.writeInt(cWeapon != null ? cWeapon.intValue() : 0);
        mplew.write(GameConstants.isMercedes(chr.getJob()) ? 1 : 0);
        mplew.writeZeroBytes(12);
        if (GameConstants.isDemon(chr.getJob())) {
            mplew.writeInt(chr.getDemonMarking());
        }
    }

    public static final void addExpirationTime(MaplePacketLittleEndianWriter mplew, long time) {
        mplew.writeLong(getTime(time));
    }

    public static void addItemPosition(MaplePacketLittleEndianWriter mplew, Item item, boolean trade, boolean bagSlot) {
        if (item == null) {
            mplew.write(0);
            return;
        }
        short pos = item.getPosition();
        if (pos <= -1) {
            pos = (short) (pos * -1);
            if ((pos > 100) && (pos < 1000)) {
                pos = (short) (pos - 100);
            }
        }
        if (bagSlot) {
            mplew.writeInt(pos % 100 - 1);
        } else if ((!trade) && (item.getType() == 1)) {
            mplew.writeShort(pos);
        } else {
            mplew.write(pos);
        }
    }

    public static final void addItemInfo(MaplePacketLittleEndianWriter mplew, Item item) {
        addItemInfo(mplew, item, null);
    }

    public static final void addItemInfo(MaplePacketLittleEndianWriter mplew, Item item, MapleCharacter chr) {
        mplew.write(item.getPet() != null ? 3 : item.getType());
        mplew.writeInt(item.getItemId());
        boolean hasUniqueId = (item.getUniqueId() > 0) && (!GameConstants.isMarriageRing(item.getItemId())) && (item.getItemId() / 10000 != 166);

        mplew.write(hasUniqueId ? 1 : 0);
        if (hasUniqueId) {
            mplew.writeLong(item.getUniqueId());
        }
        if (item.getPet() != null) {
            addPetItemInfo(mplew, item, item.getPet(), true);
        } else {
            addExpirationTime(mplew, item.getExpiration());
            mplew.writeInt(chr == null ? -1 : chr.getExtendedSlots().indexOf(Integer.valueOf(item.getItemId())));
            if (item.getType() == 1) {
                Equip equip = (Equip) item;
                mplew.write(equip.getUpgradeSlots());
                mplew.write(equip.getLevel());
                mplew.writeShort(equip.getStr());
                mplew.writeShort(equip.getDex());
                mplew.writeShort(equip.getInt());
                mplew.writeShort(equip.getLuk());
                mplew.writeShort(equip.getHp());
                mplew.writeShort(equip.getMp());
                mplew.writeShort(equip.getWatk());
                mplew.writeShort(equip.getMatk());
                mplew.writeShort(equip.getWdef());
                mplew.writeShort(equip.getMdef());
                mplew.writeShort(equip.getAcc());
                mplew.writeShort(equip.getAvoid());
                mplew.writeShort(equip.getHands());
                mplew.writeShort(equip.getSpeed());
                mplew.writeShort(equip.getJump());
                mplew.writeMapleAsciiString(equip.getOwner());
                mplew.writeShort(equip.getFlag());
                mplew.write(equip.getIncSkill() > 0 ? 1 : 0);
                mplew.write(Math.max(equip.getBaseLevel(), equip.getEquipLevel()));
                mplew.writeInt(equip.getExpPercentage() * ServerConstants.getItemEXPPacketOffset(MapleItemInformationProvider.getInstance().getReqLevel(equip.getItemId())));
                mplew.writeInt(equip.getDurability());
                mplew.writeInt(equip.getViciousHammer());
                mplew.writeShort(equip.getPVPDamage());
                mplew.write(equip.getState());
                mplew.write(equip.getEnhance());
                mplew.writeShort(equip.getPotential1());
                if (!hasUniqueId) {
                    mplew.writeShort(equip.getPotential2());
                    mplew.writeShort(equip.getPotential3());
                    mplew.writeShort(equip.getPotential4());
                    mplew.writeShort(equip.getPotential5());
                }
                mplew.writeShort(equip.getSocketState());
                mplew.writeShort(equip.getSocket1() % 10000);
                mplew.writeShort(equip.getSocket2() % 10000);
                mplew.writeShort(equip.getSocket3() % 10000);
                mplew.writeLong(equip.getInventoryId() <= 0L ? -1L : equip.getInventoryId());
                mplew.writeLong(getTime(-2L));
                mplew.writeInt(-1);
            } else {
                mplew.writeShort(item.getQuantity());
                mplew.writeMapleAsciiString(item.getOwner());
                mplew.writeShort(item.getFlag());
                if ((GameConstants.isThrowingStar(item.getItemId())) || (GameConstants.isBullet(item.getItemId())) || (item.getItemId() / 10000 == 287)) {
                    mplew.writeLong(item.getInventoryId() <= 0L ? -1L : item.getInventoryId());
                }
            }
        }
    }

    public static final void serializeMovementList(MaplePacketLittleEndianWriter lew, List<LifeMovementFragment> moves) {
        lew.write(moves.size());
        for (LifeMovementFragment move : moves) {
            move.serialize(lew);
        }
    }

    public static final void addAnnounceBox(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if ((chr.getPlayerShop() != null) && (chr.getPlayerShop().isOwner(chr)) && (chr.getPlayerShop().getShopType() != 1) && (chr.getPlayerShop().isAvailable())) {
            addInteraction(mplew, chr.getPlayerShop());
        } else {
            mplew.write(0);
        }
    }

    public static final void addInteraction(MaplePacketLittleEndianWriter mplew, IMaplePlayerShop shop) {
        mplew.write(shop.getGameType());
        mplew.writeInt(((AbstractPlayerStore) shop).getObjectId());
        mplew.writeMapleAsciiString(shop.getDescription());
        if (shop.getShopType() != 1) {
            mplew.write(shop.getPassword().length() > 0 ? 1 : 0);
        }
        mplew.write(shop.getItemId() % 10);
        mplew.write(shop.getSize());
        mplew.write(shop.getMaxSize());
        if (shop.getShopType() != 1) {
            mplew.write(shop.isOpen() ? 0 : 1);
        }
    }

    public static final void addCharacterInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(-1);
        mplew.writeInt(-3);

        mplew.writeZeroBytes(8);
        addCharStats(mplew, chr);
        mplew.write(chr.getBuddylist().getCapacity());
        if (chr.getBlessOfFairyOrigin() != null) {
            mplew.write(1);
            mplew.writeMapleAsciiString(chr.getBlessOfFairyOrigin());
        } else {
            mplew.write(0);
        }
        if (chr.getBlessOfEmpressOrigin() != null) {
            mplew.write(1);
            mplew.writeMapleAsciiString(chr.getBlessOfEmpressOrigin());
        } else {
            mplew.write(0);
        }
        MapleQuestStatus ultExplorer = chr.getQuestNoAdd(MapleQuest.getInstance(111111));
        if ((ultExplorer != null) && (ultExplorer.getCustomData() != null)) {
            mplew.write(1);
            mplew.writeMapleAsciiString(ultExplorer.getCustomData());
        } else {
            mplew.write(0);
        }
        addInventoryInfo(mplew, chr);
        addSkillInfo(mplew, chr);
        addCoolDownInfo(mplew, chr);
        addQuestInfo(mplew, chr);
        addRingInfo(mplew, chr);
        addRocksInfo(mplew, chr);

        addMonsterBookInfo(mplew, chr);

        mplew.writeShort(0);
        mplew.writeShort(0);

        chr.QuestInfoPacket(mplew);

        if ((chr.getJob() >= 3300) && (chr.getJob() <= 3312)) {
            addJaguarInfo(mplew, chr);
        }
        mplew.writeShort(0);
        mplew.writeShort(0);
        addStealSkills(mplew, chr);
        addInnerStats(mplew, chr);
        addCoreAura(mplew, chr);
        mplew.writeShort(0);
        mplew.writeZeroBytes(48);
        /*  mplew.writeShort(0);
         mplew.writeShort(0);
         addStealSkills(mplew, chr);
         // addInnerStats(mplew, chr);
         mplew.writeShort(0);
         mplew.writeInt(1);
         mplew.writeInt(0);
         mplew.writeInt(150676844);
         for (int i = 0; i < 17; i++) {
         mplew.writeInt(0);
         }
         long someExpireTime = getTime(System.currentTimeMillis() + 701913504L);
         mplew.writeLong(someExpireTime);
         mplew.writeInt(0);
         mplew.writeShort(1);
         mplew.write(0);
         mplew.writeInt(28634010);
         mplew.writeInt(chr.getId());
         int size = 4;
         mplew.writeLong(size);
         for (int i = 0; i < size; i++)
         mplew.writeLong(9410165 + i);
         */
    }

    public static final int getSkillBook(final int i) {
        switch (i) {
            case 1:
            case 2:
                return 4;
            case 3:
                return 3;
            case 4:
                return 2;
        }
        return 0;
    }

    public static final void addInnerStats(final MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        final List<InnerSkillValueHolder> skills = chr.getInnerSkills();
        if (skills != null) {
            mplew.writeShort(skills.size());
            for (int i = 0; i < skills.size(); ++i) {
                mplew.write(i + 1); // key
                mplew.writeInt(skills.get(i).getSkillId()); //d 7000000 id ++, 71 = char cards
                mplew.write(skills.get(i).getSkillLevel()); // level
                mplew.write(skills.get(i).getRank()); //rank, C, B, A, and S
            }
        }

        mplew.writeInt(chr.getHonourLevel()); //honor lvl
        mplew.writeInt(chr.getHonourExp()); //honor exp
    }

    public static final void addCoreAura(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(0);
        mplew.writeLong(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeLong(getTime(System.currentTimeMillis() + 86400000));
        mplew.writeInt(0);
        mplew.write((GameConstants.isJett(chr.getJob())) ? 1 : 0);
    }

    public static void addStolenSkills(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, int jobNum, boolean writeJob) {
        if (writeJob) {
            mplew.writeInt(jobNum);
        }
        int count = 0;
        if (chr.getStolenSkills() != null) {
            for (Pair<Integer, Boolean> sk : chr.getStolenSkills()) {
                if (GameConstants.getJobNumber(sk.left / 10000) == jobNum) {
                    mplew.writeInt(sk.left);
                    count++;
                    if (count >= GameConstants.getNumSteal(jobNum)) {
                        break;
                    }
                }
            }
        }
        while (count < GameConstants.getNumSteal(jobNum)) { //for now?
            mplew.writeInt(0);
            count++;
        }
    }

    public static void addChosenSkills(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        for (int i = 1; i <= 4; i++) {
            boolean found = false;
            if (chr.getStolenSkills() != null) {
                for (Pair<Integer, Boolean> sk : chr.getStolenSkills()) {
                    if (GameConstants.getJobNumber(sk.left / 10000) == i && sk.right) {
                        mplew.writeInt(sk.left);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                mplew.writeInt(0);
            }
        }
    }

    public static final void addStealSkills(final MaplePacketLittleEndianWriter mplew, final MapleCharacter chr) {
        for (int i = 1; i <= 4; i++) {
            addStolenSkills(mplew, chr, i, false);
        }
        addChosenSkills(mplew, chr);
    }

    public static final void addMonsterBookInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(0);

        if (chr.getMonsterBook().getSetScore() > 0) {
            chr.getMonsterBook().writeFinished(mplew);
        } else {
            chr.getMonsterBook().writeUnfinished(mplew);
        }

        mplew.writeInt(chr.getMonsterBook().getSet());
    }

    public static final void addPetItemInfo(MaplePacketLittleEndianWriter mplew, Item item, MaplePet pet, boolean active) {
        if (item == null) {
            mplew.writeLong(PacketHelper.getKoreanTimestamp((long) (System.currentTimeMillis() * 1.5)));
        } else {
            addExpirationTime(mplew, item.getExpiration() <= System.currentTimeMillis() ? -1L : item.getExpiration());
        }
        mplew.writeInt(-1);
        mplew.writeAsciiString(pet.getName(), 13);
        mplew.write(pet.getLevel());
        mplew.writeShort(pet.getCloseness());
        mplew.write(pet.getFullness());
        if (item == null) {
            mplew.writeLong(PacketHelper.getKoreanTimestamp((long) (System.currentTimeMillis() * 1.5)));
        } else {
            addExpirationTime(mplew, item.getExpiration() <= System.currentTimeMillis() ? -1L : item.getExpiration());
        }
        mplew.writeShort(0);
        mplew.writeShort(pet.getFlags());
        mplew.writeInt((pet.getPetItemId() == 5000054) && (pet.getSecondsLeft() > 0) ? pet.getSecondsLeft() : 0);
        mplew.writeShort(0);
        mplew.write(active ? 0 : pet.getSummoned() ? pet.getSummonedValue() : 0);
        for (int i = 0; i < 4; i++) {
            mplew.write(0);
        }
    }

    public static final void addShopInfo(MaplePacketLittleEndianWriter mplew, MapleShop shop, MapleClient c) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        mplew.write(shop.getRanks().size() > 0 ? 1 : 0);

        if (shop.getRanks().size() > 0) {
            mplew.write(shop.getRanks().size());
            for (Pair s : shop.getRanks()) {
                mplew.writeInt(((Integer) s.left).intValue());
                mplew.writeMapleAsciiString((String) s.right);
            }
        }
        mplew.writeShort(shop.getItems().size() + c.getPlayer().getRebuy().size());
        for (MapleShopItem item : shop.getItems()) {
            addShopItemInfo(mplew, item, shop, ii, null);
        }
        for (Item i : c.getPlayer().getRebuy()) {
            addShopItemInfo(mplew, new MapleShopItem(i.getItemId(), (int) ii.getPrice(i.getItemId()), i.getQuantity()), shop, ii, i);
        }
    }

    /*    private short buyable;
     private int itemId;
     private int price;
     private int reqItem;
     private int reqItemQ;
     private int category;
     private int minLevel;
     private int expiration;
     private byte rank;*/
    public static final void addShopItemInfo(MaplePacketLittleEndianWriter mplew, MapleShopItem item, MapleShop shop, MapleItemInformationProvider ii, Item i) {
        mplew.writeInt(item.getItemId()); //Item ID.
        mplew.writeInt(item.getPrice() <= 0 ? 0 : item.getPrice()); //Get price, if 0, hide price.
        mplew.write(0); //unk
        mplew.writeInt(item.getReqItem()); //Secondary currency required to purchase the item.
        mplew.writeInt(item.getReqItemQ()); //Secondary currency quantity required to purchase the item.
        mplew.writeInt(0); //Time in minutes for it to expire, currently not handled.
        mplew.writeInt(0); // 0 to show confirmation box, 1 to hide it.
        mplew.writeInt(0); //No visible effects besides if value is > 0 then it hides the buyable items.
        mplew.write(0); //unk
        mplew.writeInt(0); //No visible changes.
        mplew.writeInt(0); //This item can only be purchased X amount of times, currently not handled.

        //If needed to put a quantity on a specific item in a specific shop do:
        //if(shop.getId() == xx && item.getItemId() == xx){ }
        
        if (item.getItemId() == 2061000 || item.getItemId() == 2060000) {
            mplew.writeShort(2000); //Arrows for Bow and Arrows for Crossbow are 2000 Arrows for  1 meso.   
            mplew.writeShort(1000); //Not sure what this is.
        } else if (item.getItemId() == 4310036) {
            mplew.writeShort(11); //Conqeuror's Coin, display 11 as it is hardcoded to recieve 11 per quantity.
            mplew.writeShort(1000); //Not sure what this is.
        } else if (i != null && i.getQuantity() > 1) { //I believe i is only NOT null on re-buy items.
            mplew.writeShort(i.getQuantity());  //For Re-Buys;
            mplew.writeShort(1000); //Not sure what this is.
        } else if ((!GameConstants.isThrowingStar(item.getItemId())) && (!GameConstants.isBullet(item.getItemId()))) {
            mplew.writeShort(1); //Hardcoded quantity for items..If > 1, input box asking how many will be supressed. 
            mplew.writeShort(1000); //Not sure what this is.
        } else {
            mplew.writeZeroBytes(6);
            mplew.writeShort(BitTools.doubleToShortBits(ii.getPrice(item.getItemId())));
            mplew.writeShort(ii.getSlotMax(item.getItemId()));
        }

        mplew.write(i == null ? 0 : 1);
        if (i != null) {
            addItemInfo(mplew, i);
        }
        if (shop.getRanks().size() > 0) {
            mplew.write(item.getRank() >= 0 ? 1 : 0);
            if (item.getRank() >= 0) {
                mplew.write(item.getRank());
            }
        }
        mplew.writeZeroBytes(16);
        int size = 4;
        for (int j = 0; j < size; j++) {
            mplew.writeLong(9410165 + j);
        }
    }

    public static final void addJaguarInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.write(chr.getIntNoRecord(111112));
        mplew.writeZeroBytes(20);
    }

    public static <E extends Buffstat> void writeSingleMask(MaplePacketLittleEndianWriter mplew, E statup) {
        for (int i = 8; i >= 1; i--) {
            mplew.writeInt(i == statup.getPosition() ? statup.getValue() : 0);
        }
    }

    public static <E extends Buffstat> void writeMask(MaplePacketLittleEndianWriter mplew, Collection<E> statups) {
        int[] mask = new int[8];
        for (Buffstat statup : statups) {
            mask[(statup.getPosition() - 1)] |= statup.getValue();
        }
        for (int i = mask.length; i >= 1; i--) {
            mplew.writeInt(mask[(i - 1)]);
        }
    }

    public static <E extends Buffstat> void writeBuffMask(MaplePacketLittleEndianWriter mplew, Collection<Pair<E, Integer>> statups) {
        int[] mask = new int[8];
        for (Pair statup : statups) {
            mask[(((Buffstat) statup.left).getPosition() - 1)] |= ((Buffstat) statup.left).getValue();
        }
        for (int i = mask.length; i >= 1; i--) {
            mplew.writeInt(mask[(i - 1)]);
        }
    }

    public static <E extends Buffstat> void writeBuffMask(MaplePacketLittleEndianWriter mplew, Map<E, Integer> statups) {
        int[] mask = new int[8];
        for (Buffstat statup : statups.keySet()) {
            mask[(statup.getPosition() - 1)] |= statup.getValue();
        }
        for (int i = mask.length; i >= 1; i--) {
            mplew.writeInt(mask[(i - 1)]);
        }
    }
    
    public static List<Pair<MapleBuffStat, Integer>> sortBuffStats(Map<MapleBuffStat, Integer> statups){
        List<Pair<MapleBuffStat,Integer>> statvals = new ArrayList<>();
        //Buffstats that should always be first in the sort order.
        List<MapleBuffStat> alwaysFirst = Collections.unmodifiableList(Arrays.asList(
            MapleBuffStat.STR, MapleBuffStat.DEX, MapleBuffStat.INT, MapleBuffStat.LUK,
            MapleBuffStat.MP_CON_INCREASE
            ));
        for(Entry<MapleBuffStat,Integer> stat : statups.entrySet()){
            statvals.add(new Pair<>(stat.getKey(), stat.getValue()));
        }
        //TODO: This has O(n^2) time-complexity.  Efficiency, where art thou?
        //TODO: There are still a few buffstat combinations that can get out-of-order.  Needs more investigation.
        boolean changed;
        int i;
        int k;
        //The implementation here is just a bubble-sort, and a crude one at that.
        do{
            changed = false;
            i = 0;
            k = 1;
            for(int iter = 0; iter < statvals.size()-1; iter++){
                Pair<MapleBuffStat, Integer> a = statvals.get(i);
                Pair<MapleBuffStat, Integer> b = statvals.get(k);
                if(a != null && b != null){
                    //Check for position first, but ignore the check if the buffstat is supposed to always be first
                    if((a.left.getPosition() > b.left.getPosition() && !alwaysFirst.contains(a.left) && 
                        (a.left.canStack() && !b.left.canStack())) || 
                        //If the two buffstats have an equal position, sort based on value (lowest to highest).
                       (a.left.getPosition() == b.left.getPosition() && a.left.getValue() > b.left.getValue()) ||
                        //If the buffstat is supposed to be first (and is not behind another always-first buffstat, sort.
                        (alwaysFirst.contains(b.left) && !alwaysFirst.contains(a.left)) ||
                        //Stackable buffstats always come *after* non-stackable ones.
                        (a.left.canStack() && !b.left.canStack())){
                        Pair<MapleBuffStat, Integer> swap = new Pair<>(a.left, a.right);
                        statvals.remove(i);
                        statvals.add(i, b);
                        statvals.remove(k);
                        statvals.add(k, swap);
                        changed = true;
                    }
                }
                i++;
                k++;
            }
        } while (changed);
        
        return statvals;
    }
}

//Next time you decompile a JAR, Sjogren, turn the fucking line number option off. 
/* Location:           C:\Users\Sjogren\Desktop\lithium.jar
 * Qualified Name:     tools.packet.PacketHelper
 * JD-Core Version:    0.6.0
 */
