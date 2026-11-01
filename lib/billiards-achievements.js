'use strict';
const {PROGRESS}=require('./billiards-super-shot-rewards');
const {object}=require('./game-rivalries');
const parse=raw=>{try{return typeof raw==='string'?JSON.parse(raw):raw||{};}catch{return {};}};
function monthKey(at){const d=new Date(Number(at));if(!Number.isFinite(d.getTime()))return '';return new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',month:'2-digit',year:'numeric'}).format(d);}
function aggregate(progress,results){
 const gold=new Map(),kings=new Map();
 for(const [accountId,raw] of Object.entries(object(progress))){const p=parse(raw),wins=Math.max(0,Number(p.wins)||0);if(!wins)continue;const details=[];for(const [month,count] of Object.entries(p.monthWins||{}))for(let i=0;i<Math.max(0,Number(count)||0);i++)details.push({_monthKey:month,text:'Успешный суперудар'});gold.set(accountId,{accountId,nick:'Игрок',value:wins,tie:0,valueText:wins+' попаданий',detailRows:details});}
 for(const source of results)for(const raw of Object.values(object(source))){const e=parse(raw),room=e.room;if(!room||room.wagered!==true||![0,1].includes(room.state?.winner))continue;const winner=room.playerProfiles?.[room.state.winner];if(!/^ID\d{6}$/.test(winner?.accountId||''))continue;let row=kings.get(winner.accountId);if(!row){row={accountId:winner.accountId,nick:winner.name||'Игрок',value:0,tie:0,detailRows:[]};kings.set(winner.accountId,row);}row.value++;row.valueText=row.value+' побед';row.detailRows.push({_monthKey:monthKey(e.finishedAt),text:'Победа в бильярде на фишки'});for(const p of room.playerProfiles||[])if(gold.has(p?.accountId)&&p.name)gold.get(p.accountId).nick=p.name;}
 const rank=map=>[...map.values()].sort((a,b)=>b.value-a.value||a.accountId.localeCompare(b.accountId)).map((r,i)=>({...r,rank:i+1}));return {goldenBall:rank(gold),billiardsKing:rank(kings)};
}
async function read(commands){const rows=await commands([['HGETALL',PROGRESS],...['pyramid','pool8'].map(k=>['HGETALL','poker_app:billiards:stats:v1:'+k+':results'])]);const data=aggregate(rows[0],rows.slice(1));await Promise.all(data.goldenBall.filter(r=>r.nick==='Игрок').map(async r=>{try{const p=await require('./club-social').memberProfile(r.accountId);r.nick=p.nick||p.name||r.nick;}catch{}}));return data;}
module.exports={aggregate,read,monthKey};
