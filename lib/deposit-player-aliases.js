'use strict';
// Confirmed variants already used by rating normalization and player profiles.
// An alias expands search; distinct room/ID pairs are never merged.
const groups=[
 ['Lucky','Лаки'],
 ['Luck_is_Suck','Лак из сак','Лакисак'],
 ['LuckyBoom','ЛакиБум'],
 ['Кулер','Coo1er91','NeCoo1er91'],
 ['Ваар','Waaar','Waaarr','Waaarrr','Waaaar','Waaaarr','Waaaaar'],
 ['Пряник','pryanik2la'],
 ['ПокерМанки','Манки','Pokermanki'],
 ['FrankL','AndrushaMorf','4ezzi'],
 ['Рыбнадзор','МужНаЧас','Мужчина на час','Муж на час'],
 ['Em13','Em13!!','Emil13','Еm13','Еm13!!']
];
function depositPlayerAliases(nick){const lower=String(nick||'').trim().toLowerCase();const group=groups.find(g=>g.some(n=>n.toLowerCase()===lower));return group?group.filter(n=>n.toLowerCase()!==lower):[];}
module.exports={depositPlayerAliases,groups};
