const classic={
 p:'<circle cx="30" cy="19" r="8"/><path d="M23 28h14l-2 5q-3 12 7 18H18q10-6 7-18z"/>',
 r:'<path d="M14 9h8v8h5V9h7v8h5V9h8v17l-7 5-2 20H22l-2-20-6-5z"/><path d="M19 28h23v5H19z"/>',
 n:'<path d="M17 50q-3-13 10-20l-8 3-7-7 12-14 7-6 4 8q13 3 14 16l-2 20z"/><path d="M28 16l-9 10m18-6q5 14-9 25" style="fill:none"/><circle cx="30" cy="21" r="1.5" style="fill:var(--piece-stroke);stroke:none"/>',
 b:'<path d="M30 6q-18 14-13 25l9 6q0 8-8 14h24q-8-6-8-14l9-6Q48 20 30 6z"/><path d="M33 14l-9 12" style="fill:none;stroke-width:3"/><ellipse cx="30" cy="36" rx="10" ry="3"/>',
 q:'<path d="M13 18l8 8 9-17 9 17 8-8-7 22-1 11H21l-1-11z"/><circle cx="12" cy="15" r="3"/><circle cx="30" cy="7" r="3"/><circle cx="48" cy="15" r="3"/><ellipse cx="30" cy="39" rx="10" ry="3"/>',
 k:'<path d="M27 4h6v7h7v6h-7v8q14-4 13 8l-9 9 5 9H18l5-9-9-9q-1-12 13-8v-8h-7v-6h7z"/><ellipse cx="30" cy="40" rx="10" ry="3"/>'
};
const eastern={
 p:'<path d="M30 8q-13 13-9 21l7 5-8 17h20l-8-17 7-5Q43 21 30 8z"/>',
 r:'<path d="M12 18l5-9 6 9 7-12 7 12 6-9 5 9-6 10-3 23H21l-3-23z"/><path d="M18 28h24v7H18z"/>',
 n:'<path d="M17 51q-1-13 12-24l-10 4-8-8 13-10 5-9 8 11q14 7 10 20l-7 16z"/><path d="M36 16q-3 13-12 20m12-20l-5-4" style="fill:none"/><circle cx="29" cy="20" r="1.7" style="fill:var(--piece-stroke);stroke:none"/>',
 b:'<path d="M30 4q-5 11-13 14-6 13 7 18l-6 15h24l-6-15q13-5 7-18Q35 15 30 4z"/><path d="M30 12l-6 12m-4 7h20" style="fill:none"/>',
 q:'<path d="M12 16l9 8L30 4l9 20 9-8-3 18-9 7 5 10H19l5-10-9-7z"/><path d="M20 33q10-9 20 0" style="fill:none"/><circle cx="30" cy="10" r="2"/>',
 k:'<path d="M30 3l5 10q15 4 12 18l-10 9 6 11H17l6-11-10-9Q10 17 25 13z"/><path d="M19 27q11-15 22 0M21 34h18" style="fill:none"/>'
};
const crystal={
 p:'<path d="M30 8l10 10-4 12-6 5-6-5-4-12zM24 35h12l8 17H16z"/>',
 r:'<path d="M13 8h9v9h5V8h7v9h5V8h8v18l-9 9 5 17H17l5-17-9-9z"/>',
 n:'<path d="M16 52l3-15 13-12-13 7-8-7 12-12L33 5l5 12 11 11-7 24z"/>',
 b:'<path d="M30 4l14 18-8 13 8 17H16l8-17-8-13z"/>',
 q:'<path d="M11 16l10 9 9-21 9 21 10-9-7 21-4 6 6 9H16l6-9-4-6z"/>',
 k:'<path d="M27 3h6v8h7v6h-7v8l12-5 1 13-9 9 7 10H16l7-10-9-9 1-13 12 5v-8h-7v-6h7z"/>'
};
const palettes={staunton:[['#fff2ce','#d8ae70','#6c4025'],['#ad7850','#4c2a19','#e1c48d']],arabesque:[['#f9edce','#c9a76d','#916c38'],['#815632','#302014','#e4bc70']],crystal:[['#ffffff','#8ac7e3','#355e7d'],['#8bbade','#193b6e','#ccecff']],regalia:[['#fff5da','#ddc394','#b78d3c'],['#9c4d65','#381325','#f0ce7c']]};
export function collectionPiece(type,color,style){if(!palettes[style])return null;const [hi,lo,edge]=palettes[style][color==='b'?1:0],id=style+'-'+color,body=style==='crystal'?crystal:style==='arabesque'?eastern:classic;
 const base=style==='crystal'?'<path d="M16 52h28l7 10-7 5H16l-7-5z"/><path d="M16 52l14 15 14-15M9 62h42" style="fill:none;stroke:#bde7ff;stroke-opacity:.65"/>':'<ellipse cx="30" cy="64" rx="23" ry="4"/><path d="M12 60l5-8h26l5 8v4H12z"/><ellipse cx="30" cy="53" rx="14" ry="3"/><path d="M12 60h36" style="fill:none;stroke:'+edge+';stroke-width:2"/>';
 const ornament=style==='regalia'?'<path d="M20 46q10-11 20 0M24 49l6-9 6 9" style="fill:none;stroke:#ebc66c;stroke-width:1.7"/><circle cx="30" cy="46" r="2.3" style="fill:#c82e48;stroke:#f5d58c"/>':style==='arabesque'?'<path d="M22 44q4-8 8 0t8 0M23 48q7-7 14 0" style="fill:none;stroke:'+edge+';stroke-width:1.5"/>':style==='crystal'?'<path d="M30 12v37M21 35l9 14 9-14" style="fill:none;stroke:#d6f4ff;stroke-opacity:.55;stroke-width:1"/>':'<path d="M24 36q-2 8-6 12" style="fill:none;stroke:#fff2cc;stroke-opacity:.45"/>';
 return '<svg viewBox="0 0 60 72" class="piece luxury '+style+(color==='b'?' black':'')+'" aria-hidden="true" style="--piece-fill:url(#'+id+');--piece-stroke:'+edge+'"><defs><linearGradient id="'+id+'" x1="0" x2="1"><stop stop-color="'+lo+'"/><stop offset=".32" stop-color="'+hi+'"/><stop offset=".6" stop-color="'+hi+'"/><stop offset="1" stop-color="'+lo+'"/></linearGradient></defs>'+base+(body[type]||body.p)+ornament+'</svg>';
}
