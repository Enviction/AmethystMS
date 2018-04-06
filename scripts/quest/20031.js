/*
	NPC Name: 		NPC IN NLC
	Description: 		Quest - The Mayor of
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	qm.dispose();
	return;
    }
    if (status == 0) {
	if(qm.itemQuantity(4033194) || qm.itemQuantity(4033195) >= 1)
	{
	qm.sendNext("What took so long?! You better not have been rooting through my things!\r\n\r\n#b#L0#I wasn't, but I found this letter up there by the potion box... It's from some guy named Chromile.#l");
	} else {
	qm.forceStartQuest();
	qm.dispose();
	}
    } else if (status == 1) {	
	qm.sendNext("What?! Who told you could touch that?!");
    } else if (status == 2) {
	qm.lock();
	qm.sendPlayerToNpc("Another great day with the old man...");
	qm.getPlayer().levelUp();
	qm.getPlayer().levelUp();
    } else if (status == 2) {
	qm.sendPlayerToNpc("Huh? What's that?");
    } else if (status == 3) {
	qm.warp(913070002);
	qm.forceCompleteQuest();
	qm.dispose();
    }
}

