'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const fixture=require('./helpers/board-wager-fixture.cjs');
(async()=>{const browser=await chromium.launch();try{
 for(const discipline of ['chess','short','long'])for(const scenario of ['slow','busy','lost','rejected']){
  const f=fixture(),room=await f.service.call('m1',{action:'create',discipline,stake:300,requestId:'join_loading_000001',raceTo:1});
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];let joins=0,reads=0,release;
  const gate=new Promise(resolve=>release=resolve);page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://join-loading.test/**',async route=>{
   const url=new URL(route.request().url());
   if(url.pathname.startsWith('/api/')){
    const body=route.request().postDataJSON();
    if(url.pathname!=='/api/board-games'||['access','participation','active','admission','version'].includes(body.action))return route.fulfill({json:{ok:true,allowed:true,level:100,active:null,conflict:null}});
    try{
     if(body.action==='join'){
      joins++;
      if(scenario==='slow')await gate;
      if(scenario==='busy'&&joins<=2)return route.fulfill({status:409,json:{ok:false,code:'GAME_ADMISSION_BUSY',error:'Вход ещё обрабатывается'}});
      if(scenario==='rejected')return route.fulfill({status:409,json:{ok:false,code:'ACTIVE_GAME_STARTED',error:'У вас уже идёт партия. Сначала завершите её.'}});
      if(scenario==='lost'){await f.service.call('m2',body);return route.fulfill({status:503,json:{ok:false,error:'Ответ потерян'}});}
     }
     if(body.action==='room'&&scenario==='lost'&&++reads<=2)return route.fulfill({status:403,json:{ok:false,error:'Вход ещё не виден'}});
     return route.fulfill({json:await f.service.call('m2',body)});
    }catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message,code:e.code}});}
   }
   const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://join-loading.test/board-games-play.html?room='+room.roomId);
  await page.locator('#confirm[open] [data-yes]').click();
  if(scenario==='slow'||scenario==='busy'){
   await page.locator('#access').waitFor();assert.match(await page.locator('#access h1').innerText(),/Подключаемся/);assert.equal(await page.locator('#lobby').isVisible(),false);release();
  }
  if(scenario==='rejected'){
   await page.locator('#lobby').waitFor();await page.getByText('У вас уже идёт партия. Сначала завершите её.',{exact:true}).waitFor();
   assert.equal(await page.locator('#access').isVisible(),false);assert.equal(joins,1);assert.equal(f.changes.length,1);
  }else{
   await page.waitForFunction(()=>PokerBoardGames.inspect().ready);assert.equal(await page.locator('#access').isVisible(),false);
   assert.equal(f.balances.get('p2'),9700);assert.equal(f.changes.length,2);assert.equal(joins,scenario==='busy'?3:1);
  }
  assert.deepEqual(errors,[]);await page.close();console.log('PASS '+discipline+' '+scenario+': clear join state and no duplicate debit');
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
