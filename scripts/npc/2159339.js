// by Corpse AKA Matty
// recoded by Amy

var status;
var omok = new Array(4080000,4080001,4080002,4080003,4080004,4080005,4080006,4080007,4080008,4080009,4080010,4080011);
var chairs = new Array(3010290,3010289,3010285,3010282,3010200,3010211,3010073,3010119,3010231,3010183,3010071,3010106);



function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) 
{
	if (mode == -1) 
	{
		cm.dispose();
	} 
	else 
	{
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
			if (status == 0) 
			{
				cm.sendSimple("\r\n#bI've been trying to win a #dTeddy Bear#b from this damn Casino for ages!.. but I ran out of Sunshine and Coins."
							 +"\r\nI'll buy your coins off you any other way,\r\njust #r#ename your price#n#b!!!"
							 +"\r\n\r\n#e#kYou currently have: #r#c4031039# Coins #n#b#d\r\n"
							 +"\r\n#d#L1000#400 #i4031039# for 1 #i2340000#"
							 +"\r\n#L2000#2000 #i4031039# for 1 #i5640000#"
							 +"\r\n#L3000#500 #i4031039# for a #b#eCard/Omok Set#n#d"
							 +"\r\n#L4000#800 #i4031039# for 3 #b#eDelicious Cookies#n#d"
							 +"\r\n#L5000#3000 #i4031039# for an #b#eExclusive Chair#n#d"
							 +"\r\n\r\n\r\n#L6000#150,000 #i4031039# for 1 #i4000038#");
			}
			else if (selection == 1000)
			{
				if (cm.haveItem(4031039, 400)) 
				{
					cm.gainItem(4031039, -400);
				    cm.gainItem(2340000, 1); // used to be 5220000
                    cm.sendOk("Here are your White scroll!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
				    cm.dispose();
				} 
				else 
				{
					cm.sendOk("You don't have enough Coins. Don't fuck with me, kid. \r\n#e#rI NEED THAT TEDDY BEAR.#k#n");
					cm.dispose();
				}
			}
			else if (selection == 2000)
			{
				if (cm.haveItem(4031039, 2000)) 
				{
				    cm.gainItem(4031039, -2000);
					cm.gainItem(5640000, 1); //used to be 5220020
                    cm.sendOk("Here are your Pam's song!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
				    cm.dispose();
				} 
				else 
				{
					cm.sendOk("You don't have enough Coins. Don't fuck with me, kid. \r\n#e#rI NEED THAT TEDDY BEAR.#k#n");
					cm.dispose();
				}
			}
			else if (selection == 3000)
			{
				if (cm.haveItem(4031039, 500))
				{
					selStr0 = "Pick your prize:\r\n";
					for(var a = 0; a < omok.length; a++)
					{
						selStr0 += "\r\n#L300" + a + "##i" + omok[a] +"# - #b#t" + omok[a] + "##l#k\r\n";
					}
					cm.sendSimple(selStr0);
				}
				else
				{
					cm.sendOk("You don't have enough Coins. Don't fuck with me, kid. \r\n#e#rI NEED THAT TEDDY BEAR.#k#n");
					cm.dispose();
				}
			}
			else if (selection == 4000) 
			{
				if (cm.haveItem(4031039, 800)) 
				{
				    cm.gainItem(4031039, -800);
				    cm.gainItem(2022031, 3);
                    cm.sendOk("Here are your 3 Cookies!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
				    cm.dispose();
				} 
				else 
				{
					cm.sendOk("You don't have enough Coins. Don't fuck with me, kid. \r\n#e#rI NEED THAT TEDDY BEAR.#k#n");
					cm.dispose();
				}
            }
			else if (selection == 5000)
			{
				if (cm.haveItem(4031039, 3000))
				{
					selStr1 = "Pick your prize:\r\n";
					for(var b = 0; b < chairs.length; b++)
					{
						selStr1 += "\r\n#L500" + b + "##i" + chairs[b] +"# - #b#t" + chairs[b] + "##l#k\r\n\r\n";
					}
					cm.sendSimple(selStr1);
				}
				else
				{
					cm.sendOk("You don't have enough Coins. Don't fuck with me, kid. \r\n#e#rI NEED THAT TEDDY BEAR.#k#n");
					cm.dispose();
				}
			}
			else if (selection == 6000) 
			{
				if (cm.haveItem(4031039, 150000)) 
				{
				    cm.gainItem(4031039, -150000);
				    cm.gainItem(4000038, 1);
                    cm.sendOk("#dHere's your Event Trophy! Don't tell the GMs!!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
				    cm.dispose();
				}
				else 
				{
					cm.sendOk("You don't have enough Coins. Don't fuck with me, kid. \r\n#e#rI NEED THAT TEDDY BEAR.#k#n");
					cm.dispose();
				}
			}
			else if (status == 2)
			{
				for (var c = 0; c < omok.length; c++)
				{
					if (selection == 3000 + c)
					{
						cm.gainItem(4031039,-500);
						cm.gainItem(omok[c],1);
						cm.sendOk("You have purchased 1 #t" + omok[c] + "#!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
						cm.dispose();
					}
					if (selection == 30000 + c)
					{
						cm.gainItem(4031039,-500);
						cm.gainItem(omok[c],1);
						cm.sendOk("You have purchased 1 #t" + omok[c] + "#!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
						cm.dispose();
					}
				}
				for (var d = 0; d < chairs.length; d++)
				{
					if (selection == 5000 + d)
					{
						cm.gainItem(4031039,-3000);
						cm.gainItem(chairs[d],1);
						cm.sendOk("You have purchased 1 #t" + chairs[d] + "#!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
						cm.dispose();
					}
					if (selection == 50000 + d)
					{
						cm.gainItem(4031039,-3000);
						cm.gainItem(chairs[d],1);
						cm.sendOk("You have purchased 1 #t" + chairs[d] + "#!\r\n\r\n#e#kYou currently have: #r#c4031039# Coins#n");
						cm.dispose();
					}
				}
			}
	}			
}