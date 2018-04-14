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
		if (mode == 0) {
		qm.sendNext("Courage is more important than any skill. Believe in yourself.");
		qm.dispose();
		} else {
	    if (!qm.haveItem(4031861) && !qm.haveItem(4031860)) {
		qm.forceStartQuest();
		qm.dispose();
	    } else {
		qm.sendYesNo("You proved that everything you need to be a true hero exists within yourself. There is nothing left for you to prove. Are you ready to realize your full potential?");
		}
		}
		} else if (status == 1) {
		qm.forceCompleteQuest();
		//Buccaneer 
		qm.teachSkill(5121012, 0, 5); //Double Dice
		qm.teachSkill(5120014, 0, 10); //Typhoon Crush
		qm.teachSkill(5121001, 0, 10); //Dragon Strike
		qm.teachSkill(5121007, 0, 10); //OctoPunch
		qm.teachSkill(5121009, 0, 10); //Speed Fusion
		qm.teachSkill(5121010, 0, 10); //Leap Time
		qm.teachSkill(5121013, 0, 10); //Nautilus Strike
		qm.teachSkill(5121015, 0, 10); //CrossBones
		qm.teachSkill(5121016, 0, 10); //Buccaneer Blast
                //Corsair
		qm.teachSkill(5220012, 0, 10); //Mastery
		qm.teachSkill(5220014, 0, 5); //Double Dice
		qm.teachSkill(5220019, 0, 10); //Ahoy Mateys
		qm.teachSkill(5220020, 0, 10); //Majestic Presence
		qm.teachSkill(5221004, 0, 10); //Rapid Fire
		qm.teachSkill(5221013, 0, 10); //Nautilus Strike
		qm.teachSkill(5221015, 0, 10); //Parrotargetting
		qm.teachSkill(5221016, 0, 10); //Brain Scrambler
		qm.teachSkill(5221017, 0, 10); //Eight-Legs Easton
		qm.teachSkill(5221018, 0, 10); //Jolly Roger
		//Cannon Master
		qm.teachSkill(5320007, 0, 10); //Double Dice
		qm.teachSkill(5320008, 0, 10); //Mega Monkey Magic
		qm.teachSkill(5320009, 0, 10); //Cannon OverLoad
		qm.teachSkill(5320011, 0, 10); //Monkey Militia
		qm.teachSkill(5321000, 0, 10); //Cannon Bazooka 
		qm.teachSkill(5321001, 0, 10); //Nautilus Strike
		qm.teachSkill(5321003, 0, 10); //Anchors Aweigh
		qm.teachSkill(5321004, 0, 10); //Monkey Militia #2?
		qm.teachSkill(5321010, 0, 10); //Pirates Spirit
		qm.teachSkill(5321012, 0, 10); //Cannon Barrage
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