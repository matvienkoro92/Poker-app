'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require.resolve('../index.html'),'utf8'),script=html.match(/<script id="telegram-viewport-critical">([\s\S]*?)<\/script>/)[1];
function boot(hash,stored=null){const classes=new Set(),values=new Map(),root={dataset:{},classList:{add(...v){v.forEach(x=>classes.add(x));}},style:{setProperty:(k,v)=>values.set(k,v)}};vm.runInNewContext(script,{document:{documentElement:root},window:{},location:{hash},sessionStorage:{getItem:()=>stored},URLSearchParams});return{root,classes,values};}
test('Telegram launch parameters protect the first paint before external scripts arrive',()=>{const r=boot('#tgWebAppPlatform=android&tgWebAppVersion=8.0');assert(r.classes.has('app--telegram-miniapp'));assert.equal(r.values.get('--app-top-from-tg'),'60px');});
test('SDK launch context survives a reload after the hash has been cleared',()=>{const r=boot('',JSON.stringify({tgWebAppPlatform:'ios'}));assert.equal(r.root.dataset.telegramPlatform,'ios');});
test('ordinary browser gets no Telegram gap; desktop Telegram gets zero fallback',()=>{assert.equal(boot('').classes.size,0);assert.equal(boot('#tgWebAppPlatform=macos').values.get('--app-top-from-tg'),'0px');});
