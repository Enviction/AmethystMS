var data = [[8, 0, 200, "Magician"], [30, 200, 210, "Fire & Poison Wizard"], [30, 200, 220, "Ice & Lightning Wizard"], [30, 200, 230, "Cleric"]];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So you heard, would you like to advance?\r\n#b#L0#Magician (Level 8 - Beginner)l\r\n#L1#Fire & Poison Wizard (Level 30 - Magician)#l\r\n#L2#Ice & Lightning Wizard (Level 30 - Magician)#l\r\n#L3#Cleric (Level 30 - Magician)#l\r\n#L4#How do I job advance?");
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