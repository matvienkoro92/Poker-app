const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function harness(){
 const source=fs.readFileSync(require.resolve('../app-my-summary.js'),'utf8');
 const badges=[{},{}].map(b=>Object.assign(b,{classList:{add(){}},setAttribute(){}}));
 const saved=new Map();
 const ctx={document:{querySelectorAll:()=>badges},localStorage:{getItem:k=>saved.get(k)},Math,JSON};
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
test('seen state belongs to the player and survives reload',()=>{
 const h=harness();
 h.run("acceptChartHistory({playerId:'1',rows:[{handId:'10'}]})");
 h.saved.set('poker-chart-seen:1',h.run("JSON.stringify({'10':chartFingerprint(chartHistory.rows[0])})"));
 h.run('acceptChartHistory(chartHistory)');assert.ok(h.badges.every(b=>b.hidden));
 h.run("acceptChartHistory({playerId:'2',rows:[{handId:'10'}]})");assert.ok(h.badges.every(b=>!b.hidden));
 h.run("acceptChartHistory({playerId:'',rows:[]})");assert.ok(h.badges.every(b=>b.hidden));
});
