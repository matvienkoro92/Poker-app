'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
test('challenge standing matches combined chat ranking, includes level and handles unranked players',async()=>{
 const social=require('../lib/club-social'),old=social.memberProfile;
 social.memberProfile=async()=>({level:76});
 try{
 const standing=require('../lib/game-challenge-standing');
 const commands=async()=>[{ID111111:JSON.stringify({wins:3,losses:0}),ID222222:JSON.stringify({wins:2,losses:1})},{ID222222:JSON.stringify({wins:2,losses:0})}];
 assert.equal(await standing({commands,game:'billiards',accountId:'ID111111'}),'🏆 Место в рейтинге: 2 · Уровень 76\nИгры/победы/поражения: 3 / 3 / 0');
 assert.match(await standing({commands,game:'billiards',accountId:'ID333333'}),/пока нет завершённых партий · Уровень 76\nИгры\/победы\/поражения: 0 \/ 0 \/ 0/);
 assert.match(await standing({commands:async()=>{throw Error('offline');},game:'billiards',accountId:'ID111111'}),/временно недоступно/);
 }finally{social.memberProfile=old;}
});
