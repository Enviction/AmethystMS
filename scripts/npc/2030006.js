/* Holy Stone    Hidden Street: Holy Ground at the Snowfield (211040401)
    
    Author: Amity
*/


var status = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}
    function action(mode, type, selection) {
    if (status >= 2 && mode == 0) {
    cm.dispose();
    return;
    }
    if (mode == 1)
    status++;
    else
    status--;
    if (status == 0) {
        cm.sendNext("#b(A mysterious energy surrounds this stone. The elder definitely told me to touch it... Should I really touch this thing?)");
    } else if (status == 1) {
        if (!cm.haveItem(4031059) && cm.getQuestStatus(1431) == 1 || cm.getQuestStatus(1432) == 1 || cm.getQuestStatus(1433) == 1 || cm.getQuestStatus(1435) == 1 || cm.getQuestStatus(1436) == 1 || cm.getQuestStatus(1437) == 1 || cm.getQuestStatus(1439) == 1 || cm.getQuestStatus(1440) == 1 || cm.getQuestStatus(1442) == 1 || cm.getQuestStatus(1443) == 1 || cm.getQuestStatus(1447) == 1 || cm.getQuestStatus(1445) == 1 || cm.getQuestStatus(1446) == 1 || cm.getQuestStatus(1448) == 1) {
        var em = cm.getEventManager("3rdjob");
        if (em == null) {
            cm.sendOk("Sorry, but everything is broken.");
        } else {
            em.newInstance("3rdjob").registerPlayer(cm.getPlayer());
            }
        cm.dispose();
        
        }
        }
        } 