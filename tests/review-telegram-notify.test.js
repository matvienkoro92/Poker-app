const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(){
 const sent=[];
 const deps={'./account-id':{getPreferredUserIdByDtId:async id=>({ID1:'tg_101',ID2:'tg_202'})[id]},
 './telegram-bot-send':{sendTelegramMessage:async(token,payload)=>{sent.push(payload);return {ok:true};}},
 './telegram-group-policy':{eventChatId:async()=>'-100123'},
 './telegram-participation-gate':{canReachTelegramBot:async()=>true}};
 const box={module:{exports:{}},require:id=>deps[id],process:{env:{TELEGRAM_BOT_TOKEN:'test'}},console,URL};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/review-telegram-notify'),'utf8'),box);
 return {api:box.module.exports,sent};
}
const topic={id:'a'.repeat(24),type:'hand',authorName:'Имя',authorNick:'Покерманки',cards:['Ah','Kd'],gameMode:'cash',bigBlindMinor:4000,totalPotMinor:320000,question:'Как лучше сыграть <или пас>?',followers:{ID1:true,ID2:true,ID3:false}};
test('new hand announcement includes nickname, cards, cash limit, pot, comment and link',async()=>{
 const {api,sent}=setup();await api.notify(topic,{accountId:'ID1'});
 assert.equal(sent.length,1);assert.equal(sent[0].chat_id,'-100123');assert.match(sent[0].text,/Покерманки\nA♥ K♦\nКеш · 20\/40 ₽ · банк 3\s200 ₽\n\n<b>Как лучше сыграть &lt;или пас&gt;\?<\/b>\n\nhttps:/);assert.equal(sent[0].parseMode,'HTML');assert.doesNotMatch(sent[0].text,/Имя/);assert.match(sent[0].buttonUrl,/review_aaaaaaaaaaaaaaaaaaaaaaaa/);assert.equal(sent[0].notificationScope,'club-review');
});
test('comments notify followers privately excluding sender and unsubscribed users',async()=>{
 const {api,sent}=setup();await api.notify(topic,{accountId:'ID1'},{authorName:'Автор',text:'Комментарий'});
 assert.equal(sent.length,1);assert.equal(sent[0].chat_id,'202');assert.match(sent[0].text,/Комментарий/);
 assert.equal(await api.checkSubscription('ID2'),'');assert.match(await api.checkSubscription('ID3'),/Telegram/);
});
test('a new comment privately notifies the topic author without a follow subscription',async()=>{
 const {api,sent}=setup();
 await api.notify({...topic,authorId:'ID1',followers:{}},{accountId:'ID2',nick:'МиссClick'},{authorName:'Имя игрока',text:'Я бы сыграл колл на тёрне'});
 assert.equal(sent.length,1);
 assert.equal(sent[0].chat_id,'101');
 assert.match(sent[0].text,/Игрок МиссClick оставил комментарий к вашей раздаче/);
 assert.match(sent[0].text,/Я бы сыграл колл на тёрне/);
 assert.equal(sent[0].buttonText,'Открыть раздачу');
 assert.match(sent[0].buttonUrl,/startapp=review_aaaaaaaaaaaaaaaaaaaaaaaa/);
});
