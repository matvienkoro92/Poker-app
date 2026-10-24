'use strict';
const root='./assets/board-games/nards/';
const NARDS_BOARDS=[
 {id:'classic',name:'Классический орех',level:1,light:'#ddc49a',dark:'#715039',frame:'#422a1c',note:'Гладкий орех · базовый набор'},
 {id:'cedar',name:'Кедровая резьба',level:5,light:'#e5c396',dark:'#82502e',frame:'#59351e',note:'Растительный орнамент · тёплый кедр'},
 {id:'imperial',name:'Двуглавый орёл',level:15,light:'#dec7a0',dark:'#62402b',frame:'#352316',note:'Геральдический рельеф · орех и бронза'},
 {id:'compass',name:'Роза ветров',level:30,light:'#dfcda4',dark:'#813f2c',frame:'#49291d',note:'Роза ветров · масти · красное дерево'},
 {id:'wolves',name:'Северные волки',level:50,light:'#d8d5c5',dark:'#4d5b5b',frame:'#282b2b',note:'Лесной сюжет · глубокая фигурная резьба'},
 {id:'club-aces',name:'Два Туза · Клубная резьба',level:5,light:'#d3be8f',dark:'#40523c',frame:'#253b29',note:'Клубная эмблема · орех и латунь'},
 {id:'club-night',name:'Два Туза · Ночной клуб',level:30,light:'#b2bec6',dark:'#354a60',frame:'#1c2d3a',note:'Две масти · серебро и тёмный орех'}
].map(b=>({...b,...(b.id==='classic'?{}:{cover:root+b.id+'-cover.webp'})}));
const LUXURY_CHECKERS=[
 {id:'carved',name:'Резные розетки',level:5,white:'#f3d59f',black:'#4e2c1e'},
 {id:'heraldic',name:'Золотые орлы',level:15,white:'#eee0b9',black:'#201b16'},
 {id:'brass',name:'Латунный компас',level:30,white:'#f1e5cc',black:'#542b20'},
 {id:'obsidian',name:'Волчьи медальоны',level:50,white:'#ecece7',black:'#171c22'}
].map(c=>({...c,whiteArt:root+c.id+'-white.webp',blackArt:root+c.id+'-black.webp'}));
const DESIGN_CHECKERS=[
 {id:'marble',name:'Мрамор и оникс',level:1,white:'#f1f0e8',black:'#252a35'},
 {id:'turquoise',name:'Бирюза и медь',level:5,white:'#c9f1e8',black:'#12565b'},
 {id:'carbon',name:'Карбон и титан',level:5,white:'#c9d1df',black:'#202734'},
 {id:'galaxy',name:'Звёздные медальоны',level:15,white:'#e6d6f5',black:'#30245e'},
 {id:'lava',name:'Лава и песок',level:15,white:'#f1ce99',black:'#812b27'},
 {id:'honeycomb',name:'Золотые соты',level:30,white:'#e9d3a6',black:'#39342a'},
 {id:'waaar',name:'Вааар · Резной мастер',level:15,white:'#ead5aa',black:'#28372f'},
 {id:'cooler',name:'Кулер · Слёзы чемпиона',level:15,white:'#ead5aa',black:'#28372f'},
 {id:'emil',name:'Эмиль · Уважение',level:30,white:'#ead5aa',black:'#28372f'},
 {id:'club-aces',name:'Два Туза · Клубные печати',level:5,white:'#ead5aa',black:'#28372f'},
 {id:'dragon',name:'Драконовы печати',level:50,white:'#ead5aa',black:'#28372f'},
 {id:'koi',name:'Лунные карпы',level:15,white:'#ead5aa',black:'#28372f'}
].map(c=>({...c,whiteArt:root+'designer-'+c.id+'-white.svg',blackArt:root+'designer-'+c.id+'-black.svg'}));
const NARDS_INTERIORS=[
 {id:'classic',name:'Ореховая инкрустация',level:1,light:'#c9a878',dark:'#623f2c',frame:'#43291d',accent:'#f4d79b',motif:'marquetry',note:'Тёплое дерево · тонкие ромбы и медные линии'},
 {id:'mosaic',name:'Самарканд',level:1,light:'#183f51',dark:'#e5b86d',frame:'#122934',accent:'#6dd7dc',motif:'mosaic',note:'Бирюзовая мозаика · восточная восьмиконечная звезда'},
 {id:'ocean',name:'Карта капитана',level:1,light:'#123d55',dark:'#cfac66',frame:'#142c3c',accent:'#a6dce8',motif:'compass',note:'Глубокий океан · розы ветров и навигационные линии'},
 {id:'jade',name:'Нефритовый сад',level:1,light:'#254a3c',dark:'#d7c28a',frame:'#142e26',accent:'#b8dcb0',motif:'leaves',note:'Зелёный камень · бамбук и золотая инкрустация'},
 {id:'noir',name:'Солнечный обсидиан',level:1,light:'#252329',dark:'#caa769',frame:'#151419',accent:'#e9c579',motif:'sun',note:'Чёрный мрамор · лучи солнца и ювелирное золото'},
 {id:'frost',name:'Северное сияние',level:1,light:'#b8d7de',dark:'#315779',frame:'#273c56',accent:'#f3fcff',motif:'snow',note:'Ледяное серебро · кристаллы и северные узоры'},
 {id:'waaar-master',name:'Вааар · Мастер нард',level:15,light:'#d2b480',dark:'#53351f',frame:'#352516',accent:'#f3d594',motif:'illustration',note:'Вааар за доской · уверенность чемпиона',art:'mural-waaar-v2',revision:2,quote:'За этой доской решаю я.',signature:'Вааар'},
 {id:'cooler-tears',name:'Кулер · Слёзы на шестёрках',level:15,light:'#b8c7ad',dark:'#294936',frame:'#203329',accent:'#ecdfb0',motif:'illustration',note:'Кулер плачет · дружеский клубный подкол',art:'mural-cooler-v2',revision:2,quote:'Это не слёзы. Это плохие зарики.',signature:'Кулер'},
 {id:'emil-respect',name:'Эмиль · Нарды не потянешь',level:30,light:'#d3b58f',dark:'#57392d',frame:'#39281f',accent:'#f9d19b',motif:'illustration',note:'«Как покериста тебя уважаю ✊🏾 , но нарды не потянешь» (с)',art:'mural-emil-v2',revision:2,quote:'Как покериста тебя уважаю ✊🏾 , но нарды не потянешь',signature:'Эмиль'},
 {id:'club-aces',name:'Два Туза · Золотой клуб',level:5,light:'#cdbb8b',dark:'#3d4a36',frame:'#243326',accent:'#f6dda1',motif:'illustration',note:'Клубная инкрустация · две масти и зарики',art:'club-aces'},
 {id:'club-night',name:'Два Туза · Ночная лига',level:30,light:'#91a4ae',dark:'#253848',frame:'#1b2835',accent:'#eccea0',motif:'illustration',note:'Клубная эмблема · серебро и ночной орех',art:'club-night'},
 {id:'dragon',name:'Дракон удачи',level:50,light:'#d0ac82',dark:'#683328',frame:'#43261f',accent:'#f8d39b',motif:'illustration',note:'Резной дракон · золото и красное дерево',art:'dragon'},
 {id:'koi',name:'Карпы под луной',level:15,light:'#c3d3c9',dark:'#325b60',frame:'#203b40',accent:'#f5e5b8',motif:'illustration',note:'Два карпа · тихая бирюзовая инкрустация',art:'koi'},
 {id:'lion-sun',name:'Лев и солнце',level:15,light:'#d5bc8e',dark:'#65462b',frame:'#432a1c',accent:'#f7dfaf',motif:'illustration',note:'Персидский сюжет · лев, солнце и кипарисы · две зеркальные створки',art:'mural-lion-sun-v2',revision:2},
 {id:'silk-road',name:'Караван Самарканда',level:30,light:'#c8c4a8',dark:'#3f5a5b',frame:'#2c4142',accent:'#f4dfb2',motif:'illustration',note:'Шёлковый путь · караван и восточный город · две зеркальные створки',art:'mural-silk-road-v2',revision:2}
].map(b=>({...b,surface:root+'inside-'+b.id+(b.revision?'-v'+b.revision:'')+'-surface.svg',preview:root+'inside-'+b.id+(b.revision?'-v'+b.revision:'')+'.svg'}));
const NARDS_DICE=[
 {id:'classic',name:'Слоновая кость',level:1,face:'#fff3d5',edge:'#c4a064',pip:'#372c20'},
 {id:'amber',name:'Медовый янтарь',level:5,face:'#e9ad4b',edge:'#976021',pip:'#3f2411'},
 {id:'jade',name:'Нефрит и золото',level:15,face:'#286b54',edge:'#caaa66',pip:'#fff0bd'},
 {id:'noir',name:'Чёрное золото',level:30,face:'#292732',edge:'#bba16a',pip:'#f3d28a'},
 {id:'ice',name:'Ледяное серебро',level:50,face:'#c8e8f1',edge:'#6a9bb7',pip:'#22455f'},
 {id:'marble',name:'Лунный мрамор',level:1,face:'#e9edf1',edge:'#8b97a3',pip:'#233649',surface:'repeating-linear-gradient(115deg,transparent 0 14%,#58657724 15% 17%,transparent 18% 29%),linear-gradient(145deg,#ffffff,#cdd8df)'},
 {id:'mint',name:'Мятный лёд',level:1,face:'#a6e7d7',edge:'#579b9a',pip:'#174e53',surface:'linear-gradient(145deg,#d0ffed,#71cbbd 55%,#448d9e)'},
 {id:'sapphire',name:'Гранёный сапфир',level:5,face:'#2262a8',edge:'#8dbfe6',pip:'#f0fbff',surface:'conic-gradient(from 25deg,#0b2c60,#4384be,#152f63,#7db6e6,#0b2c60)'},
 {id:'galaxy',name:'Звёздная пыль',level:15,face:'#35275c',edge:'#ad8fd2',pip:'#fff1cb',surface:'radial-gradient(ellipse at 20% 15%,#d6aaed55,transparent 60%),radial-gradient(ellipse at 70% 75%,#be4de2aa,transparent 65%),linear-gradient(135deg,#0c1740,#443682)'},
 {id:'lava',name:'Лавовый камень',level:15,face:'#ac3c28',edge:'#e9a354',pip:'#fff3c7',surface:'repeating-linear-gradient(140deg,#ed462a 0 12%,#ffb157 14%,#3f1520 18% 32%)'},
 {id:'carbon',name:'Карбон и неон',level:30,face:'#252d37',edge:'#69b6c9',pip:'#a9f5ff',surface:'repeating-linear-gradient(45deg,#ffffff10 0 2px,transparent 2px 5px),repeating-linear-gradient(-45deg,#171b20 0 3px,#303843 3px 6px)'}
];
function availableLevel(value){return Number.isFinite(Number(value))?Math.max(1,Math.floor(Number(value))):1;}
function cleanNards(value,level=1){const v=value||{},n=availableLevel(level),board=NARDS_BOARDS.find(b=>b.id===v.nardsBoard&&b.level<=n)||NARDS_BOARDS[0],luxury=[...LUXURY_CHECKERS,...DESIGN_CHECKERS].find(c=>c.id===v.checkers&&c.level<=n);const interior=NARDS_INTERIORS.find(b=>b.id===v.nardsInterior&&b.level<=n)||NARDS_INTERIORS[0],dice=NARDS_DICE.find(b=>b.id===v.nardsDice&&b.level<=n)||NARDS_DICE[0];return {nardsBoard:board.id,nardsInterior:interior.id,nardsDice:dice.id,nardsDiceSize:v.nardsDiceSize==='small'?'small':'standard',checkers:luxury?.id||(['classic','pearl','jade','ruby'].includes(v.checkers)?v.checkers:'classic')};}
module.exports={NARDS_BOARDS,NARDS_INTERIORS,NARDS_DICE,LUXURY_CHECKERS,DESIGN_CHECKERS,availableLevel,cleanNards};
