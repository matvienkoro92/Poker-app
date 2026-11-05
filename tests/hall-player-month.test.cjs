'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function context(){const c={console,URLSearchParams,URL,window:{addEventListener(){}},document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}},setTimeout(){},clearTimeout(){},localStorage:{getItem(){return null;}},location:{search:''}};vm.createContext(c);vm.runInContext(fs.readFileSync('app-hall-fame.js','utf8'),c);return c;}
const row=(nick,count,month='10.2026')=>({nick,value:count,valueText:count+' побед',detailRows:Array.from({length:count},()=>({_monthKey:month,_reward:100}))});
test('each category contributes one monthly award rather than underlying wins',()=>{
 const c=context(),data={dayHero:[row('ManyWins',100)],king:[row('Collector',1)],big50:[row('Collector',1)],big100:[row('Collector',1)]};
 const spec=c.hallFishPlayerMonthSpec(data,'10.2026');assert.equal(spec.rows[0].nick,'Collector');assert.equal(spec.rows[0].value,3);assert.equal(spec.rows[1].value,1);assert.equal(spec.rows[0].detailRows.length,3);assert.equal(new Set(spec.rows[0].awardTitles).size,3);
});
test('winner selection uses the selected month, includes game categories, and excludes unshown awards',()=>{
 const c=context(),data={king:[row('Old',8,'09.2026'),row('New',1)],goldenBall:[row('New',1)],billiardsKing:[row('New',2)],clubChoice:[row('Other',99)],sngChampion:[row('Other',99)]};
 assert.equal(c.hallFishPlayerMonthSpec(data,'10.2026').rows[0].nick,'New');assert.equal(c.hallFishPlayerMonthSpec(data,'10.2026').rows[0].value,2);assert.equal(c.hallFishPlayerMonthSpec(data,'09.2026').rows[0].nick,'Old');
 for(const month of ['11.2026','all'])assert.equal(c.hallFishPlayerMonthSpec(data,month).rows.length,0);
 assert.equal(c.hallFishPlayerMonthSpec({...data,pendingExtras:true},'10.2026').rows.length,0);
});
test('equal totals preserve joint leadership and the main card precedes regular awards',()=>{
 const c=context(),data={dayHero:[row('Alpha',20)],king:[row('Beta',1)]};c.hallFishActiveDayHeroMonth='10.2026';
 const spec=c.hallFishPlayerMonthSpec(data,'10.2026'),card=c.hallFishPlayerMonthCardHtml(spec,'playerMonth',data);assert.match(card,/Совместное лидерство/);assert.match(card,/Alpha/);assert.match(card,/Beta/);
 c.hallFishActiveAchievementTab='playerMonth';const html=c.hallFishRenderAchievementRows(data);assert.ok(html.indexOf('data-hall-fish-achievement-tab="playerMonth"')<html.indexOf('data-hall-fish-achievement-tab="dayHero"'));assert.match(html,/hall-fish-achievement-preview/);c.hallFishAchievementDetailsOpen=true;assert.match(c.hallFishRenderAchievementRows(data),/Одна итоговая награда/);
});
test('overview keeps only three rows per category and complete rankings require Details',()=>{
 const c=context(),data={king:[row('One',5),row('Two',4),row('Three',3),row('Four',2)]};c.hallFishActiveDayHeroMonth='10.2026';const preview=c.hallFishAchievementPreviewHtml(c.hallFishAchievementSpecs(data).find(s=>s.key==='king'),data);assert.equal((preview.match(/<li>/g)||[]).length,3);assert.doesNotMatch(preview,/Four/);assert.match(preview,/Подробнее/);const overview=c.hallFishRenderAchievementRows(data);assert.doesNotMatch(overview,/class="hall-fish-achievement-section"/);c.hallFishActiveAchievementTab='king';c.hallFishAchievementDetailsOpen=true;const detail=c.hallFishRenderAchievementRows(data);assert.match(detail,/Four/);assert.match(detail,/К наградам/);assert.doesNotMatch(detail,/hall-fish-achievement-tabs--matrix/);
});

test('equal awards use all monthly tournament prizes without counting overlapping awards twice',()=>{
 const c=context(),data={dayHero:[row('Alpha',20)],king:[row('Beta',1)],topWin:[
  {...row('Alpha',1),detailRows:[{_monthKey:'10.2026',_reward:100},{_monthKey:'09.2026',_reward:99999}]},
  {...row('Beta',1),detailRows:[{_monthKey:'10.2026',_reward:60},{_monthKey:'10.2026',_reward:60}]}]};
 // Alpha wins dayHero/topWin; Beta wins king/monthly prize total.
 c.hallFishActiveDayHeroMonth='10.2026';
 const spec=c.hallFishPlayerMonthSpec(data,'10.2026');
 assert.equal(spec.rows[0].nick,'Beta');assert.equal(spec.rows[0].value,2);assert.equal(spec.rows[0].tie,120);
 assert.equal(spec.rows[1].value,2);assert.equal(spec.rows[1].tie,100);assert.equal(spec.rows[1].rank,2);
 const card=c.hallFishPlayerMonthCardHtml(spec,'playerMonth',data);assert.doesNotMatch(card,/Совместное лидерство/);
});

test('monthly prize category ranks all paid players and previews the top three',()=>{
 const c=context(),data={monthChampion:[row('Winner',1)],topWin:[
  {...row('One',1),detailRows:[{_monthKey:'10.2026',_reward:100},{_monthKey:'10.2026',_reward:50}]},
  {...row('Two',1),detailRows:[{_monthKey:'10.2026',_reward:120}]},
  {...row('Three',1),detailRows:[{_monthKey:'10.2026',_reward:80}]},
  {...row('Four',1),detailRows:[{_monthKey:'10.2026',_reward:40},{_monthKey:'09.2026',_reward:1000}]}]};
 c.hallFishActiveDayHeroMonth='10.2026';
 const spec=c.hallFishAchievementSpecs(data).find(s=>s.key==='monthChampion');
 const rows=c.hallFishAchievementRowsForMonth(spec,'10.2026');
 assert.deepEqual(Array.from(rows,r=>r.nick),['One','Two','Three','Four']);assert.equal(rows[0].value,150);
 const preview=c.hallFishAchievementPreviewHtml(spec,data);assert.equal((preview.match(/<li>/g)||[]).length,3);assert.doesNotMatch(preview,/Four/);
});
