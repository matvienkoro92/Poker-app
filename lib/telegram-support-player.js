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
    result.accountId=account;
    const data=await redis.pipeline([['HGET','poker_app:pokerplus_user_ids',account],['HGET','poker_app:pokerplus_profiles',account],['HGET','poker_app:visitor_chat_display_names',account]],{throwOnError:true,context:'support.player-identity'});
    const id=String(data[0]?.result||'').trim();
    if(clean(data[2]?.result))result.name=clean(data[2].result);
    if(/^[1-9]\d{0,15}$/.test(id)){
    result.poker21Id=id;
    let profile;try{profile=JSON.parse(data[1]?.result||'null');}catch{}
    // The binding is authoritative; a stale profile for a different Poker21 ID
    // must never supply another player's name or identifier.
    const profileMatches=profile&&String(profile.pokerPlusUserId||'')===id;
    result.name=clean(knownPlayerNick('P21',id))||(profileMatches?clean(profile.nickname||profile.Nike||profile.nick):'')||result.name;
    }
    try{
      const [row]=await redis.pipeline([['EVAL',"local raw=redis.call('GET',KEYS[1]); if not raw then return '{}' end; local s=cjson.decode(raw); return cjson.encode({playerAccounts=s.playerAccounts or {},playerIdentityLinks=s.playerIdentityLinks or {}})",1,'poker21:admin-deposits:v1']],{throwOnError:true,context:'support.player-xpoker'});
      const saved=JSON.parse(row?.result||'{}');
      const playerAccounts=Array.isArray(saved)?saved:saved.playerAccounts;
      const direct=Array.isArray(saved.playerIdentityLinks)?saved.playerIdentityLinks:[];
      const directory=depositPlayerDirectory({playerAccounts:Array.isArray(playerAccounts)?playerAccounts:[]});
      const base=directory.find(p=>p.room==='P21'&&p.playerId===id);
      const matches=result.poker21Id&&base?directory.filter(p=>p.room==='X'&&p.profileKey===base.profileKey):[];
      const explicit=direct.filter(p=>p.room==='X'&&p.accountId===account).map(p=>p.playerId);
      const legacy=matches.filter(p=>!direct.some(d=>d.room==='X'&&d.playerId===p.playerId&&d.accountId!==account)).map(p=>p.playerId);
      result.xpokerIds=[...new Set([...explicit,...legacy])];
    }catch{result.xpokerUnavailable=true;}
    return result;
  }catch{return {...result,unavailable:true};}
}
function identityText(user,player){
  const name=clean([user.first_name,user.last_name].filter(Boolean).join(' '))||'Игрок';
  const handle=user.username?'@'+clean(user.username):'';
  const details=[clean(player.name)&&clean(player.name)!==name?clean(player.name):player.poker21Id?clean(player.name):'',player.poker21Id?'P21:'+player.poker21Id:'',player.xpokerIds?.length?'X:'+player.xpokerIds.join(', '):''].filter(Boolean).join(' ');
  return '👤 '+name+(details?'\n🎮 '+details:'')+(user.username?'\n✈️ '+handle:'');
}
module.exports={readPlayerIdentity,identityText};
