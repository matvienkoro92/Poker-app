"use strict";

// Persistent acquisition attribution. Account IDs are supplied only by verified server auth.
const { pipeline, sscanall, memo } = require("./tracking-read-scope");
const { atomicWrite } = require("./redis-atomic");
const { safeId } = require("./analytics-tracking");
const P = "poker_app:attribution:v1:";
const META = "poker_app:track_links:meta";
const json = raw => { try { return JSON.parse(raw || "null"); } catch (_) { return null; } };
const timestamp = value => { if(value==null||value==='')return NaN;const n=Number(value);return Number.isFinite(n)&&n>0?n:Date.parse(value); };
const slugOf = raw => /^[a-f0-9]{8}$/.test(String(raw || "").replace(/^ref_/, "")) ? String(raw).replace(/^ref_/, "") : "";
async function read(commands, options = {}) {
  const allowLargeRedisRead = options.allowLargeRedisRead === true;
  const rows = await pipeline(commands, { context: "tracking.attribution", throwOnError: true, allowLargeRedisRead });
  if (!rows || rows.length !== commands.length || rows.some(r => !r || r.error)) throw new Error("attribution_unavailable");
  return rows.map(r => r.result);
}
function mergeContext(a, b) {
  if (!a) return b;
  if (!b) return a;
  return {
    first: a.first.at <= b.first.at ? a.first : b.first,
    last: a.last.at >= b.last.at ? a.last : b.last,
  };
}
async function recordAttribution(event) {
  const installation = safeId(event.installationId), account = safeId(event.accountId);
  if (!/^(?:ins_|w_)/.test(installation) || !safeId(event.eventId) || !safeId(event.sessionId)) return;
  const ref = slugOf(event.ref);
  const at = Date.now();
  for (let attempt = 0; attempt < 4; attempt++) {
    const [guestRaw, accountRaw, owner, linkRaw, touchRaw] = await read([
      ["HGET", P + "contexts", installation], ["HGET", P + "contexts", account || "_"],
      ["HGET", P + "owners", installation], ["HGET", META, ref || "_"],
      ["HGET", P + "touches", event.sessionId + ":" + ref],
    ]);
    if (!account && owner) return; // A logged-out shared device is not proof of the previous account.
    // Never transfer a previous signed-in person's attribution to another account.
    let sameOwner=!owner||owner===account;
    if(owner&&account&&!sameOwner){const [mapped]=await read([['HGET','poker_app:visitor_dt_ids',owner]]);sameOwner=mapped===account||await require('./account-canonical').canonicalAccountId(owner)===account;}
    const guest = sameOwner ? json(guestRaw) : null;
    let context = mergeContext(guest, json(accountRaw));
    if(sameOwner&&owner&&account&&owner!==account){const [ownerContext]=await read([["HGET",P+"contexts",owner]]);context=mergeContext(context,json(ownerContext));}
    context=await require('./tracking-own-source').ownContext(context,[installation,account,owner]);
    const broadcast=linkRaw&&require('./tracking-link-kind').isBroadcast(json(linkRaw));
    if(broadcast&&event.type==='referral_opened')return;
    const touch = ref && linkRaw && !broadcast ? (json(touchRaw) || { ref, at, label: String((json(linkRaw) || {}).label || "") }) : null;
    if (touch) context = mergeContext(context, { first: touch, last: touch });
    if (!context) return;
    const actor = account || installation;
    const commands = [
      ["HSET", P + "contexts", actor, JSON.stringify(context)],
      ["SADD", P + "members:" + context.first.ref, actor],
      ["SADD", P + "members:" + context.last.ref, actor],
      ["HSETNX", P + "events:" + actor, event.eventId, JSON.stringify({
        id: event.eventId, at, type: event.type, authenticated: !!account, section: String(event.section || "").slice(0, 64),
        entity: String(event.entityId || "").slice(0, 64), ref: context.last.ref,
      })],
    ];
    const guards = [
      { key: P + "contexts", field: installation, value: guestRaw || "" },
      { key: P + "contexts", field: account || "_", value: accountRaw || "" },
      { key: P + "owners", field: installation, value: owner || "" },
    ];
    if (touch) {
      commands.push(["HSETNX", P + "touches", event.sessionId + ":" + ref, JSON.stringify(touch)]);
      guards.push({ key: P + "touches", field: event.sessionId + ":" + ref, value: touchRaw || "" });
    }
    if (account) commands.push(["HSET",P + "accounts",account,"1"]);
    if (account && sameOwner) commands.push(
      ["HSET", P + "owners", installation, account],
      ["SADD", P + "installations:" + account, installation]
    );
    try { await atomicWrite(commands, { values: guards, context: "tracking.attribution.write" }); return; }
    catch (error) { if (attempt === 3) throw error; }
  }
}

