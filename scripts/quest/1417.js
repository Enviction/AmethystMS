var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	
	if (status == 0) {
	    qm.sendNext("Wow. You have really growed a lot since I last saw you. But have you heard of the new jobs? ");
	} else if (status == 1) {
	    qm.sendNextPrev("Oh my they are awesome! It's for all mage lvl 30 or above!");
	} else if (status == 2) {
	    qm.askAcceptDecline("So..... Do you want to test your skills against strong enemies, and see if you have what it takes? All you need is 30 Dark Marbles from those monsters! Lets go.");
		qm.forceStartQuest();
	} else if (status == 3) {
	    if (!qm.haveItem(4031013, 30)) {
                qm.warp(910140000);//mage test
                qm.dispose();
	    }else {
		qm.dispose();
		}
            }
            }
            }

function end(mode, type, selection) {
    if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
	    if (qm.haveItem(4031013, 30) ) {
			qm.removeAll(4031013);
			qm.sendOk("Congratulation you're now a Cleric!");
                        qm.changeJob(230);
                        qm.expandInventory(1, 4);
                        qm.expandInventory(4, 4);
                        qm.gainSP(3);
			qm.forceCompleteQuest();
            qm.dispose();
	    }
	}
	}
}