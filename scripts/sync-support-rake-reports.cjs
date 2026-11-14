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
for(const arg of process.argv.filter(a=>a.startsWith('--hands-source='))){
 const raw=JSON.parse(fs.readFileSync(arg.slice(15),'utf8'));
 const period=periods.find(p=>p.startDate===raw.startDate&&p.endDate===raw.endDate);
 const club=raw.clubs?.find(c=>String(c.id)==='758417');
 if(!period||!club||!Array.isArray(raw.headers))throw Error('Hands report period or club mismatch');
 const anchor=raw.headers.indexOf('Total Payout');
 if(anchor<0||raw.headers[anchor+1]!=='Total'||raw.headers[anchor+2]!=='AOF')throw Error('Unknown hands section');
 const start=anchor+2,end=raw.headers.indexOf('Send Out',start),hands={},rakeByPlayer={};
 if(end<start)throw Error('Missing hands section end');
 for(const row of club.rows){
  const id=String(row[2]),values=hands[id]||{};let rowHands=0;
  const reportRake=Math.round((Number(row[30]||0)+Number(row[44]||0)+Number(row[49]||0))*100);
  rakeByPlayer[id]=(rakeByPlayer[id]||0)+reportRake;
  for(let i=start;i<end;i++){const n=Number(row[i]||0);if(!Number.isSafeInteger(n)||n<0)throw Error('Invalid hand count');rowHands+=n;if(n)values[raw.headers[i]]=(values[raw.headers[i]]||0)+n;}
  const total=Number(row[start-1]||0);if(rowHands!==total)throw Error('Hand totals do not reconcile');
  if(Object.keys(values).length)hands[id]=values;
 }
 for(const [id,rake] of Object.entries(rakeByPlayer))if(rake!==Number(period.rake[id]||0))throw Error('Rake and hands report mismatch');
 period.hands=hands;
}
const target=path.resolve(__dirname,'../lib/support-rake-reports.json');
fs.writeFileSync(target,JSON.stringify({clubId:'758417',periods})+'\n');
console.log(JSON.stringify({periods:periods.length,skipped,from:periods[0]?.startDate,to:periods.at(-1)?.endDate,bytes:fs.statSync(target).size}));
