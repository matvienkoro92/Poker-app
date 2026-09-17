'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {getPlayingTables} = require('./pokerplus');
const {createClassifier} = require('./live-table-classification');
const classify = createClassifier();
const PREFIX = 'club:';
const idle = require('./telegram-club-menu-idle');
const redis = require('./redis');
function rootMenu(events = {}) {
  return {text:'<b>Выберите раздел:</b>', parse_mode:'HTML', reply_markup:{inline_keyboard:[
    [{text:'📅 Расписание',callback_data:'club:schedule:0'}],
    [{text:'🟢 Столы сейчас',callback_data:'club:menu'}],
    ...(events.raffles ? [[{text:'🎟 Розыгрыши',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=raffles'}]] : []),
    ...(events.betId ? [[{text:'♠ Ласт-лонгер',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp='+encodeURIComponent('tournament_bet_'+events.betId)}]] : []),
    [{text:'⬇️ Скачать Покер21',url:'https://www.poker21pro.com/'}],
    [{text:'♠️ Клубное приложение',url:'https://t.me/Poker_dvatuza_bot/DvaTuza'}],
  ]}};
}
function parseEvent(raw) { try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch (_) { return null; } }
async function activeRootMenu() {
  try {
    const rows = await redis.pipeline([['GET','poker_app:tournament_bet:current'],['SMEMBERS','poker_app:raffle_active_ids'],['GET','poker_app:raffle_active_ids:ready']]);
    if (!rows) return rootMenu();
    const bet = parseEvent(rows[0]?.result);
    let ids = rows[1]?.result || [];
    if (!rows[2]?.result) {
      const all = await redis.pipeline([['LRANGE','poker_app:raffle_ids','0','-1']], {
        allowLargeRedisRead: true,
        context: 'telegram-club-commands.raffle-id-fallback'
      });
      ids = all?.[0]?.result || [];
    }
    const raffles = ids.length ? await redis.pipeline(ids.map(id=>['GET','poker_app:raffle:'+id])) : [];
    const now = Date.now();
    return rootMenu({betId:bet?.status === 'open' ? bet.id : null, raffles:(raffles || []).some(row=>{
      const raffle = parseEvent(row.result);
      return raffle?.status === 'active' && Date.parse(raffle.endDate) > now;
    })});
  } catch (_) { return rootMenu(); }
}
async function restoreRoot(message, token) {
  const response = await fetch('https://api.telegram.org/bot'+token+'/editMessageText', {
    method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(10000),
    body:JSON.stringify({...await activeRootMenu(),chat_id:message.chat.id,message_id:message.message_id,
      ...(message.business_connection_id ? {business_connection_id:message.business_connection_id} : {})})
  });
  const result = await response.json();
  if (!result.ok && !/message is not modified|message to edit not found/i.test(result.description || '')) throw new Error('Menu restore failed');
}
const escapeHtml = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const bold = value => '<b>' + escapeHtml(value) + '</b>';
function command(update) {
  const cb = update.callback_query;
  if (cb && String(cb.data || '').startsWith(PREFIX)) return String(cb.data).slice(PREFIX.length);
  const m = update.message || update.business_message;
  const text = String(m?.text || '').trim().toLowerCase().replace(/@[a-z0-9_]+(?=\s|$)/i, '').replace(/^\//, '');
  if (['пульс', 'pulse'].includes(text)) return 'pulse';
  if (['расписание', 'schedule'].includes(text)) return 'schedule:0';
  if (['столы', 'столы сейчас', 'tables'].includes(text)) return 'menu';
  return null;
}
function paginate(blocks, limit = 3500, separator = '\n\n') {
  const pages = []; let page = '';
  for (const block of blocks) {
    if (page && page.length + block.length + separator.length > limit) { pages.push(page); page = ''; }
    page += (page ? separator : '') + block;
  }
  if (page) pages.push(page);
  return pages.length ? pages : ['Нет данных.'];
}
function schedulePages() {
  const html = fs.readFileSync(path.join(__dirname, '../html-fragments/schedule.html'), 'utf8');
  const clean = s => s.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
  const subtitle = html.match(/class="schedule-subtitle">([^<]+)/)?.[1] || 'Время московское';
  const blocks = [bold('📅 РАСПИСАНИЕ ТУРНИРОВ') + '\n<i>' + escapeHtml(clean(subtitle)) + '</i>'];
  for (const section of html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)) {
    const title = clean(section[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] || '');
    let first = true;
    for (const row of section[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
      const cells = [...row[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(m => clean(m[1]));
      if (!cells.length) continue;
      blocks.push((first ? bold(title.toUpperCase()) + '\n\n' : '') + bold(cells[0]) + (cells[4] ? ' · ' + bold(cells[4]) : '') + '\n' + bold(cells[1]) + '\nБай-ин: ' + escapeHtml(cells[2]) + ' · Гарантия / приз: ' + escapeHtml(cells[3])); first = false;
    }
  }
  blocks.push('<i>Точные даты и время турниров месяца объявляются отдельно.</i>');
  return paginate(blocks);
}
const order = ['Холдем','Омаха','Дурак','Двадцать одно','Китайский покер','Сека'];
function limit(t) { const a = String(t.blindAnnotation || '').replace(',', '.').match(/\d+(?:\.\d+)?/g); return a ? Number(a[1] || a[0]) : -1; }
function tablePages(raw, category) {
  // Same public scope restrictions as the report bot; never expose private unions.
  const rows = raw.filter(t => Number(t.playerCount) > 0 && String(t.leagueId) === '184691')
    .filter(t => category === 'tournaments' ? classify(t).category === 'tournaments' : classify(t).category !== 'tournaments')
    .sort((a,b) => {
      const rank = t => { const i = order.indexOf(classify(t).name); return i < 0 ? order.length : i; };
      return rank(a)-rank(b) || classify(a).name.localeCompare(classify(b).name,'ru') || (classify(a).name === 'Омаха' && classify(b).name === 'Омаха' ? (Number(String(b.playType).match(/PLO\s*([456])/i)?.[1]) || 0) - (Number(String(a.playType).match(/PLO\s*([456])/i)?.[1]) || 0) : 0) || limit(b)-limit(a) || Number(b.playerCount)-Number(a.playerCount);
    });
  const blocks = [bold(category === 'tournaments' ? 'Турниры · МТТ и СНГ · Анти-Рег' : 'Столы · Анти-Рег')];
  let previous = '';
  rows.forEach((t,i) => {
    const baseGame = classify(t).name;
    const game = baseGame === 'Омаха' ? 'Омаха ' + String(t.playType).toUpperCase() : baseGame;
    const heading = ({'Двадцать одно':'21','Китайский покер':'OFC'})[game] || game.toUpperCase();
    const type = String(t.playType || '');
    const number = '✅';
    blocks.push((previous !== game ? '\n' + bold(heading) + '\n' : '') + number + ' ' + bold(t.deskName) + '\n' + escapeHtml(type) + ' · Игроков: ' + escapeHtml(t.playerCount) + ' · Блайнды: ' + escapeHtml(t.blindAnnotation || '—'));
    previous = game;
  });
  if (!rows.length) blocks.push('Сейчас активных столов не найдено.');
  return paginate(blocks, 3500, '\n');
}
async function handleUnlocked(update, token, action = command(update)) {
  if (!action) return false;
  const cb = update.callback_query;
  const message = cb?.message || update.message || update.business_message;
  if (!message?.chat || !token) return false;
  const call = async (method, payload) => {
    const r = await fetch('https://api.telegram.org/bot' + token + '/' + method, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});
    const result = await r.json();
    if (!result.ok && !/message is not modified/i.test(result.description || '')) throw new Error('Telegram request failed');
    return result.result;
  };
  if (cb) await call('answerCallbackQuery', {callback_query_id:cb.id});
  const button = (text, data) => ({text,callback_data:PREFIX+data});
  let text, keyboard;
  try {
    if (action === 'pulse') {
      const menu = await activeRootMenu();
      text = menu.text;
      keyboard = menu.reply_markup.inline_keyboard;
    } else if (action === 'menu') {
      text = bold('Столы сейчас');
      keyboard = [[button('🏆 Турниры · МТТ и СНГ','tournaments:0')],[button('♠️ Холдем, Омаха, Дурак, 21, OFC, Сека','cash:0')],[button('⬅️ Назад','pulse')]];
    } else {
      const [kind, pageString] = action.split(':');
      if (!['schedule','cash','tournaments'].includes(kind)) return false;
      const pages = kind === 'schedule' ? schedulePages() : tablePages(await getPlayingTables(), kind);
      const page = Math.max(0, Math.min(pages.length-1, Number.parseInt(pageString,10) || 0));
      text = pages[page] + '\n\nСтраница ' + (page+1) + ' из ' + pages.length;
      const nav = [];
      if (page) nav.push(button('◀️ Назад',kind+':'+(page-1)));
      if (page+1 < pages.length) nav.push(button('Далее ▶️',kind+':'+(page+1)));
      keyboard = [...(nav.length ? [nav] : []),[button('🔄 Обновить',kind+':'+page)],[button('⬅️ Столы сейчас','menu')]];
    }
  } catch (_) {
    text = 'Не удалось загрузить данные. Попробуйте обновить.';
    keyboard = [[button('🔄 Повторить',action)]];
  }
  const sent = await call(cb ? 'editMessageText' : 'sendMessage', {
    chat_id:message.chat.id, text, parse_mode:'HTML', reply_markup:{inline_keyboard:keyboard},
    ...(cb ? {message_id:message.message_id} : {reply_to_message_id:message.message_id}),
    ...(message.business_connection_id ? {business_connection_id:message.business_connection_id} : {})
  });
  if (redis.isConfigured() && ['group','supergroup'].includes(message.chat.type)) {
    const messageId = cb ? message.message_id : sent?.message_id;
    if (messageId) await idle.arm({chat:message.chat,message_id:messageId,
      ...(message.business_connection_id ? {business_connection_id:message.business_connection_id} : {})}, action);
  }
  return true;
}
async function handle(update, token, action = command(update)) {
  const message = update.callback_query?.message;
  if (redis.isConfigured() && message && ['group','supergroup'].includes(message.chat?.type)) {
    return idle.withLock(idle.idFor(message), () => handleUnlocked(update, token, action));
  }
  return handleUnlocked(update, token, action);
}
module.exports = {command, handle, schedulePages, tablePages, rootMenu, restoreRoot, activeRootMenu};
