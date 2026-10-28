'use strict';
const {authRequired, parseBody, setCors} = require('../api-auth');
const {verifyAccessToken} = require('../admin-menu-access-token');
const redis = require('../redis');
const {applyOperation, view, statisticsRange} = require('../admin-deposits');
const {recentPlayers}=require('../deposit-player-recents');
const KEY = 'poker21:admin-deposits:v1';
const CAS = "local old=redis.call('GET',KEYS[1]); if (old or '')~=ARGV[1] then return 0 end; if ARGV[3]~='' then for i=2,3 do local t=redis.call('TYPE',KEYS[i]); if type(t)=='table' then t=t.ok end; local expected=i==2 and 'hash' or 'zset'; if t~='none' and t~=expected then return redis.error_reply('notification_key_type') end end end; redis.call('SET',KEYS[1],ARGV[2]); if ARGV[3]~='' then redis.call('HSET',KEYS[2],ARGV[3],ARGV[4]); redis.call('ZADD',KEYS[3],ARGV[5],ARGV[3]); end; return 1";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || '';
module.exports = async function(req, res) {
  setCors(res, 'POST, OPTIONS', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ok:false,error:'POST only'});
  try {
    const body = parseBody(req);
    if (JSON.stringify(body).length > 15000) return res.status(413).json({ok:false,error:'Слишком много текста'});
    const auth = authRequired(req, body, BOT_TOKEN, {adminOnly:true});
    if (!auth.ok) return res.status(auth.status || 403).json({ok:false,error:'Доступ только для администраторов'});
    if (!verifyAccessToken(body.accessToken, 'deposits', auth.memberId, BOT_TOKEN)) return res.status(403).json({ok:false,code:'password_required',error:'Введите пароль раздела ещё раз'});
    const identity=auth.identity||{};
    const ownerIds=['388008256','5053253480'];
    const ownerEmails=['matvienkoro92@gmail.com','matvienko.r2@yandex.ru'];
    const canDelete=ownerIds.includes(String(auth.memberId).replace(/^tg_/,''))||ownerIds.includes(String(identity.id||''))||ownerEmails.includes(String(identity.email||'').trim().toLowerCase());
    if(body.action==='edit-channel-operation'&&!canDelete)return res.status(403).json({ok:false,error:'Редактирование доступно только главному администратору'});
    if(body.action==='delete'&&!canDelete)return res.status(403).json({ok:false,error:'Удаление доступно только главному администратору'});
    if (!redis.isConfigured()) return res.status(503).json({ok:false,error:'Хранилище временно недоступно'});
    if(body.action==='game-stats'){if(!canDelete)return res.status(403).json({ok:false,error:'Только для владельца'});return res.status(200).json(await require('../admin-game-daily-stats').read({commands:require('../board-games-service').commands,cursor:body.cursor,period:body.period||'7'}));}
    const statisticsOptions=body.statisticsPeriod||{};
    statisticsRange(statisticsOptions);
    async function responseView(state){
      const result={...view(state,Date.now(),statisticsOptions),recentPlayers:recentPlayers(state,auth.memberId),currentActor:auth.memberId,permissions:{canDelete}};
      if(body.includeReturns!==true){
        result.raffleReturnsAvailable=false;
        result.statistics.raffleReturnsAvailable=false;
        result.statistics.spinReturnsAvailable=false;
        return result;
      }
      async function sourceSnapshot(source,timeoutMs){
        let timer;
        try{return await Promise.race([source.loadSnapshot(result.statistics.period),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Истёк срок загрузки возвратов')),timeoutMs);})]);}
        finally{clearTimeout(timer);}
      }
      const fullHistory=result.statistics.period.start===null;
      const sources=await Promise.allSettled([sourceSnapshot(require('../deposit-raffle-prizes'),fullHistory?10000:3000),sourceSnapshot(require('../deposit-spin-returns'),fullHistory?10000:5000)]);
      if(sources[0].status==='fulfilled')require('../deposit-raffle-prizes').mergeReturns(result,sources[0].value);
      else{result.raffleReturnsAvailable=false;result.statistics.raffleReturnsAvailable=false;}
      if(sources[1].status==='fulfilled')require('../deposit-spin-returns').mergeReturns(result,sources[1].value);
      else result.statistics.spinReturnsAvailable=false;
      return result;
    }
    if(body.action==='spin-returns'){const source=await require('../deposit-spin-returns').loadSnapshot(statisticsRange(statisticsOptions));return res.status(200).json({ok:true,...source,period:statisticsRange(statisticsOptions)});}
    if(body.action==='spin-return'){const review=await require('../deposit-spin-returns').saveReturn(body,auth.memberId);return res.status(200).json({ok:true,review});}
    if(body.action==='raffle-prizes'){const period=statisticsRange(statisticsOptions);const prizes=await require('../deposit-raffle-prizes').loadSnapshot(period);return res.status(200).json({ok:true,...prizes,period});}

    for (let attempt = 0; attempt < 5; attempt++) {
      const rows = await redis.pipeline([['GET', KEY]], {throwOnError:true,context:'admin-deposits.read'});
      const raw = rows[0].result || '';
      const state = raw ? JSON.parse(raw) : {revision:0,entries:[],requests:[]};
      if (body.action === 'list') return res.status(200).json({ok:true,...await responseView(state)});
      // Keep credentials out of the persistent audit journal.
      const operation = {action:body.action, requestId:body.requestId, entryId:body.entryId,
        managerId:body.managerId,tipRoom:body.tipRoom,paymentSource:body.paymentSource,reservationChannel:body.reservationChannel,confirmSamePlayer:body.confirmSamePlayer,profileKey:body.profileKey,nick:body.nick,playerName:body.playerName,editVersion:body.editVersion,recipientMode:body.recipientMode,fromRoom:body.fromRoom,toRoom:body.toRoom,fromPlayerId:body.fromPlayerId,toPlayerId:body.toPlayerId,channelId:body.channelId,direction:body.direction,room:body.room,playerId:body.playerId,operationId:body.operationId,entry:body.entry, amount:body.amount, allocations:body.allocations,depositorId:body.depositorId, depositorRoom:body.depositorRoom, note:body.note, paymentId:body.paymentId, reservationId:body.reservationId,expectedReservationAmount:body.expectedReservationAmount, returnId:body.returnId, total:body.total, reason:body.reason};
      const identity = auth.identity || {};
      const actorName = [identity.firstName||identity.first_name, identity.lastName||identity.last_name].filter(Boolean).join(' ') || identity.name || (identity.email ? identity.email.split('@')[0] : 'Администратор');
      const result = applyOperation(state, operation, auth.memberId, Date.now(), actorName,{canDelete});
      if (result.duplicate) return res.status(200).json({ok:true,...await responseView(result.state)});
      const notifications=require('../deposit-player-notifications'),event=notifications.eventForOperation(result.state,operation);
      const saved = await redis.pipeline([['EVAL',CAS,3,KEY,notifications.OUTBOX,notifications.QUEUE,raw,JSON.stringify(result.state),event?event.id:'',event?JSON.stringify(event):'',Date.now()]], {throwOnError:true,context:'admin-deposits.write'});
      if (Number(saved[0].result) === 1) return res.status(200).json({ok:true,...await responseView(result.state)});
    }
    return res.status(409).json({ok:false,error:'Другой админ обновляет данные. Повторите операцию.'});
  } catch(e) {
    return res.status(e.status || (e instanceof SyntaxError ? 400 : 503)).json({ok:false,error:e.status ? e.message : e instanceof SyntaxError ? 'Некорректные данные' : 'Не удалось сохранить или загрузить данные. Повторите попытку.'});
  }
};
