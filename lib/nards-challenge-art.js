'use strict';
const fs=require('node:fs'),path=require('node:path');
const {nardsShowPoints,NARDS_BOARDS,NARDS_INTERIORS,NARDS_DICE,LUXURY_CHECKERS,DESIGN_CHECKERS}=require('./nards-equipment');
const {nardsRail}=require('./nards-rails');
const esc=v=>String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const data=file=>{const name=path.basename(file),buffer=fs.readFileSync(path.join(__dirname,'../assets/board-games/nards',name));return 'data:image/'+(name.endsWith('.svg')?'svg+xml':'webp')+';base64,'+buffer.toString('base64');};
const SIMPLE=[{id:'classic',name:'Дерево',white:'#f6e4c1',black:'#492c1b'},{id:'pearl',name:'Перламутр',white:'#f1f1e6',black:'#374655'},{id:'jade',name:'Нефрит',white:'#e4ecd3',black:'#175b42'},{id:'ruby',name:'Рубин',white:'#f6d7c2',black:'#7d2234'}];
const spots={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
function svgFor(view){
 const totalCheckers=view.state.variant==='sprint'?(view.state.sprintCheckers??3):15;
 const equipment=view.equipment||{},board=NARDS_BOARDS.find(v=>v.id===equipment.nardsBoard)||NARDS_BOARDS[0],inside=NARDS_INTERIORS.find(v=>v.id===equipment.nardsInterior)||NARDS_INTERIORS[0],checkers=[...SIMPLE,...LUXURY_CHECKERS,...DESIGN_CHECKERS].find(v=>v.id===equipment.checkers)||SIMPLE[0],dice=NARDS_DICE.find(v=>v.id===equipment.nardsDice)||NARDS_DICE[0];
 const noHome=equipment.nardsHome==='none',plain=equipment.nardsRailsHidden===true;
 const texturedPoints=['obsidian-copper','arctic-ice','japan-lacquer','emerald-deco','cosmic-titanium'].includes(inside.id);
 // These interiors own their joint and edge artwork in the generator.
 const carved=!plain&&!texturedPoints;
 const X=noHome?8:36,Y=20,W=noHome?884:828,H=W*12/11,bar=18,half=(W-bar)/2,lane=half/6,D=lane*.91,spine=plain?'#171917':board.frame;
 const height=Math.max(944,Math.ceil(Y+H+20));
 let parts=['<defs><linearGradient id="rim"><stop stop-color="#fff3cd"/><stop offset=".5" stop-color="#b69c67"/><stop offset="1" stop-color="#6c5432"/></linearGradient><filter id="shadow" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="3" stdDeviation="2" flood-opacity=".45"/></filter></defs><rect width="900" height="'+height+'" rx="20" fill="#14291f"/>'];
 parts.push('<defs><filter id="field-brightness" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope=".8"/><feFuncG type="linear" slope=".8"/><feFuncB type="linear" slope=".8"/></feComponentTransfer></filter></defs>');
 for(let side=0;side<2;side++){
  const x=X+side*(half+bar),bounds=' x="'+x+'" y="'+Y+'" width="'+half+'" height="'+H+'"';
  const clip='board-surface-'+side;
  parts.push('<defs><clipPath id="'+clip+'"><rect'+bounds+'/></clipPath></defs>');
  const surface=inside[side?'rightSurface':'leftSurface'];
  parts.push('<image data-detail="board-surface" href="'+data(surface)+'"'+bounds+' preserveAspectRatio="xMidYMid slice" clip-path="url(#'+clip+')" filter="url(#field-brightness)"/>');
 }
 const icePoints=inside.id==='sport-sibir';
 parts.push('<defs><filter id="point-material" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".048 .017" numOctaves="4" seed="21" result="noise"/><feColorMatrix in="noise" type="matrix" values="1.9 0 0 0 -.48 1.9 0 0 0 -.48 1.9 0 0 0 -.48 0 0 0 .54 0"/><feComposite in2="SourceGraphic" operator="in" result="grain"/><feBlend in="SourceGraphic" in2="grain" mode="soft-light"/></filter></defs>');
 if(nardsShowPoints(inside,equipment.nardsPoints,equipment.nardsPointsFor))for(let row=0;row<2;row++)for(let col=0;col<12;col++){
  const x=X+col*lane+(col>=6?bar:0),gap=(inside.referenceTheme?25:[50.3,54.5,60.1,60.1,54.5,50.3][col%6]),length=H/2*(1-gap/100),start=row?Y+H:Y,tip=row?start-length:start+length;
  if(texturedPoints){
   parts.push('<image data-detail="point-inlay" href="'+data(inside.id+'-point-'+(col%2?'light':'dark')+'-v2.webp')+'" x="'+x+'" y="'+(row?start-length:start)+'" width="'+lane+'" height="'+length+'" preserveAspectRatio="none"'+(row?' transform="rotate(180 '+(x+lane/2)+' '+(start-length/2)+')"':'')+'/>');
   continue;
  }
  const direction=row?-1:1,pointY=fraction=>start+direction*length*fraction;
  const light=col%2!==0,cx=x+lane/2;
  const fill=icePoints?(light?'#a9c9db':'#243e5b'):(light?(inside.id==='santorini'?inside.light:inside.accent):inside.dark);
  const edge=light?inside.frame:inside.light;
  const pointPath='M'+(x+lane*.055)+' '+pointY(.015)+'H'+(x+lane*.945)+'L'+cx+' '+pointY(.98)+'Z';
  parts.push('<path data-detail="point-inlay" d="'+pointPath+'" fill="'+fill+'" filter="url(#point-material)"/><path d="'+pointPath+'" fill="none" stroke="'+edge+'" stroke-width=".7" stroke-opacity=".38"/>');
 }
 // Match the current case: carved outer lips,
 // recessed storage wells and brass hinges. Keep the room host palette.
 const fullHome=equipment.nardsHomeFull===true||equipment.nardsHome==='full';
 const railX=fullHome&&!noHome?X:6,railW=fullHome&&!noHome?W:888;
 // The Villa painting includes wooden margins alongside the physical spine.
 const spineInset=inside.id==='manki-villa'?16:0;
 const spineX=X+half-spineInset,spineWidth=bar+2*spineInset;
 parts.push('<defs><linearGradient id="hinge"><stop stop-color="#715026"/><stop offset=".32" stop-color="#d6b874"/><stop offset=".5" stop-color="#705020"/><stop offset=".55" stop-color="#f2dca2"/><stop offset="1" stop-color="#5a3f1d"/></linearGradient></defs>');
 if(!plain)for(const [side,y]of [['Top',0],['Bottom',Y+H]]){
  const rail=nardsRail(equipment['nardsRail'+side]),id='case-carving-'+side;
  const gap=id+'-gap',end=railX+railW,spineRight=spineX+spineWidth;
  parts.push('<defs><pattern id="'+id+'" width="120" height="20" patternUnits="userSpaceOnUse"><image href="'+data(rail.image)+'" width="120" height="20" preserveAspectRatio="none"/></pattern><clipPath id="'+gap+'"><rect x="'+railX+'" y="'+(y-1)+'" width="'+(spineX-railX)+'" height="22"/><rect x="'+spineRight+'" y="'+(y-1)+'" width="'+(end-spineRight)+'" height="22"/></clipPath></defs><rect data-detail="case-carving" data-rail="'+rail.id+'" x="'+railX+'" y="'+y+'" width="'+railW+'" height="20" rx="2" fill="url(#'+id+')" stroke="#b59961" stroke-width="1" clip-path="url(#'+gap+')"/>');
 }
 if(plain)parts.push('<rect data-detail="plain-rim" x="'+X+'" y="'+Y+'" width="'+W+'" height="'+H+'" fill="none" stroke="#bcaa7f" stroke-width="3"/>');
 const seam=spineX+spineWidth/2;
 parts.push('<defs><linearGradient id="spine-leaf"><stop stop-opacity="0"/><stop offset=".8" stop-opacity=".12"/><stop offset="1" stop-opacity=".36"/></linearGradient></defs><g data-detail="center-spine"><rect x="'+spineX+'" width="'+spineWidth+'" height="'+height+'" fill="#160e09"/>');
 const leafWidth=spineWidth/2-1.5;
 for(const [x,transform] of [[spineX,''],[seam+1.5,' transform="translate('+(2*seam)+' 0) scale(-1 1)"']]){
  parts.push('<rect data-detail="spine-leaf" x="'+x+'" width="'+leafWidth+'" height="'+height+'" fill="'+spine+'"/><rect x="'+spineX+'" width="'+leafWidth+'" height="'+height+'" fill="url(#spine-leaf)"'+transform+'/>');
 }
 parts.push('</g>');
 if(carved)for(const fraction of [.15,.85]){
  const y=Y+H*fraction-16,hingeWidth=Math.max(14,spineWidth*.68);
  parts.push('<g data-detail="brass-hinge"><rect x="'+(seam-hingeWidth/2)+'" y="'+y+'" width="'+hingeWidth+'" height="32" rx="3" fill="url(#hinge)" stroke="#62471f"/><rect x="'+(seam-2)+'" y="'+(y-1)+'" width="4" height="34" rx="1" fill="#d8b56d" stroke="#62471f"/>');
  for(const dx of [-hingeWidth*.27,hingeWidth*.27])for(const dy of [6,26])parts.push('<circle cx="'+(seam+dx)+'" cy="'+(y+dy)+'" r="1.3" fill="#35270f"/>');
  parts.push('</g>');
 }
 if(!noHome){
  const home=equipment.nardsHome==='full'?'round':equipment.nardsHome||'round',top=fullHome&&!plain?0:Y,homeHeight=fullHome&&!plain?height:H;
  const base=inside.frame||board.frame,metal=inside.accent||board.light,face=inside.dark;
  parts.push('<defs><linearGradient id="home-frame"><stop stop-color="#000" stop-opacity=".42"/><stop offset=".24" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-opacity=".32"/></linearGradient><radialGradient id="home-well" cx="50%" cy="85%" r="78%"><stop stop-color="'+face+'"/><stop offset=".27" stop-color="'+face+'"/><stop offset="1" stop-color="#060c0e"/></radialGradient></defs>');
  for(const x of [5,867]){
   parts.push('<g data-home="'+esc(home)+'" data-home-full="'+fullHome+'"><rect x="'+x+'" y="'+top+'" width="28" height="'+homeHeight+'" rx="6" fill="'+base+'" stroke="'+metal+'" stroke-opacity=".55"/><rect x="'+x+'" y="'+top+'" width="28" height="'+homeHeight+'" rx="6" fill="url(#home-frame)"/><rect x="'+(x+3)+'" y="'+(top+5)+'" width="22" height="32" rx="5" fill="'+base+'" stroke="'+metal+'" stroke-opacity=".65"/><ellipse data-detail="storage-counter" cx="'+(x+14)+'" cy="'+(top+21)+'" rx="4" ry="6" fill="none" stroke="#fff1cf" stroke-width="2"/>');
   const step=(homeHeight-48)/totalCheckers,r=Math.min(10,step/2-2);
   if(home==='tray')parts.push('<rect data-detail="storage-tray" x="'+(x+3)+'" y="'+(top+43)+'" width="22" height="'+(homeHeight-48)+'" rx="4" fill="'+face+'"/><rect x="'+(x+3)+'" y="'+(top+43)+'" width="22" height="'+(homeHeight-48)+'" rx="4" fill="url(#home-frame)"/>');
   else for(let i=0;i<totalCheckers;i++){
    const cx=x+14,cy=top+43+(i+.5)*step,attr=' data-detail="storage-well" fill="url(#home-well)" stroke="'+metal+'" stroke-opacity=".48" stroke-width="1"';
    if(home==='square')parts.push('<rect x="'+(cx-r)+'" y="'+(cy-r)+'" width="'+(2*r)+'" height="'+(2*r)+'" rx="3"'+attr+'/>');
    else if(home==='octagon')parts.push('<polygon points="'+[[-.44,-1],[.44,-1],[1,-.44],[1,.44],[.44,1],[-.44,1],[-1,.44],[-1,-.44]].map(([dx,dy])=>(cx+r*dx)+','+(cy+r*dy)).join(' ')+'"'+attr+'/>');
    else parts.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"'+attr+'/>');
   }
   parts.push('</g>');
  }
 }
 // Retired landing-well overlays must not return from old saved equipment.
 const white=checkers.whiteArt?data(checkers.whiteArt):null,black=checkers.blackArt?data(checkers.blackArt):null;
 const checkerMaterials=[
  {id:'light',color:checkers.white,art:white,highlight:'#fff8e6',shade:'#8f6037',rim:'#d0b386',side:'#82663d'},
  {id:'dark',color:checkers.black,art:black,highlight:'#ac957b',shade:'#20100b',rim:'#8e7355',side:'#111b16'}
 ];
 for(const {id,color,highlight,shade,rim} of checkerMaterials){
  parts.push('<defs><radialGradient id="disc-'+id+'" cx="32%" cy="24%" r="76%"><stop stop-color="'+highlight+'"/><stop offset=".62" stop-color="'+color+'"/><stop offset="1" stop-color="'+shade+'"/></radialGradient><linearGradient id="disc-rim-'+id+'" x2="0" y2="100%"><stop stop-color="'+highlight+'"/><stop offset=".45" stop-color="'+rim+'"/><stop offset="1" stop-color="'+shade+'"/></linearGradient></defs>');
 }
 function coin(cx,cy,isBlack){
  const {id,art,side}=checkerMaterials[Number(isBlack)],r=D/2;
  parts.push('<g filter="url(#shadow)"><circle cx="'+cx+'" cy="'+(cy+2)+'" r="'+r+'" fill="'+side+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r-1)+'" fill="url(#disc-'+id+')" stroke="url(#disc-rim-'+id+')" stroke-width="2"/>');
  if(art){
   const clip='coin-'+Math.round(cx)+'-'+Math.round(cy),scale=['carved','heraldic'].includes(checkers.id)?1.38:DESIGN_CHECKERS.includes(checkers)?1:1.18,size=D*scale;
   parts.push('<clipPath id="'+clip+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+(r-1)+'"/></clipPath><image href="'+art+'" x="'+(cx-size/2)+'" y="'+(cy-size/2)+'" width="'+size+'" height="'+size+'" clip-path="url(#'+clip+')"/>');
  }else{
   parts.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+(r-4)+'" fill="none" stroke="url(#disc-rim-'+id+')" stroke-width="1.5"/><path d="M'+(cx-r*.6)+' '+(cy-r*.52)+'Q'+cx+' '+(cy-r*.99)+' '+(cx+r*.49)+' '+(cy-r*.63)+'" fill="none" stroke="#fff8e6" stroke-opacity=".38" stroke-width="1.4" stroke-linecap="round"/>');
  }
  parts.push('</g>');
 }
 // Use the live board's point orientation and half-board stack compression.
 const counts=view.state.discipline==='long'?{0:totalCheckers,12:-totalCheckers}:{0:2,11:5,16:3,18:5,23:-2,12:-5,7:-3,5:-5};
 for(const [key,count]of Object.entries(counts)){
  const p=Number(key),top=p<12,col=top?11-p:p-12,cx=X+lane*(col+.5)+(col>=6?bar:0),n=Math.abs(count);
  const step=Math.min(D,(H/2-2-D)/Math.max(1,n-1));
  parts.push('<g data-detail="checker-stack" data-point="'+p+'">');
  for(let i=0;i<n;i++)coin(cx,top?Y+D/2+2+i*step:Y+H-D/2-2-i*step,count<0);
  parts.push('</g>');
 }
 const size=900*(equipment.nardsDiceSize==='small'?.058:.081);
 for(let i=0;i<2;i++){const x=X+W*(i?.80:.64)-size/2,y=Y+H/2-size/2,value=i?3:6;parts.push('<g transform="rotate('+(i?8:-9)+' '+(x+size/2)+' '+(y+size/2)+')" filter="url(#shadow)"><rect x="'+x+'" y="'+(y+4)+'" width="'+size+'" height="'+size+'" rx="7" fill="'+dice.edge+'"/><rect x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" rx="7" fill="'+dice.face+'" stroke="'+dice.edge+'" stroke-width="1.5"/>');if(dice.id==='carbon')for(let n=4;n<size;n+=6)parts.push('<path d="M'+(x+n)+' '+y+'v'+size+'M'+x+' '+(y+n)+'h'+size+'" stroke="#9ac9cc18" stroke-width="2"/>');for(const pos of spots[value])parts.push('<circle cx="'+(x+size*(.25+((pos-1)%3)*.25))+'" cy="'+(y+size*(.25+Math.floor((pos-1)/3)*.25))+'" r="'+size*.065+'" fill="'+dice.pip+'"/>');parts.push('</g>');}

 return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="'+height+'" viewBox="0 0 900 '+height+'">'+parts.join('')+'</svg>';
}
async function supportedImages(svg){
 // librsvg does not decode embedded WebP; normalize nested artwork before rasterizing.
 const urls=[...new Set([...svg.matchAll(/data:image\/(?:webp|svg\+xml);base64,[A-Za-z0-9+/=]+/g)].map(m=>m[0]))];
 const replacements=await Promise.all(urls.map(async url=>{const bytes=Buffer.from(url.slice(url.indexOf(',')+1),'base64');if(url.startsWith('data:image/webp'))return [url,'data:image/png;base64,'+(await require('sharp')(bytes).png().toBuffer()).toString('base64')];return [url,'data:image/svg+xml;base64,'+Buffer.from(await supportedImages(bytes.toString('utf8'))).toString('base64')];}));
 for(const [from,to]of replacements)svg=svg.split(from).join(to);return svg;
}
async function render(view){return require('sharp')(Buffer.from(await supportedImages(svgFor(view)))).jpeg({quality:88}).toBuffer();}
module.exports={render,svgFor,supportedImages};
