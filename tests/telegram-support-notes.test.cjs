'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {append}=require('../lib/telegram-support-notes');
test('notes keep chronological authors, newest text and Telegram length budget without mutating history',()=>{
 const notes=Array.from({length:30},(_,i)=>({author:i%2?'Вика':'Аня',text:'Заметка '+i+' '+ '😀'.repeat(200)}));
 const result=append('Карточка\nРейк: 100 ₽',notes);
 assert.ok(result.length<=4096);assert.ok(result.includes('Заметка 29'));assert.match(result,/Ранее: \d+ заметок/);assert.equal(notes.length,30);
 const long=append('Карточка',[{author:'Аня',text:'😀'.repeat(5000)}]);assert.ok(long.length<=4096);assert.ok(long.endsWith('…'));assert.equal(append('Карточка',[]),'Карточка');
});
