/* Author: Syre
*/
var status = -1;
function end(mode, type, selection) {
    if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
		if (mode == 1) {
	    if (!qm.haveItem(4031515) && !qm.haveItem(4031514)) {
		qm.forceStartQuest();
		qm.dispose();
	    } else {
		qm.sendYesNo("You proved that everything you need to be a true hero exists within yourself. There is nothing left for you to prove. Are you ready to realize your full potential?");
		}
		} else {
		qm.sendNext("Courage is more important than any skill. Believe in yourself.");
		qm.dispose();
		}
		} else if (status == 1) {
		qm.forceCompleteQuest();
                //Bow Master
                qm.teachSkill(3120005, 0, 10);
                qm.teachSkill(3121000, 0, 10);
                qm.teachSkill(3121002, 0, 10);
                qm.teachSkill(3121004, 0, 10);
                qm.teachSkill(3121007, 0, 10);
                qm.teachSkill(3120006, 0, 10);
                qm.teachSkill(3121009, 0, 5);
                qm.teachSkill(3120008, 0, 10);
                qm.teachSkill(3120010, 0, 10);
                qm.teachSkill(3120011, 0, 10);
                qm.teachSkill(3120012, 0, 10);
                //Marksman
                qm.teachSkill(3220004, 0, 10);
                qm.teachSkill(3221000, 0, 10);
                qm.teachSkill(3220010, 0, 10);
                qm.teachSkill(3221002, 0, 10);
                qm.teachSkill(3221001, 0, 10);
                qm.teachSkill(3221006, 0, 10);
                qm.teachSkill(3220005, 0, 10);
                qm.teachSkill(3221007, 0, 10);
                qm.teachSkill(3221008, 0, 5);
                qm.teachSkill(3220009, 0, 10);
                qm.teachSkill(3220012, 0, 10);
		qm.expandInventory(1, 8); //Expand equip
                qm.expandInventory(2, 8); //Expand USE
		qm.expandInventory(3, 8); //Expand ETC
		qm.getPlayer().changeJob(qm.getPlayer().getJob() + 1);
                qm.gainAp(5);
                qm.gainSP(3);
		qm.sendNext("You started your journey as a simple adventurer...but you have grown so much since then. You possess great strength, willpower, and courage.");
		} else if (status == 2) {
		qm.sendNextPrev("If one who posesses all of these qualities cannot be called a hero, then who can?");
		} else if (status == 3) {
		qm.sendOk("A hero is not born, but is created through struggle. Accept your destiny, and lead Maple World to a brighter future.");
		qm.dispose();
		 }
    }
}
