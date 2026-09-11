'use strict';
const crypto = require('node:crypto');
const {nickKey} = require('./friend-news');
const key = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0,32);
// Only server-published positive results and verified account nicknames are eligible.
function memories(self, friends, rows, now = Date.now()) {
 if (!self || !self.userId || !nickKey(self.nick)) return [];
 const ownKey = nickKey(self.nick), identities = new Map(), tournaments = new Map();
 for (const f of friends || []) {
  const n = nickKey(f.nick);
  if (!n || n === ownKey || !f.userId || f.userId === self.userId) continue;
  if (identities.has(n) && identities.get(n)?.userId !== f.userId) identities.set(n,null);
  else if (!identities.has(n)) identities.set(n,f);
 }
 for (const r of rows || []) {
  const date = String(r.date || ''), at = Date.parse(date + (/Z$|[+-]\d\d:\d\d$/.test(date) ? '' : '+03:00'));
  if (!r.tournamentId || !r.tournament || !Number.isInteger(r.place) || r.place < 1 || !Number.isFinite(r.reward) || r.reward <= 0 || !Number.isFinite(at) || at > now) continue;
  if (!tournaments.has(r.tournamentId)) tournaments.set(r.tournamentId,new Map());
  const group = tournaments.get(r.tournamentId), n = nickKey(r.nick), old = group.get(n);
  // Conflicting published rows need correction, never arbitrarily pick a prize.
  if (group.has(n) && (!old || old.place !== r.place || old.reward !== r.reward || old.date !== r.date)) group.set(n,null);
  else group.set(n,r);
 }
 const out = [], result = (p,r) => ({accountId:p.userId,nick:p.nick,place:r.place,reward:r.reward});
 for (const [tournamentId,group] of tournaments) {
  const own = group.get(ownKey);if (!own) continue;
  const history = {tournamentId,tournament:own.tournament,date:own.date,results:[result(self,own)],source:'Опубликованные результаты клуба'};
  const origin = own.date.slice(0,10).split('-').reverse().join('.')+' · '+own.tournament+' · '+own.place+'-е место';
  out.push({id:'event-'+key([tournamentId,self.userId]),title:own.place===1?'Кубок победы':own.place<=3?'Кубок призёра':'В призах',art:own.place===1?4:5,origin,history:{...history,kind:'tournament'}});
  for (const [nick,f] of identities) {
   const other=group.get(nick);if (!f || !other) continue;
   out.push({id:'together-'+key([tournamentId,[self.userId,f.userId].sort()]),title:'В призах вместе с '+f.nick,art:3,atlas:'characters',origin:origin+' · '+f.nick+': '+other.place+'-е место',history:{...history,kind:'shared-tournament',results:[result(self,own),result(f,other)]}});
  }
 }
 return out.sort((a,b)=>b.history.date.localeCompare(a.history.date)||a.id.localeCompare(b.id));
}
module.exports={memories};
