'use strict';
const redis=require('./redis');
const {canonicalAccountId}=require('./account-canonical');
const {knownPlayerNick,depositPlayerDirectory}=require('./deposit-player-directory');
const clean=value=>String(value||'').replace(/[\r\n]+/g,' ').trim().slice(0,90);
async function readPlayerIdentity(user){
  const fallback=clean([user.first_name,user.last_name].filter(Boolean).join(' '))||clean(user.username)||'Игрок';
  const result={name:fallback,poker21Id:null};
  try{
    const rows=await redis.pipeline([['HGET','poker_app:visitor_dt_ids','tg_'+user.id],['HGET','poker_app:visitor_chat_display_names','tg_'+user.id]],{throwOnError:true,context:'support.player-binding'});
    if(clean(rows[1]?.result))result.name=clean(rows[1].result);
    const account=await canonicalAccountId(rows[0]?.result||'');
    if(!/^ID\d{6}$/.test(account))return result;
    const data=await redis.pipeline([['HGET','poker_app:pokerplus_user_ids',account],['HGET','poker_app:pokerplus_profiles',account],['HGET','poker_app:visitor_chat_display_names',account]],{throwOnError:true,context:'support.player-identity'});
    const id=String(data[0]?.result||'').trim();
    if(clean(data[2]?.result))result.name=clean(data[2].result);
    if(!/^[1-9]\d{0,15}$/.test(id))return result;
    result.poker21Id=id;
    let profile;try{profile=JSON.parse(data[1]?.result||'null');}catch{}
    // The binding is authoritative; a stale profile for a different Poker21 ID
    // must never supply another player's name or identifier.
    const profileMatches=profile&&String(profile.pokerPlusUserId||'')===id;
    result.name=clean(knownPlayerNick('P21',id))||(profileMatches?clean(profile.nickname||profile.Nike||profile.nick):'')||result.name;
    try{
      const [row]=await redis.pipeline([['EVAL',"local raw=redis.call('GET',KEYS[1]); if not raw then return '[]' end; local s=cjson.decode(raw); return cjson.encode(s.playerAccounts or {})",1,'poker21:admin-deposits:v1']],{throwOnError:true,context:'support.player-xpoker'});
      const playerAccounts=JSON.parse(row?.result||'[]');
      const directory=depositPlayerDirectory({playerAccounts:Array.isArray(playerAccounts)?playerAccounts:[]});
      const base=directory.find(p=>p.room==='P21'&&p.playerId===id);
      const matches=base?directory.filter(p=>p.room==='X'&&p.profileKey===base.profileKey):[];
      result.xpokerIds=[...new Set(matches.map(p=>p.playerId))];
    }catch{result.xpokerUnavailable=true;}
    return result;
  }catch{return {...result,unavailable:true};}
}
function identityText(user,player){
  const name=clean([user.first_name,user.last_name].filter(Boolean).join(' '))||'Игрок';
  const handle=user.username?'@'+clean(user.username):'Telegram ID: '+user.id;
  return name+' '+handle+'\n'+(clean(player.name)||'Ник не найден')+' P21:'+(player.poker21Id||(player.unavailable?'не удалось проверить':'не найден'))+' X:'+(player.xpokerIds?.length?player.xpokerIds.join(', '):(player.unavailable||player.xpokerUnavailable?'не удалось проверить':'не найден'));
}
module.exports={readPlayerIdentity,identityText};
