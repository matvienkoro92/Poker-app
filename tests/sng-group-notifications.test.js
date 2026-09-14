const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../lib/api-handlers/sng-champions'),'utf8');
const notifySource=source.slice(source.indexOf('async function notifySngApplication('),source.indexOf('async function notifySngBalancePaid('));
for(const recipients of [[],['123'],['-1001227353220']])test('SNG application sends one club photo with button; recipients '+recipients,async()=>{
 const calls=[];const context={BOT_TOKEN:'test',console,eventChatId:async()=>'-1001227353220',resolveSngApplicationNotifyChatIds:async()=>[...recipients],sngOpenUrl:()=> 'https://t.me/test?startapp=sng',buildNewApplicationNotification:()=> 'New player',sngApplicationImage:async()=>({imageUrl:'https://example.com/player.webp'}),sendTelegramMessage:async(token,opts)=>{calls.push(opts);return {ok:true}},telegramChatIdFromMemberId:()=>'',};
 vm.createContext(context);vm.runInContext(notifySource,context);await context.notifySngApplication({memberId:'1'},{});
 const group=calls.filter(x=>x.chatId==='-1001227353220');assert.equal(group.length,1);assert.equal(group[0].notificationScope,'sng-application');assert.equal(group[0].text,'New player');assert.equal(group[0].imageUrl,'https://example.com/player.webp');assert.equal(group[0].buttonText,'Записаться в СНГ');
 if(recipients.includes('123'))assert.equal(calls.find(x=>x.chatId==='123').notificationScope,'');
});
