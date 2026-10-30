'use strict';
const nards=s=>['short','long'].includes(s.discipline);
function numericRules(s){if(!nards(s))return {};const result={};for(const key of ['marsMultiplier','koksMultiplier']){const v=s[key]??1;if(typeof v!=='number'||!Number.isFinite(v)||v<1||v>10||Math.abs(Math.round(v*100)-v*100)>1e-8){const e=Error('Коэффициент должен быть от 1 до 10, не более двух знаков после запятой.');e.status=400;throw e;}result[key]=v;}return result;}
function minimumKoks(mars){const cents=Math.round(mars*100);return Math.max(cents+1,2*cents-100)/100;}
function rules(s){const result=numericRules(s);if(nards(s)&&(result.marsMultiplier>1||result.koksMultiplier>1)){const min=minimumKoks(result.marsMultiplier);if(result.koksMultiplier<min){const e=Error('При марсе ×'+result.marsMultiplier+' кокс должен быть не меньше ×'+min+'.');e.status=400;throw e;}}return result;}
function reserve(stake,s){return Math.ceil(stake*Math.round(Math.max(1,...Object.values(numericRules(s)))*100)/100);}
function settlement(w,r){const kind=['borne-off','resign'].includes(r?.state?.endReason)?r.state.winKind:'single',multiplier=kind==='mars'?w.settings.marsMultiplier:kind==='koks'?w.settings.koksMultiplier:1;return Math.ceil(w.stake*Math.round((multiplier||1)*100)/100);}
module.exports={rules,reserve,settlement,minimumKoks};
