'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {withdrawalPages}=require('../lib/telegram-deposit-withdrawals');
function entry(extra={}){return {id:'a',total:100000,room:'P21',playerId:'123',recipient:'Игрок <a>',bank:'Банк',payments:[{amount:20000}],returns:[{amount:10000}],reservations:[{amount:15000}],...extra};}
function setup(){const calls=[],store=new Map();let badLedger=false;const module={exports:{}};
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([op,key,value,mode])=>{if(op==='GET'){if(badLedger&&key==='poker21:admin-deposits:v1')throw Error('offline');return {result:store.get(key)||null};}if(op==='SET'){if(mode==='NX'&&store.has(key))return {result:null};store.set(key,value);return {result:'OK'};}throw Error(op);})};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-deposit-withdrawals'),'utf8'),{module,exports:module.exports,require:id=>id==='./redis'?redis:id==='./api-auth'?{isAdmin:id=>['2144406710','1897001087','388008256'].includes(String(id))}:require('../lib/admin-deposits'),process:{env:{}},AbortSignal,fetch:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return {json:async()=>({ok:true,result:{message_id:99}})};}});
 return {...module.exports,calls,store,fail:()=>badLedger=true};
}
function message(actor=388008256,chatId=-123,title='Админка покер'){return {message:{message_id:4,text:'/withdrawals',from:{id:actor},chat:{id:chatId,type:'supergroup',title}}};}
test('withdrawal report uses shared balances, excludes closed archive and deleted cards and escapes labels',()=>{
 const text=withdrawalPages({entries:[entry(),entry({id:'b',total:50000,room:'X',payments:[],returns:[],reservations:[]}),entry({archived:true}),entry({deletedAt:1}),entry({total:30000,reservations:[]})]}).join('\n').replace(/\u00a0/g,' ');
 assert.match(text,/Выводы в работе: 2/);assert.match(text,/Осталось выплатить: <b>1 200 ₽/);assert.match(text,/Доступно: 1 050 ₽/);assert.match(text,/Заморожено: 150 ₽/);assert.match(text,/Покер21: 1 · 700 ₽/);assert.match(text,/Хпокер: 1 · 500 ₽/);assert.match(text,/Игрок &lt;a&gt;/);assert.match(text,/Остаток: <b>700 ₽/);
 const pages=withdrawalPages({entries:Array.from({length:100},(_,i)=>entry({id:String(i),recipient:'Игрок '+i}))});assert.ok(pages.length>1);assert.ok(pages.every(p=>p.length<3500));
 assert.match(withdrawalPages({entries:[]})[0],/Незакрытых выводов нет/);
});
test('only owner binds intended group, then managers can read and other chats cannot',async()=>{
 const a=setup();a.store.set(a.STORE_KEY,JSON.stringify({entries:[entry()]}));
 assert.equal(await a.handle(message(999),'token','withdrawals:0'),false);assert.equal(a.calls.length,0);assert.equal(a.store.has(a.GROUP_KEY),false);
 await a.handle(message(2144406710),'token','withdrawals:0');assert.match(a.calls[0].body.text,/Главному администратору/);assert.equal(a.store.has(a.GROUP_KEY),false);
 assert.equal(await a.handle(message(),'token','withdrawals:0'),true);assert.equal(a.store.get(a.GROUP_KEY),'-123');assert.match(a.calls.at(-1).body.text,/Осталось выплатить/);assert.equal(a.calls.at(-1).body.reply_markup.inline_keyboard.at(-1)[0].url,a.LINK);
 const count=a.calls.length;assert.equal(await a.handle(message(388008256,-456),'token','withdrawals:0'),false);assert.equal(a.calls.length,count);
 assert.equal(await a.handle(message(1897001087),'token','withdrawals:0'),true);
});
test('private messages and misleading group titles never bind or return financial records',async()=>{
 const a=setup();const pm=message();pm.message.chat.type='private';assert.equal(await a.handle(pm,'token','withdrawals:0'),false);
 assert.equal(await a.handle(message(388008256,-123,'Клуб игроков'),'token','withdrawals:0'),true);assert.equal(a.store.size,0);assert.equal(a.calls.length,0);
});
test('refresh callbacks recheck sender and group and storage errors are not shown as zero',async()=>{
 const a=setup();a.store.set(a.GROUP_KEY,'-123');a.store.set(a.STORE_KEY,JSON.stringify({entries:[entry()]}));
 const cb={callback_query:{id:'cb',from:{id:2144406710},message:message().message}};
 await a.handle(cb,'token','withdrawals:99');assert.ok(a.calls[0].url.endsWith('/answerCallbackQuery'));assert.ok(a.calls[1].url.endsWith('/editMessageText'));assert.equal(a.calls[1].body.message_id,4);
 cb.callback_query.from.id=999;const count=a.calls.length;assert.equal(await a.handle(cb,'token','withdrawals:0'),false);assert.equal(a.calls.length,count);
 a.fail();await a.handle(message(2144406710),'token','withdrawals:0');assert.match(a.calls.at(-1).body.text,/Не удалось загрузить/);assert.doesNotMatch(a.calls.at(-1).body.text,/0 ₽/);
});
test('deposits deep link clicks the protected shortcut even without cached password access',()=>{
 const source=fs.readFileSync(require.resolve('../app-admin-deposits.js'),'utf8'),line=source.split('\n').find(l=>l.includes('window.pokerOpenDepositsDeepLink='));let clicks=0;const target={hidden:false,disabled:false,click:()=>clicks++},ctx={window:{},document:{getElementById:()=>target}};vm.createContext(ctx);vm.runInContext(line,ctx);
 assert.equal(ctx.window.pokerOpenDepositsDeepLink(),true);assert.equal(clicks,1);target.hidden=true;assert.equal(ctx.window.pokerOpenDepositsDeepLink(),false);
});
