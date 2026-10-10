'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const trophies=require('../app-hall-trophies');
const item=(tournament,place=1)=>({kind:'cups',history:{tournament,results:[{place}]}});
test('winner trophies recognize club event names and emoji aliases',()=>{
 const cases=[['Турнир Понедельника MKO 7MAX','monday'],['Магия Тракториста🚜','tuesday'],['Счастливый Косарь','wednesday'],['Турнир Четверга 🏆🚀','thursday'],['Пятница Прогрессив','friday'],['Субботний Прогрессив','saturday'],['Воскресний турнир 🏆','sunday'],['Турнир Месяца🏆','month'],['💥Big Boss💥','boss'],['💸Fantastic Boss💸','fantastic'],['CRAZY MAIN EVENT','crazy'],['ПЯТИХАТКА МОК','fivehundred'],['Субботний Фриролл','freeroll']];
 for(const [name,id] of cases)assert.equal(trophies.forItem(item(name)),trophies.assets[id]+'?v=20261011',name);
 assert.equal(new Set(cases.map(([n])=>trophies.forItem(item(n)))).size,cases.length);
});
test('all nonwinner rewards keep their existing art',()=>{
 for(const place of [2,3,4,7,10])assert.equal(trophies.forItem(item('Big Boss',place)),'');
 assert.equal(trophies.forItem({kind:'achievements',id:'millionaire'}),'');
});
test('historic external tournaments receive stable individual engraved awards',()=>{
 const a=trophies.forItem(item('DV Rebuy')),b=trophies.forItem(item('Tournament PLO6'));
 assert.ok(a.startsWith('data:image/svg+xml'));assert.notEqual(a,b);assert.equal(a,trophies.forItem(item('DV Rebuy')));
 assert.ok(!decodeURIComponent(trophies.forItem(item('<script> & unusual'))).includes('<script>')); 
});
