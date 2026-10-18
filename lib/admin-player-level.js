'use strict';
const ids=new Set(['2144406710','1897001087']);
function hasMaxLevel(accountId){return ids.has(String(accountId||'').replace(/^tg_/,''));}
async function hasAccountMaxLevel(accountId){if(hasMaxLevel(accountId))return true;if(!/^ID/.test(String(accountId)))return false;return hasMaxLevel(await require('./account-id').getPreferredUserIdByDtId(accountId));}
module.exports={hasMaxLevel,hasAccountMaxLevel};
