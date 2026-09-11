(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.POKER_HERO_CATALOG=factory();})(typeof window!=='undefined'?window:this,function(){
  'use strict';
  var sets=[
    {id:'club',name:'Свои за столом',color:'#72c8a2',look:'club',phrase:'Держи фишку',prop:2,trophy:7,description:'Фирменный зелёный костюм. ПокерМанки остаётся собой.'},
    {id:'grinder',name:'Рег на минималках',color:'#91acc6',look:'grinder',phrase:'Я просто посмотреть',prop:0,trophy:5,description:'Худи, наушники и полное отсутствие теллзов. Почти.'},
    {id:'oldschool',name:'Фишка и стул',color:'#d5ab75',look:'oldschool',phrase:'One time. Последний, честно.',prop:1,trophy:4,description:'Жилет, деним и кофе. Историй хватит до следующего уровня блайндов.'},
    {id:'final',name:'За финалкой',color:'#ddc17f',look:'final',phrase:'Доехало — бывает',prop:3,trophy:6,description:'Вечерний костюм. На фото с кубком нужно выглядеть хорошо.'}
  ];
  var slots=[{id:'body',name:'Верх',icon:'♠'},{id:'legs',name:'Брюки',icon:'Ⅱ'},{id:'feet',name:'Обувь',icon:'⌁'},{id:'head',name:'На голову',icon:'♠'},{id:'eyes',name:'Очки',icon:'∞'},{id:'hand',name:'При себе',icon:'♣'},{id:'trophy',name:'Кубок',icon:'♜'},{id:'phrase',name:'Фраза',icon:'❞'}];
  var names={club:['Зелёный костюм ПокерМанки','Защитник карт «Своя фишка»','Ракета клуба','Держи фишку'],grinder:['Худи «Без теллзов»','Наушники «Я в раздаче»','Кристалл «Покерфейс»','Я просто посмотреть'],oldschool:['Жилет «Старая школа»','Кофе «Ещё один круг»','Кубок «Фишка и стул»','One time. Последний, честно.'],final:['Костюм «За финалкой»','Очки «Ничего не читается»','Браслет «Красивый выход»','Доехало — бывает']};
  return {
    version:3,slots:slots,sets:sets,
    rarities:[{id:'common',name:'Обычный',color:'#b9c1c4',bonus:1},{id:'uncommon',name:'Необычный',color:'#74cfa0',bonus:2},{id:'rare',name:'Редкий',color:'#81b8f6',bonus:4},{id:'epic',name:'Эпический',color:'#ba96e9',bonus:7},{id:'legendary',name:'Легендарный',color:'#f1c96f',bonus:11}],
    skills:[
      {id:'one_time',name:'Один раз!',icon:'♧',max:20,description:'В модели розыгрыша: +0,25% к весу участия за очко. До +5% к весу, не +5 процентных пунктов к шансу.'},
      {id:'river',name:'Доехало',icon:'↗',max:20,description:'В модели крутки: +0,1 процентного пункта к шансу бонуса за очко. Максимум +2 п.п.'},
      {id:'bonus',name:'Красивый занос',icon:'♦',max:20,description:'В модели: +0,5% к сумме бонуса за очко. Максимум +10%.'},
      {id:'rakeback',name:'Рейк под контроль',icon:'↩',max:20,description:'В сценарии нового участника: +0,1 п.п. к рейкбеку за очко. Максимум +2 п.п.; допуск новичка ещё не подключён.'},
      {id:'collector',name:'Коллекционер',icon:'▣',max:20,description:'Каждые 5 очков — дополнительное место для сохранённого образа. До четырёх дополнительных мест.'}
    ],
    phrasePools:{
      club:['Держи фишку','Пора на взлёт','Без бана сегодня','На опыте. И на кофе.'],
      grinder:['Я просто посмотреть','Теллзов нет. Кофе есть.','ГТО ушло на перерыв','Не отвлекайте, я фолд выбираю'],
      oldschool:['One time. Последний, честно.','Фишка и стул. Кофе отдельно.','Мой покерфейс старше твоего ника','Я эти рейзы ещё на диалапе видел'],
      final:['Доехало — бывает','На финалку — при параде','Фото с кубком без фильтров','Без шоудауна тоже красиво']
    },
    itemName:function(i){if(i.slot==='phrase'&&i.phrase)return i.phrase;if(i.title)return i.title;var extra={body:{club:'Олимпийка ПокерМанки',grinder:'Худи «Без теллзов»',oldschool:'Жилет «Старая школа»',final:'Пиджак «За финалкой»'},legs:{club:'Зелёные клубные брюки',grinder:'Джоггеры «Длинная сессия»',oldschool:'Джинсы «Старая школа»',final:'Брюки «Финальный стол»'},feet:{club:'Кеды «Свои в клубе»',grinder:'Кеды «До последнего круга»',oldschool:'Ботинки «Фишка и стул»',final:'Лоферы «За кубком»'},head:{club:'Кепка Poker21',grinder:'Наушники «Я в раздаче»',oldschool:'Шляпа «Старая школа»',final:'Федора «За финалкой»'}};if(extra[i.slot])return extra[i.slot][i.set];if(i.slot==='eyes')return 'Очки «Ничего не читается»';var n=['body','hand','trophy','phrase'].indexOf(i.slot);return names[i.set]?names[i.set][n]||'Клубная вещь':'Клубная вещь';},
    economy:{mode:'preview',raffleWeightPerPoint:0.0025,spinPpPerPoint:0.1,bonusPerPoint:0.005,rakebackPpPerPoint:0.1},
    pieceArt:{'legs-final':'./assets/hero-poker/legs-final-v1.webp','feet-oldschool':'./assets/hero-poker/feet-oldschool-v1.webp','feet-final':'./assets/hero-poker/feet-final-v1.webp'},
    headArt:{club:'./assets/hero-poker/head-club-v1.webp',grinder:'./assets/hero-poker/head-grinder-v1.webp',oldschool:'./assets/hero-poker/head-oldschool-v1.webp',final:'./assets/hero-poker/head-final-v1.webp'},eyesArt:'./assets/hero-poker/eyes-v1.webp',
    artRoot:'./assets/hero-poker/',lookArt:{club:'./assets/hero-poker/look-club-v1.webp',grinder:'./assets/hero-poker/look-grinder-v1.webp',final:'./assets/hero-poker/look-final-v1.webp',oldschool:'./assets/hero-poker/look-oldschool-v1.webp'},props:'./assets/hero-poker/props-v1.webp'
  };
});
