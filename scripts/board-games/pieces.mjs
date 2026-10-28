import {detailedPiece} from './detailed-pieces.mjs';
import {collectionPiece} from './collection-pieces.mjs';
const shapes={p:'<circle cx="30" cy="16" r="8"/><path d="M25 24h10l3 19H22zM19 44h22l3 7H16z"/>',r:'<path d="M16 8h7v7h5V8h5v7h5V8h7v15l-7 5 2 16H21l2-16-7-5zM17 45h27v7H17z"/>',n:'<path d="M20 44c2-13 17-12 13-24l-9 10-10-4 9-14 7-5 4 7c14 4 15 20 12 30zM17 45h30v7H17z"/><circle cx="29" cy="20" r="1.4"/>',b:'<path d="M30 5c-7 6-15 12-11 21l7 7-5 11h19l-6-11 7-7C45 18 36 10 30 5zM17 45h27v7H17z"/><line x1="31" y1="11" x2="24" y2="22"/>',q:'<path d="M14 19l7 6 9-13 9 13 8-6-6 23H20zM17 45h27v7H17z"/><circle cx="13" cy="15" r="3"/><circle cx="30" cy="8" r="3"/><circle cx="48" cy="15" r="3"/>',k:'<path d="M26 5h8v6h6v7h-6v6c13-5 15 8 7 13l-3 7H23l-3-7c-9-6-5-18 6-13v-6h-6v-7h6zM17 45h27v7H17z"/>'};
// Clean Staunton profiles, drawn on a shared baseline. Interior details use a
// lighter stroke than the silhouette so they stay quiet on small phone cells.
const base='<path d="M18 46Q30 44 42 46L45 51Q45.5 53 43 53H17Q14.5 53 15 51Z"/>';
const detail=d=>'<path class="piece-detail" d="'+d+'" fill="none"/>';
const flatShapes={
 p:'<path d="M26 31H34C33 36 34 40 39 45L41 48H19L21 45C26 40 27 36 26 31Z"/><path d="M23 29Q30 27.5 37 29L36 32H24Z"/><circle cx="30" cy="21" r="7"/><path d="M20 47H40L43 51Q44 53 41 53H19Q16 53 17 51Z"/>',
 r:'<path d="M17 10H23V16H27V10H33V16H37V10H43V23L39 27H21L17 23Z"/><path d="M22 27H38L37 39Q37 43 41 46H19Q23 43 23 39Z"/>'+base+detail('M22 24H38M23 30H37'),
 n:'<path d="M20 46C19 39 23 35 29 30L34 25C31 25 28 27 25 29L17 27Q15 26 17 23L25 14L31 12L34 6L38 13C48 17 49 28 45 37L42 46Z"/>'+base+detail('M37 17C43 23 41 32 35 39M18 25L24 25')+'<circle class="piece-eye" cx="29.5" cy="19.5" r="1.25"/>',
 b:'<path d="M30 10C25 17 19 22 20 28Q20 35 27 38L24 45H36L33 38Q40 35 40 28C41 22 35 17 30 10Z"/><circle cx="30" cy="7.5" r="2.5"/><path d="M24 39H36L37 42H23Z"/>'+base+detail('M33 18L26 29'),
 q:'<path d="M17 17L23 27L30 13L37 27L43 17L39 37H21Z"/><circle cx="17" cy="14" r="2.5"/><circle cx="30" cy="10" r="2.5"/><circle cx="43" cy="14" r="2.5"/><path d="M22 38H38L37 43L40 46H20L23 43Z"/>'+base+detail('M23 34H37'),
 k:'<path d="M27.5 4H32.5V10H38V14.5H32.5V21H27.5V14.5H22V10H27.5Z"/><path d="M23 22Q30 19 37 22C43 25 41 32 36 36L34 40H26L24 36C19 32 17 25 23 22Z"/><path d="M24 40H36L37 43L40 46H20L23 43Z"/>'+base+detail('M25 36H35')
};
export function pieceSVG(type,color,style='classic'){const luxury=collectionPiece(type,color,style);if(luxury)return luxury;if(['classic','minimal'].includes(style))return '<svg viewBox="0 0 60 60" class="piece flat '+(color==='b'?'black ':'')+style+'" aria-hidden="true">'+((style==='minimal'?shapes[type]:flatShapes[type])||flatShapes.p)+'</svg>';const detailed=detailedPiece(type,color,style);if(detailed)return detailed;return '<svg viewBox="0 0 60 60" class="piece '+(color==='b'?'black ':'')+style+'" aria-hidden="true">'+(shapes[type]||shapes.p)+'</svg>';}
export const pieceNames={p:'пешка',r:'ладья',n:'конь',b:'слон',q:'ферзь',k:'король'};
