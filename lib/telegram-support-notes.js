'use strict';
function append(base,notes){
 const rows=Array.isArray(notes)?notes:[];if(!rows.length)return base;
 const heading='\n\n📝 Заметки менеджеров',reserve=100;
 let budget=Math.max(0,4096-base.length-heading.length-reserve),selected=[];
 for(let i=rows.length-1;i>=0;i--){
  const note=rows[i],label='\n\n👤 '+note.author+':\n';
  const full=String(note.text||'');
  if(label.length+full.length>budget&&selected.length)break;
  const room=Math.max(0,budget-label.length);
  if(room<4)break;
  const text=full.length<=room?full:[...full].reduce((s,char)=>s.length+char.length<=room-1?s+char:s,'')+'…';
  const block=label+text;selected.unshift(block);budget-=block.length;
 }
 const hidden=rows.length-selected.length;
 return base+heading+(hidden?'\nРанее: '+hidden+' заметок в переписке темы.':'')+selected.join('');
}
module.exports={append};
