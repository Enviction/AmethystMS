//script by Corpse AKA Matty
//for casino
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
			if (status == 0) {
			cm.sendSimple ("Yarrr! Welcome to our humble abode. I can give you some shumi's coins for a good price! \r\n#eWhat would you like to do? "
						  +"#b\r\n#L2#Trade #r2 Vote Points#b for 150 #i4031039#\r\n#L0#Trade #r25 Million Meso#b for 100 #i4031039#\r\n#L1#Trade "
						  +"#r100 Million Meso#b for 450 #i4031039#");
			/*Why hello there! I'm #rCelestial#k#bStory's#k #rCasino Coin Seller#k!\r\n\r\nI can vend you coins straight out of my #bCoin Case!#i1322008##n\r\n
			#eWhat would you like to do? #b\r\n#L2#Trade #r4 Vote Points#b for 150 #i4031039#\r\n#L0#Trade #r10#b#i4001165# for 100 
			#i4031039#\r\n#L1#Trade #r50#b #i4001165# for 450 #i4031039#");*/
	} else if (selection == 0) {
                                  if(cm.getMeso() >= 25000000) {
									if(cm.canHold(4031039,100)){
				                cm.gainMeso(-25000000);
				                cm.gainItem(4031039, 100);
                                  cm.sendOk("Here is your 100 coins!");
				                  cm.dispose();
								  }else{cm.sendOk("Check if you have enough inventory space in ETC"); cm.dispose();}
								  } else {
        cm.sendOk("You don't have enough Meso!!");
        cm.dispose();
        }
	    	 }
			 else if (selection == 1) {
                                  if(cm.getMeso() >= 100000000) {
									if(cm.canHold(4031039,450)){
									cm.gainMeso(-100000000);
									cm.gainItem(4031039, 450);
                                  cm.sendOk("Here is your 450 coins!");
				                  cm.dispose();
								  }else{cm.sendOk("Check if you have enough inventory space in ETC"); cm.dispose();}
								  } else {
        cm.sendOk("You don't have enough Meso!!");
        cm.dispose();
        }
		} else if (selection == 2) {
                                  /*if(cm.getPlayer().getVotePoints() >= 4) {
				                cm.getPlayer().gainVotePoints(-4);*/
								if(cm.getPlayer().getVPoints() >= 2)
								{
								if(cm.canHold(4031039,150)){
								cm.getPlayer().setVPoints(cm.getPlayer().getVPoints() - 2);
				                cm.gainItem(4031039, 150);
                                  cm.sendOk("Here's your 150 coins!\r\n#rYou now have: " + cm.getPlayer().getVPoints() + " Vote Points");
				                  cm.dispose();
								  }else{cm.sendOk("Check if you have enough inventory space in ETC"); cm.dispose();} 
								 }else {
								cm.sendOk("You don't have enough Vote Points!");
								cm.dispose();
        }
	    	 }
			}
			}