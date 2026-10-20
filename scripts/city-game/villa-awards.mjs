// Only owned awards selected on the actual villa shelves are shown as earned trophies.
export function selectedVillaAwards(hall){
 if(!hall||!Array.isArray(hall.items))return [];
 const ids=hall.shelves?Object.values(hall.shelves).flat():hall.featured||[];
 return [...new Set(ids.filter(Boolean))].map(id=>hall.items.find(item=>item.id===id)).filter(Boolean).slice(0,6);
}
export function villaAwardArt(item,catalog){
 const cup=catalog?.forItem(item);if(cup)return cup;
 const achievements={'tournament-king':'achievement-trophy-king-v1.webp','day-hero':'achievement-trophy-day-hero-v1.webp','millionaire':'player-hall/achievement-millionaire-v1.webp','win-50':'achievement-trophy-big50-v1.webp','win-100':'achievement-trophy-big100-v1.webp','month-champion':'achievement-trophy-month-v1.webp','vice-champion':'achievement-trophy-vice-month-v1.webp','club-choice':'achievement-trophy-choice-v1.webp','sng-champion':'achievement-trophy-sng-v1.webp'};
 return item.kind==='achievements'&&achievements[item.id]?'./assets/'+achievements[item.id]:'';
}
