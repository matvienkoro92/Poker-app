const test=require('node:test'),assert=require('node:assert/strict');
const club=require('../lib/telegram-club-commands'),rankings=require('../lib/telegram-game-rankings'),policy=require('../lib/telegram-group-policy');
test('only the four approved exact ranking commands are accepted, including bot mentions',()=>{for(const [text,action]of [['/рейтинг шахматы','rating:chess'],['/рейтинг бильярд','rating:billiards'],['/рейтинг нарды длинные','rating:long'],['/рейтинг@Poker_dvatuza_bot нарды короткие','rating:short']]){for(const type of ['private','supergroup'])assert.equal(club.command({message:{text,chat:{type}}}),action);assert.equal(policy.isGameRatingAction(action),true);}for(const text of ['/рейтинг@other_bot бильярд','рейтинг бильярд','/рейтинг бильярд extra'])assert.equal(club.command({message:{text}}),null);assert.equal(policy.isGameRatingAction('rating:other'),false);});
test('top ten is bounded, names escaped, requester rank shown even outside the top',()=>{const raw={};for(let i=0;i<15;i++)raw['ID'+String(100000+i)]=JSON.stringify({name:i===0?'<Первый>':'Игрок '+i,wins:30-i,losses:i,draws:0});const players=rankings.combine([raw]);const text=rankings.format('long',players,'ID100014');assert.equal(text.split('\n').filter(l=>/^\d+\./.test(l)).length,10);assert.ok(text.includes('&lt;Первый&gt;'));assert.ok(text.includes('Ваше место: <b>15</b>'));assert.ok(!text.includes('ID100014'));assert.ok(text.includes(require('../lib/game-rating-score').paidFormula));assert.ok(text.includes(require('../lib/game-rating-score').paidExplanation));});
test('combines buckets by account, keeps duplicate names as separate people and deterministic tie order',()=>{const rows=rankings.combine([{ID1:JSON.stringify({name:'Один',wins:3,losses:1,updatedAt:2}),ID2:JSON.stringify({name:'Один',wins:5,losses:2})},{ID1:JSON.stringify({name:'Новое имя',wins:2,losses:1,draws:1,updatedAt:4})}]);assert.equal(rows.length,2);assert.equal(rows[0].id,'ID2');const combined=rows.find(row=>row.id==='ID1');assert.equal(combined.wins,5);assert.equal(combined.name,'Новое имя');assert.ok(rankings.format('billiards',rows,'').endsWith('Ваше место: привяжите аккаунт в клубном приложении.'));});
test('billiards reads separate paid/free result snapshots across both disciplines',async()=>{
 const result=(paid,winner)=>JSON.stringify({finishedAt:10,room:{wagered:paid,state:{winner},playerProfiles:[{accountId:'ID100001',name:'Игрок'},{accountId:'ID100002',name:'Другой'}]}});
 const commands=async rows=>rows.map(([cmd,key])=>cmd==='HGET'?'ID100001':key.includes('pyramid')?{a:result(true,0),b:result(false,1)}:{c:result(true,0)});
 const paid=await rankings.read({commands,game:'billiards',telegramId:123,resolveAccount:async id=>id});assert.ok(paid.includes('Партии на фишки'));assert.ok(paid.includes('Ваше место: <b>1</b> · 2:2/0'));
 const free=await rankings.read({commands,game:'billiards',mode:'free',telegramId:123,resolveAccount:async id=>id});assert.ok(free.includes('Бесплатные партии'));assert.ok(free.includes('Ваше место: <b>2</b> · 1:0/1'));
});
test('ranking replies work in private and group chats with a top ten and the requester last',async t=>{const original=rankings.read,oldFetch=global.fetch;const players=Array.from({length:12},(_,i)=>({id:'ID'+i,name:'Игрок '+i,wins:20-i,losses:i,draws:0,rank:i+1}));rankings.read=async({game})=>rankings.format(game,players,'ID11');const sent=[];global.fetch=async(url,options)=>{sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true,result:{message_id:50}})};};t.after(()=>{rankings.read=original;global.fetch=oldFetch;});for(const [type,command]of [['private','/рейтинг бильярд'],['supergroup','/рейтинг нарды длинные'],['supergroup','/рейтинг нарды короткие']])assert.equal(await club.handle({message:{message_id:5,text:command,chat:{id:type==='private'?42:-123,type},from:{id:42}}},'test'),true);assert.equal(sent.length,3);for(const message of sent){assert.equal(message.parse_mode,'HTML');assert.equal(message.reply_to_message_id,5);assert.equal(message.text.split('\n').filter(l=>/^\d+\./.test(l)).length,10);assert.ok(message.text.split('\n').at(-1).includes('Ваше место: <b>12</b>'));}});

