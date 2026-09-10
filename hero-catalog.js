(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.POKER_HERO_CATALOG=factory();})(typeof window!=='undefined'?window:this,function(){
  'use strict';
  return {
    slots:[{id:'head',name:'Голова',icon:'♛'},{id:'body',name:'Доспех',icon:'♜'},{id:'hand',name:'Оружие',icon:'⚔'},{id:'feet',name:'Обувь',icon:'◈'},{id:'charm',name:'Талисман',icon:'♦'},{id:'aura',name:'Аура',icon:'✺'}],
    rarities:[{id:'common',name:'Обычный',color:'#bdc6d1',bonus:1},{id:'uncommon',name:'Необычный',color:'#66d59b',bonus:2},{id:'rare',name:'Редкий',color:'#6bbcff',bonus:4},{id:'epic',name:'Эпический',color:'#bf8cff',bonus:7},{id:'legendary',name:'Легендарный',color:'#ffc05b',bonus:11}],
    branches:[{id:'courage',name:'Техника',color:'#f99b69'},{id:'resolve',name:'Дисциплина',color:'#7bb9e7'},{id:'insight',name:'Практика',color:'#8ed7b7'}],
    skills:[
      {id:'strike',branch:'courage',name:'Шансы банка',stat:'power',gain:2,max:15,level:1,description:'+2 техники героя за ранг'},
      {id:'tempo',branch:'courage',name:'Позиционная игра',stat:'power',gain:3,max:15,level:10,requires:'strike',description:'+3 техники героя за ранг'},
      {id:'mastery',branch:'courage',name:'Турнирная стратегия',stat:'power',gain:5,max:15,level:25,requires:'tempo',description:'+5 техники героя за ранг'},
      {id:'guard',branch:'resolve',name:'План сессии',stat:'guard',gain:2,max:15,level:1,description:'+2 дисциплины героя за ранг'},
      {id:'balance',branch:'resolve',name:'Контроль тильта',stat:'guard',gain:3,max:15,level:10,requires:'guard',description:'+3 дисциплины героя за ранг'},
      {id:'bastion',branch:'resolve',name:'Учёт результатов',stat:'guard',gain:5,max:15,level:25,requires:'balance',description:'+5 дисциплины героя за ранг'},
      {id:'search',branch:'insight',name:'Разбор раздач',stat:'discovery',gain:1,max:15,level:1,description:'+1 практики героя за ранг'},
      {id:'intuition',branch:'insight',name:'Обратная связь',stat:'discovery',gain:2,max:15,level:10,requires:'search',description:'+2 практики героя за ранг'},
      {id:'seer',branch:'insight',name:'Навигатор клуба',stat:'discovery',gain:3,max:15,level:25,requires:'intuition',description:'+3 практики героя за ранг'}
    ],
    sets:[{id:'ember',name:'Пепельный страж',color:'#ef9b60',stat:'power',pieces:['Венец углей','Кираса углей','Клинок углей','Сапоги углей','Сердце углей','Пламя углей']},{id:'tide',name:'Хранитель прилива',color:'#75c8e5',stat:'guard',pieces:['Корона прилива','Мантия прилива','Посох прилива','Сапоги прилива','Жемчуг прилива','Кольцо прилива']},{id:'grove',name:'Лесной странник',color:'#8bd89e',stat:'discovery',pieces:['Венец леса','Жилет леса','Лук леса','Сапоги леса','Лист леса','Дыхание леса']}],
    expeditions:[{id:'trail',name:'Разминка за столом',description:'Базовая задача · доступна с первого уровня',power:0,guard:0,quality:0},{id:'ruins',name:'Разбор сессии',description:'Задача на дисциплину · добыча не ниже необычной',power:25,guard:15,quality:1},{id:'citadel',name:'Финальный стол',description:'Турнирная задача · добыча не ниже редкой',power:70,guard:45,quality:2}]
  };
});
