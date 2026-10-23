'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {normalize,publicSubscription}=require('../lib/native-table-alerts');
const {matches}=require('../lib/table-subscriptions');
const input={kind:'game',pushEnabled:true,selectedGames:['PLO6'],selectedLimits:['5 / 10'],minPlayers:3,durationHours:2};
test('native subscription canonicalizes limits and binds delivery to authenticated account',()=>{const s=normalize({...input,deliveryAccountId:'spoof',telegramChatId:'spoof'},'real','42');assert.equal(s.deliveryAccountId,'real');assert.equal(s.telegramChatId,'42');assert.deepEqual(s.selectedLimits,['5/10']);const table={deskId:'1',leagueId:'184691',playType:'PLO6',blindAnnotation:'5/10',playerCount:3};assert.equal(matches(s,[table]).length,1);assert.equal(matches(s,[{...table,playerCount:2}]).length,0);assert.equal(matches(s,[{...table,playType:'NLH'}]).length,0);});
test('channels must be explicit booleans and Telegram must be linked',()=>{assert.throws(()=>normalize({...input,pushEnabled:'true'},'a'),/Выберите/);assert.throws(()=>normalize({...input,pushEnabled:false,botEnabled:true},'a'),/привяжите/);assert.equal(normalize({...input,pushEnabled:false,botEnabled:true},'a','42').botEnabled,true);});
test('invalid filters, time and player ID are rejected',()=>{for(const change of [{selectedGames:['invalid']},{selectedGames:['__proto__']},{selectedLimits:['10/5']},{minPlayers:10},{durationHours:24},{kind:'player',playerId:'0'},{kind:'player',playerId:'abc'}])assert.throws(()=>normalize({...input,...change},'a'));});
test('player alerts can combine games and limits and never expose delivery identity',()=>{const s=normalize({...input,kind:'player',playerId:'123',nick:'Ник'},'a');assert.equal(s.playerId,'123');assert.equal(publicSubscription(s).deliveryAccountId,undefined);assert.equal(publicSubscription(s).telegramChatId,undefined);});

 test('legacy bot subscriptions expose their Telegram channel and effective push preference',()=>{const sub={id:'12345678',kind:'game',game:'PLO6',mode:'any'};assert.equal(publicSubscription(sub).botEnabled,true);assert.equal(publicSubscription(sub).pushEnabled,false);assert.equal(publicSubscription(sub,true).pushEnabled,true);});

test('Omaha hi-lo has its own subscription filter, separate from high-only PLO',()=>{
 const sub=normalize({...input,selectedGames:['PLOHiLo'],minPlayers:1},'a');
 const table={deskId:'1',leagueId:'184691',playType:'PLO Hi-Lo',blindAnnotation:'5/10',playerCount:3};
 for(const playType of ['PLO Hi-Lo','PLOHiLo','PLO4 Hi/Lo','PLO5 HiLo','PLO6 Hi-Lo','Omaha Hi-Lo','PLO8','HiLo'])assert.equal(matches(sub,[{...table,playType}]).length,1,playType);
 for(const playType of ['PLO4','PLO5','PLO6','NLH','MTT PLO Hi-Lo'])assert.equal(matches(sub,[{...table,playType}]).length,0,playType);
 const highOnly=normalize({...input,minPlayers:1},'a');assert.equal(matches(highOnly,[table]).length,0);
});
