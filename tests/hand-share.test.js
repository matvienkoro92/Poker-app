const test=require('node:test'),assert=require('node:assert/strict');
const share=require('../starting-hands/hand-share');
test('formats a complete hand for sharing',()=>{
 const text=share.text({handId:'123',mode:'cash',playedAt:'2026-09-16T10:00:00Z',cards:['As','Kh'],position:'BTN',bigBlindMinor:200,resultMinor:500,bb:2.5},{cards:['As','Kh'],events:[{code:'3',actor:'Вы',amount:6,board:[]},{code:'94',actor:'Стол',board:['2d','Tc','Js']},{code:'20',actor:'Вы',amount:10,board:[]}]});
 assert.match(text,/Раздача #123/);assert.match(text,/Мои карты: A♠ K♥/);assert.match(text,/Флоп: 2♦ 10♣ J♠/);assert.match(text,/Вы — Рейз 6/);assert.match(text,/Результат: \+5 ₽ · \+2,5 bb/);
});
