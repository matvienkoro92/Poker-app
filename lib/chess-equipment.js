'use strict';
const BOARDS=[
 {id:'walnut',name:'Классическая зелёная',level:1,light:'#eeeed2',dark:'#769656',frame:'#45483c'},
 {id:'ivory',name:'Слоновая кость',level:1,light:'#f1ead7',dark:'#8d947f',frame:'#4d594c'},
 {id:'ocean',name:'Океан',level:1,light:'#d5e5e7',dark:'#376875',frame:'#183d48'},
 {id:'emerald',name:'Изумруд',level:1,light:'#d9d6ae',dark:'#2a6953',frame:'#153e30'},
 {id:'carved-walnut',name:'Резной орех',level:5,light:'#e4c49a',dark:'#65402d',frame:'#412518',image:'./assets/board-games/chess/carved-walnut-board.svg',note:'Резная рама · древесные волокна · латунные уголки'},
 {id:'celtic-oak',name:'Кельтский дуб',level:10,light:'#e4cc9e',dark:'#715036',frame:'#66442a',frameSlice:12.5,image:'./assets/board-games/chess/celtic-oak-board.svg',note:'Массив дуба · глубокое кельтское плетение · бронзовые розетки'},
 {id:'marble-brass',name:'Мрамор и латунь',level:15,light:'#f1eadb',dark:'#34554c',frame:'#aa8244',image:'./assets/board-games/chess/marble-brass-board.svg',note:'Светлый мрамор · зелёный камень · латунная инкрустация'},
 {id:'ebony-arabesque',name:'Драконы эбена',level:25,light:'#e5dfcc',dark:'#2d4942',frame:'#202a28',frameSlice:12.5,image:'./assets/board-games/chess/ebony-arabesque-board.svg',note:'Чёрное дерево · объёмные драконы · серебряная инкрустация'},
 {id:'ice-crystal',name:'Ледяной хрусталь',level:30,light:'#dcebf4',dark:'#345478',frame:'#7c9fb8',image:'./assets/board-games/chess/ice-crystal-board.svg',note:'Ледяные грани · синий кристалл · серебряная окантовка'},
 {id:'royal-rosewood',name:'Львиный палисандр',level:40,light:'#ebd0a3',dark:'#633139',frame:'#582b30',frameSlice:12.5,image:'./assets/board-games/chess/royal-rosewood-board.svg',note:'Палисандр · львиные маски · резной акант и сусальное золото'},
 {id:'imperial-palace',name:'Императорская',level:50,light:'#eed8a4',dark:'#5b2034',frame:'#b78a39',image:'./assets/board-games/chess/imperial-palace-board.svg',note:'Бордовый лак · золотой орнамент · парадная рама'}
];
const PIECES=[{id:'classic',name:'Классика',level:1},{id:'royal',name:'Королевские',level:1},{id:'minimal',name:'Минимализм',level:1},{id:'onyx',name:'Оникс',level:1},
 {id:'staunton',name:'Резной Стаунтон',level:5,note:'Светлый самшит и тёмный орех · точёные основания'},
 {id:'arabesque',name:'Восточная резьба',level:15,note:'Арочные венцы · фигурные пьедесталы · тонкая гравировка'},
 {id:'roman-revolt',name:'Римляне и гладиаторы',level:20,thematic:true,note:'Римская знать против восставших гладиаторов · резная миниатюра'},
 {id:'prison-wardens',name:'Заключённые и надзиратели',level:35,thematic:true,note:'Светлый клён против чёрного дерева · сюжетная резьба'},
 {id:'crystal',name:'Горный хрусталь',level:30,note:'Светлые и сапфировые грани · геометрические силуэты'},
 {id:'regalia',name:'Императорский двор',level:50,note:'Слоновая кость и бордовый оникс · золотая отделка'}];
function cleanChess(value,level=1){const v=value||{},n=Number.isFinite(Number(level))?Math.max(1,Number(level)):1;return {board:(BOARDS.find(b=>b.id===v.board&&b.level<=n)||BOARDS[0]).id,pieces:(PIECES.find(p=>p.id===v.pieces&&p.level<=n)||PIECES[0]).id};}
module.exports={BOARDS,PIECES,cleanChess};
