'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
test('board challenge uses only the room mode for rank and every counter',async()=>{
 const social=require('../lib/club-social'),stats=require('../lib/board-games-stats'),old=[social.memberProfile,stats.migrateLegacy];social.memberProfile=async()=>({level:29});stats.migrateLegacy=async()=>{};
 try{const standing=require('../lib/game-challenge-standing');for(const game of ['short','long','chess'])for(const mode of ['free','paid']){
 const commands=async rows=>{assert.deepEqual(rows,[['HGETALL',`poker_app:board-games:stats:v2:${game}:${mode}:players`]]);return [{ID111111:JSON.stringify(mode==='paid'?{wins:7,losses:2,draws:1}:{wins:1,losses:5}),ID222222:JSON.stringify({wins:4,losses:0})}];};
 const text=await standing({commands,game,mode,accountId:'ID111111'});assert.match(text,mode==='paid'?/Рейтинг: на фишки\nМесто в рейтинге: 1/:/Рейтинг: бесплатные\nМесто в рейтинге: 2/);assert.match(text,mode==='paid'?/10 \/ 7 \/ 2$/:/6 \/ 1 \/ 5$/);assert.match(text,/Уровень 29/);
 }}finally{[social.memberProfile,stats.migrateLegacy]=old;}
});
test('billiards separates saved paid and free results across both disciplines',async()=>{
 const social=require('../lib/club-social'),old=social.memberProfile;social.memberProfile=async()=>({level:76});
 try{const standing=require('../lib/game-challenge-standing');const result=(paid,winner)=>JSON.stringify({finishedAt:10,room:{wagered:paid,state:{winner},playerProfiles:[{accountId:'ID111111',name:'One'},{accountId:'ID222222',name:'Two'}]}});
 const commands=async()=>[{a:result(true,0),b:result(false,1)},{c:result(true,'draw')}];
 assert.match(await standing({commands,game:'billiards',mode:'paid',accountId:'ID111111'}),/Рейтинг: на фишки\nМесто в рейтинге: 1 · Уровень 76\nИгры\/победы\/поражения: 2 \/ 1 \/ 0$/);
 assert.match(await standing({commands,game:'billiards',mode:'free',accountId:'ID111111'}),/Рейтинг: бесплатные\nМесто в рейтинге: 2 · Уровень 76\nИгры\/победы\/поражения: 1 \/ 0 \/ 1$/);
 assert.match(await standing({commands,game:'billiards',mode:'paid',accountId:'ID333333'}),/пока нет завершённых партий.*\nИгры\/победы\/поражения: 0 \/ 0 \/ 0$/);
 assert.match(await standing({commands:async()=>{throw Error('offline');},game:'billiards',mode:'paid',accountId:'ID111111'}),/на фишки.*временно недоступен/);
 }finally{social.memberProfile=old;}
});
