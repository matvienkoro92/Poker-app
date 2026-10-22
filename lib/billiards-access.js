'use strict';
const {isAdminIdentity}=require('./api-auth');
function hasBilliardsAccess(identity,memberId){
  if(isAdminIdentity(identity,memberId))return true;
  if(!identity||identity.vkId!=null)return false;
  const username=String(identity.telegramUsername||identity.pwaUsername||'').replace(/^@+/,'').trim().toLowerCase();
  return ['polyapineapple','sergey_fcsm'].includes(username);
}
module.exports={hasBilliardsAccess};
