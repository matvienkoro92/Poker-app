'use strict';
const {chromium}=require('playwright'),fs=require('fs'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch();try{for(const entry of ['home','players']){const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.setContent('<section id="homePlayerMonth"></section>');await p.addScriptTag({content:fs.readFileSync('app-hall-fame.js','utf8')+`
hallFishEnsureAchievementRatingData=()=>Promise.resolve(true);
hallFishAchievementRatingDataReady=()=>true;
hallFishLoadRows=()=>Promise.resolve([]);
hallFishLoadClubChoiceAchievementRows=()=>Promise.resolve([]);
hallFishLoadReferralRows=()=>Promise.resolve([]);
hallFishLoadSngChampionAchievementRows=()=>Promise.resolve([]);
hallFishLoadBilliardsAchievementRows=()=>new Promise(r=>window.finishBilliards=r);
hallFishLoadNardsAchievementRows=()=>new Promise(r=>window.finishNards=r);
`});await p.waitForFunction(()=>window.finishNards&&document.querySelector('.home-player-month__watch'));if(entry==='home')await p.locator('.home-player-month__watch').click();else await p.evaluate(()=>openHallFishAchievementTab());await p.waitForFunction(()=>!document.getElementById('hallFishRatingModal').hidden);await p.evaluate(()=>{hallFishAchievementRowsCache=null;finishNards({nardsKing:[]});finishBilliards({goldenBall:[]});});await p.waitForFunction(()=>hallFishAchievementRowsCache?.pendingExtras===false);assert.doesNotMatch(await p.locator('#hallFishRatingBody').innerText(),/Считаем итоговые|Загружаем результаты/);assert.deepEqual(errors,[]);await p.close();console.log('PASS '+entry+' entry completes after cache invalidation');}}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
