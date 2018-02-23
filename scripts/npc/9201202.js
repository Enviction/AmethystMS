// Casino minigame by Corpse AKA Matty
// Reworked by ItsAmy for v111
var number = [0,1,2,3,4,5,6,7,8,9,10];
var g1 = false;
var g2 = false;
var g3 = false;
var fingers = Math.random() * number.length | 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendOk("#i4000252##i4000252##i4000252##i4000252#\r\n\r\nCHICKEN!");
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendYesNo("Oh, it's you #e#d#h ##n#k!\r\n\r\nI'm the hoe Yoona. I host the #rHiddenMS'#b #ePick a Number! Minigame#n#k, a part of the Casino. Are you interested in playing?");
        } 
		else if (status == 1) {
		cm.sendSimple("So I bet you're wondering-\r\n#eHow the fuck do I play this game Hoe?#n\r\nWell, I'm here to tell you! (and take your coins)\r\nOr, if you're familiar with the game, we can just get started.\r\n"
		  + "\r\n#L1##kHow the fuck do I play this game Hoe?" 
		  + "\r\n#L2##kLet's start.");
		} 
		else if (selection == 1) {
					  cm.sendOk("#r#ePick a Number! Minigame #kInstructions:#n#k\r\n\r\nThis game is pretty simple. I'm going to hold up fingers behind my back. You can pick a whole number between 0 and 10, guessing how many fingers I hold up. If you guess correctly, you get #g#edouble#k#n the coins you gambled for. If you guess incorrectly, I keep #r#eall#n#k of your coins.");
					  cm.dispose();
		} else if (selection == 2) 
			{ 
				cm.sendSimple("How many coins would you like to gamble?#d#e\r\n" 
				+ "\r\n#L3#50  Coins"
				+ "\r\n#L4#150 Coins"
				+ "\r\n#L5#500 Coins");
			} 
		else if (selection == 3)
			{
				if (cm.haveItem(4031039,50)) 
					{
						cm.gainItem(4031039,-50);
						g1 = true;
						cm.sendGetText("Okay, now #d#ePick a Number!#n(0-10)#e:#n",9201202);
					}	 
				else 
				{ 
					cm.sendOk("You require #rat least#k 50 #i4031039# before gambling with 50 coins, silly!");
					cm.dispose();
				}
			} 
		else if (selection == 4)
			{
				if (cm.haveItem(4031039,150))
				{
					cm.gainItem(4031039,-150);
					g2 = true;
					cm.sendGetText("Okay, now #d#ePick a Number!#n(0-10)#e:#n",9201202);
				}	 
				else 
				{ 
					cm.sendOk("You require #rat least#k 150 #i4031039# before gambling with 150 coins, dummy.");
					cm.dispose();
				}
			}
		else if (selection == 5)
			{
				if (cm.haveItem(4031039,500)) 
				{
					cm.gainItem(4031039,-500);
					g3 = true;
					cm.sendGetText("Okay, now #d#ePick a Number!#n(0-10)#e:#n",9201202);
				}	 
				else 
				{ 
					cm.sendOk("You require #rat least#k 500 #i4031039# before gambling with 500 coins, you fucking idiot.");
					cm.dispose();
				}
			}
 else if (status == 4) { if (cm.getText() == "0" || cm.getText() == "1" || cm.getText() == "2" || cm.getText() == "3" || cm.getText() == "4" || cm.getText() == "5" || cm.getText() == "6" || cm.getText() == "7" || cm.getText() == "7" || cm.getText() == "9" || cm.getText() == "10") {
		if (g1 = true) { if (fingers == cm.getText()) { 
		cm.sendOk("You have won #e#g100 coins#k#n.");
		cm.gainItem(4031039,100);
} else cm.sendOk("#r#eYou lose!#k#n Better lucky with a hoe next time. :P");
cm.dispose();
}
else if (g2 = true) { if (fingers == cm.getText()) { 
		cm.sendOk("You have won #e#g300 coins#k#n.");
		cm.gainItem(4031039,300);
} else {cm.sendOk("#r#eYou lose!#k#n Better lucky with a hoe next time. :P");
cm.dispose();
}
}
else if (g3 = true) { if (fingers == cm.getText()) { 
		cm.sendOk("#ey You have won #e#g1,000 coins#k#n.");
		cm.gainItem(4031039,1000);
} else {cm.sendOk("#r#eYou lose!#k#n Better lucky with a hoe next time. :P");
cm.dispose();
}
}
}else {cm.sendOk("I said I'll only hold up #r1-9#k fingers. You're a fool.");
cm.dipose();
}
} 
}
}