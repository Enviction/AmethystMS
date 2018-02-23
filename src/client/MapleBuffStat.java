/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package client;

import constants.GameConstants;
import handling.Buffstat;
import java.io.Serializable;
import java.util.Comparator;

public enum MapleBuffStat implements Serializable, Buffstat {

    WATK(0x1, 1),
    WDEF(0x2, 1),
    MATK(0x4, 1),
    MDEF(0x8, 1),
    ACC(0x10, 1),
    AVOID(0x20, 1),
    HANDS(0x40, 1),
    SPEED(0x80, 1), //d
    JUMP(0x100, 1), //d
    MAGIC_GUARD(0x200, 1),
    DARKSIGHT(0x400, 1), //d
    BOOSTER(0x800, 1), // d
    POWERGUARD(0x1000, 1),
    MAXHP(0x2000, 1),
    MAXMP(0x4000, 1),
    INVINCIBLE(0x8000, 1),
    SOULARROW(0x10000, 1),
    STUN(0x20000, 1), //STUN: Debuff. Immobilizes character.  Can still do game functions such as chatting, but cannot move or attack.  Value does not seem to affect anything.
    DAMAGE_OVER_TIME(0x40000, 1), //DAMAGE_OVER_TIME: Debuff.  Causes the character to suffer damage equal to the value, once per second.
    SKILL_SEAL(0x80000, 1), //SKILL_SEAL: Debuff.  Causes the character to be unable to use skills, but can still move and use default attack.  Value does not seem to affect anything.

    DARKNESS(0x100000, 1), //DARKNESS: Debuff.  Causes all of the player's physical attacks (magic untested) to miss at an 80% rate.  Value does not seem to affect anything.
    COMBO(0x200000, 1),
    SUMMON(0x200000, 1), //hack buffstat for summons ^.- (does/should not increase damage... hopefully <3)
    WK_CHARGE(0x400000, 1),
    DRAGONBLOOD(0x800000, 1), //Effects unknown -- has not been used since JUMP update.
    HOLY_SYMBOL(0x1000000, 1),
    MESOUP(0x2000000, 1),
    SHADOWPARTNER(0x4000000, 1), // d
    PICKPOCKET(0x8000000, 1),
    PUPPET(0x8000000, 1), // HACK - shares buffmask with pickpocket - odin special ^.-

    MESOGUARD(0x10000000, 1),
    HP_LOSS_GUARD(0x20000000, 1), //prevents HP loss in e.g. elnath, aqua road
    WEAKEN(0x40000000, 1), //WEAKEN: Debuff.  Causes the character to be unable to jump.  Value does not seem to affect anything.
    UNK_1_80000000(0x80000000, 1),

    SLOW(0x1, 2), //SLOW: Debuff.  Reduces movement speed to the specified value.  Overrides all speed boosts.  Can raise speed arbitrarily above speed cap, though extremely high values can glitch the game.
    MORPH(0x2, 2),
    RECOVERY(0x4, 2),
    MAPLE_WARRIOR(0x8, 2),
    STANCE(0x10, 2),
    SHARP_EYES(0x20, 2),
    MANA_REFLECTION(0x40, 2), //Effects unknown -- has not been used since JUMP update.
    STUN_2(0x80, 2), //STUN2: Debuff.  Seems to be the same as normal STUN.

    SPIRIT_CLAW(0x100, 2), // d
    INFINITY(0x200, 2),
    HOLY_SHIELD(0x400, 2), //advanced blessing after ascension
    HAMSTRING(0x800, 2), //Effects unknown -- has not been used since JUMP update.
    BLIND(0x1000, 2), //Effects unknown -- has not been used since JUMP update.
    CONCENTRATE(0x2000, 2),
    UNK_2_4000(0x4000, 2),
    ECHO_OF_HERO(0x8000, 2),
    MESO_RATE(0x10000, 2), //confirmed
    GHOST_MORPH(0x20000, 2),
    ARIANT_COSS_IMU(0x40000, 2), // The white ball around you
    REVERSE(0x80000, 2), //Debuff.  Reverses user's controls.  Value does not seem to affect anything.

    DROP_RATE(0x100000, 2), //d
    UNK_2_200000(0x200000, 2),
    EXPRATE(0x400000, 2),
    ACASH_RATE(0x800000, 2),
    ILLUSION(0x1000000, 2), //hack buffstat
    UNK_2_2000000(0x2000000, 2),
    UNK_2_4000000(0x4000000, 2),
    BERSERK_FURY(0x8000000, 2), //Shows flame effect, but does not seem to actually give anything
    DIVINE_BODY(0x10000000, 2),
    SPARK(0x20000000, 2),
    ARIANT_COSS_IMU2(0x40000000, 2), // no idea, seems the same
    FINALATTACK(0x80000000, 2),
    //4 = unknown

