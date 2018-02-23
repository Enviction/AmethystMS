
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("Have a nice day!");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("Ah hello! I'm the #rHiddenMS#k Gender Bender. I can transform you into the opposite Gender. So, what do you say? Do you want to change your sex?");
        }
        if (status == 1) {
            cm.sendNext("Yay! I'm offering #r3 packages#k for sex changes, so pick one and I'll get started!\r\n*Requires 1 million mesos!*\r\n#d#L3#I want a Penis#l\r\n#L4#I want a Vagina#l\r\n#e#L5#I want to be Lady Gaga#n.#l#k");
        }
		if (status == 2 && selection == 3){
		if (cm.getMeso() >= 1000000) {
		cm.gainMeso(-1000000);
		cm.getPlayer().setGender(0);
		cm.getPlayer().fakeRelog();
		cm.sendOk("You are now #emale.#n");
		cm.dispose();
		} else {
		cm.sendOk("You are lacking the required mesos to do this.");
        cm.dispose();
		} 
		} if (status == 2 && selection == 4){
		if (cm.getMeso() >= 1000000) {
		cm.gainMeso(-1000000);
		cm.getPlayer().setGender(1);
		cm.getPlayer().fakeRelog();
		cm.sendOk("You are now #efemale.#n");
		cm.dispose();
		} else {
		cm.sendOk("You are lacking the required mesos to do this.");
        cm.dispose();
		}
}		
		if (status == 2 && selection == 5){
		cm.sendOk("Coming Soon!");
		cm.dispose();
		/*if (cm.getMeso() >= 1000000) {
		cm.gainMeso(-1000000);
			cm.getPlayer().setGender(2);
			cm.getPlayer().fakeRelog();
			cm.sendOk("You are now #eLady Gaga.#n");
			cm.dispose();
		} else {
		cm.sendOk("You are lacking the required mesos to do this.");
        cm.dispose();
		} */ 
		}
    }
}  