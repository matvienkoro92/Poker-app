const {test}=require('node:test');
const assert=require('node:assert/strict');
const {message}=require('../lib/nards-tournament-notifications');
function tournament(){return {title:'Фриролл',winnerId:'a',entries:[{id:'a',name:'Winner',poker21Id:'123456',accountId:'ID999999'},{id:'b',name:'Second',poker21Id:'654321'}],rounds:[{matches:[{winnerId:'a',playerIds:['a','b']}]}],ticketAwards:[{entryId:'a',amount:1000},{entryId:'b',amount:500}]};}
test('result lists both finalists with Poker21 IDs, individual ticket prizes and blank lines',()=>{
 const text=message(tournament(),'result').text;
 assert.match(text,/Победитель: Winner\nPoker21 ID: 123456\nПриз: билет на покер номиналом 1\s000 ₽\n\n🥈 2-е место: Second\nPoker21 ID: 654321\nПриз: билет на покер номиналом 500 ₽/);
 assert.doesNotMatch(text,/ID999999/);
});
test('chip prizes, missing Poker21 ID and absent opponent are represented without guessing',()=>{
 const t=tournament();delete t.ticketAwards;delete t.entries[1].poker21Id;t.paymentPlan=[{key:'prize:a',amount:900}];
 let text=message(t,'result').text;assert.match(text,/900 фишек Poker21/);assert.match(text,/2-е место: Second\nPoker21 ID: не указан\nПриз: без приза/);
 t.rounds[0].matches[0].playerIds=['a',null];assert.doesNotMatch(message(t,'result').text,/2-е место/);
});
