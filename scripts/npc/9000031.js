/*
Author : Wh1Sk3Y   
*/

var status = -1;
var Option;

function start() {
    status = -1;
    action(1, 0, 0);
}

function start() {
    cm.sendSimple("Beautiful Day isn't it! #h #? \r\nI am collecting Maple Leaves to make a Maple Syrup,\r\nDo you have them? I will exchange it with a rare coin! \r\n#L1# Yes, I do. #l \r\n#L2# Maybe Later#l \r\n");
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    } else {
	status++;
    }
    if (status == 0) {
	Option = selection;
	if (Option == 1) {
	   	cm.sendGetNumber("#eHow many coins would you like to have?#b \r\n \r\n          #b25#v4001126##k #b for 1 #b#v4310028##k \r\n \r\n", 0, 0, 5000);
		status = 9;	
	} else if (Option == 2) {
		cm.sendOk("Ok, see you next time...");
	}
	} else if (status == 10) {
		if (selection == 0) {
			cm.sendOk("If you don't want to trade any leaves, then you won't get exp.");
			cm.dispose();
			return;
		}
		if (!cm.haveItem(4001126, selection * 25)) {
			cm.sendOk("Insufficient amount of Leaves!.");
			cm.dispose();
			return;
		}
		cm.gainItem(4001126, -selection * 25);
		cm.gainItem(4310028,  selection);
		cm.sendOk("Good Luck!");
		cm.dispose();
    }
}