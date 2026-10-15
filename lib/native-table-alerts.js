'use strict';
const {parseLimit,describe}=require('./table-subscriptions');
const games={NLH:'Холдем',PLO4:'PLO4',PLO5:'PLO5',PLO6:'PLO6',Durak:'Дурак',TwentyOne:'21',OFC:'OFC',Ceka:'Сека'};
function normalize(value,accountId,chatId){
 const v=value||{},kind=v.kind;if(!['game','player'].includes(kind))throw Error('Выберите игру или игрока');
 const selectedGames=Array.isArray(v.selectedGames)?[...new Set(v.selectedGames)]:[],selectedLimits=Array.isArray(v.selectedLimits)?[...new Set(v.selectedLimits)]:[];
 if(selectedGames.some(g=>typeof g!=='string'||!Object.hasOwn(games,g))||selectedGames.length>8)throw Error('Некорректный вид игры');
 if(selectedLimits.length>20||selectedLimits.some(l=>!['low','middle','high'].includes(l)&&!parseLimit(l)))throw Error('Некорректный лимит');
 const minPlayers=Number(v.minPlayers??1),durationHours=Number(v.durationHours??0);if(!Number.isInteger(minPlayers)||minPlayers<1||minPlayers>9)throw Error('Число игроков: от 1 до 9');if(![0,2,8].includes(durationHours))throw Error('Некорректный срок подписки');
 if(v.botEnabled!==true&&v.pushEnabled!==true)throw Error('Выберите, куда получать оповещения');if(v.botEnabled===true&&!chatId)throw Error('Для Telegram привяжите Telegram-аккаунт в профиле');
 const sub={kind,mode:'selected',selectedGames,selectedLimits:selectedLimits.map(l=>{const p=parseLimit(l);return p?p.small+'/'+p.big:l;}),minPlayers,durationHours,cashOnly:true,botEnabled:v.botEnabled===true,pushEnabled:v.pushEnabled===true,deliveryAccountId:accountId,telegramChatId:chatId||null};
 if(kind==='player'){if(!/^\d{1,15}$/.test(String(v.playerId||''))||/^0+$/.test(String(v.playerId)))throw Error('Введите ID Poker21 или выберите игрока из поиска');sub.playerId=String(v.playerId);sub.nick=String(v.nick||'Игрок').slice(0,80);}
 return sub;
}
function publicSubscription(sub){return {id:sub.id,kind:sub.kind,playerId:sub.playerId,nick:sub.nick,selectedGames:sub.selectedGames||[],selectedLimits:sub.selectedLimits||[],minPlayers:sub.minPlayers||1,durationHours:sub.durationHours||0,expiresAt:sub.expiresAt,botEnabled:sub.botEnabled===true,pushEnabled:sub.pushEnabled===true,title:describe(sub)};}
module.exports={normalize,publicSubscription,games};
