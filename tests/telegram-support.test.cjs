'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const GROUP='-100123456',OWNER=388008256,MANAGER=2144406710,OTHER=1897001087,LEAD=777777;
function fixture(){
 const store=new Map(),calls=[],sorted=new Map(),sets=new Map();let thread=100,failMethod='',failCode=500,failDescription='',failOnce=false;
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([cmd,...a])=>{
  if(cmd==='SADD'){const set=sets.get(a[0])||new Set();set.add(String(a[1]));sets.set(a[0],set);return {result:1};}
  if(cmd==='ZADD'){const set=sorted.get(a[0])||new Map(),nx=a[1]==='NX',member=String(a[nx?3:2]);if(!nx||!set.has(member))set.set(member,Number(a[nx?2:1]));sorted.set(a[0],set);return {result:1};}
  if(cmd==='ZREM'){sorted.get(a[0])?.delete(String(a[1]));return {result:1};}
  if(cmd==='ZCARD')return {result:sorted.get(a[0])?.size||0};
  if(cmd==='ZRANGE'){const rows=[...(sorted.get(a[0])||new Map())].sort((x,y)=>x[1]-y[1]||x[0].localeCompare(y[0]));return {result:rows.slice(Number(a[1]),Number(a[2])+1).map(r=>r[0])};}
  if(cmd==='GET')return {result:store.get(a[0])||null};
  if(cmd==='SET'){if(a.includes('NX')&&store.has(a[0]))return {result:null};store.set(a[0],a[1]);return {result:'OK'};}
  if(cmd==='EVAL'){if(store.get(a[2])===a[3])store.delete(a[2]);return {result:1};}
  throw Error(cmd);
 })};
 const configModule={KEY:'config',config:async()=>JSON.parse(store.get('config')||'null')};
 let policy,queue,reactions;
 const fetch=async(url,options)=>{
  const method=url.split('/').at(-1),body=JSON.parse(options.body);calls.push({method,body});
  if(method===failMethod){const code=failCode,description=failDescription;if(failOnce)failMethod='';return {ok:false,status:code,json:async()=>({ok:false,error_code:code,description})};}
  return {ok:true,json:async()=>({ok:true,result:method==='createForumTopic'?{message_thread_id:++thread}:{message_id:1000+calls.length}})};
 };
 function load(file){const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./telegram-support-config'?configModule:id==='./telegram-support-reactions'?reactions:id==='./telegram-support-queue'?queue:id==='./telegram-group-policy'?policy:id==='./telegram-support-player'?{readPlayerIdentity:async user=>({name:user.first_name||'Player',poker21Id:'123456'}),identityText:require('../lib/telegram-support-player').identityText}:id==='./api-auth'?{isAdmin:id=>[OWNER,MANAGER,OTHER].includes(Number(id))}:require(id.startsWith('.')?path.resolve('lib',id):id),process:{env:{}},globalThis:{fetch},AbortSignal,Buffer,Date,URLSearchParams};vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx);return ctx.module.exports;}
 policy=load('lib/telegram-group-policy.js');queue=load('lib/telegram-support-queue.js');reactions=load('lib/telegram-support-reactions.js');const support=load('lib/telegram-support.js');
 const handle=update=>support.handle(update,'fixture-token');
 const pm=(text='Привет',message_id=1,id=LEAD)=>({message:{message_id,text,chat:{id,type:'private'},from:{id,first_name:'Лид',username:'lead'}}});
 const groupMessage=(text='Ответ',message_id=5,id=MANAGER,tid=101)=>({message:{message_id,text,message_thread_id:tid,chat:{id:GROUP,type:'supergroup',is_forum:true},from:{id}}});
 const callback=(data='support:take',id=MANAGER,cbid='callback-1',tid=101)=>({callback_query:{id:cbid,data,from:{id},message:{message_id:500,message_thread_id:tid,chat:{id:GROUP,type:'supergroup'},from:{id:1,is_bot:true}}}});
 const setup=()=>handle({message:{message_id:1,text:'/support_setup',chat:{id:GROUP,type:'supergroup',is_forum:true},from:{id:OWNER}}});
 return {handle,setup,store,calls,pm,groupMessage,callback,policy,get board(){const b=JSON.parse(store.get(queue.boardKey(GROUP))||'null');return b?JSON.parse(b.snapshot):null;},clearAwaitingAmountNotice:chatId=>support.clearAwaitingAmountNotice('fixture-token',chatId),mirrorBotMessage:(chatId,messageId,user,options)=>support.mirrorBotMessage('fixture-token',chatId,messageId,user,options),fail(method,code=500,description='',once=false){failMethod=method;failCode=code;failDescription=description;failOnce=once;},get client(){return JSON.parse(store.get(support.PREFIX+'client:'+GROUP+':'+LEAD)||'null');}};
}
test('disabled by default; only explicit owner setup in a forum binds the group',async()=>{
 const f=fixture();assert.equal((await f.handle(f.pm())).handled,false);assert.equal(f.calls.length,0);
 for(const id of [LEAD,MANAGER]){const u=f.groupMessage('/support_setup',1,id);assert.equal((await f.handle(u)).handled,false);}
 assert.equal(f.store.has('config'),false);await f.setup();assert.equal(JSON.parse(f.store.get('config')).chatId,GROUP);assert.equal(f.calls.length,1);
 await f.setup();assert.equal(f.calls.length,1);
});
test('lead gets one topic, messages/media copy to that topic and duplicate updates do not resend',async()=>{
 const f=fixture();await f.setup();assert.equal((await f.handle(f.pm('/start'))).handled,false);
 await f.handle(f.pm());await f.handle(f.pm());await f.handle(f.pm('Вопрос',2));
 const media=f.pm('',3);delete media.message.text;media.message.photo=[{file_id:'fixture'}];await f.handle(media);
 assert.equal(f.calls.filter(c=>c.method==='createForumTopic').length,1);
 const copied=f.calls.filter(c=>c.method==='copyMessage');assert.equal(copied.length,1);
 assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text.startsWith('Лид @lead\nЛид P21:123456 X:не найден\n\n')).length,2);
 for(const c of copied){assert.equal(c.body.chat_id,GROUP);assert.equal(c.body.message_thread_id,101);assert.equal(c.body.from_chat_id,LEAD);}
 await f.handle(f.pm('Другой лид',4,888888));assert.equal(f.calls.filter(c=>c.method==='createForumTopic').length,2);
});
test('any authorized manager can reply at any time, with their own signature; notes stay internal',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const outbound=()=>f.calls.filter(c=>c.method==='sendMessage'&&String(c.body.chat_id)===String(LEAD));
 await f.handle(f.groupMessage('// Заметка',11));assert.equal(f.client.managerId,null);
 await f.handle(f.groupMessage('Ответ Ани',5));assert.equal(f.client.managerId,String(MANAGER));
 await f.handle(f.groupMessage('Ответ Вики',6,OTHER));assert.equal(f.client.managerId,String(OTHER));
 assert.equal(outbound().length,2);assert.match(outbound()[0].body.text,/Аня/);assert.match(outbound()[1].body.text,/Вика.*@vikipoker/);
 assert.equal(f.client.lastOperatorName,'Вика');
 await f.handle(f.groupMessage('Нет доступа',7,LEAD));await f.handle(f.groupMessage('// Заметка',8));await f.handle(f.groupMessage('/pulse',9));assert.equal(outbound().length,2);
 assert.ok(!f.calls.some(c=>String(c.body.text||'').includes('диалог уже ведёт другой')));
 await f.handle(f.groupMessage('Ответ Ани',5));assert.equal(outbound().length,2);assert.equal(f.client.managerId,String(OTHER));
 await f.handle(f.callback('support:release',MANAGER,'release'));assert.equal(f.client.managerId,null);
 await f.handle(f.groupMessage('Ещё ответ',10,OTHER));assert.equal(outbound().length,3);
 assert.equal((await f.handle(f.pm('/start',12))).handled,false);
});
test('anonymous, edited, business, service and unrelated group updates never relay',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());await f.handle(f.callback());const count=f.calls.length;
 const anonymous=f.groupMessage();anonymous.message.sender_chat={id:GROUP};
 const wrong=f.groupMessage();wrong.message.chat.id='-100999';
 for(const u of [anonymous,wrong,{edited_message:f.groupMessage().message},{business_message:f.pm().message},{my_chat_member:{chat:{id:GROUP,type:'supergroup'}}},{message_reaction:{chat:{id:GROUP,type:'supergroup'}}},f.callback('support:take',MANAGER,'forged',999)])await f.handle(u);
 assert.equal(f.calls.length,count);
});
test('policy restricts support traffic to configured group and linked private copy direction',async()=>{
 const f=fixture();await f.setup();const count=f.calls.length;
 for(const [method,body] of [['sendMessage',{chat_id:'-100999'}],['copyMessage',{chat_id:LEAD,from_chat_id:'-100999',message_id:1}],['copyMessage',{chat_id:GROUP,from_chat_id:'-100999',message_thread_id:101}],['sendMessage',{chat_id:LEAD}],['deleteMessage',{chat_id:GROUP}],['createForumTopic',{chat_id:'-100999'}]]){
  assert.equal((await f.policy.guardedFetch('https://api.telegram.org/botfixture/'+method,{body:JSON.stringify(body)},'support-dialog')).status,403);
 }
 assert.equal(f.calls.length,count);
});
test('transient failures retry without creating new topics; permanent blocked-client failures stay visible',async()=>{
 const f=fixture();await f.setup();const incoming=f.pm();delete incoming.message.text;incoming.message.photo=[{file_id:'fixture'}];f.fail('copyMessage');await assert.rejects(f.handle(incoming));f.fail('');await f.handle(incoming);
 assert.equal(f.calls.filter(c=>c.method==='createForumTopic').length,1);
 await f.handle(f.callback());f.fail('copyMessage',403);const attachment=f.groupMessage();delete attachment.message.text;attachment.message.photo=[{file_id:'fixture'}];await f.handle(attachment);await f.handle(attachment);
 assert.equal(f.calls.filter(c=>c.method==='copyMessage'&&String(c.body.chat_id)===String(LEAD)).length,1);
 assert.ok(f.calls.some(c=>c.method==='sendMessage'&&c.body.text.includes('Не удалось отправить')));
});

