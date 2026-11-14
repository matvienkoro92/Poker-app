'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{createRequire}=require('node:module');
test('all four game wizards reach creation and challenge with free or paid settings on isolated services',async()=>{
 const path=require.resolve('../lib/telegram-create-game'),local=createRequire(path),module={exports:{}},db=new Map(),created=[],challenges=[];
 const equipment={fixture:'creator-equipment'};
 const commands=async rows=>rows.map(c=>c[0]==='GET'?JSON.stringify(equipment):null);
 const service={call:async(member,body)=>{created.push({member,body});return {roomId:'ABCDEFGHJK'};}};
 const mocks={
 './redis':{pipeline:async rows=>rows.map(([op,key,value])=>{if(op==='GET')return {result:db.get(key)||null};if(op==='SET'){db.set(key,value);return {result:'OK'};}throw Error(op);})},
 './game-participation-gate':{check:async()=>({ok:true})},
 './board-games-service':{service,commands},'./billiards-service':{service,commands},
 './api-handlers/friends':{resolveNewsAccountId:async()=> 'ID123456'},
 './billiards-personal-equipment':async()=>({equipment}),
 './game-admission':{forApi:()=>({begin:async()=>({remember:async()=>{},release:async()=>{}})})},
 './active-game':{remember:async()=>{}},
 './board-games-challenge':async o=>challenges.push(o),'./billiards-challenge':async o=>challenges.push(o)
 };
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||local(id),console});
 const api=module.exports,player={id:42},button=(text,data)=>({text,callback_data:'club:'+data});
 for(const game of Object.keys(api.games))for(const paid of [false,true]){
  let result=await api.configure(game,player,'fixture','fixture_'+game+paid,button),steps=0;
  while(!result.created){
   assert.ok(++steps<20,'wizard must terminate');
   if(result.numberPrompt){result=await api.configure(result.numberPrompt+'.100',player,'fixture','fixture_'+game+paid,button);continue;}
   const buttons=result.keyboard.flat().filter(b=>b.callback_data?.startsWith('club:create-game:'+game));
   const choose=(paid?buttons.find(b=>b.text==='На фишки'):null)||buttons[0];assert.ok(choose);
   result=await api.configure(choose.callback_data.slice('club:create-game:'.length),player,'fixture','fixture_'+game+paid,button);
  }
  assert.equal(Number(created.at(-1).body.stake||0),paid?100:0);assert.equal(JSON.stringify(created.at(-1).body.equipment),JSON.stringify(equipment));
  assert.equal(created.at(-1).body.denyDarts,true);assert.match(result.text,/Комната создана/);
  const invitation=await api.challenge(result.keyboard[0][0].callback_data.slice(5),player,'fixture');assert.match(invitation.text,/Вызов отправлен/);
 }
 assert.equal(created.length,8);assert.equal(challenges.length,8);
});
