"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { summarize } = require("../lib/tracking-link-summary");
const at = Date.parse("2026-09-30T10:00:00Z");
function row(overrides = {}) {
  return { accountId: "ID123456", status: "new", registrationAt: at,
    context: { first: { ref: "aaaaaaaa", at: at - 1000 } },
    events: [{ ref: "aaaaaaaa", at, type: "section_opened" }], deposits: [], ...overrides };
}
test("automatic views are not engagement; zero denominator has no conversion", () => {
  const result = summarize([row({ accountId: "", status: "guest" })], "aaaaaaaa", 0, "");
  assert.equal(result.visitors, 1);
  assert.equal(result.engaged, 0);
  assert.equal(result.registrations, 0);
  assert.equal(summarize([], "aaaaaaaa", 0, "").depositConversion, null);
});
test("period, verified acquisition, deposits and self exclusion share the same denominator", () => {
  const records = [row({ deposits: [{ at: new Date(at).toISOString(), amount: 500 }] }),
    row({ accountId: "ID654321", status: "returning", events: [{ ref: "aaaaaaaa", at, type: "sng_joined" }] }),
    row({ accountId: "ID111111", events: [{ ref: "aaaaaaaa", at: at - 86400000, type: "section_opened" }] }),
    row({ accountId: "ID222222", context: { first: { ref: "bbbbbbbb" } }, events: [{ ref: "aaaaaaaa", at, type: "section_opened" }] })];
  const result = summarize(records, "aaaaaaaa", at - 1000, "ID222222");
  assert.deepEqual(Object.fromEntries(["visitors","registrations","returning","depositors","firstDepositors","depositAmount","engaged","registrationConversion","depositConversion"].map(k=>[k,result[k]])), { visitors: 2, registrations: 1, returning: 1, depositors: 1, firstDepositors: 0, depositAmount: 500, engaged: 2, registrationConversion: 50, depositConversion: 50 });
  assert.equal(summarize(records, "aaaaaaaa", at + 1, "").visitors, 0);
  assert.equal(summarize([records[3]], "aaaaaaaa", 0, "").registrations, 0);
});
test("an unrelated campaign event cannot inflate the link's activity", () => {
  assert.equal(summarize([row({ events: [{ ref: "bbbbbbbb", at, type: "sng_joined" }] })], "aaaaaaaa", 0, "").visitors, 0);
});

test("first deposit excludes deposits made before acquisition", () => {
  const deposits = [{ at: new Date(at).toISOString(), amount: 500 }];
  assert.equal(summarize([row({ deposits, firstDepositAt: at })], "aaaaaaaa", 0, "").firstDepositors, 1);
  assert.equal(summarize([row({ deposits, firstDepositAt: at - 10000 })], "aaaaaaaa", 0, "").firstDepositors, 0);
});
test('aggregate distinguishes people from actions and unknown subscriptions from confirmed absence',()=>{const records=[row({pokerId:'7788',steps:{bot:true,playersChat:null},events:[{id:'v',type:'referral_opened',ref:'aaaaaaaa',at},{id:'s1',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at},{id:'s2',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at},{id:'r',type:'raffle_joined',authenticated:true,ref:'aaaaaaaa',at}],deposits:[{at:new Date(at).toISOString(),amount:100},{at:new Date(at).toISOString(),amount:300}]}),row({accountId:'ID654321',steps:{bot:false,playersChat:true},events:[{id:'s3',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at}]})];const data=summarize(records,'aaaaaaaa',0,'');assert.equal(data.visitors,2);assert.equal(data.spinners,2);assert.equal(data.spinCount,3);assert.equal(data.raffleParticipants,1);assert.equal(data.raffleCount,1);assert.equal(data.botSubscribers,1);assert.equal(data.playersChatSubscribers,1);assert.equal(data.playersChatUnknown,1);assert.equal(data.botUnknown,0);assert.equal(data.poker21Linked,1);assert.equal(data.depositCount,2);assert.equal(data.depositAmount,400);});
test('full summary loads every participant page, not only the first fifty cards',async()=>{const attribution=require('../lib/tracking-attribution'),milestones=require('../lib/tracking-link-milestones'),original={readJourneys:attribution.readJourneys,readTimeline:attribution.readTimeline,enrich:milestones.enrich,playersGroup:milestones.playersGroup},offsets=[];try{attribution.readJourneys=async(ref,offset)=>{offsets.push(offset);return {rows:Array.from({length:offset===0?50:1},(_,i)=>row({accountId:'ID'+(100000+offset+i)})),nextOffset:offset===0?50:null};};attribution.readTimeline=async()=>({events:[{id:'spin',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at}],cursor:null});milestones.playersGroup=async()=>'';milestones.enrich=async()=>({bot:null,playersChat:null});const data=await require('../lib/tracking-link-summary').readSummary('aaaaaaaa',0,'');assert.deepEqual(offsets,[0,50]);assert.equal(data.visitors,51);assert.equal(data.spinCount,51);assert.equal(data.spinners,51);assert.equal(data.botUnknown,51);}finally{Object.assign(attribution,{readJourneys:original.readJourneys,readTimeline:original.readTimeline});Object.assign(milestones,{enrich:original.enrich,playersGroup:original.playersGroup});}});

