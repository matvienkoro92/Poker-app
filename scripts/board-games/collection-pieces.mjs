// Pre-rendered sculptures keep live chess lightweight; standard SVG sets live in pieces.mjs.
export const SCULPTED_STYLES=['staunton','arabesque','crystal','regalia','roman-revolt','prison-wardens'];
let shadowSerial=0;
export function collectionPiece(type,color,style){
 if(!SCULPTED_STYLES.includes(style))return null;
 const role=['k','q','b','n','r','p'].includes(type)?type:'p',side=color==='b'?'b':'w';
 // Every sprite's foot sits at y=240. Ground the foot there, rather than
 // casting a distant shadow around the whole sculpture (which reads as floating).
 const radius={k:85,q:83,b:77,n:91,r:82,p:61}[role],id='sculpted-ground-'+(++shadowSerial);
 const shadow='<defs><radialGradient id="'+id+'"><stop stop-color="#20160f" stop-opacity=".48"/><stop offset=".5" stop-color="#20160f" stop-opacity=".28"/><stop offset="1" stop-color="#20160f" stop-opacity="0"/></radialGradient></defs><ellipse class="sculpted-ground-shadow" cx="128" cy="241" rx="'+radius+'" ry="9" style="fill:url(#'+id+');stroke:none"/><ellipse cx="128" cy="241" rx="'+(radius*.61)+'" ry="2.2" style="fill:#21180f;fill-opacity:.24;stroke:none"/>';
 return '<svg viewBox="0 0 256 256" class="piece luxury sculpted '+style+(side==='b'?' black':'')+'" aria-hidden="true">'+shadow+'<image x="0" y="0" width="256" height="256" href="./assets/board-games/chess/sculpted-v2/'+style+'-'+side+'-'+role+'.webp?v=20261028-pawn-proportions-1"/></svg>';
}
