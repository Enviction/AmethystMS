var status = -1;

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	qm.dispose();
	return;
    }
    if (status == 0) {
	if(qm.getLevel() == 4){
	qm.forceStartQuest();
	qm.dispose();
	} else {
	qm.sendNext("Are you done cleaning yet? I suppose it looks moderately\r\npresentable in here. what are you looking at? Go organize the shelves!");
	}
    } else if (status == 1) {
	qm.getPlayer().levelUp();
	qm.forceCompleteQuest();
	qm.warp(913070003);
	qm.dispose();
    }
}

