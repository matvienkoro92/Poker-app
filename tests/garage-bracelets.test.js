const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../app-garage-catalog');
const garage=require('../lib/player-garage');

test('right wrist bracelets survive character saves alongside other jewelry',()=>{
 const ids=['braceletGoldCuff','braceletSilverCuff','braceletGoldChain','braceletSilverChain','none'];
 for(const bracelet of ids){
  const saved=garage.chooseScoped({...G.defaults,bracelet,watch:'roseDress',ring:'clubSignet'},
   {stats:{level:100}},{paint:'ruby'},'character');
  assert.equal(saved.bracelet,bracelet);
  assert.equal(saved.watch,'roseDress');
  assert.equal(saved.ring,'clubSignet');
  assert.equal(saved.paint,'ruby');
  assert.equal(G.normalize(saved,{level:100}).bracelet,bracelet);
 }
});

test('vehicle saves preserve the selected bracelet',()=>{
 const saved=garage.chooseScoped(G.defaults,{stats:{level:100}},{bracelet:'braceletSilverChain'},'vehicle');
 assert.equal(saved.bracelet,'braceletSilverChain');
});
