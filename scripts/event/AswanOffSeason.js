
importPackage(Packages.packet.creators);
importPackage(Packages.server.life);
importPackage(java.lang);
importPackage(java.awt);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.main.world);



/*

	히나 온라인 소스 스크립트입니다.

	파티퀘스트


        설정되는 Property : 
        Global_StartMap : 시작 맵
        Global_ExitMap  : 나가기맵
        Global_MinPerson: 최소인원
        Global_RewardMap: clearPQ 메소드로 갈 보상 맵.

        입장 엔피시로 해줘야 할것 : 
        var eim = em.readyInstance();
        eim.setProperty("Global_StartMap", [시작맵]+"");
        eim.setProperty("Global_ExitMap", [나가기맵]+"");
        eim.setProperty("Global_MinPerson", [최소인원]+"");
        eim.setProperty("Global_RewardMap", [보상맵]+"");
        eim.startEventTimer([제한시간]);
        eim.registerParty([AthenaParty 타입], [AthenaMap 타입]);
*/

function init() {
    
}

function setup(eim) {
    var a = Randomizer.nextInt();
    while (em.getInstance("AswanOffSeason_ID"+a) != null) {
        a = Randomizer.nextInt();
    }
    var eim = em.newInstance("AswanOffSeason_ID"+a);
    return eim;
}

function playerEntry(eim, player) {
    var map = Integer.parseInt(eim.getProperty("Global_StartMap"));
    player.changeMap(eim.getMapFactory().getMap(map), eim.getMapFactory().getMap(map).getPortal("sp"));
    player.message(6, "[알림] 아스완 해방전 인스턴스에 진입하셨습니다. 행운을 빕니다! :)");
}



function changedMap(eim, player, mapid) {
    
}

function scheduledTimeout(eim) {
    
    var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        if (chr == null) {
            System.out.println("캐릭터가 NULL!");
        }
        if (exit == null) {
            System.out.println("EXIT맵이 NULL!");
        }
        if (exit.getPortal("sp") == null) {
            System.out.println("EXIT맵 포탈이 NULL!");
        }
        chr.changeMap(exit, exit.getPortal("sp"));
        chr.Message(8, "시간이 초과되었습니다. 처음부터 다시 시작해주세요.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function allMonstersDead(eim) {
    var startmap = Integer.parseInt(eim.getProperty("Global_StartMap"));
    var curstage = Integer.parseInt(eim.getProperty("CurrentStage"));
    var curmap = (startmap + ((curstage - 1) * 100));
    var map = eim.getMapFactory().getMap(curmap);
    if (curstage < 3) {
        map.broadcastMessage(MainPacketCreator.showEffect("aswan/clear"));
    } else {
        map.broadcastMessage(MainPacketCreator.showEffect("aswan/clearF"));
    }
    map.broadcastMessage(MainPacketCreator.playSound("Party1/Clear"));
    eim.setProperty("CurrentStage", (curstage + 1)+"");
}

function playerDead(eim, player) {
    return 0;
}

function playerRevive(eim, player) {
    
}

function playerDisconnected(eim, player) {
    /* 0 : 모두 나갈때 까지는 인스턴스 유지
     * 1 ~ : 일정 수준 이상의 사람만 남으면 누가 나가던지 인스턴스 유지
     * -1 ~ 이하 : 일정 수준 이상의 사람만 남으면 유지이나, 파티장이 나가면 인스턴스 삭제
     */
    if (eim.getProperty("Global_MinPerson") == null) {
        return -1;
    }
    return -Integer.parseInt(eim.getProperty("Global_MinPerson"));
}

function monsterValue(eim, mobid) {
    return 1;
}

function leftParty(eim, player) {
    if (eim.getPlayerCount() < Integer.parseInt(eim.getProperty("Global_MinPerson"))) {
        var exit = em.getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.changeMap(exit, exit.getPortal(0));
            chr.Message("파티원이 파티를 그만둬서 더이상 퀘스트를 진행할 수 없습니다.");
        }
        eim.unregisterAll();
        if (eim != null) {
            eim.dispose();
        }
    }
    
}

function disbandParty(eim) {
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("파티장이 파티를 그만둬서 더이상 퀘스트를 진행할 수 없습니다.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function clearPQ(eim) {
    
}

function playerExit(eim, player) {
    var exit = eim.getPlayers().get(0).getClient().getChannelServer().getMapFactory().getMap(Integer.parseInt(eim.getProperty("Global_ExitMap")));
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("파티 퀘스트를 포기하여 더이상 퀘스트를 진행할 수 없습니다.");
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
}

function onMapLoad(eim, player) {
    
}

function cancelSchedule(a) {
    
}