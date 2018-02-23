var status = -1;

function start(mode, type, selection) {
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
	qm.sendYesNo("Have you made your decision? The decision will be final, so think carefully before deciding what to do. Are you sure you want to become a Wild Hunter?");
    } else if (status == 1) {
	qm.sendNext("I have just molded your body to make it perfect for a Wild Hunter. If you wish to become more powerful, use Stat Window (S) to raise the appropriate stats. If you arn't sure what to raise, just click on #bAuto#k.");
	
    } else if (status == 2) {
	qm.sendNextPrev("Now... I want you to go out there and show the world how the Resistance operate.");
	    qm.gainItem(1302182,1);
	    qm.gainItem(1052444,1);
	    //qm.gainItem(1142400,1);
	    qm.expandInventory(1, 4);
	    qm.expandInventory(2, 4);
	    qm.expandInventory(4, 4);
    } else if (status == 3) {
	    
	qm.changeJob(3300);
	qm.forceCompleteQuest();
	qm.warp(130000000,0);
	qm.dispose();
    }
}