'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {hasMaxLevel}=require('../lib/admin-player-level');
const {pokerProfileStatusFromCachedProfile:status}=require('../lib/chat-profile-status');
const G=require('../app-garage-catalog');
test('Anna and Vika receive level 100 without changing tournament counters',()=>{
 for(const id of ['2144406710','tg_2144406710','1897001087','tg_1897001087']){
  assert.equal(hasMaxLevel(id),true);const s=status({totalCounter:{fee:20}},{accountId:id,pokerPlusLinked:false});assert.equal(s.level,100);assert.equal(s.valuePercent,100);assert.equal(s.counters.fee,20);
  assert.ok(G.catalog({level:s.level}).filter(i=>i.metric==='level').every(i=>i.unlocked));
 }
 for(const id of ['388008256','123','vk_2144406710','guest_1897001087']){assert.equal(hasMaxLevel(id),false);assert.equal(status({}, {accountId:id,pokerPlusLinked:false}).level,1);}
});
