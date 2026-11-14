'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{createRequire}=require('node:module');
test('starting a subscription flow clears an older deposit amount prompt',async()=>{
 const path=require.resolve('../lib/club-table-subscriptions'),local=createRequire(path),module={exports:{}},commands=[];
 const mocks={'./table-subscriptions':{create:()=>({handle:async()=>true})},'./redis':{isConfigured:()=>true,pipeline:async rows=>{commands.push(...rows);return rows.map(()=>({result:1}));}},'./telegram-club-menu-idle':{}};
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||local(id)});
 await module.exports.handle({callback_query:{data:'club:sub:player',from:{id:42},message:{chat:{id:42,type:'private'}}}});
 assert.equal(commands.length,1);assert.equal(commands[0][0],'DEL');assert.equal(commands[0][1],'poker_app:player-deposit:v1:waiting:42');
});
