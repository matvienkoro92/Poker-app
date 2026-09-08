"use strict";
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('past results display separate cards without duplicate or current-event actions', () => {
 const context = { URLSearchParams, window: {location:{}, setInterval(){}, addEventListener(){}}, document:{readyState:'loading',addEventListener(){},querySelector(){return null;}} };
 const source=fs.readFileSync(require.resolve('../app-tournament-bet.js'),'utf8').replace('  window.openTournamentBetModal = open;', '  window.historyHtml = completedEventsHtml;');
 vm.runInNewContext(source,context);
 const event=(id,name)=>({id,status:'settled',title:name,bank:6200,stakePrice:300,entries:[{name:'Winner',winner:true,stake:300}]});
 const html=context.window.historyHtml({id:'current',completedEvents:[event('past1','First'),event('past2','Second'),event('past1','Duplicate'),event('current','Current'),{...event('personal','Personal'),createdByPlayer:true}]});
 assert.equal((html.match(/<details /g)||[]).length,2);
 assert.match(html,/First/);assert.match(html,/Second/);assert.match(html,/Winner/);
 assert.doesNotMatch(html,/Duplicate|Current|Personal|data-tournament-bet-action|data-tournament-bet-copy|data-tournament-bet-share/);
 assert.equal(context.window.historyHtml({completedEvents:[]}), '');
 assert.match(context.window.historyHtml({completedEvents:[event('past','No current')]}),/No current/);
});
