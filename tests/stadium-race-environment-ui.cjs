const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{
 const p=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});
 await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));
 await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4217/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});
 await p.waitForFunction(()=>{const view=document.querySelector('.race3d-view');if(!view?.raceSnapshot)return false;document.querySelector('[data-pause]').click();document.querySelector('.race3d-dialog').hidden=true;return true;},null,{timeout:180000});
 const output='output/stadium-race-environment'+(process.env.ART_SUFFIX||'');fs.mkdirSync(output,{recursive:true});
 const checkpoints=process.env.ART_FLEET_ONLY?[['city',25100]]:process.env.ART_DETAIL_ONLY?[['stadium',1400],['street',26850],['port',27500]]:[['stadium',1400],['city',25100],['street',26850],['port',27500],['bridge',28600]];
 for(const [name,distance] of checkpoints){
  await p.evaluate(d=>{Object.assign(testRace,{distance:d,countdown:0,lateral:.45,tier:0,air:0,heading:0,velocityHeading:0,speed:6});LastBuyInRaceEngine.updateDeck(testRace,d-1);testRace.rivals.forEach((r,i)=>{r.distance=d+180+i*150;r.lateral=i%2?.6:-.4;r.tier=0;r.air=0;});},distance);
  await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const snap=await p.evaluate(()=>document.querySelector('.race3d-view').raceSnapshot());
  assert.ok(snap.drawCalls<400,`${name}: ${snap.drawCalls} draws`);assert.ok(snap.triangles<1600000,`${name}: excessive geometry ${snap.triangles}`);assert.equal(snap.distance,distance);assert.ok(Math.abs(snap.roadTextureOrigin.v-snap.roadTextureOrigin.distance*.015)<.001,'asphalt texture must stay anchored to the road');
  await p.screenshot({path:`${output}/${name}.png`});console.log(name,JSON.stringify({drawCalls:snap.drawCalls,triangles:snap.triangles,cityDepth:snap.cityDepth}));
 }
 if(!process.env.ART_FLEET_ONLY||process.env.ART_WITH_LANDSCAPE){await p.setViewportSize({width:844,height:390});await p.evaluate(()=>{testRace.distance=26850;testRace.lateral=.45;});await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await p.screenshot({path:`${output}/landscape.png`});}
 assert.deepEqual(errors,[]);await p.evaluate(()=>StoryArcade.stop());console.log('PASS environment checkpoints');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
