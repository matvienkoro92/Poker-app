(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.POKER_HERO_CATALOG=factory();})(typeof window!=='undefined'?window:this,function(){
  'use strict';
  var sets=[
    {id:'club',name:'Свои за столом',color:'#72c8a2',look:'club',phrase:'Держи фишку',prop:2,trophy:7,description:'Фирменный зелёный костюм. ПокерМанки остаётся собой.'},
    {id:'grinder',name:'Рег на минималках',color:'#91acc6',look:'grinder',phrase:'Я просто посмотреть',prop:0,trophy:5,description:'Худи, наушники и полное отсутствие теллзов. Почти.'},
    {id:'oldschool',name:'Фишка и стул',color:'#d5ab75',look:'oldschool',phrase:'One time. Последний, честно.',prop:1,trophy:4,description:'Жилет, деним и кофе. Историй хватит до следующего уровня блайндов.'},
    {id:'final',name:'За финалкой',color:'#ddc17f',look:'final',phrase:'Доехало — бывает',prop:3,trophy:6,description:'Вечерний костюм. На фото с кубком нужно выглядеть хорошо.'}
  ];
  var slots=[{id:'body',name:'Верх',icon:'♠'},{id:'legs',name:'Брюки',icon:'Ⅱ'},{id:'feet',name:'Обувь',icon:'⌁'},{id:'head',name:'На голову',icon:'♠'},{id:'eyes',name:'Очки',icon:'∞'},{id:'hand',name:'При себе',icon:'♣'},{id:'trophy',name:'Кубок',icon:'♜'},{id:'phrase',name:'Фраза',icon:'❞'}];
  slots.splice(5,0,{id:'patch',name:'Нашивка на груди',icon:'◉'},{id:'sleeve',name:'Эмблема на рукаве',icon:'▰'},{id:'pin',name:'Значок',icon:'♦'},{id:'cufflinks',name:'Запонки',icon:'▪'});
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
    itemName:function(i){if(i.slot==='phrase'&&i.phrase)return i.phrase;if(i.title)return i.title;var extra={body:{club:'Клубная олимпийка «Два туза»',grinder:'Худи «Без теллзов»',oldschool:'Жилет «Старая школа»',final:'Пиджак «За финалкой»'},legs:{club:'Зелёные клубные брюки',grinder:'Джоггеры «Длинная сессия»',oldschool:'Джинсы «Старая школа»',final:'Брюки «Финальный стол»'},feet:{club:'Кеды «Свои в клубе»',grinder:'Кеды «До последнего круга»',oldschool:'Ботинки «Фишка и стул»',final:'Лоферы «За кубком»'},head:{club:'Кепка Poker21',grinder:'Наушники «Я в раздаче»',oldschool:'Шляпа «Старая школа»',final:'Федора «За финалкой»'}};if(extra[i.slot])return extra[i.slot][i.set];if(i.slot==='eyes')return 'Очки «Ничего не читается»';var n=['body','hand','trophy','phrase'].indexOf(i.slot);return names[i.set]?names[i.set][n]||'Клубная вещь':'Клубная вещь';},
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
  ['patch','sleeve','pin','cufflinks'].forEach(function(slot){
    var titles={patch:['Нашивка «Два туза · Золото»','Нашивка «Клубный зелёный»','Нашивка «Серебряный стол»'],sleeve:['Poker21 · Золотая вышивка','Poker21 · Клубный зелёный','Poker21 · Серебряная вышивка'],pin:['Значок «Карманные тузы»','Значок «Пика в лаврах»','Значок «Своя фишка»'],cufflinks:['Запонки «Пара тузов»','Запонки «Серебряные пики»','Запонки «Poker21»']};
    ['gold','green','silver'].forEach(function(variant,n){catalog.models.push({id:slot+'-'+variant,slot:slot,set:['final','club','grinder'][n],title:titles[slot][n],accessory:true});});
  });
  catalog.models.forEach(function(model){model.cost=20;model.starter=['club-body','club-legs','club-feet','patch-gold','sleeve-gold'].includes(model.id);model.name=catalog.itemName(model);});
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
  // BEGIN DERIVED HERO ART
  catalog.renderArt={
  "layers": {
    "body-club": {
      "src": "./assets/hero-poker/optimized-v1/layer-body-club.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "legs-club": {
      "src": "./assets/hero-poker/optimized-v1/layer-legs-club.webp",
      "rect": [
        0,
        505,
        768,
        495
      ]
    },
    "feet-club": {
      "src": "./assets/hero-poker/optimized-v1/layer-feet-club.webp",
      "rect": [
        0,
        967,
        768,
        185
      ]
    },
    "head-club": {
      "src": "./assets/hero-poker/optimized-v1/layer-head-club.webp",
      "rect": [
        152,
        0,
        464,
        211
      ]
    },
    "body-grinder": {
      "src": "./assets/hero-poker/optimized-v1/layer-body-grinder.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "legs-grinder": {
      "src": "./assets/hero-poker/optimized-v1/layer-legs-grinder.webp",
      "rect": [
        0,
        505,
        768,
        495
      ]
    },
    "head-grinder": {
      "src": "./assets/hero-poker/optimized-v1/layer-head-grinder.webp",
      "rect": [
        152,
        0,
        464,
        211
      ]
    },
    "body-oldschool": {
      "src": "./assets/hero-poker/optimized-v1/layer-body-oldschool.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "legs-oldschool": {
      "src": "./assets/hero-poker/optimized-v1/layer-legs-oldschool.webp",
      "rect": [
        0,
        505,
        768,
        495
      ]
    },
    "feet-oldschool": {
      "src": "./assets/hero-poker/optimized-v1/layer-feet-oldschool.webp",
      "rect": [
        0,
        967,
        768,
        185
      ]
    },
    "head-oldschool": {
      "src": "./assets/hero-poker/optimized-v1/layer-head-oldschool.webp",
      "rect": [
        152,
        0,
        464,
        211
      ]
    },
    "body-final": {
      "src": "./assets/hero-poker/optimized-v1/layer-body-final.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "legs-final": {
      "src": "./assets/hero-poker/optimized-v1/layer-legs-final.webp",
      "rect": [
        0,
        505,
        768,
        495
      ]
    },
    "feet-final": {
      "src": "./assets/hero-poker/optimized-v1/layer-feet-final.webp",
      "rect": [
        0,
        967,
        768,
        185
      ]
    },
    "head-final": {
      "src": "./assets/hero-poker/optimized-v1/layer-head-final.webp",
      "rect": [
        152,
        0,
        464,
        211
      ]
    },
    "eyes-final": {
      "src": "./assets/hero-poker/optimized-v1/layer-eyes-final.webp",
      "rect": [
        298,
        87,
        157,
        38
      ]
    }
  },
  "thumbs": {
    "body-club": "./assets/hero-poker/optimized-v1/thumb-body-club.webp",
    "legs-club": "./assets/hero-poker/optimized-v1/thumb-legs-club.webp",
    "feet-club": "./assets/hero-poker/optimized-v1/thumb-feet-club.webp",
    "head-club": "./assets/hero-poker/optimized-v1/thumb-head-club.webp",
    "body-grinder": "./assets/hero-poker/optimized-v1/thumb-body-grinder.webp",
    "legs-grinder": "./assets/hero-poker/optimized-v1/thumb-legs-grinder.webp",
    "head-grinder": "./assets/hero-poker/optimized-v1/thumb-head-grinder.webp",
    "body-oldschool": "./assets/hero-poker/optimized-v1/thumb-body-oldschool.webp",
    "legs-oldschool": "./assets/hero-poker/optimized-v1/thumb-legs-oldschool.webp",
    "feet-oldschool": "./assets/hero-poker/optimized-v1/thumb-feet-oldschool.webp",
    "head-oldschool": "./assets/hero-poker/optimized-v1/thumb-head-oldschool.webp",
    "body-final": "./assets/hero-poker/optimized-v1/thumb-body-final.webp",
    "legs-final": "./assets/hero-poker/optimized-v1/thumb-legs-final.webp",
    "feet-final": "./assets/hero-poker/optimized-v1/thumb-feet-final.webp",
    "head-final": "./assets/hero-poker/optimized-v1/thumb-head-final.webp",
    "eyes-final": "./assets/hero-poker/optimized-v1/thumb-eyes-final.webp"
  },
  "props": {
    "standard-0": "./assets/hero-poker/optimized-v1/prop-standard-0.webp",
    "standard-1": "./assets/hero-poker/optimized-v1/prop-standard-1.webp",
    "standard-2": "./assets/hero-poker/optimized-v1/prop-standard-2.webp",
    "standard-3": "./assets/hero-poker/optimized-v1/prop-standard-3.webp",
    "standard-4": "./assets/hero-poker/optimized-v1/prop-standard-4.webp",
    "standard-5": "./assets/hero-poker/optimized-v1/prop-standard-5.webp",
    "standard-6": "./assets/hero-poker/optimized-v1/prop-standard-6.webp",
    "standard-7": "./assets/hero-poker/optimized-v1/prop-standard-7.webp",
    "characters-0": "./assets/hero-poker/optimized-v1/prop-characters-0.webp",
    "characters-1": "./assets/hero-poker/optimized-v1/prop-characters-1.webp",
    "characters-2": "./assets/hero-poker/optimized-v1/prop-characters-2.webp",
    "characters-3": "./assets/hero-poker/optimized-v1/prop-characters-3.webp"
  },
  "characters": {
    "pokermanki": "./assets/hero-poker/optimized-v1/character-pokermanki.webp",
    "waaar": "./assets/hero-poker/optimized-v1/character-waaar.webp",
    "babnik": "./assets/hero-poker/optimized-v1/character-babnik.webp"
  },
  "logo": "./assets/hero-poker/optimized-v1/club-logo.webp"
};
  // END DERIVED HERO ART
  // BEGIN ACCESSORY ART
  catalog.accessoryArt={
  "items": {
    "patch-gold": {
      "src": "./assets/hero-poker/accessories-v1/patch-gold.webp"
    },
    "patch-green": {
      "src": "./assets/hero-poker/accessories-v1/patch-green.webp"
    },
    "patch-silver": {
      "src": "./assets/hero-poker/accessories-v1/patch-silver.webp"
    },
    "sleeve-gold": {
      "src": "./assets/hero-poker/accessories-v1/sleeve-gold.webp"
    },
    "sleeve-green": {
      "src": "./assets/hero-poker/accessories-v1/sleeve-green.webp"
    },
    "sleeve-silver": {
      "src": "./assets/hero-poker/accessories-v1/sleeve-silver.webp"
    },
    "pin-gold": {
      "src": "./assets/hero-poker/accessories-v1/pin-gold.webp"
    },
    "pin-green": {
      "src": "./assets/hero-poker/accessories-v1/pin-green.webp"
    },
    "pin-silver": {
      "src": "./assets/hero-poker/accessories-v1/pin-silver.webp"
    },
    "cufflinks-gold": {
      "src": "./assets/hero-poker/accessories-v1/cufflinks-gold.webp",
      "single": "./assets/hero-poker/accessories-v1/cufflinks-gold-single.webp"
    },
    "cufflinks-green": {
      "src": "./assets/hero-poker/accessories-v1/cufflinks-green.webp",
      "single": "./assets/hero-poker/accessories-v1/cufflinks-green-single.webp"
    },
    "cufflinks-silver": {
      "src": "./assets/hero-poker/accessories-v1/cufflinks-silver.webp",
      "single": "./assets/hero-poker/accessories-v1/cufflinks-silver-single.webp"
    }
  },
  "body": {
    "club": {
      "src": "./assets/hero-poker/accessories-v1/body-club.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "grinder": {
      "src": "./assets/hero-poker/accessories-v1/body-grinder.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "oldschool": {
      "src": "./assets/hero-poker/accessories-v1/body-oldschool.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    },
    "final": {
      "src": "./assets/hero-poker/accessories-v1/body-final.webp",
      "rect": [
        0,
        177,
        768,
        430
      ]
    }
  },
  "thumbs": {
    "club": "./assets/hero-poker/accessories-v1/thumb-body-club.webp",
    "grinder": "./assets/hero-poker/accessories-v1/thumb-body-grinder.webp",
    "oldschool": "./assets/hero-poker/accessories-v1/thumb-body-oldschool.webp",
    "final": "./assets/hero-poker/accessories-v1/thumb-body-final.webp"
  }
};
  // END ACCESSORY ART
  // Acquisition is independent of visual rarity and cannot be supplied by clients.
  catalog.slots.push({id:'scene',name:'Сцена профиля',icon:'▣'},{id:'entrance',name:'Появление',icon:'✦'});
  catalog.models.forEach(function(m){m.acquisition=m.starter?'starter':'collection';m.compatibleCharacters=['pokermanki'];});
  catalog.models.push(
    {id:'evening-scene',slot:'scene',set:'final',title:'Клубный зал Poker21',acquisition:'premium',product:'evening-poker21',compatibleCharacters:['pokermanki'],image:'./assets/hero-poker/evening-v1/lounge-thumb.webp',sceneImage:'./assets/hero-poker/evening-v1/lounge.webp'},
    {id:'evening-entrance',slot:'entrance',set:'final',title:'Появление «Вечерний свет»',acquisition:'premium',product:'evening-poker21',compatibleCharacters:['pokermanki'],image:'./assets/hero-poker/evening-v1/lounge-thumb.webp'}
  );
  catalog.collectionModels=function(){return catalog.models.filter(function(m){return m.acquisition==='starter'||m.acquisition==='collection';});};
  catalog.outfits=[
    {id:'club-classic',name:'Свои в клубе',description:'Зелёный костюм, клубная нашивка и Poker21 на рукаве.',models:['club-body','club-legs','club-feet','patch-gold','sleeve-gold'],cover:'./assets/hero-poker/outfits-v1/club-classic.webp'},
    {id:'quiet-grinder',name:'Без теллзов',description:'Тёмное худи, наушники и серебряные детали.',models:['grinder-body','grinder-legs','club-feet','grinder-head','patch-silver','sleeve-silver'],cover:'./assets/hero-poker/outfits-v1/quiet-grinder.webp'},
    {id:'old-school',name:'Фишка и стул',description:'Жилет, деним, ботинки и карманные тузы.',models:['oldschool-body','oldschool-legs','oldschool-feet','oldschool-head','pin-gold','sleeve-gold'],cover:'./assets/hero-poker/outfits-v1/old-school.webp'},
    {id:'final-table',name:'На финалку',description:'Бархатный пиджак, лоферы и запонки. Собирается бесплатно.',models:['final-body','final-legs','final-feet','patch-gold','sleeve-gold','pin-gold','cufflinks-silver'],cover:'./assets/hero-poker/outfits-v1/final-table.webp'},
    {id:'evening-poker21',name:'Вечерний Poker21',description:'Полный вечерний комплект, отдельная клубная сцена и мягкая анимация появления.',product:true,models:['final-body','final-legs','final-feet','patch-gold','sleeve-gold','pin-gold','cufflinks-silver','evening-scene','evening-entrance'],cover:'./assets/hero-poker/outfits-v1/evening-poker21.webp'}
  ];
  catalog.outfit=function(id){return catalog.outfits.find(function(o){return o.id===id;});};
  catalog.styleFamilies=['patch','sleeve','pin','cufflinks'].map(function(slot){return {id:slot,name:catalog.slots.find(function(s){return s.id===slot;}).name,models:['gold','green','silver'].map(function(v){return slot+'-'+v;})};});
  catalog.memoryStyles=[{id:'original',name:'Без гравировки',needed:0},{id:'engraved',name:'Гравировка события',needed:1},{id:'laurel',name:'Лавровая гравировка',needed:3}];
  catalog.heroes=[
    {id:'pokermanki',name:'ПокерМанки',base:'./assets/hero-poker/look-club-v1.webp',portrait:'./assets/hero-poker/pilots-v1/pokermanki-thumb.webp'},
    {id:'waaar',name:'Ваар',base:'./assets/hero-poker/pilots-v1/waaar.webp',portrait:'./assets/hero-poker/pilots-v1/waaar-thumb.webp'},
    {id:'cooler',name:'Кулер',base:'./assets/hero-poker/pilots-v1/cooler.webp',portrait:'./assets/hero-poker/pilots-v1/cooler-thumb.webp'}
  ];
  catalog.hero=function(id){return catalog.heroes.find(function(h){return h.id===id;});};
  // Head/eye layers contain PokerManki's face. Never reuse them on another identity.
  catalog.models.forEach(function(m){if(!['head','eyes'].includes(m.slot))m.compatibleCharacters=['pokermanki','waaar','cooler'];});
  catalog.models.push({id:'cooler-fan',slot:'hand',set:'grinder',title:'Кулер Кулера',image:'./assets/hero-poker/pilots-v1/cooler-fan.webp',cost:20,acquisition:'collection',compatibleCharacters:['pokermanki','waaar','cooler']});
  ['Остыл — можно думать','Вентилятор шумит, теллзов нет','Не тильтую. Охлаждаюсь.'].forEach(function(phrase,n){catalog.models.push({id:'cooler-phrase-'+n,slot:'phrase',set:'grinder',phrase:phrase,cost:20,acquisition:'collection',compatibleCharacters:['pokermanki','waaar','cooler']});});
  catalog.characters.push({id:'cooler',name:'Кулер',nicks:['coo1er91','necoo1er91'],art:'./assets/club-news-personal/cooler-news-cutout.webp',description:'Холодная голова, клубный кулер и ни одного лишнего теллза.',models:['grinder-body','grinder-legs','cooler-fan','cooler-phrase-0','cooler-phrase-1','cooler-phrase-2']});
  catalog.renderArt.characters.cooler='./assets/hero-poker/pilots-v1/cooler-thumb.webp';
  catalog.compatible=function(item,character){var m=catalog.model(catalog.modelId(item));return !!item&&(item.award||!m||m.compatibleCharacters.includes(character||'pokermanki'));};
  catalog.collectionModels=function(character){return catalog.models.filter(function(m){return ['starter','collection'].includes(m.acquisition)&&catalog.compatible(m,character);});};
  catalog.releases=[
    {id:'club-foundation',name:'Клубная классика',description:'Одежда и украшения для первого образа. Коллекция остаётся доступной.',publishedAt:'2026-09-10',models:catalog.models.filter(function(m){return m.acquisition!=='premium'&&!m.id.startsWith('cooler-');}).map(function(m){return m.id;})},
    {id:'cool-head',name:'Холодная голова',description:'Первый выпуск Кулера: предмет и три покерные реплики. Можно получить в наградах или изготовить за осколки.',publishedAt:'2026-09-11',models:['cooler-fan','cooler-phrase-0','cooler-phrase-1','cooler-phrase-2']}
  ];
  catalog.releaseFor=function(modelId){return catalog.releases.find(function(r){return r.models.includes(modelId);});};
  catalog.outfitCovers={
  "pokermanki": {
    "club-classic": "./assets/hero-poker/outfits-v1/club-classic.webp",
    "quiet-grinder": "./assets/hero-poker/outfits-v1/quiet-grinder.webp",
    "old-school": "./assets/hero-poker/outfits-v1/old-school.webp",
    "final-table": "./assets/hero-poker/outfits-v1/final-table.webp",
    "evening-poker21": "./assets/hero-poker/outfits-v1/evening-poker21.webp"
  },
  "waaar": {
    "club-classic": "./assets/hero-poker/outfits-v1/waaar-club-classic.webp",
    "quiet-grinder": "./assets/hero-poker/outfits-v1/waaar-quiet-grinder.webp",
    "old-school": "./assets/hero-poker/outfits-v1/waaar-old-school.webp",
    "final-table": "./assets/hero-poker/outfits-v1/waaar-final-table.webp",
    "evening-poker21": "./assets/hero-poker/outfits-v1/waaar-evening-poker21.webp"
  },
  "cooler": {
    "club-classic": "./assets/hero-poker/outfits-v1/cooler-club-classic.webp",
    "quiet-grinder": "./assets/hero-poker/outfits-v1/cooler-quiet-grinder.webp",
    "old-school": "./assets/hero-poker/outfits-v1/cooler-old-school.webp",
    "final-table": "./assets/hero-poker/outfits-v1/cooler-final-table.webp",
    "evening-poker21": "./assets/hero-poker/outfits-v1/cooler-evening-poker21.webp"
  }
};
  catalog.outfitCover=function(o,character){return (catalog.outfitCovers[character]||catalog.outfitCovers.pokermanki)[o.id];};
  catalog.accessoryArt.body.club.src='./assets/hero-poker/matte-v2/body-club.webp';
  catalog.accessoryArt.thumbs.club='./assets/hero-poker/matte-v2/thumb-body-club.webp';
  catalog.renderArt.layers['legs-club'].src='./assets/hero-poker/matte-v2/legs-club.webp';
  catalog.renderArt.thumbs['legs-club']='./assets/hero-poker/matte-v2/thumb-legs-club.webp';
  return catalog;

});
