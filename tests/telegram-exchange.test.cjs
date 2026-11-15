const {test}=require('node:test');
const assert=require('node:assert/strict');
const exchange=require('../lib/telegram-exchange');
test('exchange accepts direct private and group commands and its approved callbacks',()=>{
 const message={chat:{id:-123,type:'supergroup'},text:'/обмен'};
 assert.equal(exchange.action({message}),'list');
 assert.equal(exchange.action({message:{...message,text:'/обмен@Poker_dvatuza_bot'}}),'list');
 for(const text of ['/обмен@other_bot','обмен','/обмен extra'])assert.equal(exchange.action({message:{...message,text}}),'');
 assert.equal(exchange.action({edited_message:message}),'');
 assert.equal(exchange.action({message:{...message,chat:{type:'private'}}}),'list');
 assert.equal(exchange.action({message:{...message,chat:{type:'channel'}}}),'');
 for(const side of ['withdraw','deposit','remove'])assert.equal(exchange.action({callback_query:{message,data:'exchange:'+side}}),side);
 assert.equal(exchange.action({callback_query:{message,data:'exchange:other'}}),'');
});
test('exchange renders both lists, safe names and empty states',()=>{
 const text=exchange.render({'42':JSON.stringify({side:'withdraw',name:'<Иван>',amount:500,expiresAt:Date.now()+7200000}),'43':JSON.stringify({side:'deposit',name:'Ольга',expiresAt:Date.now()+7200000}),'44':'broken'});
 assert.match(text,/Хочет сделать вывод/);assert.match(text,/Хочет пополнить/);
 assert.match(text,/tg:\/\/user\?id=42/);assert.match(text,/&lt;Иван&gt;/);assert.match(text,/Ольга/);
 assert.equal((exchange.render({}).match(/Пока нет заявок/g)||[]).length,2);
 assert.match(exchange.render(['42',JSON.stringify({side:'deposit',name:'Пётр',expiresAt:Date.now()+7200000})]),/Пётр/);
});
test('amounts are displayed and requests disappear at the two hour boundary',()=>{
 const entry={'42':JSON.stringify({side:'withdraw',name:'Иван',amount:750,expiresAt:7200000})};
 assert.match(exchange.render(entry,7199999),/Иван<\/a> — 750 ₽/);
 assert.doesNotMatch(exchange.render(entry,7200000),/Иван/);
 assert.match(exchange.render(entry,0),/на 2 часа/);
});
function fixture(options={}){
 const fs=require('node:fs'),vm=require('node:vm'),mod={exports:{}},sent=[],commands=[];
 const pending=JSON.stringify({side:'deposit',promptId:10,...options.pending});
 const pipeline=async batch=>batch.map(c=>{commands.push(c);let result=1;if(c[0]==='GET')result=options.noPending?null:pending;if(c[0]==='SET')result='OK';if(c[0]==='ZRANGEBYSCORE')result=options.boards||['7'];if(c[0]==='HGETALL'||(c[0]==='EVAL'&&c[1].includes('HGETALL')))result={};return {result};});
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-exchange'),'utf8'),{module:mod,AbortSignal,console,require:id=>id==='./redis'?{pipeline}:id==='./tracking-link-milestones'?{playersGroup:async()=>'-123'}:{guardedFetch:async(url,options)=>{sent.push({url,body:JSON.parse(options.body)});return {json:async()=>({ok:true,result:{message_id:10}})};}}});
 return {service:mod.exports,sent,commands};
}
const message={message_id:20,chat:{id:-123,type:'supergroup'},from:{id:42,first_name:'Иван'}};
test('selection prompts for amount without publishing a request',async()=>{
 const f=fixture();await f.service.handle({callback_query:{id:'click',data:'exchange:deposit',from:message.from,message}},'test');
 assert.match(f.sent[1].url,/editMessageText$/);
 assert.equal(f.sent[1].body.message_id,message.message_id);
 assert.ok(!f.sent.some(s=>s.url.endsWith('/sendMessage')));
 assert.match(f.sent[1].body.text,/2 часа/);
 assert.ok(f.commands.some(c=>c[0]==='SET'&&c[1].includes(':pending:42')));
 assert.ok(!f.commands.some(c=>c[0]==='HSET'||c[0]==='EVAL'));
});
test('amount reply creates timed request; invalid amount and other users replies do not',async()=>{
 for(const [text,prompt,valid]of [['500',10,true],['1001',10,false],['0',10,false],['-50',10,false],['тест',10,false],['999,50 ₽',10,true],['500',11,false]]){
  const f=fixture(),before=Date.now();
  await f.service.handle({message:{...message,text,reply_to_message:{message_id:prompt,from:{is_bot:true},text:'🔄 Обмен: введите сумму'}}},'test');
  const write=f.commands.find(c=>c[0]==='EVAL'&&c[1].includes("'HSET'"));
  assert.equal(!!write,valid,text+' prompt '+prompt);
  if(write){const entry=JSON.parse(write[9]);assert.equal(entry.side,'deposit');assert.equal(entry.amount,text==='500'?500:999.5);assert.ok(entry.expiresAt>=before+7200000);assert.ok(entry.expiresAt<=Date.now()+7200000);}
 }
});
test('remove deletes only the clicking player and cancels pending amount input',async()=>{
 const f=fixture();await f.service.handle({callback_query:{id:'remove',data:'exchange:remove',from:message.from,message}},'test');
 assert.ok(f.commands.some(c=>c[0]==='HDEL'&&c[1]==='poker_app:telegram:exchange:-123'&&c[2]==='42'));
 assert.ok(f.commands.some(c=>c[0]==='DEL'&&c[1].endsWith(':pending:42')));
 assert.equal(f.sent[0].body.text,'Вы удалены из списка');
});
test('expiry worker cleans expired requests and refreshes published lists',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),mod={exports:{}},commands=[],sent=[];
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-exchange'),'utf8'),{module:mod,AbortSignal,require:id=>id==='./redis'?{pipeline:async batch=>batch.map(c=>{commands.push(c);return {result:c[0]==='ZRANGEBYSCORE'?(c[1].endsWith(':due')?['-123:42']:['7']):c[0]==='EVAL'&&c[1].includes('HGETALL')?{}:1};})}:{guardedFetch:async(url,options)=>{sent.push(JSON.parse(options.body));return {json:async()=>({ok:true})};}}});
 assert.equal(await mod.exports.expire('test'),1);
 assert.equal(sent[0].chat_id,'-123');assert.equal(sent[0].message_id,7);assert.match(sent[0].text,/Пока нет заявок/);
 assert.ok(commands.some(c=>c[0]==='EVAL'&&c[1].includes('p.expiresAt<=tonumber(ARGV[1])')));
 assert.ok(commands.some(c=>c[0]==='EVAL'&&c[1].includes("'ZSCORE'")));
});
test('bot replies get a three minute deletion timer without shortening request lifetime',async()=>{
 const f=fixture(),before=Date.now();
 await f.service.handle({message:{...message,text:'/обмен'}},'test');
 const timer=f.commands.find(c=>c[0]==='ZADD'&&c[1].endsWith(':delete-due'));
 assert.equal(timer[2],'NX');assert.equal(timer[4],'-123:10');
 assert.ok(timer[3]>=before+180000&&timer[3]<=Date.now()+180000);
 assert.doesNotMatch(f.sent[0].body.text,/Это сообщение удаляется|список можно снова открыть|Чтобы уйти раньше/);
 assert.match(f.sent[0].body.text,/на 2 часа/);
});
test('cleanup deletes only scheduled bot messages and removes their board index',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),mod={exports:{}},sent=[],commands=[];
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-exchange'),'utf8'),{module:mod,AbortSignal,require:id=>id==='./redis'?{pipeline:async batch=>batch.map(c=>{commands.push(c);return {result:c[0]==='ZRANGEBYSCORE'&&c[1].endsWith(':delete-due')?['-123:7']:[]};})}:{guardedFetch:async(url,opts)=>{sent.push({url,body:JSON.parse(opts.body)});return {json:async()=>({ok:true})};}}});
 await mod.exports.expire('test');assert.match(sent[0].url,/deleteMessage$/);assert.equal(sent[0].body.message_id,7);
 assert.ok(commands.some(c=>c[0]==='ZREM'&&c[1].endsWith(':boards')&&c[2]==='7'));
 assert.ok(!commands.some(c=>c[0]==='HDEL'));
});

