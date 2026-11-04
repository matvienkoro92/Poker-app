'use strict';

const games = {
  long: '🎲 Длинные нарды',
  billiards: '🎱 Бильярд',
  chess: '♟ Шахматы',
  short: '🎲 Короткие нарды',
};
const appUrl = 'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=';

async function create(game, player, token, settings, updateId) {
  if (!Object.hasOwn(games, game) || !player?.id || player.is_bot) {
    throw Error('Invalid game or player');
  }
  const identity = player;
  const member = 'tg_' + player.id;
  const family = game === 'billiards' ? 'billiards' : 'board-games';
  const gate = await require('./game-participation-gate').check(member, token, identity);
  if (!gate.ok) return {text: gate.error || 'Не удалось проверить доступ к игре.', keyboard: []};

  const {service, commands} = family === 'billiards'
    ? require('./billiards-service')
    : require('./board-games-service');
  const resolve = require('./api-handlers/friends').resolveNewsAccountId;
  let equipment;
  if (family === 'billiards') {
    const saved = await require('./billiards-personal-equipment')({
      member, identity, body: {}, commands, resolve,
    });
    equipment = saved.equipment;
  } else {
    const accountId = await resolve(identity, member);
    const [saved] = await commands([['GET', 'poker_app:board-games:v1:equipment:' + accountId]]);
    if (saved) equipment = JSON.parse(saved);
  }

  const body = {
    action: 'create',
    discipline: game === 'billiards' ? 'pyramid' : game,
    ...(game === 'chess' ? {side: 'random'} : {}),
    ...settings,
    requestId: 'telegram_game_' + updateId,
    equipment,
    denyDarts: true,
  };
  const admission = await require('./game-admission').forApi(commands).begin({family, member, identity, body});
  let view;
  try {
    view = await service.call(member, body, identity);
    await admission.remember(view);
  } finally {
    await admission.release();
  }
  await require('./active-game').remember({family, member, commands, view}).catch(error => {
    console.error('[telegram-create-game] active room:', error.message);
  });

  return {...invitation(game, view.roomId, 'Комната создана.'), created: true};
}

function invitation(game, roomId, status, sent = false) {
  const url = appUrl + (game === 'billiards' ? 'billiards_' : 'board_') + roomId;
  return {
    text: games[game] + ' · ' + status + '\nКод: <code>' + roomId + '</code>',
    keyboard: [
      ...(!sent ? [[{text: 'Бросить вызов в чат', callback_data: 'club:game-challenge:' + game + ':' + roomId}]] : []),
      [{text: 'Отправить другу', url: 'https://t.me/share/url?url=' + encodeURIComponent(url)}],
      [{text: 'Открыть комнату', url}],
    ],
  };
}

