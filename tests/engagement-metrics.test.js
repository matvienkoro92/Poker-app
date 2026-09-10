'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {calculateEngagement,monday}=require('../lib/engagement-metrics');
const at=s=>Date.parse(s+'T00:00:00+03:00'),DAY=86400000;
test('Moscow Monday boundaries and complete weekly return, not first-user D7',()=>{
 assert.equal(monday(at('2026-09-07')),at('2026-09-07'));
 assert.equal(monday(at('2026-09-07')-1),at('2026-08-31'));
 const visits=[['a','2026-08-17'],['b','2026-08-18'],['a','2026-08-24'],['a','2026-08-25'],['c','2026-08-24']].map(([accountId,d])=>({accountId,at:at(d)}));
 const d=calculateEngagement(visits,[],{from:at('2026-08-17'),to:at('2026-09-01'),now:at('2026-09-01')});
 assert.equal(d.cohorts[0].rate,50);assert.equal(d.cohorts[0].active,2);assert.equal(d.cohorts[1].rate,null);assert.equal(d.instrumentedSince,null);
 assert.equal(calculateEngagement(visits,[],{from:at('2026-08-18'),to:at('2026-09-01'),now:at('2026-09-01')}).cohorts[0].eligible,false);
});
test('funnels sort input, require matching actor and content, deduplicate and wait for maturity',()=>{
 const start=at('2026-08-17'),event=(type,t,entity='item1',accountId='a')=>({type,at:start+t,entity,accountId});
 const events=[event('news_read',DAY),event('news_shared',DAY/2),event('news_read',0),event('news_shared',1,'item2'),event('news_comment_created',1,'item1','b'),event('push_opened',9*DAY)];
 const d=calculateEngagement([],events,{from:start,to:start+9.5*DAY,now:start+9.5*DAY});
 assert.deepEqual(d.newsToInteraction,{eligible:1,converted:1,rate:100});assert.equal(d.pushToAnswerRead.eligible,0);
 assert.equal(calculateEngagement([],events.filter(e=>e.type!=='news_shared'),{from:start,to:start+10*DAY,now:start+10*DAY}).newsToInteraction.converted,0);
});
test('summary requires same session and mature ten minute observation',()=>{
 const start=at('2026-08-17');const e=(type,t,session,target,section)=>({accountId:'a',type,at:start+t,session,target,section});
 const d=calculateEngagement([],[e('summary_action',0,'s','profile'),e('section_opened',10,'other',null,'profile'),e('summary_action',590000,'s','profile')],{from:start,to:start+600000,now:start+600000});
 assert.equal(d.summaryNavigation.clicks,1);assert.equal(d.summaryNavigation.reached,0);
});
