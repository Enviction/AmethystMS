//Corpse AKA Matty & ItsAmy AKA Amy
status = 0;
var items = [4031039]
var gachTicketID = 4031039;

function start() {
 if(cm.haveItem(gachTicketID,40)) {
        cm.sendYesNo("Welcome to the #rHiddenMS#k Shumi's Coin Gachapon!\r\nI take #bShumi's Coins#k in exchange for a #erandom amount#n of coins. "
					+"You can obtain coins via Manstein in the Casino.\r\n\r\n#eYou currently have: #r#c4031039# Coins #k\r\n\r\n#eWould you like to "
					+"try your luck and use 40 #i4031039# on me?");
    } else {
        cm.sendOk("#bHey bro.\r\nNot cool.\r\nI need at least 40 #i4031039#.\r\nYou can get them from #r#eGaga#b#n in the Casino.");
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
		cm.gainItem(4031039,-40);
        cm.gainItem(items[whichItem],Math.random()*80);
       cm.sendOk("You have gained a random amount of coins from the Coin Gachapon... probably.\r\n\r\nYou currently have: #e#r#c4031039# coins.#n");
    cm.dispose();
}  
}