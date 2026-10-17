/* Shared deterministic parser: extracted values are always reviewed before saving. */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.pokerDepositParser = factory();
})(typeof window !== 'undefined' ? window : this, function() {
  'use strict';
  function money(value) {
    var text = String(value == null ? '' : value).replace(/[\s\u00a0\u202f]/g, '').replace(',', '.');
    var multiplier=/[кk]$/i.test(text)?1000:1;text=text.replace(/[кk]$/i,'');
    if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return null;
    var parts = text.split('.');
    var amount = (Number(parts[0]) * 100 + Number((parts[1] || '').padEnd(2, '0')))*multiplier;
    return Number.isSafeInteger(amount) && amount > 0 && amount <= 10000000000 ? amount : null;
  }
  function safeLink(value) {
    try { var u = new URL(String(value || '').trim()); return u.protocol === 'https:' ? u.href : ''; } catch(e) { return ''; }
  }
  function parse(raw) {
    var text = String(raw || '').trim().slice(0, 5000), warnings = [];
    var clubRooms={'758417':'P21','1786376':'X','19645':'Supr','1004444':'PP'};
    var clubPattern=/(?:(?:айди|ID)[ \t]*(?:клуба|клуб|club)|(?:клуба?|club)[ \t]*(?:(?:айди|ID))?)[ \t]*[:#№—-]?[ \t]*(\d+)(?!\d)|(\d+)[ \t]+(?:айди|ID)[ \t]+(?:клуба|club)/gi;
    var clubIds=[],playerText=text.replace(clubPattern,function(all,after,before){clubIds.push(after||before);return ' ';});
    if(clubRooms[text.trim()]){clubIds.push(text.trim());playerText='';}
    var roomMatch=text.match(/(?:^|[\s,:;])(P21|Покер[ -]*21|Poker[ -]*21|X(?:[ -]?poker)?|Х[ -]?покер|Supr(?:ema)?|Супрема|PP(?:poker)?|ПП[ -]?покер)(?=\s|[,;.]|$)/i);
    var room=roomMatch?(/^(?:p21|покер21|poker21)$/i.test(roomMatch[1].replace(/[\s-]/g,''))?'P21':/^(?:x|xpoker|хпокер)$/i.test(roomMatch[1].replace(/[\s-]/g,''))?'X':/^(?:supr|suprema|супрема)$/i.test(roomMatch[1])?'Supr':'PP'):'';
    var identified=Array.from(new Set(clubIds.map(function(id){return clubRooms[id];}).filter(Boolean).concat(room?[room]:[])));
    if(identified.length>1){room='';warnings.push('Название рума и ID клуба не совпадают. Выберите рум вручную.');}else if(identified.length===1)room=identified[0];
    var idBefore=playerText.match(/(?:^|\n)[ \t]*(\d{1,64})[ \t]+(?:айди|ID)(?=[ \t]*(?:\n|$|[,;]))/i);
    var idMatch=playerText.match(/(?:\bID|айди|ид игрока|мой(?:[ \t]+(?:айди|ID))?)[ \t]*[:#—-]?[ \t]*([a-zA-Z0-9_-]{1,64})/i);
    var playerId=idBefore?idBefore[1]:idMatch&&!/^(?:USDT|TRON|TRC20)$/i.test(idMatch[1])?idMatch[1]:'';
    var paymentType=/\bUSDT\b/i.test(text)?'usdt':'bank';
    var network=/TRC[ -]?20|\bTron\b/i.test(text)?'TRC20':'';
    var walletMatch=text.match(/(?:^|\s)(T[1-9A-HJ-NP-Za-km-z]{33})(?=\s|$)/);
    var wallet=walletMatch?walletMatch[1]:'';
    var links = text.match(/https:\/\/[^\s<>]+/gi) || [];
    var paymentLink = safeLink((links[0] || '').replace(/[),.;]+$/, ''));
    var cleaned = text.replace(/https?:\/\/\S+/g, '').replace(wallet,'');
    var cards = cleaned.match(/(?<!\d)(?:\d[ -]?){15,18}\d(?!\d)/g) || [];
    cards = cards.filter(function(v){var groups=v.trim().split(/[ -]+/);return groups.length===1||!groups.some(function(g){return /^(?:7|8)\d{10}$/.test(g);});});
    cards = cards.map(function(v) { return v.replace(/\D/g, ''); }).filter(function(v) { return v.length >= 16 && v.length <= 19; });
    var card = cards[0] || '';
    var noCards = cleaned; cards.forEach(function(v) { noCards = noCards.replace(new RegExp(v.split('').join('[ -]?')), ''); });
    var phones = noCards.match(/(?<!\d)(?:\+?7|8)[ (.-]*\d{3}[ ).-]*\d{3}[ .-]*\d{2}[ .-]*\d{2}(?!\d)/g) || [];
    var phone = phones[0] ? '+7' + phones[0].replace(/\D/g, '').slice(1) : '';
    if(!playerId&&!card&&phones.length===1){var pair=playerText.match(/(?:^|\n|[,;])[ \t]*(\d{2,10})[ \t]+((?:\+?7|8)[ (.-]*\d{3}[ ).-]*\d{3}[ .-]*\d{2}[ .-]*\d{2})(?!\d)/);if(pair)playerId=pair[1];}
    var bankMatch = cleaned.match(/(?:банк\s*[:—-]\s*)([^\n,;]+)/i);
    var known = cleaned.match(/(?:ЮMoney|Ю[ -]?мани|YooMoney|Ингосстрахбанк|Инго(?:банк)?|Т[ -]?Банк|Тинькофф|Сбербанк|Сбер|Альфа[ -]?(?:Банк)?|ВТБ|Газпромбанк|Райффайзен(?:банк)?|Озон[ -]?Банк|Ozon[ -]?Банк|Яндекс[ -]?Банк|Совкомбанк|Россельхозбанк|ПСБ|МТС[ -]?Банк|Банк\s+Санкт[ -]Петербург)/i);
    var bank = bankMatch ? bankMatch[1].trim() : known ? known[0] : '';
    var nameMatch = cleaned.match(/(?:получатель|фио|владелец|имя)\s*[:—-]\s*([^\n,;]+)/i);
    var recipient = nameMatch ? nameMatch[1].trim() : '';
    if (!recipient) {
      var lines = cleaned.split(/\n/).map(function(s) { return s.trim(); });
      recipient = lines.find(function(line) { return /^(?:[А-ЯЁ][а-яё]+\s+){1,2}(?:[А-ЯЁ][а-яё]+|[А-ЯЁ]\.?)$/.test(line) && line !== bank; }) || '';
    }
    if (!recipient && phones.length===1) {
      var afterPhone=cleaned.slice(cleaned.indexOf(phones[0])+phones[0].length).trim();
      if(known&&afterPhone.indexOf(known[0])===0)afterPhone=afterPhone.slice(known[0].length).trim();
      var trailingName=afterPhone.match(/^([А-ЯЁ][а-яё]+(?:[ \t]+[А-ЯЁ][а-яё]+){0,2})[ \t]*[.,;]?(?:\n|$)/);
      if(trailingName)recipient=trailingName[1];
    }
    if (!recipient && known) {
      var nameText=cleaned; phones.forEach(function(v){nameText=nameText.replace(v,'');});
      nameText=nameText.replace(known[0],'');
      recipient=nameText.split(/\n/).map(function(line){return line.trim().replace(/^[,;:—-]+\s*|[,;]+$/g,'');}).find(function(line){return /^(?:[А-ЯЁ][а-яё]+\s+){1,2}(?:[А-ЯЁ][а-яё]+|[А-ЯЁ]\.?)$/.test(line);})||'';
    }
    var amounts = [], re = /(?:сумма|вывести|вывод|выплатить|к выплате|остаток)\s*[:—=-]?\s*(\d[\d \u00a0\u202f]*(?:[.,]\d{1,2})?[ \t]*[кk]?)(?![\d.,])(?:\s*(?:₽|руб\.?|р\.?))?/gi, match;
    while ((match = re.exec(cleaned))) { var n = money(match[1]); if (n) amounts.push(n); }
    if (!amounts.length) {
      re = /(?<![\d.,])(\d[\d \u00a0\u202f]*(?:[.,]\d{1,2})?)\s*(?:₽|руб\.?|р\.?)(?![а-яё])/gi;
      while ((match = re.exec(noCards.replace(/(?:\+?7|8)[ (.-]*\d{3}[ ).-]*\d{3}[ .-]*\d{2}[ .-]*\d{2}/g, ' ')))) { var m = money(match[1]); if (m) amounts.push(m); }
    }
    if(!amounts.length){
      var leading=text.match(/^[ \t]*(\d{1,8}(?:[.,]\d{1,2})?[кk]?)[ \t]*(?:[,;\n]|$)/i);
      if(leading&&!clubRooms[leading[1]]&&leading[1]!==playerId&&/(?:клуб|банк)/i.test(text.slice(leading[0].length))){var leadingAmount=money(leading[1]);if(leadingAmount)amounts.push(leadingAmount);}
    }
    amounts = Array.from(new Set(amounts));
    if (cards.length > 1 || phones.length > 1) warnings.push('В тексте несколько реквизитов. Проверьте выбранный номер.');
    if (amounts.length > 1) warnings.push('Найдено несколько сумм. Укажите нужную сумму к выплате.');
    if (paymentType==='usdt'&&!wallet) warnings.push('Укажите USDT-кошелёк.');
    if (paymentType==='usdt'&&!network) warnings.push('Укажите сеть USDT.');
    if (paymentType!=='usdt' && !card && !phone && !paymentLink) warnings.push('Номер или ссылка не распознаны. Заполните реквизит вручную.');
    if (paymentType!=='usdt'&&!recipient) warnings.push('Укажите получателя — имя не распознано.');
    if (amounts.length === 0) warnings.push('Укажите сумму к выплате — она не распознана.');
    if (paymentType!=='usdt'&&!bank) warnings.push('Проверьте банк — он не распознан.');
    return {paymentType:paymentType,wallet:wallet,network:network,card:card, phone:phone, bank:bank, recipient:recipient, room:room, playerId:playerId, paymentLink:paymentLink,
      amount:amounts.length === 1 ? amounts[0] : null, rawText:text, warnings:warnings};
  }
  return {parse:parse, money:money, safeLink:safeLink};
});
