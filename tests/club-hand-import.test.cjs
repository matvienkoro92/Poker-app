const {test}=require('node:test');const assert=require('node:assert/strict');
const {merge}=require('../scripts/upload-club-hands.cjs');
const row={playerId:'123',handId:'1',source:'poker21-json',mode:'cash',playedAt:'2026-09-07T01:00:00Z',resultMinor:100,bigBlindMinor:200,unit:'TABLE_CHIP',cards:['Ah','Ad']};
const item=r=>({row:r,replay:{cards:r.cards,events:[]}});
test('preserves old history and EV, appends only new hands',()=>{
 const old={...row,ev:{status:'calculated',resultMinor:30}};
 const result=merge({rows:[old]},[item(row),item({...row,handId:'2'})],'123');
 assert.equal(result.rows.length,2);assert.deepEqual(result.rows[0].ev,old.ev);assert.deepEqual(result.entries.map(e=>e[0]),['2']);
 assert.equal(merge({rows:result.rows},[item(row),item({...row,handId:'2'})],'123').entries.length,0);
});
test('blocks conflicting source versions before upload',()=>{
 assert.throws(()=>merge({rows:[row]},[item({...row,resultMinor:200})],'123'),/conflict/);
});
test('blocks foreign owners, duplicate IDs and mismatched replay cards',()=>{
 assert.throws(()=>merge(null,[item({...row,playerId:'999'})],'123'),/owner/);
 assert.throws(()=>merge(null,[item(row),item(row)],'123'),/duplicate/);
 assert.throws(()=>merge(null,[{row,replay:{cards:['2h','2d']}}],'123'),/cards/);
});
test('separates source SNG from legacy MTT classification while preserving EV',()=>{
 const old={...row,mode:'mtt',unit:'CHIP',ev:{status:'not_applicable'}};
 const result=merge({rows:[old]},[item({...old,mode:'sng',sourceDeskType:'3'})],'123');
 assert.equal(result.corrected,1);assert.equal(result.rows[0].mode,'sng');assert.deepEqual(result.rows[0].ev,old.ev);assert.equal(result.entries.length,0);
 assert.throws(()=>merge({rows:[old]},[item({...old,mode:'sng'})],'123'),/conflict/);
});
