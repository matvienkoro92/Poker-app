#!/usr/bin/env node
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const [input,out]=process.argv.slice(2);if(!input||!out)throw Error('Usage: node scripts/cash-pp-audit.cjs OCR.json output-dir');
const rate=115,rows=[],partials=[];let rawRows=0;
for(const file of JSON.parse(fs.readFileSync(input))){const tokens=file.tokens;const amounts=tokens.filter(t=>t.x>.65&&t.x<.82&&t.y>.17&&t.y<.69&&/^[+−-]\d+(?:[.,]\d+)?$/.test(t.text)).sort((a,b)=>b.y-a.y);
 for(const [i,a]of amounts.entries()){rawRows++;const nearby=tokens.filter(t=>t.y<a.y+.012&&t.y>a.y-.04);let manager=nearby.find(t=>t.x<.3&&/^(Анна|Victory)/i.test(t.text))?.text;
  if(!manager&&path.basename(file.source)==='IMG_0826.PNG'&&i===0)manager='Анна'; // Visible, clipped top name verified on image.
  manager=/^Victory/i.test(manager)?'VICTORY':manager;
  const detail=nearby.find(t=>t.x<.3&&/^(Выдано:|Забрано из)/.test(t.text))?.text;
  const datetime=nearby.find(t=>t.x>.65&&/^2026\/\d\d\/\d\d \d\d:\d\d$/.test(t.text))?.text.replaceAll('/','-')||null;
  const amount=Number(a.text.replace('−','-').replace(',','.')),amountRub=Math.round(amount*100)*rate/100;
  assert(detail&&manager,'Incomplete operation');assert.equal(detail.startsWith('Выдано:'),amount<0,'Sign/direction mismatch');
  const playerId=detail.match(/\((\d+)\)/)?.[1],player=detail.replace(/^(Выдано:|Забрано из)\s*/,'').replace(/\s*\(\d+\)/,'');assert(playerId);
  const r={room:'PP',manager,datetime,amount,amountRub,player,playerId,category:'manager',sources:[{file:path.basename(file.source),row:i+1}]};
  if(!datetime){partials.push(r);continue;}
  const old=rows.find(v=>v.datetime===datetime&&v.manager===manager&&v.amount===amount&&v.playerId===playerId);if(old)old.sources.push(...r.sources);else rows.push(r);
 }
}
for(const r of partials){const matches=rows.filter(v=>v.manager===r.manager&&v.amount===r.amount&&v.playerId===r.playerId);assert.equal(matches.length,1,'Ambiguous partial operation');matches[0].sources.push(...r.sources);}
rows.sort((a,b)=>a.datetime.localeCompare(b.datetime));const total=list=>({count:list.length,issued:list.filter(r=>r.amount<0).reduce((s,r)=>s-Math.round(r.amountRub*100),0)/100,received:list.filter(r=>r.amount>0).reduce((s,r)=>s+Math.round(r.amountRub*100),0)/100});
const summary={room:'PP',currency:'RUB',rublesPerChip:rate,screenshots:JSON.parse(fs.readFileSync(input)).length,rawRows,uniqueRows:rows.length,duplicates:rawRows-rows.length,period:{from:rows[0].datetime,to:rows.at(-1).datetime},managers:Object.fromEntries([...new Set(rows.map(r=>r.manager))].map(m=>[m,total(rows.filter(r=>r.manager===m))])),total:total(rows)};
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'ledger.json'),JSON.stringify(rows,null,2));fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2));const keys=['room','manager','datetime','amount','amountRub','player','playerId','category','sources'],q=v=>'"'+String(v??'').replaceAll('"','""')+'"';fs.writeFileSync(path.join(out,'ledger.csv'),'\ufeff'+keys.map(q).join(',')+'\n'+rows.map(r=>keys.map(k=>q(k==='sources'?r.sources.map(s=>s.file+':'+s.row).join(';'):r[k])).join(',')).join('\n'));
let report=`PP — касса\nКурс владельца: 1 фишка = 115 ₽. Суммы отчёта в рублях; amount в реестре — фишки, amountRub — рубли.\n${summary.screenshots} скриншота; ${rawRows} строк, ${rows.length} уникальных операций, ${summary.duplicates} повторных строк.\nПериод: ${summary.period.from} — ${summary.period.to}. Часовой пояс не установлен.\nЭтот период отличается от истории Poker21 и X-Poker за 19–20 октября.\n\n`;
for(const [m,t]of Object.entries(summary.managers)){report+=`${m}: выдано игрокам ${t.issued} ₽, принято от игроков ${t.received} ₽; ${t.count} операций.\n`;for(const r of rows.filter(r=>r.manager===m))report+=`${r.datetime} | ${r.amount<0?'Выдача игроку':'Приём от игрока'} | ${Math.abs(r.amount)} фишек | ${Math.abs(r.amountRub)} ₽ | ${r.player} (${r.playerId}) | ${r.sources.map(s=>s.file+':'+s.row).join(';')}\n`;report+='\n';}
report+='Значения пересчитаны строго по 115 ₽, до копейки, без округления к предполагаемой сумме платежа. Например, 86,96 фишки = 10 000,40 ₽.\nВсе суммы, даты, менеджеры, игроки и направления сопоставлены со снимками. Верхнее имя Анна на IMG_0826 прочитано визуально; дата нижней обрезанной строки IMG_0828 подтверждена полной копией на IMG_0827.\nВыдача игроку — кандидат на депозит; приём от игрока — кандидат на вывод. Реальные платежи ещё не сверены.\n';fs.writeFileSync(path.join(out,'report.txt'),report);console.log(JSON.stringify(summary,null,2));
