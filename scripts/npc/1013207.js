function start() {  
    cm.sendSimple("Hello. Would you like to be a legend? Choose one: \r\n #L0#Cannoneer#l \r\n #L1#Mercedes#l \r\n #L2#DemonSlayer#l \r\n #L3#Jett#l");    
}  

function action(m,t,s) {  
    if (m > 0) {  
        if (cm.getPlayer().getJob() == 0) { 
        if (s == 0) { 
            cm.changeJob(501);  
                    cm.warp(120000000); 
                    cm.gainItem(1532000 ,1); 
            cm.sendOk("You are now a Cannoneer, Congratulations!");  
            } else if (s == 1) { 
            cm.changeJob(2300);  
                    cm.warp(101050000); 
                    cm.gainItem(1522038, 1); 
                    cm.gainItem(1352005, 1); 
            cm.sendOk("You are now a Mercedes, Congratulations!");      
        }else if (s == 2) { 
            cm.changeJob(3100);
                cm.warp(310000000); 
                cm.gainItem(1322123, 1); 
            cm.sendOk("You are now a DemonSlayer, Congratulations!"); 
        } else if (s == 3) {
            cm.changeJob(570);
                cm.warp(120000000);
                cm.gainItem(1492000, 1);
            cm.sendOk("You are now a Jett, Congratulations!");
        }  
        } else { 
        cm.sendOk("You are not a beginner, sorry."); 
        } 
    }else {  
    cm.sendOk("Legends aren't that cool anyway..."); 
    } 
    cm.dispose(); 
}  