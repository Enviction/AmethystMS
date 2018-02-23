//script by Enderplanets
//Enjoy


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
cm.sendSimple ("I am the Cube trader of AmethystMS. \r\n\ #L0# Trade two Miracle Cube for One Super Miracle Cube \r\n\ #L1# Trade Ten Miracle Cube for Five Super Miracle Cube\r\n\ #L2# Trade One Super Miracle Cube for two Miracle Cube \r\n\ #L3# Trade Ten Super Miracle Cube for twenty Miracle Cube "); 
} else if (selection == 0) { 
if(cm.haveItem(5062000, 2)) { 
cm.gainItem(5062002, 1); 

cm.gainItem(5062000, -2);

cm.sendOk("Here's your Cubes Have a nice day"); 
cm.dispose(); 
} 
else { 
cm.sendOk("You don't have enough inventory spaces or The correct amount of cubes,please try again latter."); 
cm.dispose(); 
} 
} else if (selection == 1) { 
if(cm.haveItem(5062000, 10)) { 
cm.gainItem(5062002, 5); 

cm.gainItem(5062000, -10);
cm.sendOk("Here's your Cubes Have a nice day"); 
cm.dispose(); 
} 
else { 
cm.sendOk("You don't have enough inventory spaces or The correct amount of cubes,please try again latter."); 
cm.dispose(); 
} 

} else if (selection == 2) { 
if(cm.haveItem(5062002, 1)) { 
cm.gainItem(5062000, 2); 

cm.gainItem(5062002, -1);
cm.sendOk("Here's your Cubes Have a nice day"); 
cm.dispose(); 
} 
else { 
cm.sendOk("You don't have enough inventory spaces or The correct amount of cubes,please try again latter."); 
cm.dispose(); 
}
}else if (selection == 3) { 
if(cm.haveItem(5062002, 10)) { 
cm.gainItem(5062000, 20); 
cm.gainItem(5062002, -10); 
cm.sendOk("Here's your Cubes Have a nice day"); 
cm.dispose(); 
} 


}
}
}