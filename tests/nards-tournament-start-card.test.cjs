'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),notifications=require('../lib/nards-tournament-notifications');
function tournament(amount,title){return {title,status:'running',id:'ABCDEFGHJK',startsAt:Date.parse('2026-11-13T00:00:00+03:00'),entries:Array.from({length:32},(_,i)=>({id:String(i),name:'Участник '+i+' '+('я'.repeat(70)),accountId:'private'})),capacity:32,discipline:'long',entryType:'free',prizeKind:'tickets',prizeAmounts:amount};}
test('start cards carry the correct tournament title and prizes without private player IDs',()=>{
 for(const [prizes,title]of [[[500],'Ночной кубок'],[[1000,300],'Кубок двух тузов']]){
  const payload=notifications.message(tournament(prizes,title),'start');assert.equal(payload.card.title,title);assert.deepEqual(payload.card.prizeAmounts,prizes);assert.ok(payload.reply_markup);assert.equal(JSON.stringify(payload.card).includes('private'),false);
 }
});
test('start sends one photo with bounded caption and tournament button, other events stay text',async t=>{
 const policy=require('../lib/telegram-group-policy'),milestones=require('../lib/tracking-link-milestones'),art=require('../lib/nards-tournament-card-art');
 const original=[policy.guardedFetch,milestones.playersGroup,art.render],sends=[];
 t.after(()=>{[policy.guardedFetch,milestones.playersGroup,art.render]=original;});
 milestones.playersGroup=async()=>'-123';art.render=async()=>Buffer.from('jpeg');policy.guardedFetch=async(url,options,scope)=>{sends.push({url,options,scope});return {ok:true,json:async()=>({ok:true})};};
 await notifications.send(notifications.message(tournament([500],'Ночной кубок'),'start'),'test');
 assert.equal(sends.length,1);assert.match(sends[0].url,/sendPhoto$/);assert.equal(sends[0].scope,'nards-tournament-start');assert.ok(sends[0].options.body.get('caption').length<=1024);assert.ok(sends[0].options.body.get('reply_markup'));assert.ok(sends[0].options.body.get('photo'));
 await notifications.send({text:'Другой сценарий'},'test');assert.match(sends[1].url,/sendMessage$/);
});
