"use strict";
const {redis,memberProfile}=require('./club-social');
const FRAMES=[{id:'none',title:'Без рамки'},{id:'gold',title:'Клубное золото'},{id:'emerald',title:'Изумруд'},{id:'ice',title:'Лёд'},{id:'violet',title:'Фиолетовый неон'}];
function nickKey(raw){let s=String(raw||'').trim().toLowerCase();if(/^wa{3,5}r+$/.test(s))s='waaar';if(s==='pryanik2la')s='пряник';if(['andrushamorf','4ezzi'].includes(s))s='frankl';if(['мужначас','мужчина на час','муж на час'].includes(s))s='рыбнадзор';if(['em13','emil13','еm13','еm13!!'].includes(s))s='em13!!';if(/^хер вам\)+$/.test(s))s='хер вам)))))';return s;}
function earned(nick,catalog){const stats=(catalog||require('./profile-achievement-catalog.json'))[nickKey(nick)]||{};return [
 {id:'tournament-king',title:'Король турниров',icon:'♛',value:stats.first||0,min:1},
 {id:'day-hero',title:'Герой дня',icon:'☀',value:stats.heroes||0,min:1},
 {id:'millionaire',title:'Миллионер клуба',icon:'♦',value:stats.total||0,min:1000000},
 {id:'win-50',title:'Занос от 50 до 100к',icon:'★',value:stats.big50||0,min:1},
 {id:'win-100',title:'Занос от 100к',icon:'♠',value:stats.big100||0,min:1}
].filter(a=>a.value>=a.min).map(({id,title,icon})=>({id,title,icon}));}
function validate(body,achievements){const frame=String(body.frame||'none'),achievement=String(body.achievement||'');if(!FRAMES.some(f=>f.id===frame))throw Object.assign(new Error('Неизвестная рамка'),{status:400});if(achievement&&!achievements.some(a=>a.id===achievement))throw Object.assign(new Error('Эта ачивка ещё не получена'),{status:400});return {frame,achievement};}
async function readAppearance(accountId){const [raw,p]=await Promise.all([redis([['GET','poker_app:profile_appearance:'+accountId]]),memberProfile(accountId)]);let saved={};try{saved=JSON.parse(raw[0]||'{}')||{};}catch(_){}const achievements=earned(p.nick);return {accountId,name:p.name,frame:FRAMES.some(f=>f.id===saved.frame)?saved.frame:'none',achievement:achievements.find(a=>a.id===saved.achievement)||null,achievements,frames:FRAMES};}
module.exports={FRAMES,nickKey,earned,validate,readAppearance};
