export const BALL_COLORS=['#f5ecd5','#ffd21a','#1755d9','#dc1727','#7022b9','#ff7815','#087b43','#751b30','#080c15'];
export function ballColor(id,s){return s.discipline==='pyramid'?(id===0?(s.color==='red'?'#ac2838':'#e6b735'):'#fff3d9'):BALL_COLORS[id>8?id-8:id];}