test('operator signature preserves formatting and labels media without truncating long text',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const text=f.groupMessage('Привет',40);text.message.entities=[{type:'bold',offset:0,length:6}];await f.handle(text);
 const sent=f.calls.find(c=>c.method==='sendMessage'&&String(c.body.chat_id)===String(LEAD));
 assert.equal(sent.body.text,'👤 Аня · менеджер · @Qweenpoker:\n\nПривет');assert.equal(sent.body.entities[1].offset,'👤 Аня · менеджер · @Qweenpoker:\n\n'.length);
 assert.equal(sent.body.entities[0].type,'bold');assert.equal(sent.body.entities[0].offset,0);assert.equal(sent.body.entities[0].length,'👤 Аня · менеджер · @Qweenpoker:'.length);
 const long=f.groupMessage('x'.repeat(4096),41);await f.handle(long);
 assert.ok(f.calls.some(c=>c.method==='copyMessage'&&c.body.message_id===41));
 assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text==='👤 Аня · менеджер · @Qweenpoker:').length,1);
});

test('fixed topic title never changes on answers; pinned queue tracks unanswered messages',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const title=f.client.appliedTitle;assert.equal(title,'Лид · 123456');assert.match(f.board.text,/Ждут ответа: 1/);
 const renameCount=()=>f.calls.filter(c=>c.method==='editForumTopic').length;assert.equal(renameCount(),1);
 await f.handle(f.groupMessage('// Заметка',20));assert.match(f.board.text,/Ждут ответа: 1/);
 await f.handle({message_reaction:{chat:{id:GROUP,type:'supergroup'}}});
 await f.handle(f.groupMessage('Ответ',21));assert.match(f.board.text,/Ждут ответа: 0/);
 await f.handle(f.pm('Новый вопрос',2));assert.match(f.board.text,/Ждут ответа: 1/);
 await f.handle(f.groupMessage('Ответ',21));await f.handle(f.pm());assert.match(f.board.text,/Ждут ответа: 1/);
 await f.handle(f.groupMessage('Новый ответ',22));assert.match(f.board.text,/Ждут ответа: 0/);
 assert.equal(f.client.appliedTitle,title);assert.ok(f.calls.filter(c=>c.method==='editForumTopic').every(c=>c.body.name===title));
 assert.equal(f.calls.filter(c=>c.method==='pinChatMessage').length,1);
 assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text.startsWith('<b>Ждут ответа:')).length,1);
});
test('failed deliveries stay queued; board update retry never resends the actual answer',async()=>{
 const f=fixture();await f.setup();f.fail('editForumTopic');await assert.rejects(f.handle(f.pm()));
 f.fail('');await f.handle(f.pm());assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text.startsWith('Лид @lead\n')).length,1);
 f.fail('sendMessage',403);await assert.rejects(f.handle(f.groupMessage('Ответ',30)));assert.match(f.board.text,/Ждут ответа: 1/);
 f.fail('');await f.handle(f.groupMessage('Ответ',30));assert.match(f.board.text,/Ждут ответа: 0/);
 await f.handle(f.pm('Ещё вопрос',3));f.fail('editMessageText');await assert.rejects(f.handle(f.groupMessage('Ещё ответ',31)));
 const sent=f.calls.filter(c=>c.method==='sendMessage'&&String(c.body.chat_id)===String(LEAD)).length;
 f.fail('');await f.handle(f.groupMessage('Ещё ответ',31));assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&String(c.body.chat_id)===String(LEAD)).length,sent);
 assert.match(f.board.text,/Ждут ответа: 0/);
});
test('topic editing is allowed only for mapped support topics in the bound group',async()=>{
 const f=fixture();await f.setup();
 const call=body=>f.policy.guardedFetch('https://api.telegram.org/botfixture/editForumTopic',{body:JSON.stringify(body)},'support-dialog');
 assert.equal((await call({chat_id:GROUP,message_thread_id:101,name:'test'})).status,403);
 await f.handle(f.pm());assert.equal((await call({chat_id:GROUP,message_thread_id:101,name:'test'})).ok,true);
 assert.equal((await call({chat_id:'-100999',message_thread_id:101,name:'test'})).status,403);
 assert.equal((await call({chat_id:GROUP,message_thread_id:999,name:'test'})).status,403);
});

