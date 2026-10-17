'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-admin-deposits.js','utf8'),context={money:n=>(n/100)+' ₽'};
vm.createContext(context);vm.runInContext(source.slice(source.indexOf('  function reservedCopyText('),source.indexOf('  async function copy(value)')),context);
test('copied requisites start with reserved amount, then optional name, bank and destination',()=>{
 assert.equal(context.reservedCopyText({recipient:'Саян Баирович',bank:'Т-Банк',phone:'+79253239894',total:800000},{amount:300000}),'3000 ₽\nСаян Баирович\nТ-Банк\n+79253239894');
 for(const recipient of ['', 'нет', 'ID 655861'])assert.equal(context.reservedCopyText({recipient,bank:'Сбер',card:'2204180127547347'},{amount:100000}),'1000 ₽\nСбер\n2204180127547347');
});
