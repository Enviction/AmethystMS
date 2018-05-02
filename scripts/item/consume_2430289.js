function start() {
    if (im.getInventory(1).getNumFreeSlot() < 1) {
        im.sendOk("Please make some inventory space.");
        im.dispose();
        return;
    }
    im.sendSimple("What item would you like?\r\n#L0##i1302169:##t1302169##l\r\n#L1##i1312068:##t1312068##l\r\n#L2##i1322099:##t1322099##l\r\n#L3##i1332144:##t1332144##l\r\n#L4##i1362057:##t1362057##l\r\n#L5#End Chat#l")
}

function action(mode, type, selection) {
    if (mode != 1 || selection == 5) {
        im.dispose();
        return;
    }
    if (selection == 0) {
        im.gainItem(1302169, 1);
    } else if (selection == 1) {
        im.gainItem(1312068, 1);
    } else if (selection == 2) {
        im.gainItem(1322099, 1);
    } else if (selection == 3) {
        im.gainItem(1332144, 1);
    } else if (selection == 4) {
        im.gainItem(1362057, 1);
    }
    im.removeItem(2430289);
    im.dispose();
}
