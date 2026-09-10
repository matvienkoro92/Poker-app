'use strict';
const crypto=require('node:crypto');
const lessons=require('./hero-lessons');
const catalog=require('../hero-catalog');
const {redis}=require('./club-social');
const {PROFILE_HASH_KEY,BIND_HASH_KEY}=require('./pokerplus');
const {pokerProfileStatusFromCachedProfile}=require('./chat-profile-status');
const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
function fresh(){return {version:0,highestLevel:1,skills:{},equipped:{},inventory:[],claimedLevel:0,lastAdventure:'',dust:0,recent:[]};}
function parse(raw){if(!raw)return fresh();try{const s=JSON.parse(raw);if(s&&Array.isArray(s.inventory)&&s.skills&&s.equipped)return {...fresh(),...s};}catch(_){}fail('Не удалось прочитать героя',503);}
function levelOf(profile,bound){return Math.max(1,Math.min(100,Number(pokerProfileStatusFromCachedProfile(profile,{pokerPlusLinked:!!bound}).level)||1));}
function stats(state){const result={power:5,guard:5,discovery:0};const sets={};catalog.skills.forEach(s=>result[s.stat]+=(state.skills[s.id]||0)*s.gain);Object.values(state.equipped).forEach(id=>{const item=state.inventory.find(i=>i.id===id);if(!item)return;const set=catalog.sets.find(s=>s.id===item.set);const rarity=catalog.rarities[item.rarity];if(!set||!rarity)return;result[set.stat]+=rarity.bonus+Math.floor(item.level/10);sets[set.id]=(sets[set.id]||0)+1;});catalog.sets.forEach(set=>{const n=sets[set.id]||0;if(n>=3)result[set.stat]+=5;if(n>=6)result[set.stat]+=10;});return {...result,sets};}
function spent(state){return Object.values(state.skills).reduce((sum,n)=>sum+(Number(n)||0),0);}
function routeSkill(route){return {trail:'strike',ruins:'bastion',citadel:'mastery'}[route];}
function view(state,level,privateView=true,now=Date.now()){
  level=Math.max(level,state.highestLevel);const result={version:state.version,level,skills:state.skills,equippedItems:Object.values(state.equipped).map(id=>state.inventory.find(i=>i.id===id)).filter(Boolean),stats:stats(state)};
  if(privateView)Object.assign(result,{points:Math.max(0,level-1-spent(state)),inventory:state.inventory,dust:state.dust,chests:Math.max(0,level-state.claimedLevel),adventureAvailable:state.lastAdventure!==new Date(now+10800000).toISOString().slice(0,10),nextAdventureAt:new Date(Math.floor((now+10800000)/86400000)*86400000+86400000-10800000).toISOString()});
  if(privateView){result.lessons={};catalog.skills.forEach(s=>result.lessons[s.id]=lessons.publicLesson(s.id,state.skills[s.id]||0));result.challenges={};catalog.expeditions.forEach(r=>result.challenges[r.id]=lessons.publicLesson(routeSkill(r.id),Math.floor((now+10800000)/86400000)));result.practice=state.practice||0;result.feedback=state.feedback||'';}
  return result;
}
function loot(state,level,quality,roll,slot){
  const adjusted=Math.min(99,roll[0]+Math.min(15,Math.floor(stats(state).discovery/5)));
  const rarity=Math.max(quality,adjusted>=98?4:adjusted>=90?3:adjusted>=65?2:adjusted>=35?1:0);
  const index=slot?catalog.slots.findIndex(s=>s.id===slot):roll[1]%catalog.slots.length;
  return {id:crypto.randomUUID(),slot:catalog.slots[index].id,set:catalog.sets[roll[2]%catalog.sets.length].id,rarity,level};
}
function mutate(current,level,body,now=Date.now(),roll=[crypto.randomInt(100),crypto.randomInt(6),crypto.randomInt(3)]){
  const state=JSON.parse(JSON.stringify(current));state.highestLevel=Math.max(state.highestLevel,level);level=state.highestLevel;
  const action=body.action;
  if(action==='train'){
    const skill=catalog.skills.find(s=>s.id===body.skill);if(!skill)fail('Неизвестный навык');
    if(spent(state)>=level-1)fail('Нет свободных очков навыков');
    if(level<skill.level||(skill.requires&&(state.skills[skill.requires]||0)<5))fail('Сначала откройте предыдущий навык до 5 ранга и достигните нужного уровня');
    if((state.skills[skill.id]||0)>=skill.max)fail('Навык уже развит до максимума');state.feedback=lessons.check(skill.id,state.skills[skill.id]||0,body);state.practice=(state.practice||0)+1;state.skills[skill.id]=(state.skills[skill.id]||0)+1;
  }else if(action==='reset'){state.skills={};
  }else if(action==='equip'){
    const item=state.inventory.find(i=>i.id===body.item);if(!item)fail('Предмет не найден в вашем рюкзаке');state.equipped[item.slot]=item.id;
  }else if(action==='unequip'){
    if(!catalog.slots.some(s=>s.id===body.slot))fail('Неизвестный слот');delete state.equipped[body.slot];
  }else if(action==='salvage'){
    const item=state.inventory.find(i=>i.id===body.item);if(!item)fail('Предмет не найден');if(Object.values(state.equipped).includes(item.id))fail('Сначала снимите предмет');state.inventory=state.inventory.filter(i=>i.id!==item.id);state.dust+=catalog.rarities[item.rarity].bonus;
  }else if(['chest','adventure','craft'].includes(action)){
    if(state.inventory.length>=200)fail('Рюкзак полон. Разберите ненужные вещи');let quality=0,slot;
    if(action==='chest'){if(state.claimedLevel>=level)fail('Все награды за уровни уже получены');state.claimedLevel++;}
    if(action==='adventure'){
      const day=new Date(now+10800000).toISOString().slice(0,10);if(state.lastAdventure===day)fail('Сегодня вы уже забрали добычу');
      const route=catalog.expeditions.find(e=>e.id===body.route);if(!route)fail('Выберите приключение');const attributes=stats(state);if(attributes.power<route.power||attributes.guard<route.guard)fail('Для этого пути нужно больше техники и дисциплины героя');state.feedback=lessons.check(routeSkill(route.id),Math.floor((now+10800000)/86400000),body);state.practice=(state.practice||0)+1;quality=route.quality;state.lastAdventure=day;
    }
    if(action==='craft'){if(state.dust<20)fail('Нужно 20 осколков');if(!catalog.slots.some(s=>s.id===body.slot))fail('Выберите слот');state.dust-=20;quality=1;slot=body.slot;}
    const item=loot(state,level,quality,roll,slot);state.inventory.push(item);state.lastLoot=item.id;
  }else fail('Неизвестное действие');
  state.version++;state.recent=[...(state.recent||[]),body.requestId].slice(-40);return state;
}
async function load(accountId){const [raw,profile,bound]=await redis([['GET','poker_app:profile_hero:'+accountId],['HGET',PROFILE_HASH_KEY,accountId],['HGET',BIND_HASH_KEY,accountId]]);let p={};try{p=JSON.parse(profile||'{}');}catch(_){}return {raw,state:parse(raw),level:levelOf(p,bound)};}
function heroEnabled(accountId){return accountId==='ID400800';}
async function readHero(accountId,privateView=true){if(!heroEnabled(accountId))return null;const d=await load(accountId);return view(d.state,d.level,privateView);}
async function updateHero(accountId,body){
  if(!heroEnabled(accountId))fail('Герой пока недоступен для этого аккаунта',403);
  if(typeof body.requestId!=='string'||!/^[-a-zA-Z0-9]{12,80}$/.test(body.requestId))fail('Обновите редактор и повторите');
  const data=await load(accountId);if(data.state.recent.includes(body.requestId))return view(data.state,data.level);
  if(!Number.isInteger(body.version)||body.version!==data.state.version)fail('Герой изменился в другой вкладке. Обновите его и повторите',409);
  const state=mutate(data.state,data.level,body);
  const script="local old=redis.call('GET',KEYS[1]); if (old or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
  const [saved]=await redis([['EVAL',script,1,'poker_app:profile_hero:'+accountId,data.raw||'',JSON.stringify(state)]]);
  if(Number(saved)!==1)fail('Герой изменился в другой вкладке. Обновите его и повторите',409);
  return view(state,data.level);
}
module.exports={heroEnabled,fresh,parse,levelOf,stats,view,mutate,readHero,updateHero};
