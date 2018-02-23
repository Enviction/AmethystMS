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
	if(qm.itemQuantity(4033196) >= 10)
	{
	qm.sendNext("Where's the eggs? I told you to get eggs. If you broke them... Wait a second, what happened to you?\r\n\r\n#b#L0#Uh, well, you know how you told me not to mess with Bigby? Well... I kinda... he got out.#l");
	} else {
	qm.forceStartQuest();
	qm.dispose();
	}
    } else if (status == 1) {	
	qm.sendNext("What?!! I swear to every deity I can think of, you will starve to death if that dog is not in my yard by dinnertime.");
    } else if (status == 2) {
	qm.lock();
	qm.sendPlayerToNpc("What ever you say master!");
	qm.getPlayer().levelUp();
	qm.getPlayer().levelUp();
    } else if (status == 2) {
	qm.sendPlayerToNpc("Huh? What's that?");
    } else if (status == 3) {
	qm.gainItem(4033196,-10);
	qm.warp(913070004);
	qm.forceCompleteQuest();
	qm.dispose();
    }
}

