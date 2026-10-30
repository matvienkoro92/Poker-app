// Asking never cancels a room. Cancellation is committed with the accepted invitation.
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
