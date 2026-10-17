/* Shared deterministic parser: extracted values are always reviewed before saving. */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.pokerDepositParser = factory();
})(typeof window !== 'undefined' ? window : this, function() {
  'use strict';
  function money(value) {
    var text = String(value == null ? '' : value).replace(/[\s\u00a0\u202f]/g, '').replace(',', '.');
    if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return null;
    var parts = text.split('.');
    var amount = Number(parts[0]) * 100 + Number((parts[1] || '').padEnd(2, '0'));
    return Number.isSafeInteger(amount) && amount > 0 && amount <= 10000000000 ? amount : null;
  }
  function safeLink(value) {
    try { var u = new URL(String(value || '').trim()); return u.protocol === 'https:' ? u.href : ''; } catch(e) { return ''; }
  }
  function parse(raw) {
    var text = String(raw || '').trim().slice(0, 5000), warnings = [];
    var links = text.match(/https:\/\/[^\s<>]+/gi) || [];
    var paymentLink = safeLink((links[0] || '').replace(/[),.;]+$/, ''));
    var cleaned = text.replace(/https?:\/\/\S+/g, '');
    var cards = cleaned.match(/(?<!\d)(?:\d[ -]?){15,18}\d(?!\d)/g) || [];
    cards = cards.map(function(v) { return v.replace(/\D/g, ''); }).filter(function(v) { return v.length >= 16 && v.length <= 19; });
    var card = cards[0] || '';
    var noCards = cleaned; cards.forEach(function(v) { noCards = noCards.replace(new RegExp(v.split('').join('[ -]?')), ''); });
    var phones = noCards.match(/(?<!\d)(?:\+?7|8)[ (.-]*\d{3}[ ).-]*\d{3}[ .-]*\d{2}[ .-]*\d{2}(?!\d)/g) || [];
    var phone = phones[0] ? '+7' + phones[0].replace(/\D/g, '').slice(1) : '';
    var bankMatch = cleaned.match(/(?:банк\s*[:—-]\s*)([^\n,;]+)/i);
    var known = cleaned.match(/(?:Т[ -]?Банк|Тинькофф|Сбербанк|Сбер|Альфа[ -]?(?:Банк)?|ВТБ|Газпромбанк|Райффайзен(?:банк)?|Озон[ -]?Банк|Ozon[ -]?Банк|Яндекс[ -]?Банк|Совкомбанк|Россельхозбанк|ПСБ|МТС[ -]?Банк|Банк\s+Санкт[ -]Петербург)/i);
    var bank = bankMatch ? bankMatch[1].trim() : known ? known[0] : '';
    var nameMatch = cleaned.match(/(?:получатель|фио|владелец|имя)\s*[:—-]\s*([^\n,;]+)/i);
    var recipient = nameMatch ? nameMatch[1].trim() : '';
    if (!recipient) {
      var lines = cleaned.split(/\n/).map(function(s) { return s.trim(); });
      recipient = lines.find(function(line) { return /^(?:[А-ЯЁ][а-яё]+\s+){1,2}(?:[А-ЯЁ][а-яё]+|[А-ЯЁ]\.?)$/.test(line) && line !== bank; }) || '';
    }
    var amounts = [], re = /(?:сумма|вывод|выплатить|к выплате|остаток)\s*[:—=-]?\s*(\d[\d \u00a0\u202f]*(?:[.,]\d{1,2})?)(?![\d.,])(?:\s*(?:₽|руб\.?|р\.?))?/gi, match;
    while ((match = re.exec(cleaned))) { var n = money(match[1]); if (n) amounts.push(n); }
    if (!amounts.length) {
      re = /(?<![\d.,])(\d[\d \u00a0\u202f]*(?:[.,]\d{1,2})?)\s*(?:₽|руб\.?)(?![а-я])/gi;
      while ((match = re.exec(noCards))) { var m = money(match[1]); if (m) amounts.push(m); }
    }
    amounts = Array.from(new Set(amounts));
    if (cards.length > 1 || phones.length > 1) warnings.push('В тексте несколько реквизитов. Проверьте выбранный номер.');
    if (amounts.length > 1) warnings.push('Найдено несколько сумм. Укажите нужную сумму к выплате.');
    if (!card && !phone && !paymentLink) warnings.push('Номер или ссылка не распознаны. Заполните реквизит вручную.');
    if (!recipient) warnings.push('Укажите получателя — имя не распознано.');
    if (amounts.length === 0) warnings.push('Укажите сумму к выплате — она не распознана.');
    if (!bank) warnings.push('Проверьте банк — он не распознан.');
    return {card:card, phone:phone, bank:bank, recipient:recipient, paymentLink:paymentLink,
      amount:amounts.length === 1 ? amounts[0] : null, rawText:text, warnings:warnings};
  }
  return {parse:parse, money:money, safeLink:safeLink};
});