async function challenge(action, player, token) {
  const match = /^game-challenge:(billiards|chess|short|long):([A-HJ-NP-Z2-9]{10})$/.exec(action);
  if (!match || !player?.id || player.is_bot) throw Error('Invalid game challenge');
  const [, game, roomId] = match;
  const member = 'tg_' + player.id;
  const identity = player;
  const gate = await require('./game-participation-gate').check(member, token, identity);
  if (!gate.ok) return invitation(game, roomId, 'Не удалось подтвердить доступ к игре.');
  const billiards = game === 'billiards';
  const {service, commands} = billiards ? require('./billiards-service') : require('./board-games-service');
  const send = billiards ? require('./billiards-challenge') : require('./board-games-challenge');
  try {
    await send({member, identity, roomId, discipline: game, service, commands, token});
    return invitation(game, roomId, 'Вызов отправлен в чат игроков.', true);
  } catch (error) {
    const status = error.status ? error.message.replace(/[&<>]/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;'})[char]) : 'Не удалось подтвердить отправку вызова.';
    return invitation(game, roomId, status);
  }
}

const choice = (key, label, values) => ({key, label, values});
const number = (key, label, valid) => ({key, label, valid});
const yesNo = [['Нет', false], ['Да', true]];

function nextSetting(game, settings) {
  const fields = [];
  if (game === 'billiards') {
    fields.push(choice('discipline', 'Дисциплина', [['Свободная пирамида', 'pyramid'], ['Пул «восьмёрка»', 'pool8']]));
    if (settings.discipline === 'pyramid') {
      fields.push(choice('color', 'Цвет битка', [['Жёлтый', 'yellow'], ['Красный', 'red']]));
      fields.push(choice('goldenBall', 'Золотой шар', yesNo));
    } else if (settings.discipline === 'pool8') {
      fields.push(choice('callPockets', 'Заказ шара и лузы', yesNo));
    }
  }
  if (game === 'long') fields.push(choice('variant', 'Формат', [['Классические', 'classic'], ['Бешеные', 'crazy'], ['6:1', 'six-one']]));
  fields.push(choice('raceTo', 'Матч', [['Одна партия', 1], [game === 'short' || game === 'long' ? 'До 3 очков' : 'До 3 побед', 3]]));
  if (game === 'chess') {
    fields.push(choice('timeControl', 'Контроль времени', require('./chess-time-controls').controls.map(({label, id}) => [label, id])));
    fields.push(choice('side', 'Ваш цвет', [['Белые', 0], ['Чёрные', 1], ['Случайно', 'random']]));
  } else {
    const times = game === 'billiards' ? [30, 45, 60, 90] : [30, 45, 60];
    fields.push(choice('turnSeconds', 'Время на ход', times.map(seconds => [seconds + ' сек.', seconds])));
  }
  const nards = game === 'short' || game === 'long';
  if (nards) fields.push(choice('allowUndo', 'Разрешить отмену хода', yesNo));
  fields.push(choice('paid', 'Ставка', [['Без ставки', false], ['На фишки', true]]));
  if (settings.paid) fields.push(number('stake', 'Введите ставку целым числом от 100 фишек', value => Number.isSafeInteger(value) && value >= 100 && value <= Number.MAX_SAFE_INTEGER / 2));
  if (nards && settings.paid) fields.push(choice('multipliers', 'Марс и кокс', yesNo));
  if (settings.multipliers) {
    fields.push(number('marsMultiplier', 'Введите коэффициент марса от 1 до 5,5', value => value >= 1 && value <= 5.5));
    fields.push(number('koksMultiplier', 'Введите коэффициент кокса от ' + require('./board-games-wager-rules').minimumKoks(settings.marsMultiplier || 1) + ' до 10', value => value >= require('./board-games-wager-rules').minimumKoks(settings.marsMultiplier) && value <= 10));
  }
  return fields.find(field => !Object.hasOwn(settings, field.key));
}

const redis = require('./redis');

function templateKey(player, game) {
  return 'poker_app:telegram-game-template:' + player.id + ':' + game;
}

async function configure(path, player, token, updateId, button) {
  const [selectedGame, mode] = path.split('.');
  if (!Object.hasOwn(games, selectedGame)) throw Error('Invalid game');
  if (!mode || mode === 'last' || mode === 'stake') {
    const key = templateKey(player, selectedGame);
    const [saved] = await redis.pipeline([['GET', key]], {throwOnError: true});
    const template = saved?.result;
    if (!mode || !template) return {
      text: games[selectedGame] + '\n\nВыберите способ настройки.' +
        (template ? '' : '\nШаблон появится после создания первой комнаты.'),
      keyboard: [
        [button('Задать параметры', 'create-game:' + selectedGame + '.new')],
        ...(template ? [
          [button('По предыдущему шаблону', 'create-game:' + selectedGame + '.last')],
          [button('Изменить сумму ставки пред. шаблона', 'create-game:' + selectedGame + '.stake')],
        ] : []),
        [button('← Выбрать игру заново', 'create-game')],
      ],
    };
    if (mode === 'last') return configure(template, player, token, updateId, button);
    return {
      text: games[selectedGame] + '\n\nВведите новую ставку от 100 фишек или 0 для игры без ставки.\nОтветьте на это сообщение одним числом.',
      numberPrompt: template + '.bet',
    };
  }
  if (mode === 'new') path = selectedGame;
  const replacement = /^(.*)\.bet\.([^.]*)$/.exec(path);
  if (replacement) {
    const [, template, amount] = replacement;
    const stake = Number(amount);
    if (!Number.isSafeInteger(stake) || stake > Number.MAX_SAFE_INTEGER / 2 || (stake !== 0 && stake < 100)) {
      return configure(selectedGame + '.stake', player, token, updateId, button);
    }
    const parts = template.split('.');
    const [game] = parts;
    const settings = {};
    let index = 1;
    for (; index < parts.length; index++) {
      const field = nextSetting(game, settings);
      if (field.key === 'paid') break;
      settings[field.key] = field.values[Number(parts[index])][1];
    }
    const tail = parts[index] === '1' ? parts.slice(index + 2) : [];
    path = [...parts.slice(0, index), ...(stake
      ? ['1', String(stake), ...(tail.length ? tail : ['short','long'].includes(game) ? ['0'] : [])]
      : ['0'])].join('.');
  }
  const [game, ...answers] = path.split('.');
  if (!Object.hasOwn(games, game)) throw Error('Invalid game');
  const settings = {};
  const summary = [];
  let prefix = game;
  for (const answer of answers) {
    const field = nextSetting(game, settings);
    if (!field && answer === 'go' && prefix + '.go' === path) {
      const {paid, multipliers, ...roomSettings} = settings;
      const result = await create(game, player, token, roomSettings, updateId);
      if (result.created) {
        await redis.pipeline([['SET', templateKey(player, game), prefix]], {throwOnError: true}).catch(error => {
          console.error('[telegram-create-game] template:', error.message);
        });
      }
      return result;
    }
    if (!field) throw Error('Invalid game settings');
    const selected = /^\d+$/.test(answer) ? field.values?.[Number(answer)] : undefined;
    const value = field.values ? selected?.[1] : (/^\d{1,16}(?:_\d{1,2})?$/.test(answer) ? Number(answer.replace('_', '.')) : NaN);
    if (value === undefined || (field.valid && !field.valid(value))) {
      return configure(prefix, player, token, updateId, button);
    }
    settings[field.key] = value;
    summary.push(field.label + ': ' + (selected?.[0] ?? value));
    prefix += '.' + answer;
  }
  const field = nextSetting(game, settings);
  const heading = [games[game], ...summary].join('\n');
  const back = [button('← Выбрать игру заново', 'create-game')];
  if (!field) return {
    text: heading + '\n\nПодтвердите создание комнаты.',
    keyboard: [[button('Создать комнату', 'create-game:' + path + '.go')], back],
  };
  if (!field.values) return {
    text: heading + '\n\n' + field.label + '.\nОтветьте на это сообщение одним числом.',
    numberPrompt: path,
  };
  return {
    text: heading + '\n\n' + field.label +
      (field.key === 'allowUndo' ? '? Сделанные перемещения можно отменить, пока текущий ход не завершён.' : ''),
    keyboard: [...field.values.map(([label], index) => [button(label, 'create-game:' + path + '.' + index)]), back],
  };
}

module.exports = {games, configure, challenge};
