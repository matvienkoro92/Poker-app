'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),parser=require('../app-admin-deposits-parser');
const corpus=require('./fixtures/deposit-message-corpus.json');
function expect(text,fields){const result=parser.parse(text);for(const [key,value] of Object.entries(fields))assert.equal(result[key],value,key+' in '+text);}
test('all owner examples with ordinary, nonbreaking and narrow spaces, CRLF and flattened messages',()=>{
 for(const sample of corpus){for(const text of [sample.text,sample.text.replace(/ /g,'\u00a0'),sample.text.replace(/ /g,'\u202f'),sample.text.replace(/\n/g,'\r\n'),sample.text.replace(/\n/g,' ')])expect(text,sample.expected);}
});
test('room, amount, phone and number-order combinations stay separate',()=>{
 for(const [club,room] of Object.entries({'758417':'P21','1786376':'X','19645':'Supr','1004444':'PP'}))for(const [amount,value] of [['1000',100000],['3к',300000],['15 000',1500000],['50к',5000000],['100000',10000000]])for(const sep of [' ', ', ', '\n'])for(const phone of ['+79991234567','89991234567']){
  expect('Вывод '+amount+' '+club+sep+'676837 на Сбер '+phone,{amount:value,room,playerId:'676837',phone:'+79991234567',card:''});
  expect(amount+', 676837'+sep+club+' банк Сбер '+phone,{amount:value,room,playerId:'676837',phone:'+79991234567',card:''});
 }
});
test('uncertainty stays explicit and numbers are not invented',()=>{
 for(const text of ['ID 123456','758417','+79991234567','2202 2002 1234 5678','USDT\nTSaMfZDt41PKCjk5oxcNWBdCXZH8V8HDRe'])assert.equal(parser.parse(text).amount,null);
 assert.equal(parser.parse('Вывод 5000, остаток 2000').amount,null);
 assert.equal(parser.parse('Хпокер клуб 19645').room,'');
 assert.equal(parser.parse('Вывод 5000 на Сбер +79991234567 Спасибо').recipient,'');
 expect('Вывод 5000 123456 654321 на Сбер +79991234567',{card:'',amount:500000,playerId:''});
 assert.ok(parser.parse('Вывод 5000 123456 654321 на Сбер +79991234567').warnings.some(w=>w.includes('несколько возможных ID')));
 for(const greeting of ['Спасибо','Спасибо Большое','Добрый День','Здравствуйте'])expect('Вывод 5000 на Сбер +79991234567 '+greeting,{recipient:''});
});

test('ordinary and large explicit amounts are supported without a 100k limit or ID confusion',()=>{
 for(const amount of [1000,10000,50000,100000,150000,250000])expect('Вывод '+amount+' руб. ID 654321 на Сбер +79991234567',{amount:amount*100,playerId:'654321',phone:'+79991234567',card:''});
 for(const pan of ['2202200212345678','2202 2002 1234 5678','2202-2002-1234-5678','2202 2002 1234 5678 123'])expect('Вывод 5000 на '+pan+' ID 654321',{amount:500000,playerId:'654321',card:pan.replace(/[ -]/g,'')});
});