    UNK_3_1(0x1, 3),
    ELEMENT_RESET(0x2, 3),
    WIND_WALK(0x4, 3),
    UNK_3_8(0x8, 3),
    ARAN_COMBO(0x10, 3),
    COMBO_DRAIN(0x20, 3),
    COMBO_BARRIER(0x40, 3),
    BODY_PRESSURE(0x80, 3),
    SMART_KNOCKBACK(0x100, 3),
    PYRAMID_PQ(0x200, 3),
    //8 - debuff
    UNK_3_400(0x400, 3),
    UNK_3_800(0x800, 3),

    //2 - debuff
    SHADOW_DARKNESS(0x1000, 3), //SHADOW_DARKNESS: Same as DAMAGE_OVER_TIME, except the message "You receive damage having been covered by the Shadow of Darkness" displays every damage tick (2 seconds).
    UNK_3_2000(0x2000, 3),
    SLOW_CHAR(0x4000, 3),
    MAGIC_SHIELD(0x8000, 3),
    MAGIC_RESISTANCE(0x10000, 3),
    SOUL_STONE(0x20000, 3),
    SOARING(0x40000, 3),
    FROZEN(0x80000, 3), //FROZEN: Debuff.  Reduces speed by value%, rounded up.  Causes the user to glow blue.  Does *not* override speed boosts, but stacks with them.

    LIGHTNING_CHARGE(0x100000, 3),
    ENRAGE(0x200000, 3), //value is number of mobs hit
    OWL_SPIRIT(0x400000, 3),
    GODMODE(0x800000, 3), //GODMODE: Makes you invincible.  Monsters cannot attack you at all, but you can still attack them.  Aggro still happens.  Value does not seem to affect anything.

    FINAL_CUT(0x1000000, 3),
    DAMAGE_BUFF(0x2000000, 3), //shows in attack range
    ATTACK_BUFF(0x4000000, 3), //attack %? feline berserk
    RAINING_MINES(0x8000000, 3),
    ENHANCED_MAXHP(0x10000000, 3),
    ENHANCED_MAXMP(0x20000000, 3),
    ENHANCED_WATK(0x40000000, 3),
    ENHANCED_MATK(0x80000000, 3),

    ENHANCED_WDEF(0x1, 4),
    ENHANCED_MDEF(0x2, 4),
    PERFECT_ARMOR(0x4, 4), //Incorrect - actual effects unknown
    SATELLITESAFE_PROC(0x8, 4),
    SATELLITESAFE_ABSORB(0x10, 4),
    TORNADO(0x20, 4),
    CRITICAL_RATE_BUFF(0x40, 4),
    MP_BUFF(0x80, 4), //% MP
    DAMAGE_TAKEN_BUFF(0x100, 4),
    DODGE_CHANGE_BUFF(0x200, 4),
    CONVERSION(0x400, 4), //% HP
    REAPER(0x800, 4),
    INFILTRATE(0x1000, 4),
    MECH_CHANGE(0x2000, 4),
    AURA(0x4000, 4),
    DARK_AURA(0x8000, 4),
    BLUE_AURA(0x10000, 4),
    YELLOW_AURA(0x20000, 4),
    BODY_BOOST(0x40000, 4),
    FELINE_BERSERK(0x80000, 4),
    DICE_ROLL(0x100000, 4),
    DIVINE_SHIELD(0x2000000, 4),
    PIRATES_REVENGE(0x400000, 4), //total damage %
    TELEPORT_MASTERY(0x800000, 4),
    COMBAT_ORDERS(0x1000000, 4),
    BEHOLDER(0x2000000, 4),
    TOTAL_DAMAGE_RED(0x400000, 4), //The increase shows in the player's range.
    GIANT_POTION(0x8000000, 4),
    ONYX_SHROUD(0x10000000, 4),
    ONYX_WILL(0x20000000, 4),
    STUN_SLOW(0x40000000, 4), //Combination of STUN and FROZEN.  Reduces movement speed by a percentage (value), but also stuns the player for some reason, making the slow redundant.
    BLESS(0x80000000, 4),
    //1 //blue star + debuff
    //2 debuff	 but idk
    UNK_5_1(0x1, 5),
    UNK_5_2(0x2, 5),
    THREATEN_PVP(0x4, 5),
    ICE_KNIGHT(0x8, 5),
    //1 debuff idk.
    //2 unknown
    UNK_5_10(0x10, 5),
    BLOCK_RECAST(0x20, 5), //Prevents the source skill from being re-cast.  Value does not seem to affect anything.  Other effects (if any) unknown.
    STR(0x40, 5),
    INT(0x80, 5),
    DEX(0x100, 5),
    LUK(0x200, 5),
    //UNK_5_400(0x400, 5), 
    POTENTIAL_LOCK(0x400, 5),//Debuff.  Disables all potential effects.  WARNING: Not handled serverside.
    UNK_5_800(0x800, 5), //Debuff.  Causes the user to get stuck in a spinning animation only if they are a mage, and to lose HP equal to the value per second.

