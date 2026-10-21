'use strict';
function isBroadcast(link){return link?.params?.created_from==='crm_broadcast'||/^CRM\s+crm_/i.test(String(link?.label||''));}
module.exports={isBroadcast};
