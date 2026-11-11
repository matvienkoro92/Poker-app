const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('app-home-cups.js','utf8');
function setup(request){
 const events={},timers=[];
 const root={hidden:true,innerHTML:'',replaceChildren(){this.innerHTML='';},querySelector(){return {}}};
 const window={pokerSocialRequest:request,addEventListener(name,fn){events[name]=fn;}};
 vm.runInNewContext(source,{window,document:{readyState:'complete',getElementById:()=>root,addEventListener(){}},pokerApiAuthJsonBody:()=>({initData:'signed'}),setTimeout(fn){timers.push(fn);},console:{warn(){}}});
 return {root,events,timers};
}
const settle=()=>new Promise(resolve=>setImmediate(resolve));
test('trophy catalogue executes before the home cups script',()=>{
 const html=fs.readFileSync('index.html','utf8');
 assert.ok(html.indexOf('src="./app-hall-trophies.js')<html.indexOf('src="./app-home-cups.js'));
});
test('a transient initial failure recovers without a click',async()=>{
 let calls=0;
 const {root,timers}=setup(async()=>{if(++calls===1)throw Error('network');return {items:[]};});
 await settle();
 assert.match(root.innerHTML,/Загружаем кубки/);
 timers.shift()();await settle();
 assert.equal(calls,2);assert.match(root.innerHTML,/Выиграйте первый турнир/);
});
test('an auth change cancels a queued retry from the previous session',async()=>{
 let calls=0;
 const {root,timers,events}=setup(async()=>{if(++calls===1)throw Error('network');return {items:[]};});
 await settle();await events['poker-auth-changed']();
 timers.shift()();await settle();
 assert.equal(calls,2);assert.match(root.innerHTML,/Выиграйте первый турнир/);
});
test('persistent failures stop after three attempts and offer manual recovery',async()=>{
 let calls=0;
 const {root,timers}=setup(async()=>{calls++;throw Error('offline');});
 await settle();timers.shift()();await settle();timers.shift()();await settle();
 assert.equal(calls,3);assert.match(root.innerHTML,/Повторить/);assert.equal(timers.length,0);
});
