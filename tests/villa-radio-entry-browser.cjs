'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://villa.test/**',route=>{
   const pathname=new URL(route.request().url()).pathname;
   if(pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles-player-hall.css"><link rel="stylesheet" href="/styles-player-lounge.css"><style>body{margin:0;background:#10171d;font-family:Arial}</style>'});
   const file=path.join(root,pathname);if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:''});
   const type={'.js':'application/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream';
   return route.fulfill({contentType:type,body:fs.readFileSync(file)});
  });
  await page.goto('http://villa.test/');
  await page.addScriptTag({url:'/app-garage-catalog.js'});
  await page.evaluate(()=>{
   window.__pokerTelegramAuth={status:'verified'};
   window.testAccount='ID100001';window.testRooms={};window.testFailSave=false;
   window.pokerSocialRequest=async(name,body)=>{
    if(body.action==='start-room'){
     if(body.room!==undefined){if(window.testFailSave)throw Error('Offline');window.testRooms[window.testAccount]=body.room;}
     return {ok:true,room:window.testRooms[window.testAccount]||'hall'};
    }
    const self=!body.targetId||body.targetId===window.testAccount;
    return {hall:{self,accountId:body.targetId||window.testAccount,name:'Игрок',wins:0,items:[],featured:[],theme:'walnut',goal:'wins',themes:[],goals:[],achievementProgress:[],levelProgress:{level:10,xp:0,target:3000},character:'monkey',selectedTransport:'kart',billiardsAccess:true,livingAccess:true,garage:{stats:{level:10},loadout:{...window.PokerGarage.defaults}},lounge:{available:false,friends:[],seats:[]}}};
   };
  });
  await page.addScriptTag({url:'/app-garage-radio.js'});await page.addScriptTag({url:'/app-player-hall.js'});
  await page.evaluate(()=>{window.testRooms.ID100001='garage';return pokerOpenPlayerHall();});
  for(const width of [320,390,1000]){
   await page.setViewportSize({width,height:844});
   const boxes=await page.evaluate(()=>{const r=s=>document.querySelector(s).getBoundingClientRect().toJSON();return {radio:r('.player-hall__garage-scene .garage-radio-object'),label:r('.player-hall__garage-scene .garage-radio-object span'),button:r('.player-hall-dialog > .villa-start-room button')};});
   const overlap=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
   assert.ok(!overlap(boxes.radio,boxes.button),'Stereo must not overlap entry button at '+width+JSON.stringify(boxes));
   assert.ok(!overlap(boxes.label,boxes.button),'Stereo label must not overlap entry button');
   fs.mkdirSync('output/radio-entry-gap',{recursive:true});await page.screenshot({path:'output/radio-entry-gap/'+width+'.png'});
  }
  await page.locator('.player-hall__garage-scene .garage-radio-object').click();await page.waitForFunction(()=>document.querySelector('.player-hall__room').dataset.garageFocus==='radio');assert.equal(await page.locator('.garage-radio').isVisible(),true);
  assert.deepEqual(errors,[]);console.log('PASS stereo and entry button do not overlap at 320/390/1000px');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
