
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
	mapId = 211040401;
	returnMapId = 211040401;
	monsterId = 9001001;
	
    } else if (player.getJob() == 110 || // FIGHTER
	player.getJob() == 120 || // PAGE
	player.getJob() == 130) { // SPEARMAN
	mapId = 211040401;
	returnMapId = 211040401;
	monsterId = 9001000;

    } else if (player.getJob() == 410 || // ASSASIN
	player.getJob() == 420 || // BANDIT
        player.getJob() == 432   ) { // BANDIT
	mapId = 211040401;
	returnMapId = 211040401;
	monsterId = 9001003;

    } else if (player.getJob() == 310 || // HUNTER
	player.getJob() == 320) { // CROSSBOWMAN
	mapId = 211040401;
	returnMapId = 211040401;
	monsterId = 9001002;
    } else if (player.getJob() == 510 || //
        player.getJob() == 520 || //
        player.getJob() == 530) {
        mapId = 211040401;
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
    var map = eim.createInstanceMap(mapid);
    map.toggleDrops();

    player.changeMap(map, map.getPortal(0));
    var mob = em.getMonster(monsterId);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroudBelow(mob, new java.awt.Point(200, 20));
}

function playerDead(eim, player) {
    eim.unregisterPlayer(player);
    eim.dispose();
}

function playerDisconnected(eim, player) {
    return 0;
}

function allMonstersDead(eim) {
    var price = new client.Item(4031059, 0, 1);
    var winner = eim.getPlayers().get(0);
    var info = setClassVars(winner);
    var mapId = info[0];
    var monsterId = info[2];

    var map = eim.getMapInstance(mapId);
    map.spawnItemDrop(winner, winner, price, winner.getPosition(), true, false);
    eim.schedule("warpOut", 120000);
    var mob = em.getMonster(monsterId);
    em.getChannelServer().broadcastPacket(tools.MaplePacketCreator.serverNotice(6, "[Event] " + winner.getName() + " defeated " + mob.getName() + "!"));
}

function cancelSchedule() {
}

function warpOut(eim) {
    var iter = eim.getPlayers().iterator();
    while (iter.hasNext()) {
	var player = iter.next();
	var info = setClassVars(player);
	var returnMapId = info[1];

	var returnMap = em.getChannelServer().getMapFactory().getMap(returnMapId);
	player.changeMap(returnMap, returnMap.getPortal(0));
	eim.unregisterPlayer(player);
    }
    eim.dispose();
}

function leftParty(eim, player) {
	
}

function disbandParty(eim, player) {

}
