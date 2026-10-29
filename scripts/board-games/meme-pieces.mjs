export const MEME_PIECES={
 p:{clip:'mexican-mem1',name:'Смеющийся мексиканец',symbol:'♟',background:40,duration:6000},
 r:{clip:'tak-soidet',name:'Так сойдёт',symbol:'♜',background:86,duration:3100},
 n:{clip:'monkey-dosvidanya',name:'Обезьяна · До свидания',symbol:'♞',background:38,duration:4300},
 b:{clip:'cat-3',name:'Котик',symbol:'♝',background:46,duration:3967},
 q:{clip:'joker-jkkh',name:'Джокер',symbol:'♛',background:38,duration:2033},
 k:{clip:'krug-fraer1',name:'Круг',symbol:'♚',background:86,duration:1834}
};
export function memePiece(type,color){const item=MEME_PIECES[type];if(!item)return '';return '<span class="piece meme-piece '+(color==='b'?'black':'white')+'" data-meme="'+item.clip+'" aria-hidden="true"><img src="./assets/game-reactions/'+item.clip+'.webp" alt="" draggable="false"><span class="meme-piece__role">'+item.symbol+'</span></span>';}
