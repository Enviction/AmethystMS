var data = [[10, 0, 100, "Swordsman"], [30, 100, 110, "Fighter"], [30, 100, 120, "Page"], [30, 100, 130, "Spearman"]];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So you heard, would you like to advance?\r\n#b#L0#Swordsman (Level 10 - Beginner)#l\r\n#L1#Fighter (Level 30 - Swordsman)#l\r\n#L2#Page (Level 30 - Swordsman)#l\r\n#L3#Spearman (Level 30 - Swordsman)#l\r\n#L4#How do I job advance?");
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