test('plain amount after selecting a side works without reply mode or extra bot message',async()=>{
 const f=fixture();
 assert.equal(await f.service.handle({message:{...message,text:'100'}},'test'),true);
 const write=f.commands.find(c=>c[0]==='EVAL'&&c[1].includes("'HSET'"));
 assert.equal(JSON.parse(write[9]).amount,100);
 assert.ok(!f.sent.some(s=>s.url.endsWith('/sendMessage')));
});
test('unrelated amounts without a pending request are ignored',async()=>{
 const f=fixture({noPending:true});
 assert.equal(await f.service.handle({message:{...message,text:'100'}},'test'),false);
 assert.equal(f.sent.length,0);
 assert.ok(!f.commands.some(c=>c[0]==='EVAL'));
});
test('invalid plain amount shows error in the existing list',async()=>{
 const f=fixture();await f.service.handle({message:{...message,text:'1001'}},'test');
 assert.equal(f.sent.length,1);assert.match(f.sent[0].url,/editMessageText$/);
 assert.equal(f.sent[0].body.message_id,10);
 assert.match(f.sent[0].body.text,/Укажите сумму/);
});
test('private exchange shows the group list and tracks the private board',async()=>{
 const f=fixture();await f.service.handle({message:{...message,chat:{id:42,type:'private'},text:'/обмен'}},'test');
 assert.equal(f.sent[0].body.chat_id,'42');
 assert.ok(f.commands.some(c=>c[0]==='HGETALL'&&c[1]==='poker_app:telegram:exchange:-123'));
 assert.ok(f.commands.some(c=>c[0]==='ZADD'&&c[1]==='poker_app:telegram:exchange:-123:boards'&&c[3]==='42:10'));
});
test('private amounts save the same player in the shared group list',async()=>{
 const f=fixture();await f.service.handle({message:{...message,chat:{id:42,type:'private'},text:'500'}},'test');
 const write=f.commands.find(c=>c[0]==='EVAL'&&c[1].includes("'HSET'"));
 assert.equal(write[3],'poker_app:telegram:exchange:-123');
 assert.equal(write[4],'poker_app:telegram:exchange:42:pending:42');
 assert.equal(write[7],'42');assert.equal(JSON.parse(write[9]).amount,500);
 assert.equal(write[11],'-123:42');
});
test('private removal removes player from shared list and does not create a separate message',async()=>{
 const f=fixture();const privateMessage={...message,chat:{id:42,type:'private'}};
 await f.service.handle({callback_query:{id:'private-remove',data:'exchange:remove',from:message.from,message:privateMessage}},'test');
 assert.ok(f.commands.some(c=>c[0]==='HDEL'&&c[1]==='poker_app:telegram:exchange:-123'&&c[2]==='42'));
 assert.ok(!f.sent.some(s=>s.url.endsWith('/sendMessage')));
});
test('shared refresh updates private and group messages at their original destinations',async()=>{
 const f=fixture({boards:['7','42:10']});
 await f.service.handle({message:{...message,text:'100'}},'test');
 const edits=f.sent.filter(s=>s.url.endsWith('/editMessageText')).map(s=>[s.body.chat_id,s.body.message_id]);
 assert.deepEqual(edits,[['-123',7],['42',10]]);
});

