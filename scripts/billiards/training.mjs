import {action} from './engine.mjs';
export function createTraining(){let checkpoint=null;
 return {move(state,move,controls){const before=move?.type==='shot'?structuredClone(state):null;if(!action(state,state.turn,move))return false;if(move.type==='shot')checkpoint={before,move:structuredClone(move),controls:structuredClone(controls)};return true;},restore(){return checkpoint?{state:structuredClone(checkpoint.before),controls:structuredClone(checkpoint.controls),move:structuredClone(checkpoint.move)}:null;},replay(){const copy=this.restore();if(!copy)return null;if(!action(copy.state,copy.state.turn,copy.move))return null;return copy;},clear(){checkpoint=null;},inspect:()=>({available:!!checkpoint})};
}
