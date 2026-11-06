'use strict';
const {chromium,webkit}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const fixture=require('./helpers/nards-tournament-fixture.cjs'),roomFactory=require('../lib/board-games-room');
const root=path.resolve(process.env.TOUR_BUILD_ROOT||process.cwd()),out=path.join(process.cwd(),'output/nards-tournaments');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await (process.env.BROWSER==='webkit'?webkit:chromium).launch();
 const f=fixture();f.time(Date.now());const errors=[],contexts=[],requests=[];
 const base=roomFactory({...f.rooms,now:f.now,dice:()=>[6,1]});
 const boardCall=async(member,body)=>{
  if(body.action==='access')return {ok:true,allowed:true,adminGameAccess:member==='m0',level:100,nick:'Игрок '+member.slice(1),equipment:{}};
  if(body.action==='head-to-head')return {ok:true,players:[],matches:[],history:[]};
  if(body.action==='chat-read')return {ok:true,messages:[]};
  const room=f.roomMap.get(body.roomId);
  if(room?.tournament)await f.service.synchronize(room.tournament.id,room.id);
  const result=await base.call(member,body);
  if(body.action==='move'&&room?.tournament){await f.service.synchronize(room.tournament.id,room.id);return base.call(member,{action:'room',roomId:room.id});}
  return result;
 };
 async function pageFor(member){
  const context=await browser.newContext({viewport:{width:Number(process.env.WIDTH)||390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,extraHTTPHeaders:{'x-test-member':member}});contexts.push(context);
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await context.route('https://nards-tour.test/**',async route=>{
   const req=route.request(),url=new URL(req.url()),who=req.headers()['x-test-member']||member;
   if(url.pathname==='/api/nards-tournaments'||url.pathname==='/api/board-games'){
    const body=req.postDataJSON();requests.push([who,url.pathname,body.action]);
    try{const result=url.pathname.endsWith('nards-tournaments')?await f.call(who,body.action,body.id,body):await boardCall(who,body);return route.fulfill({json:result});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
   }
   const file=path.join(root,url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });return page;
 }
 try{
  const admin=await pageFor('m0');await admin.goto('https://nards-tour.test/nards-tournaments.html');
  await admin.locator('#tourCreate').click();
  await admin.locator('[name=title]').fill('Кубок двух тузов · тест');await admin.locator('[name=capacity]').selectOption('4');
  await admin.locator('[name=target-0]').fill('1');await admin.locator('[name=target-1]').fill('3');
  const moscow=t=>new Date(t+3*3600000).toISOString().slice(0,16);
  await admin.locator('[name=startsAt]').fill(moscow(f.now()+180000));
  await admin.locator('#tourForm [type=submit]').click();await admin.waitForFunction(()=>PokerNardsTournaments.inspect().data?.status==='registration');
  const id=await admin.evaluate(()=>PokerNardsTournaments.inspect().id),t=f.tournaments.get(id),players=new Map();
  assert.deepEqual(t.roundTargets,[1,3]);assert.equal(t.drawAt,t.startsAt);
  await admin.screenshot({path:path.join(out,'admin-created.png')});
  for(let i=1;i<=4;i++){
   const p=await pageFor('m'+i);players.set('m'+i,p);await p.goto('https://nards-tour.test/nards-tournaments.html?id='+id);
   await p.locator('[data-tour-action=join]').click();await p.waitForFunction(()=>!!PokerNardsTournaments.inspect().data?.self);
   await p.locator('[data-tour-action=ready]').click();await p.waitForFunction(()=>PokerNardsTournaments.inspect().data?.self?.ready===true);
   assert.equal(await p.locator('#tourCreate').isVisible(),false);
  }
  await admin.locator('[data-tour-action=draw]').waitFor({state:'visible'});await admin.waitForFunction(()=>!document.querySelector('[data-tour-action=draw]').disabled);await admin.locator('[data-tour-action=draw]').click();
  await admin.waitForFunction(()=>PokerNardsTournaments.inspect().data?.rounds.length===2);
  const first=f.tournaments.get(id).rounds[0].matches;
  const r1=f.roomMap.get(first[0].roomId),r2=f.roomMap.get(first[1].roomId);
  const p=players.get(r1.players[0]);await p.waitForFunction(()=>!!PokerNardsTournaments.inspect().ownRoom);
  await p.locator('[data-tour-tab=game]').click();const own=()=>p.frameLocator('#tourOwnFrame iframe');
  await own().locator('#roll').waitFor();assert.equal(await own().locator('#roll').isDisabled(),true);
  await p.screenshot({path:path.join(out,'before-start.png')});
  f.time(t.startsAt);
  await p.waitForFunction(()=>document.querySelector('#tourOwnFrame iframe')?.contentWindow?.PokerBoardGames?.inspect().state?.phase==='moving');
  let live=f.roomMap.get(r1.id);const E=await import('../scripts/board-games/engine.mjs'),move=E.legalMoves(live.state)[0];
  const actor=live.players[live.state.turn];assert.equal(actor,r1.players[0]);const moved=await p.locator('#tourOwnFrame iframe').elementHandle();const gameFrame=await moved.contentFrame();await gameFrame.evaluate(async body=>{const r=await fetch('/api/board-games',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!d.ok)throw Error(d.error);},{action:'move',roomId:live.id,revision:live.revision,move:{type:'move',...move}});
  assert.ok(f.roomMap.get(r1.id).tournament.played.some(Boolean));
  await f.finish(r1.id,0,1);await f.service.synchronize(id);
  await p.waitForFunction(old=>PokerNardsTournaments.inspect().ownRoom!==old&&!!PokerNardsTournaments.inspect().ownRoom,r1.id);
  const waitingRoom=await p.evaluate(()=>PokerNardsTournaments.inspect().ownRoom);
  await p.waitForFunction(()=>PokerNardsTournaments.inspect().data?.self?.opponentRoomId!=null);
  await p.getByRole('button',{name:'Смотреть будущего соперника'}).click();
  await p.waitForFunction(()=>document.querySelector('#tourWatchFrame iframe')?.contentWindow?.PokerBoardGames?.inspect().spectator===true);
  assert.equal(await p.evaluate(()=>document.querySelector('#tourOwnFrame iframe').isConnected),true,'own game remains mounted while spectating');
  await p.screenshot({path:path.join(out,'watching-opponent.png')});await p.locator('#returnOwn').click();
  assert.equal(await p.evaluate(()=>PokerNardsTournaments.inspect().ownRoom),waitingRoom);
  f.time(f.now()+20000);await f.finish(r2.id,0,1);await f.service.synchronize(id);
  await p.waitForFunction(()=>PokerNardsTournaments.inspect().data?.rounds[1].matches[0].startsAt!=null);
  const final=f.tournaments.get(id).rounds[1].matches[0];assert.equal(final.roomId,waitingRoom);assert.equal(final.startsAt,f.now()+300000);
  await p.screenshot({path:path.join(out,'five-minute-break.png')});
  f.time(final.startsAt);await f.service.synchronize(id);
  await p.waitForFunction(()=>document.querySelector('#tourOwnFrame iframe')?.contentWindow?.PokerBoardGames?.inspect().state?.phase==='moving');
  await f.finish(waitingRoom,0,2);await f.service.synchronize(id);assert.deepEqual(f.roomMap.get(waitingRoom).match.wins,[2,0]);
  f.time(f.now()+5000);await f.service.synchronize(id);await f.finish(waitingRoom,0,3);await f.service.synchronize(id);
  await p.waitForFunction(()=>PokerNardsTournaments.inspect().data?.status==='completed');await p.locator('[data-tour-tab=bracket]').click();
  const rowBox=await p.locator('.sng-champions-modal__map-player').first().boundingBox();assert.ok(rowBox.width>120&&rowBox.height>=18,'player names stay readable inside bracket cards');await p.screenshot({path:path.join(out,'champion-bracket.png')});
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'bracket scroll is contained');
  assert.deepEqual(errors,[]);assert.ok(requests.some(r=>r[2]==='move'));
  console.log('PASS',process.env.BROWSER||'chromium','create/register/ready/draw/start/real move/wait/watch/return/5-minute break/mars/koks/champion');
 }catch(e){console.error('Browser errors:',errors,'Requests:',requests);for(let i=0;i<contexts.length;i++){const page=contexts[i].pages()[0];if(page){console.error('Page',i,await page.locator('#tourError').textContent().catch(()=>''));await page.screenshot({path:path.join(out,'failure-'+i+'.png')}).catch(()=>{});}}throw e;}finally{for(const c of contexts)await c.close();await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
