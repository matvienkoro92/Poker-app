'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({args:['--use-angle=metal']});try{
 for(const discipline of ['pool8','chess','short','long']){
  const billiards=discipline==='pool8',family=billiards?'billiards':'board-games',f=require('./helpers/'+(billiards?'billiards':'board')+'-wager-fixture.cjs')();
  let room=await f.service.call('m1',{action:'create',discipline,stake:300,raceTo:1,requestId:'viewer_browser_00001'});room=await f.call('m2','join',room.roomId);let count=2;
  const requests=[],errors=[],pages=[];
  for(const [member,watch]of [['m1',false],['m3',true]]){
   const page=await browser.newPage({viewport:{width:390,height:844}});pages.push(page);page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{window.testHidden=false;Object.defineProperty(document,'hidden',{get:()=>testHidden,configurable:true});});
   await page.route('http://viewers.test/**',async route=>{
    const url=new URL(route.request().url());if(url.pathname.startsWith('/api/')){
     const body=route.request().postDataJSON();requests.push({member,...body});
     if(url.pathname!=='/api/'+family||['access','participation','active','admission','version'].includes(body.action))return route.fulfill({json:{ok:true,allowed:true,level:100,active:null,conflict:null}});
     try{const result=await f.service.call(member,body);if(['room','watch'].includes(body.action))result.viewers={count,...(body.includeViewers?{names:count?['<img src=x onerror=alert(1)>','Второй зритель']:[]}:{} )};return route.fulfill({json:result});}
     catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
    }
    const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
   });
   await page.goto('http://viewers.test/'+(billiards?'billiards':'board-games')+'-play.html?'+(watch?'watch':'room')+'='+room.roomId);
   await page.waitForFunction(b=>b?window.PokerBilliards?.inspect().ready:window.PokerBoardGames?.inspect().ready,billiards);
   
   await page.getByRole('button',{name:'Кто сейчас смотрит игру'}).waitFor();assert.match(await page.locator('.game-viewers').innerText(),/2/);
   await page.locator('.game-viewers>button').click();const dialog=page.locator('.game-viewers-dialog[open]');await dialog.getByText('Второй зритель').waitFor();
   assert.equal(await dialog.locator('img').count(),0);assert.match(await dialog.innerText(),/<img src=x/);await dialog.getByRole('button',{name:'Закрыть'}).click();if(watch)await page.screenshot({path:'/tmp/viewers-'+discipline+'.png'});
  }
  const viewer=pages[1];await viewer.waitForTimeout(1400);assert.equal(requests.filter(r=>r.member==='m3'&&r.viewerPresence==='active').length,1,'Heartbeat must not be written on every poll');
  assert.equal(requests.some(r=>r.member==='m1'&&r.viewerPresence==='active'),false);
  if(!billiards)await pages[0].evaluate(()=>window.originalBoard=document.getElementById('boardArea'));
  count=0;for(const page of pages)await page.waitForFunction(()=>document.querySelector('.game-viewers button').textContent==='👁 Зрители: 0');
  if(!billiards)assert.equal(await pages[0].evaluate(()=>originalBoard===document.getElementById('boardArea')),true);
  await viewer.evaluate(()=>{testHidden=true;document.dispatchEvent(new Event('visibilitychange'));});
  for(let i=0;i<60&&!requests.some(r=>r.member==='m3'&&r.viewerPresence==='leave');i++)await viewer.waitForTimeout(50);
  assert.ok(requests.some(r=>r.member==='m3'&&r.viewerPresence==='leave'),'Background viewer must release its own tab presence');
  assert.equal(f.changes.length,2);assert.deepEqual(errors,[]);for(const page of pages)await page.close();
  console.log('PASS '+discipline+': players and spectators see count/names; unchanged polls update it without board replacement; hidden presence leaves');
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
