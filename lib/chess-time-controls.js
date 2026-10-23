'use strict';
const controls=[
 ['ultra-15','Ультрапуля · ¼ + 0',15,0],['ultra-30','Ультрапуля · ½ + 0',30,0],
 ['bullet-1','Пуля · 1 + 0',60,0],['bullet-1-1','Пуля · 1 + 1',60,1],['bullet-2-1','Пуля · 2 + 1',120,1],
 ['blitz-3','Блиц · 3 + 0',180,0],['blitz-3-2','Блиц · 3 + 2',180,2],['blitz-5','Блиц · 5 + 0',300,0],['blitz-5-3','Блиц · 5 + 3',300,3],['blitz-5-5','Блиц · 5 + 5',300,5],
 ['rapid-10','Рапид · 10 + 0',600,0],['rapid-10-5','Рапид · 10 + 5',600,5],['rapid-15-10','Рапид · 15 + 10',900,10],['rapid-30','Рапид · 30 + 0',1800,0],
 ['classical-30-30','Классика · 30 + 30',1800,30],['classical-60','Классика · 60 + 0',3600,0],['classical-90-30','Классика · 90 + 30',5400,30],['unlimited','Без ограничения',0,0]
].map(([id,label,seconds,increment])=>({id,label,seconds,increment}));
const find=id=>controls.find(c=>c.id===id);
function resetClock(control){return [control.seconds*1000,control.seconds*1000];}
function advanceClock(remaining,deadline,turn,control,time){remaining[turn]=Math.max(0,deadline-time)+control.increment*1000;return time+remaining[1-turn];}
module.exports={controls,find,resetClock,advanceClock};
