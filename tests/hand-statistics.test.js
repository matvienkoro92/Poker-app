const test = require('node:test');
const assert = require('node:assert/strict');
const {handClass, matrix, aggregate} = require('../lib/hand-statistics');
const base = {source:'test',sessionId:'s1',handId:'1',playerId:'player',mode:'cash',game:'NLH',
  playedAt:'2026-09-10T18:00:00Z',status:'completed',verified:true,unit:'RUB',scale:100,
  netDefinition:'game-net-v1',cards:['As','Kh'],resultMinor:-200,bigBlindMinor:200};
const options = {playerId:'player',mode:'cash'};
test('169 distinct classes; rank order, pairs, suitedness, invalid cards', () => {
  assert.equal(new Set(matrix().flat()).size,169);
  assert.equal(handClass(['Kh','Ah']),'AKs');
  assert.equal(handClass(['As','Kh']),'AKo');
  assert.equal(handClass(['Ac','Ad']),'AA');
  for (const cards of [['As','As'],['As','Kx'],['As'],['As','Kh','Qh']]) assert.equal(handClass(cards),null);
});
test('all dealt hands count including folds, forced blinds and zero outcomes', () => {
  const result = aggregate([base,{...base,handId:'2',resultMinor:0},{...base,handId:'3',resultMinor:600}],options);
  const cell = result.cells.find(c=>c.label==='AKo');
  assert.equal(cell.count,3); assert.equal(cell.resultMinor,400);
  assert.equal(cell.wins,1); assert.equal(cell.losses,1); assert.equal(cell.even,1);
  assert.equal(cell.bb100,200/3);
  assert.equal(result.cells.find(c=>c.label==='AA').resultMinor,null);
});
test('normalizes each hand by its own blind, never averages per-hand percentages', () => {
  const r=aggregate([base,{...base,handId:'2',resultMinor:1000,bigBlindMinor:1000}],options);
  assert.equal(r.resultMinor,800); assert.equal(r.bb,0); assert.equal(r.bb100,0);
});
test('isolates player, cash, MTT, SNG and rejects wrong units', () => {
  const rows=[base,{...base,playerId:'other'},{...base,mode:'mtt',unit:'CHIP'},
    {...base,mode:'sng',unit:'CHIP'},{...base,handId:'bad-unit',unit:'CHIP'}];
  assert.equal(aggregate(rows,options).count,1);
  assert.equal(aggregate(rows,{...options,mode:'mtt'}).unit,'CHIP');
  assert.equal(aggregate(rows,{...options,mode:'sng'}).count,1);
  assert.equal(aggregate(rows,options).excluded.units,1);
});
test('does not coerce missing values or include unknown, incomplete or unsupported hands', () => {
  const patches=[{resultMinor:null},{resultMinor:'100'},{bigBlindMinor:0},{verified:false},
    {status:'running'},{game:'PLO4'},{cards:[]},{scale:1},{playedAt:'2026-02-30T18:00:00Z'},
    {netDefinition:'raw-Win'},{handId:''}];
  assert.equal(aggregate(patches.map(p=>({...base,...p})),options).count,0);
});
test('deduplicates but quarantines conflicting versions of the same hand', () => {
  const good=aggregate([base,{...base,cards:['Kh','As']}],options);
  assert.equal(good.count,1); assert.equal(good.duplicates,1);
  const bad=aggregate([base,{...base,resultMinor:400}],options);
  assert.equal(bad.count,0); assert.equal(bad.excluded.conflict,1);
  assert.equal(aggregate([base,{...base,sessionId:'s2'}],options).count,2);
});
test('uses explicit UTC half-open periods; malformed periods fail', () => {
  assert.equal(aggregate([base],{...options,from:base.playedAt,to:'2026-09-11T00:00:00Z'}).count,1);
  assert.equal(aggregate([base],{...options,to:base.playedAt}).count,0);
  assert.throws(()=>aggregate([base],{...options,from:'yesterday'}));
  assert.throws(()=>aggregate([base],{...options,from:base.playedAt,to:base.playedAt}));
});
test('never exposes extra private fields through the projection', () => {
  const r=aggregate([{...base,ip:'private',opponentCards:['Ac','Ad']}],options);
  const hand=r.cells.find(c=>c.count).hands[0];
  assert.equal(hand.ip,undefined); assert.equal(hand.opponentCards,undefined);
});
test('cash table units must be explicit and never silently become rubles',()=>{
  const row={...base,unit:'TABLE_CHIP'};
  assert.equal(aggregate([row],options).count,0);
  const r=aggregate([row],{...options,cashUnit:'TABLE_CHIP'});
  assert.equal(r.count,1);assert.equal(r.unit,'TABLE_CHIP');
  assert.throws(()=>aggregate([row],{...options,cashUnit:'USD'}));
});

