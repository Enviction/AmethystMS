var data = [[10, 0, 300, "Archer"], [30, 300, 310, "Hunter"], [30, 300, 320, "Crossbowman"]];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So you heard, would you like to advance?\r\n#b#L0#Archer (Level 10 - Beginner)#l\r\n#L1#Hunter (Level 30 - Archer)#l\r\n#L2#Crossbowman (Level 30 - Archer)#l\r\n#L3#How do I job advance?");
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
		if(s == 3) {
			 cm.sendOk("You will auto job advance at your correct levels.");
		}
		cm.dispose();
	}
}