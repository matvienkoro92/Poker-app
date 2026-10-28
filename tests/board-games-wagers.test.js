'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fixture=require('./helpers/board-wager-fixture.cjs');
test('host and guest stakes are charged once; winner receives 95% of bank once',async()=>{
 const f=fixture(),r=await f.create();assert.equal(r.wager.stake,100);assert.equal(f.balances.get('p1'),9900);
 await f.create();assert.equal(f.balances.get('p1'),9900);
 const joined=await f.call('m2','join',r.roomId);await f.call('m2','join',r.roomId);assert.equal(f.balances.get('p2'),9900);
 const done=await f.call('m2','move',r.roomId,{revision:joined.revision,move:{type:'resign'}});assert.equal(done.wager.status,'paid');assert.equal(done.wager.payout,190);assert.equal(f.balances.get('p1'),10090);
 await f.call('m1','room',r.roomId);await f.service.sweep();assert.equal(f.changes.length,3);
 await assert.rejects(f.call('m1','rematch',r.roomId,{revision:done.revision}),/Матч завершён/);
});
test('waiting host can cancel and receive a complete refund once; no guest may cancel',async()=>{
 const f=fixture(),r=await f.create();await assert.rejects(f.call('m2','cancel',r.roomId),/не участвуете/);
 await f.call('m1','cancel',r.roomId);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),10000);assert.equal(f.changes.length,2);
 assert.equal((await f.call('m2','join',r.roomId)).cancelled,true);assert.equal(f.balances.get('p2'),10000);
});
test('insufficient host or guest balance never charges or admits that player',async()=>{
 const f=fixture();f.balances.set('p1',99);await assert.rejects(f.create(),/Пополните фишки/);assert.equal(f.changes.length,0);
 f.balances.set('p1',1000);const r=await f.create();f.balances.set('p2',99);await assert.rejects(f.call('m2','join',r.roomId),/Пополните фишки/);assert.equal(f.rooms.get(r.roomId).players[1],null);assert.equal(f.changes.length,1);
});
test('expired room returns host stake even when the room document is missing',async()=>{
 const f=fixture(),r=await f.create();f.rooms.delete(r.roomId);f.advance();await f.service.sweep();assert.equal(f.balances.get('p1'),10000);assert.equal(f.journals.get(r.roomId).status,'refunded');
});
test('wallet success followed by storage failure is reconciled without a second debit',async()=>{
 const f=fixture();f.failWriteAfterDebit();await assert.rejects(f.create(),/write failed/);assert.equal(f.balances.get('p1'),9900);const r=await f.create();assert.equal(f.balances.get('p1'),9900);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),10000);assert.equal(f.changes.length,2);
});
test('concurrent guest joins reserve only one paid seat',async()=>{
 const f=fixture(),r=await f.create();const results=await Promise.allSettled([f.call('m2','join',r.roomId),f.call('m3','join',r.roomId)]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(f.changes.filter(o=>o.chips<0).length,2);
});
test('draw refunds both stakes without commission',async()=>{
 const f=fixture(),r=await f.create(),j=await f.call('m2','join',r.roomId);const offer=await f.call('m1','move',r.roomId,{revision:j.revision,move:{type:'draw-offer'}});const accepted=await f.call('m2','move',r.roomId,{revision:offer.revision,move:{type:'draw-accept'}});assert.equal(accepted.wager.status,'refunded');assert.equal(f.balances.get('p1'),10000);assert.equal(f.balances.get('p2'),10000);
});
test('race to three does not pay after a rack but resignation settles the whole match',async()=>{
 const f=fixture(),r=await f.service.call('m1',{action:'create',stake:101,requestId:'request_0000000002',raceTo:3,discipline:'short'});await f.call('m2','join',r.roomId);let raw=f.rooms.get(r.roomId);raw.state.winner=0;const rack=await f.call('m1','room',r.roomId);assert.equal(rack.wager.status,'playing');assert.equal(f.changes.length,2);
 const done=await f.call('m1','move',r.roomId,{revision:rack.revision,move:{type:'resign'}});assert.equal(done.wager.status,'paid');assert.equal(done.wager.winner,1);assert.equal(done.wager.payout,191);
});
test('stake inputs, changed retry parameters and cancellation after admission are rejected',async()=>{
 const f=fixture();for(const stake of [-1,99,100.5,'100',Infinity])await assert.rejects(f.create(stake));const r=await f.create();await assert.rejects(f.create(200),/Параметры/);await f.call('m2','join',r.roomId);await assert.rejects(f.call('m1','cancel',r.roomId),/Друг уже подключился/);
});
test('ordinary games do not touch wallets',async()=>{const f=fixture();const r=await f.service.call('m1',{action:'create',discipline:'short'});await f.call('m2','join',r.roomId);assert.equal(f.changes.length,0);assert.equal(r.wager,undefined);});

test('successful prize with lost checkpoint is not paid twice, including after expiry',async()=>{
 const f=fixture(),r=await f.create(),j=await f.call('m2','join',r.roomId);f.failWriteAfterDebit();await assert.rejects(f.call('m2','move',r.roomId,{revision:j.revision,move:{type:'resign'}}),/write failed/);assert.equal(f.balances.get('p1'),10090);f.advance();await f.service.sweep();assert.equal(f.balances.get('p1'),10090);assert.equal(f.journals.get(r.roomId).status,'paid');
});
test('large transfers resume their saved chunks without repeated debits',async()=>{
 const f=fixture();f.balances.set('p1',20000);await assert.rejects(f.create(6000),/продолжается/);assert.equal(f.balances.get('p1'),15000);const r=await f.create(6000);assert.equal(f.balances.get('p1'),14000);await assert.rejects(f.call('m1','cancel',r.roomId),/продолжается/);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),20000);assert.equal(f.orders.size,12);
});
test('expiry preserves an already saved winning match and pays instead of refunding',async()=>{
 const f=fixture(),r=await f.create();await f.call('m2','join',r.roomId);const room=f.rooms.get(r.roomId);room.match.winner=1;room.state.winner=1;f.advance();await f.service.sweep();assert.equal(f.journals.get(r.roomId).status,'paid');assert.equal(f.balances.get('p2'),10090);assert.equal(f.balances.get('p1'),9900);
});

