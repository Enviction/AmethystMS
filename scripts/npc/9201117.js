/* Author: Xterminator
	NPC Name: 		Heena
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Takes you outside of Training Camp
*/
var status = 0;

function start() {
    cm.sendSimple("Please choose the job you would like to be ?\r\n#r#e Please remember to vote for us every 6 hours <3 Thank you! #b\r\n#L0#Mercedes#l\r\n#L1#Demon Slayer#l\r\n#L2#Cannoneer#l\r\n#L3#Dual Blades#l\r\n#L4#Jett\r\n#L5#Phantom\r\n#L6#Mihile");
    
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("Come back when you want to create one.");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (selection == 0) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
                cm.changeJob(2300);
                cm.gainItem(1522000,1);
                cn.gainItem(1352004,1);
                cm.sendOk("You have successfully created a Mercesdes.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a legend character because your level is too high or you had already job advanced.");
                cm.dispose();
            }
        } else if (selection == 1) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
                cm.changeJob(3100);
                cm.gainItem(1322112, 1);
                cm.sendOk("Your have successfully created a Demon Slayer.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a legend character because your level is too high or you had already job advanced.");
                cm.dispose();
            }
        } else if (selection == 2) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
                cm.changeJob(530);
                cm.sendOk("You have successfully created a Cannoneer.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a legend character because your level is too high or you had already job advanced.");
                cm.dispose();
            }
        } else if (selection == 3) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
				cm.changeJob(430);
                cm.sendOk("You have successfully created a Dual Blade.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a Dual Blade character because your level is too high or you had already job advanced.");
                cm.dispose();
  
			}
		} else if (selection == 4) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
				cm.changeJob(508);
                cm.sendOk("You have successfully created a Jett.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a Jett character because your level is too high or you had already job advanced.");
                cm.dispose();
				
			}
		} else if (selection == 5) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
				cm.changeJob(2400);
                cm.sendOk("You have successfully created a Dual Blade.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a Phantom character because your level is too high or you had already job advanced.");
                cm.dispose();
				
            }
      } else if (selection == 6) {
            if (cm.getPlayerStat("LVL") == 10 && cm.getJob() == 0) {
				cm.changeJob(5100);
                cm.sendOk("You have successfully created a Dual Blade.");
                cm.dispose();
            } else {
                cm.sendOk("You may not create a Mihile character because your level is too high or you had already job advanced.");
                cm.dispose();
            }
        } else {
            cm.sendOk("Come back later.");
            cm.dispose();
    }
}

}






