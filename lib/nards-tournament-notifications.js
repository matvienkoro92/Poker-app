'use strict';

const clean = (name, limit = 80) => String(name || 'Игрок').replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, ' ').trim().slice(0, limit).replace(/[\uD800-\uDBFF]$/, '');
const format = amount => Number(amount).toLocaleString('ru-RU');

function message(t, event, time = Date.now()) {
  const title = clean(t.title);
  const name = id => clean(t.entries.find(entry => entry.id === id)?.name);
  const players = t.entries.filter(entry => !entry.withdrawn && (!t.buyIn || entry.paid));
  const roster = players.map((entry, index) => (index + 1) + '. ' + clean(entry.name, 50));
  const tournamentButton = { inline_keyboard: [[{ text: 'Открыть турнир',
    url: 'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=nards_tour_' + t.id }]] };
  if (event === 'created') {
    const start = t.startsAt == null ? 'Старт объявит организатор.' : 'Старт: ' +
      new Date(t.startsAt).toLocaleString('ru-RU', {
        timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
      }) + ' МСК';
    const discipline = t.discipline === 'long' ? 'Длинные' : 'Короткие';
    const variant = { crazy: 'Бешеные', 'six-one': '6:1 · Кафтар' }[t.variant] || 'Классические';
    const prizePool = t.entryType === 'chips' ? t.capacity * t.buyIn : t.prizeFund;
    let prize = prizePool ? 'Призовой фонд: ' + format(prizePool) + ' фишек Poker21' +
      (t.entryType === 'chips' ? ' при полном наборе' : '') : 'Без призов';
    if (t.prizeKind === 'tickets') {
      const tickets = t.prizeAmounts.flatMap((amount, index) =>
        amount > 0 ? [(index + 1) + '-е место — билет на ' + format(amount) + ' ₽'] : []);
      prize = ['Призы — билеты на покер:', ...tickets].join('\n');
    }
    return {
      text: ['🎲 Турнир по нардам, вход ' + (t.entryType === 'chips' ? format(t.buyIn) + ' фишек' : '0'),
        '🎯 ' + discipline + ' ' + variant.toLocaleLowerCase('ru-RU'), '',
        '⏰ ' + start, '🏆 ' + prize, '👥 Мест: ' + t.capacity].join('\n'),
      reply_markup: tournamentButton
    };
  }
  if (event === 'half') {
    return {
      text: ['🎲 Уже набралась половина участников турнира «' + title + '»', '',
        'Зарегистрировались (' + players.length + '/' + t.capacity + ')', ...roster, '',
        'Осталось мест: ' + (t.capacity - players.length)].join('\n'),
      reply_markup: tournamentButton
    };
  }
  if (event === 'start') {
    return { text: ['🎲 Старт турнира «' + title + '»', '', 'Участники (' + players.length + ')', ...roster].join('\n') };
  }
  if (event === 'before-start') {
    const minutes = Math.max(1, Math.ceil((t.startsAt - time) / 60000));
    const word = new Intl.PluralRules('ru').select(minutes);
    const remaining = minutes === 30 ? 'полчаса' : minutes + ' ' + ({ one: 'минута', few: 'минуты', many: 'минут' }[word] || 'минут');
    return {
      text: '⏰ До старта турнира по нардам «' + title + '» осталось ' + remaining + '.',
      reply_markup: tournamentButton
    };
  }
  if (event === 'ready') {
    return {
      text: '🎲 Турнир «' + title + '» запускается. Первые партии начнутся не позднее чем через 3 минуты.\n\n' +
        'Откройте турнир и нажмите «Подтвердить готовность». Если оба игрока подтвердят готовность, партия начнётся сразу.',
      reply_markup: tournamentButton
    };
  }
  if (event.startsWith('semifinal:')) {
    const round = t.rounds.at(-2);
    const match = round.matches.find(match => match.id === event.slice('semifinal:'.length));
    return {
      text: '🎲 Начался полуфинал (½) турнира «' + title + '»\n\n' + match.playerIds.map(name).join(' — ') +
        '\nИгра до ' + round.target + ' очк.',
      reply_markup: { inline_keyboard: [[{ text: 'Смотреть партию',
        url: 'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=board_watch_' + match.roomId }]] }
    };
  }
  if (event === 'final') {
    const match = t.rounds.at(-1).matches[0];
    return {
      text: '🏁 Начался финал турнира «' + title + '»\n\n' + match.playerIds.map(name).join(' — ') +
        '\nИгра до ' + t.rounds.at(-1).target + ' очк.',
      reply_markup: { inline_keyboard: [[{ text: 'Смотреть партию',
        url: 'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=board_watch_' + match.roomId }]] }
    };
  }
  const heading = '🏆 Итоги турнира «' + title + '»';
  if (!t.winnerId) return { text: heading + '\n\nТурнир завершился без победителя.' };
  const ticket = t.ticketAwards?.find(award => award.entryId === t.winnerId);
  const chips = t.paymentPlan?.find(op => op.key === 'prize:' + t.winnerId)?.amount;
  const prize = ticket ? 'билет на покер номиналом ' + format(ticket.amount) + ' ₽'
    : chips ? format(chips) + ' фишек Poker21' : 'турнир без приза';
  return { text: heading + '\n\nПобедитель: ' + name(t.winnerId) + '\nПриз: ' + prize };
}

