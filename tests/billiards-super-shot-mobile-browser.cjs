'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const root=process.cwd(),L=require('../lib/billiards-super-shot-layout');
const output=path.join(root,'output/billiards/reward-mobile');fs.mkdirSync(output,{recursive:true});
(async()=>{
 const position=await L.layout(0),shot=L.TEMPLATES[0].reference,outcome=await L.simulate(position.state,shot.angle,shot.power);
 for(const [engine,type]of [['chromium',chromium],['webkit',webkit]]){
  const browser=await type.launch(engine==='chromium'?{args:['--enable-unsafe-swiftshader']}:{});
  try{for(const [width,height]of [[320,568],[360,640],[390,844],[430,932],[844,390]]){
   const page=await browser.newPage({viewport:{width,height},isMobile:true,hasTouch:true,deviceScaleFactor:2}),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('http://reward.test/**',async route=>{const url=new URL(route.request().url());if(url.pathname==='/test')return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><link rel="stylesheet" href="/styles-billiards.css"><style>body{margin:0;background:#164e36}#game{height:100dvh}#underlying{position:fixed;inset:0}</style><main><div id="matchResult"></div><div id="game"><button id="underlying">Стол</button></div></main>'});const file=path.join(root,url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
   await page.goto('http://reward.test/test');if(width===320)await page.emulateMedia({reducedMotion:'reduce'});
   await page.evaluate(async({position,shot,outcome})=>{
    const {mountSuperShot}=await import('/scripts/billiards/super-shot-ui.mjs');let clicks=0;document.getElementById('underlying').onclick=()=>clicks++;
    window.testClicks=()=>clicks;window.bonus=mountSuperShot({hero:()=> 'ОченьДлинныйНикПобедителяБезПробелов1234567890',request:async()=>({superShot:{event:'ABCDEFGHJK:1:1',status:'finished',state:outcome.state,success:true,credited:true,reward:{cash:300,spins:5,wins:1,tokens:1}}})});
    bonus.observe({superShot:{...position,event:'ABCDEFGHJK:1:1',roomId:'ABCDEFGHJK',status:'ready'}});bonus.update(performance.now()+2000);await bonus.shoot(shot);
   },{position,shot,outcome});
   assert.equal(await page.locator('.super-shot-reward').isVisible(),false,'card stays hidden while balls move');
   assert.equal(await page.evaluate(()=>bonus.inspect().state.moving),true);
   await page.evaluate(()=>{for(let i=0;i<1801&&bonus.inspect().state.moving;i++)bonus.update(performance.now()+3000+i*34);});
   assert.equal(await page.evaluate(()=>bonus.inspect().state.moving),false);await page.locator('.super-shot-reward').waitFor({state:'visible'});await page.waitForTimeout(1000);
   const metrics=await page.evaluate(()=>{const overlay=document.querySelector('.super-shot-reward'),card=document.querySelector('.super-shot-reward__card'),button=card.querySelector('button'),r=button.getBoundingClientRect();return {viewport:[innerWidth,innerHeight],overlay:overlay.getBoundingClientRect().toJSON(),card:card.getBoundingClientRect().toJSON(),button:r.toJSON(),scroll:[card.scrollHeight,card.clientHeight],pageWidth:document.documentElement.scrollWidth,dim:getComputedStyle(overlay).backgroundColor,buttonOnTop:document.elementFromPoint(r.x+r.width/2,Math.min(innerHeight-1,r.y+r.height/2))===button};});
   assert.ok(metrics.card.x>=0&&metrics.card.right<=width+.5,engine+' card width '+JSON.stringify(metrics));assert.ok(metrics.overlay.top===0&&metrics.overlay.bottom===height,engine+' full dim coverage');assert.ok(metrics.pageWidth<=width,engine+' no horizontal page scroll');assert.match(metrics.dim,/0\.82/);assert.ok(metrics.buttonOnTop,engine+' action is visible without scrolling');assert.ok(metrics.button.height>=44,engine+' touch target size');
   await page.screenshot({path:path.join(output,engine+'-'+width+'x'+height+'.png')});
   if(width===390){await page.evaluate(()=>document.documentElement.style.setProperty('--billiards-safe-top','44px'));for(const rotated of [{width:844,height:390},{width:390,height:844}]){await page.setViewportSize(rotated);await page.waitForTimeout(100);const reach=await page.evaluate(()=>{const card=document.querySelector('.super-shot-reward__card'),button=card.querySelector('button'),r=button.getBoundingClientRect();return {top:card.getBoundingClientRect().top,bottom:r.bottom,hit:document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===button};});assert.ok(reach.top>=44);assert.ok(reach.bottom<=rotated.height);assert.ok(reach.hit);assert.equal(await page.evaluate(()=>bonus.inspect().rewardVisible),true);}}
   await page.locator('.super-shot-reward button').tap();assert.equal(await page.locator('.super-shot-reward').isVisible(),false);assert.equal(await page.evaluate(()=>testClicks()),0,'tap does not pass through');assert.equal(await page.evaluate(()=>bonus.inspect().active),true);assert.deepEqual(errors,[]);
   console.log('PASS',engine,width+'x'+height,JSON.stringify(metrics));await page.close();
  }}finally{await browser.close();}
 }
})().catch(e=>{console.error(e);process.exit(1);});
