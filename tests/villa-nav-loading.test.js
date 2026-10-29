const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-view-router.js','utf8');
const code=source.slice(source.lastIndexOf('navItems.forEach(function (item) {',source.indexOf('function pokerFinalizeChatFromTabOpen()')),source.indexOf('\nfunction pokerFinalizeChatFromTabOpen()'));
const flush=()=>new Promise(resolve=>setImmediate(resolve));
for(const fails of [false,true])test('Villa tap responds synchronously and restores the button after '+(fails?'failure':'opening'),async()=>{
 let click,resolve,reject,opens=0,shows=0,failures=0;const shell={open:false,addEventListener(){}};const classes=new Set(),attrs=new Map(),label={textContent:'Вилла'};
 const item={dataset:{viewTarget:'player-hall'},disabled:false,classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)},setAttribute:(k,v)=>attrs.set(k,v),removeAttribute:k=>attrs.delete(k),querySelector:()=>label,addEventListener:(_,fn)=>click=fn};
 const pending=new Promise((a,b)=>{resolve=a;reject=b;});const alerts=[];
 vm.runInNewContext(code,{navItems:[item],window:{pokerShowVillaLoading:()=>{shows++;shell.open=true;return shell;},pokerFailVillaLoading:()=>{failures++;},pokerEnsureLazyDomains:()=>pending, __pokerTelegramAuth:{status:'guest'},PokerGarage:{canAccessHall:()=>false},pokerOpenPlayerHall:async()=>{opens++;},alert:x=>alerts.push(x)}});
 click({preventDefault(){},stopImmediatePropagation(){}});
 assert.equal(item.disabled,true);assert.equal(attrs.get('aria-busy'),'true');assert.equal(label.textContent,'Вилла');assert.equal(shows,1);assert.equal(shell.open,true);assert.ok(classes.has('bottom-nav__item--opening'));
 click({preventDefault(){},stopImmediatePropagation(){}});await flush();assert.equal(opens,0);
 if(fails)reject(Error('offline'));else resolve();await flush();await flush();
 assert.equal(item.disabled,false);assert.equal(attrs.has('aria-busy'),false);assert.equal(classes.size,0);assert.equal(label.textContent,'Вилла');assert.equal(opens,fails?0:1);assert.equal(alerts.length,0);assert.equal(failures,fails?1:0);
});

test('closing arrival before the lazy scripts finish does not reopen the villa',async()=>{
 let click,resolve,closed,opens=0;const shell={open:true,addEventListener:(name,fn)=>{closed=fn;}};
 const item={dataset:{viewTarget:'player-hall'},classList:{add(){},remove(){}},setAttribute(){},removeAttribute(){},addEventListener:(_,fn)=>{click=fn;}};
 const pending=new Promise(r=>{resolve=r;});
 vm.runInNewContext(code,{navItems:[item],window:{pokerShowVillaLoading:()=>shell,pokerEnsureLazyDomains:()=>pending,pokerOpenPlayerHall:async()=>{opens++;},alert(){}}});
 click({preventDefault(){},stopImmediatePropagation(){}});shell.open=false;closed();assert.equal(item.disabled,false);resolve();await flush();await flush();assert.equal(opens,0);
});
