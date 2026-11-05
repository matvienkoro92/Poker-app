'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{createRequire}=require('node:module');
const B=require('../app-bicycle-catalog');
test('bicycle has a complete baseline at one and one visible upgrade at every level two through twelve',()=>{
 assert.equal(B.catalog(1).filter(i=>i.unlocked).length,Object.keys(B.groups).length);
 assert.deepEqual(B.normalize(null,1),B.defaults);
 for(let level=2;level<=12;level++){
  assert.equal(B.rewards(level).length,1);
  const item=B.rewards(level)[0];assert.throws(()=>B.normalize({[item.kind]:item.id},level-1,true),new RegExp(String(level)));
  assert.equal(B.normalize({[item.kind]:item.id},level,true)[item.kind],item.id);
 }
 assert.throws(()=>B.normalize({fork:'forged'},100,true),/Неизвестная/);
});
test('bicycle GLB contains every interchangeable upgrade and stays self-contained',()=>{
 const buf=fs.readFileSync(path.join(__dirname,'../assets/garage/models/bicycle-v1.glb'));assert.equal(buf.toString('ascii',0,4),'glTF');assert.equal(buf.readUInt32LE(8),buf.length);
 const gltf=JSON.parse(buf.toString('utf8',20,20+buf.readUInt32LE(12))),names=new Set(gltf.nodes.map(n=>n.name));
 for(const i of B.items)if(i.kind!=='frame'&&i.id!=='none')assert.ok(names.has('bike__'+i.kind+'__'+i.id),i.key);
 assert.ok(buf.length<4*1024*1024);assert.equal((gltf.images||[]).length,0);assert.ok(gltf.buffers.every(b=>!b.uri));
});
function mock(file,stubs){const full=path.join(__dirname,'..',file),req=createRequire(full),module={exports:{}};vm.runInNewContext(fs.readFileSync(full,'utf8'),{module,exports:module.exports,require:id=>Object.hasOwn(stubs,id)?stubs[id]:req(id),console,process,Map,Set,Buffer});return module.exports;}
test('server validates actual player level and saves bicycle independently from car and clothes',async()=>{
 for(const level of [1,3,12]){
  const oldCar={...require('../app-garage-catalog').defaults,suit:'palmTank'};let raw=JSON.stringify({version:0,featured:[],theme:'walnut',goal:'wins',selectedTransport:'bicycle',garage:oldCar});let plateClaims=0;
  const hall=mock('lib/player-hall.js',{
   './club-social':{memberProfile:async()=>({accountId:'ID1',nick:'Test',name:'Test',bound:true,level}),redis:async cmds=>cmds.map(c=>c[0]==='GET'?raw:c[0]==='SMEMBERS'?[]:c[0]==='EVAL'?(raw=c[5],1):null)},
   './garage-plate-registry':{plateKey:()=>'',save:async()=>{plateClaims++;throw Error('No plate claims for bicycles');}},
   './player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{},'./player-hall-seasons.json':{}
  });
  const body={version:0,featured:[],theme:'walnut',goal:'wins',bicycle:{...B.defaults,fork:'suspension'},level:100};
  if(level<3){await assert.rejects(()=>hall.save('ID1',body),/3/);assert.equal(JSON.parse(raw).version,0);}
  else{const saved=await hall.save('ID1',body);assert.equal(saved.garage.bicycle.loadout.fork,'suspension');assert.deepEqual(JSON.parse(raw).garage,oldCar);assert.equal(plateClaims,0);assert.equal(saved.selectedTransport,'bicycle');}
 }
});
test('public showcase carries verified bike parts and legacy accounts get the base model',()=>{
 const H=require('../lib/player-hall'),d={profile:{accountId:'ID1',nick:'Test'},saved:{selectedTransport:'bicycle'},garage:{stats:{level:1}}};
 assert.deepEqual(H.showcaseView(d,false).garage.bicycle.loadout,B.defaults);
 assert.equal(H.showcaseView({...d,saved:{...d.saved,bicycle:{fork:'suspension'}},garage:{stats:{level:3}}},false).garage.bicycle.loadout.fork,'suspension');
});
