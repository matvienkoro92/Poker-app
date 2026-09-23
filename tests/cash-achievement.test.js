'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {gzipSync}=require('node:zlib');
const root=path.join(__dirname,'..');
function load(stubs){const module={exports:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'lib/api-handlers/cash-achievement.js'),'utf8'),{module,exports:module.exports,require:id=>Object.hasOwn(stubs,id)?stubs[id]:require(id),Buffer,console},{filename:'cash-achievement.js'});return module.exports;}
const pack=value=>gzipSync(JSON.stringify(value)).toString('base64');
const response=()=>({statusCode:200,status(code){this.statusCode=code;return this;},json(body){this.body=body;return this;}});
test('counts only won cash showdowns of at least 1000 rubles with ace high',async()=>{
 const rows=[
  {handId:'1',mode:'cash',game:'NLH',showdown:true,resultMinor:100000,bigBlindMinor:1000,playedAt:'2026-09-23T10:00:00Z',playerId:'123',cards:['As','Kd'],position:'BTN'},
  {handId:'2',mode:'cash',game:'NLH',showdown:true,resultMinor:150000,bigBlindMinor:1000,playedAt:'2026-09-23T11:00:00Z',playerId:'123',cards:['As','Kd'],position:'BTN'},
  {handId:'3',mode:'cash',game:'NLH',showdown:true,resultMinor:99999,bigBlindMinor:1000,playedAt:'2026-09-23T12:00:00Z',playerId:'123',cards:['As','Kd'],position:'BTN'},
 ];
 const replay=board=>({cards:['As','Kd'],events:[{sequence:1,code:'20',actor:'Вы',actorId:'123',amount:10},{sequence:2,code:'94',board}]});
 const storage=new Map([['poker_app:starting-hands:123:active','v1'],['poker_app:starting-hands:123:v1:list',pack({rows})],['poker_app:starting-hands:123:v1:1',pack(replay(['Qc','Jd','9h','6s','3c']))],['poker_app:starting-hands:123:v1:2',pack(replay(['Qc','Qd','9h','6s','3c']))]]);
 const redis=async commands=>commands.map(([op,key,...args])=>{if(op==='GET')return storage.get(key)||null;if(op==='HGET')return storage.get(key+':'+args[0])||null;if(op==='SETEX'){storage.set(key,args[1]);return 'OK';}throw Error(op);});
 const handler=load({'../club-social':{context:async(req)=>({accountId:'ID1',body:req.body}),redis},'../pokerplus':{readBoundPokerPlusUserId:async()=> '123'},'../../starting-hands/insights':require('../starting-hands/insights'),'../../starting-hands/hand-share':require('../starting-hands/hand-share')});
 const first=response();await handler({body:{targetId:'ID1'}},first);
 assert.equal(first.statusCode,200);assert.equal(first.body.count,1);assert.equal(first.body.previews[0].handId,'1');assert.match(first.body.previews[0].text,/Мои карты/);
 const second=response();await handler({body:{targetId:'ID1'}},second);assert.equal(second.body.count,1);
 const invalid=response();await handler({body:{targetId:'other'}},invalid);assert.equal(invalid.statusCode,400);
});
