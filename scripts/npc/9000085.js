var status = -1;var item = false;
var map = false;
function start() {
    cm.sendSimple("Please choose which method you would like. \r\n#L0#Search by item name#l\r\n#L1#Search mobs on map#l");
 
}
function action(mode, type, selection) {
    status++;
    if (mode != 1) {
    cm.dispose();
    return;
    }
    if (!item && !map) 
        if (selection == 0)
            item = true;    
        else if (selection == 1)
            map = true;
        if (item)
        items(selection);
        else if (map)
        maps(selection);
    function items(selection) {
    if (status == 0) {
    cm.sendGetText("Please type the name of the item you wish to search for:");
    } else if (status == 1) {
    cm.getItemByName(cm.getText());
    } else if (status == 2) {
    cm.getMobs(selection);
    cm.dispose();
        }    
    }


    function maps(selection){
        if (status == 0) {
    if (cm.getMap().getAllMonstersThreadsafe().size() <= 0) {
        cm.sendOk("There are no monsters in this map.");
        cm.dispose();
        return;
    }
    var selStr = "Select which monster you wish to check.\r\n\r\n#b";
    var iz = cm.getMap().getAllUniqueMonsters().iterator();
    while (iz.hasNext()) {
        var zz = iz.next();
        selStr += "#L" + zz + "##o" + zz + "##l\r\n";
    } 
    cm.sendSimple(selStr);
    } else if (status == 1) {
    cm.sendNext(cm.checkDrop(selection));
    cm.dispose();
        }
    }
}