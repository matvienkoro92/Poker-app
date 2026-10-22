export const SETTLEMENT_ACTIONS=['resign','draw-offer','draw-accept','draw-decline'];
export function settle(state,player,move){
 if(![0,1].includes(player)||state.winner!==null||state.moving)return false;
 if(move.type==='resign'){state.winner=1-player;state.endReason='resign';state.message='Игрок '+(player+1)+' сдался';}
 else if(move.type==='draw-offer'){if(state.drawOffer!=null||state.drawOffered?.[player])return false;state.drawOffered=state.drawOffered||[false,false];state.drawOffered[player]=true;state.drawOffer=player;state.message='Игрок '+(player+1)+' предложил ничью';return true;}
 else if(move.type==='draw-accept'||move.type==='draw-decline'){if(![0,1].includes(state.drawOffer)||state.drawOffer===player)return false;if(move.type==='draw-decline'){state.drawOffer=null;state.message='Предложение ничьей отклонено';return true;}state.winner='draw';state.endReason='agreement';state.message='Ничья по соглашению игроков';}
 else return false;
 state.drawOffer=null;state.pending=null;state.inHand=false;return true;
}
