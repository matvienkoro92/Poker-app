(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PokerHallCardPick=api;})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
var effects=[{id:'gold',title:'Золотой столик',text:'Тёплое золотое сияние столика до конца дня.'},{id:'emerald',title:'Изумрудная удача',text:'Изумрудное сияние фишек и шкатулки до конца дня.'},{id:'royal',title:'Королевский вечер',text:'Фиолетовое сияние и звёзды вокруг шкатулки до конца дня.'}];
function day(now){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));}
function valid(v,date){return !!v&&v.day===date&&Number.isInteger(v.ace)&&v.ace>=0&&v.ace<3&&Number.isInteger(v.effect)&&v.effect>=0&&v.effect<effects.length&&(v.choice===null||Number.isInteger(v.choice)&&v.choice>=0&&v.choice<3);}
function create(options){var storage=options.storage,random=options.random||Math.random,now=options.now||Date.now,key='poker-hall-card-pick-v1:'+options.account,memory=null;
function state(){var date=day(now()),v=memory;try{var saved=JSON.parse(storage.getItem(key)||'null');if(valid(saved,date))v=saved;}catch(_){}if(!valid(v,date)){v={day:date,ace:Math.min(2,Math.floor(random()*3)),effect:Math.min(effects.length-1,Math.floor(random()*effects.length)),choice:null};}memory=v;save(v);return {...v};}
function save(v){memory={...v};try{storage.setItem(key,JSON.stringify(v));}catch(_){} }
return {state:state,canReplay:function(){return typeof options.canReplay==='function'&&options.canReplay()===true;},restart:function(){if(typeof options.canReplay!=='function'||options.canReplay()!==true)throw Error('replay_not_allowed');var v={day:day(now()),ace:Math.min(2,Math.floor(random()*3)),effect:Math.min(effects.length-1,Math.floor(random()*effects.length)),choice:null};save(v);return {...v};},choose:function(index){if(!Number.isInteger(index)||index<0||index>2)throw Error('invalid_card');var v=state();if(v.choice===null){v.choice=index;save(v);}return {...v,won:v.choice===v.ace,reward:effects[v.effect]};},effect:function(){var v=state();return v.choice===v.ace?effects[v.effect]:null;}};
}
return {create:create,effects:effects,day:day};
});
