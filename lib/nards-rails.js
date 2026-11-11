'use strict';
// Sculpted relief textures generated for the thin horizontal board lips.
const NARDS_RAILS=[
 ['classic','Классическая резьба'],['laurel','Лавровый венок'],
 ['wave','Морская волна'],['diamond','Бронзовые ромбы'],
 ['sun','Солнечный диск'],['frost','Ледяные звёзды'],
 ['knot','Переплетение'],['pearl','Жемчужная нить'],
 ['flame','Медное пламя'],['meander','Греческий ключ']
].map(([id,name])=>({id,name,image:'./assets/board-games/nards/rail-'+id+'-relief-v3.webp'}));
function nardsRail(id){return NARDS_RAILS.find(item=>item.id===id)||NARDS_RAILS[0];}
module.exports={NARDS_RAILS,nardsRail};
