var data = [20, 400, 430, "DualBlade"];

function action(m,t,s) {
	if(t == 0) {
		cm.sendSimple("So I guess you have heard, would you want to be a DualBlade?\r\n#b#L0#Yes (Level 20 - Rogue)");
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