const test=require('node:test'),assert=require('node:assert/strict');
const {notifyProfileComment}=require('../lib/profile-comment-notify');
const comment={id:'comment1',memberId:'ID111111',author:'ПокерМанки',text:'Отлично!'};
function harness(profiles={}){const sent=[];return {sent,deps:{resolveAccountId:async id=>id==='tg_123'?'ID222222':id,hscanall:async()=>profiles,send:async(id,payload)=>sent.push({id,payload})}};}
test('comments on level news and wall posts notify their owner with a stable image-free push',async()=>{
 const h=harness();
 for(const id of ['level:ID222222:85:89','club-level:ID222222:85:89:2026-09-11','wall:tg_123:post1'])await notifyProfileComment(id,comment,h.deps);
 assert.equal(h.sent.length,3);assert.ok(h.sent.every(x=>x.id==='ID222222'));
 assert.match(h.sent[0].payload.body,/ПокерМанки: Отлично/);
 assert.match(h.sent[0].payload.openUrl,/player_profile_ID222222&profile_event=/);
 assert.match(h.sent[0].payload.dedupeKey,/comment1/);
});
test('self comments and ambiguous player nicknames do not send pushes',async()=>{
 const h=harness({'ID222222':JSON.stringify({nickname:'Waaar'}),'ID333333':JSON.stringify({nickname:'Waaar'})});
 await notifyProfileComment('wall:ID111111:post1',comment,h.deps);
 await notifyProfileComment('history:tournament:rating:waaar:11.09.2026:1:100',comment,h.deps);
 assert.equal(h.sent.length,0);
});
test('tournament news resolves a unique nickname on the server',async()=>{
 const h=harness({'ID222222':JSON.stringify({nickname:'Waaar'})});
 await notifyProfileComment('history:tournament:rating:waaar:11.09.2026:1:100',comment,h.deps);
 assert.equal(h.sent[0].id,'ID222222');
});
