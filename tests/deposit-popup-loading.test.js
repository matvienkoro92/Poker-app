'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-admin-deposits.js'),'utf8');
function setup(){
 const requests=[],shown=[];
 const c={popupVersion:0,generation:0,statisticsPeriod:{preset:'today'},rafflePrizeQuery:'',rafflePrizeTab:'ticket',rafflePrizes:null,spinReturns:null,dialog:{open:true},editorPopup:{open:true},esc:String,
  showPopup(title){c.popupVersion++;c.editorPopup.open=true;shown.push(title);},
  api(body){return new Promise((resolve,reject)=>requests.push({body,resolve,reject}));},
  renderSpinReturns(){shown.push('spin rows');},renderRafflePrizes(){shown.push('raffle rows');}};
 vm.createContext(c);
 for(const [start,end] of [['  async function openRafflePrizes()','  function renderSpinReturns()'],['  async function openSpinReturns()','  function editSpinReturn'],['  function setStatisticsPeriod(','  function showPopup(']])vm.runInContext(source.slice(source.indexOf(start),source.indexOf(end)),c);
 return {c,requests,shown};
}
test('late spin responses cannot reopen a dismissed popup or replace a newer form',async()=>{
 for(const reject of [false,true]){const {c,requests,shown}=setup();const task=c.openSpinReturns();c.popupVersion++;c.editorPopup.open=false;
 if(reject)requests[0].reject(Error('offline'));else requests[0].resolve({rows:[{key:'old'}]});await task;
 assert.deepEqual(shown,['Крутки']);assert.equal(c.spinReturns,null);assert.equal(c.editorPopup.open,false);}
});
test('reopening on spins bypasses raffles and older overlapping responses are ignored',async()=>{
 const {c,requests,shown}=setup();c.rafflePrizeTab='spins';const old=c.openRafflePrizes(),fresh=c.openSpinReturns();
 assert.deepEqual(requests.map(r=>r.body.action),['spin-returns','spin-returns']);
 requests[1].resolve({rows:[{key:'new'}]});await fresh;requests[0].resolve({rows:[{key:'old'}]});await old;
 assert.equal(c.spinReturns.rows[0].key,'new');assert.equal(shown.filter(t=>t==='spin rows').length,1);
});
test('period changes clear both prize lists and invalidate outstanding requests',async()=>{
 const {c,requests,shown}=setup();c.rafflePrizes={rows:[{key:'yesterday'}]};c.spinReturns={rows:[]};
 const task=c.openRafflePrizes();c.setStatisticsPeriod({preset:'yesterday'});requests[0].resolve({rows:[{key:'today'}]});await task;
 assert.equal(c.rafflePrizes,null);assert.equal(c.spinReturns,null);assert.deepEqual(shown,['Розыгрыши (отдельно)']);
});
