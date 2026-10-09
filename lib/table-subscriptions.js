'use strict';
const {randomUUID} = require('node:crypto');
const {createClassifier} = require('./live-table-classification');
const classify = createClassifier();
const PREFIX = 'club:sub:';
const games = {NLH:'Холдем',PLO4:'PLO4',PLO5:'PLO5',PLO6:'PLO6',Durak:'Дурак',TwentyOne:'21',OFC:'OFC',Ceka:'Сека'};
const limitCategories = {
  low:{label:'1/2р–5/10р',min:2,max:10},
  middle:{label:'10/20р–25/50р',min:20,max:50},
  high:{label:'50/100р и выше',min:100,max:Infinity},
};
const limitLabel = value => limitCategories[value]?.label || value+'р';
function selectedLimitMatches(selected,limit) {
  return !!limit && selected.some(value=>{
    const category=limitCategories[value];
    return category ? limit.big>=category.min && limit.big<=category.max : value===limit.small+'/'+limit.big;
  });
}
const escape = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function parseLimit(text) {
  const match = String(text).trim().match(/^(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)(?:\s*[р₽])?$/i);
  if (!match) return null;
  const small = Number(match[1].replace(',','.')), big = Number(match[2].replace(',','.'));
  return small > 0 && big >= small ? {small,big} : null;
}
function gameOf(table) {
  if (classify(table).category === 'tournaments') return null;
  const type = String(table.playType || '').trim();
  if (/^NLH(?: |$)/i.test(type) || type === '6+') return 'NLH';
  if (/^PLO[456]$/i.test(type)) return type.toUpperCase();
  return ({durak:'Durak',tweneyone:'TwentyOne',twentyone:'TwentyOne','21':'TwentyOne',ofc:'OFC',ceka:'Ceka'})[type.toLowerCase()] || null;
}
const tableKey = t => [t.leagueId,t.unionId,t.groupId,t.deskId].map(String).join(':');
function matches(sub, tables) {
  if (sub.expiresAt && sub.expiresAt <= Date.now()) return [];
  return tables.filter(t => String(t.leagueId) === '184691' && Number(t.playerCount) > 0 && t.deskId != null).filter(t => {
    if (sub.cashOnly && !gameOf(t)) return false;
    if (sub.kind === 'player') {
      if (sub.selectedGames?.length && !sub.selectedGames.includes(gameOf(t))) return false;
      if (sub.selectedLimits?.length) {
        const limit=parseLimit(t.blindAnnotation);
        if (!limit || !selectedLimitMatches(sub.selectedLimits,limit)) return false;
      }
      return Object.values(t.pos || {}).some(id => String(id).trim() === sub.playerId);
    }
    if (Number(t.playerCount) < (sub.minPlayers || 1)) return false;
    if (sub.mode === 'selected') {
      if(!gameOf(t) || (sub.selectedGames.length && !sub.selectedGames.includes(gameOf(t)))) return false;
      const l=parseLimit(t.blindAnnotation);
      return !sub.selectedLimits.length || selectedLimitMatches(sub.selectedLimits,l);
    }
    if (gameOf(t) !== sub.game) return false;
    if (sub.mode === 'any') return true;
    const limit = parseLimit(t.blindAnnotation);
    return limit && (sub.mode === 'from' ? limit.big >= sub.limit.big : limit.small === sub.limit.small && limit.big === sub.limit.big);
  });
}
function describe(sub) {
  const label = sub.kind === 'player' ? `${sub.nick || 'Игрок'} (${sub.playerId})` : `${sub.mode === 'selected' ? (sub.selectedGames.length ? sub.selectedGames.map(g=>games[g]).join(', ') : 'Все игры') : games[sub.game]} · ${sub.mode === 'selected' ? (sub.selectedLimits.length ? sub.selectedLimits.map(limitLabel).join(', ') : 'любой лимит') : sub.mode === 'any' ? 'любой лимит' : (sub.mode === 'from' ? 'от ' : '') + sub.limit.small + '/' + sub.limit.big + 'р'} · от ${sub.minPlayers || 1} игроков`;
  return label + (sub.kind === 'player' && sub.selectedGames?.length ? ' · '+sub.selectedGames.map(g=>games[g]).join(', ') : '') + (sub.kind === 'player' && sub.selectedLimits?.length ? ' · '+sub.selectedLimits.map(limitLabel).join(', ') : '') + (sub.expiresAt ? ' · осталось '+Math.max(1,Math.ceil((sub.expiresAt-Date.now())/60000))+' мин.' : '');
}
function create({redis, send, getTables, getNames, namespace, push, pollBudgetMs=40000, beforeDelivery}) {
  const key = 'poker21:table-subscriptions:' + namespace + ':';
  let username;
  async function run(commands) {
    const rows = await redis.pipeline(commands, {context:'table-subscriptions',throwOnError:true});
    if (!rows || rows.some(row => row.error)) throw new Error('Subscription storage unavailable');
    return rows;
  }
  const read = async k => (await run([['GET',key+k]]))[0]?.result;
  const decode = raw => raw ? JSON.parse(raw) : null;
  const list = async user => decode(await read('user:'+user)) || [];
  function memberships(user, subs) {
    const entries = new Map();
    const expanded=subs.flatMap(sub=>sub.kind === 'game' && sub.mode === 'selected'
      ? (sub.selectedGames.length ? sub.selectedGames : Object.keys(games)).flatMap(game=>sub.selectedLimits.length ? sub.selectedLimits.map(value=>({...sub,game,mode:limitCategories[value] ? 'from' : 'exact',limit:limitCategories[value] ? {small:limitCategories[value].min/2,big:limitCategories[value].min} : parseLimit(value)})) : [{...sub,game,mode:'any'}])
      : [sub]);
    for (const sub of expanded) {
      let bucket, member=String(user), score;
      if (sub.kind === 'player') bucket='player:'+sub.playerId;
      else if (sub.mode === 'any') bucket='game:'+sub.game+':any';
      else if (sub.mode === 'exact') bucket='game:'+sub.game+':exact:'+sub.limit.small+':'+sub.limit.big;
      else { bucket='game:'+sub.game+':from'; score=sub.limit.big; member=user+':'+score; }
      entries.set(bucket+'|'+member,{bucket:key+'index:'+bucket,member,score});
    }
    return entries;
  }
  const write = async (user, subs) => {
    const before=memberships(user,await list(user)), after=memberships(user,subs);
    const commands=[['SET',key+'user:'+user,JSON.stringify(subs)], [subs.length ? 'SADD' : 'SREM',key+'users',String(user)]];
    const expiry = subs.filter(s=>s.expiresAt).map(s=>s.expiresAt);
    commands.push(expiry.length ? ['ZADD',key+'expiry',Math.min(...expiry),String(user)] : ['ZREM',key+'expiry',String(user)]);
    for (const [id,item] of before) if (!after.has(id)) commands.push([item.score === undefined ? 'SREM' : 'ZREM',item.bucket,item.member]);
    for (const item of after.values()) commands.push(item.score === undefined ? ['SADD',item.bucket,item.member] : ['ZADD',item.bucket,item.score,item.member]);
    return run(commands);
  };
  async function interestedUsers(interests) {
    const commands=[];
    for (const id of new Set(interests.players || [])) commands.push(['SMEMBERS',key+'index:player:'+id]);
    for (const interest of interests.games || []) {
      commands.push(['SMEMBERS',key+'index:game:'+interest.game+':any']);
      if (interest.limit) {
        commands.push(['SMEMBERS',key+'index:game:'+interest.game+':exact:'+interest.limit.small+':'+interest.limit.big]);
        commands.push(['ZRANGEBYSCORE',key+'index:game:'+interest.game+':from','-inf',interest.limit.big]);
      }
    }
    if (!commands.length) return [];
    const rows=await run(commands);
    return [...new Set(rows.flatMap(row=>row.result || []).map(member=>String(member).split(':')[0]))];
  }
  async function exclusive(id, work) {
    const token = randomUUID(), lock = key+'lock:'+id;
    if ((await run([['SET',lock,token,'NX','EX','55']]))[0]?.result !== 'OK') return false;
    try { return await work(); }
    finally { await run([['EVAL',"if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end",'1',lock,token]]); }
  }
  async function getUsername() {
    if (!username) username = (await send('getMe', {})).result?.username;
    if (!username) throw new Error('Bot username unavailable');
    return username;
  }
  const button = (text,action) => ({text,callback_data:PREFIX+action});
  async function save(user, sub) {
    const subs = await list(user);
    const identity = s => JSON.stringify([s.kind,s.playerId,s.game,s.mode,s.limit,s.kind === 'game' ? s.minPlayers || 1 : null,s.durationHours || 0,[...(s.selectedGames || [])].sort(),[...(s.selectedLimits || [])].sort()]);
    if (subs.some(s => identity(s) === identity(sub))) {
      await run([['DEL',key+'pending:'+user]]);
      return 'Такая подписка уже есть.';
    }
    if (subs.length >= 20) return 'Можно сохранить до 20 подписок. Удалите одну в «Моих подписках».';
    const tables = await getTables();
    sub.id = randomUUID().slice(0,8);
    sub.seen = matches(sub,tables).map(tableKey);
    sub.createdAt = new Date().toISOString();
    if (sub.durationHours) sub.expiresAt = Date.now()+sub.durationHours*3600000;
    await write(user, [...subs,sub]);
    await run([['DEL',key+'pending:'+user]]);
    return '✅ Подписка включена: ' + describe(sub) + '. Уведомления придут при новых событиях.';
  }
  async function expire() {
    const users = (await run([['ZRANGEBYSCORE',key+'expiry','-inf',Date.now(),'LIMIT','0','100']]))[0]?.result || [];
    for (const user of users) await exclusive('user:'+user,async()=>{
      const subs = await list(user);
      await write(user,subs.filter(sub=>!sub.expiresAt || sub.expiresAt>Date.now()));
    });
  }
  async function handle(update) {
    const cb = update.callback_query, message = cb?.message || update.message;
    const action = String(cb?.data || '').startsWith(PREFIX) ? cb.data.slice(PREFIX.length) : null;
    const text = String(update.message?.text || '').trim();
    const command = /^\/(?:подписки|subscriptions)(?:@\w+)?$/i.test(text) || /^\/start(?:@\w+)?\s+tablesub$/i.test(text);
    if (!message || (!action && !command && (message.chat.type !== 'private' || !text || text.startsWith('/')))) return false;
    if (!action && !command && !redis.isConfigured()) return false;
    const user = String((cb?.from || update.message?.from)?.id || '');
    if (!/^\d+$/.test(user)) return false;
    if (message.chat.type !== 'private') {
      if (!action) return false;
      await send('answerCallbackQuery', {callback_query_id:cb.id});
      await send('editMessageText', {chat_id:message.chat.id, message_id:message.message_id,
        ...(message.business_connection_id ? {business_connection_id:message.business_connection_id} : {}),
        text:'Подписки и уведомления доступны в личке бота.', reply_markup:{inline_keyboard:[
          [{text:'🔔 Открыть подписки',url:'https://t.me/'+await getUsername()+'?start=tablesub'}],
          [{text:'⬅️ Назад',callback_data:'club:pulse'}]
        ]}});
      return true;
    }
    if (String(message.chat.id) !== user) return false;
    if (!redis.isConfigured()) {
      if (!action && !command) return false;
      if (cb) await send('answerCallbackQuery',{callback_query_id:cb.id});
      await send('sendMessage',{chat_id:user,text:'Подписки временно недоступны. Попробуйте позже.'});
      return true;
    }
    const pending = !action && !command ? decode(await read('pending:'+user)) : null;
    if (!action && !command && !pending) return false;
    if (cb) await send('answerCallbackQuery',{callback_query_id:cb.id});
    await exclusive('user:'+user,async()=>{
      const existing = await list(user);
      if (existing.some(sub=>sub.expiresAt && sub.expiresAt<=Date.now())) await write(user,existing.filter(sub=>!sub.expiresAt || sub.expiresAt>Date.now()));
      let content = '🔔 Подписки · Анти-Рег\n\nВыберите событие, на которое хотите подписаться.\n\nЕсли игрок, на которого вы подписались, сел за стол, то вам придет уведомление.\nЕсли стартовал стол, на который подписались, то вам придет уведомление.\n\nСтолы сканируются примерно раз в 2–3 минуты.';
      let rows = [[button('♠️ Игра и лимит','games')],[button('👤 Игрок сел за стол','player')],[button('Мои подписки','list')]];
      const back = [button('⬅️ Подписки','menu')];
      const setPending = value => run([['SET',key+'pending:'+user,JSON.stringify(value),'EX','600']]);
      const chooseCount = async sub => {
        await setPending({...sub,step:'count'});
        content = 'Сколько игроков должно быть за столом '+(sub.mode === 'selected' ? 'выбранных игр' : games[sub.game])+'?\n\nВыберите минимум. Например, «От 3 игроков»: при 1–2 уведомления не будет, при 3 и больше — придёт. Когда число игроков опустится ниже минимума и снова вырастет до него, сообщим ещё раз.';
        rows = [1,2,3,4,5,6,7,8,9].map(n=>[button('От '+n+' '+(n === 1 ? 'игрока' : 'игроков'),'minimum:'+n)]).concat([back]);
      };
      const chooseDuration = async sub => {
        await setPending({...sub,step:'duration'});
        content = '⏳ Жду игру\n\nНа сколько включить подписку? Через 2 или 8 часов она сама отключится. Можно оставить без ограничения.';
        rows = [[button('На 2 часа','duration:2')],[button('На 8 часов','duration:8')],[button('Без ограничений','duration:0')],back];
      };
      if (command || action === 'menu') {
        await run([['DEL',key+'pending:'+user]]);
        if (push) {
          const state = await push.status(user);
          rows.push([button('📲 Пуш от клубного приложения · '+(state.subscribed && state.ready ? 'включён' : 'выключен'),'push')]);
        }
      }
      else if (push && ['push','push:on','push:off'].includes(action)) {
        let result;
        if (action !== 'push') result = await push.set(user,action === 'push:on');
        const state = await push.status(user);
        const enabled = state.subscribed && state.ready;
        content = '📲 Пуш от клубного приложения · '+(enabled ? 'включён' : 'выключен')+'\n\n'+(result?.error || state.error || (enabled ? 'События ваших подписок также придут уведомлением от приложения.' : 'Включите, чтобы получать события ваших подписок также от приложения.'));
        rows = [[button(enabled ? 'Выключить' : 'Включить',enabled ? 'push:off' : 'push:on')],
          [{text:'Открыть профиль приложения',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=profile'}],back];
      }
      else if (action === 'games') {
        const options=Object.keys(limitCategories);
        await setPending({kind:'game',mode:'selected',step:'filters',selectedGames:[],selectedLimits:[],limitOptions:options});
        content = 'Выберите виды игры. Можно отметить несколько вариантов или оставить «Все».';
        rows = [[button('✅ Все','gg:all')],...Object.entries(games).map(([id,label])=>[button('☐ '+label,'gg:'+id)]),[button('Далее: лимиты','gg:next')],back];
      } else if (action?.startsWith('game:') && games[action.slice(5)]) {
        const game = action.slice(5);
        content = 'Лимит для '+games[game]+':';
        rows = [[button('Любой лимит','choose:'+game+':any')],[button('Точный лимит','choose:'+game+':exact')],[button('От указанного лимита','choose:'+game+':from')],back];
      } else if (/^choose:(\w+):(any|exact|from)$/.test(action || '')) {
        const [,game,mode] = action.split(':');
        if (!games[game]) return;
        if (mode === 'any') await chooseCount({kind:'game',game,mode});
        else {
          await setPending({kind:'game',game,mode,step:'limit'});
          content = 'Напишите лимит, например 5/10 или 25/50. Для «от» сравниваем размер большого блайнда.';
          rows = [back];
        }
      } else if (/^minimum:[1-9]$/.test(action || '')) {
        const sub = decode(await read('pending:'+user));
        if (sub?.kind !== 'game' || sub.step !== 'count') {
          content = 'Выбор устарел. Вернитесь в подписки и выберите игру заново.';
        } else {
          const {step,...settings} = sub;
          await chooseDuration({...settings,minPlayers:Number(action.split(':')[1])});
        }
        if (sub?.step !== 'count') rows = [back];
      } else if (/^duration:[028]$/.test(action || '')) {
        const sub = decode(await read('pending:'+user));
        if (sub?.kind !== 'game' || sub.step !== 'duration') content = 'Выбор устарел. Начните настройку подписки заново.';
        else {
          const {step,...settings} = sub;
          content = await save(user,{...settings,durationHours:Number(action.split(':')[1])});
        }
        rows = [back];
      } else if (/^count:(\w+):[1-9]$/.test(action || '')) {
        const [,game,count] = action.split(':');
        if (!games[game]) return;
        content = 'Лимит для '+games[game]+':';
        rows = [[button('Любой лимит','add:'+game+':any:'+count)],[button('Точный лимит','limit:'+game+':exact:'+count)],[button('От указанного лимита','limit:'+game+':from:'+count)],back];
      } else if (/^limit:(\w+):(exact|from)(?::[1-9])?$/.test(action || '')) {
        const [,game,mode,count] = action.split(':');
        if (!games[game]) return;
        await setPending({kind:'game',game,mode,minPlayers:Number(count)||1});
        content = 'Напишите лимит, например 5/10 или 25/50. Для «от» сравниваем размер большого блайнда.';
        rows = [back];
      } else if (/^add:(\w+):any(?::[1-9])?$/.test(action || '')) {
        const game = action.split(':')[1];
        if (!games[game]) return;
        content = await save(user,{kind:'game',game,mode:'any',minPlayers:Number(action.split(':')[3])||1});
        rows = [back];
      } else if (action === 'player') {
        await setPending({kind:'player'});
        content = 'Напишите ID или ник игрока. Ники ищем в последних отчётах; подписка привязывается к ID.';
        rows = [back];
      } else if (/^player:\d+$/.test(action || '')) {
        const id = action.slice(7), names = await getNames();
        const options=Object.keys(limitCategories);
        await setPending({kind:'player',step:'filters',playerId:id,nick:names.get(id)||'Игрок',selectedGames:[],selectedLimits:[],limitOptions:options});
        content = 'Выберите виды игры. «Все» — без ограничения. Можно отметить несколько вариантов.';
        rows = [[button('✅ Все','pg:all')],...Object.entries(games).map(([id,label])=>[button('☐ '+label,'pg:'+id)]),[button('Далее: лимиты','pg:next')],back];
      } else if (/^(pg|pl|gg|gl):/.test(action || '')) {
        const sub=decode(await read('pending:'+user));
        if (!['player','game'].includes(sub?.kind) || sub.step !== 'filters' || (action.startsWith('p') ? sub.kind !== 'player' : sub.kind !== 'game')) { content='Выбор устарел. Выберите игрока заново.';rows=[back]; }
        else {
          const [kind,value]=action.split(':');
          if((kind==='pl' || kind==='gl') && value==='save') {
            const {step,limitOptions,...settings}=sub;
            if(sub.kind==='game') await chooseCount(settings);
            else { content=await save(user,settings);rows=[back]; }
          } else {
            const field=(kind==='pg' || kind==='gg') ? 'selectedGames' : 'selectedLimits';
            const choice=(kind==='pg' || kind==='gg') ? (games[value] ? value : null) : sub.limitOptions[Number(value)];
            if(value==='all') sub[field]=[];
            else if(choice) sub[field]=sub[field].includes(choice) ? sub[field].filter(x=>x!==choice) : [...sub[field],choice];
            await setPending(sub);
            const showLimits=kind==='pl' || kind==='gl' || value==='next';
            const selected=showLimits ? sub.selectedLimits : sub.selectedGames;
            const options=showLimits ? sub.limitOptions.map((label,i)=>[String(i),limitLabel(label),label]) : Object.entries(games).map(([id,label])=>[id,label,id]);
            const gamePrefix=sub.kind==='game' ? 'gg:' : 'pg:',limitPrefix=sub.kind==='game' ? 'gl:' : 'pl:';
            const prefix=showLimits ? limitPrefix : gamePrefix;
            content=showLimits ? 'Выберите лимиты. «Все» — любой лимит. Можно отметить несколько вариантов.' : 'Выберите виды игры. «Все» — без ограничения. Можно отметить несколько вариантов.';
            rows=[[button((selected.length ? '☐' : '✅')+' Все',prefix+'all')],...options.map(([id,label,choice])=>[button((selected.includes(choice) ? '✅' : '☐')+' '+label,prefix+id)]),[button(showLimits ? (sub.kind==='game' ? 'Далее: число игроков' : '✅ Сохранить подписку') : 'Далее: лимиты',showLimits ? limitPrefix+'save' : gamePrefix+'next')],...(showLimits ? [[button('⬅️ Виды игры',gamePrefix+'back')]] : []),back];
          }
        }
      } else if (action === 'list' || /^delete:[a-f0-9]{8}$/.test(action || '')) {
        if (action.startsWith('delete:')) await write(user,(await list(user)).filter(s=>s.id!==action.slice(7)));
        const subs = await list(user);
        content = subs.length ? 'Мои подписки:\n'+subs.map((s,i)=>(i+1)+'. '+describe(s)).join('\n') : 'Подписок пока нет.';
        rows = subs.map((s,i)=>[button('❌ Удалить '+(i+1),'delete:'+s.id)]).concat([[button('➕ Добавить','menu')],back]);
      } else if (pending?.kind === 'game') {
        const limit = parseLimit(text);
        if (pending.step === 'count') {
          await chooseCount(pending);
        } else if (limit && pending.step === 'limit') {
          await chooseCount({...pending,limit});
        } else {
          content = limit ? await save(user,{...pending,limit}) : 'Не распознал лимит. Напишите два числа через /, например 5/10.';
          rows = [back];
        }
      } else if (pending?.kind === 'player') {
        const names = await getNames();
        const found = /^\d+$/.test(text) && !/^0+$/.test(text) ? [[text,names.get(text)||'Игрок']] : [...names].filter(([,nick])=>nick.toLocaleLowerCase('ru').includes(text.toLocaleLowerCase('ru'))).slice(0,8);
        content = found.length ? 'Выберите игрока для подписки:' : 'Игрок не найден. Попробуйте другой ник или введите ID.';
        rows = found.map(([id,nick])=>[button((nick+' · '+id).slice(0,60),'player:'+id)]).concat([back]);
      } else return;
      const result = await send(cb ? 'editMessageText' : 'sendMessage',{chat_id:user,...(cb ? {message_id:message.message_id} : {}),text:content,reply_markup:{inline_keyboard:rows}});
      if (!result.ok) throw new Error('Subscription menu delivery failed');
    });
    return true;
  }
  async function poll(sharedTables, interests) {
    return exclusive('poll',async()=>{
      const deadline = Date.now() + pollBudgetMs;
      const cursor = String(await read('cursor') || '0');
      const queued = decode(await read('queue')) || [];
      const scan = interests ? ['0',[...new Set([...queued,...await interestedUsers(interests)])]]
        : queued.length ? [cursor,queued] : (await run([['SSCAN',key+'users',cursor,'COUNT','100']]))[0]?.result;
      if (!scan || !Array.isArray(scan[1])) throw new Error('Subscription index unavailable');
      if (!scan[1].length) { await run([['SET',key+'cursor',String(scan[0])]]); return {sent:0,complete:String(scan[0]) === '0'}; }
      const tables = sharedTables || await getTables();
      let sent = 0, processed = 0;
      for (const user of scan[1]) {
        if (Date.now() > deadline || sent >= 30) break;
        let userComplete = true;
        const acquired = await exclusive('user:'+user,async()=>{
          const subs = await list(user);
          let changed = false;
          for (const sub of subs) {
            if (beforeDelivery && !await beforeDelivery(user,sub)) continue;
            const current = matches(sub,tables), seen = new Set(sub.seen || []);
            const currentKeys = new Set(current.map(tableKey));
            const acknowledged = new Set([...seen].filter(id=>currentKeys.has(id)));
            const departed = [...seen].filter(id=>!currentKeys.has(id));
            if (departed.length) await run(departed.map(id=>['DEL',key+'delivery:'+user+':'+sub.id+':'+id]));
            let complete = true;
            for (const table of current.filter(t=>!seen.has(tableKey(t)))) {
              if (Date.now() > deadline || sent >= 30) { complete = false; break; }
              const delivery = key+'delivery:'+user+':'+sub.id+':'+tableKey(table);
              if ((await run([['SET',delivery,'pending','NX','EX','86400']]))[0]?.result !== 'OK') { acknowledged.add(tableKey(table)); continue; }
              try {
                const title = sub.kind === 'player' ? '👤 '+(sub.nick||'Игрок')+' ('+sub.playerId+') сел за стол' : '♠️ Появился активный стол';
                const response = await send('sendMessage',{chat_id:user,...(sub.friendAccountId ? {friendAccountId:sub.friendAccountId} : {}),text:'<b>'+escape(title)+'</b>\n<b>'+escape(table.deskName)+(table.blindAnnotation ? ' '+escape(table.blindAnnotation)+'р' : '')+'</b>\n'+escape(table.playType)+' · Игроков: '+escape(table.playerCount),parse_mode:'HTML',reply_markup:{inline_keyboard:[[button('Мои подписки','list')]]}});
                if (!response.ok) {
                  if (response.error_code === 403) { await write(user,[]); return; }
                  throw new Error('Telegram delivery failed');
                }
                sent++;
                acknowledged.add(tableKey(table));
                if (push) {
                  try { await push.notify(user,{title,body:table.deskName+(table.blindAnnotation ? ' '+table.blindAnnotation+'р' : '')+' · '+table.playType+' · Игроков: '+table.playerCount,eventId:delivery+':'+randomUUID()}); }
                  catch (error) { console.error('[table-subscriptions] App push failed',error.message); }
                }
              } catch (error) { await run([['DEL',delivery]]); throw error; }
            }
            if (seen.size !== acknowledged.size || [...seen].some(id=>!acknowledged.has(id))) {
              sub.seen = [...acknowledged];
              changed = true;
            }
            if (!complete) { userComplete = false; break; }
          }
          // Polling never changes membership: only save a changed seating snapshot.
          if (changed) await run([['SET',key+'user:'+user,JSON.stringify(subs)]]);
        });
        if (acquired === false || !userComplete) break;
        processed++;
      }
      await run([['SET',key+'cursor',String(scan[0])],['SET',key+'queue',JSON.stringify(scan[1].slice(processed))]]);
      return {sent,complete:processed === scan[1].length && String(scan[0]) === '0'};
    });
  }
  async function setFriend(user,friend,enabled) {
    return exclusive('user:'+user,async()=>{
      const subs = (await list(user)).filter(s=>s.friendAccountId!==friend.accountId);
      if (enabled) {
        if (!/^\d+$/.test(String(friend.playerId || '')) || /^0+$/.test(String(friend.playerId))) throw new Error('У друга нет привязанного ID Poker21. Попросите его привязать Poker21 в профиле.');
        const sub={id:'friend-'+friend.accountId,kind:'player',playerId:String(friend.playerId),nick:friend.nick || 'Друг',friendAccountId:friend.accountId,cashOnly:true,botEnabled:friend.botEnabled !== false,pushEnabled:friend.pushEnabled !== false};
        sub.seen=matches(sub,await getTables()).map(tableKey);
        subs.push(sub);
      }
      await write(user,subs);
      return true;
    });
  }
  return {handle,poll,expire,setFriend,list};
}
module.exports = {create,parseLimit,matches,describe,gameOf,tableKey,PREFIX};
