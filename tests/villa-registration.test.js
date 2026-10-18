'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function element(){const classes=new Set(['pwa-auth-screen--hidden']);return {classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)},attrs:{},setAttribute(k,v){this.attrs[k]=v;},querySelector(){return null;}};}
test('villa registration opens auth overlay with runtime element getters',()=>{
 const screen=element(),mini=element(),body=element();let mounted=0,homeNavigations=0;
 const ctx={window:{__pokerTelegramAuth:{status:'guest'}},document:{body,getElementById:()=>null},pokerSavePwaGuestMode:()=>{},setView:()=>{homeNavigations++;},setTimeout:()=>{}};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('app-pwa-auth-overlay.js','utf8'),ctx);
 const runtime=ctx.initPwaAuthOverlayRuntime({pwaAuthScreenEl:()=>screen,pwaAuthLoginMountEl:()=>element(),identifyingMiniEl:()=>mini,ensureOverlayAuthEntryMounted:()=>mounted++});
 runtime.openOverlayAuthEntryScreen();
 assert.equal(screen.classList.contains('pwa-auth-screen--hidden'),false);assert.equal(screen.attrs['aria-hidden'],'false');assert.equal(mounted,1);assert.equal(ctx.window.__pokerTelegramAuth.status,'no_telegram');assert.equal(homeNavigations,0);
});
test('registered villa visitors keep their hero before garage catalog loads',()=>{
 const source=fs.readFileSync('app-player-hall.js','utf8'),fn=source.match(/function guestMode\(\)\{[^\n]+\}/)[0];
 for(const auth of [{status:'verified'},{status:'dev_skip'},{adminAccess:true}])assert.equal(vm.runInNewContext('('+fn+')()',{window:{__pokerTelegramAuth:auth}}),false);
 for(const auth of [{status:'guest'},{status:'no_telegram'}])assert.equal(vm.runInNewContext('('+fn+')()',{window:{__pokerTelegramAuth:auth}}),true);
});

test('pending identity and saved accounts are never rendered as villa guests',()=>{
 const source=fs.readFileSync('app-player-hall.js','utf8'),fn=source.match(/function guestMode\(\)\{[^\n]+\}/)[0];
 for(const auth of [null,{status:'unknown'},{status:'verifying'},{status:'network'}])assert.equal(vm.runInNewContext('('+fn+')()',{window:{__pokerTelegramAuth:auth}}),false);
 for(const tokenReader of ['pokerReadPwaTgSessionToken','pokerReadPwaVkSessionToken'])assert.equal(vm.runInNewContext('('+fn+')()',{window:{__pokerTelegramAuth:{status:'no_telegram'}},[tokenReader]:()=> 'saved-session'}),false);
 assert.equal(vm.runInNewContext('('+fn+')()',{window:{__pokerTelegramAuth:{status:'unknown'},Telegram:{WebApp:{initData:'signed-data'}}}}),false);
});
test('forced villa registration opens overlay even inside Telegram without restarting verification',()=>{
 const source=fs.readFileSync('app-pwa-auth-runtime.js','utf8'),start=source.indexOf('  function openSharedAccountAuthFlow(opts)'),end=source.indexOf('  window.__pokerOpenSharedAccountAuthFlow',start);
 let overlays=0,verifications=0;
 const ctx={getTelegramWebAppNow:()=>({initData:'signed-data'}),runVerifyFlow:()=>verifications++,openOverlayAuthEntryScreen:()=>overlays++,shouldUseOverlayAuthScreen:()=>false};
 vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);ctx.openSharedAccountAuthFlow({forceOverlay:true});
 assert.equal(overlays,1);assert.equal(verifications,0);
 ctx.openSharedAccountAuthFlow();assert.equal(verifications,1);
});
