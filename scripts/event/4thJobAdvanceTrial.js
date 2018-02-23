


/*

	히나 온라인 소스 스크립트입니다.

	4차 전직 수련장 스크립트


*/

importPackage(Packages.packet.creators);
importPackage(Packages.server.life);
importPackage(java.lang);
importPackage(java.awt);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.main.world);
var mapidnum = -1;


function init() {
    
}

function setup(eim) {
    var eim = em.newInstance("4thJobAdvanceTrial_"+Randomizer.nextInt());
    eim.startEventTimer(600000);
    em.getChannelServer().getMapFactory().getMap(910510000).getPortal(1).setScriptName("cannot3");
    em.getChannelServer().getMapFactory().getMap(910510001).getPortal(1).setScriptName("cannot3");
    em.getChannelServer().getMapFactory().getMap(931040000).getPortal(1).setScriptName("cannot3");
    return eim;
}

function playerEntry(eim, player) {
    player.send(UIPacket.showInfo("4차 전직 임무에 오신것을 환영합니다! 주어진 미션에 충실히 이행해 주시면 됩니다!"));
    player.send(MainPacketCreator.getGMText(7, "4차 전직 임무에 오신것을 환영합니다! 주어진 미션에 충실히 이행해 주시면 됩니다!"));
    if (em.getChannelServer().getMapFactory().getMap(910510000).getAllPlayer().size() == 0) {
        var mapzz = em.getChannelServer().getMapFactory().getMap(910510000);
        eim.setProperty("1P_Id", player.getId()+"");
    } else if (em.getChannelServer().getMapFactory().getMap(910510000).getAllPlayer().size() > 0) {
        var mapzz = em.getChannelServer().getMapFactory().getMap(910510001);
        eim.setProperty("2P_Id", player.getId()+"");
    }
    player.changeMap(mapzz, mapzz.getPortal("sp"));
    player.send(UIPacket.AchievementRatio(0));
    if (eim.getProperty("1P_Progress") == null) {
        eim.schedule("announce", 5000);
        eim.setProperty("1P_Progress", "0");
        eim.setProperty("2P_Progress", "0");
        eim.setProperty("allProgress", "0");
    }
    player.setKeyValue2("4thTrialStartTime", (System.currentTimeMillis() / 1000));
}

function move1P(eim) {
    var mapzz = em.getChannelServer().getMapFactory().getMap(910510100);
    var it = eim.getPlayers().iterator();
    var id = Integer.parseInt(eim.getProperty("1P_Id"));
    while (it.hasNext()) {
        var player = it.next();
        if (player.getId() == id) {
            player.changeMap(mapzz, mapzz.getPortal("sp"));
            player.send(UIPacket.AchievementRatio(Integer.parseInt(eim.getProperty("allProgress"))));
        }
    }
}

function move2P(eim) {
    var mapzz = em.getChannelServer().getMapFactory().getMap(910510100);
    var it = eim.getPlayers().iterator();
    var id = Integer.parseInt(eim.getProperty("2P_Id"));
    while (it.hasNext()) {
        var player = it.next();
        if (player.getId() == id) {
            player.changeMap(mapzz, mapzz.getPortal("sp"));
            player.send(UIPacket.AchievementRatio(Integer.parseInt(eim.getProperty("allProgress"))));
        }
    }
}

function moveAll(eim) {
    var mapzz = em.getChannelServer().getMapFactory().getMap(931040000);
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var player = it.next();
        player.changeMap(mapzz, mapzz.getPortal("sp"));
        player.send(UIPacket.AchievementRatio(Integer.parseInt(eim.getProperty("allProgress"))));
    }
}

function announce(eim) {
    var text = "5초 후 사악한 몬스터 <에레고스>가 소환됩니다.";
    em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(UIPacket.showInfo(text));
    em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(MainPacketCreator.getGMText(7, text));
    eim.schedule("summon", 5000);
    var text = "제단 뒤의 <프란시스> 에게 말을 거세요!";
    em.getChannelServer().getMapFactory().getMap(910510001).broadcastMessage(UIPacket.showInfo(text));
    em.getChannelServer().getMapFactory().getMap(910510001).broadcastMessage(MainPacketCreator.getGMText(7, text));
}

