import rules from '../../lib/game-experience-rules.js';
export function gameExperiencePreview(stake=0){const {participation,win}=rules.rewards(stake);return 'Опыт герою за партию: победа +'+win+', поражение или ничья +'+participation+'. Нужны игровые ходы обоих участников. В матче — за каждую партию; бронь не учитывается.';}
const announced=new Set();
export function paintGameExperience(container,reward,player){
 let card=container.querySelector('.game-experience');
 if(!reward||![0,1].includes(player)){if(card)card.hidden=true;return;}
 if(!card){card=document.createElement('section');card.className='game-experience';card.setAttribute('aria-label','Опыт героя за партию');card.setAttribute('aria-live','polite');container.append(card);}
 card.hidden=false;const key=reward.event+':'+player+':'+!!reward.progress;
 if(card.dataset.event===key)return;card.dataset.event=key;
 for(const animation of card.getAnimations({subtree:true}))animation.cancel();
 card.replaceChildren();const title=document.createElement('strong');card.append(title);
 if(!reward.granted){title.textContent='Опыт за партию не начислен';const note=document.createElement('small');note.textContent=reward.reason||'Оба участника должны сделать игровые ходы.';card.append(note);return;}
 const amount=reward.perPlayer[player];title.className='game-experience__gain';title.textContent='+'+amount+' опыта';
 const progress=reward.progress?.[player];if(!progress)return;
 const {before,after}=progress,level=document.createElement('b'),track=document.createElement('div'),base=document.createElement('i'),gain=document.createElement('i'),label=document.createElement('span'),next=document.createElement('small');
 level.textContent=before.level!==after.level?'Уровень '+before.level+' → '+after.level+'!':'Уровень '+after.level;
 track.className='game-experience__track';base.className='game-experience__base';gain.className='game-experience__added';track.append(base,gain);track.setAttribute('role','progressbar');track.setAttribute('aria-label','Опыт до следующего уровня');
 const size=after.nextStart-after.levelStart,current=after.points-after.levelStart,max=after.level===100,pct=max?100:Math.min(100,current/size*100),from=before.nextStart>before.levelStart?Math.min(100,(before.points-before.levelStart)/(before.nextStart-before.levelStart)*100):100,crossed=after.level!==before.level;
 base.style.width=pct+'%';gain.style.left=(crossed?0:from)+'%';gain.style.width=Math.max(0,pct-(crossed?0:from))+'%';
 track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax',String(max?100:size));track.setAttribute('aria-valuenow',String(max?100:current));
 label.textContent=max?'Достигнут максимальный уровень':current.toLocaleString('ru-RU')+' / '+size.toLocaleString('ru-RU')+' опыта';next.textContent=max?'Всего опыта: '+after.points.toLocaleString('ru-RU'):'До уровня '+(after.level+1)+': '+(after.nextStart-after.points).toLocaleString('ru-RU')+' опыта';card.append(level,track,label,next);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){base.animate(crossed?[{width:from+'%'},{width:'100%',offset:.45},{width:'0%',offset:.46},{width:pct+'%'}]:[{width:from+'%'},{width:pct+'%'}],{duration:1400,easing:'ease-in-out'});gain.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:1400,easing:'ease-out'});title.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'ease-out'});}
 if(!announced.has(key)){announced.add(key);if(parent!==window)parent.postMessage({type:'p21-game-experience-earned',event:reward.event,amount},location.origin);}
}
