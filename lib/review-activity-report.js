'use strict';
const { pipeline }=require('./redis');
const { REPORT_KEY, normalizeState }=require('./review-activity');

function accountReport(raw){
  const state=normalizeState(raw);
  const publicationBonus=state.bonusEarned-state.spinBonusEarned;
  const hasSeparateCounters=raw&&raw.publicationActions!=null&&raw.commentActions!=null;
  const publications=hasSeparateCounters?state.publicationActions:publicationBonus/10;
  const comments=hasSeparateCounters?state.commentActions:state.actions-publications;
  if(!Number.isSafeInteger(publications)||publications>state.actions)throw new Error('invalid_activity_report');
  return {publicationBonus,commentBonus:0,spinBonus:state.spinBonusEarned,bonusTotal:state.bonusEarned,
    publications,comments,spinsEarned:state.spinsEarned,
    extraSpinsEarned:state.extraSpinsEarned,spinsAvailable:state.spinsAvailable+state.extraSpins};
}
// Each award/spin atomically updates this compact per-account index together with
// its wallet and ledger. Never scan the whole application DB or just the UI page.
async function readReport(run=pipeline,now=Date.now){
  const started=now(),records=new Map();let cursor='0';
  async function read(commands){
    if(now()-started>10000)throw new Error('activity_report_timeout');
    const rows=await run(commands,{context:'review-activity.admin-report',throwOnError:true,timeoutMs:3000});
    if(!Array.isArray(rows)||rows.length!==commands.length||rows.some(row=>!row||row.error||!Object.hasOwn(row,'result')))throw new Error('activity_report_unavailable');
    return rows.map(row=>row.result);
  }
  for(let page=0;page<200;page++){
    const [response]=await read([['HSCAN',REPORT_KEY,cursor,'COUNT',200]]);
    if(!Array.isArray(response)||!Array.isArray(response[1]))throw new Error('activity_report_scan');
    cursor=String(response[0]);
    if(response[1].length%2)throw new Error('activity_report_scan');
    for(let i=0;i<response[1].length;i+=2)records.set(response[1][i],response[1][i+1]);
    if(cursor==='0')break;
  }
  if(cursor!=='0')throw new Error('activity_report_incomplete');
  const totals=accountReport({}),accounts=Object.create(null);
  for(const [id,raw] of records){
      const report=accountReport(JSON.parse(raw));accounts[id]=report;
      for(const field of Object.keys(totals)){
        totals[field]+=report[field];if(!Number.isSafeInteger(totals[field]))throw new Error('activity_report_overflow');
      }
  }
  return {available:true,totals,accounts,asOf:new Date(now()).toISOString()};
}
let cached=null;
async function adminReport(){
  if(cached&&Date.now()-cached.at<15000)return cached.report;
  const report=await readReport();cached={at:Date.now(),report};return report;
}
module.exports={accountReport,readReport,adminReport};
