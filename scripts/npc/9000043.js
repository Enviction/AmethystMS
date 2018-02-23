var status = 0;
var name;

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
		if(status >= 2 && mode == 0)
			{cm.sendOk("Have fun!");
			cm.dispose();
			return;
			}
		if(mode ==1)
			{status++;
			}
		else{status--;}
		if(status == 0)
			{
				if(cm.getMeso() < 25000 && !cm.haveItem(2022117,1))
				{
					if(cm.getJob() == 0 || cm.getJob() == 100 || cm.getJob() == 200 || cm.getJob() == 300 || cm.getJob() == 400 || cm.getJob() == 500
					 ||cm.getJob() == 1000 || cm.getJob() == 1100 ||cm.getJob() == 1200 ||cm.getJob() == 1300 ||cm.getJob() == 1400 ||cm.getJob() ==1500
					 ||cm.getJob() == 2000 ||cm.getJob() ==	2100 ||cm.getJob() == 2200
					 ||cm.getJob() == 3000 ||cm.getJob() == 3200 ||cm.getJob() == 3300)
					{
						if(cm.getJob() == 0 ||cm.getJob() == 1000 ||cm.getJob() == 2000 ||cm.getJob() == 3000)
						{cm.gainItem(2000015,100);
						cm.gainItem(2000014,100);}
						if(cm.getJob() == 100)
						{cm.gainItem(1302077,1);}
						if(cm.getJob() == 200 ||cm.getJob() == 1200 ||cm.getJob() == 2200 || cm.getJob() == 3200)
						{cm.gainItem(1372107,1);
						cm.gainItem(1382100,1);}
						if(cm.getJob() == 300 ||cm.getJob() == 1300 ||cm.getJob() == 3300)
						{cm.gainItem(1462092,1);
						cm.gainItem(1452051,1);
							cm.gainItem(2060000,1000);
							cm.gainItem(2061000,1000);}
						if(cm.getJob() == 400 ||cm.getJob() == 1400)
						{cm.gainItem(1332063,1);
						cm.gainItem(1472149,1);
							cm.gainItem(2070000,1000);}
						if(cm.getJob() == 500 ||cm.getJob() == 1500)
						{cm.gainItem(1482000,1);
						cm.gainItem(1492032,1);
							cm.gainItem(2330000,1);}
					}		
					cm.sendOk("Have fun with your starter pack!");
					cm.gainItem(2022117,1);
					cm.gainMeso(10000);
					cm.gainItem(1002419,1);
					cm.gainItem(2001505,25);
					cm.gainItem(3010001,1);
					cm.dispose();
				}
				else
				{
					cm.sendOk("You don't need a starter pack!");
					cm.dispose();
				}
			}
	}
}