test('lost create response can be cancelled by its request id; late retries cannot debit',async()=>{
 const f=fixture();await f.create();await f.service.call('m1',{action:'cancel',requestId:'request_0000000001'});assert.equal(f.balances.get('p1'),10000);await assert.rejects(f.create());assert.equal(f.balances.get('p1'),10000);
 const g=fixture();await g.service.call('m1',{action:'cancel',requestId:'request_0000000001'});await assert.rejects(g.create());assert.equal(g.changes.length,0);
});

test('retry cannot change chess time control after a stake was reserved',async()=>{const f=fixture();await f.service.call('m1',{action:'create',stake:100,requestId:'request_chess_0001',discipline:'chess',timeControl:'rapid-10'});await assert.rejects(f.service.call('m1',{action:'create',stake:100,requestId:'request_chess_0001',discipline:'chess',timeControl:'blitz-3-2'}),/Параметры/);assert.equal(f.changes.length,1);assert.match(f.changes[0].idempotencyKey,/^board-games:/);});

test('chat challenge stakes survive preview, join and payout without duplicate debits',async()=>{
 const f=fixture(),body={action:'create',challenge:true,stake:500,requestId:'challenge_request_0001',discipline:'chess',raceTo:1};
 const room=await f.service.call('m1',body);await f.service.call('m1',body);
 assert.equal(f.balances.get('p1'),9500);
 const preview=await f.call('m2','preview',room.roomId);assert.equal(preview.wager.stake,500);assert.equal(preview.wager.payout,950);
 const joined=await f.call('m2','join',room.roomId);await f.call('m2','join',room.roomId);assert.equal(f.balances.get('p2'),9500);
 const done=await f.call('m2','move',room.roomId,{revision:joined.revision,move:{type:'resign'}});
 assert.equal(done.wager.status,'paid');assert.equal(f.balances.get('p1'),10450);assert.equal(f.changes.length,3);
});

test('live paid table polls do not contend with wallet locks; settlement remains protected',async()=>{
 const f=fixture(),r=await f.create(300);await f.call('m2','join',r.roomId);
 f.locks.add(r.roomId);
 try {
  const views=await Promise.all([f.call('m1','room',r.roomId),f.call('m2','room',r.roomId),f.call('viewer','watch',r.roomId)]);
  for(const v of views){assert.equal(v.ready,true);assert.equal(v.wager.stake,300);assert.equal(v.wager.status,'playing');}
  assert.equal(f.changes.length,2);
  await assert.rejects(f.call('outsider','room',r.roomId),e=>e.status===403);
  const raw=f.rooms.get(r.roomId);raw.state.winner=0;raw.match.winner=0;
  await assert.rejects(f.call('m1','room',r.roomId),e=>e.status===409);
  assert.equal(f.changes.length,2);
 } finally {f.locks.delete(r.roomId);}
 const done=await f.call('m1','room',r.roomId);assert.equal(done.wager.status,'paid');assert.equal(done.wager.payout,570);assert.equal(f.changes.length,3);
});

