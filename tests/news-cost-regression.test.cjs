'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Module = require('node:module');
const path = require('node:path');

test('player profiles share the winners request within a session and isolate different credentials',async()=>{
  const stored = new Map(), requests=[];
  const storage={getItem:key=>stored.get(key)||null,setItem:(key,value)=>stored.set(key,value)};
  const window={location:{origin:'https://club.test'},addEventListener(){}};
  let session='one';
  const context={window,document:{readyState:'loading',addEventListener(){}},URL,URLSearchParams,
    localStorage:storage,sessionStorage:storage,pokerApiAuthQuery:()=>'?pwaSession='+session,
    fetch:async url=>{
      requests.push(String(url));
      return {ok:true,json:async()=>({ok:true,winners:[],rows:[],snapshots:{},friends:[]})};
    }};
  vm.runInNewContext(fs.readFileSync(require.resolve('../app-home-friend-news'),'utf8'),context);
  await Promise.all(Array.from({length:10},(_,i)=>window.pokerGetPlayerNews({nick:'player'+i})));
  await window.pokerGetPlayerNews({nick:'another'});
  const winners=()=>requests.filter(url=>url.includes('/daily-poker/winners'));
  assert.equal(winners().length,1);
  session='two';
  await window.pokerGetPlayerNews({nick:'another'});
  assert.equal(winners().length,2);
  assert.match(winners()[1],/pwaSession=two/);
});

test('cold raffle achievements read winners from both compact and legacy draws without participant lookups',async()=>{
  const filename=require.resolve('../lib/api-handlers/raffles'),mod=new Module(filename,module);
  mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));
  const commands=[];
  const pipeline=async batch=>batch.map(cmd=>{
    commands.push(cmd);
    const [op,key]=cmd;
    if(op==='LRANGE')return {result:['compact','legacy']};
    if(op==='GET' && key.startsWith('poker_app:raffle:')){
      const id=key.split(':').pop();
      return {result:JSON.stringify({id,status:'drawn',groups:[{prize:'Ticket'}],
        ...(id==='legacy'?{participants:[{name:'Unrelated'}]}:{participantsCount:20}),
        winners:[{name:'Winner '+id,prize:'Ticket'}]})};
    }
    if(op==='SET')return {result:'OK'};
    if(op==='GET' && key.includes('achievements'))return {result:null};
    throw Error('Unexpected command '+cmd);
  });
  const original=mod.require.bind(mod);
  mod.require=id=>id==='../redis'?{...original(id),pipeline}:original(id);
  mod._compile(fs.readFileSync(filename,'utf8')+'\nmodule.exports.achievements=loadRaffleAchievementsPayload;',filename);
  const data=await mod.exports.achievements({query:{}});
  assert.deepEqual(data.raffles.map(r=>r.winners[0].name),['Winner compact','Winner legacy']);
  assert.equal(commands.length,5);
});
