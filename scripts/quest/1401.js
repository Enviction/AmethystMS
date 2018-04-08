/* 
Warrior Job Advancement
Dances with Balrog
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
	qm.sendYesNo("I am glad to see you here in person. If you are ready, I will declare you a Warrior. There will be no going back.");
    } else if (status == 1) {
	qm.sendNext("Now that you have become a Warrior, you will be much more powerful. Try out your new strength and skills. You'll be pleasantly surprised.");
	if (qm.getJob() == 0) {
            qm.resetStats(35, 4, 4, 4);
	    qm.gainItem(1302077,1);
	    qm.expandInventory(1, 4);
	    qm.expandInventory(4, 4);
	    qm.changeJob(100);
            qm.gainSP(1);
	}
	qm.forceCompleteQuest();
    } else if (status == 2) {
	qm.sendNextPrev("I have also expanded your inventory slot counts for your equipment and etc. inventory. Use those slots wisely and fill them up with items required for Resistance to carry.");
    } else if (status == 3) {
	qm.sendNextPrev("Now... go Warrior show me what you are made of.");
	qm.safeDispose();
    }
}


