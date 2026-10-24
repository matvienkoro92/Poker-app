'use strict';
const crypto = require('node:crypto');
const {GameError} = require('./billiards-room');
const terminal = w => ['paid','refunded','cancelled'].includes(w.status);
const error = (status, message) => new GameError(status, message);
const roomIdFor = (member, key, namespace='billiards') => [...crypto.createHash('sha256').update((namespace==='billiards'?'':namespace+':')+member + ':' + key).digest().subarray(0,10)].map(b=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b%32]).join('');

// A durable escrow journal survives room expiry. Every wallet transfer has a
// stable provider idempotency key and is checkpointed before calling Poker21.
module.exports = function createWagers({base,createRoom,loadRoom,store,resolve,balance,change,now=Date.now,namespace="billiards",settingsFor=null}) {
  function publicWager(w) {
    const bank=w.stake*2,payout=Math.floor(bank*.9);
    return {stake:w.stake,bank,feePercent:10,fee:bank-payout,payout,status:w.status,winner:w.winner??null};
  }
  async function save(w, lock) { await store.put(w,lock); }
  async function transfer(w, name, index, amount, lock) {
    const op = w.operations[name] || (w.operations[name] = {index,amount,done:0});
    if (op.index!==index || op.amount!==amount) throw error(503,'Операция требует проверки.');
    let calls=0;
    while (op.done < Math.abs(amount)) {
      // Chunking uses the same per-operation cap as the existing Poker21 flows.
      if (++calls > 5) throw error(503,'Операция с фишками продолжается. Обновите комнату через несколько секунд.');
      const part = Math.min(store.chunkSize||1000,Math.abs(amount)-op.done);
      const key = namespace+':'+w.id+':'+name+':'+op.done;
      op.started=true;
      await save(w,lock);
      await change({userId:w.players[index].poker21Id,chips:part*Math.sign(amount),idempotencyKey:key,reference:namespace+':'+w.id,requestedBy:namespace+':'+w.players[index].accountId});
      op.done+=part;
      await save(w,lock);
    }
  }
  async function fund(w,index,lock) {
    const op=w.operations['debit'+index];
    if (!op?.started) {
      const available=Number(await balance(w.players[index].poker21Id));
      if (!Number.isFinite(available)) throw error(503,'Не удалось проверить баланс фишек Poker21. Попробуйте снова.');
      if (available<w.stake) throw error(409,'Недостаточно фишек. Пополните фишки в Poker21.');
    }
    await transfer(w,'debit'+index,index,-w.stake,lock);
  }
  async function refund(w,lock) {
    for(let i=0;i<2;i++) {
      const op=w.operations['debit'+i];
      // Resolve an uncertain debit using its original order before refunding it.
      if(op?.started) {
        await transfer(w,'debit'+i,i,-w.stake,lock);
        await transfer(w,'refund'+i,i,w.stake,lock);
      }
    }
    w.status='refunded';w.finishedAt=now();await save(w,lock);
  }
  async function reconcile(w,lock) {
    if(terminal(w)) return;
    const r=await loadRoom(w.id);
    if(w.status==='refunding' || !r || w.expires<=now()) {
      // A persisted final match result takes precedence over room timeout.
      if(r && w.status==='playing' && [0,1].includes(r.match?.winner)) {
        w.winner=r.match.winner;w.status='paying';await save(w,lock);
      } else if(w.status!=='paying') {w.status='refunding';await save(w,lock);return refund(w,lock);}
    }
    if(w.status==='funding_host') {
      await fund(w,0,lock);w.status='waiting';await save(w,lock);
    }
    if(w.status==='funding_guest') {
      try { await fund(w,1,lock); }
      catch(e) {
        if(e.status===409 && !w.operations.debit1?.started) {
          w.players[1]=null;delete w.operations.debit1;w.status='waiting';await save(w,lock);
        }
        throw e;
      }
      // Admission occurs only after the second debit is confirmed.
      await base.call(w.players[1].member,{action:'join',roomId:w.id});
      w.status='playing';await save(w,lock);
    }
    if(w.status==='playing') {
      const room=await loadRoom(w.id);
      if([0,1].includes(room?.match?.winner)) {
        w.winner=room.match.winner;w.status='paying';await save(w,lock);
      } else if(room?.state?.winner==='draw') {
        w.status='refunding';await save(w,lock);return refund(w,lock);
      }
    }
    if(w.status==='paying') {
      await transfer(w,'prize',w.winner,Math.floor(w.stake*2*.9),lock);
      w.status='paid';w.commission=w.stake*2-Math.floor(w.stake*2*.9);w.finishedAt=now();await save(w,lock);
    }
  }
  async function locked(id,fn) {
    const lock=await store.lock(id);
    if(!lock) throw error(409,'Комната обновляется. Попробуйте через несколько секунд.');
    try{return await fn(lock);}finally{await store.unlock(id,lock);}
  }
  async function call(member,body,identity) {
    // Cancel a creation whose HTTP response was lost, using the same request id.
    // A tombstone also prevents a delayed creation from debiting after cancellation.
    if(body.action==='cancel'&&!body.roomId&&/^[a-zA-Z0-9_-]{16,80}$/.test(String(body.requestId||''))) {
      const id=roomIdFor(member,body.requestId,namespace);
      return locked(id,async lock=>{
        const w=await store.get(id);
        if(!w){await save({id,owner:member,status:'cancelled',stake:0,players:[],operations:{}},lock);return {ok:true,cancelled:true};}
        if(w.owner!==member)throw error(403,'Комната принадлежит другому игроку.');
        if(!terminal(w)) {
          if(!['waiting','funding_host','refunding'].includes(w.status))throw error(409,'Друг уже подключился. Откройте комнату перед выходом.');
          w.status='refunding';await save(w,lock);await refund(w,lock);
        }
        return {ok:true,cancelled:true,wager:publicWager(w)};
      });
    }
    if(body.action==='create' && body.stake!=null && Number(body.stake)!==0) {
      if(!Number.isSafeInteger(body.stake)||body.stake<100||body.stake>Number.MAX_SAFE_INTEGER/2)throw error(400,'Введите целое число фишек от 100.');
      if(!/^[a-zA-Z0-9_-]{16,80}$/.test(String(body.requestId||'')))throw error(400,'Обновите окно создания комнаты.');
      const id=roomIdFor(member,body.requestId,namespace);
      return locked(id,async lock=>{
        let w=await store.get(id);
        const settings=settingsFor?settingsFor(body):{discipline:body.discipline||'pyramid',color:body.color||'yellow',raceTo:body.raceTo??1,turnSeconds:body.turnSeconds??60};
        if(!w) {
          const player=await resolve(member,identity);
          w={id,owner:member,stake:body.stake,settings,players:[{member,...player},null],operations:{},status:'funding_host',expires:now()+7200000};
          // Validate and persist the room before touching the wallet.
          await createRoom(member,{...body,stake:undefined},identity,id);
          await save(w,lock);
        } else if(w.owner!==member||w.stake!==body.stake||JSON.stringify(w.settings)!==JSON.stringify(settings))throw error(409,'Параметры комнаты уже сохранены. Откройте создание новой игры.');
        if(terminal(w))throw error(409,'Комната завершена. Создайте новую игру.');
        await reconcile(w,lock);
        if(terminal(w))throw error(409,'Комната отменена, фишки возвращены.');
        return {...await base.call(member,{action:'room',roomId:id},identity),wager:publicWager(w)};
      });
    }
    const id=String(body.roomId||'');
    const existing=await store.get(id);
    if(!existing) return base.call(member,body,identity);
    // Live table reads use the room's revision CAS, not the wallet lock.
    // Only funding, admission and settlement need exclusive wallet access.
    if(['room','watch'].includes(body.action)&&existing.status==='playing'&&existing.expires>now()) {
      if(body.action==='room'&&!existing.players.some(p=>p?.member===member))throw error(403,'Вы не участвуете в этой партии.');
      const result=await base.call(member,body,identity);
      if(![0,1].includes(result.match?.winner)&&result.state?.winner!=='draw')return {...result,wager:publicWager(existing)};
    }
    return locked(id,async lock=>{
      const w=await store.get(id);
      const participant=w.players.findIndex(p=>p?.member===member);
      if(!['join','preview','watch'].includes(body.action)&&participant<0)throw error(403,'Вы не участвуете в этой партии.');
      if(body.action==='cancel') {
        if(member!==w.owner)throw error(403,'Отменить ожидание может создатель комнаты.');
        if(!['waiting','funding_host','refunding'].includes(w.status)&&!(w.status==='funding_guest'&&!w.operations.debit1?.started)&&!terminal(w))throw error(409,'Друг уже подключился. Для завершения партии используйте сдачу или ничью.');
        if(!terminal(w)){w.status='refunding';await save(w,lock);await refund(w,lock);}
        return {ok:true,roomId:id,cancelled:true,wager:publicWager(w)};
      }
      await reconcile(w,lock);
      if(['refunded','cancelled'].includes(w.status))return {ok:true,roomId:id,cancelled:true,wager:publicWager(w)};
      if(body.action==='join'&&participant<0) {
        if(w.status!=='waiting')throw error(409,'Комната уже занята или ещё создаётся.');
        const player=await resolve(member,identity);
        if(w.players[0].accountId===player.accountId||w.players[0].poker21Id===player.poker21Id)throw error(409,'Нельзя играть на фишки против своего аккаунта.');
        // Reject insufficient balance before reserving the opponent's seat.
        const available=Number(await balance(player.poker21Id));
        if(!Number.isFinite(available))throw error(503,'Не удалось проверить баланс фишек Poker21. Попробуйте снова.');
        if(available<w.stake)throw error(409,'Недостаточно фишек. Пополните фишки в Poker21.');
        w.players[1]={member,...player};w.status='funding_guest';await save(w,lock);
        await reconcile(w,lock);
      }
      if(body.action==='rematch'&&w.status!=='playing')throw error(409,'Матч завершён. Создайте новую игру, чтобы выбрать новую ставку.');
      if(['move','rematch'].includes(body.action)&&w.status!=='playing')throw error(409,'Дождитесь подключения и ставки друга.');
      const result=await base.call(member,body,identity);
      await reconcile(w,lock);
      return {...result,wager:publicWager(w)};
    });
  }
  async function sweep(){
    const ids=await store.due(now(),30);
    for(const id of ids)try{await locked(id,async lock=>{const w=await store.get(id);if(w)await reconcile(w,lock);});}catch(e){console.error('['+namespace+'-wager]',id,e.message);}
    return {processed:ids.length};
  }
  return {call,sweep};
};
