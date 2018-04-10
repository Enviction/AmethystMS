function start() {
    cm.sendYesNo("You can use the Sparkling Crystal to go back to the real world. Are you sure you want to go back?");
}

function action(mode, type, selection) {
    if (mode == 1) {
	var map = cm.getMapId();
	var tomap;

	if (map == 910540100) {
	    tomap = 211040401;
	} else if (map == 910540200) {
	    tomap = 211040401;
	} else if (map == 910540300) {
	    tomap = 211040401;
	} else if (map == 910540400) {
	    tomap = 211040401;
	} else if (map == 910540500) {
	    tomap = 211040401;
	}
	cm.warp(tomap);
    }
    cm.dispose();
}
