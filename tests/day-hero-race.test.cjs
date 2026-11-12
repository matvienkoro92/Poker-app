'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('fs');
const source=fs.readFileSync('app-home-friend-news.js','utf8'),helpers=source.slice(source.indexOf('  var heroRaceVehicles'),source.indexOf('  function renderModalList'));
function fixture(){const c={window:{PokerGarage:require('../app-garage-catalog')},esc:s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'),clubCurrentHeroMonth:()=>({month:11,year:2026}),clubHeroMonthLabel:()=> 'ноября',setTimeout(){},Map,AbortSignal};vm.createContext(c);vm.runInContext(helpers,c);return c;}
test('race shows only the leading four, keeps hero counts and tie prize amounts distinct from the 30000 award',()=>{
 const c=fixture(),players=Array.from({length:5},(_,i)=>({nick:i===0?'Лидер <img>':'Игрок '+i,wins:5-i,reward:100000-i*1000})),html=c.clubHeroRaceHtml(players);
 assert.equal((html.match(/data-hero-race-vehicle=/g)||[]).length,4);assert.ok(!html.includes('Игрок 4'));assert.ok(html.includes('Герой дня × 5'));assert.ok(html.includes('30 000 ₽'));assert.ok(html.includes('Лидер &lt;img>'));assert.ok(html.includes('по призовым за эти дни'));
 const progress=[...html.matchAll(/data-hero-race-vehicle="[^"]*" style="--race-progress:([\d.]+)/g)].map(m=>Number(m[1]));assert.equal(progress.length,4);assert.ok(progress.every((v,i)=>v>0&&v<1&&(!i||v<progress[i-1])));
});
test('top-down car uses saved paint, chassis and number, with a separate shape for personal bicycle',()=>{
 const c=fixture(),red=c.heroRaceCarSvg({selectedTransport:'kart',garage:{loadout:{paint:'ruby',chassis:'formula',number:'А123БВ'}}}),green=c.heroRaceCarSvg({selectedTransport:'kart',garage:{loadout:{paint:'classic'}}}),bike=c.heroRaceCarSvg({selectedTransport:'bicycle',garage:{loadout:{paint:'ruby'}}});
 assert.ok(red.includes('#a62d3b'));assert.ok(red.includes('А123БВ'));assert.ok(red.includes('M109 8V48'));assert.ok(green.includes('#186943'));assert.ok(!green.includes('M109 8V48'));assert.ok(bike.includes('M20 28H94'));assert.ok(c.heroRaceCarSvg(null).includes('Транспорт…'));
});
