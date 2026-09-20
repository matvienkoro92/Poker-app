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
 assert.match(text,/Префлоп · Банк: 0 bb/);assert.match(text,/Вы — Рейз 2 bb/);assert.match(text,/Флоп: 10♥ 3♣ 5♦ · Банк: 5,5 bb/);assert.match(text,/Итоговый банк: 8,5 bb/);assert.match(text,/Результат: \+5 bb/);assert.doesNotMatch(text,/фишек/);
});
test('shows each street opening pot and a separate final pot after the last actions',()=>{
 const hand={handId:'pot',mode:'cash',playedAt:'2026-09-18T10:00:00Z',position:'UTG',bigBlindMinor:4000,resultMinor:0,bb:0};
 const replay={events:[{code:'18',actor:'SB',amount:20},{code:'19',actor:'BB',amount:40},{code:'3',actor:'Вы',amount:120},{code:'2',actor:'BB',amount:120},{code:'94',board:['4d','8h','4c']},{code:'20',actor:'Вы',amount:1256.26},{code:'5',actor:'Игрок',amount:2942.67},{code:'2',actor:'Вы',amount:1686.41}]};
 const text=share.text(hand,replay);
 assert.match(text,/Префлоп · Банк: 0 ₽/);
 assert.match(text,/Флоп: 4♦ 8♥ 4♣ · Банк: 300 ₽/);
 assert.match(text,/Вы — Ставка 1\s256,26 ₽[\s\S]*Игрок — Олл-ин 2\s942,67 ₽[\s\S]*Вы — Колл 1\s686,41 ₽[\s\S]*Итоговый банк: 6\s185,34 ₽/);
 assert.equal((text.match(/Итоговый банк:/g)||[]).length,1);
});
test('carries the completed pot into the next street header, never the current street header',()=>{
 const hand={handId:'streets',mode:'cash',playedAt:'2026-09-18T10:00:00Z',position:'BB',bigBlindMinor:4000,resultMinor:0,bb:0};
 const replay={events:[{code:'18',actor:'SB',amount:20},{code:'19',actor:'Вы',amount:40},{code:'94',board:['As','Kd','2h']},{code:'20',actor:'SB',amount:80},{code:'2',actor:'Вы',amount:80},{code:'94',board:['As','Kd','2h','3s']},{code:'17',actor:'SB'},{code:'17',actor:'Вы'},{code:'94',board:['As','Kd','2h','3s','4c']},{code:'20',actor:'SB',amount:120},{code:'2',actor:'Вы',amount:120}]};
 const text=share.text(hand,replay);
 assert.match(text,/Префлоп · Банк: 0 ₽/);
 assert.match(text,/Флоп: A♠ K♦ 2♥ · Банк: 60 ₽/);
 assert.match(text,/Тёрн: A♠ K♦ 2♥ 3♠ · Банк: 220 ₽/);
 assert.match(text,/Ривер: A♠ K♦ 2♥ 3♠ 4♣ · Банк: 220 ₽/);
 assert.match(text,/Итоговый банк: 460 ₽/);
});
test('adds compact positions to action lines',()=>{
 const hand={handId:'789',playerId:'hero',mode:'cash',metric:'bb',playedAt:'2026-09-18T10:00:00Z',cards:['As','Kd'],position:'BTN',bigBlindMinor:4000,resultMinor:0,bb:0};
 const replay={stacks:[{actor:'UTG',amount:800},{actor:'Вы',amount:1200},{actor:'Small',amount:400},{actor:'Big',amount:1600}],events:[{code:'18',actor:'Small',actorId:'sb',amount:20},{code:'19',actor:'Big',actorId:'bb',amount:40},{code:'10',actor:'UTG',actorId:'utg'},{code:'3',actor:'Вы',actorId:'hero',amount:120}]};
 replay.seats=[{actorId:'utg',actor:'UTG',position:'CO'},{actorId:'hero',actor:'Вы',position:'BTN'},{actorId:'sb',actor:'Small',position:'SB'},{actorId:'bb',actor:'Big',position:'BB'}];
 const text=share.text(hand,replay);assert.match(text,/SB: Small \(10 bb\) — МБ/);assert.match(text,/BB: Big \(40 bb\) — ББ/);assert.match(text,/CO: UTG \(20 bb\) — Фолд/);assert.match(text,/BTN: Вы — Рейз/);assert.doesNotMatch(text,/Вы \(/);
});
test('restores an omitted Poker21 straddle before the first preflop decision',()=>{
 const hand={handId:'4789853475792',playerId:'508434',mode:'cash',metric:'bb',playedAt:'2026-09-19T21:31:15Z',cards:['Th','8d'],position:'UTG',bigBlindMinor:4000,resultMinor:0,bb:0};
 const replay={seats:[{actorId:'508434',actor:'Вы',position:'UTG'},{actorId:'464311',actor:'MP player',position:'MP'},{actorId:'878178',actor:'CO player',position:'CO'},{actorId:'589733',actor:'BTN player',position:'BTN'},{actorId:'208238',actor:'SB player',position:'SB'},{actorId:'286730',actor:'BB player',position:'BB'}],events:[{sequence:0,code:'92',actor:'Стол',actorId:'-1',amount:120,board:[]},{sequence:2,code:'18',actor:'SB player',actorId:'208238',amount:20,board:[]},{sequence:3,code:'19',actor:'BB player',actorId:'286730',amount:40,board:[]},{sequence:10,code:'10',actor:'CO player',actorId:'878178',amount:0,board:[]},{sequence:12,code:'10',actor:'BTN player',actorId:'589733',amount:0,board:[]},{sequence:14,code:'10',actor:'SB player',actorId:'208238',amount:0,board:[]},{sequence:16,code:'10',actor:'BB player',actorId:'286730',amount:0,board:[]},{sequence:18,code:'2',actor:'Вы',actorId:'508434',amount:80,board:[]},{sequence:21,code:'17',actor:'MP player',actorId:'464311',amount:0,board:[]},{sequence:22,code:'94',actor:'Стол',actorId:'-1',amount:0,board:['8s','6s','Tc']}]};
 const normalized=share.events(replay),straddle=normalized.find(event=>event.code==='21');
 assert.deepEqual({actorId:straddle.actorId,amount:straddle.amount,inferred:straddle.inferred},{actorId:'464311',amount:80,inferred:true});
 assert.ok(normalized.indexOf(straddle)<normalized.findIndex(event=>event.code==='10'));
 const text=share.text(hand,replay);assert.match(text,/MP: MP player — Страдл 2 bb/);assert.match(text,/Флоп: 8♠ 6♠ 10♣ · Банк: 8,5 bb/);
});
test('does not invent a straddle for an ordinary limp and BB check',()=>{
 const replay={seats:[{actorId:'u',position:'UTG'},{actorId:'b',position:'BB'}],events:[{code:'19',actorId:'b',amount:40,board:[]},{code:'2',actorId:'u',amount:40,board:[]},{code:'17',actorId:'b',amount:0,board:[]}]};
 assert.equal(share.events(replay),replay.events);
});
test('restores a straddle when live seat storage is not in action order',()=>{
 const replay={seats:[{actorId:'co',position:'CO'},{actorId:'bb',position:'BB'},{actorId:'straddle',position:'MP'},{actorId:'utg',position:'UTG'}],events:[{code:'19',actorId:'bb',amount:40,board:[]},{code:'10',actorId:'co',amount:0,board:[]},{code:'2',actorId:'utg',amount:80,board:[]},{code:'17',actor:'Straddler',actorId:'straddle',amount:0,board:[]}]};
 const inferred=share.events(replay).find(event=>event.code==='21');
 assert.deepEqual({actorId:inferred.actorId,amount:inferred.amount},{actorId:'straddle',amount:80});
});
test('repairs straddles and pots in already published hand text',()=>{
 const old=['Префлоп · Банк: 0 bb','SB: Small — МБ 0,5 bb','BB: Big — ББ 1 bb','CO: C — Фолд','BTN: D — Фолд','UTG: Вы — Колл 2 bb','MP: Player — Чек','','Флоп: 8♠ 6♠ 10♣ · Банк: 6,5 bb','Итоговый банк: 8,5 bb'].join('\n');
 const repaired=share.restoreTextStraddle(old);
 assert.match(repaired,/MP: Player — Страдл 2 bb[\s\S]*CO: C — Фолд/);
 assert.match(repaired,/Флоп: .+ · Банк: 8,5 bb/);assert.match(repaired,/Итоговый банк: 10,5 bb/);
 assert.equal(share.restoreTextStraddle(repaired),repaired);
});
