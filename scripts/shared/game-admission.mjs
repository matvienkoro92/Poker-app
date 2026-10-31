// Asking never cancels a room. Cancellation is committed with the accepted invitation.
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export async function retryGameAdmission(request,body,{active=()=>true,wait=pause}={}){
 for(let attempt=0;;attempt++){
  if(!active())throw new DOMException('Вход отменён','AbortError');
  try{return await request(body);}catch(error){
   if(error.code!=='GAME_ADMISSION_BUSY'||attempt>=3)throw error;
   await wait(400*(attempt+1));
  }
 }
}
// An ambiguous join response may arrive before admission finishes. Recover by
// reading the room, never by issuing another debit or cancelling the invitation.
export async function recoverGameJoin(request,roomId,{active=()=>true,wait=pause}={}){
 for(let attempt=0;;attempt++){
  if(!active())throw new DOMException('Вход отменён','AbortError');
  try{return await request({action:'room',roomId});}catch(error){
   if(attempt>=3||error.status&&![403,404,409,502,503,504].includes(error.status))throw error;
   await wait(400*(attempt+1));
  }
 }
}
export async function prepareGameJoin({request,roomId}) {
 const {conflict}=await request({action:'admission',roomId});
 if(!conflict)return {};
 if(!conflict.canCancel)throw Error('У вас уже идёт партия. Сначала завершите её, затем принимайте новое приглашение.');
 const accepted=await new Promise(resolve=>{
  const dialog=document.createElement('dialog');dialog.className='cue-dialog game-admission-dialog';dialog.dataset.gameAdmission='';
  const title=document.createElement('h2'),text=document.createElement('p'),yes=document.createElement('button'),no=document.createElement('button');
  title.textContent='У вас уже создана партия';
  text.textContent='Чтобы принять чужое приглашение, нужно отменить свою созданную партию. Она будет отменена при подтверждении входа в новую игру. Если ставка уже списана, она вернётся через обычную отмену.';
  yes.textContent='Продолжить с отменой';yes.className='primary';yes.dataset.admissionAccept='';
  no.textContent='Оставить свою партию';no.dataset.admissionKeep='';
  let choice=false;yes.onclick=()=>{choice=true;dialog.close();};no.onclick=()=>dialog.close();
  dialog.addEventListener('close',()=>{dialog.remove();resolve(choice);},{once:true});
  dialog.append(title,text,yes,no);document.body.append(dialog);dialog.showModal();
 });
 return accepted?{cancelCreatedRoom:{family:conflict.family,roomId:conflict.roomId}}:null;
}
