var status = 0;
var pagemax = 15;
var empress = new Array(1302152,1402095,1432086,1442116,1003172,1052314,1072485,1082295,1102275,1332130,1472122,1003175,1052317,1072488,1082298,1102278,
						1372084,1382104,1003173,1052315,1072486,1082296,1102276,1452111,1462099,1522018,1003174,1052316,1072487,1082297,1102277,1482084,
						1492085,1003176,1052318,1072489,1082299,1102279);
var empressp = new Array(10,10,10,10,7,8,5,5,5,10,10,7,8,5,5,5,10,10,7,8,5,5,5,10,10,10,7,8,5,5,5,10,10,7,8,5,5,5);
						/*1302152,1332130,1372084,1382104,1402095,1432086,1442116,1452111,1462099,1522018,1472122,1482084,1492085,1003172,1052314,1072485,1082295,
						1102275,1003175,1052317,1072488,1082298,1102278,1003173,1052315,1072486,1082296,1102276,1003174,1052316,1072487,1082297,1102277,
						1003176,1052318,1072489,1082299,1102279);*/
var lion = new Array(1302152,1402095,1432086,1442116,1003172,1052314,1072485,1082295,1102275);
var lionp = new Array(10,10,10,10,7,8,5,5,5);
var raven = new Array(1332130,1472122,1003175,1052317,1072488,1082298,1102278);
var ravenp = new Array(10,10,7,8,5,5,5);
var dragon = new Array(1372084,1382104,1003173,1052315,1072486,1082296,1102276);
var dragonp = new Array(10,10,7,8,5,5,5);
var falcon = new Array(1452111,1462099,1522018,1003174,1052316,1072487,1082297,1102277);
var falconp = new Array(10,10,10,7,8,5,5,5);
var shark = new Array(1482084,1492085,1003176,1052318,1072489,1082299,1102279);
var sharkp = new Array(10,10,7,8,5,5,5);
var set = new Array("LionHeart","Raven Horn","Dragon Tail", "Falcon Wing", "Shark Tooth");
var setselected = "";
var arrayofitems = new Array();
var priceofitems = new Array();
var item = 0;
var price = 0;
var itemsearched = 0;
var searchedprice = 0;

function start()
{
 status = -1;
 action(1,0,0);
 }
 
 function action(mode, type, selection)
 {
	if (mode == -1)
	{cm.dispose();
	}
	else
	{
			if(status >= 0 && mode == 0)
				{
					cm.sendOk("Sure thing. Call me later for some fun <3");
					cm.dispose();
					return;
				}
			if(mode == 1) {
			status++;
			} else{
			status--;
			}
			if(status == 0)
				{
					if(cm.haveItem(4000038,5))
					{cm.sendYesNo("Yo! The name's Cass. Good Job finding me. I run an underground business of Empress' Gears. You want one?");}
					else
						{
							cm.sendOk("Pfft don't waste my time boy. Come back when you really got some trophies.");
							cm.dispose();
							return;
						}
				}
			else 
			{	if(status == 1)
						{
							cm.sendSimple("So how you wanna do this? \r\n#L0##bSearch#l \r\n#L1##bBrowse#l \r\n");
						}
				else
				{
					if(status == 2 && selection == 0)
						{
							cm.sendGetText("Please type in the ID code of the item you want",9000031);

						}
					if(status == 2 && selection == 1)
						{
							var selStr0 = "What set do you wanna take a look into?";
							for (var a = 0; a < set.length;a++)
								{
									if(a == set.length){selStr0 += "\r\n\r\n";}
									selStr0 += "\r\n#L" + a + "##b" + set[a] +"#k#l";
								}
							cm.sendSimple(selStr0)
						}
					else
					{
						itemsearched = cm.getText();
						if(status == 3 && itemsearched != null)
							{ 
										var j = 0;
										do{
										if(itemsearched != empress[j]){j++;}
										if(itemsearched == empress[j])
											{
												cm.sendYesNo("Is the following what you wanted? : \r\n#i" + empress[j]+ "##b - #t" +empress[j] 
												+"# for " + empressp[j] +"#k\r\n");
												searchedprice = empressp[j];
											}
											}while(itemsearched !=empress[j] && j < empress.length +1);

										if(j == empress.length +1)
											{
												cm.sendOk("Pfft don't even talk to me if you aint even know what I be selling.");
												cm.dispose();
												return;
											}
							} 		
						if(status == 3 && itemsearched == null)
							{
								setselected = set[selection];
								switch(selection)
									{
										case 0:
											arrayofitems = lion;
											priceofitems = lionp;
											break;
										case 1:
											arrayofitems = raven;
											priceofitems = ravenp;
											break;
										case 2:
											arrayofitems = dragon;
											priceofitems = dragonp;
											break;
										case 3:
											arrayofitems = falcon;
											priceofitems = falconp;
											break;
										case 4:
											arrayofitems = shark;
											priceofitems = sharkp;
											break;
									}
								var selStr1 = "So what will it be today?\r\n";
									for (var i = 0; i < arrayofitems.length; i++)
										{
											if (i == arrayofitems.length)
												{
													selStr1 += "\r\n";
												}
											selStr1 += "\r\n#L" + i + "##i" + arrayofitems[i] + "##b - #t" +arrayofitems[i] + "# for #r"+ priceofitems[i] 
													 + " trophies #l#k \r\n";
										}	
									cm.sendSimple(selStr1);
							}
				
						else 
							{
								if(status == 4 && itemsearched != null)
									{
										if(cm.canHold(itemsearched,1))
										{
											cm.gainItem(4000038,-searchedprice);
											cm.gainItem(itemsearched,1);
											cm.sendOk("Thanks for the business Bozo! \r\n Btw, here's my number, call me maybe (:");
											cm.dispose();
											return;
										}
										else{cm.sendOk("Check if you have enough inventory space Shithead!"); cm.dispose();}
									}
								if(status == 4 && itemsearched == null)
									{
									for(var i = 0; i < arrayofitems.length;i++)
										{
											if(selection == i)
											{
											cm.sendYesNo("Is the following what you wanted? : \r\n#i" + arrayofitems[i] +"##b - #t" +arrayofitems[i] 
														+"# for #r" + priceofitems[i] +" trophies. \r\n");
											item = arrayofitems[i];
											price = priceofitems[i];
											}	
										}
									
									}
								else if(status ==5 && itemsearched == null)
									{
										if(cm.canHold(item,1))
										{
											cm.gainItem(4000038,-price);
											cm.gainItem(item,1);
											cm.sendOk("Thanks for the business Bozo! \r\n Btw, here's my number, call me maybe (:");
											cm.dispose();
											return;
										}
										else{cm.sendOk("Check if you have enough inventory space Shithead!"); cm.dispose();}
									}
							}
					}		
				}
			}	
	} /*else {
				
				cm.dispose();//forgot cm.
				}*/ //useless
}