test('position filter preserves mode isolation and unfiltered positional totals',()=>{
 const core=require('../starting-hands/core');
 const row={source:'test',sessionId:'s',handId:'1',playerId:'p',mode:'cash',game:'NLH',playedAt:'2026-09-01T00:00:00Z',status:'completed',verified:true,unit:'TABLE_CHIP',scale:100,netDefinition:'game-net-v1',cards:['As','Kh'],resultMinor:400,bigBlindMinor:200,position:'BTN'};
 const rows=[row,{...row,handId:'2',position:'BB',resultMinor:-200},{...row,handId:'3',position:undefined},{...row,handId:'4',mode:'mtt',unit:'CHIP',resultMinor:9000}];
 const x=core.aggregate(rows,{playerId:'p',mode:'cash',cashUnit:'TABLE_CHIP',position:'BTN'});
 assert.equal(x.count,1);assert.equal(x.bb,2);assert.equal(x.positions.find(p=>p.position==='BB').bb,-1);assert.equal(x.positions.find(p=>p.position==='UNKNOWN').count,1);
 assert.equal(core.aggregate([row,{...row,position:'BB'}],{playerId:'p',mode:'cash',cashUnit:'TABLE_CHIP',position:'BTN'}).count,0);
});

test('live search matches partial IDs, opponent fragments, case and transliteration',()=>{
 const {matchesSearch}=require('../starting-hands/core');
 const row={handId:'1789152082927',opponents:[{playerId:'776157',name:'PlayerMayer'},{playerId:'975934',name:'Собака Павлова'}]};
 for(const handQuery of ['1','178','178915','5208'])assert.equal(matchesSearch(row,{handQuery}),true);
 assert.equal(matchesSearch(row,{handQuery:'999'}),false);
 for(const opponentQuery of ['mAyEr','@player','собака','sobaka','Павлова','776'])assert.equal(matchesSearch(row,{opponentQuery}),true);
 assert.equal(matchesSearch(row,{opponentQuery:'Perepil'}),false);
 assert.equal(matchesSearch(row,{opponentQuery:'Mayer',handQuery:'999'}),false);
});

test('profit graph is chronological and red plus blue equals green including losses',()=>{
 const {profitSeries}=require('../starting-hands/core');
 const rows=[{handId:'2',playedAt:'2026-09-02',resultMinor:-300,bb:-1.5,showdown:true},{handId:'1',playedAt:'2026-09-01',resultMinor:100,bb:1,showdown:false},{handId:'3',playedAt:'2026-09-03',resultMinor:-100,bb:-.5,showdown:false}];
 const x=profitSeries(rows,'bb');assert.equal(x.unknown,0);assert.equal(x.points[1].handId,'1');for(const p of x.points)assert.equal(p.total,p.showdown+p.nonShowdown);assert.equal(x.points.at(-1).total,-1);
 assert.equal(profitSeries(rows,'resultMinor').points.at(-1).total,-3);
 assert.equal(profitSeries([{...rows[0],showdown:null}],'bb').unknown,1);
 assert.equal(profitSeries([],'bb').points.length,1);
});
