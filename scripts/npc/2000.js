/* Author: Hashed/Prio
 * ID: 2000
 * Name: Roger
 * Function: Unknown
 * Uncoded NPC, created with TraNpcExtractor v0.3.0
 * TraNpcExtractor was written by Prio from StaticDEV.com
 */

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	cm.sendNext("Hi, Welcome to AmethystMS <3");
	cm.safeDispose();
}