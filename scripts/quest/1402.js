/* 
Magician Job Advancement
Grendel the Really Old
Made by Amity - Amethyst
 */

var status = -1;

function end(mode, type, selection) {
    if (mode == 0) {
	if (status == 0) {
	    qm.sendNext("This is an important decision to make.");
	    qm.safeDispose();
	    return;
	}
	status--;
    } else {
	status++;
    }
    if (status == 0) {
	qm.sendYesNo("I am glad to see you here in person. If you are ready, I will declare you a Magician. There will be no going back.");
    } else if (status == 1) {
	qm.sendNext("Now that you have become a Magician, you will be much more powerful. Try out your new wisdom and skills. You'll be pleasantly surprised.");
	if (qm.getJob() == 0) {
            qm.resetStats(4, 4, 35, 4);
	    qm.gainItem(1372043,1);
	    qm.expandInventory(1, 4);
	    qm.expandInventory(4, 4);
	    qm.changeJob(200);
            qm.gainSP(1);
	}
	qm.forceCompleteQuest();
    } else if (status == 2) {
	qm.sendNextPrev("I have also expanded your inventory slot counts for your equipment and etc. inventory. Use those slots wisely and fill them up with items required for Resistance to carry.");
    } else if (status == 3) {
	qm.sendNextPrev("Now... go Magician show me, your wisdom.");
	qm.safeDispose();
    }
}


