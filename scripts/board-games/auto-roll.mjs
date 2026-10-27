// One attempt per accepted roll opportunity; polls and failed requests cannot loop.
export function createAutoRollController(roll,{delay=250,isVisible=()=>typeof document==='undefined'||!document.hidden}={}){
 let timer=null,scheduled=null,current=null,attempted=null;
 const cancel=()=>{if(timer!==null)clearTimeout(timer);timer=null;scheduled=null;};
 return {update(next){current=next;if(!next.enabled||!next.canRoll){cancel();return;}if(attempted===next.key)return;if(timer!==null&&scheduled===next.key)return;cancel();const key=next.key;scheduled=key;timer=setTimeout(()=>{timer=null;if(!current?.enabled||!current.canRoll||current.key!==key||attempted===key||!isVisible())return;attempted=key;Promise.resolve().then(roll).catch(()=>{});},Math.max(0,next.delay??delay));},reset(){cancel();current=null;attempted=null;}};
}
