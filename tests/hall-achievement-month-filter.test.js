'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
function context(){const c={console,URLSearchParams,URL,window:{addEventListener(){}},document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}},setTimeout(){},clearTimeout(){},localStorage:{getItem(){return null;}},location:{search:''}};vm.createContext(c);vm.runInContext(fs.readFileSync('app-hall-fame.js','utf8'),c);return c;}
test('month filter sits above trophies and applies to every award including late-loaded services',()=>{
 const c=context(),rows=[];for(let i=0;i<12;i++)for(let n=0;n<2;n++)rows.push({nick:'Old'+i,date:'01.09.2026',reward:60000,place:1});rows.push({nick:'October',date:'02.10.2026',reward:200000,place:1});
 c.pokerRatingAchievementAllTournamentRows=()=>rows;const data=c.hallFishAggregateTournamentAchievements([]);
 data.clubChoice=c.hallFishAggregateClubChoiceRows([{month:'2026-09',winners:[{nick:'Voter',votes:20,description:'September'}]},{month:'2026-10',winners:[{nick:'Voter',votes:3,description:'October'}]}],[]);
 data.sngChampion=c.hallFishAggregateSngChampionRows([{completedAt:'2026-09-01T12:00:00Z',winners:[{nick:'Sng',place:1}]},{completedAt:'2026-10-01T12:00:00Z',winners:[{nick:'Sng',place:1}]}],[]);
 c.hallFishActiveDayHeroMonth='10.2026';
 for(const spec of c.hallFishAchievementSpecs(data)){
  const filtered=c.hallFishAchievementRowsForMonth(spec,'10.2026');for(const row of filtered){if(spec.key!=='topWin')assert.equal(row.value,row.detailRows.length);assert.ok(row.detailRows.every(d=>d._monthKey==='10.2026'));}
  c.hallFishActiveAchievementTab=spec.key;const html=c.hallFishRenderAchievementRows(data);assert.ok(html.indexOf('class="hall-fish-day-hero-months ')<html.indexOf('class="hall-fish-achievement-tabs-shell"'));assert.match(html,/Месяц для всех ачивок/);assert.match(html,/10\.2026/);assert.equal(c.hallFishActiveDayHeroMonth,'10.2026');
 }
 const specs=c.hallFishAchievementSpecs(data);assert.equal(specs.length,8);for(const removed of ['clubChoice','sngChampion','viceChampion']){assert.ok(!specs.some(s=>s.key===removed));}
 assert.equal(c.hallFishAchievementRowsForMonth(specs.find(s=>s.key==='king'),'10.2026')[0].nick,'October');
 assert.equal(c.hallFishAchievementRowsForMonth(specs.find(s=>s.key==='big50'),'10.2026').length,0);
});
test('each hologram uses the selected month leader and shows no invented winner for empty months',()=>{
 const c=context(),spec={key:'king',rows:[{nick:'SeptemberLeader',value:7,valueText:'7 побед',detailRows:Array.from({length:7},()=>({_monthKey:'09.2026',_reward:100}))},{nick:'OctoberLeader',value:2,valueText:'2 побед',detailRows:Array.from({length:2},()=>({_monthKey:'10.2026',_reward:200}))}]};
 c.hallFishActiveDayHeroMonth='09.2026';let html=c.hallFishAchievementLeaderHtml(spec);assert.match(html,/SeptemberLeader/);assert.doesNotMatch(html,/OctoberLeader/);
 c.hallFishActiveDayHeroMonth='10.2026';html=c.hallFishAchievementLeaderHtml(spec);assert.match(html,/OctoberLeader/);assert.match(html,/2 побед/);assert.doesNotMatch(html,/SeptemberLeader/);
 c.hallFishActiveDayHeroMonth='11.2026';html=c.hallFishAchievementLeaderHtml(spec);assert.match(html,/Пока нет наград/);assert.doesNotMatch(html,/SeptemberLeader|OctoberLeader/);
});

test('top win ranks the largest single payout in the selected month, including prizes below 50k',()=>{
 const c=context();c.pokerRatingAchievementAllTournamentRows=()=>[{nick:'A',date:'01.09.2026',reward:500000,place:2},{nick:'A',date:'01.10.2026',reward:15000,place:2},{nick:'B',date:'02.10.2026',reward:20000,place:3},{nick:'B',date:'03.10.2026',reward:19000,place:4}];
 const data=c.hallFishAggregateTournamentAchievements([]),spec=c.hallFishAchievementSpecs(data).find(s=>s.key==='topWin');
 assert.equal(spec.rows[0].nick,'A');assert.equal(spec.rows[0].value,500000);
 const october=c.hallFishAchievementRowsForMonth(spec,'10.2026');assert.equal(october[0].nick,'B');assert.equal(october[0].value,20000);assert.equal(october[0].rank,1);assert.equal(october[1].value,15000);
 assert.equal(c.hallFishAchievementRowsForMonth(spec,'11.2026').length,0);
});
test('billiards trophies select the monthly leader from successful shots and paid wins',()=>{
 const c=context();for(const key of ['goldenBall','billiardsKing']){const spec={key,rows:[{nick:'A',value:5,valueText:'5 побед',detailRows:[{_monthKey:'10.2026'}]},{nick:'B',value:3,valueText:'3 побед',detailRows:[{_monthKey:'11.2026'},{_monthKey:'11.2026'}]}]};const rows=c.hallFishAchievementRowsForMonth(spec,'11.2026');assert.equal(rows.length,1);assert.equal(rows[0].nick,'B');assert.equal(rows[0].value,2);assert.equal(rows[0].rank,1);}
});
