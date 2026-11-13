'use strict';
const redis=require('./redis');
const KEY='poker_app:telegram:support:config:v1';
async function config(){
  if(!redis.isConfigured())return null;
  const [row]=await redis.pipeline([['GET',KEY]],{throwOnError:true,context:'support.config'});
  let value;try{value=JSON.parse(row?.result||'null');}catch{return null;}
  return value&&/^-100\d+$/.test(String(value.chatId))?value:null;
}
module.exports={KEY,config};