    ANGEL_ATK(0x1000, 5, true),
    ANGEL_MATK(0x2000, 5, true),
    HP_BOOST(0x4000, 5, true), //indie hp
    MP_BOOST(0x8000, 5, true),
    ANGEL_ACC(0x10000, 5, true),
    ANGEL_AVOID(0x20000, 5, true),
    ANGEL_JUMP(0x40000, 5, true),
    ANGEL_SPEED(0x80000, 5, true),
    ANGEL_STAT(0x100000, 5, true),
    PVP_DAMAGE(0x200000, 5),
    PVP_ATTACK(0x400000, 5), //skills
    INVINCIBILITY(0x800000, 5),
    HIDDEN_POTENTIAL(0x1000000, 5), //Value doesn't do anything, apparently.
    ELEMENT_WEAKEN(0x2000000, 5), //unsure if lower ER outside of PVP
    SNATCH(0x4000000, 5), //however skillid is 90002000, 1500 duration
    SLOW_CHAR_FROZEN(0x8000000, 5),
    //1, unknown
    UNK_5_10000000(0x1000000, 5), //Causes crash.  Effects unknown.
    ICE_SKILL(0x20000000, 5),
    //4 - debuff
    STUN_3(0x40000000, 5), //Yep, another stun.  Works exactly the same as the other two.
    BOUNDLESS_RAGE(0x80000000, 5),
    
    //2 = debuff
    MP_CON_INCREASE(0x1, 6),
    UNK_6_2(0x2, 6),
    C_SPEEDINFUSION(0x4, 6), //Custom: Attack Speed increase.  Actual effects not known.
    UNK_6_8(0x8, 6), //Buff icon does not appear.
    HOLY_MAGIC_SHELL(0x10, 6), //max amount of attacks absorbed
    UNK_6_20(0x20, 6),
    ARCANE_AIM(0x100, 6, true),
    BUFF_MASTERY(0x80, 6), //buff duration increase

    ABNORMAL_STATUS_R(0x100, 6), // %
    ELEMENTAL_STATUS_R(0x200, 6), // %
    WATER_SHIELD(0x400, 6),
    DARK_METAMORPHOSIS(0x800, 6), // mob count
    BARREL_ROLL(GameConstants.GMS ? 0x1000 : 0x100, 6),
    SPIRIT_SURGE(0x2000, 6),
    SPIRIT_LINK(0x4000, 6, true),
    UNK_6_8000(0x8000, 6),

    VIRTUE_EFFECT(0x10000, 6),
    U_6_20000(0x20000, 6),
    UNK_6_40000(0x40000, 6), //Crashes
    CRITICAL_RATE(0x80000, 6),

    NO_SLIP(0x100000, 6),
    FAMILIAR_SHADOW(0x200000, 6),
    MISS_GODMODE(0x400000, 6), //When set, causes all attacks to automatically miss the character.  Value does not seem to affect anything; regardless of the buffstat value, the dodge rate will always be 100%.
    UNK_6_800000(0x800000, 6), //Does not show buff icon.

    CRITICAL_RATE_RED(0x1000000, 6),
    UNK_6_2000000(0x2000000, 6),
    UNK_6_4000000(0x4000000, 6), //Does not show buff icon.
    UNK_6_8000000(0x8000000, 6), //Does not show buff icon.

    UNK_6_10000000(0x10000000, 6),
    ABSORB_DAMAGE_HP(0x20000000, 6), //This is not correct.  Real effect unknown.
    DEFENCE_BOOST_R(0x40000000, 6), // weapon def and magic def
    UNK_6_80000000(0x80000000, 6),

    // 0x8 got somekind of effect when buff ends...
    C_CONSUME_HP(0x1, 7),
    C_TOGGLE_SKILL(0x2, 7),
    ABSORB_DAMAGE_HP_C(0x4, 7),
    UNK_7_8(0x8, 7),

    UNK_7_10(0x10, 7),
    UNK_7_20(0x20, 7), //Crashes
    DECENT_ADVANCE_BLESS(0x40, 7),
    STUN_ROCK(0x80, 7), //Same as other stuns, except some rock effect shows when the buff ends.

