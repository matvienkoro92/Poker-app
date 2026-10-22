export function mountLobby({launch,back}){
 const $=id=>document.getElementById(id);let step=0,mode='solo',waiting=false;
 function paint(){const join=mode==='join',training=mode==='training';['setupMode','setupDiscipline','setupFormat'].forEach((id,i)=>$(id).hidden=waiting||i!==step);$('setupWaiting').hidden=!waiting;$('setupProgress').textContent=waiting?'Игра с другом':'Шаг '+(step+1)+' из 3';$('setupTitle').textContent=waiting?'Ждём соперника':['Режим игры','Дисциплина','Формат матча'][step];$('setupNext').hidden=waiting;$('setupNext').textContent=step<2?'Далее →':({solo:'Начать игру',training:'Начать тренировку',create:'Создать комнату',challenge:'Отправить вызов в чат',join:'Присоединиться'})[mode];$('formatButtons').hidden=join||training;$('setupCode').hidden=!join;$('setupTrainingNote').hidden=!training;$('setupHostRules').hidden=!join;for(const el of $('setupDiscipline').children)if(el.id!=='setupHostRules')el.hidden=join||el.tagName==='LABEL';}
 $('modeButtons').onclick=e=>{const b=e.target.closest('[data-mode]');if(!b)return;mode=b.dataset.mode;for(const c of $('modeButtons').children)c.setAttribute('aria-pressed',String(c===b));};
 $('formatButtons').onclick=e=>{const b=e.target.closest('[data-format]');if(!b)return;$('raceTo').value=b.dataset.format;for(const c of $('formatButtons').children)c.setAttribute('aria-pressed',String(c===b));};
 $('setupNext').onclick=()=>{if(step<2){step++;paint();}else launch(mode);};
 $('setupBack').onclick=()=>{if(waiting)return back();if(step>0){step--;paint();}else back();};
 paint();return {waiting(){waiting=true;paint();},reset(){waiting=false;step=0;paint();}};
}
