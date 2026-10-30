'use strict';
// Wilson lower confidence bound (95%): reward win rate supported by enough games.
// A draw counts as half a win. No games means no rating.
function score(stats){const w=Math.max(0,Number(stats.wins)||0),l=Math.max(0,Number(stats.losses)||0),d=Math.max(0,Number(stats.draws)||0),n=w+l+d;if(!n)return 0;const z=1.96,p=(w+d*.5)/n;return Math.max(0,Math.min(100,100*(p+z*z/(2*n)-z*Math.sqrt((p*(1-p)+z*z/(4*n))/n))/(1+z*z/n)));}
function rankPlayers(rows){return rows.filter(s=>(Number(s.wins)||0)+(Number(s.losses)||0)+(Number(s.draws)||0)>0).map(s=>({...s,ratingScore:score(s)})).sort((a,b)=>b.ratingScore-a.ratingScore||b.wins-a.wins||a.losses-b.losses||String(b.id).localeCompare(String(a.id))).map((s,i)=>({...s,ratingScore:Math.round(s.ratingScore*100)/100,rank:i+1}));}
module.exports={score,rankPlayers};
