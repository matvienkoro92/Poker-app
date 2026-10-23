'use strict';
const root='./assets/board-games/nards/';
const NARDS_BOARDS=[
 {id:'classic',name:'Классический орех',level:1,light:'#ddc49a',dark:'#715039',frame:'#422a1c',note:'Гладкий орех · базовый набор'},
 {id:'cedar',name:'Кедровая резьба',level:5,light:'#e5c396',dark:'#82502e',frame:'#59351e',note:'Растительный орнамент · тёплый кедр'},
 {id:'imperial',name:'Двуглавый орёл',level:15,light:'#dec7a0',dark:'#62402b',frame:'#352316',note:'Геральдический рельеф · орех и бронза'},
 {id:'compass',name:'Роза ветров',level:30,light:'#dfcda4',dark:'#813f2c',frame:'#49291d',note:'Роза ветров · масти · красное дерево'},
 {id:'wolves',name:'Северные волки',level:50,light:'#d8d5c5',dark:'#4d5b5b',frame:'#282b2b',note:'Лесной сюжет · глубокая фигурная резьба'}
].map(b=>({...b,...(b.id==='classic'?{}:{cover:root+b.id+'-cover.webp'})}));
const LUXURY_CHECKERS=[
 {id:'carved',name:'Резные розетки',level:5,white:'#f3d59f',black:'#4e2c1e'},
 {id:'heraldic',name:'Золотые орлы',level:15,white:'#eee0b9',black:'#201b16'},
 {id:'brass',name:'Латунный компас',level:30,white:'#f1e5cc',black:'#542b20'},
 {id:'obsidian',name:'Волчьи медальоны',level:50,white:'#ecece7',black:'#171c22'}
].map(c=>({...c,whiteArt:root+c.id+'-white.webp',blackArt:root+c.id+'-black.webp'}));
function availableLevel(value){return Number.isFinite(Number(value))?Math.max(1,Math.floor(Number(value))):1;}
function cleanNards(value,level=1){const v=value||{},n=availableLevel(level),board=NARDS_BOARDS.find(b=>b.id===v.nardsBoard&&b.level<=n)||NARDS_BOARDS[0],luxury=LUXURY_CHECKERS.find(c=>c.id===v.checkers&&c.level<=n);return {nardsBoard:board.id,checkers:luxury?.id||(['classic','pearl','jade','ruby'].includes(v.checkers)?v.checkers:'classic')};}
module.exports={NARDS_BOARDS,LUXURY_CHECKERS,availableLevel,cleanNards};
