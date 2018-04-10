function init() {
}

function monsterValue(eim, mobId) {
    return 1;
}
function setClassVars(player) {
	var returnMapId;
    var monsterId;
    var mapId;
    
    if (player.getJob() == 210 || // FP_WIZARD
	player.getJob() == 220 || // IL_WIZARD
	player.getJob() == 230) { // CLERIC
	mapId = 910540200;
	returnMapId = 211040401;
	monsterId = 9001001;
	
    } else if (player.getJob() == 110 || // FIGHTER
	player.getJob() == 120 || // PAGE
	player.getJob() == 130) { // SPEARMAN
	mapId = 910540100;
	returnMapId = 211040401;
	monsterId = 9001000;

    } else if (player.getJob() == 410 || //Assassin
	player.getJob() == 420 || //Bandit
	player.getJob() == 432) { //Blade Specialist
	mapId = 910540400;
	returnMapId = 211040401;
	monsterId = 9001003;

    } else if (player.getJob() == 310 || // HUNTER
	player.getJob() == 320) { // CROSSBOWMAN
	mapId = 910540300;
	returnMapId = 211040401;
	monsterId = 9001002;
	} else if (player.getJob() == 510 || //Bucc
	player.getJob() == 520 || //Gunslinger
	player.getJob() == 530) { //Cannoneer
	mapId = 910540500;
	returnMapId = 211040401;
	monsterId = 9001004;
	}
    return new Array(mapId, returnMapId, monsterId);
}

function playerEntry(eim, player) {
    var info = setClassVars(player);
    var mapId = info[0];
    var returnMapId = info[1];
    var monsterId = info[2];
    var map = eim.createInstanceMapS(mapId);

    player.changeMap(map, map.getPortal(0));
    var mob = em.getMonster(monsterId);
    eim.registerMonster(mob);
    map.spawnMonster(mob, 0);
}

function playerDead(eim, player) {
    eim.unregisterPlayer(player);
    eim.dispose();
}

function playerDisconnected(eim, player) {
    return 0;
}
function changedMap(eim, player, mapid) {
    if (mapid != 910540200 && mapid != 910540100 && mapid != 910540300 && mapid != 910540400 && mapid != 910540500) {
    eim.unregisterPlayer(player);
    }
}
function allMonstersDead(eim, player) {
	var winner = eim.getPlayers().get(0);
    var info = setClassVars(winner);
    var mapId = info[0];
    var monsterId = info[2];
    var map = eim.getMapInstance(mapId);
    eim.schedule("warpOut", 120000);
    var mob = em.getMonster(monsterId);
    winner.dropMessage(-1, "Congratulations on defeating " + mob.getStats().getName());
}

function cancelSchedule() {
}

function warpOut(eim) {
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
	var player = iter.next();
	var info = setClassVars(player);
	var returnMapId = info[1];

	var returnMap = em.getChannelServer().getMapFactory().getMap(returnMapid);
	player.changeMap(map, map.getPortal(0));
	eim.unregisterPlayer(player);
    }
    eim.dispose();
}

function leftParty(eim, player) {
	
}

function disbandParty(eim, player) {

}