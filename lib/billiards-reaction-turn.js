'use strict';
// Placement, aiming, draw offers and shot playback do not create a new turn.
module.exports=function billiardsReactionTurn(view){const s=view.state||{},m=view.match||{};return JSON.stringify([m.number||1,m.round||1,s.seed||0,s.shot||0,s.missedTurns||[0,0]]);};
