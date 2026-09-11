'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {memories}=require('../lib/hero-memories'),H=require('../lib/profile-hero');
const self={userId:'ID400800',nick:'ПокерМанки'},friend={userId:'ID403173',nick:'Waaarr'},now=Date.parse('2026-09-11T00:00:00Z');
const row=(nick,extra={})=>({nick,tournamentId:'event-one',tournament:'Big Boss',date:'2026-09-09T12:00:00',place:1,reward:100,...extra});
test('exact tournament, verified roster and explicit nickname aliases produce stable shared memories',()=>{
 const rows=[row('Романдий'),row('Waaar',{place:3,reward:50})];const a=memories(self,[friend],rows,now);assert.equal(a.length,2);const shared=a.find(a=>a.history.kind==='shared-tournament');assert.deepEqual(shared.history.results.map(r=>r.place),[1,3]);assert.equal(shared.history.results[1].accountId,friend.userId);assert.equal(memories(self,[friend],rows.slice().reverse(),now).find(a=>a.history.kind==='shared-tournament').id,shared.id);
 assert.equal(memories(self,[],rows,now).length,1);assert.equal(memories(self,[friend,{userId:'ID999',nick:'Waaar'}],rows,now).length,1);assert.equal(memories(self,[friend],[rows[0],{...rows[1],tournamentId:'other'}],now).length,1);
});
test('invalid, future, zero, conflicting results and unbound identity never earn a trophy',()=>{
 assert.deepEqual(memories(null,[friend],[row('ПокерМанки')],now),[]);
 for(const extra of [{place:0},{place:1.5},{reward:0},{reward:NaN},{date:'bad'},{date:'2027-01-01T00:00:00'}])assert.deepEqual(memories(self,[],[row(self.nick,extra)],now),[]);
 assert.deepEqual(memories(self,[],[row(self.nick),row(self.nick,{place:2})],now),[]);
 assert.equal(memories(self,[],[row(self.nick),row(self.nick)],now).length,1);
});
test('claim snapshots only server history, cannot duplicate, preserves it after friendship/result removal',()=>{
 let s={...H.fresh(),inventory:[]};s.trophyCatalog=memories(self,[friend],[row(self.nick),row('Waaar',{place:3})],now);const award=s.trophyCatalog.find(a=>a.history.kind==='shared-tournament');s=H.mutate(s,71,{action:'claim-trophy',award:award.id,history:{tournament:'forged'},requestId:'history-request-001'},now);const i=s.inventory[0];assert.equal(i.history.tournament,'Big Boss');assert.equal(i.history.results.length,2);assert.throws(()=>H.mutate(s,71,{action:'claim-trophy',award:award.id}),/уже в коллекции/);s.trophyCatalog=[];assert.deepEqual(H.view(H.parse(JSON.stringify(s)),71).inventory[0].history,i.history);
});
test('published PokerManki and Waaar Big Boss result is eligible without hardcoded nickname award',()=>{
 const a=memories(self,[friend],[row(self.nick,{tournamentId:'09.09.2026|18:00|💥Big Boss 💥|3',reward:73198.45}),row('Waaar',{tournamentId:'09.09.2026|18:00|💥Big Boss 💥|3',place:3,reward:9768.75})],now);const shared=a.find(a=>a.history.kind==='shared-tournament'&&a.history.date.startsWith('2026-09-09')&&a.history.tournament.includes('Big Boss'));assert.ok(shared);assert.deepEqual(shared.history.results.map(r=>r.place),[1,3]);
});