    UNK_7_100(0x100, 7),
    HP_BOOST_PERCENT(0x200, 7, true),
    MP_BOOST_PERCENT(0x400, 7, true),
    TOTAL_DAMAGE(0x800, 7), //Increase still shows in the user's range, but without being highlighted in red.

    UNKNOWN_DEF(0x1000, 7), //Effects of this are unpredictable.  Seems to always raise WDEF to 9999 regardless of value, yet will not raise MDEF unless the value is < 0.  When MDEF is increased, it is always multiplied by approximately 5; the exact multiplier seems highly random and I am unable to discern any pattern between the value and the DEF increase.  Does not show a buff icon.
    UNK_7_2000(0x2000, 7),
    UNK_7_4000(0x4000, 7, true),
    UNK_7_8000(0x8000, 7),

    WEAPON_MAGIC_ATTACK(0x10000, 7, true), //Adds MATK and WATK both
    UNK_7_20000(0x20000, 7, true),
    UNK_7_40000(0x40000, 7, true),
    UNK_7_80000(0x80000, 7, true),

    UNK_7_100000(0x100000, 7, true),
    UNK_7_200000(0x200000, 7), //crash
    ARIA_ARMOR(0x400000, 7), //LOL ARE U STUPID
    KILL_COUNT(0x800000, 7),
    
    UNK_7_1000000(0x1000000, 7),
    UNK_7_2000000(0x2000000, 7),
    SLOW_CHAR_2(0x4000000, 7), //Seems to be same as normal slow.
    UNK_7_8000000(0x8000000, 7),
    
    UNK_7_10000000(0x10000000, 7),
    UNK_7_20000000(0x20000000, 7),
    UNK_7_40000000(0x40000000, 7),
    IGNORE_DEFENSE_R(0x80000000, 7), //:3

    /*KILL_COUNT(GameConstants.GMS ? 0x800000 : 0x80000, 7),
    PHANTOM_MOVE(GameConstants.GMS ? 0x8 : 0x80000000, GameConstants.GMS ? 8 : 7),
    JUDGMENT_DRAW(GameConstants.GMS ? 0x10 : 0x1, 8),*/
    PHANTOM_MOVE(0x8, 8),
    JUDGMENT_DRAW(0x10, 8),
    U_8_20(0x20, 8),
    U_8_40(0x40, 8),
    U_8_80(0x80, 8),
    U_8_100(0x100, 8),
    U_8_200(0x200, 8),
    U_8_400(0x400, 8),
    U_8_800(0x800, 8), //not SI
    U_8_1000(0x1000, 8),
    U_8_2000(0x2000, 8),
    U_8_4000(0x4000, 8),
    U_8_8000(0x8000, 8),
    U_8_10000(0x10000, 8),
    U_8_20000(0x20000, 8),
    U_8_40000(0x40000, 8),
    U_8_80000(0x80000, 8),
    U_8_100000(0x100000, 8),
    U_8_200000(0x200000, 8),
    U_8_400000(0x400000, 8),
    U_8_800000(0x800000, 8),
    U_8_1000000(0x1000000, 8),
    ENERGY_CHARGE(0x2000000, 8),
    DASH_SPEED(0x4000000, 8),
    DASH_JUMP(0x8000000, 8),
    MONSTER_RIDING(0x10000000, 8),
    SPEED_INFUSION(0x20000000, 8),
    HOMING_BEACON(0x40000000, 8),
    
    DEFAULT_BUFFSTAT(0x80000000, 8);
    private static final long serialVersionUID = 0L;
    private final int buffstat;
    private final int first;
    private boolean stacked = false;
    // [8] [7] [6] [5] [4] [3] [2] [1]
    // [0] [1] [2] [3] [4] [5] [6] [7]

    private MapleBuffStat(int buffstat, int first) {
        this.buffstat = buffstat;
        this.first = first;
    }

    private MapleBuffStat(int buffstat, int first, boolean stacked) {
        this.buffstat = buffstat;
        this.first = first;
        this.stacked = stacked;
    }

    public final int getPosition() {
        return getPosition(false);
    }

    public final int getPosition(boolean fromZero) {
        if (!fromZero) {
            return first; // normal one
        }
        switch (first) {
            case 8:
                return 0;
            case 7:
                return 1;
            case 6:
                return 2;
            case 5:
                return 3;
            case 4:
                return 4;
            case 3:
                return 5;
            case 2:
                return 6;
            case 1:
                return 7;
        }
        return 0; // none
    }

    public final int getValue() {
        return buffstat;
    }

    public final boolean canStack() {
        return stacked;
    }
}
