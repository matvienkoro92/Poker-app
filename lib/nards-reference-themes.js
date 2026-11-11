'use strict';
const root='./assets/board-games/nards/';
const THEMES=[
 {id:'obsidian-copper',name:'Обсидиан и медь',level:5,light:'#ddc7ac',dark:'#b85b27',frame:'#211f20',accent:'#e5a577',field:'#262527',white:'#b96539',black:'#111417',rim:'#b97a54',die:'#1d2023',pip:'#e6a06c',material:'stone'},
 {id:'arctic-ice',name:'Ледяная Арктика',level:15,light:'#cce9f4',dark:'#138cc0',frame:'#163e59',accent:'#c4edff',field:'#10344f',white:'#d8edf5',black:'#087aa6',rim:'#a9dfef',die:'#b5d9ed',pip:'#10344f',material:'ice'},
 {id:'japan-lacquer',name:'Японский лак',level:30,light:'#b91b12',dark:'#202020',frame:'#111213',accent:'#e6b95c',field:'#eed9ad',white:'#a30c09',black:'#101112',rim:'#d6a343',die:'#f4e2bb',pip:'#a1140d',material:'lacquer'},
 {id:'emerald-deco',name:'Изумрудный арт-деко',level:50,light:'#e9c66a',dark:'#06472d',frame:'#10442e',accent:'#ebc777',field:'#063b29',white:'#f2e4c8',black:'#087442',rim:'#d7b15e',die:'#075735',pip:'#e9bf4e',material:'malachite'},
 {id:'cosmic-titanium',name:'Космос · Графит и титан',level:75,light:'#c0bec1',dark:'#653082',frame:'#28262f',accent:'#c9b9dd',field:'#34343b',white:'#bfc0c7',black:'#4c156c',rim:'#afa0b8',die:'#4e1870',pip:'#eee9f5',material:'metal'}
];
const boards=THEMES.map(t=>({...t,cover:root+t.id+'-frame.webp',thumbnail:root+t.id+'-preview.webp',note:'Коллекционный набор · '+t.name}));
const interiors=THEMES.map(t=>({...t,motif:'illustration',referenceTheme:true,surface:root+t.id+'-surface.webp',leftSurface:root+t.id+'-left.webp',rightSurface:root+t.id+'-right.webp',preview:root+t.id+'-preview.webp'}));
const checkers=THEMES.map(t=>({...t,rasterArt:true,whiteArt:root+'designer-'+t.id+'-white-v2.webp',blackArt:root+'designer-'+t.id+'-black-v2.webp'}));
const dice=THEMES.map(t=>({id:t.id,name:t.name,level:t.level,face:t.die,edge:t.rim,pip:t.pip,material:t.material,surface:'linear-gradient(135deg,'+t.die+','+t.frame+')'}));
module.exports={THEMES,boards,interiors,checkers,dice};
