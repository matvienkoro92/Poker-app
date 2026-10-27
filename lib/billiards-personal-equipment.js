'use strict';
const tables=require('../app-billiards-tables');
module.exports=async({member,identity,body,commands,profile,resolve})=>{
 const accountId=await resolve(identity,member),key='poker_app:billiards:personal-equipment:v1:'+accountId;
 const [existing]=await commands([['HGET',key,'table']]);
 if(body.migrate&&existing)return {ok:true,equipment:{table:existing}};
 if(body.equipment?.table!==undefined){
  const player=await profile(accountId),table=String(body.equipment.table),available=tables.available(table,player.level);
  if(available.id!==table){const error=Error('Этот стол пока недоступен.');error.status=400;throw error;}
  await commands([[body.migrate?'HSETNX':'HSET',key,'table',table]]);
 }
 const [table]=await commands([['HGET',key,'table']]);return {ok:true,equipment:table?{table}:null};
};