function summon(eim) {
    var text = "몬스터가 소환되었습니다! 몬스터를 잡으시면 다음 스테이지로 진행 가능합니다.";
    em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(UIPacket.showInfo(text));
    em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(MainPacketCreator.getGMText(5, text)); //-109,154
    var mob = AthenaLifeProvider.getMonster(9300028);
    mob.disableDrops();
    eim.registerMonster(mob);
    em.getChannelServer().getMapFactory().getMap(910510000).spawnMonsterOnGroundBelow(mob, new Point(360, 207));
}

function eruwaterSummon(eim) {
    var mobid = 7120109;
    for (var i = 0; i< 15; i++) {
        var pos = new Point(Randomizer.rand(-150, 800), 18);
        var mob = AthenaLifeProvider.getMonster(mobid);
        mob.disableDrops();
        eim.registerMonster(mob);
        em.getChannelServer().getMapFactory().getMap(931040000).spawnMonsterOnGroundBelow(mob, pos);
    }
    for (var i = 0; i< 15; i++) {
        var pos = new Point(Randomizer.rand(-35, 562), -282);
        var mob = AthenaLifeProvider.getMonster(mobid);
        mob.disableDrops();
        eim.registerMonster(mob);
        em.getChannelServer().getMapFactory().getMap(931040000).spawnMonsterOnGroundBelow(mob, pos);
    }
}

function zakumSummon(eim) {
    var text = "몬스터가 소환되었습니다!";
    em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(UIPacket.showInfo(text));
    em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.getGMText(5, text)); //-109,154
    var mob = AthenaLifeProvider.getMonster(8800002);
    mob.disableDrops();
    mob.setHp(mob.getHp() / 5);
    eim.registerMonster(mob);
    em.getChannelServer().getMapFactory().getMap(931040000).spawnMonsterOnGroundBelow(mob, new Point(300, 18));
}

function changedMap(eim, player, mapid) {
    
}

function scheduledTimeout(eim) {
    var exit = em.getChannelServer().getMapFactory().getMap(100000000);
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
    if (eim.getProperty("1P_Progress").equals("0")) {
        eim.setProperty("1P_Progress", "2");
        var text = "몬스터를 모두 잡으셨습니다! 잠시 후 다음 레벨로 넘어갑니다.";
        em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(UIPacket.showInfo(text));
        em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(MainPacketCreator.showEffect("monsterPark/clear"));
        em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(MainPacketCreator.playSound("Party1/Clear"));
        em.getChannelServer().getMapFactory().getMap(910510000).broadcastMessage(MainPacketCreator.serverNotice(6, text));
        eim.schedule("move1P", 5000);

        var progress = Integer.parseInt(eim.getProperty("allProgress"));
        progress += 10;
        eim.setProperty("allProgress", progress+"");
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.send(UIPacket.AchievementRatio(progress));
        }
    } else if (eim.getProperty("allProgress").equals("70") && em.getChannelServer().getMapFactory().getMap(931040000).getAllPlayer().size() > 0) {
        var text = "몬스터를 모두 잡으셨습니다! 그런데...";
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(UIPacket.showInfo(text));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.showEffect("monsterPark/clear"));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.playSound("Party1/Clear"));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.serverNotice(6, text));
        var progress = Integer.parseInt(eim.getProperty("allProgress"));
        progress += 10;
        eim.setProperty("allProgress", progress+"");
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.send(UIPacket.AchievementRatio(progress));
        }
        eim.schedule("eruwaterSummon", 5000);
    } else if (eim.getProperty("allProgress").equals("80")) {
        var text = "사악한 힘을 가진 몬스터가 등장합니다! 가장 강력한 괴물을 물리치십시오!";
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(UIPacket.showInfo(text));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.showEffect("monsterPark/clear"));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.playSound("Party1/Clear"));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.serverNotice(6, text));
        var progress = Integer.parseInt(eim.getProperty("allProgress"));
        progress += 10;
        eim.setProperty("allProgress", progress+"");
        var it = eim.getPlayers().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.send(UIPacket.AchievementRatio(progress));
        }
        eim.schedule("zakumSummon", 5000);
    } else if (eim.getProperty("allProgress").equals("90")) {
        var text = "축하합니다!!!! 4차 전직 수련을 완벽하게 완수했습니다! 잠시 후 마을로 돌아갑니다.";
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(UIPacket.showInfo(text));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.showEffect("monsterPark/clearF"));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.playSound("Party1/Clear"));
        em.getChannelServer().getMapFactory().getMap(931040000).broadcastMessage(MainPacketCreator.getGMText(7, text));
        var progress = Integer.parseInt(eim.getProperty("allProgress"));
        progress += 10;
        eim.setProperty("allProgress", progress+"");
        var it = eim.getPlayers().iterator();
        
        var context = "[축하] 축하합니다! "+eim.getPlayers().get(0).getName()+" 님과 "+eim.getPlayers().get(1).getName()+" 님께서 선히스토리에서 4차 전직 임무를 완수했습니다!";
        while (it.hasNext()) {
            var chr = it.next();
            chr.send(UIPacket.AchievementRatio(progress));
            chr.setKeyValue("4thJobTrialComplete", "1");
            chr.setKeyValue2("4thJobTrialCompleteTime", ((System.currentTimeMillis() / 1000) - chr.getKeyValue2("4thTrialStartTime"))+"");
        }
        WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(7, context));
        eim.schedule("clearPQ", 5000);
    }
}