test('already started old-rate payouts resume the exact journal amount',async()=>{
 const f=fixture(),r=await f.create();await f.call('m2','join',r.roomId);const w=f.journals.get(r.roomId);w.status='paying';w.winner=0;w.operations.prize={index:0,amount:180,done:0};
 const done=await f.call('m1','room',r.roomId);assert.equal(done.wager.payout,180);assert.equal(done.wager.feePercent,10);assert.equal(f.balances.get('p1'),10080);
});
test('automatic timeout turns leave the bank untouched while the game is unfinished',async()=>{
 const f=fixture(),r=await f.create();await f.call('m2','join',r.roomId);
 for(let n=0;n<5;n++){f.elapse(91000);const view=await f.call('m1','room',r.roomId);assert.equal(view.state.winner,null);assert.equal(view.wager.status,'playing');assert.equal(f.changes.length,2);assert.notEqual(view.state.endReason,'timeout-skips');}
});
test('mars reaches three-point target and pays the fixed bank exactly once',async()=>{
 const f=fixture(),r=await f.service.call('m1',{action:'create',discipline:'long',raceTo:3,stake:100,requestId:'mars_match_00001'});await f.call('m2','join',r.roomId);const room=f.rooms.get(r.roomId),s=room.state;
 room.match.wins=[1,0];room.match.round=2;room.match.creditedRound=1;s.points.fill(0);s.points[23]=1;s.points[20]=-15;s.off=[14,0];s.turn=0;s.turns=[2,2];s.phase='moving';s.opening=false;s.roll=[1,2];s.dice=[1];
 const done=await f.call('m1','move',r.roomId,{revision:room.revision,move:{type:'move',from:23,to:24,die:1}});assert.equal(done.state.winKind,'mars');assert.deepEqual(done.match.wins,[3,0]);assert.equal(done.match.winner,0);assert.equal(done.wager.status,'paid');assert.equal(done.wager.payout,190);await f.call('m1','room',r.roomId);assert.equal(f.changes.length,3);
});

test('reload recovers the exact paid room without another debit or client settings',async()=>{
 const f=fixture();const created=await f.create(2000);
 const recovered=await f.service.call('m1',{action:'recover-create',requestId:'request_0000000001'});
 assert.equal(recovered.roomId,created.roomId);assert.equal(recovered.wager.stake,2000);assert.equal(f.balances.get('p1'),8000);
 assert.equal(f.changes.length,2);
 await f.service.call('m1',{action:'recover-create',requestId:'request_0000000001'});assert.equal(f.changes.length,2);
 const other=await f.service.call('m2',{action:'recover-create',requestId:'request_0000000001'});assert.equal(other.pending,true);
});
test('reload reconciles an uncertain debit once and restores cancellation safely',async()=>{
 const f=fixture();f.failWriteAfterDebit();await assert.rejects(f.create(),/write failed/);
 const restored=await f.service.call('m1',{action:'recover-create',requestId:'request_0000000001'});assert.ok(restored.roomId);assert.equal(f.balances.get('p1'),9900);assert.equal(f.changes.length,1);
 await f.service.call('m1',{action:'cancel',requestId:'request_0000000001'});
 const cancelled=await f.service.call('m1',{action:'recover-create',requestId:'request_0000000001'});assert.equal(cancelled.cancelled,true);assert.equal(f.balances.get('p1'),10000);
});

test('2000-chip participant reentry is identified and never debited twice',async()=>{
 const f=fixture(),host=await f.create(2000);await f.call('m2','join',host.roomId);const before=f.changes.length;for(const member of ['m1','m2']){const preview=await f.call(member,'preview',host.roomId);assert.equal(preview.participant,true);await f.call(member,'join',host.roomId);}assert.equal(f.changes.length,before);assert.equal(f.balances.get('p1'),8000);assert.equal(f.balances.get('p2'),8000);assert.equal((await f.call('m3','preview',host.roomId)).participant,false);
});
test('darts uses the same exactly-once stakes, whole-series surrender and draw refunds',async()=>{
 for(const draw of [false,true]){const f=fixture();let r=await f.service.call('m1',{action:'create',discipline:'darts',raceTo:3,stake:100,requestId:'darts_request_0001',equipment:{dartsBoard:'night',dartsDart:'red'}});r=await f.call('m2','join',r.roomId);assert.equal(r.equipment.dartsBoard,'night');if(draw){r=await f.call('m1','move',r.roomId,{revision:r.revision,move:{type:'draw-offer'}});r=await f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'draw-accept'}});assert.equal(r.wager.status,'refunded');assert.equal(f.balances.get('p1'),10000);assert.equal(f.balances.get('p2'),10000);}else{r=await f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'resign'}});assert.equal(r.match.winner,0);assert.equal(r.wager.status,'paid');assert.equal(f.balances.get('p1'),10090);assert.equal(f.balances.get('p2'),9900);}const count=f.changes.length;await f.call('m1','room',r.roomId);await f.service.sweep();assert.equal(f.changes.length,count);}
});

