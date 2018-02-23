var status = -1; 
var map = Array(690000066, 910530000, 682000200, 980044000, 980042000, 980041000, 922020000, 900000000, 910360000,910360100,910360200,800040210,709000604); //add more maps here and remember to add npc 9201225 - Treasure Chest at the end of it.
function start() { 
    action(1, 0, 0); 
}
function action(mode, type, selection) {
    if (mode == 1) 
    status++;
    else {
        cm.dispose();
        return; 
    }
    if (status == 0) { 
        var text = "Oh you have a #i4001002#?\r\nHonestly, you be #rCRAY#k #d#h ##k!.\r\nA #p9201225# will await you at the end.\r\nNow, choose a JumpQuest map to go to:\r\n";
        for(var i = 0; i < map.length ; i++)
             text += "#L" + i + "##m" + map[i] + "##l\r\n";
        cm.sendSimple(text);
     }else if (status == 1) {
	if (cm.haveItem(4001002) < 1) {
	    cm.sendNext("You don't have a #i4001002#! YOU LIED TO ME ! #gTalk to Shane#k to get one. ");
	    cm.dispose();
	} else {
        cm.warp(map[selection],0);
        cm.dispose();
    }
}

}  