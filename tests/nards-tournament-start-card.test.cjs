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

test('start falls back to text when rendering or Telegram photo delivery fails',async t=>{
 const policy=require('../lib/telegram-group-policy'),milestones=require('../lib/tracking-link-milestones'),art=require('../lib/nards-tournament-card-art');
 const original=[policy.guardedFetch,milestones.playersGroup,art.render];
 t.after(()=>{[policy.guardedFetch,milestones.playersGroup,art.render]=original;});
 milestones.playersGroup=async()=>'-123';
 for(const renderFails of [true,false]){
  const sends=[];
  art.render=async()=>{if(renderFails)throw Error('Font unavailable');return Buffer.from('jpeg');};
  policy.guardedFetch=async(url,options,scope)=>{sends.push({url,options,scope});return url.endsWith('/sendPhoto')?{ok:false,status:400,json:async()=>({ok:false,description:'Invalid photo'})}:{ok:true,json:async()=>({ok:true})};};
  const payload=notifications.message(tournament([500],'Ночной кубок'),'start');
  await notifications.send(payload,'test');
  assert.equal(sends.length,renderFails?1:2);
  const last=sends.at(-1),body=JSON.parse(last.options.body);
  assert.match(last.url,/sendMessage$/);assert.equal(last.scope,'nards-tournament');
  assert.equal(body.text,payload.text);assert.deepEqual(body.reply_markup,payload.reply_markup);assert.equal('card' in body,false);
 }
});

test('daily start and 30-minute group reminder send the approved banner bytes',async t=>{
 const policy=require('../lib/telegram-group-policy'),milestones=require('../lib/tracking-link-milestones'),art=require('../lib/nards-tournament-card-art');
 const original=[policy.guardedFetch,milestones.playersGroup,art.render],sends=[];
 t.after(()=>{[policy.guardedFetch,milestones.playersGroup,art.render]=original;});
 milestones.playersGroup=async()=>'-123';
 art.render=async()=>{throw Error('Daily banner must not be regenerated');};
 policy.guardedFetch=async(url,options,scope)=>{sends.push({url,options,scope});return {ok:true,json:async()=>({ok:true})};};
 const daily={...tournament([1000,300],'Кубок двух тузов'),recurring:{kind:'day'}};
 const expected=require('node:fs').readFileSync(require('node:path').join(__dirname,'../assets/board-games/nards/freeroll-day-1000-300.png'));
 for(const event of ['start','freerollReminder']){
  const payload=notifications.message(daily,event,daily.startsAt-30*60000);
  assert.equal(payload.card.dailyBanner,true);
  await notifications.send(payload,'test');
  const sent=sends.at(-1);assert.match(sent.url,/sendPhoto$/);
  assert.deepEqual(Buffer.from(await sent.options.body.get('photo').arrayBuffer()),expected);
  assert.ok(sent.options.body.get('reply_markup'));
 }
 assert.match(sends[1].options.body.get('caption'),/полчаса/);
 assert.equal(notifications.message(daily,'before-start').card,undefined);
 for(const other of [{...daily,recurring:{kind:'night'},prizeAmounts:[700]},{...daily,prizeAmounts:[2000,300]},{...daily,entryType:'chips'}]){
  assert.equal(notifications.message(other,'start').card.dailyBanner,undefined);
  assert.equal(notifications.message(other,'freerollReminder').card,undefined);
 }
});


test('night start and group reminder use the saved 500-ruble ticket banner',async t=>{
 const policy=require('../lib/telegram-group-policy'),milestones=require('../lib/tracking-link-milestones'),art=require('../lib/nards-tournament-card-art');
 const original=[policy.guardedFetch,milestones.playersGroup,art.render];
 t.after(()=>{[policy.guardedFetch,milestones.playersGroup,art.render]=original;});
 milestones.playersGroup=async()=>'-123';
 art.render=async()=>{throw Error('Night banner must not be regenerated');};
 const expected=require('node:fs').readFileSync(require('node:path').join(__dirname,'../assets/board-games/nards/freeroll-night-500.png'));
 let sends=0;
 policy.guardedFetch=async(url,options)=>{
  sends++;assert.match(url,/sendPhoto$/);
  assert.deepEqual(Buffer.from(await options.body.get('photo').arrayBuffer()),expected);
  assert.ok(options.body.get('reply_markup'));
  return {ok:true,json:async()=>({ok:true})};
 };
 const night={...tournament([500],'Ночной кубок двух тузов'),recurring:{kind:'night'}};
 for(const event of ['start','freerollReminder']){
  const payload=notifications.message(night,event,night.startsAt-30*60000);
  assert.equal(payload.card.nightBanner,true);assert.equal(payload.card.dailyBanner,undefined);
  await notifications.send(payload,'test');
  assert.equal(notifications.message({...night,prizeAmounts:[1000]},event).card?.nightBanner,undefined);
 }
 assert.equal(sends,2);
 assert.equal(notifications.message(night,'before-start').card,undefined);
});
