function start() {
    cm.sendSimple ("Buy what you want its the Thief Shop! (MADE BY BURBLISH)#k\r\n#L0##rThief Medal Shop#k\r\n#L1##rThief Hat Shop#k\r\n#L2##rThief Face Accessory Shop#k\r\n#L3##rThief Ear Accessory Shop#k\r\n#L4##rThief Shoe Shop#k\r\n#L5##rThief Cape Shop#k\r\n#L6##rThief Top Shop#k\r\n#L7##bThief Glove Shop#k\r\n#L8##bThief Overall Shop#k\r\n#L9##bThief Bottom Shop#k\r\n#L10##bThief Shield Shop#l\r\n#L11##bThief Dual Blade Belt Shop#l\r\n#L12##bThief Claw Shop#l\r\n#L13##bThief Dagger Shop#l\r\n#L14##bThief Katara Shop#k\r\n#L15##bThief Cane Shop#k");
}

function action(mode, type, selection) {
    cm.dispose();
    if (selection == 0) {
        cm.openShop (10400);
      } else if (selection == 1) {
        cm.openShop (10401);
      } else if (selection == 2) {
        cm.openShop (10402);
      } else if (selection == 3) {
        cm.openShop (10404);
      } else if (selection == 4) {
        cm.openShop (10405);
      } else if (selection == 5) {
        cm.openShop (10406);
      } else if (selection == 6) {
        cm.openShop (10407);
      } else if (selection == 7) {
        cm.openShop (10408);
      } else if (selection == 8) {
        cm.openShop (10409);
      } else if (selection == 9) {
        cm.openShop (10410);
      } else if (selection == 10) {
        cm.openShop (10412);
      } else if (selection == 11) {
        cm.openShop (10413);
      } else if (selection == 12) {
        cm.openShop (10421);
      } else if (selection == 13) {
        cm.openShop (10423);
      } else if (selection == 14) {
        cm.openShop (10434);
      } else if (selection == 15) {
        cm.openShop (10436);
    } else {
        cm.openNpc(1202010);
    }
}  