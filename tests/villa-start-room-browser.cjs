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
  await page.addScriptTag({url:'/app-player-hall.js'});
  const space=()=>page.locator('.player-hall__room').getAttribute('data-space');
  const toggle=()=>page.locator('[data-villa-start-room]:visible');
  await page.evaluate(()=>pokerOpenPlayerHall());assert.equal(await space(),'hall');
  await page.evaluate(()=>pokerOpenVillaGameRoom('nards'));assert.equal(await space(),'living');
  await toggle().click();await page.waitForFunction(()=>document.querySelector('.villa-living-navigation [data-villa-start-room]').getAttribute('aria-pressed')==='true');
  await page.evaluate(()=>pokerOpenPlayerHall());assert.equal(await space(),'living');
  await page.evaluate(()=>pokerOpenVillaGameRoom('billiards'));assert.equal(await space(),'billiards');
  await page.evaluate(()=>window.testFailSave=true);await toggle().click();await page.getByText('Не удалось сохранить. Нажмите ещё раз.').waitFor();
  await page.evaluate(()=>pokerOpenPlayerHall());assert.equal(await space(),'living');
  fs.mkdirSync('/tmp/villa-start-room-check',{recursive:true});
  for(const width of [320,390]){await page.setViewportSize({width,height:844});const box=await toggle().boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width);await page.screenshot({path:'/tmp/villa-start-room-check/living-'+width+'.png'});}
  await page.evaluate(()=>window.testFailSave=false);await toggle().click();await page.waitForFunction(()=>window.testRooms.ID100001==='hall');
  await page.evaluate(()=>pokerOpenPlayerHall());assert.equal(await space(),'hall');
  await page.evaluate(()=>{window.testRooms.ID100001='living';window.testAccount='ID100002';});
  await page.evaluate(()=>pokerOpenPlayerHall());assert.equal(await space(),'hall');
  await page.evaluate(()=>pokerOpenPlayerHall('ID100001'));assert.equal(await space(),'hall');assert.equal(await toggle().count(),0);
  assert.deepEqual(errors,[]);
  console.log('PASS: account preference, explicit destination, reset, failure, other account, friend villa, 320/390 px');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
