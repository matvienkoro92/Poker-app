'use strict';

const { raffleGroupAccessLevel } = require('./raffle-core');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const number = value => Number(value).toLocaleString('ru-RU').replace(/[\u00a0\u202f]/g, ' ');

function cardData(raffle, now = Date.now()) {
  const groups = (raffle.groups || []).filter(group => Number(group.count) > 0);
  const cash = raffle.prizeKind === 'cash';
  let total = 0, known = groups.length > 0;
  const lines = groups.map(group => {
    const prize = String(group.prize || '').replace(/[\u00a0\u202f]/g, ' ');
    const match = prize.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|руб\.?|р\.?)/i) || (cash && prize.match(/^\s*(\d[\d\s]*(?:[.,]\d+)?)\s*$/));
    const amount = match ? Number(match[1].replace(/\s/g, '').replace(',', '.')) : 0;
    if (amount > 0) total += amount * Number(group.count); else known = false;
    return number(group.count) + (cash ? ' бай-инов' : ' беккинг-билетов') + (amount ? ' за ' + number(amount) + ' ₽' : '');
  });
  const levels = [...new Set(groups.map(group => raffleGroupAccessLevel(raffle, group)))].sort((a, b) => a - b);
  const end = Date.parse(raffle.endDate);
  const seconds = Number.isFinite(end) ? Math.max(0, Math.ceil((end - now) / 1000)) : null;
  const countdown = seconds == null ? 'Скоро' : [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, '0')).join(':');
  return {
    amount: known ? number(total) + ' ₽' : 'Розыгрыш',
    lines,
    access: !levels.length || levels[0] === 0 ? (levels.length > 1 ? 'Доступ: по группам' : 'Доступ: всем') : 'Доступ: уровень ' + levels[0] + '+' + (levels.length > 1 ? ' · по группам' : ''),
    countdown,
    participants: Array.isArray(raffle.participants) ? raffle.participants.length : Math.max(0, Number(raffle.participantsCount) || 0),
  };
}

function wrap(text, limit = 23) {
  const lines = [];
  for (const word of String(text).split(/\s+/)) {
    if (!lines.length || lines[lines.length - 1].length + word.length + 1 > limit) lines.push(word);
    else lines[lines.length - 1] += ' ' + word;
  }
  return lines;
}

function svgFor(raffle, now) {
  const data = cardData(raffle, now);
  const lines = data.lines.flatMap(line => wrap(line));
  const extra = Math.max(0, lines.length - 2) * 35;
  const height = 350 + extra, buttonsY = 252 + extra;
  const text = (x, y, size, value, fill = '#ffe08a', weight = 800, attrs = '') => '<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="'+weight+'" fill="'+fill+'" '+attrs+'>'+escape(value)+'</text>';
  return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="'+height+'" viewBox="0 0 900 '+height+'">'+
    '<defs><linearGradient id="bg" x2="1" y2=".5"><stop stop-color="#0a0a16"/><stop offset="1" stop-color="#32123f"/></linearGradient><linearGradient id="gold" x2="0" y2="1"><stop stop-color="#ffe99a"/><stop offset="1" stop-color="#f6b921"/></linearGradient></defs>'+
    '<rect width="900" height="'+height+'" fill="#08090f"/><rect x="12" y="12" width="876" height="'+(height-24)+'" rx="48" fill="url(#bg)" stroke="#ce83f8" stroke-width="4"/>'+
    '<g font-family="DejaVu Sans, sans-serif">'+text(46,92,data.amount.length > 12 ? 43 : 57,data.amount)+
    text(452,61,20,'До итогов','#c4b6d0',500)+text(452,108,34,data.countdown,'#eddbf9')+
    '<rect x="686" y="45" width="166" height="60" rx="22" fill="#18111e" stroke="#61513c" stroke-width="2"/>'+text(769,83,22,'Уч. · '+number(data.participants),'#e5d19a',800,'text-anchor="middle"')+
    lines.map((line, i) => text(46,163+i*35,27,line)).join('')+
    '<rect x="452" y="131" width="400" height="61" rx="15" fill="#103e2b" stroke="#4dd48b" stroke-width="2"/>'+text(470,170,data.access.length > 29 ? 19 : 25,data.access,'#b2f1cf')+
    '<rect x="46" y="'+buttonsY+'" width="255" height="72" rx="26" fill="url(#gold)" stroke="#ffe9a1" stroke-width="2"/>'+text(173,buttonsY+45,23,'УЧАСТВОВАТЬ','#18120c',800,'text-anchor="middle"')+
    '<rect x="320" y="'+buttonsY+'" width="255" height="72" rx="26" fill="#17101e" stroke="#61513c" stroke-width="2"/>'+text(447,buttonsY+45,24,'ИНФО','#e5d19a',800,'text-anchor="middle"')+
    text(714,buttonsY+45,21,'ПОЗВАТЬ ДРУГА','#c4a9ce',800,'text-anchor="middle"')+'</g></svg>';
}

async function render(raffle, now) {
  return require('sharp')(Buffer.from(svgFor(raffle, now))).jpeg({quality:90}).toBuffer();
}

module.exports = { cardData, svgFor, render };
