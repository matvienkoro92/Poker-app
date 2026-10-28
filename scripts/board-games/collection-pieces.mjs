// Pre-rendered sculptures keep live chess lightweight; standard SVG sets live in pieces.mjs.
export const SCULPTED_STYLES=['staunton','arabesque','crystal','regalia','roman-revolt','prison-wardens'];
export function collectionPiece(type,color,style){
 if(!SCULPTED_STYLES.includes(style))return null;
 const role=['k','q','b','n','r','p'].includes(type)?type:'p',side=color==='b'?'b':'w';
 return '<svg viewBox="0 0 256 256" class="piece luxury sculpted '+style+(side==='b'?' black':'')+'" aria-hidden="true"><image x="0" y="0" width="256" height="256" href="./assets/board-games/chess/sculpted-v2/'+style+'-'+side+'-'+role+'.webp?v=20261028-sculpted-fit-1"/></svg>';
}
