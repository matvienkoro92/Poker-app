'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{createRequire}=require('node:module');
const S=require('../app-scooter-catalog'),G=require('../app-garage-catalog');
test('scooter unlocks at three and adds a new configurable upgrade at every level through twelve',()=>{
 assert.equal(S.catalog(2).some(i=>i.unlocked),false);assert.equal(S.catalog(3).filter(i=>i.unlocked).length,9);assert.throws(()=>S.normalize({},2,true),/3/);
 for(let level=4;level<=12;level++){const [item]=S.rewards(level);assert.equal(S.rewards(level).length,1);assert.throws(()=>S.normalize({[item.kind]:item.id},level-1,true),new RegExp(''+level));assert.equal(S.normalize({[item.kind]:item.id},level,true)[item.kind],item.id);}
 assert.equal(G.availableTransport('hoverboard',6),'bicycle');assert.equal(G.availableTransport('hoverboard',7),'hoverboard');
});
test('both native models are self-contained and scooter geometry has every part variant',()=>{
 for(const [file,prefix,items] of [['scooter-v1.glb','sc',S.items],['skyboard-v1.glb','sky',[]]]){
 const buf=fs.readFileSync(path.join(__dirname,'../assets/garage/models',file));assert.equal(buf.toString('ascii',0,4),'glTF');assert.equal(buf.length,buf.readUInt32LE(8));assert.ok(buf.length<4*1024*1024);
 const gltf=JSON.parse(buf.toString('utf8',20,20+buf.readUInt32LE(12))),names=new Set(gltf.nodes.map(n=>n.name));for(const item of items)if(item.kind!=='frame')assert.ok(names.has(prefix+'__'+item.kind+'__'+item.id),item.key);assert.ok(gltf.buffers.every(b=>!b.uri));assert.equal((gltf.images||[]).length,0);
 }
});
function mock(stubs){const full=path.join(__dirname,'../lib/player-hall.js'),req=createRequire(full),module={exports:{}};vm.runInNewContext(fs.readFileSync(full,'utf8'),{module,exports:module.exports,require:id=>Object.hasOwn(stubs,id)?stubs[id]:req(id),console,process,Map,Set,Buffer});return module.exports;}
test('server enforces real scooter and Skyboard levels and preserves independent vehicle equipment',async()=>{
 for(const [level,transport,part,allowed] of [[2,'scooter',{},false],[3,'scooter',{motor:'twin'},false],[3,'scooter',{},true],[6,'hoverboard',undefined,false],[7,'hoverboard',undefined,true],[12,'scooter',{body:'hyper'},true]]){
 const old={version:0,featured:[],theme:'walnut',goal:'wins',selectedTransport:'bicycle',garage:{...G.defaults,suit:'palmTank'},bicycle:{fork:'suspension'}};let raw=JSON.stringify(old);
 const hall=mock({'./club-social':{memberProfile:async()=>({accountId:'ID1',nick:'Test',name:'Test',bound:true,level}),redis:async cmds=>cmds.map(c=>c[0]==='GET'?raw:c[0]==='SMEMBERS'?[]:c[0]==='EVAL'?(raw=c[5],1):null)},'./garage-plate-registry':{plateKey:()=>'',save:async()=>{throw Error('No plate claim expected');}},'./player-hall-tournament-results.json':[],'./profile-achievement-catalog.json':{},'./player-hall-seasons.json':{}});
 const body={version:0,featured:[],theme:'walnut',goal:'wins',selectedTransport:transport,level:100,...(part?{scooter:part}:{})};
 if(!allowed){await assert.rejects(()=>hall.save('ID1',body));assert.equal(JSON.parse(raw).version,0);}else{const saved=await hall.save('ID1',body);assert.equal(saved.selectedTransport,transport);assert.deepEqual(JSON.parse(raw).garage,old.garage);assert.deepEqual(JSON.parse(raw).bicycle,old.bicycle);}
 }
});