test('Telegram slash-menu aliases map to the same approved actions and reject other bots',()=>{for(const [name,action]of [['rating_chess','rating:chess'],['rating_billiards','rating:billiards'],['rating_nards_long','rating:long'],['rating_nards_short','rating:short']]){assert.equal(club.command({message:{text:'/'+name}}),action);assert.equal(club.command({message:{text:'/'+name+'@Poker_dvatuza_bot'}}),action);assert.equal(club.command({message:{text:'/'+name+'@other_bot'}}),null);}});

test('nards rankings load only the selected bucket, with paid as default',async()=>{
 const stats=require('../lib/board-games-stats'),old=stats.migrateLegacy;stats.migrateLegacy=async()=>{};
 try{for(const game of ['chess','long','short'])for(const mode of ['paid','free']){
 const commands=async rows=>rows.map(([cmd,key])=>{if(cmd==='HGET')return 'ID100001';if(key.endsWith(':results')){assert.equal(mode,'paid');return {};}assert.equal(key,`poker_app:board-games:stats:v2:${game}:${mode}:players`);return {ID100001:JSON.stringify({name:'Игрок',wins:mode==='paid'?7:2,losses:0})};});
 const text=await rankings.read({commands,game,...(mode==='free'?{mode}:{}),telegramId:1,resolveAccount:async id=>id});assert.ok(text.includes(mode==='paid'?'7:7/0':'2:2/0'));
 }}finally{stats.migrateLegacy=old;}
});
test('command starts paid and callback edits the same message between free and paid rankings',async t=>{
 const original=rankings.read,oldFetch=global.fetch,requests=[],sent=[];
 rankings.read=async args=>{requests.push(args);return args.mode==='free'?'Бесплатные партии':'Партии на фишки';};
 global.fetch=async(url,options)=>{sent.push({method:url.split('/').at(-1),body:JSON.parse(options.body)});return {ok:true,json:async()=>({ok:true,result:{message_id:50}})};};t.after(()=>{rankings.read=original;global.fetch=oldFetch;});
 for(const [game,alias]of [['chess','rating_chess'],['long','rating_nards_long'],['short','rating_nards_short'],['billiards','rating_billiards']]){
 const chat={id:-123,type:'supergroup'};
 await club.handle({message:{message_id:5,text:'/'+alias,chat,from:{id:42}}},'test');let response=sent.at(-1);assert.equal(requests.at(-1).mode,'paid');assert.equal(response.method,'sendMessage');assert.equal(response.body.reply_markup.inline_keyboard[0][0].callback_data,'club:rating:'+game+':free');
 for(const mode of ['free','paid']){
 const action='rating:'+game+':'+mode;assert.equal(policy.isGameRatingAction(action),true);
 await club.handle({callback_query:{id:'cb',data:'club:'+action,from:{id:42},message:{message_id:50,chat}}},'test');response=sent.at(-1);assert.equal(requests.at(-1).mode,mode);assert.equal(response.method,'editMessageText');assert.equal(response.body.message_id,50);assert.equal(response.body.reply_markup.inline_keyboard[0][0].callback_data,'club:rating:'+game+':'+(mode==='paid'?'free':'paid'));
 }
 }
 for(const bad of ['rating:long:other','rating:darts:paid','rating:long:free:extra'])assert.equal(policy.isGameRatingAction(bad),false);
});

test('ranking lines use games:wins/losses without a draw counter',()=>{
 const row={id:'A',name:'Игрок',rank:1,wins:20,losses:25,draws:9,ratingScore:100};
 const text=rankings.format('chess',[row],'A');
 assert.ok(text.includes('Игрок</b> — 45:20/25 - рейтинг <b>100.00</b>'));
 assert.ok(text.includes('Ваше место: <b>1</b> · 45:20/25 - рейтинг <b>100.00</b>'));
 assert.ok(!text.includes(' · И '));
});
