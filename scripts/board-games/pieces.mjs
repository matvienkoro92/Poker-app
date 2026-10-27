import {detailedPiece} from './detailed-pieces.mjs';
import {collectionPiece} from './collection-pieces.mjs';
const shapes={p:'<circle cx="30" cy="16" r="8"/><path d="M25 24h10l3 19H22zM19 44h22l3 7H16z"/>',r:'<path d="M16 8h7v7h5V8h5v7h5V8h7v15l-7 5 2 16H21l2-16-7-5zM17 45h27v7H17z"/>',n:'<path d="M20 44c2-13 17-12 13-24l-9 10-10-4 9-14 7-5 4 7c14 4 15 20 12 30zM17 45h30v7H17z"/><circle cx="29" cy="20" r="1.4"/>',b:'<path d="M30 5c-7 6-15 12-11 21l7 7-5 11h19l-6-11 7-7C45 18 36 10 30 5zM17 45h27v7H17z"/><line x1="31" y1="11" x2="24" y2="22"/>',q:'<path d="M14 19l7 6 9-13 9 13 8-6-6 23H20zM17 45h27v7H17z"/><circle cx="13" cy="15" r="3"/><circle cx="30" cy="8" r="3"/><circle cx="48" cy="15" r="3"/>',k:'<path d="M26 5h8v6h6v7h-6v6c13-5 15 8 7 13l-3 7H23l-3-7c-9-6-5-18 6-13v-6h-6v-7h6zM17 45h27v7H17z"/>'};
const flatShapes={
 p:'<path d="M22 27c-6-4-5-16 3-18 11-4 19 10 11 17l-3 2 1 5c1 7 10 9 11 18H15c1-9 10-11 11-18l1-5z"/><path d="M22 29h16" fill="none"/>',
 r:'<path d="M13 9h8v6h5V9h8v6h5V9h8l-2 15-5 4 1 17H19l1-17-5-4zM17 45h26l3 8H14z"/><path d="M20 27h20M19 44h22" fill="none"/>',
 n:'<path d="M15 46c0-9 7-15 14-21l-7 3-6-4-4-1 9-13 8-2 3-6 5 7c14 5 14 24 10 37zM17 46h30l2 7H14z"/><path d="M34 17c6 8 2 18-2 25M21 20l5-5" fill="none"/><circle cx="29" cy="14" r="1.5"/>',
 b:'<path d="M27 7c-1-5 6-6 7-1 0 2-1 3-3 4 8 8 16 16 9 25l-6 6 3 5H23l3-5-6-6c-7-9 1-17 9-25zM22 46h16l7 7H15z"/><path d="M33 15l-9 15M22 40h16" fill="none"/>',
 q:'<path d="M12 17l10 10 8-16 8 16 10-10-7 26H19zM18 44h24l4 9H14z"/><circle cx="11" cy="13" r="4"/><circle cx="30" cy="8" r="4"/><circle cx="49" cy="13" r="4"/><path d="M20 39h20" fill="none"/>',
 k:'<path d="M27 3h6v6h6v5h-6v9h-6v-9h-6V9h6z"/><path d="M29 25c-10-14-24-4-16 8l8 11h18l8-11c8-12-6-22-16-8zM20 45h20l6 8H14z"/><path d="M30 26v14M20 41h20" fill="none"/>'
};
export function pieceSVG(type,color,style='classic'){const luxury=collectionPiece(type,color,style);if(luxury)return luxury;if(['classic','royal','minimal','onyx'].includes(style))return '<svg viewBox="0 0 60 60" class="piece flat '+(color==='b'?'black ':'')+style+'" aria-hidden="true">'+(flatShapes[type]||flatShapes.p)+'</svg>';const detailed=detailedPiece(type,color,style);if(detailed)return detailed;return '<svg viewBox="0 0 60 60" class="piece '+(color==='b'?'black ':'')+style+'" aria-hidden="true">'+(shapes[type]||shapes.p)+'</svg>';}
export const pieceNames={p:'пешка',r:'ладья',n:'конь',b:'слон',q:'ферзь',k:'король'};
