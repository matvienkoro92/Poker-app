'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-admin-deposits.js','utf8'),context={};vm.createContext(context);vm.runInContext(source.slice(source.indexOf('  function entryAuthor('),source.indexOf('  function card(e)')),context);
test('payout author is derived from the original creator rather than the last operator',()=>{
 assert.equal(context.entryAuthor({createdBy:'tg_2144406710',createdByName:'Администратор'}),'Аня');
 assert.equal(context.entryAuthor({createdBy:'1897001087',createdByName:'Администратор'}),'Вика');
 assert.equal(context.entryAuthor({createdBy:'388008256',createdByName:'Роман'}),'Роман');
});
