const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({args:['--enable-unsafe-swiftshader']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('http://cue-room.test/**',r=>{if(new URL(r.request().url()).pathname==='/api/billiards')return r.fulfill({json:{ok:true,allowed:true}});const f=path.join(process.cwd(),new URL(r.request().url()).pathname);return fs.existsSync(f)&&fs.statSync(f).isFile()?r.fulfill({path:f}):r.fulfill({contentType:'text/html',body:'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body></body>'});});await p.goto('http://cue-room.test/fixture');for(const css of ['styles-base.css','styles-player-hall.css','styles-player-lounge.css'])await p.addStyleTag({url:'http://cue-room.test/'+css});for(const js of ['app-garage-catalog.js','app-billiards-tables.js','app-billiards-cues.js'])await p.addScriptTag({url:'http://cue-room.test/'+js});await p.evaluate(()=>{window.__pokerTelegramAuth={status:'verified',id:'123456789'};window.pokerEnsureLazyDomains=async()=>{};window.pokerSocialRequest=async()=>({hall:{accountId:'room-owner',name:'Герой',nick:'ПокерМанки',self:true,billiardsAccess:true,featured:[],items:[],themes:[],goals:[],achievementProgress:[],wins:3,theme:'walnut',garage:{stats:{level:100},loadout:{...PokerGarage.defaults}},levelProgress:{xp:100,target:200}}});localStorage.setItem('p21:billiards:cue:v1:room-owner','ruby');localStorage.setItem('p21:billiards:table:v1:room-owner','classic');});await p.addScriptTag({url:'http://cue-room.test/app-player-hall.js'});await p.evaluate(()=>{const button=document.createElement('button');button.dataset.playerHallOpen='';button.textContent='Вилла';document.body.append(button);});
for(const js of ['app-billiards-equipment-sync.js','app-player-hall-equipment.js'])await p.addScriptTag({url:'http://cue-room.test/'+js});
await p.evaluate(()=>{const old=pokerSocialRequest;window.pokerSocialRequest=async(f,b)=>f==='billiards'&&b?.action==='equipment'?{ok:true,equipment:{table:b.equipment?.table||'classic'}}:old(f,b);});
await p.locator('[data-player-hall-open]').click();await p.locator('.player-hall__space-arrow[data-hall-space=garage]').click();await p.locator('[data-house-passage]').click();await p.waitForFunction(()=>document.querySelector('.player-hall__room')?.dataset.space==='billiards');
fs.mkdirSync('output/billiards-rug-fix/picker',{recursive:true});
const stage=p.locator('.villa-billiards-stage');
async function aligned(){await p.waitForFunction(()=>{const e=document.querySelector('.villa-billiards-stage'),a=getComputedStyle(e),b=getComputedStyle(e,'::before');return a.backgroundSize===b.backgroundSize&&a.backgroundPosition===b.backgroundPosition&&a.backgroundSize===b.maskSize&&a.backgroundPosition===b.maskPosition;});}
for(const width of [320,390,960]){
 await p.setViewportSize({width,height:844});await aligned();
 for(const id of ['classic','imperialRuby','ivory','sport']){
  await p.locator('[data-billiards-play=tables]').click();await p.locator('.hall-equipment--strip').waitFor();await aligned();
  await p.locator('.hall-equipment [data-item="'+id+'"]').click();
  assert.equal(await p.locator('.hall-equipment [data-item="'+id+'"]').getAttribute('aria-pressed'),'true');
  await p.locator('.hall-equipment [data-save]').click();
  await p.waitForFunction(()=>!document.querySelector('.has-billiards-picker'));
  await p.waitForFunction(id=>document.querySelector('.villa-billiards-stage').style.backgroundImage.includes('table-'+id+'-'),id);
  await aligned();await p.screenshot({path:'output/billiards-rug-fix/picker/'+width+'-'+id+'.png'});
 }
 assert.equal(await p.locator('.has-billiards-picker').count(),0);console.log('PASS picker camera alignment, saving, switching and close',width);
}
assert.deepEqual(errors,[]);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
