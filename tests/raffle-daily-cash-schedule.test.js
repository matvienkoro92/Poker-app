const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),Module=require('node:module'),path=require('node:path');
const filename=require.resolve('../lib/api-handlers/raffles');
const mod=new Module(filename,module);mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));
mod._compile(fs.readFileSync(filename,'utf8')+'\nmodule.exports.testCash={DAILY_CASH_SERIES,dailyCashSeriesForDraw,dailyCashTemplateWithSeries,normalizeDailyCashRaffleInPlace,raffleAllResultBatchesDrawn,raffleDrawLifecycleNeedsSettlement};',filename);
const {DAILY_CASH_SERIES:series,normalizeDailyCashRaffleInPlace:normalize}=mod.exports.testCash;
function raffle(s){return {id:'test',status:'active',title:'old',totalWinners:10,groups:[{count:5,prize:'1000 ₽'},{count:5,prize:'1000 ₽'}],participants:[{accountId:'A'}],winners:[],endDate:'2026-09-07T17:15:00.000Z',resultBatches:[{time:'10:45'},{time:'17:45'}],recurrence:{type:'daily',seriesId:s.seriesId,startTime:'20:16',template:{prizeKind:'cash'}}};}
test('cash draws have one prize group with requested amounts and times',()=>{assert.equal(series[0].resultTime,'10:40');assert.equal(series[0].totalWinners,25);assert.equal(series[0].groups[0].count,25);assert.equal(series[1].resultTime,'17:30');assert.equal(series[1].totalWinners,7);assert.equal(series[1].groups.length,1);assert.equal(series[1].groups[0].count,7);assert.equal(series[1].resultBatches,undefined);});
test('pending raffle migrates once, retaining participants and replacing split draw',()=>{const r=raffle(series[1]);assert.equal(normalize(r),true);assert.equal(r.totalWinners,mod.exports.testCash.dailyCashSeriesForDraw(series[1],r.endDate).totalWinners);assert.equal(r.resultBatches,undefined);assert.equal(r.participants[0].accountId,'A');assert.equal(new Date(r.endDate).getUTCHours(),14);assert.equal(new Date(r.endDate).getUTCMinutes(),30);assert.equal(normalize(r),false);});
test('completed or partly drawn raffles keep their existing prizes',()=>{for(const partial of [false,true]){const r=raffle(series[1]);if(partial)r.resultBatches[0].drawnAt='2026-09-06T07:45:00Z';else r.status='drawn';const before=JSON.stringify(r);assert.equal(normalize(r),false);assert.equal(JSON.stringify(r),before);}});

test('all drawn groups finish before the legacy overall deadline',()=>{const r=raffle(series[1]);r.endDate='2099-09-06T17:15:00Z';r.resultBatches.forEach(b=>b.drawnAt='2026-09-06T14:45:00Z');assert.equal(mod.exports.testCash.raffleAllResultBatchesDrawn(r),true);assert.equal(mod.exports.testCash.raffleDrawLifecycleNeedsSettlement(r,new Date('2026-09-06T15:00:00Z')),true);delete r.resultBatches[1].drawnAt;assert.equal(mod.exports.testCash.raffleAllResultBatchesDrawn(r),false);});

test('Sunday draw replaces only the 20/40 series with five video-table buy-ins',()=>{
  const choose=mod.exports.testCash.dailyCashSeriesForDraw;
  const sunday=choose(series[1],'2026-10-04T14:30:00Z');
  assert.equal(sunday.totalWinners,5);assert.equal(sunday.groups[0].count,5);
  assert.match(sunday.title,/видеостол/);assert.match(sunday.groups[0].prize,/2000 ₽/);
  assert.equal(sunday.seriesId,series[1].seriesId);assert.equal(sunday.accessLevel,10);
  assert.equal(choose(series[0],'2026-10-04T07:40:00Z'),series[0]);
  for(let day=5;day<=10;day++)assert.equal(choose(series[1],`2026-10-${day.toString().padStart(2,'0')}T14:30:00Z`),series[1]);
  assert.equal(choose(series[1],'2026-10-11T14:30:00Z').totalWinners,5);
  assert.equal(choose(series[1],'2026-10-03T21:30:00Z').totalWinners,5,'Use Moscow Sunday, not UTC Saturday');
});
test('today migrates with participants intact and next weekdays return to standard prizes',()=>{
  const r=raffle(series[1]);r.endDate='2026-10-04T14:30:00Z';r.recurrence.startTime=series[1].startTime;
  assert.equal(normalize(r),true);assert.equal(r.totalWinners,5);assert.equal(r.groups[0].count,5);
  assert.match(r.title,/видеостол/);assert.equal(r.participants[0].accountId,'A');
  assert.equal(r.recurrence.template.totalWinners,5);assert.equal(normalize(r),false);
  r.endDate='2026-10-05T14:30:00Z';assert.equal(normalize(r),true);assert.equal(r.totalWinners,7);
  assert.equal(r.groups[0].prize,series[1].groups[0].prize);assert.equal(r.recurrence.template.totalWinners,7);
});
test('Sunday completed and partially drawn prizes remain unchanged',()=>{
  for(const drawn of [true,false]){const r=raffle(series[1]);r.endDate='2026-10-04T14:30:00Z';r.recurrence.startTime=series[1].startTime;
    if(drawn)r.status='drawn';else r.winners=[{accountId:'B'}];const before=JSON.stringify(r);assert.equal(normalize(r),false);assert.equal(JSON.stringify(r),before);}
});

test('manual replacement survives repeated daily normalization without changing recurrence',()=>{
  const r=raffle(series[1]);
  r.prizesUpdatedAt='2026-10-06T13:11:00Z';
  r.title='5 × Беккинг-байин 2000 ₽ на видеостол';
  r.totalWinners=5;
  r.groups=[{count:5,prize:'Беккинг-байин 2000 ₽ на видеостол'}];
  r.endDate='2026-10-06T15:30:00Z';
  const before=JSON.stringify(r);
  for(let i=0;i<3;i++){assert.equal(normalize(r),false);assert.equal(JSON.stringify(r),before);}
});
test('manual additions also survive the daily template',()=>{
  const r=raffle(series[1]);r.prizesUpdatedAt='2026-10-06T13:11:00Z';
  r.groups.push({count:1,prize:'Беккинг-байин 2000 ₽ на видеостол'});r.totalWinners=11;
  const before=JSON.stringify(r);assert.equal(normalize(r),false);assert.equal(JSON.stringify(r),before);
});
