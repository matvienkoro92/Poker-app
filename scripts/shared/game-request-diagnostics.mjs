// No credentials, player names or request bodies enter diagnostics.
export async function gameFetch(url,options,stage){
 const started=Date.now();
 try{const response=await fetch(url,options);if(!response.ok||Date.now()-started>8000)console.warn('[game-request]',{stage,status:response.status,durationMs:Date.now()-started});return response;}
 catch(error){console.warn('[game-request]',{stage,durationMs:Date.now()-started,error:error.name||'Error'});throw error;}
}
