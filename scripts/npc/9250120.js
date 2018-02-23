var status = -1;

function start() {

    cm.sendNext("Hello #h #! I'm the #eSMEGA NPC#n of #e#rHiddenMS.#n#k ");

}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0)
            cm.sendOk("Come back later!");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("I can give you 100 #i5072000# Super Megaphone and , 100 #i5076000# Item Megaphone for #r FREE #k. Are you interested?");
    } else if (status == 1){		
        cm.sendOk("Here's your Smega , enjoy!");
        cm.gainItem(5072000,100);
        cm.gainItem(5076000,100);
        cm.dispose();	
    }
}