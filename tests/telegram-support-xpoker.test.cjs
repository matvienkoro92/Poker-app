const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('Suprema and PPPoker bindings work without Poker21, share a deposit profile and prevent reassignment',async()=>{
 const f=fixture(),base={accountId:'ID000123',telegramId:'100',nick:'Игрок',actor:42,actorName:'Менеджер'};
 await f.service.save({...base,room:'Supr',xpokerId:'987654321',requestId:'suprema_link_123456'});
 await f.service.save({...base,room:'PP',xpokerId:'123456789',requestId:'pppoker_link_123456'});
 const directory=require('../lib/deposit-player-directory').depositPlayerDirectory(f.state);
 const a=directory.find(p=>p.room==='Supr'&&p.playerId==='987654321'),b=directory.find(p=>p.room==='PP'&&p.playerId==='123456789');
 assert.equal(a.profileKey,b.profileKey);
 await assert.rejects(f.service.save({...base,room:'PP',xpokerId:'123456789',accountId:'ID000124',requestId:'pppoker_other_123456'}),/другому игроку/);
});
test('Suprema and PPPoker controls capture ID and confirm internally with the correct room',async()=>{
 for(const [room,action,cmd,label] of [['Supr','support:supr','sid','Suprema'],['PP','support:pp','ppid','PPPoker']]){
  const f=fixture(),client={id:'100',name:'Игрок',headerMessageId:7,threadId:10},notices=[];
  const args={source:{from:{is_bot:true},message_id:7},user:{id:42},client,group:'-100',token:'test',api:async(t,method,body)=>{notices.push(body);},saveClient:async()=>{},syncPlayerCard:async()=>{},operatorName:()=> 'Менеджер',readPlayerIdentity:async()=>({accountId:'ID000123',name:'Игрок'})};
  await f.service.handle({...args,cb:{data:action,id:'start'}});
  assert.equal(client.xpokerLink.room,room);assert.ok(notices.some(n=>n.text?.includes('/'+cmd)));
  await f.service.handle({...args,m:{text:'987654321'}});
  assert.equal(f.state.playerIdentityLinks,undefined);
  await f.service.handle({...args,cb:{data:'support:xpoker-confirm',id:'confirm'}});
  assert.equal(f.state.playerIdentityLinks[0].room,room);assert.equal(f.state.playerIdentityLinks[0].playerId,'987654321');
  assert.ok(notices.some(n=>n.text?.includes('✅ '+label)));assert.ok(notices.every(n=>!n.chat_id||n.chat_id==='-100'));
 }
});
function fixture(p21={}){
 let raw=JSON.stringify({revision:0,entries:[],requests:[]});const mod={exports:{}},writes=[];
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-support-xpoker'),'utf8'),{module:mod,require:id=>id==='./pokerplus'?{bindMiniAppPlayer:async(...args)=>{p21.args=args;return {pokerPlusUserId:'888888'};}}:id==='./pokerplus-identity'?{pokerPlusTelegramIdCandidates:async(account,user)=>{p21.identity=user;return [String(user.id)];}}:id==='./email-auth'?{getLinkedEmailOriginalByDtId:async()=>''}:id==='./redis'?{pipeline:async cmds=>cmds.map(c=>{if(c[0]==='GET')return {result:raw};assert.equal(c[0],'EVAL');assert.equal(c[4],raw);raw=c[5];writes.push(JSON.parse(raw));return {result:1};})}:id==='./account-id'?{ensureDtIdForUserId:async()=> 'ID000123'}:id==='./admin-deposits'?require('../lib/admin-deposits'):require(id)});
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
test('manager correction replaces the old binding without changing recorded operations',async()=>{
 const f=fixture(),base={accountId:'ID000123',telegramId:'100',poker21Id:'421508',actor:42,actorName:'Менеджер'};
 await f.service.save({...base,xpokerId:'2335996',requestId:'old_link_123456789012'});
 await f.service.save({...base,xpokerId:'4300234',replacePlayerId:'2335996',requestId:'correct_link_123456789012'});
 assert.deepEqual(f.state.playerIdentityLinks.map(x=>x.playerId),['4300234']);
 assert.equal(f.state.playerAccounts.find(x=>x.playerId==='2335996').profileKey,'X|2335996');
 assert.equal(f.state.playerAccounts.find(x=>x.playerId==='4300234').profileKey,'P21|421508');
 assert.equal(f.state.playerIdentityLinkChanges[0].createdBy,'42');
 assert.deepEqual(f.state.entries,[]);
});

test('Poker21 manager correction binds with the player identity after confirmation',async()=>{
 const p21={},f=fixture(p21),notices=[],client={id:'100',name:'Игрок',headerMessageId:7,threadId:10};
 const args={source:{from:{is_bot:true},message_id:7},user:{id:42},client,group:'-100',token:'test',api:async(t,m,b)=>notices.push(b),saveClient:async()=>{},syncPlayerCard:async()=>{},operatorName:()=> 'Менеджер',readPlayerIdentity:async()=>({accountId:'ID000123',poker21Id:'421508'})};
 await f.service.handle({...args,cb:{data:'support:p21',id:'start'}});
 await f.service.handle({...args,m:{text:'test-player-binding-key'}});
 assert.equal(p21.args,undefined);
 assert.ok(!notices.some(x=>x.text?.includes('test-player-binding-key')));
 await f.service.handle({...args,cb:{data:'support:xpoker-confirm',id:'confirm'}});
 assert.equal(p21.args[0],'ID000123');assert.equal(p21.identity.id,100);
 assert.equal(p21.args[2],'test-player-binding-key');assert.equal(client.xpokerLink,undefined);
});
test('changing a pending ID by command visibly acknowledges the new number',async()=>{
 const f=fixture(),notices=[],client={id:'100',name:'Игрок',headerMessageId:7,threadId:10};
 const args={source:{from:{is_bot:true},message_id:7},user:{id:42},client,group:'-100',token:'test',api:async(t,m,b)=>notices.push(b),saveClient:async()=>{},syncPlayerCard:async()=>{},operatorName:()=> 'Менеджер',readPlayerIdentity:async()=>({accountId:'ID000123',xpokerIds:['2335996']})};
 await f.service.handle({...args,m:{text:'/xid 4300234'}});
 await f.service.handle({...args,m:{text:'/xid 9876543'}});
 assert.equal(client.xpokerLink.xpokerId,'9876543');
 assert.ok(notices.at(-1).text.includes('Новый X-Poker ID: 9876543'));
 assert.ok(notices.at(-1).text.includes('Заменит 2335996'));
 assert.equal(f.writes.length,0);
});
