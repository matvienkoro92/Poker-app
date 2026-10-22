'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {hasBilliardsAccess}=require('../lib/billiards-access');
test('billiards is open to all authenticated players across identity providers',()=>{
 for(const [identity,member]of [[{telegramId:123},'123'],[{telegramUsername:'ordinary_player'},'456'],[{pwaUsername:'new_player'},'pwa_123'],[{vkId:789},'vk_789']])assert.equal(hasBilliardsAccess(identity,member),true);
});
test('missing authentication and guest accounts do not unlock multiplayer',()=>{
 for(const args of [[null,'123'],[{},null],[{},''],[{},'guest_123']])assert.equal(hasBilliardsAccess(...args),false);
});
