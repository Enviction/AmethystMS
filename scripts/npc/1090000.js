/* Author: Xterminator
	NPC Name: 		Kyrin
	Map(s): 		The Nautilus : Navigation Room (120000101)
	Description: 		Pirate Instructor
*/

var data = [[10, 0, 500, "Pirate"], [30, 500, 510, "Brawler"], [30, 500, 520, "Gunslinger"], [30, 508, 570, "Jett"], [30, 501, 530, "Cannoneer"]];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So you heard, would you like to advance?\r\n#b#L0#Pirate (Level 10 - Beginner)\r\n#L1#Brawler (Level 30 - Pirate)#l\r\n#L2#Gunslinger (Level 30 - Pirate)#l\r\n#L3#Jett (Level 30 - Jett)#l\r\n#L4#Cannoneer (Level 30 - Cannoneer)#l\r\n#L5#How do I advance?");
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