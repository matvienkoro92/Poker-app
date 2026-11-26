'use strict';

module.exports=async function deliverCredit(state,operation){
  if(operation.action!=='confirm-reservation'||!state.poker21Credits?.some(row=>row.id===operation.reservationId))return;
  const key=process.env.POKER21_WITHDRAWALS_SYNC_KEY;
  if(!key||process.env.NODE_TEST_CONTEXT)return;
  try{
    const response=await fetch('https://poker21-app.vercel.app/api/financial-notifications?action=withdrawal-credit',{
      method:'POST',headers:{Authorization:'Bearer '+key},redirect:'error',signal:AbortSignal.timeout(8000)
    });
    if(!response.ok)throw Error(String(response.status));
  }catch(error){console.error('Poker21 credit queued',operation.reservationId,error.message);}
};
