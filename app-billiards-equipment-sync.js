(function(root){
 'use strict';
 const memory=new Map();
 function key(account){return 'p21:billiards:table:v1:'+account;}
 function cached(account){if(memory.has(account))return memory.get(account);try{return localStorage.getItem(key(account));}catch{return null;}}
 function remember(account,table){if(table)memory.set(account,table);if(table)try{localStorage.setItem(key(account),table);}catch{}}
 const sync={cached,
  async load(account,request){const local=cached(account);try{const response=await request('billiards',{action:'equipment',migrate:true,...(local?{equipment:{table:local}}:{})});const table=response.equipment?.table||local;remember(account,table);return table;}catch{return local;}},
  async save(account,table,request){const response=await request('billiards',{action:'equipment',equipment:{table}});if(response.equipment?.table!==table)throw Error('Не удалось сохранить стол в аккаунте.');remember(account,table);return table;}
 };
 root.PokerBilliardsEquipmentSync=sync;if(typeof module==='object')module.exports=sync;
})(typeof window==='object'?window:globalThis);
