// Vector silhouettes drawn from the owner's reference. All three palettes share
// the same geometry, transparent crown openings, baseline and cell padding.
export const REFERENCE_STYLES=['classic','classic-navy','classic-burgundy'];
const palettes={
 classic:{w:['#fff','#f7f7f3','#dedfd8','#55564f'],b:['#68665f','#514f49','#353631','#34352f']},
 'classic-navy':{w:['#fffdf0','#eee6c9','#cec6a9','#575c62'],b:['#345b82','#15314e','#0c2035','#b0bfce']},
 'classic-burgundy':{w:['#fff0bd','#e5bd65','#c39545','#6a4e31'],b:['#8d364d','#50182e','#310f20','#dfbba1']}
};
let serial=0;
const foot='M18 44Q30 42 42 44Q45 46 45 52H15Q15 46 18 44Z';
const profiles={
 p:'M30 13C22 13 20 24 26 27Q20 28 23 31L26 32C26 38 20 40 18 44Q16 47 16 52H44Q44 47 42 44C40 40 34 38 34 32L37 31Q40 28 34 27C40 24 38 13 30 13Z',
 r:'M17 8L23 7L24 14H28V7H33V14H37L38 7L44 8L43 20L39 23L40 43H20L21 23L17 20Z',
 n:'M19 43C19 36 23 32 29 29L33 25Q27 25 24 28L17 25L13 21L18 14L24 9L28 9L31 4L34 9C44 12 47 22 44 31L40 43Z',
 b:'M30 8C24 14 17 24 18 31Q18 38 25 40L22 44H38L35 40Q42 38 42 31C43 24 36 14 30 8Z M31 13L27 29H31L35 14Z',
 q:'M17 20L22 31L25 15L30 31L35 15L38 31L43 20L39 43H21Z',
 k:'M27 4H33V9H38V14H33V19C39 13 48 15 50 21C53 29 43 35 38 41L38 44H22V41C17 35 7 29 10 21C12 15 21 13 27 19V14H22V9H27Z M19 22Q16 23 20 27L25 31V23Q22 21 19 22Z M41 22Q38 21 35 23V31L40 27Q44 23 41 22Z M28 20V33H32V20Z'
};
export function referencePiece(type,color,style){
 if(!REFERENCE_STYLES.includes(style))return null;
 const side=color==='b'?'b':'w',role=Object.hasOwn(profiles,type)?type:'p';
 const [light,mid,dark,edge]=palettes[style][side],id='reference-piece-'+(++serial);
 const path=(d,fill='url(#'+id+')',width=1.35)=>'<path d="'+d+'" fill-rule="evenodd" style="fill:'+fill+';stroke:'+edge+';stroke-width:'+width+';stroke-linecap:round;stroke-linejoin:round"/>';
 const line=d=>path(d,'none',.85);
 let body=path(profiles[role]);
 if(role==='q')for(const [cx,cy]of [[17,17],[25,11],[35,11],[43,17]])body+='<circle cx="'+cx+'" cy="'+cy+'" r="3.6" style="fill:url(#'+id+');stroke:'+edge+';stroke-width:1.35"/>';
 if(role==='b')body+='<circle cx="30" cy="7" r="3" style="fill:url(#'+id+');stroke:'+edge+';stroke-width:1.35"/>';
 if(role==='n')body+='<circle cx="25" cy="16.5" r="1.25" style="fill:'+edge+';stroke:none"/>'+line('M16 22L21 23M35 16Q40 23 34 34');
 if(role==='r')body+=line('M22 23H38');
 if(role!=='p')body+=path(foot);
 return '<svg viewBox="0 0 60 60" class="piece flat reference '+style+(side==='b'?' black':'')+'" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2=".35"><stop stop-color="'+light+'"/><stop offset=".62" stop-color="'+mid+'"/><stop offset="1" stop-color="'+dark+'"/></linearGradient></defs>'+body+'</svg>';
}
