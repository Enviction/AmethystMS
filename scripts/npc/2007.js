var status = -1;

function action(mode, type, selection) {
    if (cm.getPlayer().getLevel() != 1 || cm.getPlayer().getMapId() != 10000) {
	cm.dispose();
	return;
    }
}

    function start() {  
    cm.sendSimple("Hello. Would you like to be a legend? Choose one: \r\n #L0#Cannoneer#l \r\n #L1#Mercedes#l \r\n #L2#DemonSlayer#l \r\n #L3#Jett#l \r\n #L4#Dual Blade#l");    
}  

function action(m,t,s) {  
    if (m > 0) {  
        if (cm.getPlayer().getJob() == 0) { 
        if (s == 0) { 
                    cm.changeJob(1);
                    cm.getPlayer().setSubcategory(2);
                    cm.warp(3000000); 
                    cm.gainItem(1532000 ,1);
            cm.sendOk("You are now a Cannoneer, Congratulations!");  
            } else if (s == 1) {
                
            cm.changeJob(2002);  
                    cm.warp(910150000); 
                    cm.gainItem(1522038, 1); 
                    cm.gainItem(1352005, 1);
            cm.sendOk("You are now a Mercedes, Congratulations!");      
        }else if (s == 2) { 
            cm.changeJob(3001);
                cm.warp(931050310); 
                cm.gainItem(1322123, 1);
            cm.sendOk("You are now a DemonSlayer, Congratulations!"); 
        } else if (s == 3) {
                cm.getPlayer().setSubcategory(10);
                cm.changeJob(508);
                cm.warp(552000010);
                cm.gainItem(1492000, 1);
            cm.sendOk("You are now a Jett, Congratulations!");
        }  else if (s == 4) {
                cm.getPlayer().setSubcategory(1);
                cm.warp(103050900);
            cm.sendOk("You can now become a DualBlade!");
        }  
        } else { 
        cm.sendOk("You are not a beginner, sorry."); 
        } 
    }else {  
    cm.sendOk("Legends aren't that cool anyway..."); 
    } 
    cm.dispose(); 
}  