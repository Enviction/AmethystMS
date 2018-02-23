var status = 0

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
		if(status >= 1 && mode == 0)
			{cm.sendOk("Then GTFO Shithead!");
			cm.dispose();
			return;
			}
		if(mode ==1)
			{status++;
			}
		else{status--;}
		if(status == 0)
			{
			cm.sendNext("Hm? Empress' Weapons?");
			}
		else if(status == 1)
			{
				cm.sendOk("Eh, I heard some chick were selling them in some place beyond the sunset. \r\n Don't quote me on that though");
				cm.dispose();
				return;
			}
	}
}