#!/usr/bin/env node
// Local screenshot extraction. Repeated rows are matched only by room, time, participants and amount.
const fs=require('fs'),path=require('path');
const base=process.argv[2];if(!base)throw Error('Usage: cash-batch-audit.cjs output-dir');
const original=JSON.parse(fs.readFileSync(base+'/ocr.json')),bright=JSON.parse(fs.readFileSync(base+'/ocr-bright.json'));
const files=original.map(f=>bright.find(b=>b.source===f.source)||f),rows=[],partials=[],warnings=[],inventory=[];
const managerIds={P21:{467511:'Вика',369073:'Анна'},X:{2311506:'Вика',3585266:'Анна'},Supr:{830078:'Вика',829805:'Анна'}};
const old=[];for(const [room,dir]of [['P21','cash-poker21'],['X','cash-xpoker'],['Supr','cash-suprema']])for(const r of JSON.parse(fs.readFileSync(`output/${dir}-2026-10-20/ledger.json`))){old.push({room,datetime:r.datetime,amount:r.amount,leftId:r.leftId||r.managerId||'',rightId:r.rightId||r.playerId||''});}
for(const file of files){const ts=[...file.tokens],name=path.basename(file.source);if(name==='IMG_0915.PNG')ts.push({text:'+50000',x:.46,y:.664});const room=ts.some(t=>/Suprema/.test(t.text))?'Supr':ts.some(t=>/2026\//.test(t.text))?'X':'P21';inventory.push({file:name,room,tokens:ts.length});const anchors=ts.filter(t=>t.x>.39&&t.x<.64&&t.y>(room==='P21'?.18:.06)&&t.y<.67&&/^[^+−–-]*[+−–-]\s*\d+(?:[.,]\d+)?$/.test(t.text)).sort((a,b)=>b.y-a.y);
 for(const [idx,a]of anchors.entries()){
 const near=ts.filter(t=>t.y<a.y+.018&&t.y>a.y-(room==='Supr'?.085:.069));
 const id=side=>near.filter(t=>side==='left'?t.x<.31:t.x>.65).find(t=>/ID:|\bD:|\bIN:/i.test(t.text))?.text.match(/\d{5,8}/)?.[0]||'';
 let leftId=id('left'),rightId=id('right');
 const sideName=side=>near.filter(t=>(side==='left'?t.x<.31:t.x>.64)&&t.y>a.y-(room==='Supr'?.04:.042)&&t.y<a.y+.012&&!/ID:|\bD:|\bIN:|VIP|Poker.?21|poker.?21|^\(?[AMАМ]\)?$|Регистра|турнир/i.test(t.text)).map(t=>t.text).join(' ').replace(/^[)\s]+/,'');
 let left=sideName('left'),right=sideName('right'),dt=null;
 const d=near.find(t=>t.x>.3&&t.x<.61&&/2026[-/]\d\d[-/]\d\d|\d\d\/\d\d\/2026/.test(t.text));
 if(d){if(room==='P21'){const m=d.text.match(/(2026-\d\d-\d\d)\s*(\d\d:\d\d(?::\d\d)?)/);if(m)dt=m[1]+' '+m[2];}else if(room==='X'){const date=d.text.match(/2026\/\d\d\/\d\d/)[0].replaceAll('/','-'),time=d.text.match(/\d\d:\d\d/)?.[0]||near.find(t=>t.x>.3&&t.x<.65&&/^\d\d:\d\d$/.test(t.text))?.text;if(time)dt=date+' '+time;}else {const m=d.text.match(/(\d\d)\/(\d\d)\/(2026) (\d\d:\d\d)/);if(m)dt=`${m[3]}-${m[2]}-${m[1]} ${m[4]}`;}}
 const amount=Number(a.text.match(/[+−–-]\s*\d+(?:[.,]\d+)?/)[0].replace(/\s/g,'').replace(/[−–]/,'-').replace(',','.'));
 const knownByName={Dominator95:'540467',Zeus:'659208',svini_pups:'193483','Вейдер':'228739',Waaar:'590773',Malek3084:'535047'};const idInferred=room==='P21'&&!rightId&&Boolean(knownByName[right]);if(idInferred)rightId=knownByName[right];
 const manager=managerIds[room][leftId]||(/VICTORY/i.test(left)?'Вика':/Анна|AnnaQween|Qween_poker/.test(left)?'Анна':null);
 const category=/^[КK][аa][сc][сc][аa](?:\s|$)/i.test(left)?'raffle_ticket':!leftId&&!left?'raffle_cash':leftId&&leftId===rightId?'excluded_self':leftId==='208238'||/Манки|Pokermanki/i.test(left)?'excluded_monkey':rightId==='2299644'&&amount>0?'excluded_owner_working_chips':manager?'manager':'excluded_player_transfer';
 const r={room,datetime:dt,amount,amountRub:Math.round(amount*(room==='X'?100:room==='Supr'?115:1)*100)/100,left,leftId,right,rightId,manager,category,idInferred,sources:[{file:name,row:idx+1}],anchorY:a.y};
 if(dt){const match=rows.find(v=>v.room===room&&v.datetime===dt&&v.amount===amount&&v.leftId===leftId&&v.rightId===rightId);if(match)match.sources.push(...r.sources);else rows.push(r);}else partials.push(r);
 }
}
for(const r of partials){if(r.room==='Supr'&&r.sources[0].file==='IMG_0877.PNG'&&r.amount===-8.69){r.datetime='2026-10-19 19:32';r.left='VICTORY';r.leftId='830078';r.right='ya_n.i.k.o';r.rightId='1411436';r.manager='Вика';r.category='manager';r.evidence='Визуально совпадают отправитель, сумма и аватар получателя с первой строкой IMG_0829.PNG; дата и ID взяты из полной старой копии.';rows.push(r);continue;}const matches=rows.filter(v=>v.room===r.room&&v.amount===r.amount&&(!r.leftId||v.leftId===r.leftId)&&(!r.rightId||v.rightId===r.rightId));if(matches.length===1&&(r.leftId||r.rightId))matches[0].sources.push(...r.sources);else warnings.push({...r,reason:'Обрезанная строка без даты; требуется сопоставление'});}
for(const r of rows){const cutoff=r.room==='Supr'?'2026-10-20 00:00':'2026-10-20 06:00';r.previouslyAccounted=old.some(v=>v.room===r.room&&v.datetime===r.datetime&&v.amount===r.amount&&(!r.leftId||!v.leftId||r.leftId===v.leftId)&&(!r.rightId||!v.rightId||r.rightId===v.rightId));r.scope=r.previouslyAccounted?'previously_accounted':r.datetime<cutoff?'before_period':'current_period';if(r.category==='manager'&&!r.rightId)warnings.push({...r,reason:'Не виден ID игрока'});}
const stats=list=>({count:list.length,issued:Math.round(list.reduce((s,r)=>s+Math.max(-r.amountRub,0),0)*100)/100,withdrawn:Math.round(list.reduce((s,r)=>s+Math.max(r.amountRub,0),0)*100)/100});
const summary={screenshots:inventory.length,rooms:Object.fromEntries(['P21','X','Supr'].map(room=>[room,inventory.filter(f=>f.room===room).length])),rows:rows.length,scope:Object.fromEntries([...new Set(rows.map(r=>r.scope))].map(k=>[k,stats(rows.filter(r=>r.scope===k))])),managers:{},categories:{},warnings: warnings.length};
for(const m of ['Вика','Анна'])summary.managers[m]=Object.fromEntries(['P21','X','Supr'].map(room=>[room,stats(rows.filter(r=>r.scope==='current_period'&&r.category==='manager'&&r.manager===m&&r.room===room))]));for(const c of new Set(rows.map(r=>r.category)))summary.categories[c]=stats(rows.filter(r=>r.scope==='current_period'&&r.category===c));
fs.writeFileSync(base+'/extraction.json',JSON.stringify({summary,inventory,rows,warnings},null,2));console.log(JSON.stringify(summary,null,2));console.log('WARNINGS',JSON.stringify(warnings,null,2));
