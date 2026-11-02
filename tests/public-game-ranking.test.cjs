const test=require('node:test'),assert=require('node:assert/strict');
test('guest ranking exposes only public columns and rejects unsupported games',async()=>{
 const rankings=require('../lib/telegram-game-rankings'),old=rankings.readPlayers;rankings.readPlayers=async()=>[{id:'ID123456',name:'Игрок',rank:1,wins:2,losses:0,ratingScore:33,secret:'private'}];
 try{const read=require('../lib/public-game-ranking');const result=await read({body:{discipline:'long',ratingMode:'paid'}});assert.equal(result.guest,true);assert.equal(result.self,null);assert.deepEqual(result.ranking,[{rank:1,name:'Игрок',wins:2,losses:0,ratingScore:33}]);assert.equal((await read({body:{discipline:'darts',ratingMode:'paid'}})).ok,false);}finally{rankings.readPlayers=old;}
});