test('deletes only verified status rename service messages, once, including delayed red notices',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const red=f.client.appliedTitle;await f.handle(f.groupMessage());
 const event=(name=red,id=80)=>({message:{message_id:id,message_thread_id:101,chat:{id:GROUP,type:'supergroup'},from:{id:900,is_bot:true,username:'Poker_dvatuza_bot'},forum_topic_edited:{name}}});
 assert.equal((await f.handle(event())).handled,true);await f.handle(event());
 assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,1);
 assert.deepEqual(JSON.parse(JSON.stringify(f.calls.find(c=>c.method==='deleteMessage').body)),{chat_id:GROUP,message_id:80});
 const wrongBot=event(red,81);wrongBot.message.from.username='other_bot';
 const human=event(red,82);human.message.from={id:OWNER};
 const otherGroup=event(red,83);otherGroup.message.chat.id='-100999';
 const otherTopic=event(red,84);otherTopic.message.message_thread_id=999;
 for(const update of [wrongBot,human,otherGroup,otherTopic,event('Ручное переименование',85),{message:{...event().message,forum_topic_edited:undefined,text:'Обычное сообщение'}}])await f.handle(update);
 assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,1);
});
test('policy blocks arbitrary deletions even in known support topics',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 for(const body of [{chat_id:GROUP,message_id:5,message_thread_id:101},{chat_id:LEAD,message_id:5},{chat_id:'-100999',message_id:5}]){
  assert.equal((await f.policy.guardedFetch('https://api.telegram.org/botfixture/deleteMessage',{body:JSON.stringify(body)},'support-dialog')).status,403);
 }
});

