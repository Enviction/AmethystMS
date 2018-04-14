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
	    if (!qm.haveItem(4031343) && !qm.haveItem(4031344)) {
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
                //Hero
                qm.teachSkill(1120003, 0, 10);
                qm.teachSkill(1121000, 0, 10);
                qm.teachSkill(1121001, 0, 10);
                qm.teachSkill(1121002, 0, 10);
                qm.teachSkill(1121008, 0, 10);
                qm.teachSkill(1121010, 0, 10);
                qm.teachSkill(1121011, 0, 5);
                qm.teachSkill(1120012, 0, 10);
                qm.teachSkill(1120013, 0, 10);
                qm.teachSkill(1121006, 0, 10);
                //Paladin
                qm.teachSkill(1220005, 0, 10);
                qm.teachSkill(1220006, 0, 10);
                qm.teachSkill(1221000, 0, 10);
                qm.teachSkill(1220013, 0, 10);
                qm.teachSkill(1221002, 0, 10);
                qm.teachSkill(1221012, 0, 5);
                qm.teachSkill(1220010, 0, 10);
                qm.teachSkill(1221011, 0, 10);
                qm.teachSkill(1221007, 0, 10);
                qm.teachSkill(1221009, 0, 10);
                qm.teachSkill(1221004, 0, 10);
                //Dark Knight
                qm.teachSkill(1320008, 0, 10);
                qm.teachSkill(1320011, 0, 10);
                qm.teachSkill(1321010, 0, 5);
                qm.teachSkill(1321012, 0, 10);
                qm.teachSkill(1320009, 0, 10);
                qm.teachSkill(1321002, 0, 10);
                qm.teachSkill(1321007, 0, 10);
                qm.teachSkill(1320006, 0, 10);
                qm.teachSkill(1321001, 0, 10);
                qm.teachSkill(1321000, 0, 10);
                qm.teachSkill(1321003, 0, 10);
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
