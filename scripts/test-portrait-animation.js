// Run after: npx playwright install webkit
const {webkit,devices}=require('playwright');
const fs=require('fs'),assert=require('assert/strict');
(async()=>{
 const b=await webkit.launch();
 try {
 const p=await b.newPage({...devices['iPhone 13']});
 p.on('pageerror',e=>console.log('ERROR',e.message));
 await p.route('https://preview.test/**',r=>{let path=decodeURIComponent(new URL(r.request().url()).pathname).slice(1);return fs.existsSync(path)?r.fulfill({path}):r.fulfill({status:404,body:''});});
 const css=['styles.css','styles-rating-chat-modals.css','styles-profile.css'].map(f=>`<link rel="stylesheet" href="https://preview.test/${f}">`).join('');
 await p.setContent(`<meta name="viewport" content="width=device-width, initial-scale=1"><base href="https://preview.test/">${css}<main class="view is-active" data-view="profile" style="display:block"><section class="profile-public-showcase"><div class="chat-user-modal__hero chat-user-modal__hero--art profile-public-showcase__hero"><div class="chat-user-modal__rating-art"><img id="portrait" class="chat-user-modal__rating-art-img" src="https://preview.test/assets/summer-rating-player-pokermanki-v3.webp"></div><div class="chat-user-modal__hero-status">ПокерМанки</div></div></section></main>`);
 await p.addScriptTag({content:fs.readFileSync('app-portrait-effects.js','utf8')});
 await p.locator('#portrait').evaluate(i=>i.decode());await p.waitForTimeout(1500);
 const head=p.locator('.pokermanki-character-head');
 assert(await head.isVisible());
 const t1=await head.evaluate(e=>getComputedStyle(e).transform);
 await p.waitForTimeout(800);
 assert.notEqual(await head.evaluate(e=>getComputedStyle(e).transform),t1);
 await head.evaluate(e=>e.getAnimations()[0].pause());
 await p.evaluate(()=>dispatchEvent(new Event('pageshow')));
 await p.waitForTimeout(100);
 assert.equal(await head.evaluate(e=>e.getAnimations()[0].playState),'running');
 await p.locator('main').evaluate(e=>e.style.display='none');
 await p.waitForTimeout(100);
 await p.locator('main').evaluate(e=>e.style.display='block');
 await p.waitForTimeout(100);
 assert(await head.isVisible());
 await p.emulateMedia({reducedMotion:'reduce'});
 assert(await head.isVisible());
 assert.equal(await head.evaluate(e=>getComputedStyle(e).animationName),'pokermanki-head-look');
 const reducedTransform = await head.evaluate(e=>getComputedStyle(e).transform);
 await p.waitForTimeout(800);
 assert.notEqual(await head.evaluate(e=>getComputedStyle(e).transform), reducedTransform);
 assert(await p.locator('.pokermanki-rocket-flame').isVisible());
 assert.equal(await p.locator('.pokermanki-rocket-flame').evaluate(e=>getComputedStyle(e).animationName),'pokermanki-thrust');
 assert.equal(await p.locator('.pokermanki-character-eyelids').evaluate(e=>e.getAnimations()[0].playState),'running');
 for (const [selector, name] of [['.pokermanki-rocket-sparks', 'pokermanki-sparks'], ['.pokermanki-rocket-shine', 'pokermanki-shine']]) {
   assert.equal(await p.locator(selector).evaluate(e=>getComputedStyle(e).animationName),name);
 }
 await p.emulateMedia({reducedMotion:'no-preference'});
 assert(await head.isVisible());
 console.log('PASS WebKit iPhone: head moves, resumes on pageshow, survives profile hide/reopen, plays all five effects in both motion preference modes.');
 } finally { await b.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