test('neutral-icon service notices are cleaned without touching other icon changes',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const event=icon=>({message:{message_id:90,message_thread_id:101,chat:{id:GROUP,type:'supergroup'},from:{id:900,is_bot:true,username:'Poker_dvatuza_bot'},forum_topic_edited:{icon_custom_emoji_id:icon}}});
 assert.equal((await f.handle(event(''))).handled,true);
 await f.handle(event('another-icon'));assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,1);
});

test('bot questions mirror into the client topic once, including first contact through a menu button',async()=>{
 const f=fixture();await f.setup();const user={id:LEAD,first_name:'Лид'};
 assert.equal(await f.mirrorBotMessage(LEAD,42,user),true);await f.mirrorBotMessage(LEAD,42,user);
 assert.equal(f.calls.filter(c=>c.method==='createForumTopic').length,1);
 assert.equal(f.calls.filter(c=>c.method==='copyMessage'&&c.body.message_id===42).length,1);
 assert.equal(f.client.lastInboundMessageId,undefined);
 await f.handle(f.pm());await f.handle(f.groupMessage());const title=f.client.appliedTitle;
 await f.mirrorBotMessage(LEAD,43,user);assert.equal(f.client.appliedTitle,title);
 const count=f.calls.length;assert.equal(await f.mirrorBotMessage(999,44,user),false);assert.equal(f.calls.length,count);
});

