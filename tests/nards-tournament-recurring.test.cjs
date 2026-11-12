'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const recurring=require('../lib/nards-tournament-recurring'),fixture=require('./helpers/nards-tournament-fixture.cjs');
const at=s=>Date.parse(s+'+03:00'),template={id:'template',title:'Кубок двух тузов',capacity:32,discipline:'long',variant:'classic',turnSeconds:45,roundTargets:[1,1,1,1,1],prizeAmounts:[1000,300]},config={enabled:true};
function plan(time,tournaments=[]){return recurring.plan({config,template,tournaments,time:at(time)});}
test('Moscow cycle opens night at 14:05 and next day at 00:05, never both registrations',()=>{
 assert.equal(plan('2026-11-12T14:04:59'),null);
 const night=plan('2026-11-12T14:05:00');assert.equal(night.kind,'night');assert.equal(night.startsAt,at('2026-11-13T00:00:00'));
 assert.equal(plan('2026-11-12T18:00:00',[{recurring:{key:night.key}}]),null);
 assert.equal(plan('2026-11-13T00:04:59'),null);
 const day=plan('2026-11-13T00:05:00');assert.equal(day.kind,'day');assert.equal(day.startsAt,at('2026-11-13T14:00:00'));
 assert.deepEqual(recurring.body(template,night).prizeAmounts,[500]);assert.deepEqual(recurring.body(template,day).prizeAmounts,[1000,300]);
});
test('late start waits five minutes after chat announcement; existing manual events are adopted',()=>{
 const prior={title:template.title,startsAt:at('2026-11-12T14:00:00'),status:'running',notices:{start:{sent:true,sentAt:at('2026-11-12T14:02:00')}}};
 assert.equal(plan('2026-11-12T14:06:59',[prior]),null);assert.equal(plan('2026-11-12T14:07:00',[prior]).kind,'night');
 prior.notices.start.sent=false;assert.equal(plan('2026-11-12T15:00:00',[prior]),null);
 prior.status='drawn';assert.equal(plan('2026-11-12T15:00:00',[prior]),null);
 const next={title:'Ночной кубок двух тузов',startsAt:at('2026-11-13T00:00:00'),status:'registration'};
 assert.equal(plan('2026-11-12T18:00:00',[next]),null);
});
test('disabled schedule does nothing and downtime never creates already expired starts',()=>{
 assert.equal(recurring.plan({config:{enabled:false},template,tournaments:[],time:at('2026-11-12T18:00:00')}),null);
 const slot=plan('2026-11-15T18:00:00');assert.equal(slot.startsAt,at('2026-11-16T00:00:00'));
});
test('cron creates one night event with original owner/equipment and normal full chat announcement',async()=>{
 let settings;const messages=[],f=fixture({recurringConfig:async()=>settings,notify:async p=>messages.push(p)});
 f.time(at('2026-11-12T13:00:00'));
 const t=await f.create({startsAt:at('2026-11-12T14:00:00'),drawAt:at('2026-11-12T14:00:00'),capacity:32,roundTargets:[1,1,1,1,1],entryType:'free',prizeKind:'tickets',prizeMode:'fixed',prizeAmounts:[1000,300]});
 const prior=f.tournaments.get(t.id);prior.status='cancelled';prior.paymentsSettled=true;
 settings={enabled:true,templateId:t.id};messages.length=0;
 f.time(at('2026-11-12T14:04:59'));assert.equal((await f.service.sweep()).recurringCreated,null);
 f.time(at('2026-11-12T14:05:00'));await Promise.all([f.service.sweep(),f.service.sweep()]);
 const night=[...f.tournaments.values()].find(x=>x.recurring);
 assert.equal(night.startsAt,at('2026-11-13T00:00:00'));assert.deepEqual(night.prizeAmounts,[500]);assert.deepEqual(night.owner,prior.owner);assert.deepEqual(night.equipment,prior.equipment);
 assert.equal(messages.length,1);assert.match(messages[0].text,/Открыта регистрация/);assert.match(messages[0].text,/00:00 МСК/);assert.match(messages[0].text,/500 ₽/);assert.match(messages[0].text,/Мест: 32/);assert.ok(messages[0].reply_markup);
 await f.service.sweep();assert.equal(messages.length,1);assert.equal(f.tournaments.size,2);
 // Empty night cancels at midnight; the cycle still opens the next daily event.
 f.time(at('2026-11-13T00:00:00'));await f.service.sweep();
 f.time(at('2026-11-13T00:05:00'));await f.service.sweep();
 const day=[...f.tournaments.values()].find(x=>x.recurring?.kind==='day');assert.ok(day);assert.deepEqual(day.prizeAmounts,[1000,300]);assert.equal(day.startsAt,at('2026-11-13T14:00:00'));
});
