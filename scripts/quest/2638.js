/* 
	NPC Name: 		Lady syl
	Map(s): 		103050101
	Description: 		Quest - Becoming a blade recruit
*/
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
	    qm.forceStartQuest();
            qm.warp(910350300);
            qm.dispose();
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
	    qm.forceCompleteQuest();
            qm.changeJob(433);
			qm.gainSP(3);
			qm.gainItem(4031013,-30);
                        qm.expandInventory(1, 4);
                        qm.expandInventory(4, 4);
			qm.gainItem(1342001, 1);
			qm.fakeRelog();
            qm.dispose();
        }
    }
}