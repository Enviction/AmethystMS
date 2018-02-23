importPackage(Packages.tools);

var status = 0;
var playtimes = 0;

initialchancerate = 1, chancerate, chanceratefactor = 0.072;

function start() {
    chancerate = initialchancerate;
    cm.sendYesNo("Ah hello there. Would you like to gamble?\r\nYou require 1 #rmaple coin#k  \r\n\r\n#v4001129#\r\n\r\nGambling may yield you awesome prizes such as white scrolls, gelatins, GM scrolls, and perhaps something much more rare with an extreme value...");
}

function action(m,t,s) {
    if (m < 1) cm.dispose();
    else {
        if (status == 0) {
            if (!cm.haveItem(4001129, 1)) {
                cm.sendOk("You don't have any maple coin remaining! You have lost all of your hay!!!!");
                cm.dispose();
            } else cm.gainItem(4001129, -1);

            var prizes = computePrize();

            if (prizes.length == 0) { // no prizes, ur an unlucky b*tch
                cm.sendOk("Ah... Unlucky draw it seems, you have not gained any prize at all!");
            } else {
                var l = prizes.length;    
                var e = (l == 1 ? "Eh, ok draw i guess," : l == 2 ? "Alright draw," : l == 3 ? "Good draw!" : l == 4 ? "Awesome draw! " : l == 5 ? "AMAZING DRAW! " : l == 6 ? "FANTASTIC DRAW!" : "LEGENDARY DRAW!") +  " Here are the results " + (l < 3 ? "." : "!") + "\r\n\r\n";

                for (u = 0; u < prizes.length; u++) {
                    var a = prizes[u];
                    var m = Randomizer.nextInt(5);

                    switch (a[1]) {
                        case 0:
                            cm.gainItem(a[2], a[3]);
                            e += (m == 0 ? "Cool! " : m == 1 ? "Awesome! " : m == 2 ? "Interesting... " : m == 3 ? "Amazing, " : m == 4 ? "Nice, " : m == 5 ? "Ahhh, " : "Great, ") + "you have gained "+a[3]+" #b#t"+a[2]+"##k!  #v"+a[2]+"#\r\n";
                            break;
                        case 1: 
                            if (a[2] < (2147483647 - cm.getMeso)) a[2] = (2147483647 - cm.getMeso);
                            cm.gainMeso(a[2]);
                            e += (m == 0 ? "Cool! " : m == 1 ? "Awesome! " : m == 2 ? "Interesting... " : m == 3 ? "Amazing, " : m == 4 ? "Nice, " : m == 5 ? "Ahhh, " : "Great, ") + "you have gained #b"+a[2]+" mesos#k!#l\r\n";
                            break;
                    }
                }
                e += "\r\n\r\nPress ok if you wish to gamble again or end chat to close this... \r\n#rHold space if you wish to just burn through all of your coins (warning: may DC)#k";
                if (++playtimes % 10 == 0) chancerate -= chanceratefactor; //every 10 consecutive coins in this one window, the chance of getting good items is slightly better
                cm.sendOk(e);
            }
        } else cm.dispose();
    }
}

/*
* 0 : item gain
* 1 : meso gain
* 2 : skill gain
*/

function computePrize() {
    var prizeAr_ = new Array();
    var toGainAr_ = new Array();

    /*10_000 = 1%, 100_000 = 10%, 500_000 = 50%*/

    var gScrolls_ = [2040603, 2044503, 2041024, 2041025, 2044703, 2044603, 2043303, 2040303, 2040807, 2040806, 2040006, 2040007, 2043103, 2043203, 2043003, 2040507, 2040506, 2044403, 2040903, 2040709, 2040710, 2040711, 2044303, 2043803, 2040403, 2044103, 2044203,2044003,2043703];

    //chance, prizetype, params... 
    prizeAr_.push(new Array(190000, 0, 4001126, Randomizer.rand(2,13))); //win 2-13 mapleleafs
    prizeAr_.push(new Array(180000, 0, 2022179, Randomizer.rand(1,2))); //win 1-2 onyx apple
    prizeAr_.push(new Array(180000, 0, 4000353, 2)); //win 2 gelatin
    prizeAr_.push(new Array(140000, 0, 4001126, Randomizer.rand(14, 32))); //win 14-32 maple leafs
    prizeAr_.push(new Array(110000, 0, 2340000, Randomizer.rand(1,3))); //win 1-2 white scroll
    prizeAr_.push(new Array(70000, 0, 4001129, 1)); //win 1 maple coin
    prizeAr_.push(new Array(60000, 0, gScrolls_[Randomizer.rand(0, gScrolls_.length - 1)], 1)); //win 1-2 GM scroll (any)
    prizeAr_.push(new Array(40000, 0, 4001129, 2)); //win 2 maple coin
    prizeAr_.push(new Array(30000, 0, 4000353, 4)); //win 4 gelatin
    prizeAr_.push(new Array(10000, 0, 4000353, 6)); //win 6 gelatin
    prizeAr_.push(new Array(1, 0, 4030006, 1)); //win tetris relic #5
    prizeAr_.push(new Array(1, 0, 4030007, 1)); //win tetris relic #6

    for (u = 0; u < prizeAr_.length; u++) {
        var a = prizeAr_[u];
        var mc = (a[1] == 0 ? (a[2] == 4001129 ? true : false) : false); //streaking affects maple coin reward much less
        if (Math.floor(Randomizer.rand(0,999999) * (!mc ? chancerate : chancerate + (0.04 * Math.floor(playtimes / 10)))) < a[0]) {
            toGainAr_.push(a);
        }
    }

    return toGainAr_;
}