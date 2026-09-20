const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function harness(){
 const source=fs.readFileSync(require.resolve('../app-my-summary.js'),'utf8');
 const badges=[{},{}].map(b=>Object.assign(b,{classList:{add(){}},setAttribute(){}}));
 const saved=new Map();
 const ctx={document:{hidden:false,getElementById:()=>null,querySelectorAll:()=>badges},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},Math,JSON};
 vm.createContext(ctx);
 vm.runInContext(source.slice(source.indexOf('  var chartHistory'),source.indexOf('  async function checkChartUnread')),ctx);
 return {ctx,badges,saved,run:s=>vm.runInContext(s,ctx)};
}
test('new graph flags both entries; viewed rows clear them; additions and corrections flag again',()=>{
 const h=harness();
 h.run("acceptChartHistory({playerId:'1',rows:[{handId:'10',resultMinor:100}]})");
 assert.ok(h.badges.every(b=>!b.hidden));
 h.run('chartSeen[10]=chartFingerprint(chartHistory.rows[0]);renderChartUnread()');
 assert.ok(h.badges.every(b=>b.hidden));
 h.run('chartHistory.rows[0].resultMinor=200;renderChartUnread()');
 assert.ok(h.badges.every(b=>!b.hidden));
 h.run("chartSeen[10]=chartFingerprint(chartHistory.rows[0]);chartHistory.rows.push({handId:'11'});renderChartUnread()");
 assert.ok(h.badges.every(b=>!b.hidden));
});
test('opening a loaded chart acknowledges the complete history immediately',()=>{
 const h=harness();
 h.run("acceptChartHistory({playerId:'1',rows:[{handId:'10'},{handId:'11'}]});acknowledgeChartHistory()");
 assert.ok(h.badges.every(b=>b.hidden));
 assert.deepEqual(Object.keys(JSON.parse(h.saved.get('poker-chart-seen:1'))).sort(),['10','11']);
});
test('seen state belongs to the player and survives reload',()=>{
 const h=harness();
 h.run("acceptChartHistory({playerId:'1',rows:[{handId:'10'}]})");
 h.saved.set('poker-chart-seen:1',h.run("JSON.stringify({'10':chartFingerprint(chartHistory.rows[0])})"));
 h.run('acceptChartHistory(chartHistory)');assert.ok(h.badges.every(b=>b.hidden));
 h.run("acceptChartHistory({playerId:'2',rows:[{handId:'10'}]})");assert.ok(h.badges.every(b=>!b.hidden));
 h.run("acceptChartHistory({playerId:'',rows:[]})");assert.ok(h.badges.every(b=>b.hidden));
});
test('viewing a filtered chart acknowledges the loaded history, including other game modes',()=>{
 const source=fs.readFileSync(require.resolve('../starting-hands/screen.js'),'utf8');
 const start=source.indexOf("    if(!document.querySelector('.profit-panel').hidden");
 const end=source.indexOf("    $('position').value",start);
 const messages=[];
 const context={document:{hidden:false,querySelector:()=>({hidden:false})},parent:{postMessage:m=>messages.push(m)},location:{origin:'https://example.test'},activeHistoryPlayerId:'1',activeHistoryVersion:'v1',bulk:{rows:[{handId:'cash'},{handId:'mtt'}]},data:{cells:[{hands:[{handId:'cash'}]}]}};
 vm.runInNewContext(source.slice(start,end),context);
 assert.deepEqual(Array.from(messages[0].handIds),['cash','mtt']);
 context.document.hidden=true;
 vm.runInNewContext(source.slice(start,end),context);
 assert.equal(messages.length,1);
});
