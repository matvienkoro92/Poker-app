const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch();try{
const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route('http://darts.test/**',r=>{
 const pathname=new URL(r.request().url()).pathname;
 if(pathname.startsWith('/api/'))return r.fulfill({json:{ok:true,adminGameAccess:true}});
 const f=path.join(process.cwd(),pathname);
 return fs.existsSync(f)&&fs.statSync(f).isFile()?r.fulfill({path:f}):r.fulfill({contentType:'text/html',body:'<meta name="viewport" content="width=device-width,initial-scale=1"><body style="background:#18271f"></body>'});
});
await p.goto('http://darts.test/');await p.addStyleTag({path:'styles-player-hall.css'});await p.addScriptTag({path:'app-villa-darts.js'});await p.clock.install();await p.evaluate(()=>PokerDarts.open());await p.clock.runFor(50);
async function start(mode='solo'){await p.locator('[data-mode="'+mode+'"]').click();await p.locator('[data-setup-next]').click();await p.locator('[data-setup-next]').click();await p.waitForFunction(()=>!document.querySelector('.villa-darts__game').hidden,null,{polling:50});}
await start();
async function swipe(lift=100,side=0){const box=await p.locator('.villa-darts__gesture').boundingBox(),board=await p.locator('.villa-darts__board').boundingBox(),x=box.x+box.width/2,y=box.y+box.height*.92;await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+side*board.width/400,y-lift*board.width/400,{steps:8});await p.mouse.up();}
// A tap cannot score; a cancelled gesture cannot score either.
await p.locator('.villa-darts__gesture').click();await p.clock.runFor(1200);assert.equal(await p.locator('[data-darts-player="0"] strong').innerText(),'0');
const lane=await p.locator('.villa-darts__gesture').boundingBox();await p.mouse.move(lane.x+30,lane.y+30);await p.mouse.down();await p.locator('.villa-darts__gesture').dispatchEvent('pointercancel',{pointerId:1});await p.mouse.up();
await swipe();await p.clock.runFor(1150);assert.equal(await p.locator('[data-darts-player="0"] strong').innerText(),'60');assert.match(await p.locator('[data-darts-feedback]').innerText(),/Ровный/);
await swipe(55);await p.clock.runFor(1150);assert.match(await p.locator('[data-darts-feedback]').innerText(),/Слабый/);
// Keyboard is a timed release, not a click-to-hit shortcut.
await p.locator('[data-darts-throw]').focus();await p.keyboard.down('Space');await p.clock.runFor(650);await p.keyboard.up('Space');await p.clock.runFor(1150);await p.clock.runFor(6500);
for(let n=3;n<15;n++){await swipe();await p.clock.runFor(1150);if(n%3===2)await p.clock.runFor(6500);}
await p.clock.runFor(7000);assert.equal(await p.locator('[data-darts-throw]').innerText(),'Сыграть ещё');assert.match(await p.locator('[data-darts-status]').innerText(),/побед|Ничья/);
await p.locator('[data-darts-throw]').click();await p.waitForFunction(()=>document.querySelector('[data-darts-player="0"] strong').textContent==='0',null,{polling:50});
await swipe();await p.locator('[data-darts-close]').click();await p.clock.runFor(10000);assert.equal(await p.locator('.villa-darts').count(),0);
await p.evaluate(()=>PokerDarts.open());
// Training accepts throws for both sides, and ignores the competitive clock.
await start('training');await p.clock.runFor(70000);assert.equal(await p.locator('[data-darts-player="0"] strong').innerText(),'0');for(let n=0;n<3;n++){await swipe();await p.clock.runFor(1150);}assert.match(await p.locator('[data-darts-status]').innerText(),/Игрок 2/);await swipe();await p.clock.runFor(1150);assert.equal(await p.locator('[data-darts-player="1"] strong').innerText(),'60');
await p.locator('[data-darts-menu]').click();await p.locator('.villa-darts__panel button').filter({hasText:'Подтвердить'}).click();await p.locator('[data-menu-stats]').click();assert.match(await p.locator('.villa-darts__panel > p').first().innerText(),/Сыграно: 2/);await p.locator('.villa-darts__panel > button').last().click();
// Back navigation preserves the selected format; surrender ends the current game.
await p.locator('[data-mode="solo"]').click();await p.locator('[data-setup-next]').click();await p.locator('[data-format="3"]').click();await p.locator('[data-setup-back]').click();await p.locator('[data-setup-next]').click();assert.equal(await p.locator('[data-format="3"]').getAttribute('aria-pressed'),'true');await p.locator('[data-setting="first"]').selectOption('1');await p.locator('[data-setup-next]').click();await p.waitForFunction(()=>!document.querySelector('.villa-darts__game').hidden,null,{polling:50});await p.clock.runFor(6500);assert.match(await p.locator('[data-darts-status]').innerText(),/Ваш бросок/);await p.locator('[data-darts-resign]').click();await p.locator('.villa-darts__panel button').filter({hasText:'Подтвердить'}).click();assert.equal(await p.locator('[data-darts-throw]').innerText(),'Следующая партия');await p.locator('[data-darts-menu]').click();
fs.mkdirSync('output/villa-living',{recursive:true});
for(const [width,height]of [[390,844],[320,568],[844,390]]){await p.setViewportSize({width,height});const box=await p.locator('.villa-darts').boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=width+1&&box.y+box.height<=height+1);assert.equal(await p.locator('.villa-darts').evaluate(e=>e.scrollWidth<=e.clientWidth),true);await p.screenshot({path:`output/villa-living/darts-swipe-${width}.png`});}
assert.deepEqual(errors,[]);console.log('PASS menu/back, settings, training both sides, series, surrender, stats, swipe, keyboard, full match, restart, close and responsive layouts');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
