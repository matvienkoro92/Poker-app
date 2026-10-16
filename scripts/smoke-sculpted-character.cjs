const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path');
(async()=>{const browser=await chromium.launch({args:['--enable-unsafe-swiftshader']});try{
 const page=await browser.newPage({viewport:{width:520,height:900},deviceScaleFactor:1,reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('404'))errors.push(m.text());});
 await page.route('https://sculpt.test/**',r=>{const file=path.join(process.cwd(),new URL(r.request().url()).pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?r.fulfill({path:file,...(/\.js$/.test(file)?{contentType:'text/javascript; charset=utf-8'}:{})}):r.fulfill({contentType:'text/html',body:'<html></html>'});});
 await page.goto('https://sculpt.test/');await page.setContent('<meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;background:#20252a}#stage{width:100vw;height:100vh;background:radial-gradient(ellipse at 50% 30%,#4b4843,#171b20 75%)}canvas{display:block}</style><div id="stage"></div>');
 for(const file of ['app-garage-catalog.js','app-garage-3d.js'])await page.addScriptTag({url:'/'+file});
 await page.evaluate(async look=>{window.viewer=await pokerCreateReferenceCharacter3D(document.querySelector('#stage'),{...PokerGarage.defaults,suit:'acesTee',pants:'sandShorts',shoes:'ruby',...look},{snapshotOnly:true});},JSON.parse(process.env.CHARACTER_LOOK||'{}'));
 const views=(process.env.CHARACTER_VIEWS||'front,quarter,side,back').split(','),yaw={front:0,quarter:.65,side:Math.PI/2,back:Math.PI};
 for(const view of views){await page.evaluate(v=>viewer.setYaw(v),yaw[view]);await page.screenshot({path:'output/character-3d-study/'+(process.env.CHARACTER_LABEL||'sculpt')+'-'+view+'.png'});}
 await page.evaluate(()=>viewer.dispose());if(errors.length)throw Error(errors.join('\n'));console.log('Sculpted anatomy, materials and orbit rendered without errors: '+views.join(', '));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
