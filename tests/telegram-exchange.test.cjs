const {test}=require('node:test');
const assert=require('node:assert/strict');
const exchange=require('../lib/telegram-exchange');
test('exchange accepts only direct group commands and its two callbacks',()=>{
 const message={chat:{id:-123,type:'supergroup'},text:'/обмен'};
 assert.equal(exchange.action({message}),'list');
 assert.equal(exchange.action({message:{...message,text:'/обмен@Poker_dvatuza_bot'}}),'list');
 for(const text of ['/обмен@other_bot','обмен','/обмен extra'])assert.equal(exchange.action({message:{...message,text}}),'');
 assert.equal(exchange.action({edited_message:message}),'');
 assert.equal(exchange.action({message:{...message,chat:{type:'private'}}}),'');
 for(const side of ['withdraw','deposit'])assert.equal(exchange.action({callback_query:{message,data:'exchange:'+side}}),side);
 assert.equal(exchange.action({callback_query:{message,data:'exchange:other'}}),'');
});
test('exchange renders both lists, safe names and empty states',()=>{
 const text=exchange.render({'42':JSON.stringify({side:'withdraw',name:'<Иван>'}),'43':JSON.stringify({side:'deposit',name:'Ольга'}),'44':'broken'});
 assert.match(text,/Хочет сделать вывод/);assert.match(text,/Хочет пополнить/);
 assert.match(text,/tg:\/\/user\?id=42/);assert.match(text,/&lt;Иван&gt;/);assert.match(text,/Ольга/);
 assert.equal((exchange.render({}).match(/Пока нет заявок/g)||[]).length,2);
 assert.match(exchange.render(['42',JSON.stringify({side:'deposit',name:'Пётр'})]),/Пётр/);
});
