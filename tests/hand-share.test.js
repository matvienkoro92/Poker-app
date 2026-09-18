const test=require('node:test'),assert=require('node:assert/strict');
const share=require('../starting-hands/hand-share');
test('all-in runout is separated after the last call, not after the first shove',()=>{
 const before='Префлоп · Банк: 100\nMP: A — Олл-ин 50\nBTN: B — Колл 50';
 const after='Флоп: A♠ K♣ 2♦\nТёрн: A♠ K♣ 2♦ 3♠\nРивер: A♠ K♣ 2♦ 3♠ 4♠\nВскрытие: A · Q♠ Q♣\nРезультат: +100';
 assert.deepEqual(share.splitOutcome(before+'\n'+after),{visible:before,hidden:after});
});
test('river shove and side-pot decisions stay visible',()=>{
 const before='Префлоп\nA — Олл-ин 10\nB — Колл 10\nC — Колл 10\nФлоп: A♠ K♣ 2♦\nB — Ставка 20\nC — Колл 20\nРивер: A♠ K♣ 2♦ 3♠ 4♠\nB — Олл-ин 50\nC — Колл 50';
 assert.deepEqual(share.splitOutcome(before+'\nВскрытие: B · Q♠ Q♣\nРезультат: -100'),{visible:before,hidden:'Вскрытие: B · Q♠ Q♣\nРезультат: -100'});
});
test('without an all-in the board stays visible but showdown and result are separated',()=>{
 const before='Флоп: A♠ K♣ 2♦\nB — Чек\nРивер: A♠ K♣ 2♦ 3♠ 4♠\nB — Чек';
 assert.equal(share.splitOutcome(before+'\nРезультат: +100').visible,before);
 assert.deepEqual(share.splitOutcome(before),{visible:before,hidden:''});
});
test('hidden publication contains no runout, opponent cards or result',()=>{
 const text=share.text({handId:'1',playedAt:'2026-09-18',position:'SB',bigBlindMinor:100,resultMinor:200,bb:2},{events:[{actor:'Вы',code:'5',amount:2},{actor:'B',code:'2',amount:2},{board:['As','Kd','2h']}],shownOpponents:[{actor:'B',disclosure:'showdown-allin',cards:['Qs','Qc']}]},{showShowdown:false});
 assert.match(text,/B — Колл/);assert.doesNotMatch(text,/Флоп|Вскрытие|Результат|Q♠/);
});
test('formats a complete hand for sharing',()=>{
 const text=share.text({handId:'123',mode:'cash',playedAt:'2026-09-16T10:00:00Z',cards:['As','Kh'],position:'BTN',bigBlindMinor:200,resultMinor:500,bb:2.5},{cards:['As','Kh'],events:[{code:'3',actor:'Вы',amount:6,board:[]},{code:'94',actor:'Стол',board:['2d','Tc','Js']},{code:'20',actor:'Вы',amount:10,board:[]}]});
 assert.match(text,/Раздача #123/);assert.match(text,/Мои карты: A♠ K♥/);assert.match(text,/Флоп: 2♦ 10♣ J♠/);assert.match(text,/Вы — Рейз 6/);assert.match(text,/Результат: \+5 ₽ · \+2,5 bb/);
});
test('publishes actions and street pots in selected big blinds',()=>{
 const text=share.text({handId:'456',mode:'mtt',metric:'bb',playedAt:'2026-09-18T10:00:00Z',cards:['4s','2s'],position:'BTN',bigBlindMinor:2000000,resultMinor:10000000,bb:5},{events:[{code:'18',actor:'SB',amount:10000},{code:'19',actor:'BB',amount:20000},{code:'3',actor:'Вы',amount:40000},{code:'2',actor:'BB',amount:40000},{code:'94',board:['Th','3c','5d']},{code:'20',actor:'Вы',amount:30000},{code:'2',actor:'BB',amount:30000}]});
 assert.match(text,/Префлоп · Банк: 5,5 bb/);assert.match(text,/Вы — Рейз 2 bb/);assert.match(text,/Флоп: 10♥ 3♣ 5♦ · Банк: 8,5 bb/);assert.match(text,/Результат: \+5 bb/);assert.doesNotMatch(text,/фишек/);
});
test('adds compact positions to action lines',()=>{
 const hand={handId:'789',playerId:'hero',mode:'cash',playedAt:'2026-09-18T10:00:00Z',cards:['As','Kd'],position:'BTN',bigBlindMinor:4000,resultMinor:0,bb:0};
 const replay={stacks:[{actor:'UTG'},{actor:'Вы'},{actor:'Small'},{actor:'Big'}],events:[{code:'18',actor:'Small',actorId:'sb',amount:20},{code:'19',actor:'Big',actorId:'bb',amount:40},{code:'10',actor:'UTG',actorId:'utg'},{code:'3',actor:'Вы',actorId:'hero',amount:120}]};
 replay.seats=[{actorId:'utg',actor:'UTG',position:'CO'},{actorId:'hero',actor:'Вы',position:'BTN'},{actorId:'sb',actor:'Small',position:'SB'},{actorId:'bb',actor:'Big',position:'BB'}];
 const text=share.text(hand,replay);assert.match(text,/SB: Small — Малый блайнд/);assert.match(text,/BB: Big — Большой блайнд/);assert.match(text,/CO: UTG — Фолд/);assert.match(text,/BTN: Вы — Рейз/);
});
