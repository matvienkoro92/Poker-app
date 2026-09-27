"use strict";
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('past results display separate cards without duplicate or current-event actions', () => {
 const context = { URLSearchParams, window: {location:{}, setInterval(){}, addEventListener(){}}, document:{readyState:'loading',addEventListener(){},querySelector(){return null;}} };
 const source=fs.readFileSync(require.resolve('../app-tournament-bet.js'),'utf8').replace('  window.openTournamentBetModal = open;', '  window.historyHtml = completedEventsHtml; window.closedHistoryHtml = completedEventsHtml;');
 vm.runInNewContext(source,context);
 assert.equal(context.window.closedHistoryHtml({archiveEvents:[]}), "");
 const event=(id,name)=>({id,status:'settled',title:name,bank:6200,stakePrice:300,entries:[{name:'Winner',winner:true,stake:300}]});
 const html=context.window.historyHtml({id:'current',archiveEvents:[event('past1','First'),event('past2','Second'),event('past1','Duplicate'),event('current','Current'),{...event('personal','Personal'),createdByPlayer:true}]});
 assert.equal((html.match(/data-tournament-bet-archive=/g)||[]).length,2);
 assert.match(html,/First/);assert.match(html,/Second/);assert.doesNotMatch(html,/Winner|<img|<details/);
 assert.doesNotMatch(html,/Duplicate|Current|Personal|data-tournament-bet-action|data-tournament-bet-copy|data-tournament-bet-share/);
 assert.equal(context.window.historyHtml({archiveEvents:[]}), '');
 assert.match(context.window.historyHtml({archiveEvents:[event('past','No current')]}),/No current/);
});

test('archive requests only the opened event, shares pending requests and caches success', async () => {
 const calls = [];
 let resolveFetch;
 const context = { URLSearchParams, fetch(url) { calls.push(url); return new Promise(resolve => { resolveFetch = resolve; }); },
  window: {location:{}, setInterval(){}, addEventListener(){}},
  document:{readyState:'loading',addEventListener(){},querySelector(){return null;}} };
 const source = fs.readFileSync(require.resolve('../app-tournament-bet.js'),'utf8').replace('  window.openTournamentBetModal = open;',
  '  window.archiveTest = { html: completedEventsHtml, load: loadArchiveEvent, cached: function(id) { return archiveDetails[id]; } };');
 vm.runInNewContext(source, context);
 context.window.archiveTest.html({archiveEvents:[{id:'past1',status:'settled',title:'First'},{id:'past2',status:'settled',title:'Second'}]});
 assert.equal(calls.length, 0);
 context.window.archiveTest.load('past1');
 context.window.archiveTest.load('past1');
 assert.equal(calls.length, 1);
 assert.match(calls[0], /eventId=past1/);
 resolveFetch({ok:true,json:async()=>({ok:true,id:'past1',status:'settled',entries:[]})});
 await new Promise(resolve => setImmediate(resolve));
 assert.equal(context.window.archiveTest.cached('past1').id, 'past1');
 context.window.archiveTest.load('past1');
 assert.equal(calls.length, 1);
 assert.equal(context.window.archiveTest.cached('past2'), undefined);
});
