const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
// Read the original operation only: never repeat a debit or cancel pending work.
export async function recoverGameCreate(request,requestId,{active=()=>true,wait=pause}={}){
 for(let attempt=0;attempt<5;attempt++){
  if(!active())throw new DOMException('Подключение отменено','AbortError');
  try{
   const view=await request({action:'recover-create',requestId});
   if(view.cancelled)throw Object.assign(Error('Создание отменено. Проверьте баланс перед новой игрой.'),{status:409});
   if(!view.pending&&view.roomId)return view;
  }catch(error){if(error.status&&error.status<500&&error.status!==409)throw error;if(error.status===409&&!['GAME_ADMISSION_BUSY'].includes(error.code))throw error;}
  if(attempt<4)await wait(1000*(attempt+1));
 }
 throw Error('Создание ещё не подтверждено. Восстановите комнату перед новой игрой.');
}