for(const [kind,multiplier] of [['single',1],['mars',1.5],['koks',2]])test('nards maximum escrow and '+kind+' settlement return unused funds once',async()=>{
 const f=fixture(),r=await f.service.call('m1',{action:'create',discipline:'long',stake:100,requestId:'multiplier_request_01',marsMultiplier:1.5,koksMultiplier:2});
 assert.equal(r.wager.reservedStake,200);assert.equal(f.balances.get('p1'),9800);
 const preview=await f.call('m2','preview',r.roomId);assert.equal(preview.wager.marsMultiplier,1.5);
 f.balances.set('p2',150);await assert.rejects(f.call('m2','join',r.roomId),/200 фишек/);assert.equal(f.rooms.get(r.roomId).players[1],null);f.balances.set('p2',10000);
 await f.call('m2','join',r.roomId,{marsMultiplier:10});assert.equal(f.balances.get('p2'),9800);
 const raw=f.rooms.get(r.roomId);raw.state.winner=0;raw.state.endReason='borne-off';raw.state.winKind=kind;raw.match.winner=0;
 const done=await f.call('m1','room',r.roomId);assert.equal(done.wager.status,'paid');assert.equal(done.wager.settledStake,100*multiplier);assert.equal(done.wager.payout,190*multiplier);
 assert.equal(f.balances.get('p1'),10000+90*multiplier);assert.equal(f.balances.get('p2'),10000-100*multiplier);
 const count=f.changes.length;await f.service.sweep();await f.call('m1','room',r.roomId);assert.equal(f.changes.length,count);
});
test('cancel returns all maximum escrow; invalid multipliers never debit',async()=>{
 const f=fixture();for(const v of ['2',0,11,Infinity,1.234])await assert.rejects(f.service.call('m1',{action:'create',discipline:'short',stake:100,requestId:'invalid_multiplier_01',koksMultiplier:v}));assert.equal(f.changes.length,0);
 const r=await f.service.call('m1',{action:'create',discipline:'short',stake:101,requestId:'cancel_multiplier_01',marsMultiplier:1.5});assert.equal(r.wager.reservedStake,152);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),10000);
});
test('maximum escrow checks host balance and cannot change on retry',async()=>{
 const f=fixture(),body={action:'create',discipline:'short',stake:100,requestId:'fixed_multiplier_0001',marsMultiplier:1.5,koksMultiplier:2};f.balances.set('p1',199);await assert.rejects(f.service.call('m1',body),/200 фишек/);assert.equal(f.changes.length,0);f.balances.set('p1',10000);await f.service.call('m1',body);await assert.rejects(f.service.call('m1',{...body,koksMultiplier:3}),/Параметры/);assert.equal(f.balances.get('p1'),9800);
});
test('lost unused-reserve checkpoint resumes without duplicate refunds or prize',async()=>{
 const f=fixture(),r=await f.service.call('m1',{action:'create',discipline:'short',stake:100,requestId:'resume_multiplier_01',marsMultiplier:1.5,koksMultiplier:2});await f.call('m2','join',r.roomId);
 const raw=f.rooms.get(r.roomId);raw.match.winner=0;raw.state.winner=0;raw.state.endReason='borne-off';raw.state.winKind='mars';f.failWriteAfterDebit();await assert.rejects(f.call('m1','room',r.roomId),/write failed/);await f.service.sweep();assert.equal(f.balances.get('p1'),10135);assert.equal(f.balances.get('p2'),9850);assert.equal(f.journals.get(r.roomId).status,'paid');
});
test('stakes use single transfers up to 5000 and retain retry amounts',async()=>{
 for(const [stake,parts] of [[2000,[-2000]],[5000,[-5000]],[7000,[-5000,-2000]]]){
  const f=fixture({chunkSize:5000});await f.create(stake);
  assert.deepEqual(f.changes.map(op=>op.chips),parts);
  await f.create(stake);assert.equal(f.changes.length,parts.length);
 }
 const f=fixture({chunkSize:5000});f.failWriteAfterDebit();
 await assert.rejects(f.create(2000),/write failed/);
 await f.create(2000);assert.deepEqual(f.changes.map(op=>op.chips),[-2000]);
});
