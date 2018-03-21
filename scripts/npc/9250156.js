/*
	Researcher Apears - Pink Zakum Raid (689013010)
*/

var status = -1;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	cm.sendYesNo("OAWK OAWK you can make your escape to a safer place through me. Noob? would you like to leave this place?");
    } else if (status == 1) {
	cm.warp(262000300);
	if (cm.getPlayerCount(262000300) == 0) {
		cm.getMap(262000300).resetReactors();
	}
	cm.dispose();
    } else {
	cm.dispose();
	}
}
