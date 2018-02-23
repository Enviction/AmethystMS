/* Author: Hashed/Prio
 * ID: 1101002
 * Name: Neinheart
 * Function: Tactician
 * Uncoded NPC, created with TraNpcExtractor v0.3.0
 * TraNpcExtractor was written by Prio from StaticDEV.com
 */

var data = [[10, 1000, 1100, "Dawn Warrior"], [10, 1000, 1200, "Blaze Wizard"], [10, 1000, 1300, "Wind Archer"], [10, 1000, 1400, "Night Walker"], [10, 1000, 1500, "Thunder Breaker"]];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So you heard, would you like to advance?\r\n#b#L0#Dawn Warrior (Level 10 - Noblesse)\r\n#L1#Blaze Wizard (Level 10 - Noblesse)#l\r\n#L2#Wind Archer (Level 10 - Noblesse)#l\r\n#L3#Night Walker (Level 10 - Noblesse)#l\r\n#L4#Thunder Breaker (Level 10 - Noblesse)#l\r\n#L5#How do I job advance?");
	} else {
		for (var i = 0; i < data.length; i++) {
		    if(s == i) {
				if (cm.getPlayerStat("LVL") >= data[i][0] && cm.getJob() == data[i][1]) {
					cm.changeJob(data[i][2]);
				} else {
					cm.PlayerToNpc("Oh Snap!\r\nI can't be a #b"+data[i][3]+"#k... Guess I should train more to become one!");
				}
			}
		}
		if(s == 5) {
			 cm.sendOk("You will auto job advance at your correct levels.");
		}
		cm.dispose();
	}
}