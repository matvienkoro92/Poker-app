'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),chat=require('../lib/game-chat');
(async()=>{const browser=await chromium.launch({args:['--use-angle=metal']});try{
 for(const discipline of ['pool8','chess','short','long']){
  const billiards=discipline==='pool8',family=billiards?'billiards':'board-games',f=require('./helpers/'+(billiards?'billiards':'board')+'-wager-fixture.cjs')();
  let room=await f.service.call('m1',{action:'create',discipline,stake:300,requestId:'spectator_chat_00001',raceTo:1});room=await f.call('m2','join',room.roomId);
  const before=JSON.stringify(f.rooms.get(room.roomId)),messages=[{id:'one',clientId:'host_message_00001',player:0,nick:'Автор',text:'Привет сопернику!',sequence:1,createdAt:Date.now()}],errors=[];let sends=0,reads=0;
  const commands=async rows=>rows.map(([op,code])=>{if(op==='EVAL'&&code===chat.RATE)return 1;if(op==='GET')return JSON.stringify(f.rooms.get(room.roomId));if(op==='LRANGE')return messages.map(JSON.stringify);throw Error('Unexpected chat write');});
  const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://spectator-chat.test/**',async route=>{
   const url=new URL(route.request().url());if(url.pathname.startsWith('/api/')){
    const body=route.request().postDataJSON();
    if(url.pathname!=='/api/'+family||['access','participation','active','admission','version'].includes(body.action))return route.fulfill({json:{ok:true,allowed:true,level:100,active:null,conflict:null}});
    try{
     if(['chat-read','chat-send'].includes(body.action)){if(body.action==='chat-send')sends++;else reads++;return route.fulfill({json:await chat.handle({family,member:'m3',body,commands,now:()=>1000})});}
     return route.fulfill({json:await f.service.call('m3',body)});
    }catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
   }
   const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://spectator-chat.test/'+(billiards?'billiards':'board-games')+'-play.html?watch='+room.roomId);
  await page.locator('[data-game-chat]').click();await page.getByText('Привет сопернику!',{exact:true}).waitFor();
  assert.equal(await page.locator('.game-chat form').isVisible(),false);assert.equal(await page.locator('.game-chat input').isDisabled(),true);assert.match(await page.locator('.game-chat__read-only').innerText(),/только участники/);
  await page.evaluate(()=>{const form=document.querySelector('.game-chat form');form.elements.message.value='Попытка отправить';form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));});assert.equal(sends,0);
  const forged=await page.evaluate(async id=>{const r=await fetch('/api/'+(location.pathname.includes('billiards')?'billiards':'board-games'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'chat-send',roomId:id,player:0,text:'Подмена',messageId:'forged_message_00001'})});return r.status;},room.roomId);assert.equal(forged,403);
  messages.push({id:'two',clientId:'guest_message_0001',player:1,nick:'Соперник',text:'Второе сообщение',sequence:2,createdAt:Date.now()});await page.getByText('Второе сообщение',{exact:true}).waitFor();
  await page.screenshot({path:'/tmp/spectator-chat-'+discipline+'.png'});assert.equal(JSON.stringify(f.rooms.get(room.roomId)),before);assert.equal(f.changes.length,2);assert.ok(reads<12);assert.deepEqual(errors,[]);
  await page.close();console.log('PASS '+discipline+': spectator reads live chat; form and scripted send blocked; forged API send rejected');
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
