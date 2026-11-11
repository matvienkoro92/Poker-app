const {test}=require('node:test'),assert=require('node:assert/strict'),{cups}=require('../lib/home-cups');
test('only own first places are sorted by actual prize; unbound players have no cups',()=>{const p={accountId:'ID100001',nick:'Alpha',bound:true};const rows=[['a','Alpha',1,100],['b','Alpha',1,900],['c','Alpha',2,2000],['d','Beta',1,9000]].map(([tournamentId,nick,place,reward])=>({tournamentId,tournament:'Турнир',nick,place,reward,date:'2026-01-01T12:00:00'}));assert.deepEqual(cups(p,rows).map(i=>i.history.results[0].reward),[900,100]);assert.deepEqual(cups({...p,bound:false},rows),[]);});
test('cups read only the verified nickname and binding, without XP or level services',async()=>{
 const social=require('../lib/club-social'),old=social.redis,oldProfile=social.memberProfile;let commands;
 social.redis=async rows=>{commands=rows;return [JSON.stringify({nickname:'ПокерМанки'}),'1'];};
 social.memberProfile=async()=>{throw Error('unrelated profile service unavailable');};
 try{const data=await require('../lib/home-cups').read('ID100001');assert.equal(data.ok,true);assert.ok(data.items.length>0);assert.equal(commands.length,2);assert.ok(commands.every(c=>c[0]==='HGET'&&c[2]==='ID100001'));}
 finally{social.redis=old;social.memberProfile=oldProfile;}
});
