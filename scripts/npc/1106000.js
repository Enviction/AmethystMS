


var status = -1;

function start() {
action(1, 0, 0);
}

function action(mode, type, selection) {
if (mode == 1) {
status++;
} else {
if (status == 1) {
cm.dispose();
return;
}
status--;
}
if (status == 0) {
cm.sendPlayerToNpc("Do you have something to say to me?");
} else if (status == 1) {
cm.sendNextPrev("What is your name?"); 
} else if (status == 2) {
cm.sendPlayerToNpc("I don't have one. Just call me #bKiddo#k. That's what the old man calls me.");
} else if (status == 3) {
cm.sendNextPrev("Is he your grandpa? Where are your parents?");
} else if (status == 4) {
cm.sendPlayerToNpc("I don't have any family. I just work here.#b(What's with all the questions?)#kLook, I have to get back to work before the old man comes back...");
} else if (status == 5) {
cm.sendNextPrev("Do you know the name Chromile? The Knight of Light?");
} else if (status == 6) {
cm.sendPlayerToNpc("Nope, never heard of the guy...#b(Why does that name sound familiar?)");
} else if (status == 7) {
cm.sendPlayerToNpc("Hold up. My old man's yelling at me...");
} else if (status == 8) {
cm.sendPlayerToNpc("I was just about to clean it up...Sorry, I gotta do what he says...");
} else if (status == 9) {
cm.sendPlayerToNpc("H-hey! Where did he go?! Ugh, who cares?! I gotta get that stuff out of here before Limbert starts raising a ruckus again...");
} else if (status == 10) {
cm.warpMihile();
cm.dispose();
}
}