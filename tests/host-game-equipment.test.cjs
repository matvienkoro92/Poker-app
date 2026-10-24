'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),boardFixture=require('./helpers/board-wager-fixture.cjs'),poolFixture=require('./helpers/billiards-wager-fixture.cjs');
const hostBoard={board:'imperial-palace',pieces:'regalia',nardsBoard:'wolves',nardsInterior:'frost',nardsDice:'galaxy',nardsDiceSize:'small',checkers:'obsidian'};
for(const kind of ['chess','short','long'])for(const stake of [0,300])test(kind+' '+stake+': host equipment is shared without unlocking it for guests',async()=>{
 const f=boardFixture({profiles:{m1:{name:'Хозяин',level:100},m2:{name:'Гость',level:1}}}),h=await f.service.call('m1',{action:'create',discipline:kind,stake,requestId:'host_equipment_0001',equipment:hostBoard});
 const expected=require('../lib/board-games-room').cleanEquipment(hostBoard,100);assert.deepEqual(h.equipment,expected);
 const g=await f.call('m2','join',h.roomId,{equipment:{board:'walnut',nardsDice:'classic'}});assert.deepEqual(g.equipment,expected);assert.equal(g.equipmentOwner,'Хозяин');
 const v=await f.call('viewer','watch',h.roomId);assert.deepEqual(v.equipment,expected);
 assert.deepEqual((await f.call('m2','room',h.roomId,{equipment:{nardsDice:'classic'}})).equipment,expected);
 const own=await f.service.call('m2',{action:'create',discipline:kind,equipment:hostBoard});assert.notEqual(own.equipment.board,'imperial-palace');assert.notEqual(own.equipment.nardsDice,'galaxy');
 const done=await f.call('m2','move',h.roomId,{revision:g.revision,move:{type:'resign'}});assert.deepEqual(done.equipment,expected);
 if(stake){assert.equal(done.wager.status,'paid');assert.equal(f.changes.length,3);}else{const next=await f.call('m1','rematch',h.roomId,{revision:done.revision});assert.deepEqual(next.equipment,expected);}
});
for(const stake of [0,300])test('billiards '+stake+': guests borrow host table and cue; forged aim cannot replace them',async()=>{
 const f=poolFixture({profiles:{m1:{name:'Хозяин',level:100},m2:{name:'Гость',level:1}}}),equipment={table:'royal',cue:'sovereign'},h=await f.service.call('m1',{action:'create',stake,requestId:'pool_equipment_0001',equipment});assert.deepEqual(h.equipment,equipment);
 const g=await f.call('m2','join',h.roomId,{equipment:{table:'classic',cue:'maple'}});assert.deepEqual(g.equipment,equipment);assert.equal(g.equipmentOwner,'Хозяин');assert.deepEqual((await f.call('viewer','watch',h.roomId)).equipment,equipment);
 const own=await f.service.call('m2',{action:'create',equipment});assert.deepEqual(own.equipment,{table:'classic',cue:'maple'});
 const aim={angle:0,cueId:0,shot:0,cueStyle:'maple',nick:'Подмена'};const shown=await f.call('m1','room',h.roomId,{aim});assert.equal(shown.aim.cueStyle,'sovereign');assert.equal(shown.aim.nick,'Хозяин');
 const shot=await f.call('m1','move',h.roomId,{revision:g.revision,aim,move:{type:'shot',angle:0,power:.4,cueId:0}});assert.deepEqual(shot.equipment,equipment);assert.equal(shot.playback.cueStyle,'sovereign');assert.equal(shot.playback.nick,'Хозяин');
});
