export function gameSpinRewardText(wager){
 if(!wager?.freeSpinReward)return '';
 if(wager.freeSpinReward.granted)return 'Каждому начислена 1 бесплатная крутка.';
 if(['refunded','cancelled'].includes(wager.status))return '';
 return 'За завершённый матч — каждому +1 бесплатная крутка.';
}