function advancementMessage(t, match, entryId) {
  const remaining = t.rounds.length - match.round;
  const stage = remaining === 1 ? 'финал' : remaining === 2 ? 'полуфинал' : '1/' + 2 ** (remaining - 1) + ' финала';
  const opponent = t.entries.find(entry => entry.id === match.playerIds.find(id => id && id !== entryId));
  const target = t.rounds[match.round].target;
  const points = target % 10 === 1 && target % 100 !== 11 ? 'очка' : 'очков';
  return {
    text: ['🎲 Вы прошли в ' + stage + ' турнира «' + clean(t.title) + '»!',
      'Ваш соперник: ' + (opponent ? clean(opponent.name) : 'ещё определяется'),
      'Игра до ' + target + ' ' + points + '.'].join('\n'),
    reply_markup: { inline_keyboard: [[{ text: 'Открыть партию',
      url: 'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=nards_tour_' + t.id + '_' + match.roomId }]] }
  };
}

async function send(payload, token) {
  const chat = await require('./tracking-link-milestones').playersGroup();
  if (!/^-\d+$/.test(String(chat))) throw Error('Чат игроков не настроен');
  const response = await require('./telegram-group-policy').guardedFetch(
    'https://api.telegram.org/bot' + token + '/sendMessage',
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, ...payload }), signal: AbortSignal.timeout(4000) },
    'nards-tournament');
  if (!response.ok || !(await response.json()).ok) throw Error('Telegram не принял уведомление');
}

async function sendReady(entry, payload, token) {
  const member = /^tg_[1-9]\d*$/.test(entry.member) ? entry.member :
    /^ID\d{6}$/.test(entry.accountId) ? await require('./account-id').getPreferredUserIdByDtId(entry.accountId) : '';
  const chat = String(member || '').match(/^tg_([1-9]\d*)$/)?.[1];
  if (!chat) return;
  const response = await require('./telegram-group-policy').guardedFetch(
    'https://api.telegram.org/bot' + token + '/sendMessage',
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, chat_id: chat }), signal: AbortSignal.timeout(4000) });
  const result = await response.json().catch(() => null);
  if (response.ok && result?.ok || [400, 403].includes(response.status)) return;
  const error = Error('Telegram не принял личное уведомление');
  error.retryAfter = result?.parameters?.retry_after;
  throw error;
}

module.exports = { message, advancementMessage, send, sendReady };
