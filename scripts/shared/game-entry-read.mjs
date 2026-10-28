// Entry reads are safe to retry; never repeat joins or wallet mutations here.
export async function gameEntryRead(request,body){
 for(let attempt=0;;attempt++){
  try{return await request(body);}catch(error){
   if(attempt>=2||error.status&&![502,503,504].includes(error.status)||error.message?.startsWith('Обновляем игру'))throw error;
   await new Promise(resolve=>setTimeout(resolve,350*(attempt+1)));
  }
 }
}
