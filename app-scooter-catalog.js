(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PokerScooter=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const rows=[
 ['frame','Окраска','graphite','Графит','gold','Золотой титан',4],
 ['deck','Дека','stock','Городская дека','armored','Усиленная широкая дека',5],
 ['wheels','Колёса','city','Городские колёса','terrain','Широкие All Terrain',6],
 ['brakes','Тормоза','foot','Ножной тормоз','disc','Дисковые тормоза',7],
 ['suspension','Подвеска','rigid','Жёсткая подвеска','dual','Двойная подвеска',8],
 ['motor','Привод','none','Без электропривода','twin','Два мотор-колеса',9],
 ['cockpit','Кокпит','plain','Базовый руль','smart','Дисплей и курок газа',10],
 ['lights','Свет','none','Без подсветки','neon','Неон и двойная LED-фара',11],
 ['body','Корпус','classic','Городской корпус','hyper','Hyper · карбон и аэрокорпус',12]
];
const groups=Object.fromEntries(rows.map(r=>[r[0],r[1]]));
const defaults=Object.fromEntries(rows.map(r=>[r[0],r[2]]));
const items=rows.flatMap(([kind,group,base,baseTitle,id,title,level])=>[{kind,id:base,title:baseTitle,level:3,key:kind+':'+base},{kind,id,title,level,key:kind+':'+id}]);
function level(value){return Math.max(3,Math.min(100,Math.floor(Number(value)||1)));}
function catalog(value){const n=Math.max(0,Math.floor(Number(value)||0));return items.map(i=>({...i,unlocked:n>=i.level}));}
function normalize(value,n,strict=false){if(strict&&Number(n)<3)throw Object.assign(Error('Самокат доступен с 3-го уровня'),{status:400});const result={...defaults},available=catalog(n);for(const kind of Object.keys(groups)){const id=value?.[kind]??defaults[kind],item=available.find(i=>i.kind===kind&&i.id===id);if(!item||!item.unlocked){if(strict)throw Object.assign(Error(!item?'Неизвестная деталь самоката':'Деталь «'+item.title+'» доступна с '+item.level+'-го уровня'),{status:400});}else result[kind]=id;}return result;}
function view(value,n){return {level:Math.max(1,Math.floor(Number(n)||1)),loadout:normalize(value,n),catalog:catalog(n),groups};}
function rewards(n){return items.filter(i=>i.level===Number(n)&&i.id!==defaults[i.kind]);}
return {groups,defaults,items,catalog,normalize,view,rewards};});
