'use strict';
const fs=require('node:fs'),path=require('node:path');
function generate(){
 for(const side of ['white','black']){
 const dark=side==='black',c=dark?['#a24b51','#5b101b','#32030b','#160106','#f1c0ab']:['#fff7dc','#f6dfa9','#dfb96f','#ad7a3d','#ffffff'];
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="body" cx="32%" cy="23%" r="80%"><stop stop-color="${c[0]}"/><stop offset=".37" stop-color="${c[1]}"/><stop offset=".8" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[3]}"/></radialGradient><linearGradient id="rim" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="${c[4]}"/><stop offset=".25" stop-color="${c[0]}"/><stop offset=".65" stop-color="${c[3]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient><radialGradient id="shine"><stop stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="98" fill="${c[3]}"/><circle cx="100" cy="98" r="92" fill="url(#body)" stroke="url(#rim)" stroke-width="6"/><circle cx="100" cy="98" r="79" fill="none" stroke="${c[3]}" stroke-opacity=".35" stroke-width="2"/><path d="M31 91A70 70 0 0 1 91 29" fill="none" stroke="${c[4]}" stroke-opacity=".85" stroke-width="6" stroke-linecap="round"/><ellipse cx="59" cy="48" rx="25" ry="13" fill="url(#shine)" transform="rotate(-40 59 48)"/><path d="M120 171A76 76 0 0 0 174 112" fill="none" stroke="${c[0]}" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/></svg>`;
 fs.writeFileSync(path.join(__dirname,'../../assets/board-games/nards/designer-burgundy-pearl-'+side+'.svg'),svg);
 }
}
module.exports=generate;if(require.main===module)generate();
