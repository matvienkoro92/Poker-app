'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
function context(){const c={console,URLSearchParams,URL,window:{addEventListener(){}},document:{getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}},setTimeout(){},clearTimeout(){},localStorage:{getItem(){return null;}},location:{search:''}};vm.createContext(c);vm.runInContext(fs.readFileSync('app-hall-fame.js','utf8'),c);return c;}

test('top-three prize totals include only tournaments counted for the selected achievement month',()=>{
 const c=context();c.hallFishActiveDayHeroMonth='11.2026';
 const spec={key:'dayHero',rows:[{nick:'Luck_is_Suck',value:3,valueText:'3 раза',detailRows:[{_monthKey:'10.2026',_reward:90000},{_monthKey:'11.2026',_reward:12000},{_monthKey:'11.2026',_reward:18000}]}]};
 const html=c.hallFishAchievementPreviewHtml(spec,{});
 assert.match(html,/hall-fish-achievement-preview__amount/);assert.match(html,/\(30\s000 ₽\)/);assert.doesNotMatch(html,/120\s000/);assert.match(html,/>2 раза<\/strong>/);
 const total=c.hallFishAchievementPreviewHtml({key:'playerMonth',rows:[{nick:'Luck_is_Suck',tie:42000,value:3,detailRows:[{_monthKey:'11.2026'}]}]},{});
 assert.match(total,/\(42\s000 ₽\)/);
});
