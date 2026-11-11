'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),wizard=require('./helpers/board-wizard.cjs');
(async()=>{const browser=await chromium.launch();try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2}),measurements=[];await page.route('http://width.test/**',r=>{const u=new URL(r.request().url());if(u.pathname==='/api/billiards')return r.fulfill({json:{ok:true}});if(u.pathname==='/api/board-games')return r.fulfill({json:{ok:true,allowed:true,level:100,equipment:{nardsBoard:'arctic-ice',nardsInterior:'arctic-ice',checkers:'arctic-ice',nardsDice:'arctic-ice'}}});const f=path.join(process.cwd(),u.pathname);return fs.existsSync(f)&&fs.statSync(f).isFile()?r.fulfill({path:f}):r.fulfill({status:404});});
 for(const kind of ['short','long']){
  await page.goto('http://width.test/board-games-play.html?family=nards&game='+kind);await page.locator('#lobby').waitFor({state:'visible'});await wizard.launch(page,'training');
  for(const embed of [false,true])for(const width of [320,350,351,375,390,414,430,600]){
   await page.setViewportSize({width,height:844});await page.evaluate(embed=>document.documentElement.classList.toggle('board-tournament-embed',embed),embed);
   const box=await page.locator('#boardArea').evaluate(e=>{const b=e.getBoundingClientRect();return {left:b.left,right:b.right,width:b.width,viewport:innerWidth,scroll:document.documentElement.scrollWidth};});measurements.push({kind,embed,...box});
   if(!process.env.MEASURE_ONLY){assert.ok(Math.abs(box.left)<.6,JSON.stringify(measurements.at(-1)));assert.ok(Math.abs(box.right-width)<.6,JSON.stringify(measurements.at(-1)));assert.equal(box.scroll,width);}
  }
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.classList.remove('board-tournament-embed'));fs.mkdirSync('output/nards-width',{recursive:true});await page.screenshot({path:'output/nards-width/390-fullscreen.png',fullPage:true});fs.writeFileSync('output/nards-width/measurements.json',JSON.stringify(measurements,null,2));console.log(process.env.MEASURE_ONLY?JSON.stringify(measurements.filter(x=>x.kind==='short'&&[320,390].includes(x.viewport))):'PASS edge-to-edge nards: short/long, regular/tournament, 8 phone widths, no horizontal overflow');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
