'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {gzipSync}=require('node:zlib');
const file=path.join(__dirname,'../lib/api-handlers/club-cash-replay.js');
const row={playerId:'123',handId:'456',player:'Хиро',playedAt:'2026-09-23T10:00:00Z',game:'NLH',cards:['As','Kd'],position:'BTN',resultMinor:120000,bigBlindMinor:1000};
const replay={cards:row.cards,events:[{sequence:1,code:'20',actor:'Вы',actorId:'123',amount:120,board:[]},{sequence:2,code:'94',actor:'Стол',board:['Qc','Jd','9h']}]};
const pack=value=>gzipSync(JSON.stringify(value)).toString('base64');
const response=()=>({statusCode:200,status(code){this.statusCode=code;return this;},json(body){this.body=body;return this;}});
test('opens only a featured hand and returns both ruble and BB views',async()=>{
 const stubs={
  '../club-social':{context:async(req)=>({accountId:'ID1',body:req.body}),redis:async commands=>commands.map(([op,key,field])=>op==='GET'&&key==='poker_app:starting-hands:123:active'?'v1':op==='HGET'&&key==='poker_app:starting-hands:123:v1'&&field==='456'?pack(replay):null)},
  '../../club-cash-highlights.json':{months:[{groups:{potBb:[row]}}],days:[]},
  '../../starting-hands/hand-share':require('../starting-hands/hand-share'),
 };
 const module={exports:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),{module,exports:module.exports,require:id=>Object.hasOwn(stubs,id)?stubs[id]:require(id),Buffer,console},{filename:file});
 const handler=module.exports;
 const found=response();await handler({body:{playerId:'123',handId:'456'}},found);
 assert.equal(found.statusCode,200);assert.match(found.body.text,/Результат: \+1\s?200 ₽/);assert.match(found.body.textBb,/Результат: \+120 bb/);
 const missing=response();await handler({body:{playerId:'123',handId:'999'}},missing);assert.equal(missing.statusCode,404);
});