function playerDead(eim, player) {
//    player.getStat().setHp(50);
//    var exit = em.getChannelServer().getMapFactory().getMap(924000002);
//    var it = eim.getPlayers().iterator();
//    while (it.hasNext()) {
//        var chr = it.next();
//        chr.changeMap(exit, exit.getPortal(0));
//        chr.Message("플레이어가 사망하여 퀘스트를 진행할 수 없습니다.");
//    }
//    eim.unregisterAll();
//    eim.dispose();
    return 0;
}

function playerRevive(eim, player) {
    
}

function playerDisconnected(eim, player) {
    /* 0 : 모두 나갈때 까지는 인스턴스 유지
     * 1 ~ : 일정 수준 이상의 사람만 남으면 누가 나가던지 인스턴스 유지
     * -1 ~ 이하 : 일정 수준 이상의 사람만 남으면 유지이나, 파티장이 나가면 인스턴스 삭제
     */
    
    return -2;
}

function monsterValue(eim, mobid) {
    /*
     * 킬 카운트를 더할 숫자 반환
     */
//    if (mobid == 9800014) {
//        var count = Integer.parseInt(eim.getProperty("9800014"));
//        count--;
//        eim.setProperty("9800014", count+"");
//        if (count != 0) {
//            var text = "남은 몬스터 수 : "+count+ "/10";
//            var it = eim.getPlayers().iterator();
//            while (it.hasNext()) {
//                var chr = it.next();
//                chr.send(UIPacket.showInfo(text));
//                chr.send(MainPacketCreator.getGMText(7, text));
//            }
//        } else if (count == 0 && eim.getProperty("allProgress").equals("60")) {
//            var progress = Integer.parseInt(eim.getProperty("allProgress"));
//            var text = "몬스터를 모두 잡았습니다! 잠시 후 다음 스테이지로 이동됩니다.";
//            progress += 10;
//            eim.setProperty("allProgress", progress+"");
//            
//        }
//    }
    return 1;
}

function leftParty(eim, player) {
    var exit = em.getChannelServer().getMapFactory().getMap(924000002);
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

function disbandParty(eim) {
    var exit = em.getChannelServer().getMapFactory().getMap(924000002);
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
    var exit = em.getChannelServer().getMapFactory().getMap(924000002);
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
    }
    eim.unregisterAll();
    if (eim != null) {
	eim.dispose();
    }
    
}

function playerExit(eim, player) {
    var exit = em.getChannelServer().getMapFactory().getMap(924000002);
    var it = eim.getPlayers().iterator();
    while (it.hasNext()) {
        var chr = it.next();
        chr.changeMap(exit, exit.getPortal(0));
        chr.Message("퀘스트를 포기하여 더이상 퀘스트를 진행할 수 없습니다.");
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