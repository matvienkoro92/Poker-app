'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{create,CARDS}=require('../lib/nards-tournament-list');
function fixture(){
 const calls=[],items=Array.from({length:18},(_,i)=>({id:'ABCDEFGH'+String.fromCharCode(65+Math.floor(i/20))+String.fromCharCode(65+i%20),createdAt:1000-i,status:i<2?'registration':'completed'}));
 const page=create({prefix:'t:',activeKey:'active',commands:async rows=>rows.map(([cmd,key,a,b])=>{calls.push([cmd,key,a,b]);if(cmd==='ZREVRANK')return items.findIndex(t=>t.id===a);if(cmd==='ZREVRANGE')return items.slice(a,b+1).map(t=>t.id);if(cmd==='MGET')return [key,a,b,...rows[0].slice(4)].map(k=>JSON.stringify(items.find(t=>'t:'+t.id===k)));if(cmd==='EVAL'&&key===CARDS)return rows[0].slice(3).map(k=>JSON.stringify(items.find(t=>'t:'+t.id===k)));if(cmd==='EVAL')return items.filter(t=>t.status==='registration').map(t=>t.id);throw Error(cmd);})});
 return {page,calls,items};
}
test('initial list returns only active tournaments and one previous, without reading all history',async()=>{
 const f=fixture(),result=await f.page();assert.equal(result.tournaments.length,3);assert.deepEqual(result.tournaments.map(t=>t.status),['registration','registration','completed']);assert.equal(result.nextCursor,f.items[2].id);assert.ok(result.hasMore);assert.ok(f.calls.filter(c=>c[0]==='ZREVRANGE').every(c=>c[3]-c[2]<6));
});
test('archive reads five per click and cursor stays stable if a newer tournament appears',async()=>{
 const f=fixture(),first=await f.page();const page=await f.page({archive:true,before:first.nextCursor});assert.deepEqual(page.tournaments.map(t=>t.id),f.items.slice(3,8).map(t=>t.id));
 const cursor=page.nextCursor;f.items.unshift({id:'ZZZZZZZZZZ',status:'registration',createdAt:2000});
 const next=await f.page({archive:true,before:cursor});assert.deepEqual(next.tournaments.map(t=>t.id),f.items.slice(9,14).map(t=>t.id));
});
test('hidden tournaments are skipped and archive ends without repeated cards',async()=>{
 const f=fixture();f.items[5].deletedAt=1;const first=await f.page();let cursor=first.nextCursor,ids=[],pages=0;
 while(cursor){const p=await f.page({archive:true,before:cursor});assert.ok(p.tournaments.length<=5);ids.push(...p.tournaments.map(t=>t.id));cursor=p.nextCursor;if(++pages>5)throw Error('Infinite archive');}
 assert.equal(new Set(ids).size,ids.length);assert.equal(ids.length,14);assert.ok(!ids.includes(f.items[5].id));
});
