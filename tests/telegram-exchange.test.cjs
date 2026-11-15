const {test}=require('node:test');
const assert=require('node:assert/strict');
const exchange=require('../lib/telegram-exchange');
test('exchange accepts only direct group commands and its approved callbacks',()=>{
 const message={chat:{id:-123,type:'supergroup'},text:'/обмен'};
 assert.equal(exchange.action({message}),'list');
 assert.equal(exchange.action({message:{...message,text:'/обмен@Poker_dvatuza_bot'}}),'list');
 for(const text of ['/обмен@other_bot','обмен','/обмен extra'])assert.equal(exchange.action({message:{...message,text}}),'');
 assert.equal(exchange.action({edited_message:message}),'');
 assert.equal(exchange.action({message:{...message,chat:{type:'private'}}}),'');
 for(const side of ['withdraw','deposit','remove'])assert.equal(exchange.action({callback_query:{message,data:'exchange:'+side}}),side);
 assert.equal(exchange.action({callback_query:{message,data:'exchange:other'}}),'');
});
test('exchange renders both lists, safe names and empty states',()=>{
 const text=exchange.render({'42':JSON.stringify({side:'withdraw',name:'<Иван>'}),'43':JSON.stringify({side:'deposit',name:'Ольга'}),'44':'broken'});
 assert.match(text,/Хочет сделать вывод/);assert.match(text,/Хочет пополнить/);
 assert.match(text,/tg:\/\/user\?id=42/);assert.match(text,/&lt;Иван&gt;/);assert.match(text,/Ольга/);
 assert.equal((exchange.render({}).match(/Пока нет заявок/g)||[]).length,2);
 assert.match(exchange.render(['42',JSON.stringify({side:'deposit',name:'Пётр'})]),/Пётр/);
});
test('remove targets the clicking player and refreshes the message with all three buttons',async()=>{
 const fs=require('node:fs'),vm=require('node:vm');
 const sent=[],commands=[],mod={exports:{}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-exchange'),'utf8'),{module:mod,AbortSignal,require:id=>id==='./redis'?{pipeline:async rows=>{commands.push(...rows);return [{result:rows[0][0]==='HGETALL'?{'43':JSON.stringify({side:'deposit',name:'Ольга'})}:1}];}}:{guardedFetch:async(url,options)=>{sent.push({url,body:JSON.parse(options.body)});return {json:async()=>({ok:true})};}}});
 await mod.exports.handle({callback_query:{id:'click42',data:'exchange:remove',from:{id:42,first_name:'Иван'},message:{message_id:7,chat:{id:-123,type:'supergroup'}}}},'test');
 const mutation=commands[0];
 assert.equal(mutation[0],'EVAL');assert.match(mutation[1],/ARGV\[2\]=='remove' or/);
 assert.equal(mutation[3],'poker_app:telegram:exchange:-123');
 assert.equal(mutation[5],'42');assert.equal(mutation[6],'remove');
 assert.equal(sent[0].body.text,'Вы удалены из списка');
 assert.equal(sent[1].body.message_id,7);assert.match(sent[1].body.text,/Ольга/);
 assert.deepEqual(sent[1].body.reply_markup.inline_keyboard.flat().map(b=>b.callback_data),['exchange:withdraw','exchange:deposit','exchange:remove']);
});
