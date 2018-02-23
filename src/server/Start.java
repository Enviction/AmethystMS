package server;

import client.MapleCharacter;
import client.SkillFactory;
import client.inventory.MapleInventoryIdentifier;
import constants.ServerConstants;
import handling.MapleServerHandler;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.login.LoginServer;
import handling.cashshop.CashShopServer;
import handling.login.LoginInformationProvider;
import handling.world.World;
import java.sql.SQLException;
import database.DatabaseConnection;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.sql.PreparedStatement;
import server.Timer.*;
import server.events.MapleOxQuizFactory;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MobSkillFactory;
import server.life.PlayerNPC;
import server.quest.MapleQuest;
import java.util.concurrent.atomic.AtomicInteger;
import server.maps.MapleMapFactory;
import tools.MultiOutputStream;

public class Start {

    public static long startTime = System.currentTimeMillis();
    public static final Start instance = new Start();
    public static AtomicInteger CompletedLoadingThreads = new AtomicInteger(0);

    public void run() throws InterruptedException {

        if (Boolean.parseBoolean(ServerProperties.getProperty("net.sf.odinms.world.admin")) || ServerConstants.Use_Localhost) {
            System.out.println("[!!! Admin Only Mode Active !!!]");
        }
        try
        {
                FileOutputStream fout= new FileOutputStream("logs/console.log");
                FileOutputStream ferr= new FileOutputStream("logs/console_error.log");

                MultiOutputStream multiOut= new MultiOutputStream(System.out, fout);
                MultiOutputStream multiErr= new MultiOutputStream(System.err, ferr);

                PrintStream stdout= new PrintStream(multiOut);
                PrintStream stderr= new PrintStream(multiErr);

                System.setOut(stdout);
                System.setErr(stderr);
        }
        catch (FileNotFoundException ex)
        {
            ex.printStackTrace();
        }

        try {
            final PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE accounts SET loggedin = 0");
            ps.executeUpdate();
            ps.close();
        } catch (SQLException ex) {
            throw new RuntimeException("[EXCEPTION] Please check if the SQL server is active.");
        }
        
       System.out.println("[" + ServerProperties.getProperty("net.sf.odinms.login.serverName") + "]");
        World.init();
        System.out.println("World initialized.  Starting timers...");
        WorldTimer.getInstance().start();
        EtcTimer.getInstance().start();
        MapTimer.getInstance().start();
        CloneTimer.getInstance().start();
        EventTimer.getInstance().start();
        BuffTimer.getInstance().start();
        PingTimer.getInstance().start();
        
        System.out.println("Timers started.  Loading guilds...");
        MapleGuildRanking.getInstance().load();
        MapleGuild.loadAll(); //(this); 
        System.out.println("Guilds loaded.  Loading families...");
        MapleFamily.loadAll(); //(this); 
        System.out.println("Families loaded.  Initializing quests...");
        MapleLifeFactory.loadQuestCounts();
        MapleQuest.initQuests();
        System.out.println("Quests initialized.  Preparing ItemInformationProvider...");
        MapleItemInformationProvider.getInstance().runEtc(); 
        System.out.println("ItemInformationProvider initialized. Preparing MonsterInformationProvider...");
        MapleMonsterInformationProvider.getInstance().load(); 
        //BattleConstants.init(); 
        System.out.println("MapleMonsterInformationProvider ready. Preparing MapleItemInformationProvider...");
        MapleItemInformationProvider.getInstance().runItems(); 
        System.out.println("MapleItemInformationProvider ready.  Loading skills...");
        SkillFactory.load();
        System.out.println("SkillFactory loaded.  Loading miscellaneous...");
        LoginInformationProvider.getInstance();
        RandomRewards.load();
        MapleOxQuizFactory.getInstance();
        MapleCarnivalFactory.getInstance();
        CharacterCardFactory.getInstance().initialize(); 
        MobSkillFactory.getInstance();
        SpeedRunner.loadSpeedRuns();
        MTSStorage.load();
        System.out.println("Miscellaneous loaded. Preparing custom life...");
        MapleInventoryIdentifier.getInstance();
        MapleMapFactory.loadCustomLife();
        System.out.println("Custom life loaded. Preparing Cash Shop...");
        CashItemFactory.getInstance().initialize(); 
        MapleServerHandler.initiate();
        System.out.println("[Loading Login]");
        LoginServer.run_startup_configurations();
        System.out.println("[LoginServer initialized and listening]");

        System.out.println("[Loading Channel]");
        ChannelServer.startChannel_Main();
        System.out.println("[All Channels Initialized]");

        System.out.println("[Loading CS]");
        CashShopServer.run_startup_configurations();
        System.out.println("[CS initialized and listening]");
        System.out.println("Finalizing startup tasks:");
        //CheatTimer.getInstance().register(AutobanManager.getInstance(), 60000);
        Runtime.getRuntime().addShutdownHook(new Thread(new Shutdown()));
        World.registerRespawn();
        //ChannelServer.getInstance(1).getMapFactory().getMap(910000000).spawnRandDrop(); //start it off
        ShutdownServer.registerMBean();
        //ServerConstants.registerMBean();
        PlayerNPC.loadAll();// touch - so we see database problems early...
        MapleMonsterInformationProvider.getInstance().addExtra();
        LoginServer.setOn(); //now or later
        
        RankingWorker.run();
        System.out.print("Initializing Auto Save, AzwanDailyCheck, and Ardentmill reset timers.");
        World.runAutoSave();
        World.runAzwanDailyCheck();
        World.runArdentmillReset();
        System.out.println("..Initialized.");
        
        System.out.println("[Fully Initialized in " + ((System.currentTimeMillis() - startTime) / 1000) + " seconds]");
    }

    public static class Shutdown implements Runnable {

        @Override
        public void run() {
            ShutdownServer.getInstance().run();
            ShutdownServer.getInstance().run();
        }
    }

    public static void main(final String args[]) throws InterruptedException {
        instance.run();
    }
}
