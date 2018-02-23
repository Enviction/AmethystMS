function enter(pi) {
	if (pi.getQuestStatus(30000) == 1) {
    pi.warp(910700200, 1);
	pi.introEnableUI(0);
    pi.introDisableUI(false);
	}
}