function depositRows(raw, since) {
  const seen = new Set();
  return (raw || []).map(json).filter(e => {
    if (!e || e.type !== "deposit" || !(Number(e.amount) > 0) || !Number.isFinite(Number(e.amount)) || !(Date.parse(e.at) >= since)) return false;
    const key = e.id || JSON.stringify(e);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
function actorGroups(ref) { return memo("groups:" + ref, () => buildActorGroups(ref)); }
async function buildActorGroups(ref) {
 const members=await sscanall(P+'members:'+ref,{count:500,maxPages:100,context:'tracking.members'});if(!members)throw Error('attribution_unavailable');const records=[];
 for(let i=0;i<members.length;i+=200){const ids=members.slice(i,i+200),[owners]=await read([['HMGET',P+'owners',...ids]]),candidates=ids.map((id,n)=>owners[n]||id),[mapped]=await read([['HMGET','poker_app:visitor_dt_ids',...candidates]]);
  for(let n=0;n<ids.length;n++){let actor=candidates[n],canonical=mapped[n];if(canonical&&canonical!==actor){const installations=await sscanall(P+'installations:'+actor,{count:100,maxPages:100});if(!installations)throw Error('attribution_unavailable');if(owners[n]||installations.length)actor=canonical;}records.push({member:ids[n],candidate:candidates[n],actor,seen:new Set()});}
 }
 for(let depth=0;depth<8;depth++){const ids=[...new Set(records.map(r=>r.actor).filter(id=>/^ID\d{6}$/.test(id)))];if(!ids.length)break;const redirects=new Map();for(let i=0;i<ids.length;i+=200){const batch=ids.slice(i,i+200),[values]=await read([['HMGET','poker_app:account_redirects',...batch]]);batch.forEach((id,n)=>{if(values[n])redirects.set(id,values[n]);});}if(!redirects.size)break;for(const record of records){const next=redirects.get(record.actor);if(!next)continue;if(!/^ID\d{6}$/.test(next)||record.seen.has(next)||depth===7)throw Error('invalid_account_redirect');record.seen.add(record.actor);record.actor=next;}}
 const groups=new Map();for(const record of records){if(!groups.has(record.actor))groups.set(record.actor,new Set([record.actor]));groups.get(record.actor).add(record.member);groups.get(record.actor).add(record.candidate);}return groups;
}
function actorSubjects(actor, linked = []) { return memo("subjects:" + JSON.stringify([actor, linked]), () => buildActorSubjects(actor, linked)); }
async function buildActorSubjects(actor,linked=[]) {
 const subjects=new Set([actor,...linked]),accounts=[...subjects].filter(id=>!id.startsWith('ins_')&&!id.startsWith('w_'));
 const lists=await Promise.all(accounts.map(id=>sscanall(P+'installations:'+id,{count:100,maxPages:100})));for(const installations of lists){if(!installations)throw Error('attribution_unavailable');installations.forEach(value=>subjects.add(value));}return [...subjects].sort();
}
async function readJourneys(ref, offset = 0) {
 const groups=await actorGroups(ref),actors=[...groups.keys()].sort(),selected=actors.slice(offset,offset+50),rows=[];
 async function loadActor(actor){
  const subjects=await actorSubjects(actor,[...groups.get(actor)]),values=await read(subjects.flatMap(id=>[['HGET',P+'contexts',id],['HGET','poker_app:pokerplus_user_ids',id],['HGET','poker_app:email_linked_at',id],['HGET','poker_app:telegram_login_at',id],['HGET',P+'accounts',id]]));
  let context=null;const dates=[],bindings=new Set();let verified=false;
  subjects.forEach((id,n)=>{context=mergeContext(context,json(values[n*5]));if(values[n*5+1])bindings.add(String(values[n*5+1]));dates.push(values[n*5+2],values[n*5+3]);if(values[n*5+4])verified=true;});
  context=await require('./tracking-own-source').ownContext(context,subjects);
  if(!context)return;
  const installations=await sscanall(P+'installations:'+actor,{count:100,maxPages:100});if(!installations)throw Error('attribution_unavailable');verified ||=installations.length>0;
  if(!verified){for(const subject of subjects){let cursor='0';do{const [scan]=await read([['HSCAN',P+'events:'+subject,cursor,'COUNT','500']]);const entries=scan[1]||[];for(let i=1;i<entries.length;i+=2)if(json(entries[i])?.authenticated===true)verified=true;cursor=String(scan[0]);}while(cursor!=='0'&&!verified);if(verified)break;}}
  const account=verified?actor:'',registrationTimes=dates.map(timestamp).filter(Number.isFinite),registrationAt=registrationTimes.length?Math.min(...registrationTimes):null;
  const actorIndex=subjects.indexOf(actor),pokerId=values[actorIndex*5+1]||(bindings.size===1?[...bindings][0]:'');
  const [legacyId]=await read([['HGET','poker_app:id_to_user',actor]]);if(legacyId&&!subjects.includes(legacyId)){const legacyDates=await read([['HGET','poker_app:email_linked_at',legacyId],['HGET','poker_app:telegram_login_at',legacyId]]);registrationTimes.push(...legacyDates.map(timestamp).filter(Number.isFinite));}
  const finalRegistration=registrationTimes.length?Math.min(...registrationTimes):registrationAt;
  const [knownRaw]=await read([['HGET',require('./tracking-registration-status').ACCOUNT_KNOWN_AT,actor]]);
  const knownAt=timestamp(knownRaw),status=require('./tracking-registration-status').registrationStatus(account,finalRegistration,knownAt,context.first.at);
  const crmIds=account?[...new Set([actor,...subjects.filter(id=>!id.startsWith('ins_')&&!id.startsWith('w_')),legacyId].filter(Boolean))]:[],crm=crmIds.length?await read(crmIds.map(id=>['LRANGE','poker_app:crm_activity_events:'+id,'0','-1']),{allowLargeRedisRead:true}):[];
  const allDeposits=depositRows(crm.flat(),0),deposits=context.first.ref===ref?allDeposits.filter(e=>timestamp(e.at)>=context.first.at):[];
  const paymentLedger=account?await require('./tracking-deposits').readDeposits(pokerId,0):{available:false,deposits:[]},paymentDeposits=context.first.ref===ref?paymentLedger.deposits.filter(d=>timestamp(d.at)>=context.first.at):[];
  rows.push({actor,accountId:account,pokerId:pokerId||'',context,registrationAt:finalRegistration,status,deposits:deposits.map(e=>({id:e.id,at:e.at,amount:Number(e.amount)})),depositAmount:deposits.reduce((sum,e)=>sum+Number(e.amount),0),depositCount:deposits.length,depositHistoryLimited:crm.some(list=>list.length>=200),firstDepositAt:allDeposits.length?Math.min(...allDeposits.map(e=>timestamp(e.at))):null,paymentDeposits,paymentDepositsAvailable:paymentLedger.available,paymentDepositReason:paymentLedger.reason||'',paymentFirstDepositAt:paymentLedger.deposits.length?Math.min(...paymentLedger.deposits.map(e=>timestamp(e.at))):null});
 }
 for(let i=0;i<selected.length;i+=6)await Promise.all(selected.slice(i,i+6).map(loadActor));rows.sort((a,b)=>a.actor.localeCompare(b.actor));return {rows,total:actors.length,nextOffset:offset+50<actors.length?offset+50:null};
}
async function readTimeline(ref, actor, cursor = "0") {
  if (!safeId(actor)) throw new Error("invalid_actor");
  const groups=await actorGroups(ref);
  if(!groups.has(actor))throw new Error('invalid_actor');
  const subjects=await actorSubjects(actor,[...groups.get(actor)]);
  const [part, scan] = String(cursor).split(":");
  const index = Math.max(0, Number(part) || 0);
  if (index >= subjects.length) return { events: [], cursor: null };
  const [result] = await read([["HSCAN", P + "events:" + subjects[index], scan || "0", "COUNT", "500"]]);
  const entries = result[1] || [];
  const events = [];
  for (let i = 1; i < entries.length; i += 2) { const e = json(entries[i]); if (e) events.push(e); }
  if (index === 0 && (!scan || scan === "0")) {
    const values=await read(subjects.flatMap(id=>[['HGET',P+'contexts',id],['HGET','poker_app:email_linked_at',id],['HGET','poker_app:telegram_login_at',id],['HGET','poker_app:pokerplus_bound_at',id],['HGET','poker_app:pokerplus_user_ids',id]]));
    let context=null;const registrations=[],bindings=new Set(),boundDates=[];
    subjects.forEach((id,n)=>{context=mergeContext(context,json(values[n*5]));registrations.push(values[n*5+1],values[n*5+2]);boundDates.push(values[n*5+3]);if(values[n*5+4])bindings.add(String(values[n*5+4]));});
    const [legacyId]=await read([['HGET','poker_app:id_to_user',actor]]);
    if(legacyId&&!subjects.includes(legacyId)){const dates=await read([['HGET','poker_app:email_linked_at',legacyId],['HGET','poker_app:telegram_login_at',legacyId]]);registrations.push(...dates);}
    context=await require('./tracking-own-source').ownContext(context,subjects);
    const since=context?context.first.at:Infinity,registrationDates=registrations.map(timestamp).filter(Number.isFinite),pokerDates=boundDates.map(timestamp).filter(Number.isFinite);
    const [knownRaw]=await read([['HGET',require('./tracking-registration-status').ACCOUNT_KNOWN_AT,actor]]);
    const knownAt=timestamp(knownRaw);
    const milestones=[['registration_completed',knownAt<since?NaN:registrationDates.length?Math.min(...registrationDates):NaN],['poker21_linked',pokerDates.length?Math.max(...pokerDates):NaN]];
    milestones.forEach(([type,at])=>{if(at>=since)events.push({id:'verified_'+actor+'_'+type,at,type,verified:true,ref:context.first.ref});});
    const actorIndex=subjects.indexOf(actor),pokerId=values[actorIndex*5+4]||(bindings.size===1?[...bindings][0]:'');
    const ledger=await require('./tracking-deposits').readDeposits(pokerId,since);
    (context?.first.ref===ref?ledger.deposits:[]).forEach(e=>events.push({id:'payment_'+e.id,at:timestamp(e.at),type:'deposit_confirmed',amount:Number(e.amount),verified:true,ref:context.first.ref}));
  }
  const next = String(result[0]) !== "0" ? index + ":" + result[0] : index + 1 < subjects.length ? (index + 1) + ":0" : null;
  return { events: events.sort((a, b) => a.at - b.at), cursor: next };
}
module.exports = { recordAttribution, readJourneys, readTimeline, mergeContext, depositRows, slugOf, timestamp, actorGroups };
