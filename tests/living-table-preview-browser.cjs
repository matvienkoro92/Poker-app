const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({args:['--enable-unsafe-swiftshader']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('http://cue-room.test/**',r=>{if(new URL(r.request().url()).pathname==='/api/billiards')return r.fulfill({json:{ok:true,allowed:true}});const f=path.join(process.cwd(),new URL(r.request().url()).pathname);return fs.existsSync(f)&&fs.statSync(f).isFile()?r.fulfill({path:f}):r.fulfill({contentType:'text/html',body:'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body></body>'});});await p.goto('http://cue-room.test/fixture');for(const css of ['styles-base.css','styles-player-hall.css','styles-player-lounge.css'])await p.addStyleTag({url:'http://cue-room.test/'+css});for(const js of ['app-garage-catalog.js','app-billiards-tables.js','app-billiards-cues.js','app-player-hall-equipment.js'])await p.addScriptTag({url:'http://cue-room.test/'+js});await p.evaluate(()=>{window.__pokerTelegramAuth={status:'verified',id:'123456789'};window.pokerEnsureLazyDomains=async()=>{};window.pokerSocialRequest=async(resource)=>resource==='board-games'?{equipment:{nardsBoard:'compass',checkers:'brass',board:'marble-brass',pieces:'arabesque'}}:({hall:{accountId:'room-owner',name:'Герой',nick:'ПокерМанки',self:true,billiardsAccess:true,livingAccess:true,featured:[],items:[],themes:[],goals:[],achievementProgress:[],wins:3,theme:'walnut',garage:{stats:{level:80},loadout:{...PokerGarage.defaults}},levelProgress:{xp:100,target:200}}});localStorage.setItem('p21:billiards:cue:v1:room-owner','ruby');});await p.addScriptTag({url:'http://cue-room.test/app-player-hall.js'});await p.evaluate(()=>window.pokerOpenVillaGameRoom('nards'));await p.waitForSelector('.player-hall__room[data-space=living]');
assert.equal(await p.locator('[data-living-menu=chess]').isDisabled(),true);for(const game of ['nards']){
 await p.locator('[data-living-menu='+game+']').click();await p.waitForSelector('.living-board-focus[data-game='+game+']');await p.waitForTimeout(700);
 const board=p.locator('.living-board-focus .living-top-board');
 assert.equal(await board.getAttribute('data-board'),game==='nards'?'compass':'marble-brass');
 assert.equal(await board.getAttribute('data-pieces'),game==='nards'?'brass':'arabesque');
 assert.equal(await board.locator(game==='nards'?'.living-preview-checker':'.piece').count(),game==='nards'?30:32);
 if(game==='nards'){assert.equal(await board.locator('.living-preview-well').count(),24);assert.equal(await board.locator('.living-nards-storage').count(),2);assert.equal(await board.locator('.nards-storage-slots i').count(),30);
  const long=p.locator('.living-focus-play [data-living-game=long]'),short=p.locator('.living-focus-play [data-living-game=short]');
  const longBox=await long.boundingBox(),shortBox=await short.boundingBox(),toolsBox=await p.locator('.living-focus-tools').boundingBox();
  assert.ok(longBox.x<shortBox.x);assert.ok(longBox.y+longBox.height<toolsBox.y);assert.equal(Math.round(longBox.y),Math.round(shortBox.y));
  const toggle=p.locator('[data-living-board-toggle]');assert.equal(await toggle.textContent(),'Закрыть');assert.equal(await p.locator('[data-living-board-flip]').count(),0);
  await toggle.click();assert.equal(await toggle.textContent(),'Открыть');assert.equal(await toggle.getAttribute('aria-expanded'),'false');await p.waitForTimeout(950);
  assert.equal(await board.getAttribute('data-closed'),'true');assert.notEqual(await board.locator('.living-nards-lid').evaluate(e=>getComputedStyle(e).transform),'none');
  await p.screenshot({path:'/private/tmp/nards-closed-mobile.png'});
  await toggle.click();await p.waitForTimeout(950);assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await board.getAttribute('data-closed'),'false');
  assert.equal(await board.locator('.living-preview-checker').count(),30);
 }else{
  const before=await board.evaluate(e=>getComputedStyle(e).transform);
  await p.locator('[data-living-board-flip]').click();await p.waitForTimeout(600);assert.notEqual(await board.evaluate(e=>getComputedStyle(e).transform),before);
  await p.locator('[data-living-board-flip]').click();await p.waitForTimeout(600);assert.equal(await p.locator('[data-living-board-flip]').getAttribute('aria-pressed'),'false');
 }
 fs.mkdirSync('output/nards-slots',{recursive:true});if(game==='nards')await board.screenshot({path:'output/nards-slots/lounge-board.png'});
 await p.screenshot({path:'output/shared-games/living-'+game+'-top.png'});
 await p.route('**/board-games-play.html?**',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><body></body>'}));
 await p.locator('.living-board-focus [data-living-equipment]').click();
 const updated=game==='nards'?{nardsBoard:'wolves',checkers:'obsidian',board:'marble-brass',pieces:'arabesque'}:{nardsBoard:'wolves',checkers:'obsidian',board:'ice-crystal',pieces:'crystal'};
 await p.evaluate(equipment=>{const frame=document.querySelector('.billiards-shell iframe');window.dispatchEvent(new MessageEvent('message',{origin:location.origin,source:frame.contentWindow,data:{type:'p21-board-games-equipment',equipment}}));window.dispatchEvent(new MessageEvent('message',{origin:location.origin,source:frame.contentWindow,data:{type:'p21-board-games-close'}}));},updated);
 assert.equal(await board.getAttribute('data-board'),game==='nards'?'wolves':'ice-crystal');
 assert.equal(await board.getAttribute('data-pieces'),game==='nards'?'obsidian':'crystal');

 await p.locator('[data-living-focus-close]').click();await p.locator('.living-board-focus').waitFor({state:'detached'});assert.equal(await p.locator('.living-board-focus').count(),0);assert.equal(await p.locator('[data-living-menu='+game+']').evaluate(e=>document.activeElement===e),true);
}
assert.deepEqual(errors,[]);console.log('PASS selected nards/chess equipment, 30 checkers / 32 pieces, nards hinge closes/opens, chess flips and return to the correct table');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