test('payment link notices show provider and both amounts without duplicating the player message',async()=>{
 const f=fixture();await f.setup();const user={id:LEAD,first_name:'Lead'};
 for(const [providerId,amount,chargeAmount,id] of [['robokassa',100000,110000,42],['prodamus',200000,218000,43]]){
  const options={paymentLink:{providerId,amount,chargeAmount}};
  await f.mirrorBotMessage(LEAD,id,user,options);await f.mirrorBotMessage(LEAD,id,user,options);
 }
 const notices=f.calls.filter(c=>c.method==='sendMessage'&&c.body.text.includes('Ожидаем перевод'));
 assert.equal(notices.length,2);assert.match(notices[0].body.text,/Робокасса.*1[\s\u00a0]000 ₽/);assert.match(notices[0].body.text,/1[\s\u00a0]100 ₽/);
 assert.match(notices[1].body.text,/Prodamus.*2[\s\u00a0]000 ₽/);assert.match(notices[1].body.text,/2[\s\u00a0]180 ₽/);
 assert.equal(f.calls.filter(c=>c.method==='copyMessage').length,0);assert.equal(f.client.lastAnsweredInboundId,undefined);
});
test('waiting for amount is a short manager note and is deleted when the amount arrives',async()=>{
 const f=fixture();await f.setup();const user={id:LEAD,first_name:'Лид'};
 await f.mirrorBotMessage(LEAD,42,user,{awaitingAmount:true});
 const note=f.client.awaitingAmountNotice;assert.ok(note.messageId);
 assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text==='Игрок хочет пополнить, ждем сумму').length,1);
 assert.equal(f.calls.filter(c=>c.method==='copyMessage').length,0);
 await f.mirrorBotMessage(LEAD,42,user,{awaitingAmount:true});await f.mirrorBotMessage(LEAD,43,user,{awaitingAmount:true});
 assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text==='Игрок хочет пополнить, ждем сумму').length,1);
 await f.clearAwaitingAmountNotice(LEAD);await f.clearAwaitingAmountNotice(LEAD);
 assert.equal(f.calls.filter(c=>c.method==='deleteMessage').length,1);assert.equal(f.calls.find(c=>c.method==='deleteMessage').body.message_id,note.messageId);
 assert.equal(f.client.awaitingAmountNotice,undefined);
 await f.mirrorBotMessage(LEAD,42,user,{awaitingAmount:true});assert.equal(f.client.awaitingAmountNotice,undefined);
});

test('incoming player login is bold and formatting survives, with ID fallback without username',async()=>{
 const f=fixture();await f.setup();const first=f.pm('Hello',50);first.message.entities=[{type:'italic',offset:0,length:5}];await f.handle(first);
 const sent=f.calls.find(c=>c.method==='sendMessage'&&c.body.text==='Лид @lead\nЛид P21:123456 X:не найден\n\nHello');assert.ok(sent);assert.equal(sent.body.entities[0].type,'bold');assert.equal(sent.body.entities[1].offset,'Лид @lead\nЛид P21:123456 X:не найден\n\n'.length);
 const second=f.pm('Next',51);delete second.message.from.username;await f.handle(second);
 assert.ok(f.calls.some(c=>c.method==='sendMessage'&&c.body.text.includes('P21:123456 X:не найден\n\nNext')));
});

