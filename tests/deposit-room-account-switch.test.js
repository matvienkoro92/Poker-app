const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../app-admin-deposits.js'),'utf8');
test('changing room clears the previous ID or uses the selected player account',()=>{
 const input={value:'338241'},caption={},picker={dataset:{profileKey:'player'},querySelector:()=>caption};
 const scope={querySelector:s=>s==='[data-player-picker]'?picker:input};
 const room={value:'X',closest:()=>scope};
 const c={data:{playerDirectory:[{profileKey:'player',room:'P21',playerId:'338241'},{profileKey:'other',room:'X',playerId:'999'}]}};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('  function syncAllocationAccount('),source.indexOf('  function allocationRow(')),c);
 c.syncAllocationAccount(room);assert.equal(input.value,'');
 c.data.playerDirectory.push({profileKey:'player',room:'X',playerId:'123'});
 c.syncAllocationAccount(room);assert.equal(input.value,'123');
 room.value='P21';c.syncAllocationAccount(room);assert.equal(input.value,'338241');
 delete picker.dataset.profileKey;room.value='X';c.syncAllocationAccount(room);assert.equal(input.value,'');
});
