'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('app-shell-layout.js','utf8'),helper=source.slice(source.indexOf('function pokerTelegramAllowsAutoFullscreen'),source.indexOf('/**'));
const start=source.indexOf('  var pokerFullscreenRequested = false;'),end=source.indexOf('  // Адаптация под тему Telegram',start),boot=source.slice(start,end);
test('desktop and web launches including spectator links never request fullscreen',()=>{
 for(const platform of ['tdesktop','macos','web','weba','webk','unknown','']){
  let requested=0,exited=0;const handlers={};const tg={platform,isFullscreen:true,requestFullscreen(){requested++;},exitFullscreen(){exited++;this.isFullscreen=false;},isVersionAtLeast:()=>true,onEvent(){}};
  const c={tg,document:{addEventListener(name,fn){handlers[name]=fn;}}};vm.createContext(c);vm.runInContext(helper+boot,c);handlers.pointerdown();assert.equal(requested,0,platform);assert.equal(exited,1,platform);
 }
});
test('Android and iOS keep the existing one-time fullscreen behavior',()=>{
 for(const platform of ['android','ios']){let requested=0;const handlers={},tg={platform,isFullscreen:false,requestFullscreen(){requested++;},isVersionAtLeast:()=>true,onEvent(){}};const c={tg,document:{addEventListener(name,fn){handlers[name]=fn;}}};vm.createContext(c);vm.runInContext(helper+boot,c);handlers.pointerdown();assert.equal(requested,1,platform);}
});
