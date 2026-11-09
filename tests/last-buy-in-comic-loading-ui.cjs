const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch();try{const p=await b.newPage({viewport:{width:393,height:852}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');
 await p.evaluate(()=>{const create=window.LastBuyInComicEngine.create;window.LastBuyInComicEngine.create=(...args)=>{window.comicTestState=create(...args);return window.comicTestState;};return window.LastBuyInComicGame.preload();});const now=Date.now();
 await p.evaluate(()=>{document.querySelector('#gameEntrance').hidden=true;playChapter(window.LastBuyInChapters.findIndex(c=>c.mode==='comic'));});
 await p.waitForFunction(()=>document.querySelector('.comic-dialog [data-start]')?.textContent==='Начать');console.log('Prepared comic ready:',Date.now()-now,'ms');await p.locator('.comic-dialog [data-start]').click();await p.screenshot({path:'/tmp/pryanik-fast.png'});assert.deepEqual(errors,[]);
 assert.equal(await p.evaluate(()=>window.comicTestState.helper.active),false);
 await p.locator('[data-helper]').click();await p.waitForFunction(()=>window.comicTestState.helper.done);
 assert.equal(await p.locator('[data-helper]').isDisabled(),true);
 assert.ok(await p.locator('.comic-objective').textContent());

 for(const width of [393,320]){await p.setViewportSize({width,height:852});const stick=await p.locator('.comic-stick').boundingBox(),attack=await p.locator('[data-action=attack]').boundingBox(),jump=await p.locator('[data-action=jump]').boundingBox();assert.ok(stick.x+stick.width<attack.x);assert.ok(attack.width>jump.width);assert.ok(jump.y+jump.height<=attack.y);assert.ok(attack.x+attack.width<=width);}
 await p.evaluate(()=>{const step=window.LastBuyInComicEngine.step;window.observedAttack=false;window.LastBuyInComicEngine.step=(s,a)=>{if(a.attack)window.observedAttack=true;return step(s,a);};});
 const attackBox=await p.locator('[data-action=attack]').boundingBox();await p.mouse.move(attackBox.x+attackBox.width/2,attackBox.y+attackBox.height/2);await p.mouse.down();await p.waitForFunction(()=>window.observedAttack);await p.mouse.up();

 const q=await b.newPage();await q.addInitScript(()=>{const set=window.setTimeout;window.setTimeout=(fn,ms,...args)=>set(fn,ms===15000?800:ms,...args);});
 await q.route('**/pryanik-comic-page-v2-fast-v1.webp',()=>{});await q.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');
 await q.evaluate(()=>{document.querySelector('#gameEntrance').hidden=true;playChapter(window.LastBuyInChapters.findIndex(c=>c.mode==='comic'));});
 await q.waitForFunction(()=>document.querySelector('.comic-dialog [data-start]')?.textContent.includes('Повторить'));await q.unroute('**/pryanik-comic-page-v2-fast-v1.webp');await q.locator('.comic-dialog [data-start]').click();await q.waitForFunction(()=>document.querySelector('.comic-dialog [data-start]')?.textContent==='Начать');
 console.log('PASS: comic art loads, game starts, stalled download can be retried');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
