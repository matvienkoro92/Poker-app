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
