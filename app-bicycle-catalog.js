(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PokerBicycle=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const rows=[
 ['frame','Окраска рамы','blue','Клубный синий','ruby','Красная эмаль',2],
 ['fork','Вилка','stock','Жёсткая вилка','suspension','Амортизационная вилка',3],
 ['tyres','Шины','city','Городские шины','trail','Широкие Trail',4],
 ['brakes','Тормоза','rim','Ободные тормоза','disc','Дисковые тормоза',5],
 ['gears','Трансмиссия','single','Одна скорость','sport','Спортивная кассета',6],
 ['handlebar','Руль','flat','Прямой руль','riser','Поднятый руль с грипсами',7],
 ['saddle','Седло','comfort','Городское седло','sport','Спортивное седло',8],
 ['pedals','Педали','stock','Обычные педали','platform','Алюминиевые платформы',9],
 ['headlight','Свет','none','Без фары','led','LED-фара и задний фонарь',10],
 ['rack','Багажник','none','Без багажника','touring','Багажник с велосумкой',11],
 ['wheels','Колёса','spokes','Спицованные колёса','aero','Облегчённые колёса Aero',12]
];
const groups=Object.fromEntries(rows.map(r=>[r[0],r[1]]));
const defaults=Object.fromEntries(rows.map(r=>[r[0],r[2]]));
const items=rows.flatMap(([kind,group,base,baseTitle,id,title,level])=>[{kind,id:base,title:baseTitle,level:1,key:kind+':'+base},{kind,id,title,level,key:kind+':'+id}]);
function level(value){return Math.max(1,Math.min(100,Math.floor(Number(value)||1)));}
function catalog(value){const n=level(value);return items.map(i=>({...i,unlocked:n>=i.level}));}
function normalize(value,n,strict=false){const result={...defaults},available=catalog(n);for(const kind of Object.keys(groups)){const id=value?.[kind]??defaults[kind],item=available.find(i=>i.kind===kind&&i.id===id);if(!item||!item.unlocked){if(strict)throw Object.assign(Error(!item?'Неизвестная деталь велосипеда':'Деталь «'+item.title+'» доступна с '+item.level+'-го уровня'),{status:400});}else result[kind]=id;}return result;}
function view(value,n){return {level:level(n),loadout:normalize(value,n),catalog:catalog(n),groups};}
function rewards(n){return items.filter(i=>i.level===Number(n)&&i.id!==defaults[i.kind]);}
return {groups,defaults,items,catalog,normalize,view,rewards};});
