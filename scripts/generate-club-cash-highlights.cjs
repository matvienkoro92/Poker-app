#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const readline=require('node:readline');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'output');
const target=path.join(root,'club-cash-highlights.json');
const keys=['potBb','potRub','lossBb','evBelow','highCard'];
const emptyGroups=()=>Object.fromEntries(keys.map(key=>[key,[]]));
const potCodes=new Set(['2','3','5','18','19','20','92']);
const rankValue=card=>'23456789TJQKA'.indexOf(String(card)[0])+2;
const dayKey=value=>{const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(value));const get=type=>parts.find(part=>part.type===type).value;return get('year')+'-'+get('month')+'-'+get('day');};
function highCard(cards){
 if(cards.length!==7||new Set(cards).size!==7||cards.some(card=>!/^[2-9TJQKA][cdhs]$/.test(String(card))))return '';
 const counts=new Map(),suits=new Map();
 for(const card of cards){const rank=rankValue(card);counts.set(rank,(counts.get(rank)||0)+1);suits.set(card[1],(suits.get(card[1])||0)+1);}
 if([...counts.values()].some(count=>count>1)||[...suits.values()].some(count=>count>=5))return '';
 const ranks=[...counts.keys()].sort((a,b)=>a-b);if(ranks.includes(14))ranks.unshift(1);
 for(let i=0;i<=ranks.length-5;i++)if(ranks[i+4]-ranks[i]===4)return '';
 return '23456789TJQKA'[[...counts.keys()].sort((a,b)=>b-a)[0]-2]||'';
}
function insert(groups,key,item,score){
 const rows=groups[key];rows.push({...item,score});rows.sort((a,b)=>b.score-a.score||b.playedAt.localeCompare(a.playedAt));
 const unique=new Set();groups[key]=rows.filter(row=>{if(unique.has(row.handId))return false;unique.add(row.handId);return true;}).slice(0,3);
}
async function lines(file,onLine){const input=fs.createReadStream(file);const reader=readline.createInterface({input,crlfDelay:Infinity});for await(const line of reader)if(line)onLine(JSON.parse(line));}
function imports(){
 if(process.env.CLUB_CASH_SOURCE){const dir=path.resolve(process.env.CLUB_CASH_SOURCE);return [{dir,report:JSON.parse(fs.readFileSync(path.join(dir,'prepare-report.json')))}];}
 const candidates=fs.readdirSync(output).filter(name=>name.startsWith('club-hand-import')&&fs.existsSync(path.join(output,name,'upload-journal.jsonl'))&&fs.existsSync(path.join(output,name,'prepare-report.json'))&&fs.existsSync(path.join(output,name,'players')))
  .map(name=>({dir:path.join(output,name),report:JSON.parse(fs.readFileSync(path.join(output,name,'prepare-report.json')))}))
  .sort((a,b)=>String(b.report.periodTo).localeCompare(String(a.report.periodTo))||String(a.report.periodFrom).localeCompare(String(b.report.periodFrom))||Number(b.report.modes?.cash||0)-Number(a.report.modes?.cash||0));
 const selected=[];let earliest='9999';
 for(const candidate of candidates)if(candidate.report.periodFrom<earliest){selected.push(candidate);earliest=candidate.report.periodFrom;}
 if(!selected.length)throw Error('No imported club hand histories');
 return selected;
}
function evDirectory(source){
 const base=process.env.CLUB_CASH_EV_SOURCE?path.resolve(process.env.CLUB_CASH_EV_SOURCE):path.join(output,path.basename(source).replace('club-hand-import','club-hand-ev'));
 const candidate=[base,base+'-complete'].find(dir=>fs.existsSync(path.join(dir,'calculated')));
 return candidate?path.join(candidate,'calculated'):'';
}
async function main(){
 const sources=imports(),days=new Map(),months=new Map(),seen=new Set(),names=new Map();let cashRows=0;
 for(const {dir} of sources){const roster=JSON.parse(fs.readFileSync(path.join(dir,'members.json')));for(const member of roster.members||[])if(!names.has(String(member.playerId)))names.set(String(member.playerId),String(member.nickname||'Игрок'));}
 for(const {dir} of sources){
  const evByPlayer=new Map(),evDir=evDirectory(dir);
  if(evDir)for(const name of fs.readdirSync(evDir).filter(name=>name.endsWith('.json'))){const data=JSON.parse(fs.readFileSync(path.join(evDir,name),'utf8'));evByPlayer.set(String(data.playerId),new Map((data.rows||[]).map(row=>[String(row.handId),row.ev])));}
  const players=path.join(dir,'players');
  for(const name of fs.readdirSync(players).filter(name=>name.endsWith('.jsonl'))){
   const playerId=path.basename(name,'.jsonl');
   await lines(path.join(players,name),({row,replay})=>{
   if(row.mode!=='cash'||row.unit!=='TABLE_CHIP'||!Number.isFinite(row.bigBlindMinor)||row.bigBlindMinor<=0)return;
   const identity=playerId+':'+row.handId;if(seen.has(identity))return;seen.add(identity);cashRows++;
   const day=dayKey(row.playedAt),month=day.slice(0,7);
   if(!days.has(day))days.set(day,{date:day,count:0,groups:emptyGroups()});
   if(!months.has(month))months.set(month,{month,count:0,groups:emptyGroups()});
   const daily=days.get(day),monthly=months.get(month);daily.count++;monthly.count++;
   const events=Array.isArray(replay.events)?replay.events:[];
   const potMinor=Math.round(events.reduce((sum,event)=>sum+(potCodes.has(String(event.code))?Number(event.amount)||0:0),0)*100);
   const board=events.filter(event=>Array.isArray(event.board)&&event.board.length).at(-1)?.board||[];
   const ev=evByPlayer.get(playerId)?.get(String(row.handId));
   const item={handId:String(row.handId),playerId,player:names.get(playerId)||'Игрок',playedAt:row.playedAt,game:row.game||'NLH',position:row.position||'',cards:row.cards||[],board,potMinor,resultMinor:row.resultMinor,bigBlindMinor:row.bigBlindMinor,evResultMinor:ev?.status==='calculated'?ev.resultMinor:null};
   const add=(key,entry,score)=>{insert(daily.groups,key,entry,score);insert(monthly.groups,key,entry,score);};
   if(row.resultMinor>0&&potMinor>0){add('potBb',item,potMinor/row.bigBlindMinor);add('potRub',item,potMinor);}
   if(row.resultMinor<0)add('lossBb',item,-row.resultMinor/row.bigBlindMinor);
   if(ev?.status==='calculated'&&Number.isFinite(ev.resultMinor)&&row.resultMinor<ev.resultMinor)add('evBelow',item,(ev.resultMinor-row.resultMinor)/row.bigBlindMinor);
   if(row.showdown===true&&events.some(event=>String(event.actorId)===playerId&&['3','5','20'].includes(String(event.code)))){
    const rank=highCard([...row.cards,...board]);if(rank)add('highCard',{...item,highCardRank:rank},potMinor/row.bigBlindMinor);
   }
   });
  }
 }
 const data={periodFrom:sources.at(-1).report.periodFrom,periodTo:sources[0].report.periodTo,cashRows,months:[...months.values()].sort((a,b)=>b.month.localeCompare(a.month)),days:[...days.values()].sort((a,b)=>b.date.localeCompare(a.date))};
 fs.writeFileSync(target,JSON.stringify(data));
 console.log(JSON.stringify({target,cashRows,months:data.months.length,days:data.days.length,sources:sources.map(x=>path.basename(x.dir))}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
