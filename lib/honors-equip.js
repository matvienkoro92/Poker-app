'use strict';
async function equipRing(accountId,month,{admin=false,honors=require('./club-honors'),redis=require('./club-social').redis,hall=require('./player-hall')}={}){
 if(!/^(0[1-9]|1[0-2])\.\d{4}$/.test(String(month)))throw Error('Неверный месяц награды');
 const earned=await honors.entitlements(accountId,redis);
 if(!earned.includes('month:'+month))throw Error('Этот перстень доступен только победителю месяца');
 const current=await hall.read(accountId,true,admin);
 await hall.save(accountId,{version:current.version,featured:current.featured,theme:current.theme,goal:current.goal,shelves:current.shelves,garage:{...current.garage.loadout,ring:'monthChampion'},garageScope:'character'},admin);
 return {ok:true,month,ring:'monthChampion'};
}
module.exports={equipRing};
