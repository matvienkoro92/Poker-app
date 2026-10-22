"use strict";
const MEANINGFUL = new Set(["registration_completed", "poker21_linked", "raffle_joined", "daily_poker_spin", "sng_joined", "private_cash_applied", "club_choice_voted", "subscription_enabled", "push_enabled", "deposit_confirmed"]);
function summarize(rows, ref, from, excludedAccount) {
  const result = { visitors: 0, registrations: 0, returning: 0, depositors: 0, firstDepositors: 0, depositAmount: 0, engaged: 0, visits:0, activityCount:0, activeVisitors:0, raffleCount:0, raffleParticipants:0, spinCount:0, spinners:0, poker21Linked:0, botSubscribers:0, playersChatSubscribers:0, botUnknown:0, playersChatUnknown:0, spinUnknown:0, raffleUnknown:0, depositCount:0, registrationUnknown:0, depositUnknown:0 };
  for (const row of rows) {
    if (excludedAccount && row.accountId === excludedAccount) continue;
    const events = row.events.filter(e => (e.ref === ref || (e.ref==null && row.context.first.ref===ref)) && Number(e.at) >= from);
    if (!events.length) continue;
    result.visitors++;
    const flags=require('./tracking-link-milestones').eventFlags(events,row,ref);
    result.visits+=flags.visitCount||0;result.activityCount+=flags.activityCount;if(flags.activeVisitor)result.activeVisitors++;
    if(flags.spinCount==null)result.spinUnknown++;else{result.spinCount+=flags.spinCount;if(flags.spinCount>0)result.spinners++;}
    if(flags.raffleCount==null)result.raffleUnknown++;else{result.raffleCount+=flags.raffleCount;if(flags.raffleCount>0)result.raffleParticipants++;}
    if(row.pokerId)result.poker21Linked++;
    for(const [key,field,unknown]of [['bot','botSubscribers','botUnknown'],['playersChat','playersChatSubscribers','playersChatUnknown']]){if(row.steps?.[key]===true)result[field]++;else if(row.steps?.[key]!==false)result[unknown]++;}
    if(row.accountId&&row.status==="unknown")result.registrationUnknown++;
    if (row.accountId && row.status === "returning") result.returning++;
    if (row.accountId && row.status === "new" && row.context.first.ref === ref && Number(row.registrationAt) >= from) result.registrations++;
    if(row.depositHistoryLimited&&!row.paymentDeposits)result.depositHistoryLimited=true;
    if(row.paymentDepositsAvailable===false)result.depositUnknown++;
    const deposits = (row.paymentDeposits || row.deposits).filter(d => Date.parse(d.at) >= from);
    if (deposits.length) result.depositors++;
    result.depositCount+=deposits.length;
    const firstDepositAt=row.paymentDeposits?row.paymentFirstDepositAt:row.firstDepositAt;
    if (firstDepositAt != null && row.context.first.ref === ref && firstDepositAt >= Math.max(from, row.context.first.at)) result.firstDepositors++;
    result.depositAmount += deposits.reduce((sum, d) => sum + Number(d.amount), 0);
    if (events.some(e => MEANINGFUL.has(e.type)) || deposits.length) result.engaged++;
  }
  if(result.visitors>0&&result.depositUnknown===result.visitors){result.depositAmount=null;result.depositCount=null;result.depositors=null;result.firstDepositors=null;}
  result.registrationConversion = result.visitors ? result.registrations / result.visitors * 100 : null;
  result.depositConversion = result.visitors && result.depositors!=null ? result.depositors / result.visitors * 100 : null;
  return result;
}
async function readSummary(ref, from, excludedAccount) {
  return require("./tracking-read-scope").withReadScope(() => buildSummary(ref, from, excludedAccount));
}
async function buildSummary(ref, from, excludedAccount) {
  if(excludedAccount)excludedAccount=await require("./account-canonical").canonicalAccountId(await require("./analytics-tracking").resolveAnalyticsAccount(excludedAccount));
  const rows = await require('./tracking-link-snapshot').readLinkSnapshot(ref);
  const summary=summarize(rows, ref, from, excludedAccount);
  if(rows.some(row => row.stepsUnavailable)) summary.stepsUnavailable=true;
  try{summary.coverage=await require("./tracking-link-coverage").readCoverage(ref,rows);}catch(_){summary.coverageUnavailable=true;}
  if(!rows.length&&summary.coverage?.trackedVisitors>0){for(const key of Object.keys(summary))if(!["visitors","coverage","coverageUnavailable"].includes(key))summary[key]=null;}
  return summary;
}
module.exports = { summarize, readSummary };
