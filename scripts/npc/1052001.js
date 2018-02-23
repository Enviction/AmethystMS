/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)

	Custom Quest 100009, 100011
*/

var data = [[10, 0, 400, "Rogue"], [20, 400, 430, "DualBlade"], [30, 400, 410, "Assassin"], [30, 400, 420, "Bandit"]];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So you heard, would you like to advance?\r\n#b#L0#Rogue (Level 10 - Beginner)l\r\n#L1#DualBlade (Level 20 - Rogue)#l\r\n#L2#Assassin (Level 30 - Rogue)#l\r\n#L3#Bandit (Level 30 - Rogue)#l\r\n#L4#How do I job advance?");
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
		if(s == 4) {
			 cm.sendOk("You will auto job advance at your correct levels.");
		}
		cm.dispose();
	}
}