'use strict';

const clean = (name, limit = 80) => String(name || 'Игрок').replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, ' ').trim().slice(0, limit).replace(/[\uD800-\uDBFF]$/, '');
const format = amount => Number(amount).toLocaleString('ru-RU');

function message(t, event) {
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
    const discipline = t.discipline === 'long' ? 'Длинные нарды' : 'Короткие нарды';
    const variant = { crazy: 'Бешеные', 'six-one': '6:1 · Кафтар' }[t.variant] || 'Классические';
    const prizePool = t.entryType === 'chips' ? t.capacity * t.buyIn : t.prizeFund;
    const prize = t.prizeKind === 'tickets' ? 'Призы: билеты на покер на ' +
      format(t.prizeAmounts.reduce((sum, amount) => sum + amount, 0)) + ' ₽' +
      (t.prizeAmounts[0] ? ' (за 1-е место — билет на ' + format(t.prizeAmounts[0]) + ' ₽)' : '') : prizePool ? 'Призовой фонд: ' + format(prizePool) +
      ' фишек Poker21' + (t.entryType === 'chips' ? ' при полном наборе' : '') : 'Без призов';
    return {
      text: ['📣 Открыта регистрация на турнир по нардам «' + title + '»', '',
        'Формат: ' + discipline + ' · ' + variant, start, prize, 'Мест: ' + t.capacity].join('\n'),
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

module.exports = { message, send };