test('regular group accepts a plain amount when callback carried a Telegram reply-thread ID',async()=>{
 const f=fixture({pending:{threadId:12345}});
 assert.equal(await f.service.handle({message:{...message,text:'500'}},'test'),true);
 const write=f.commands.find(c=>c[0]==='EVAL'&&c[1].includes("'HSET'"));
 assert.equal(JSON.parse(write[9]).amount,500);
});
test('forum input stays in the topic where the exchange side was selected',async()=>{
 for(const [topic,expected]of [[55,true],[56,false]]){
  const f=fixture({pending:{threadId:55}});
  assert.equal(await f.service.handle({message:{...message,chat:{...message.chat,is_forum:true},message_thread_id:topic,text:'500'}},'test'),expected);
 }
});

test('accepted amount message is deleted only after saving the request',async()=>{
 const f=fixture();await f.service.handle({message:{...message,text:'500'}},'test');
 const deletion=f.sent.find(s=>s.url.endsWith('/deleteMessage'));
 assert.equal(deletion.body.chat_id,'-123');assert.equal(deletion.body.message_id,20);
 assert.ok(f.commands.some(c=>c[0]==='ZADD'&&c[1].endsWith(':delete-due')&&c[3]==='-123:20'));
});
test('invalid or unrelated amount messages are never deleted',async()=>{
 for(const [text,noPending]of [['1001',false],['500',true]]){
  const f=fixture({noPending});await f.service.handle({message:{...message,text}},'test');
  assert.ok(!f.sent.some(s=>s.url.endsWith('/deleteMessage')));
 }
});
