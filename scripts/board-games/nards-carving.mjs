// Decorative wells never intercept a legal point's click target.
export function createLandingWell(preview=false){const well=document.createElement('span');well.className=preview?'living-preview-well':'nards-landing-well';well.setAttribute('aria-hidden','true');return well;}
export function paintStorage(element,player,count=0){
 element.classList.add('nards-storage');element.dataset.side=player===0?'white':'black';element.setAttribute('aria-label',(player===0?'Белые':'Чёрные')+' · выведено '+count+' из 15');element.replaceChildren();
 const number=document.createElement('strong');number.textContent=count;number.title='Выведено '+count+' из 15';const slots=document.createElement('div');slots.className='nards-storage-slots';slots.setAttribute('aria-hidden','true');
 for(let i=0;i<15;i++){const slot=document.createElement('i');slot.className=i<count?'is-filled':'';if(i<count){const edge=document.createElement('span');edge.className='nards-stored-edge';slot.append(edge);}slots.append(slot);}
 element.append(number,slots);
}

export function createPointBlade(preview=false){const blade=document.createElement('span');blade.className=preview?'living-preview-blade':'nards-point-blade';blade.setAttribute('aria-hidden','true');blade.innerHTML='<svg viewBox="0 0 100 100" preserveAspectRatio="none">'+(preview?'<polygon points="2,1 98,1 50,98" vector-effect="non-scaling-stroke"/>':'<path class="point-inlay" d="M0 7 Q50 -4 100 7 L50 98Z" vector-effect="non-scaling-stroke"/>')+'</svg>';return blade;}

export function createSurfaceHalf(side){const half=document.createElement('span');half.className='nards-half-art is-'+side;half.setAttribute('aria-hidden','true');return half;}

// A shallow carved lip at the edge of each lane, below the coordinate strip.
export function createLandingNotch(){const notch=document.createElement('span');notch.className='nards-landing-notch';notch.setAttribute('aria-hidden','true');notch.innerHTML='<svg viewBox="0 0 100 30" preserveAspectRatio="none"><path class="notch-inlay" d="M-3 0H103V26H100Q50-14 0 26H-3Z"/><path class="notch-grain" d="M-3 3H103"/><path class="notch-highlight" d="M-2 29Q50-13 102 29"/><path class="notch-edge" d="M-2 27Q50-15 102 27"/><path class="notch-inner" d="M-2 23Q50-11 102 23"/><g class="notch-ornament notch-ornament--leaf"><path d="M10 9Q22-1 31 5Q23 12 10 9M69 5Q78-1 90 9Q77 12 69 5"/></g><g class="notch-ornament notch-ornament--royal"><path d="M12 8L17 3 22 7 17 12ZM78 7L83 3 88 8 83 12Z"/></g><g class="notch-ornament notch-ornament--club"><path d="M10 9L17 2 24 9Q20 14 17 10Q14 14 10 9ZM76 9L83 2 90 9Q86 14 83 10Q80 14 76 9Z"/></g><path class="notch-rim" d="M-3 1H103"/></svg>';return notch;}

// One continuous carving spans all six lanes; no per-lane SVG edges or seams.
export function createCarvedRail(side,bottom=false){
 const rail=document.createElement('span');rail.className='nards-carved-rail is-'+side+(bottom?' is-bottom':'');rail.setAttribute('aria-hidden','true');
 const id='carved-wood-'+side+'-'+Number(bottom);
 const curve='M-2 26 Q0 28 2 24 '+Array.from({length:6},(_,i)=>'Q'+(i*100+50)+' -14 '+(i*100+98)+' 24 Q'+(i*100+100)+' 28 '+(i*100+102)+' 24').join(' ');
 const scroll=Array.from({length:5},(_,i)=>'<g transform="translate('+((i+1)*100)+' 0)"><path d="M0 18C-4 6-17 4-18 10C-19 15-10 15-10 10M0 18C4 6 17 4 18 10C19 15 10 15 10 10"/><path class="rail-leaf" d="M0 15Q-12 0-18 4Q-14 12 0 15M0 15Q12 0 18 4Q14 12 0 15"/><path class="rail-gem" d="M0 3L5 9 0 15-5 9Z"/></g>').join('');
 rail.innerHTML='<svg viewBox="0 0 600 30" preserveAspectRatio="none"><defs><linearGradient id="'+id+'" x2="0" y2="1"><stop stop-color="var(--nards-light,#d3be8f)"/><stop offset=".4" stop-color="var(--nards-frame,#51351f)"/><stop offset=".63" stop-color="var(--nards-light,#d3be8f)"/><stop offset="1" stop-color="var(--nards-dark,#73502f)"/></linearGradient></defs><path class="rail-wood" fill="url(#'+id+')" d="'+curve+' L604 -2H-4Z"/><path class="rail-cut-shadow" d="'+curve+'"/><path class="rail-cut-light" transform="translate(0 2)" d="'+curve+'"/><path class="rail-cut-inner" transform="translate(0 -3)" d="'+curve+'"/><g class="rail-scroll">'+scroll+'</g><path class="rail-grain" d="M0 1H600M0 4H600"/></svg>';
 return rail;
}
