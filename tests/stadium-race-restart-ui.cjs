// Detailed facade atlases and touring bodywork: keep the mobile scene below 350 draw calls.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});assert.equal(await p.locator('.race3d-dialog').isVisible(),false);await p.waitForFunction(()=>testRace.tick>0);


 await p.getByRole('button',{name:'Пауза',exact:true}).click();
 const lives=await p.locator('#storyLives').getAttribute('aria-label');
 await p.evaluate(()=>{testRace.distance=25000;testRace.score=900;testRace.hits=2;testRace.item='rocket';testRace.nitro=12;testRace.air=24;});
 fs.mkdirSync('output/stadium-race-hud',{recursive:true});await p.screenshot({path:'output/stadium-race-hud/restart.png'});
 await p.getByRole('button',{name:'Начать заново',exact:true}).click();
 const reset=await p.evaluate(()=>({distance:testRace.distance,countdown:testRace.countdown,score:testRace.score,hits:testRace.hits,item:testRace.item,nitro:testRace.nitro,air:testRace.air,transport:testRace.transport,rivals:testRace.rivals.map(r=>r.distance)}));
 assert.equal(reset.distance,0);assert.ok(reset.countdown>0);assert.equal(reset.score,0);assert.equal(reset.hits,0);assert.equal(reset.item,null);assert.equal(reset.nitro,100);assert.equal(reset.air,0);assert.equal(reset.transport,'bmw-e60');assert.deepEqual(reset.rivals,[55,110,165]);assert.equal(await p.locator('#storyLives').getAttribute('aria-label'),lives);assert.equal(await p.locator('.race3d-dialog').isVisible(),false);
 assert.deepEqual(errors,[]);await p.evaluate(()=>StoryArcade.stop());console.log('PASS restart resets complete race, keeps vehicle and lives');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
