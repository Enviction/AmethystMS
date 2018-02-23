var status; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
}  

function action(mode, type, selection) { 
    if (mode == 1) 
        status++; 
    else if (mode == -1) 
        status--; 
    else { 
        cm.dispose(); 
        return; 
    } 
    if (status == 0) { 
    
        if(cm.getPlayer().getLevel > 10){
            cm.sendOk("You cannot switch your beginner job if you are above level 10!");
            cm.dispose();
        }
        
        cm.sendSimple("Hi, would you like to select a new beginner job?\r\n#L0#Yes\r\n#L1#No");
    
    }else if(status == 1){
        
        if(selection == 0){
            cm.sendSimple("Alright, please choose your beginner job:\r\n#L2#Beginner\r\n#L3#Noblesse\r\n#L4#Citizen\r\n#L5#Jett\r\n#L6#Demon Slayer\r\n#L7#Evan\r\n#L8#Phantom\r\n#L9#Mihile\r\n#L10#Dual Blade\r\n#L11#Cannoneer\r\n#L12#Mercedes\r\n#L13#Aran");
        }else if(selection == 1){
            cm.dispose();
        }
    
    }else if(status == 2){
    
        if(selection == 2){
            cm.getPlayer().changeJob(0);//beginner
        }else if(selection == 3){
            cm.getPlayer().changeJob(1000);//noblesse
        }else if(selection == 4){
            cm.getPlayer().changeJob(3000);//citizen
        }else if(selection == 5){
            cm.getPlayer().changeJob(507);//jett
        }else if(selection == 6){
            cm.getPlayer().changeJob(3100);//demon slayer
        }else if(selection == 7){
            cm.getPlayer().changeJob(2001);//evan
        }else if(selection == 8){
            cm.getPlayer().changeJob(2003);//phantom
        }else if(selection == 9){
            cm.getPlayer().changeJob(5000);//mihile
        }else if(selection == 10){
            cm.getPlayer().changeJob(430);//dual blade
        }else if(selection == 11){
            cm.getPlayer().changeJob(501);//cannoneer
        }else if(selection == 12){
            cm.getPlayer().changeJob(2002);//mercedes
        }else if(selection == 13){
            cm.getPlayer().changeJob(2000);//aran
        }
        cm.sendOk("Your job has been changed!");
        cm.dispose();
    
    }
}  