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
  var catalog = {
    version:4,slots:slots,sets:sets,
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
  // A model is a distinct visual item, independent of the old rarity roll.
  catalog.models=[];
  sets.forEach(function(set){
    ['body','legs','feet','head'].forEach(function(slot){
      if(slot==='feet'&&set.id==='grinder')return; // Same white sneakers as the club model.
      catalog.models.push({id:set.id+'-'+slot,set:set.id,slot:slot});
    });
    catalog.models.push({id:set.id+'-trophy',set:set.id,slot:'trophy'});
    catalog.phrasePools[set.id].forEach(function(phrase,n){catalog.models.push({id:set.id+'-phrase-'+n,set:set.id,slot:'phrase',phrase:phrase});});
  });
  catalog.models.push({id:'final-eyes',set:'final',slot:'eyes'},{id:'club-hand',set:'club',slot:'hand'},{id:'oldschool-hand',set:'oldschool',slot:'hand'});
  catalog.models.push(
    {id:'pokermanki-rocket',set:'club',slot:'hand',title:'Ракета ПокерМанки',atlas:'characters',art:0},
    {id:'waaar-yacht',set:'final',slot:'hand',title:'Яхта Ваара',atlas:'characters',art:1},
    {id:'babnik-roadster',set:'final',slot:'hand',title:'Родстер Бабника',atlas:'characters',art:2},
    {id:'waaar-phrase',set:'final',slot:'phrase',phrase:'На финалку своим ходом'},
    {id:'babnik-phrase',set:'final',slot:'phrase',phrase:'За столом покерфейс. На выходе — кабриолет.'}
  );
  catalog.models.forEach(function(model){model.cost=20;model.starter=['club-body','club-legs','club-feet'].includes(model.id);model.name=catalog.itemName(model);});
  catalog.duplicateDust=4;
  catalog.model=function(id){return catalog.models.find(function(m){return m.id===id;});};
  catalog.modelId=function(item){
    if(!item||item.award)return '';
    if(catalog.model(item.id))return item.id;
    if(catalog.model(item.modelId))return item.modelId;
    if(item.slot==='eyes'||item.slot==='hand'&&item.set==='final')return 'final-eyes';
    if(item.slot==='hand'&&item.set==='grinder')return 'grinder-head';
    if(item.slot==='feet'&&item.set==='grinder')return 'club-feet';
    if(item.slot==='phrase'){var pool=catalog.phrasePools[item.set]||[],n=item.phrase?pool.indexOf(item.phrase):0;return n>=0?item.set+'-phrase-'+n:'';}
    var id=item.set+'-'+item.slot;return catalog.model(id)?id:'';
  };
  catalog.characterProps='./assets/hero-poker/character-props-v1.webp';
  catalog.characters=[
    {id:'pokermanki',name:'ПокерМанки',nicks:['покерманки','романдий'],art:'./assets/club-news-personal/pokermanki-news-cutout-v4.webp',description:'Зелёный клубный костюм и своя ракета ПокерМанки.',models:['club-body','club-legs','club-feet','club-head','pokermanki-rocket','club-phrase-1']},
    {id:'waaar',name:'Ваар',nicks:['waaar','waaarr','waaaar'],art:'./assets/club-news-personal/waaar-news-cutout-v3.webp',description:'Чёрное, золото и яхта из клубного образа Ваара.',models:['grinder-body','grinder-head','final-legs','final-feet','waaar-yacht','waaar-phrase']},
    {id:'babnik',name:'Бабник',nicks:['бабник'],art:'./assets/club-news-personal/babnik-car-transparent-v3.webp',description:'Вечерний выход, тёмные очки и красный родстер Бабника.',models:['final-body','final-legs','final-feet','final-eyes','babnik-roadster','babnik-phrase']}
  ];
  catalog.characterForNick=function(nick){var n=String(nick||'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');return catalog.characters.find(function(c){return c.nicks.includes(n);});};
  return catalog;

});
