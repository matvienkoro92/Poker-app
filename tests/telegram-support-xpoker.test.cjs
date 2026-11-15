const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture(){
 let raw=JSON.stringify({revision:0,entries:[],requests:[]});const mod={exports:{}},writes=[];
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-support-xpoker'),'utf8'),{module:mod,require:id=>id==='./redis'?{pipeline:async cmds=>cmds.map(c=>{if(c[0]==='GET')return {result:raw};assert.equal(c[0],'EVAL');assert.equal(c[4],raw);raw=c[5];writes.push(JSON.parse(raw));return {result:1};})}:id==='./account-id'?{ensureDtIdForUserId:async()=> 'ID000123'}:id==='./admin-deposits'?require('../lib/admin-deposits'):require(id)});
 return {service:mod.exports,writes,get state(){return JSON.parse(raw);}};
}
test('confirmed link uses ledger validation and persists author; retries are idempotent',async()=>{
 const f=fixture(),input={accountId:'ID000123',telegramId:'100',poker21Id:'421508',xpokerId:'2335996',actor:42,actorName:'Менеджер',requestId:'xpoker_test_request_123456'};
 await f.service.save(input);await f.service.save(input);
 assert.equal(f.writes.length,1);
 const link=f.state.playerAccounts.find(p=>p.room==='X'&&p.playerId==='2335996');
 assert.equal(link.profileKey,'P21|421508');assert.equal(link.createdBy,'42');
});
test('confirmation is bound to the manager and current Poker21 identity',async()=>{
 const f=fixture(),notices=[],client={id:'100',name:'Игрок',headerMessageId:7,threadId:10,xpokerLink:{actor:'42',xpokerId:'2335996',accountId:'ID000123',poker21Id:'421508',expiresAt:Date.now()+10000}};
 const base={cb:{data:'support:xpoker-confirm',id:'confirm'},source:{from:{is_bot:true},message_id:7},user:{id:43},client,group:'-100',token:'test',api:async(t,method,body)=>{notices.push(body)},saveClient:async()=>{},syncPlayerCard:async()=>{},operatorName:()=> 'Менеджер',readPlayerIdentity:async()=>({poker21Id:'999999'})};
 assert.equal(await f.service.handle(base),true);assert.equal(f.writes.length,0);
 await f.service.handle({...base,user:{id:42}});assert.equal(f.writes.length,0);
 assert.ok(notices.some(n=>n.text?.includes('изменился')));
});

test('X-Poker links to internal player without Poker21 and cannot be claimed by another player',async()=>{
 const f=fixture(),input={accountId:'ID000123',telegramId:'100',nick:'Игрок',xpokerId:'987654321',actor:42,actorName:'Менеджер',requestId:'xpoker_no_p21_12345'};
 await f.service.save(input);
 assert.equal(f.state.playerIdentityLinks[0].accountId,'ID000123');
 assert.equal(f.state.playerIdentityLinks[0].playerId,'987654321');
 assert.equal(f.state.playerAccounts,undefined);
 await assert.rejects(f.service.save({...input,accountId:'ID000124',requestId:'xpoker_other_12345'}),/другому игроку/);
});
test('adding a direct link retains all existing deposit room links',async()=>{
 const f=fixture();await f.service.save({accountId:'ID000123',poker21Id:'421508',xpokerId:'2335996',actor:42,requestId:'xpoker_legacy_12345'});
 const legacy=JSON.stringify(f.state.playerAccounts);
 await f.service.save({accountId:'ID000124',xpokerId:'987654321',actor:42,requestId:'xpoker_independent_12345'});
 assert.equal(JSON.stringify(f.state.playerAccounts),legacy);
});

test('manager can start and confirm linking for a player with no Poker21',async()=>{
 const f=fixture(),client={id:'100',name:'Игрок',headerMessageId:7,threadId:10},notices=[];
 let created=false;
 const args={source:{from:{is_bot:true},message_id:7},user:{id:42},client,group:'-100',token:'test',api:async(t,method,body)=>{notices.push(body)},saveClient:async()=>{created=true},syncPlayerCard:async()=>{},operatorName:()=> 'Менеджер',readPlayerIdentity:async()=>({accountId:created?'ID000123':null,poker21Id:null,name:'Игрок',xpokerIds:[]})};
 await f.service.handle({...args,m:{text:'/xid 987654321'}});
 assert.equal(client.xpokerLink.accountId,'ID000123');assert.equal(client.xpokerLink.poker21Id,null);
 await f.service.handle({...args,cb:{data:'support:xpoker-confirm',id:'confirm'}});
 assert.equal(f.state.playerIdentityLinks[0].accountId,'ID000123');
 assert.equal(client.xpokerLink,undefined);
 assert.ok(notices.some(n=>n.text?.includes('привязан к игроку')));
});
