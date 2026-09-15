const test=require('node:test'),assert=require('node:assert/strict');
const c=require('../lib/telegram-club-commands');
test('Russian and English commands and callbacks',()=>{
 for(const text of ['/расписание','расписание','/schedule@DvaTuzaBot'])assert.equal(c.command({message:{text}}),'schedule:0');
 for(const text of ['/tables','столы сейчас','/столы'])assert.equal(c.command({message:{text}}),'menu');
 assert.equal(c.command({callback_query:{data:'club:cash:1'}}),'cash:1');
 assert.equal(c.command({message:{text:'/start'}}),null);
});
test('schedule uses application source and fits Telegram pages',()=>{
 const pages=c.schedulePages();assert.ok(pages.join('\n').includes('MAIN EVENT'));
 assert.ok(pages.join('\n').includes('14 сентября 2026'));
 assert.ok(pages.every(p=>p.length<3600));
});
test('tables preserve scope, sorting, formats and SNG category',()=>{
 const row={leagueId:'184691',playerCount:2,playType:'PLO6',blindAnnotation:'1/2'};
 const rows=[{...row,deskName:'Low'},{...row,deskName:'High',blindAnnotation:'25/50'},{...row,deskName:'Private',leagueId:'111'},{...row,deskName:'Empty',playerCount:0},{...row,deskName:'Sit',playType:'SNG'},{...row,deskName:'Seka',playType:'Ceka'}];
 const cash=c.tablePages(rows,'cash').join('\n');assert.ok(cash.indexOf('High')<cash.indexOf('Low'));assert.match(cash,/СЕКА/);assert.doesNotMatch(cash,/Private|Empty|Sit|ID стола|PLO6/);
 const tour=c.tablePages(rows,'tournaments').join('\n');assert.match(tour,/Sit/);assert.doesNotMatch(tour,/High|Seka/);
});
test('menu callback is answered and edits message without sending another',async t=>{
 const old=global.fetch,calls=[];t.after(()=>global.fetch=old);
 global.fetch=async(url,opts)=>{calls.push({url,p:JSON.parse(opts.body)});return {json:async()=>({ok:true})};};
 await c.handle({callback_query:{id:'a',data:'club:menu',message:{chat:{id:1},message_id:4}}},'test');
 assert.ok(calls[0].url.endsWith('/answerCallbackQuery'));assert.ok(calls[1].url.endsWith('/editMessageText'));assert.equal(calls[1].p.message_id,4);
 assert.deepEqual(calls[1].p.reply_markup.inline_keyboard.at(-1),[{text:'⬅️ Назад',callback_data:'club:pulse'}]);
});

test('pulse opens commands and correct download and club links',async t=>{
 for(const text of ['пульс','/пульс','/pulse','/pulse@DvaTuzaBot'])assert.equal(c.command({message:{text}}),'pulse');
 const old=global.fetch,calls=[];t.after(()=>global.fetch=old);
 global.fetch=async(url,opts)=>{calls.push(JSON.parse(opts.body));return {json:async()=>({ok:true})};};
 await c.handle({message:{text:'/пульс',chat:{id:1},message_id:5}},'test');
 const buttons=calls[0].reply_markup.inline_keyboard.flat();
 assert.deepEqual(buttons.filter(b=>b.callback_data).map(b=>b.callback_data),['club:schedule:0','club:menu']);
 assert.deepEqual(buttons.filter(b=>b.url).map(b=>b.url),['https://www.poker21pro.com/','https://t.me/Poker_dvatuza_bot/DvaTuza']);
 assert.equal(buttons.length,4);
});

test('table rows use emoji numbers without blank lines between tables',()=>{
 const rows=Array.from({length:12},(_,i)=>({leagueId:'184691',playerCount:2,playType:'NLH',deskName:'Table '+i,blindAnnotation:'5/10'}));
 const text=c.tablePages(rows,'cash').join('\n');
 assert.match(text,/1️⃣ <b>Table/);
 assert.match(text,/Блайнды: 5\/10\n2️⃣ <b>Table/);
 assert.match(text,/1️⃣0️⃣ <b>Table/);
 assert.doesNotMatch(text,/Блайнды: 5\/10\n\n[0-9]/);
});

test('HTML is enabled and external names are escaped; page tags stay balanced',async t=>{
 const pages=c.tablePages([{leagueId:'184691',playerCount:2,playType:'NLH',deskName:'A < B & C',blindAnnotation:'5/10'}],'cash');
 assert.match(pages[0],/<b>ХОЛДЕМ<\/b>/);assert.match(pages[0],/<b>A &lt; B &amp; C<\/b>/);
 for(const page of [...pages,...c.schedulePages()])for(const tag of ['b','i'])assert.equal((page.match(new RegExp('<'+tag+'>','g'))||[]).length,(page.match(new RegExp('</'+tag+'>','g'))||[]).length);
 assert.match(c.schedulePages()[0],/<b>Меджик/);
 const old=global.fetch;t.after(()=>global.fetch=old);let payload;
 global.fetch=async(url,opts)=>{payload=JSON.parse(opts.body);return {json:async()=>({ok:true})};};
 await c.handle({message:{text:'/расписание',chat:{id:1},message_id:5}},'test');
 assert.equal(payload.parse_mode,'HTML');
});
test('pulse shows links only for active raffles and open Last Longer',async t=>{
 const redis=require('../lib/redis'),old=redis.pipeline;t.after(()=>redis.pipeline=old);
 let status='open',end=new Date(Date.now()+60000).toISOString();
 redis.pipeline=async cmds=>cmds[0][0]==='GET'&&cmds[0][1]==='poker_app:tournament_bet:current'
 ? [{result:JSON.stringify({id:'tb_test',status})},{result:['r1']},{result:'1'}]
 : [{result:JSON.stringify({status:'active',endDate:end})}];
 let buttons=(await c.activeRootMenu()).reply_markup.inline_keyboard.flat();
 assert.ok(buttons.some(b=>b.url?.endsWith('startapp=raffles')));
 assert.ok(buttons.some(b=>b.url?.endsWith('tournament_bet_tb_test')));
 status='closed';end=new Date(Date.now()-1000).toISOString();
 buttons=(await c.activeRootMenu()).reply_markup.inline_keyboard.flat();
 assert.ok(!buttons.some(b=>/Розыгрыши|Ласт-лонгер/.test(b.text)));
 redis.pipeline=async()=>{throw Error('unavailable')};
 assert.deepEqual(await c.activeRootMenu(),c.rootMenu());
});
test('pulse sends latest hero photo before menu, but callbacks do not repeat it',async t=>{
 const old=global.fetch,calls=[];t.after(()=>global.fetch=old);
 global.fetch=async(url,opts)=>{if(url.endsWith('/pulse-hero.json'))return {ok:true,json:async()=>({nick:'Игрок',date:'14.09.2026',image:'/assets/pulse/pulse-hero-14-09-2026.jpg'})};calls.push({url,body:JSON.parse(opts.body)});return {json:async()=>({ok:true})};};
 await c.handle({message:{chat:{id:-1,type:'group'},message_id:7,text:'/pulse'}},'test');
 assert.ok(calls[0].url.endsWith('/sendPhoto'));assert.match(calls[0].body.caption,/Игрок/);assert.ok(calls[1].url.endsWith('/sendMessage'));
 calls.length=0;await c.handle({callback_query:{id:'c',data:'club:pulse',message:{chat:{id:-1},message_id:8}}},'test');assert.ok(!calls.some(c=>c.url.endsWith('/sendPhoto')));
});
