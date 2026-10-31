export function gameSpinRewardPreview(stake,raceTo=1){
 if(!Number.isSafeInteger(stake)||stake<300)return '';
 return Number(raceTo)>1?'После завершения всего матча каждый игрок получит 1 бесплатную крутку.':'После завершения этой партии каждый игрок получит 1 бесплатную крутку.';
}
export function gameSpinRewardText(wager){
 if(!wager?.freeSpinReward)return '';
 const match=Number(wager.freeSpinReward.matchTarget)>1;
 if(wager.freeSpinReward.granted)return 'Каждому начислена 1 бесплатная крутка '+(match?'за весь матч.':'за эту партию.');
 if(['refunded','cancelled'].includes(wager.status))return '';
 return gameSpinRewardPreview(wager.stake,match?3:1);
}
export function paintGameSpinReward(container,wager){
 let block=container.querySelector('.game-spin-reward');
 if(!wager?.freeSpinReward?.granted){if(block)block.hidden=true;return;}
 if(!block){block=document.createElement('div');block.className='game-spin-reward';const title=document.createElement('strong'),note=document.createElement('small');title.textContent='+1 бесплатная крутка';block.append(title,note);container.append(block);}
 block.hidden=false;const note=block.querySelector('small'),text=gameSpinRewardText(wager);if(note.textContent!==text)note.textContent=text;
}
