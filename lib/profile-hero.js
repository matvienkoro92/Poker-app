'use strict';
const crypto=require('node:crypto');
const catalog=require('../hero-catalog');
const {redis}=require('./club-social');
const {PROFILE_HASH_KEY,BIND_HASH_KEY}=require('./pokerplus');
const {pokerProfileStatusFromCachedProfile}=require('./chat-profile-status');
const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
const DAY=86400000;
const dayOf=now=>new Date(now+10800000).toISOString().slice(0,10);
function fresh(){return {schema:3,version:0,highestLevel:1,skills:{},equipped:{},inventory:[],claimedLevel:0,lastAdventure:'',dust:0,recent:[],looks:[],lookEquipped:{},seen:[],museum:{}};}
function migrate(input){
 const s={...fresh(),...JSON.parse(JSON.stringify(input))};
 if(s.schema<2){
  const setMap={ember:'final',tide:'club',grove:'oldschool'},slotMap={head:'phrase',body:'body',hand:'hand',feet:'hand',charm:'trophy',aura:'trophy'};
  s.inventory=s.inventory.map(i=>({...i,set:setMap[i.set]||'club',slot:slotMap[i.slot]||'body',origin:'Перенесено из первой коллекции'}));
  s.equipped={};s.lookEquipped={};s.skills={};s.schema=2;s.migrationNote='Первая коллекция перенесена в покерные образы. Все очки навыков возвращены.';
 }
 if(s.schema===2){
  const originals=s.inventory.slice();
  originals.forEach(i=>{
   if(i.slot==='body')for(const slot of ['legs','feet'])s.inventory.push({...i,id:i.id+'-part-'+slot,slot,migratedPart:true,salvageValue:0,origin:'Часть ранее полученного комплекта · не занимает место в рюкзаке'});
   if(i.slot==='hand'&&i.set==='grinder')i.slot='head';
   if(i.slot==='hand'&&i.set==='final')i.slot='eyes';
  });
  const expand=items=>{const out={};Object.values(items||{}).forEach(id=>{const i=s.inventory.find(x=>x.id===id);if(!i)return;out[i.slot]=id;if(i.slot==='body')for(const slot of ['legs','feet'])out[slot]=id+'-part-'+slot;});return out;};
  s.equipped=expand(s.equipped);s.lookEquipped=expand(s.lookEquipped);s.looks=s.looks.map(l=>({...l,items:expand(l.items)}));
  s.schema=3;s.migrationNote=(s.migrationNote?s.migrationNote+' ':'')+'Комплекты разделены на верх, брюки и обувь. Дополнительные части бесплатны: без осколков при разборе и без расхода места.';
 }
 return s;
}
function parse(raw){if(!raw)return fresh();try{const s=JSON.parse(raw);if(s&&Array.isArray(s.inventory)&&s.skills&&s.equipped)return migrate({...s,schema:s.schema||1});}catch(_){}fail('Не удалось прочитать героя',503);}
function levelOf(profile,bound){return Math.max(1,Math.min(100,Number(pokerProfileStatusFromCachedProfile(profile,{pokerPlusLinked:!!bound}).level)||1));}
function spent(s){return catalog.skills.reduce((sum,k)=>sum+(s.skills[k.id]||0),0);}
function stats(s){const sets={};let style=0;Object.values(s.equipped).forEach(id=>{const i=s.inventory.find(i=>i.id===id);if(i){style+=catalog.rarities[i.rarity].bonus;sets[i.set]=(sets[i.set]||0)+1;}});Object.values(sets).forEach(n=>{if(n>=3)style+=5;if(n>=4)style+=5;});return {style,sets};}
function economy(s){const k=s.skills;return {mode:'preview',raffleWeightMultiplier:1+(k.one_time||0)*.0025,spinBonusPp:(k.river||0)*.1,bonusMultiplier:1+(k.bonus||0)*.005,newMemberRakebackPp:(k.rakeback||0)*.1,newMemberEligibility:'not_connected',liveEffects:false};}
function view(s,level,privateView=true,now=Date.now()){
 s=migrate(s);level=Math.max(level,s.highestLevel);const item=id=>s.inventory.find(i=>i.id===id);
 const out={schema:3,version:s.version,level,skills:s.skills,equippedItems:Object.values(s.equipped).map(item).filter(Boolean),lookItems:Object.values(s.lookEquipped).map(item).filter(Boolean),stats:stats(s)};
 if(privateView)Object.assign(out,{points:Math.max(0,level-1-spent(s)),inventory:s.inventory,dust:s.dust,chests:Math.max(0,level-s.claimedLevel),adventureAvailable:s.lastAdventure!==dayOf(now),nextAdventureAt:new Date(Math.floor((now+10800000)/DAY)*DAY+DAY-10800000).toISOString(),looks:s.looks,lookCapacity:3+Math.floor((s.skills.collector||0)/5),seen:s.seen,economy:economy(s),migrationNote:s.migrationNote||'',lastLoot:s.lastLoot||[],trophyCatalog:s.trophyCatalog||[]});
 return out;
}
function loot(level,quality,roll,slot,now){const rarity=Math.max(quality,roll[0]>=98?4:roll[0]>=90?3:roll[0]>=65?2:roll[0]>=35?1:0);return {id:crypto.randomUUID(),slot:slot||catalog.slots[roll[1]%catalog.slots.length].id,set:catalog.sets[roll[2]%catalog.sets.length].id,rarity,level,createdAt:new Date(now).toISOString(),origin:'Клубная коллекция · не турнирная награда'};}
function mutate(current,level,body,now=Date.now(),roll){
 const s=migrate(current);s.highestLevel=Math.max(s.highestLevel,level);level=s.highestLevel;
 const get=id=>{const i=s.inventory.find(i=>i.id===id);if(!i)fail('Предмет не найден в вашем рюкзаке');return i;};
 const slot=()=>{if(!catalog.slots.some(x=>x.id===body.slot))fail('Неизвестный слот');return body.slot;};
 const random=()=>roll||[crypto.randomInt(100),crypto.randomInt(catalog.slots.length),crypto.randomInt(catalog.sets.length)];
 const isUsed=id=>Object.values(s.equipped).includes(id)||Object.values(s.lookEquipped).includes(id)||s.looks.some(l=>Object.values(l.items).includes(id));
 if(body.action==='train'){
  const skill=catalog.skills.find(x=>x.id===body.skill);if(!skill)fail('Неизвестный навык');
  if(spent(s)>=level-1)fail('Нет свободных очков');if((s.skills[skill.id]||0)>=skill.max)fail('Навык развит до максимума');s.skills[skill.id]=(s.skills[skill.id]||0)+1;
 }else if(body.action==='reset'){s.skills={};
 }else if(body.action==='equip'){const i=get(body.item);s.equipped[i.slot]=i.id;s.lookEquipped[i.slot]=i.id;s.seen=[...new Set([...s.seen,i.id])];
 }else if(body.action==='wear'){const i=get(body.item);s.lookEquipped[i.slot]=i.id;s.seen=[...new Set([...s.seen,i.id])];
 }else if(body.action==='unequip'){const k=slot();delete s.equipped[k];delete s.lookEquipped[k];
 }else if(body.action==='favorite'){const i=get(body.item);i.favorite=!i.favorite;
 }else if(body.action==='salvage'){
  const i=get(body.item);if(i.award)fail('Памятный кубок нельзя разобрать');if(i.favorite)fail('Сначала уберите вещь из избранного');if(isUsed(i.id))fail('Предмет используется в экипировке или сохранённом образе');if(i.rarity>=2&&body.confirm!==true)fail('Подтвердите разбор редкой вещи');s.inventory=s.inventory.filter(x=>x.id!==i.id);s.dust+=i.salvageValue==null?catalog.rarities[i.rarity].bonus:i.salvageValue;s.seen=s.seen.filter(id=>id!==i.id);
 }else if(body.action==='save-look'){
  const name=String(body.name||'').trim().slice(0,40);if(!name)fail('Назовите образ');if(s.looks.length>=3+Math.floor((s.skills.collector||0)/5))fail('Нет свободных мест для образов');s.looks.push({id:crypto.randomUUID(),name,items:{...s.lookEquipped}});
 }else if(body.action==='apply-look'){
  const look=s.looks.find(l=>l.id===body.look);if(!look)fail('Образ не найден');Object.values(look.items).forEach(get);s.lookEquipped={...look.items};
 }else if(body.action==='delete-look'){if(!s.looks.some(l=>l.id===body.look))fail('Образ не найден');s.looks=s.looks.filter(l=>l.id!==body.look);
 }else if(body.action==='claim-trophy'){
  const award=(s.trophyCatalog||[]).find(a=>a.id===body.award);if(!award)fail('Достижение ещё не получено');if(s.museum[award.id])fail('Кубок уже в коллекции');if(s.inventory.filter(i=>!i.migratedPart).length>=200)fail('Рюкзак полон');const item={id:'award-'+award.id,slot:'trophy',set:'final',rarity:4,level,title:award.title,award:true,favorite:true,art:award.art,origin:award.origin,history:award.history?JSON.parse(JSON.stringify(award.history)):undefined,createdAt:new Date(now).toISOString()};s.inventory.push(item);s.museum[award.id]=true;s.lastLoot=[item.id];
 }else if(['chest','adventure','craft'].includes(body.action)){
  let count=1,quality=0,target;
  if(body.action==='chest'){count=body.count==null?1:body.count;if(!Number.isInteger(count)||count<1||count>10)fail('Можно открыть от 1 до 10 наград');if(s.claimedLevel+count>level)fail('Недостаточно наград за уровни');}
  if(s.inventory.filter(i=>!i.migratedPart).length+count>200)fail('Рюкзак полон. Освободите место');
  if(body.action==='adventure'){if(s.lastAdventure===dayOf(now))fail('Сегодня подарок уже получен');s.lastAdventure=dayOf(now);}
  if(body.action==='craft'){if(s.dust<20)fail('Нужно 20 осколков');target=slot();s.dust-=20;quality=1;}
  if(body.action==='chest')s.claimedLevel+=count;
  s.lastLoot=[];for(let n=0;n<count;n++){const i=loot(level,quality,random(),target,now);i.origin=body.action==='craft'?'Мастерская клуба':body.action==='adventure'?'Подарок клуба · '+dayOf(now):'Награда за уровень · клубная коллекция';if(i.slot==='phrase'){const pool=catalog.phrasePools[i.set];i.phrase=pool[crypto.randomInt(pool.length)];}s.inventory.push(i);s.lastLoot.push(i.id);}
 }else fail('Неизвестное действие');
 s.version++;s.recent=[...s.recent,body.requestId].slice(-40);return s;
}
function trophies(profile,bound){
 if(!bound)return [];const nick=String(profile.nickname||profile.Nike||profile.nick||'').trim().toLowerCase();const c=require('./profile-achievement-catalog.json')[nick]||{};const rows=[];
 if(c.first>0)rows.push({id:'winner',title:'Кубок победителя',art:4,origin:'Опубликованные результаты клуба: '+c.first+' первых мест'});
 if(c.heroes>0)rows.push({id:'day-hero',title:'Кристалл героя дня',art:5,origin:'По опубликованным результатам: герой дня '+c.heroes+' раз'});
 if(c.total>=1000000)rows.push({id:'million',title:'Миллион призовых',art:7,origin:'Сумма опубликованных призовых от 1 000 000 ₽. Это не чистая прибыль.'});
 if(c.big100>0)rows.push({id:'big-win',title:'Кубок большого заноса',art:6,origin:'В опубликованной истории есть приз от 100 000 ₽'});
 return rows;
}
async function load(accountId){
 const [raw,profile,bound,friendIds]=await redis([['GET','poker_app:profile_hero:'+accountId],['HGET',PROFILE_HASH_KEY,accountId],['HGET',BIND_HASH_KEY,accountId],['SMEMBERS','poker_app:friendships:'+accountId]]);
 const profileOf=raw=>{try{return JSON.parse(raw||'{}')||{};}catch(_){return {};}};
 const nickOf=p=>String(p.nickname||p.Nike||p.nick||'').trim();
 const p=profileOf(profile),state=parse(raw),ids=[...new Set(Array.isArray(friendIds)?friendIds:[])].filter(id=>/^ID\d+$/.test(id)&&id!==accountId);
 const values=ids.length&&bound?await redis(ids.flatMap(id=>[['HGET',PROFILE_HASH_KEY,id],['HGET',BIND_HASH_KEY,id]])):[];
 const friends=ids.flatMap((id,n)=>values[n*2+1]?[{userId:id,nick:nickOf(profileOf(values[n*2]))}]:[]);
 const events=bound?require('./hero-memories').memories({userId:accountId,nick:nickOf(p)},friends,require('./friend-tournament-results.json')):[];
 state.trophyCatalog=[...events,...trophies(p,bound)];
 // Keep earned memories after a published result rolls out of the current source.
 const available=new Set(state.trophyCatalog.map(a=>a.id));
 for(const i of state.inventory)if(i.award&&!available.has(i.id.replace(/^award-/,'')))state.trophyCatalog.push({id:i.id.replace(/^award-/,''),title:i.title,art:i.art,origin:i.origin,history:i.history});
 return {raw,state,level:levelOf(p,bound)};
}
function heroEnabled(accountId){return accountId==='ID400800';}
async function readHero(accountId,privateView=true){if(!heroEnabled(accountId))return null;const d=await load(accountId);return view(d.state,d.level,privateView);}
async function updateHero(accountId,body){
 if(!heroEnabled(accountId))fail('Герой пока недоступен для этого аккаунта',403);
 if(typeof body.requestId!=='string'||!/^[-a-zA-Z0-9]{12,80}$/.test(body.requestId))fail('Обновите редактор и повторите');
 const d=await load(accountId);if(d.state.recent.includes(body.requestId))return view(d.state,d.level);
 if(!Number.isInteger(body.version)||body.version!==d.state.version)fail('Герой изменился в другой вкладке. Обновите его',409);
 const s=mutate(d.state,d.level,body);const script="local old=redis.call('GET',KEYS[1]); if (old or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
 const [saved]=await redis([['EVAL',script,1,'poker_app:profile_hero:'+accountId,d.raw||'',JSON.stringify(s)]]);if(Number(saved)!==1)fail('Герой изменился в другой вкладке. Обновите его',409);return view(s,d.level);
}
module.exports={heroEnabled,fresh,parse,migrate,levelOf,stats,economy,view,mutate,trophies,readHero,updateHero};
