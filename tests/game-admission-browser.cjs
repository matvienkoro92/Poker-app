'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();try{
 for(const race of [false,true]){
  const db=new Map(),requests=[],rooms=new Map();let n=0;
  const service=require('../lib/board-games-room')({random:()=>['ABCDEFGHJK','BCDEFGHJKL'][n++],profile:async m=>({name:m,level:1,accountId:m==='host'?'ID123456':'ID654321'}),
   load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},
   cas:async(id,rev,r)=>{if(rooms.get(id).revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}
  });
  const own=await service.call('host',{action:'create',discipline:'chess',timeControl:'blitz-5-3'});
  const target=await service.call('other',{action:'create',discipline:'chess',timeControl:'blitz-5-3'});
  db.set('poker_app:active-game:board-games:host',own.roomId);
  const commands=async rows=>rows.map(([op,key,...args])=>{
   if(op==='GET')return key.startsWith('poker_app:board-games:v1:')?JSON.stringify(rooms.get(key.slice('poker_app:board-games:v1:'.length)))||null:db.get(key)||null;
   if(op==='HGET')return key==='poker_app:id_to_user'?'host':null;
   if(op==='SSCAN')return ['0',[]];
   if(op==='MGET')return [key,...args].map(k=>k.startsWith('poker_app:board-games:v1:')?JSON.stringify(rooms.get(k.slice('poker_app:board-games:v1:'.length)))||null:db.get(k)||null);
   if(op==='SET'){if(args.includes('NX')&&db.has(key))return null;db.set(key,args[0]);return 'OK';}
   if(op==='EVAL'){if(db.get(args[1])===args[2])db.delete(args[1]);return 1;}
   throw Error(op);
  });
  const guardedService={call:async(member,body)=>{if(body.action==='cancel')requests.push('cancel');return service.call(member,body);}};
  const guard=require('../lib/game-admission').create({commands,services:{'board-games':guardedService,billiards:guardedService},resolve:async()=> 'ID123456'});
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://admission.test/**',async route=>{
   const u=new URL(route.request().url());if(u.pathname.startsWith('/api/')){
    if(u.pathname!=='/api/board-games')return route.fulfill({json:{ok:true}});
    const body=route.request().postDataJSON();let admission;
    try{
     if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true,level:1,equipment:{board:'walnut',pieces:'classic'}}});
     if(body.action==='active')return route.fulfill({json:{ok:true,active:null}});
     if(body.action==='admission')return route.fulfill({json:await guard.inspect({family:'board-games',member:'host',roomId:body.roomId})});
     if(body.action==='join'){admission=await guard.begin({family:'board-games',member:'host',body});requests.push('join');}
     const data=await service.call('host',body);if(admission)await admission.remember(data);
     return route.fulfill({json:data});
    }catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message,code:e.code}});}
    finally{if(admission)await admission.release();}
   }
   const file=path.join(process.cwd(),u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://admission.test/board-games-play.html?room='+target.roomId);
  const dialog=page.locator('[data-game-admission][open]');await dialog.waitFor();if(!race)await page.screenshot({path:'/tmp/game-admission-prompt.png'});assert.deepEqual(requests,[]);
  await dialog.locator('[data-admission-keep]').click();assert.equal(rooms.get(own.roomId).players[1],null);assert.equal(rooms.get(target.roomId).players[1],null);
  await page.reload();await dialog.waitFor();
  if(race)await service.call('guest',{action:'join',roomId:own.roomId});
  await dialog.locator('[data-admission-accept]').click();await page.locator('#confirm[open]').waitFor();
  assert.deepEqual(requests,[],'confirmation alone must not cancel a paid or free room');
  await page.locator('#confirm [data-yes]').click();
  if(race){await page.waitForFunction(()=>document.body.textContent.includes('У вас уже идёт партия'));assert.deepEqual(requests,[]);assert.equal(rooms.get(own.roomId).players[1],'guest');assert.equal(rooms.get(target.roomId).players[1],null);}
  else{await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready);assert.deepEqual(requests,['cancel','join']);assert.ok(rooms.get(own.roomId).expires<Date.now());assert.equal(rooms.get(target.roomId).players[1],'host');}
  assert.deepEqual(errors,[]);await page.close();console.log('PASS '+(race?'started-room race blocks cancellation and admission':'keep room, confirm cancellation, then accept invitation'));
 }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
