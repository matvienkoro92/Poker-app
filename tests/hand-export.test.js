const test=require('node:test'),assert=require('node:assert/strict');
const api=require('../starting-hands/bulk-export');
const share=require('../starting-hands/hand-share');
const rows=Array.from({length:123},(_,i)=>({handId:String(i+1),playedAt:'2026-10-01T03:00:00Z',mode:'cash',game:'NLH',position:'BTN',cards:['As','Kh'],bigBlindMinor:100,resultMinor:200,bb:2}));
function reply(ids){return {ok:true,playerId:'999',version:'v1',hands:ids.slice().reverse().map(handId=>({handId,replay:{cards:['As','Kh'],events:[{actor:'Вы',code:'17'}]}}))};}
test('collects all selected hands in bounded batches preserving selection order',async()=>{
 const sizes=[],progress=[];const data=await api.collect([...rows,rows[0]],'999','v1',async(ids,version)=>{sizes.push(ids.length);assert.equal(version,'v1');return reply(ids);},(done,total)=>progress.push([done,total]));
 assert.deepEqual(sizes,[50,50,23]);assert.equal(data.count,123);assert.deepEqual(data.hands.map(h=>h.summary.handId),rows.map(h=>h.handId));assert.deepEqual(progress,[[50,123],[100,123],[123,123]]);
 const json=JSON.parse(api.serialize(data,'json'));assert.equal(json.hands[0].replay.events[0].code,'17');
 const txt=api.serialize(data,'txt',share.text);assert.equal((txt.match(/Раздача #/g)||[]).length,123);assert.match(txt,/Раздача #123/);assert.match(txt,/Чек/);
});
test('fails rather than returning a partial or mixed-version export',async()=>{
 for(const mutate of [r=>({...r,version:'new'}),r=>({...r,playerId:'other'}),r=>({...r,hands:[]})])await assert.rejects(api.collect(rows.slice(0,1),'999','v1',async ids=>mutate(reply(ids))));
 let calls=0;await assert.rejects(api.collect(rows,'999','v1',async ids=>{if(++calls===2)throw new Error('network');return reply(ids);}),/network/);assert.equal(calls,2);
});
