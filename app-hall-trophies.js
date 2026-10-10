(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PokerHallTrophies=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
var assets={
 monday:'./assets/player-hall/trophy-monday-v1.webp',
 tuesday:'./assets/player-hall/trophy-tuesday-v1.webp',
 wednesday:'./assets/player-hall/trophy-wednesday-v1.webp',
 thursday:'./assets/player-hall/trophy-thursday-v1.webp',
 friday:'./assets/player-hall/trophy-friday-v1.webp',
 saturday:'./assets/player-hall/trophy-saturday-v1.webp',
 sunday:'./assets/player-hall/trophy-sunday-v1.webp',
 month:'./assets/player-hall/trophy-month-v1.webp',
 boss:'./assets/player-hall/trophy-boss-v1.webp',
 fantastic:'./assets/player-hall/trophy-fantastic-v1.webp',
 crazy:'./assets/player-hall/trophy-crazy-v1.webp',
 fivehundred:'./assets/player-hall/trophy-fivehundred-v1.webp',
 classic:'./assets/player-hall/trophy-classic-v1.webp',
 freeroll:'./assets/player-hall/trophy-freeroll-v1.webp'
};
function key(name){return String(name||'').normalize('NFKC').toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]+/g,' ').trim();}
function family(name){var n=key(name);if(/месяц/.test(n))return 'month';if(/fantastic/.test(n))return 'fantastic';if(/big boss/.test(n))return 'boss';if(/пятихат/.test(n))return 'fivehundred';if(/crazy/.test(n))return 'crazy';if(/freeroll|фриролл/.test(n))return 'freeroll';if(/четверг/.test(n))return 'thursday';if(/понедельник|monday|меджик/.test(n))return 'monday';if(/вторник|трактор/.test(n))return 'tuesday';if(/сред|косарь/.test(n))return 'wednesday';if(/пятниц/.test(n))return 'friday';if(/суббот|saturday/.test(n))return 'saturday';if(/воскрес/.test(n))return 'sunday';if(/классическ|classic/.test(n))return 'classic';return '';}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c];});}
// Historic and external events also receive their own stable engraved trophy.
// The name controls the enamel, silhouette, crest and engraving; dates do not.
function engraved(name){var n=key(name)||'poker21',hash=2166136261;for(var i=0;i<n.length;i++){hash^=n.charCodeAt(i);hash=Math.imul(hash,16777619)>>>0;}var hue=hash%360,wide=72+hash%25,gem=hash%2?'M160 48L202 94L160 143L118 94Z':'M160 48L204 72L190 119L160 142L130 119L116 72Z';var title=n.split(' ').slice(0,3).join(' ').slice(0,22).toUpperCase();var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400"><defs><linearGradient id="g"><stop stop-color="#714508"/><stop offset=".25" stop-color="#ffe5a2"/><stop offset=".5" stop-color="#bd8525"/><stop offset=".78" stop-color="#ffdb73"/><stop offset="1" stop-color="#754709"/></linearGradient><linearGradient id="b" x2="0" y2="1"><stop stop-color="#30343b"/><stop offset="1" stop-color="#080b0f"/></linearGradient></defs><path d="M'+(160-wide)+' 131Q15 99 60 225Q85 269 131 249M'+(160+wide)+' 131Q305 99 260 225Q235 269 189 249" fill="none" stroke="url(#g)" stroke-width="13"/><path d="M'+(160-wide)+' 113H'+(160+wide)+'L226 230Q210 266 174 273V299H199L219 323H101L121 299H146V273Q110 266 94 230Z" fill="url(#g)" stroke="#f6d078" stroke-width="2"/><path d="'+gem+'" fill="hsl('+hue+' 48% 24%)" stroke="url(#g)" stroke-width="8"/><text x="160" y="107" fill="#ffe5a2" font-family="serif" font-size="42" text-anchor="middle">♠</text><path d="M111 155H209L196 223Q160 256 124 223Z" fill="hsl('+hue+' 42% 17%)" stroke="#ffe3a3" stroke-width="2"/><text x="160" y="211" fill="#ffe5a2" font-family="serif" font-size="44" text-anchor="middle">1</text><path d="M95 322H225L237 371H83Z" fill="url(#b)" stroke="url(#g)" stroke-width="5"/><rect x="95" y="335" width="130" height="25" rx="3" fill="#111419" stroke="#b58b3c"/><text x="160" y="352" fill="#ffe5a2" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700">'+esc(title)+'</text><path d="M78 372H242V383H78Z" fill="url(#g)"/></svg>';return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);}
function forItem(item){var result=item&&item.history&&item.history.results&&item.history.results[0];if(!item||item.kind!=='cups'||!result||Number(result.place)!==1)return '';var name=item.history.tournament,id=family(name);return id?assets[id]+'?v=20261011':engraved(name);}
return {forItem:forItem,family:family,assets:assets};
});
