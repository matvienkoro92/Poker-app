const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture(){
 let raw=JSON.stringify({revision:0,entries:[],requests:[]});const mod={exports:{}},writes=[];
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-support-xpoker'),'utf8'),{module:mod,require:id=>id==='./redis'?{pipeline:async cmds=>cmds.map(c=>{if(c[0]==='GET')return {result:raw};assert.equal(c[0],'EVAL');assert.equal(c[4],raw);raw=c[5];writes.push(JSON.parse(raw));return {result:1};})}:id==='./admin-deposits'?require('../lib/admin-deposits'):require(id)});
 return {service:mod.exports,writes,get state(){return JSON.parse(raw);}};
}
test('confirmed link uses ledger validation and persists author; retries are idempotent',async()=>{
 const f=fixture(),input={poker21Id:'421508',xpokerId:'2335996',actor:42,actorName:'Менеджер',requestId:'xpoker_test_request_123456'};
 await f.service.save(input);await f.service.save(input);
 assert.equal(f.writes.length,1);
 const link=f.state.playerAccounts.find(p=>p.room==='X'&&p.playerId==='2335996');
 assert.equal(link.profileKey,'P21|421508');assert.equal(link.createdBy,'42');
});
test('confirmation is bound to the manager and current Poker21 identity',async()=>{
 const f=fixture(),notices=[],client={id:'100',name:'Игрок',headerMessageId:7,threadId:10,xpokerLink:{actor:'42',xpokerId:'2335996',poker21Id:'421508',expiresAt:Date.now()+10000}};
 const base={cb:{data:'support:xpoker-confirm',id:'confirm'},source:{from:{is_bot:true},message_id:7},user:{id:43},client,group:'-100',token:'test',api:async(t,method,body)=>{notices.push(body)},saveClient:async()=>{},syncPlayerCard:async()=>{},operatorName:()=> 'Менеджер',readPlayerIdentity:async()=>({poker21Id:'999999'})};
 assert.equal(await f.service.handle(base),true);assert.equal(f.writes.length,0);
 await f.service.handle({...base,user:{id:42}});assert.equal(f.writes.length,0);
 assert.ok(notices.some(n=>n.text?.includes('изменилась')));
});
