'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const statsSource=fs.readFileSync(require.resolve('../app-admin-game-stats.js'),'utf8');
function harness(){
 const nodes=new Map();const element=()=>({isConnected:true,className:'',setAttribute(){},append(){},replaceChildren(){},addEventListener(){},closest(){return null;},querySelector(key){if(!nodes.has(key))nodes.set(key,{value:'7',textContent:'',replaceChildren(){},append(){}});return nodes.get(key);}});
 let section;const document={createElement(){const node=element();if(!section)section=node;return node;},body:{append(){}}};const context={document,window:{},Date,Map,Set};vm.runInNewContext(statsSource,context);return{context,nodes,get section(){return section;}};
}
test('leaving embedded game statistics stops pagination after the pending response',async()=>{
 const h=harness();let finish,calls=0;const pending=h.context.window.PokerAdminGameStats.open(()=>{calls++;return new Promise(resolve=>finish=resolve);},{container:{append(){}}});
 h.section.isConnected=false;finish({ok:true,records:[],next:'1:0'});await pending;assert.equal(calls,1);
});
test('changing game period requests only the selected period',async()=>{
 const h=harness();const periods=[];await h.context.window.PokerAdminGameStats.open(async body=>{periods.push(body.period);return{ok:true,records:[],next:null,source:1,sources:11};},{container:{append(){}}});
 assert.deepEqual(periods,['7']);h.nodes.get('[data-period]').value='30';await h.nodes.get('[data-period]').onchange();assert.deepEqual(periods,['7','30']);
});
test('changing period ignores a late page from the preceding request',async()=>{
 const h=harness();let finish;const calls=[];
 const pending=h.context.window.PokerAdminGameStats.open(body=>{calls.push(body.period);if(body.period==='7')return new Promise(resolve=>finish=resolve);return Promise.resolve({records:[],next:null});},{container:{append(){}}});
 h.nodes.get('[data-period]').value='90';await h.nodes.get('[data-period]').onchange();finish({records:[],next:'1:0'});await pending;assert.deepEqual(calls,['7','90']);
});
test('silent deposit refresh does not load a full report while statistics is open or dialog is closed',async()=>{
 const src=fs.readFileSync(require.resolve('../app-admin-deposits.js'),'utf8'),code=src.slice(src.indexOf('  async function refresh(silent)'),src.indexOf('  async function ',src.indexOf('  async function refresh(silent)')+5));let calls=0;
 const c={busy:false,editing:false,statisticsOpen:true,dialog:{open:true},api(){calls++;throw Error('Unexpected request');}};vm.createContext(c);vm.runInContext(code,c);await c.refresh(true);c.statisticsOpen=false;c.dialog.open=false;await c.refresh(true);assert.equal(calls,0);
});
