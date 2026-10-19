(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.pokerDepositQuickInput=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 function key(s){var letters={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};return String(s||'').normalize('NFKC').toLowerCase().replace(/[а-яё]/g,function(c){return letters[c];}).replace(/[^a-z0-9]/g,'');}
 var rooms={p21:'P21','п21':'P21','покер21':'P21',x:'X','х':'X','хпокер':'X','х-покер':'X','x-poker':'X',xpoker:'X',pp:'PP',pppoker:'PP',supr:'Supr','супрема':'Supr'};
 var channels={'рунекс':'runex',runex:'runex','продамус':'prodamus',prodamus:'prodamus','эксчип':'exchip',exchip:'exchip','крипта':'r-crypto','r-crypto':'r-crypto','другое':'other',other:'other'};
 function parse(text,directory){
  var tokens=String(text||'').trim().split(/\s+/),room='',channel='',amount=0,name=[],error='';
  tokens.forEach(function(t,i){var v=t.toLowerCase();if(i===0&&/^\/?(?:деп|депозит|dep|deposit)(?:@poker_dvatuza_bot)?$/i.test(t))return;if(rooms[v]){if(room)error='Укажите один рум';room=rooms[v];}else if(channels[v]){if(channel)error='Укажите один способ оплаты';channel=channels[v];}else if(/^\d+(?:[.,]\d{1,2})?(?:р|₽|руб)?$/i.test(t)){if(amount)error='Укажите одну сумму; ID ищите через выбор игрока';amount=Math.round(Number(t.replace(/(?:р|₽|руб)$/i,'').replace(',','.'))*100);}else name.push(t);});
  var query=name.join(' '),q=key(query),matches=(directory||[]).filter(function(p){return (!room||p.room===room)&&q&&[p.nick,p.name,p.playerId].concat(p.aliases||[]).some(function(n){return key(n)===q;});});
  if(!matches.length&&q)matches=(directory||[]).filter(function(p){return (!room||p.room===room)&&[p.nick,p.name,p.playerId].concat(p.aliases||[]).some(function(n){return key(n).includes(q);});});
  if(!query||!room||!channel||!amount||!Number.isSafeInteger(amount)||amount>1e10)error=error||'Введите: деп Пряник Х 2000 Рунекс';
  if(!error&&!matches.length)error='Игрок не найден в выбранном руме. Найдите его в форме или сохраните ID.';
  return {query:query,room:room,channelId:channel,amount:amount,matches:matches,error:error};
 }
 return {parse:parse,key:key};
});