test('queue paginates all waiting leads and only admins can switch its pages',async()=>{
 const f=fixture();await f.setup();
 for(let i=0;i<13;i++)await f.handle(f.pm('Question',1,LEAD+i));
 assert.match(f.board.text,/Ждут ответа: 13/);assert.match(f.board.text,/1–10 из 13/);
 assert.equal(f.board.reply_markup.inline_keyboard[0][0].callback_data,'support:queue:10');
 const board=JSON.parse(f.store.get('poker_app:telegram:support:v1:queue-board:'+GROUP));
 const update={callback_query:{id:'queue-page',data:'support:queue:10',from:{id:MANAGER},message:{message_id:board.messageId,chat:{id:GROUP,type:'supergroup'}}}};
 assert.equal((await f.handle(update)).handled,true);assert.match(f.board.text,/11–13 из 13/);
 const snapshot=f.board.text;update.callback_query.from.id=LEAD;assert.equal((await f.handle(update)).handled,false);assert.equal(f.board.text,snapshot);
 update.callback_query.from.id=MANAGER;update.callback_query.message.message_id=999;assert.equal((await f.handle(update)).handled,false);
 assert.equal(f.calls.filter(c=>c.method==='pinChatMessage').length,1);
});
test('queue editing and pinning are restricted to its stored message in the configured group',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const board=JSON.parse(f.store.get('poker_app:telegram:support:v1:queue-board:'+GROUP));
 for(const method of ['pinChatMessage','editMessageText']){
  const call=body=>f.policy.guardedFetch('https://api.telegram.org/botfixture/'+method,{body:JSON.stringify(body)},'support-dialog');
  assert.equal((await call({chat_id:GROUP,message_id:board.messageId})).ok,true);
  assert.equal((await call({chat_id:GROUP,message_id:999})).status,403);
  assert.equal((await call({chat_id:'-100999',message_id:board.messageId})).status,403);
 }
});
test('queue text remains within Telegram limits and escapes player names',()=>{
 const {render}=require('../lib/telegram-support-queue');
 const clients=Array.from({length:10},(_,i)=>({id:'1234567890123456',threadId:1234567890+i,playerName:'"'.repeat(42),poker21Id:'1234567890123456'}));
 const body=render('-1001234567890123',clients,100,0);assert.ok(body.text.length<=4096);assert.ok(body.text.includes('&quot;'));assert.ok(!body.text.includes('"'.repeat(42)));
});

test('manager emoji reactions reach only mapped player messages and preserve queue',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const copied=f.calls.find(c=>c.method==='sendMessage'&&c.body.text.startsWith('Лид @lead'));
 const messageId=1000+f.calls.indexOf(copied)+1;
 const reaction=(id,user,values)=>({update_id:id,message_reaction:{chat:{id:GROUP,type:'supergroup'},message_id:messageId,user:{id:user},old_reaction:[],new_reaction:values}});
 const emoji=[{type:'emoji',emoji:'👍'}];
 await f.handle(reaction(500,MANAGER,emoji));
 assert.equal(f.calls.filter(c=>c.method==='setMessageReaction').length,1);
 const sent=f.calls.find(c=>c.method==='setMessageReaction');assert.equal(String(sent.body.chat_id),String(LEAD));assert.equal(sent.body.message_id,1);assert.equal(sent.body.reaction[0].emoji,'👍');
 assert.match(f.board.text,/Ждут ответа: 1/);
 await f.handle(reaction(500,MANAGER,emoji));assert.equal(f.calls.filter(c=>c.method==='setMessageReaction').length,1);
 await f.handle(reaction(501,999,emoji));assert.equal(f.calls.filter(c=>c.method==='setMessageReaction').length,1);
 await f.handle(reaction(502,MANAGER,[]));assert.equal(f.calls.filter(c=>c.method==='setMessageReaction').length,2);
});
test('reaction policy blocks arbitrary private messages and group reactions',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());
 const call=body=>f.policy.guardedFetch('https://api.telegram.org/botfixture-token/setMessageReaction',{body:JSON.stringify(body)},'support-dialog');
 assert.equal((await call({chat_id:LEAD,message_id:999,reaction:[{type:'emoji',emoji:'👍'}]})).ok,false);
 assert.equal((await call({chat_id:GROUP,message_id:1,reaction:[]})).ok,false);
 assert.equal((await call({chat_id:LEAD,message_id:1,reaction:[{type:'paid'}]})).ok,false);
});


test('deleted client topic is recreated and incoming message delivered once into replacement',async()=>{
 const f=fixture();await f.setup();await f.handle(f.pm());const old=f.client.threadId;
 f.fail('editForumTopic',400,'Bad Request: TOPIC_ID_INVALID',true);
 await f.handle(f.pm('Новое сообщение после удаления темы',22));
 assert.notEqual(f.client.threadId,old);assert.ok(f.client.previousThreadIds.includes(old));
 assert.match(f.client.fixedTitle,/@lead/);assert.equal(f.client.lastInboundMessageId,22);
 const incoming=f.calls.filter(c=>c.method==='sendMessage'&&c.body.text?.includes('Новое сообщение после удаления темы'));
 assert.equal(incoming.length,1);assert.equal(incoming[0].body.message_thread_id,f.client.threadId);
 await f.handle(f.pm('Новое сообщение после удаления темы',22));assert.equal(f.calls.filter(c=>c.method==='sendMessage'&&c.body.text?.includes('Новое сообщение после удаления темы')).length,1);
});
