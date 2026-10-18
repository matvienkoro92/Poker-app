const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-view-router.js','utf8');
const code=source.slice(source.lastIndexOf('navItems.forEach(function (item) {',source.indexOf('function pokerFinalizeChatFromTabOpen()')),source.indexOf('\nfunction pokerFinalizeChatFromTabOpen()'));
const flush=()=>new Promise(resolve=>setImmediate(resolve));
for(const fails of [false,true])test('Villa tap responds synchronously and restores the button after '+(fails?'failure':'opening'),async()=>{
 let click,resolve,reject,opens=0;const classes=new Set(),attrs=new Map(),label={textContent:'Вилла'};
 const item={dataset:{viewTarget:'player-hall'},disabled:false,classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},setAttribute:(k,v)=>attrs.set(k,v),removeAttribute:k=>attrs.delete(k),querySelector:()=>label,addEventListener:(_,fn)=>click=fn};
 const pending=new Promise((a,b)=>{resolve=a;reject=b;});const alerts=[];
 vm.runInNewContext(code,{navItems:[item],window:{pokerEnsureLazyDomains:()=>pending, __pokerTelegramAuth:{status:'guest'},PokerGarage:{canAccessHall:()=>false},pokerOpenPlayerHall:async()=>{opens++;},alert:x=>alerts.push(x)}});
 click({preventDefault(){},stopImmediatePropagation(){}});
 assert.equal(item.disabled,true);assert.equal(attrs.get('aria-busy'),'true');assert.equal(label.textContent,'Открываем…');assert.ok(classes.has('bottom-nav__item--opening'));
 click({preventDefault(){},stopImmediatePropagation(){}});await flush();assert.equal(opens,0);
 if(fails)reject(Error('offline'));else resolve();await flush();await flush();
 assert.equal(item.disabled,false);assert.equal(attrs.has('aria-busy'),false);assert.equal(classes.size,0);assert.equal(label.textContent,'Вилла');assert.equal(opens,fails?0:1);assert.equal(alerts.length,fails?1:0);
});
