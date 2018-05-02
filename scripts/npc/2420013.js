var status = 0; 
function start() { 
status = -1; 
action(1, 0, 0); 
} 

function action(mode, type, selection) { 

if (mode == -1) { 
cm.dispose(); 
} 
else { 
if (status == 0 && mode == 0) { 
cm.dispose(); 
return; 
} 
if (mode == 1) { 
status++; 
} 
else { 
status--; 
} 
if (status == 0) {
cm.sendOk("Hi there. I'm an uncoded NPC. If you have any ideas to what I should be doing, please let the staff team know!")
cm.dispose();
}
}
}
