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
	    if (!qm.haveItem(4031517) && !qm.haveItem(4031518)) {
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
                //Night Lord
                qm.teachSkill(4121000, 0, 10);
                qm.teachSkill(4121003, 0, 10);
                qm.teachSkill(4121009, 0, 5);
                qm.teachSkill(4120011, 0, 10);
                qm.teachSkill(4121013, 0, 10);
                qm.teachSkill(4121016, 0, 10);
                qm.teachSkill(4121015, 0, 10);
                qm.teachSkill(4121014, 0, 10);
                //Shadower
                qm.teachSkill(4221000, 0, 10);
                qm.teachSkill(4220002, 0, 10);
                qm.teachSkill(4221008, 0, 5);
                qm.teachSkill(4221007, 0, 10);
                qm.teachSkill(4221006, 0, 10);
                qm.teachSkill(4221001, 0, 10);
                qm.teachSkill(4220011, 0, 10);
                qm.teachSkill(4221013, 0, 10);
                qm.teachSkill(4221010, 0, 10);
                qm.teachSkill(4220012, 0, 10);
                //Blade Master
                qm.teachSkill(4341000, 0, 10);
                qm.teachSkill(4341002, 0, 10);
                qm.teachSkill(4341004, 0, 10);
                qm.teachSkill(4341006, 0, 10);
                qm.teachSkill(4341007, 0, 10);
                qm.teachSkill(4341008, 0, 5);
                qm.teachSkill(4341009, 0, 10);
                qm.teachSkill(4340010, 0, 10);
                qm.teachSkill(4341011, 0, 10);
                qm.teachSkill(4340012, 0, 10);
                qm.teachSkill(4340013, 0, 10);
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