test('each aggregate equals its per-player matrix counts across retries, devices and other sources',()=>{
 const first=row({actor:'ID123456',events:[{id:'visit-a',type:'referral_opened',ref:'aaaaaaaa',at},{id:'spin-a',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at},{id:'spin-a',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at},{id:'raffle-device-a',type:'raffle_joined',section:'raffle-one',authenticated:true,ref:'aaaaaaaa',at},{id:'raffle-device-b',type:'raffle_joined',section:'raffle-one',authenticated:true,ref:'aaaaaaaa',at},{id:'other-source',type:'daily_poker_spin',authenticated:true,ref:'bbbbbbbb',at}],deposits:[{at:new Date(at).toISOString(),amount:120.5}]}),second=row({actor:'ID654321',accountId:'ID654321',events:[{id:'visit-b',type:'referral_opened',ref:'aaaaaaaa',at},{id:'section',type:'section_opened',ref:'aaaaaaaa',at},{id:'spin-b',type:'daily_poker_spin',authenticated:true,ref:'aaaaaaaa',at}],deposits:[{at:new Date(at).toISOString(),amount:79.5}]});
 const data=summarize([first,second],'aaaaaaaa',0,'');assert.equal(data.visitors,2);assert.equal(data.visits,2);assert.equal(data.activityCount,5);assert.equal(data.spinCount,2);assert.equal(data.raffleCount,1);assert.equal(data.depositAmount,200);assert.equal(data.depositCount,2);
});

test('confirmed payment ledger replaces manual CRM duplicates and preserves unknown payment status',()=>{
 const verified=row({deposits:[{at:new Date(at).toISOString(),amount:9999}],paymentDepositsAvailable:true,paymentDeposits:[{id:'payment',at:new Date(at).toISOString(),amount:120.5}],paymentFirstDepositAt:at-10000});
 const data=summarize([verified],'aaaaaaaa',0,'');assert.equal(data.depositAmount,120.5);assert.equal(data.depositCount,1);assert.equal(data.firstDepositors,0);
 const flags=require('../lib/tracking-link-milestones').eventFlags(verified.events,verified,'aaaaaaaa');assert.equal(flags.depositAmount,120.5);assert.equal(flags.depositCount,1);
 const unknown=row({paymentDepositsAvailable:false,paymentDeposits:[]});const unavailable=summarize([unknown],'aaaaaaaa',0,'');assert.equal(unavailable.depositAmount,null);assert.equal(unavailable.depositCount,null);assert.equal(unavailable.depositUnknown,1);assert.equal(require('../lib/tracking-link-milestones').eventFlags(unknown.events,unknown,'aaaaaaaa').depositAmount,null);
});

test('active visitor aggregate counts people who opened two distinct sections, independently of action totals',()=>{
 const event=(id,section,extra={})=>({id,type:'section_opened',section,ref:'aaaaaaaa',at,...extra});
 const records=[row({events:[event('home','home'),event('repeat','home')]}),row({accountId:'ID654321',events:[event('home2','home'),event('rating','rating')]}),row({accountId:'ID111111',events:[{id:'spin',type:'daily_poker_spin',ref:'aaaaaaaa',at,authenticated:true}]})];
 const data=summarize(records,'aaaaaaaa',0,'');assert.equal(data.activeVisitors,1);assert.equal(data.visitors,3);assert.equal(data.activityCount,5);assert.equal(data.spinCount,1);
 const period=row({events:[event('old','home',{at:at-10000}),event('current','rating')]});
 assert.equal(summarize([period],'aaaaaaaa',at-1000,'').activeVisitors,0);
});

test('pinned report uses exactly the rows and bonus awards used for its first summary',async()=>{
 const snapshot=require('../lib/tracking-link-snapshot'),store=require('../lib/tracking-link-report-store'),welcome=require('../lib/welcome-bonus'),coverage=require('../lib/tracking-link-coverage');
 const originals={snapshot:snapshot.readLinkSnapshot,save:store.save,bonus:welcome.trackingReport,coverage:coverage.readCoverage};
 const records=[row({actor:'ID123456',steps:{bot:true,playersChat:null},paymentDepositsAvailable:true,paymentDeposits:[{id:'p',at:new Date(at).toISOString(),amount:120.5}]}),row({actor:'ID654321',accountId:'ID654321',steps:{bot:false,playersChat:true},paymentDepositsAvailable:true,paymentDeposits:[]})];
 let loads=0,saved;
 try{
  snapshot.readLinkSnapshot=async()=>{loads++;return records;};
  coverage.readCoverage=async()=>({trackedVisitors:2,visitorsWithoutJourney:0});
  welcome.trackingReport=async(rows,ref,from,excluded,includePlayers)=>{assert.equal(rows,records);assert.equal(includePlayers,true);return {recipients:1,counts:{register:1},playerBonuses:{ID123456:{steps:['register'],undated:0}}};};
  store.save=async(ref,rows)=>{saved=JSON.parse(JSON.stringify(rows));return 'pinned';};
  const result=await require('../lib/tracking-link-summary').readReport('aaaaaaaa',0,'');
  assert.equal(loads,1);assert.equal(result.reportToken,'pinned');
  assert.equal(result.summary.depositAmount,saved.reduce((sum,r)=>sum+r.paymentDeposits.reduce((s,d)=>s+d.amount,0),0));
  assert.equal(result.summary.botSubscribers,saved.filter(r=>r.steps.bot===true).length);
  assert.equal(result.summary.playersChatUnknown,saved.filter(r=>r.steps.playersChat==null).length);
  assert.equal(result.summary.welcomeBonus.recipients,saved.filter(r=>r.welcomeBonus).length);
  assert.equal('playerBonuses' in result.summary.welcomeBonus,false);
 }finally{snapshot.readLinkSnapshot=originals.snapshot;store.save=originals.save;welcome.trackingReport=originals.bonus;coverage.readCoverage=originals.coverage;}
});
