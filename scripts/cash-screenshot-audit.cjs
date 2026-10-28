#!/usr/bin/env node
// Apple Vision JSON -> deduplicated Poker21 cash ledger. Amounts remain in screenshot units.
const fs=require('node:fs'),path=require('node:path');
const input=process.argv[2];if(!input)throw Error('Usage: node scripts/cash-screenshot-audit.cjs OCR.json [output-dir]');
const out=process.argv[3]||path.dirname(input);fs.mkdirSync(out,{recursive:true});
const managers={'467511':'VICTORY','369073':'Анна'};
const correctionsPath=path.join(out,'corrections.json');
const corrections=fs.existsSync(correctionsPath)?JSON.parse(fs.readFileSync(correctionsPath,'utf8')):{};
const records=new Map(),warnings=[];
for(const f of JSON.parse(fs.readFileSync(input,'utf8'))){
 const tokens=f.tokens, dates=tokens.filter(t=>/^2026-\d\d-\d\d \d\d:\d\d:\d\d\b/.test(t.text)&&t.x>.3&&t.x<.6&&t.y>.175&&t.y<.67);
 for(const originalDate of dates){
  const d={...originalDate,text:originalDate.text.slice(0,19)};
  const nearby=tokens.filter(t=>t.y>d.y-.055&&t.y<d.y+.045);
  const amountToken=nearby.filter(t=>t.x>.39&&t.x<.55&&t.y>d.y+.008&&/[+−-]\s*\d/.test(t.text)).sort((a,b)=>Math.abs(a.y-d.y-.023)-Math.abs(b.y-d.y-.023))[0];
  let amount=amountToken?Number(amountToken.text.match(/[+−-]\s*\d+(?:[.,]\d+)?/)[0].replace(/\s/g,'').replace('−','-').replace(',','.')):null;
  // Visually verified top-edge amount, absent from OCR.
  if(corrections[d.text]?.amount!==undefined)amount=corrections[d.text].amount;
  const idAt=side=>nearby.find(t=>(side==='left'?t.x<.3:t.x>.65)&&t.y<d.y-.015&&/[DН][:.•]?\s*\d{6}/i.test(t.text));
  let leftId=idAt('left')?.text.match(/\d{6}/)?.[0]||'',rightId=idAt('right')?.text.match(/\d{6}/)?.[0]||'';
  const ticket=nearby.some(t=>t.x<.3&&/^[КK][аa][сc][сc][аa]$/.test(t.text));
  const nameAt=side=>nearby.filter(t=>(side==='left'?t.x<.3:t.x>.6)&&t.y<d.y+.003&&t.y>d.y-.019&&!/^(?:[I1D]|VIP|[АМAМ])$|^(?:ID|D|IN)[.:•]|VIP|Регистра|турнир/.test(t.text)).map(t=>t.text).join(' ').replace(/^[1)\s]+/,'');
  let left=managers[leftId]||nameAt('left'),right=nameAt('right');
  if(/VICTORY/.test(left))left='VICTORY';
  if(corrections[d.text]){const c=corrections[d.text];left=c.left??left;right=c.right??right;leftId=c.leftId??leftId;rightId=c.rightId??rightId;}
  let category=ticket?'raffle_ticket':leftId==='208238'||/Манки/.test(left)?'excluded_monkey':managers[leftId]||left==='VICTORY'||left==='Анна'?'manager':!leftId&&!left?'raffle_cash':'excluded_player_transfer';
  const r={datetime:d.text,amount,left,leftId,right,rightId,category,sources:[path.basename(f.source)]};
  if(amount===null){warnings.push(r);if(!r.category.startsWith('excluded_'))continue;}
  const key=[r.datetime,r.amount,r.category,r.leftId||r.left,r.rightId||r.right].join('|');
  // Matching timestamp and amount also merges partially visible rows with complete copies.
  const existing=[...records.values()].find(v=>v.datetime===r.datetime&&v.amount===r.amount&&v.category===r.category);
  if(existing){existing.sources.push(...r.sources);for(const k of ['left','leftId','right','rightId'])if(!existing[k])existing[k]=r[k];}else records.set(key,r);
 }
}
const knownNames=new Map();for(const r of records.values())if(r.rightId&&r.right)knownNames.set(r.rightId,r.right);
for(const r of records.values()){if(!r.right&&r.rightId)r.right=knownNames.get(r.rightId)||'';if(!r.rightId&&r.right){const match=[...records.values()].find(v=>v.right===r.right&&v.rightId);if(match)r.rightId=match.rightId;}}
const rows=[...records.values()].sort((a,b)=>a.datetime.localeCompare(b.datetime));
const totals=list=>({count:list.length,positive:list.filter(r=>r.amount>0).reduce((s,r)=>s+r.amount,0),negative:-list.filter(r=>r.amount<0).reduce((s,r)=>s+r.amount,0),net:list.reduce((s,r)=>s+r.amount,0)});
const summary={period:{from:rows[0]?.datetime,to:rows.at(-1)?.datetime},screenshots:JSON.parse(fs.readFileSync(input)).length,unique:rows.length,managers:{},categories:{},warnings};
for(const name of Object.values(managers)){const list=rows.filter(r=>r.category==='manager'&&r.left===name);summary.managers[name]={...totals(list),byDate:Object.fromEntries([...new Set(list.map(r=>r.datetime.slice(0,10)))].map(date=>[date,totals(list.filter(r=>r.datetime.startsWith(date)))]))};}
for(const c of new Set(rows.map(r=>r.category)))summary.categories[c]=totals(rows.filter(r=>r.category===c));
fs.writeFileSync(path.join(out,'ledger.json'),JSON.stringify(rows,null,2)+'\n');fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2)+'\n');
const q=v=>'"'+String(v??'').replaceAll('"','""')+'"';fs.writeFileSync(path.join(out,'ledger.csv'),'\ufeff'+['datetime','amount','left','leftId','right','rightId','category','sources'].map(q).join(',')+'\n'+rows.map(r=>[r.datetime,r.amount,r.left,r.leftId,r.right,r.rightId,r.category,r.sources.join(';')].map(q).join(',')).join('\n'));
console.log(JSON.stringify(summary,null,2));
