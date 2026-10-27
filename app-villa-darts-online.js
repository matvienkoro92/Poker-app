const CODE=/^[A-HJ-NP-Z2-9]{10}$/;
const PENDING='p21-darts-pending-create';
export function createDartsOnline({request,update,error}){
 let view=null,timer=0,generation=0,inFlight=false;
 function pending(){try{return JSON.parse(sessionStorage.getItem(PENDING)||'null');}catch{return null;}}
 function clearPending(){try{sessionStorage.removeItem(PENDING);}catch{}}
 function stop(){generation++;clearTimeout(timer);view=null;}
 function adopt(next){if(next.cancelled){stop();update(next);return;}if(view?.roomId===next.roomId&&next.revision<view.revision)return;if(!next.unchanged)view=next;else view={...view,...next};update(view);}
 function poll(delay=1000){clearTimeout(timer);const gen=generation;timer=setTimeout(async()=>{if(gen!==generation||!view?.roomId)return;if(inFlight){poll(250);return;}inFlight=true;try{const next=await request({action:view.spectator?'watch':'room',roomId:view.roomId,sinceRevision:view.revision});if(gen!==generation)return;adopt(next);}catch(e){if(gen!==generation)return;error(e.message+' · переподключаемся…');if([401,403,404].includes(e.status))return;}finally{inFlight=false;}if(gen===generation&&view)poll(document.hidden?5000:1000);},delay);}
 async function move(move){if(!view||view.spectator)throw Error('Вы наблюдаете за игрой.');const gen=generation;clearTimeout(timer);try{const next=await request({action:'move',roomId:view.roomId,revision:view.revision,move});if(gen===generation)adopt(next);}finally{if(gen===generation&&view)poll(0);}}
 async function recover(){const saved=pending();if(!saved)return;const next=await request({action:'recover-create',requestId:saved.requestId});if(next.pending)throw Error('Создание ещё обрабатывается. Повторите восстановление.');if(next.cancelled){clearPending();throw Error('Создание отменено. Фишки возвращены.');}clearPending();stop();adopt(next);poll();}
 async function launch(mode,options,equipment){if(pending()){await recover();return;}stop();let body={action:mode==='find'?'matchmake':'create',discipline:'darts',turnSeconds:options.seconds,raceTo:options.raceTo,rounds:options.rounds,first:0,equipment};
 if(options.stake){body={...body,stake:options.stake,requestId:crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint8Array(20)),b=>b.toString(16).padStart(2,'0')).join('')};sessionStorage.setItem(PENDING,JSON.stringify(body));}
 try{const next=await request(body);clearPending();adopt({...next,searching:mode==='find'});poll();if(mode==='challenge'){try{await request({action:'challenge',roomId:next.roomId});error('Вызов отправлен в чат игроков');}catch(e){error('Комната создана. '+e.message);}}}catch(e){if(e.status&&e.status<500&&e.status!==408&&e.status!==409)clearPending();throw e;}}
 async function preview(code){code=String(code).trim().toUpperCase();if(!CODE.test(code))throw Error('Введите код из 10 символов.');const info=await request({action:'preview',roomId:code});if(info.discipline!=='darts')throw Error('Этот код относится к другой игре.');return {...info,roomId:code};}
 async function join(code,watch=false){stop();const next=await request({action:watch?'watch':'join',roomId:code});if(next.state?.discipline!=='darts')throw Error('Эта комната относится к другой игре.');adopt(next);poll();}
 async function cancelPending(){const saved=pending();if(!saved)return;await request({action:'cancel',requestId:saved.requestId});clearPending();}
 async function leave(){if(!view)return;if(view.spectator){stop();return;}if(!view.ready){await request({action:'cancel',roomId:view.roomId});}else if(view.state.winner===null||view.wager?.status==='playing'){await move({type:'resign'});}stop();}
 async function rematch(){if(!view)return;const next=await request({action:'rematch',roomId:view.roomId,revision:view.revision});adopt(next);poll();}
 return {adopt,launch,join,preview,move,leave,rematch,recover,cancelPending,stop,pending,get view(){return view;}};
}
