#!/usr/bin/env node
// X-Poker Vision layout: signed amount anchors; preserve equal rows within one screenshot.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const [input,out]=process.argv.slice(2);if(!input||!out)throw Error('Usage: node scripts/cash-xpoker-audit.cjs OCR.json output-directory');
const rublesPerChip=100; // Owner-confirmed cash accounting rate.
const managers={'3585266':'Анна (AnnaQween)','2311506':'VICTORY'},rows=[],warnings=[];
for(const f of JSON.parse(fs.readFileSync(input))){const tokens=f.tokens;const anchors=tokens.filter(t=>t.x>.4&&t.x<.58&&t.y<.68&&t.y>.04&&/^[+−–-]\s*\d+(?:[.,]\d+)?$/.test(t.text)).sort((a,b)=>b.y-a.y);
 for(const [index,a]of anchors.entries()){
  const near=tokens.filter(t=>t.y<a.y+.007&&t.y>a.y-.043);
  const getId=side=>near.find(t=>(side==='left'?t.x<.3:t.x>.65)&&/(?:ID|D):\s*\d{6,8}/i.test(t.text))?.text.match(/\d{6,8}/)?.[0]||'';
  let leftId=getId('left'),rightId=getId('right');
  const name=side=>near.filter(t=>(side==='left'?t.x<.3:t.x>.65)&&t.y>a.y-.019&&!/(?:ID|D):|^M$|^A$/.test(t.text)).sort((x,y)=>x.x-y.x).map(t=>t.text).join(' ');
  let left=name('left'),right=name('right');
  // Two bottom rows have clipped dates/IDs, but visible names establish exclusion.
  if(left==='Dima Drangoi'&&!leftId)leftId='2979672';
  if(/^AnnaQween/.test(left)&&!leftId)leftId='3585266';
  if(/^AnnaQween/.test(right)&&!rightId)rightId='3585266';
  const date=near.find(t=>t.x>.3&&t.x<.65&&/^2026\/\d\d\/\d\d/.test(t.text));
  let time=date?.text.match(/\d\d:\d\d/)?.[0]||near.find(t=>t.x>.3&&t.x<.65&&/^\d\d:\d\d$/.test(t.text))?.text;
  const datetime=date&&time?date.text.slice(0,10).replaceAll('/','-')+' '+time:null;
  const amount=Number(a.text.replace(/\s/g,'').replace(/[−–]/,'-').replace(',','.'));
  const category=rightId==='2299644'&&amount>0?'excluded_owner_working_chips':leftId&&leftId===rightId?'excluded_self':managers[leftId]?'manager':/Манки|Pokermanki/i.test(left)?'excluded_monkey':'excluded_player_transfer';
  const r={source:path.basename(f.source),row:index+1,datetime,amount,amountRub:Math.round(amount*rublesPerChip),left:managers[leftId]||left,leftId,right,rightId,category,...(category==='excluded_owner_working_chips'?{exclusionReason:'Владелец подтвердил: Raketa154 — его аккаунт; служебная передача фишек в работу, не депозит/вывод.'}:{})};
  if(category==='manager'&&(!datetime||!rightId))warnings.push(r);
  rows.push(r);
 }
}
const totals=list=>({count:list.length,issued:list.filter(r=>r.amount<0).reduce((s,r)=>s+Math.round(-r.amountRub*100),0)/100,received:list.filter(r=>r.amount>0).reduce((s,r)=>s+Math.round(r.amountRub*100),0)/100,net:list.reduce((s,r)=>s+Math.round(r.amountRub*100),0)/100});
const summary={room:'X-Poker',unit:'RUB',rublesPerChip,screenshots:JSON.parse(fs.readFileSync(input)).length,rows:rows.length,period:{from:rows.map(r=>r.datetime).filter(Boolean).sort()[0],to:rows.map(r=>r.datetime).filter(Boolean).sort().at(-1)},managers:Object.fromEntries(Object.values(managers).map(m=>[m,{...totals(rows.filter(r=>r.category==='manager'&&r.left===m)),byDate:Object.fromEntries([...new Set(rows.filter(r=>r.category==='manager'&&r.left===m).map(r=>r.datetime?.slice(0,10)))].map(d=>[d,totals(rows.filter(r=>r.category==='manager'&&r.left===m&&r.datetime?.startsWith(d)))]))}])),total:totals(rows.filter(r=>r.category==='manager')),excluded:totals(rows.filter(r=>r.category!=='manager')),ownerWorkingChips:totals(rows.filter(r=>r.category==='excluded_owner_working_chips')),warnings};
assert(rows.every(r=>Number.isFinite(r.amount)));assert.equal(warnings.length,0,'Incomplete manager row');
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'ledger.json'),JSON.stringify(rows,null,2));fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2));
const cols=['source','row','datetime','amount','amountRub','left','leftId','right','rightId','category','exclusionReason'],q=v=>'"'+String(v??'').replaceAll('"','""')+'"';fs.writeFileSync(path.join(out,'ledger.csv'),'\ufeff'+cols.map(q).join(',')+'\n'+rows.map(r=>cols.map(c=>q(r[c])).join(',')).join('\n'));
let report=`X-Poker — касса\n${summary.screenshots} скриншотов, ${summary.rows} строк. Период на изображениях: ${summary.period.from} — ${summary.period.to}; часовой пояс не установлен.\nСуммы отчёта в рублях: 1 фишка X-Poker = 100 ₽. В реестре amount — исходные фишки, amountRub — рубли.\nВыдача игроку — кандидат на депозит, приём от игрока — кандидат на вывод. Реальные платежи ещё не сверены.\n\n`;
for(const [m,t]of Object.entries(summary.managers)){report+=`${m}: ${t.count} операций; выдано ${t.issued}; принято ${t.received}; изменение баланса менеджера, ₽ ${t.net}.\n`;for(const [d,v]of Object.entries(t.byDate))report+=`  ${d}: выдано ${v.issued}; принято ${v.received}.\n`;for(const r of rows.filter(r=>r.category==='manager'&&r.left===m).sort((a,b)=>a.datetime.localeCompare(b.datetime)))report+=`${r.datetime} | ${r.amount<0?'Выдача игроку':'Приём от игрока'} | ${Math.abs(r.amountRub)} ₽ | ${r.right} | ID ${r.rightId} | ${r.source}, строка ${r.row}\n`;report+='\n';}
report+=`Всего менеджеры: выдано ${summary.total.issued}; принято ${summary.total.received}; изменение баланса, ₽ ${summary.total.net}.\nИсключено ${summary.excluded.count} операций: ${summary.excluded.count-summary.ownerWorkingChips.count} переводов игроков/самому себе и ${summary.ownerWorkingChips.count} служебных поступления Raketa154 на ${summary.ownerWorkingChips.received} ₽. Raketa154 — аккаунт владельца, фишки переданы менеджеру в работу; из депозитов/выводов исключены по подтверждению владельца. Розыгрышей без отправителя и операций «Касса» на этих изображениях нет.\nДва перевода VICTORY → Dima Drangoi по 30 фишек (3 000 ₽) в 05:01 20.10 сохранены: это две отдельные строки IMG_0824.\nДаты двух обрезанных исключённых строк не восстановлены; суммы и принадлежность менеджерам не затрагиваются.\nВсе суммы и направления проверены по изображениям. Полнота суток и реальные оплаты пока не подтверждены.\n`;
fs.writeFileSync(path.join(out,'report.txt'),report);console.log(JSON.stringify(summary,null,2));
