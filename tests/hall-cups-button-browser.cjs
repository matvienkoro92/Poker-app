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
    return {hall:{self,accountId:body.targetId||window.testAccount,name:'Игрок',wins:0,items:window.testCups,featured:window.testCups.slice(0,5).map(i=>i.id),theme:'walnut',goal:'wins',themes:[],goals:[],achievementProgress:[],levelProgress:{level:10,xp:0,target:3000},character:'monkey',selectedTransport:'kart',billiardsAccess:true,livingAccess:true,garage:{stats:{level:10},loadout:{...window.PokerGarage.defaults}},lounge:{available:false,friends:[],seats:[]}}};
   };
  });
  await page.evaluate(items=>window.testCups=items,require('../lib/home-cups').cups({accountId:'ID100001',nick:'ПокерМанки',bound:true},require('../lib/player-hall-tournament-results.json')));
  await page.addScriptTag({url:'/app-hall-trophies.js'});
  await page.addScriptTag({url:'/app-player-hall.js'});
  await page.evaluate(()=>pokerOpenPlayerHall());
  for(const width of [320,390,1000]){
   await page.setViewportSize({width,height:844});
   const positions=await page.evaluate(()=>{const shelf=document.querySelector('.player-hall__display-shelf--museum');return {button:shelf.querySelector('.hall-cups-view-all').getBoundingClientRect().toJSON(),labels:[...shelf.querySelectorAll('.player-hall__slot-title')].slice(0,3).map(e=>e.getBoundingClientRect().toJSON())};});
   assert.ok(positions.button.top>Math.max(...positions.labels.map(r=>r.bottom)),'Button below captions');
   fs.mkdirSync('output/cups-button-below',{recursive:true});await page.screenshot({path:'output/cups-button-below/'+width+'.png'});
  }
  assert.deepEqual(errors,[]);console.log('PASS button below captions at 320, 390, 1000px');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
