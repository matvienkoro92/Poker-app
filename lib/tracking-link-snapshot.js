"use strict";
// Summary and player matrix share the same complete, short-lived history.
async function readLinkSnapshot(ref) {
  return require('./crm-read-cache').cachedRead('link-snapshot', ref, 30, () =>
    require('./tracking-read-scope').withReadScope(() => buildSnapshot(ref)),
    rows => Array.isArray(rows) && !rows.some(row => row.stepsUnavailable));
}
async function buildSnapshot(ref) {
  const attribution = require("./tracking-attribution");
  const rows = [];
  let offset = 0;
  do {
    const page = await attribution.readJourneys(ref, offset);
    rows.push(...page.rows);
    offset = page.nextOffset;
  } while (offset != null);
  const milestones=require('./tracking-link-milestones');let group='';try{group=await milestones.playersGroup();}catch(_){}
  for (let i = 0; i < rows.length; i += 6) {
    await Promise.all(rows.slice(i, i + 6).map(async row => {
      row.events = [];
      let cursor = "0";
      do {
        const page = await attribution.readTimeline(ref, row.actor, cursor);
        row.events.push(...page.events);
        cursor = page.cursor;
      } while (cursor != null);
      try{row.steps=await milestones.enrich(ref,row,group,row.events,false,false);}catch(_){row.steps={bot:null,playersChat:null};row.stepsUnavailable=true;}
    }));
  }
  return rows;
}
module.exports = { readLinkSnapshot };
