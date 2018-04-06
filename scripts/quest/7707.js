/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var status = -1;

function start(mode, type, selection) {
	qm.sendNext("Welcome to AmethystMS, remember to vote every 24 hours. Updates are posted on the Forum and Discord.");
	qm.forceCompleteQuest();
	qm.dispose();
}
function end(mode, type, selection) {
	qm.dispose();
}