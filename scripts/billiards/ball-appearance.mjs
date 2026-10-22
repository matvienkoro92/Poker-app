export const BALL_COLORS=['#f5ecd5','#e7b12e','#2862bc','#cc3835','#7443a2','#e88328','#26764a','#82322e','#171b23'];
export function ballColor(id,s){return s.discipline==='pyramid'?(id===0?(s.color==='red'?'#ac2838':'#e6b735'):'#fff3d9'):BALL_COLORS[id>8?id-8:id];}
