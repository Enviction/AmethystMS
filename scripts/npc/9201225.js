//Corpse AKA Matty & ItsAmy AKA Amy
status = 0;
var items = [4031039]
var gachTicketID = 4031039;

function start() {
if (cm.haveItem(4001002)) {
        cm.sendYesNo("A mysterious looking Treasure Chest\r\n."
					+"Would you like to reach your hand into the Chest? "
					+"\r\n#rWarning: You will be teleported to Henesys once you do#k");
    } else {
        cm.sendOk("#bYou don't have a #i4001002#!Talk to #p1032003# to get one.");
        cm.dispose();
    }
 }

function action(mode, type, selection) {
if(mode != 1){
cm.dispose();
return;
}
	  if(mode > 0) {
        var whichItem = Math.random() * items.length | 0;
        cm.gainItem(items[whichItem],Math.random()*5);
		cm.warp(100000000);
       cm.sendOk("You have gained a random amount of coins from the Treasure Chest... probably.\r\n\r\nYou currently have: #e#r#c4031039# coins.#n");
    cm.dispose();
}  
}