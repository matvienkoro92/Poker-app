'use strict';
// Accumulated results weighted by their success rate, with a ten-game prior.
// More games at the same success rate raise the score; a loss alone never does.
const formula='Р = 100 × П² / (П + Пор + 10)';
const explanation='П — победы, Пор — поражения. Ничьи не участвуют в расчёте рейтинга и не дают опыта. При одинаковой результативности больше решающих партий дают выше рейтинг. Поражение само по себе баллов не добавляет. Число 10 сглаживает рейтинг при малом количестве партий.';
const count=value=>{const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.floor(n)):0;};
const paidFormula='Р = 100 × Пк² / (Пк + Порк + 10); К = √(вход / 100)';
const paidExplanation='К — вес входа каждой партии. Пк = сумма К × Б за победы, Порк = сумма К за поражения. Ничьи не участвуют в расчёте рейтинга и не дают опыта. В нардах Б: обычная победа ×1, марс ×1,25, кокс ×1,5; в остальных играх Б = 1. Бонус получает только победитель. Вход — базовая ставка каждого игрока; денежные множители марса и кокса не используются. Старые партии с неизвестным входом имеют К = 1, с неизвестным видом победы — Б = 1. Число 10 сглаживает рейтинг новичков.';
function stakeCoefficient(stake){const n=Number(stake);return Number.isFinite(n)&&n>0?Math.sqrt(n/100):1;}
const weighted=(stats,key)=>{const n=Number(stats?.['weighted'+key[0].toUpperCase()+key.slice(1)]);return Number.isFinite(n)&&n>=0?n:count(stats?.[key]);};
function score(stats){const w=weighted(stats,'wins'),l=weighted(stats,'losses'),n=w+l;if(!n)return 0;const results=w;return 100*results*(results/(n+10));}
function rankPlayers(rows){return rows.map(s=>({...s,wins:count(s.wins),losses:count(s.losses),draws:count(s.draws)})).filter(s=>s.wins+s.losses>0).map(s=>({...s,ratingScore:score(s)})).sort((a,b)=>b.ratingScore-a.ratingScore||b.wins-a.wins||a.losses-b.losses||String(b.id).localeCompare(String(a.id))).map((s,i)=>({...s,ratingScore:Math.round(s.ratingScore*100)/100,rank:i+1}));}
module.exports={score,rankPlayers,formula,explanation,stakeCoefficient,paidFormula,paidExplanation};
