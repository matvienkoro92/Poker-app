'use strict';
// Both callers resolve and authenticate the player before checking room access.
function hasBilliardsAccess(identity,memberId){
  return !!identity&&!!memberId&&!/^guest_/.test(String(memberId));
}
module.exports={hasBilliardsAccess};
