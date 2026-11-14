'use strict';
const fs=require('node:fs'),path=require('node:path');
const source=process.argv.find(a=>a.startsWith('--source='))?.slice(9);
if(!source)throw Error('Use --source=/path/to/union-periods.json');
const input=JSON.parse(fs.readFileSync(source,'utf8')),seen=new Set(),periods=[],skipped=[];
for(const period of input.periods||[]){
 const {startDate,endDate}=period;
 if(!/^\d{4}-\d{2}-\d{2}$/.test(startDate)||!/^\d{4}-\d{2}-\d{2}$/.test(endDate)||Date.parse(endDate)-Date.parse(startDate)!==6*86400000)throw Error('Expected full weekly report');
 const id=startDate+'_'+endDate;if(seen.has(id))throw Error('Duplicate report period');seen.add(id);
 const club=(period.directory?.clubs||[]).find(c=>String(c.id)==='758417');
 if(!club||!Array.isArray(club.playerRows)){skipped.push(id);continue;}
 const rake={},games={},players=new Set();
 for(const row of club.playerRows){
  const player=String(row.id),amount=Number(row.rake);
  if(!/^\d+$/.test(player)||players.has(player)||!Number.isFinite(amount)||amount<0)throw Error('Invalid or duplicate player rake');players.add(player);
  if(amount)rake[player]=Math.round(amount*100);
  const gameRows=Array.isArray(row.rakeGames)?row.rakeGames:[];
  for(const [name,value] of gameRows){if(typeof name!=='string'||!Number.isFinite(Number(value))||Number(value)<0)throw Error('Invalid game rake');}
  if(gameRows.some(([,value])=>Number(value)>0))games[player]=Object.fromEntries(gameRows.filter(([,value])=>Number(value)>0).map(([name,value])=>[name,Math.round(Number(value)*100)]));
 }
 periods.push({startDate,endDate,rake,games});
}
periods.sort((a,b)=>a.startDate.localeCompare(b.startDate));
for(let i=1;i<periods.length;i++)if(periods[i].startDate<=periods[i-1].endDate)throw Error('Overlapping report periods');
const target=path.resolve(__dirname,'../lib/support-rake-reports.json');
fs.writeFileSync(target,JSON.stringify({clubId:'758417',periods})+'\n');
console.log(JSON.stringify({periods:periods.length,skipped,from:periods[0]?.startDate,to:periods.at(-1)?.endDate,bytes:fs.statSync(target).size}));
