'use strict';

const CLASSIC_RAIL = './assets/board-games/nards/carved-frame-rail-v1.webp';
const patterns = [
  ['laurel', 'Лавровый венок', '#bda568', '#283120', 'M0 12Q18 3 36 12T72 12M12 8Q13 1 22 2Q22 7 12 8M30 10Q33 18 42 18Q41 13 30 10M52 9Q54 2 63 3Q61 8 52 9'],
  ['wave', 'Морская волна', '#97d8dc', '#18363e', 'M0 15Q9 2 19 7T37 15T55 7T72 15M0 19Q9 6 19 11T37 19T55 11T72 19'],
  ['diamond', 'Бронзовые ромбы', '#f2be79', '#4e291b', 'M0 12L12 4 24 12 36 4 48 12 60 4 72 12L60 20 48 12 36 20 24 12 12 20ZM24 12H48'],
  ['sun', 'Солнечный диск', '#ffdc81', '#4c3020', 'M0 12H23M49 12H72M43 12A7 7 0 1 0 29 12A7 7 0 1 0 43 12ZM36 1V4M36 20V23M27 3L30 6M42 18L45 21M27 21L30 18M42 6L45 3'],
  ['frost', 'Ледяные звёзды', '#bce8fa', '#20324a', 'M0 12H72M18 3V21M11 6L25 18M11 18L25 6M54 3V21M47 6L61 18M47 18L61 6'],
  ['knot', 'Переплетение', '#ded39c', '#392b30', 'M0 12C12-9 24 33 36 12S60-9 72 12M0 12C12 33 24-9 36 12S60 33 72 12'],
  ['pearl', 'Жемчужная нить', '#fff1d6', '#3b3542', 'M0 12H72M16 12a4 4 0 1 0-8 0a4 4 0 1 0 8 0M42 12a6 6 0 1 0-12 0a6 6 0 1 0 12 0M64 12a4 4 0 1 0-8 0a4 4 0 1 0 8 0'],
  ['flame', 'Медное пламя', '#ffb174', '#4b2020', 'M0 19Q9 18 14 5Q20 17 26 15Q32 13 36 3Q40 13 46 15Q52 17 58 5Q63 18 72 19M0 21H72'],
  ['meander', 'Греческий ключ', '#e6c781', '#323123', 'M0 19H21V7H9V13H15M21 19H45V7H33V13H39M45 19H69V7H57V13H63M69 19H72']
];

const NARDS_RAILS = [{id:'classic',name:'Классическая резьба',image:CLASSIC_RAIL}, ...patterns.map(([id,name,metal,wood,path]) => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="24" viewBox="0 0 72 24" preserveAspectRatio="none"><defs><linearGradient id="wood" x2="0" y2="1"><stop stop-color="'+wood+'"/><stop offset=".55" stop-color="#100d0b"/><stop offset="1" stop-color="'+wood+'"/></linearGradient></defs><rect width="72" height="24" fill="url(#wood)"/><path d="M0 1H72M0 3H72M0 21H72M0 23H72" stroke="'+metal+'" opacity=".5"/><path d="'+path+'" transform="translate(0 1)" fill="none" stroke="#080604" stroke-width="3" stroke-linejoin="round"/><path d="'+path+'" fill="none" stroke="'+metal+'" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  return {id,name,image:'data:image/svg+xml,'+encodeURIComponent(svg)};
})];

function nardsRail(id) {
  return NARDS_RAILS.find(item => item.id === id) || NARDS_RAILS[0];
}

module.exports = {NARDS_RAILS,nardsRail};
