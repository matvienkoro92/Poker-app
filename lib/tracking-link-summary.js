"use strict";
const MEANINGFUL = new Set(["registration_completed", "poker21_linked", "raffle_joined", "daily_poker_spin", "sng_joined", "private_cash_applied", "club_choice_voted", "subscription_enabled", "push_enabled", "deposit_confirmed"]);
function summarize(rows, ref, from, excludedAccount) {
  const result = { visitors: 0, registrations: 0, returning: 0, depositors: 0, firstDepositors: 0, depositAmount: 0, engaged: 0 };
  for (const row of rows) {
    if (excludedAccount && row.accountId === excludedAccount) continue;
    const events = row.events.filter(e => e.ref === ref && Number(e.at) >= from);
    if (!events.length) continue;
    result.visitors++;
    if (row.accountId && row.status === "returning") result.returning++;
    if (row.accountId && row.status === "new" && row.context.first.ref === ref && Number(row.registrationAt) >= from) result.registrations++;
    const deposits = row.deposits.filter(d => Date.parse(d.at) >= from);
    if (deposits.length) result.depositors++;
    if (row.firstDepositAt != null && row.context.first.ref === ref && row.firstDepositAt >= Math.max(from, row.context.first.at)) result.firstDepositors++;
    result.depositAmount += deposits.reduce((sum, d) => sum + Number(d.amount), 0);
    if (events.some(e => MEANINGFUL.has(e.type)) || deposits.length) result.engaged++;
  }
  result.registrationConversion = result.visitors ? result.registrations / result.visitors * 100 : null;
  result.depositConversion = result.visitors ? result.depositors / result.visitors * 100 : null;
  return result;
}
async function readSummary(ref, from, excludedAccount) {
  const attribution = require("./tracking-attribution");
  const rows = [];
  let offset = 0;
  do {
    const page = await attribution.readJourneys(ref, offset);
    rows.push(...page.rows);
    offset = page.nextOffset;
  } while (offset != null);
  for (let i = 0; i < rows.length; i += 6) {
    await Promise.all(rows.slice(i, i + 6).map(async row => {
      row.events = [];
      let cursor = "0";
      do {
        const page = await attribution.readTimeline(ref, row.actor, cursor);
        row.events.push(...page.events);
        cursor = page.cursor;
      } while (cursor != null);
    }));
  }
  return summarize(rows, ref, from, excludedAccount);
}
module.exports = { summarize, readSummary };
