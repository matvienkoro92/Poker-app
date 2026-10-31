'use strict';
// Accumulated results weighted by their success rate, with a ten-game prior.
// More games at the same success rate raise the score; a loss alone never does.
const formula='Р = 100 × (П + Н / 2)² / (И + 10)';
const explanation='П — победы, Н — ничьи, И — все завершённые партии. Ничья считается половиной победы. При одинаковой результативности больше партий дают выше рейтинг. Поражение само по себе баллов не добавляет. Число 10 сглаживает рейтинг при малом количестве партий.';
const count=value=>{const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.floor(n)):0;};
function score(stats){const w=count(stats?.wins),l=count(stats?.losses),d=count(stats?.draws),n=w+l+d;if(!n)return 0;const results=w+d*.5;return 100*results*(results/(n+10));}
function rankPlayers(rows){return rows.map(s=>({...s,wins:count(s.wins),losses:count(s.losses),draws:count(s.draws)})).filter(s=>s.wins+s.losses+s.draws>0).map(s=>({...s,ratingScore:score(s)})).sort((a,b)=>b.ratingScore-a.ratingScore||b.wins-a.wins||a.losses-b.losses||String(b.id).localeCompare(String(a.id))).map((s,i)=>({...s,ratingScore:Math.round(s.ratingScore*100)/100,rank:i+1}));}
module.exports={score,rankPlayers,formula,explanation};
