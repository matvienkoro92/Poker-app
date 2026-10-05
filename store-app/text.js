// Store-only vocabulary. Never applied to the website or API protocol fields.
function chipsText(value) {
  return String(value)
    .replace(/Админ, депозит\/вывод/g, 'Поддержка клуба')
    .replace(/Поменяйте через менеджера на беккинг-билеты от 300\s*(?:₽|фишек)\. 1 бонус = 1 (?:рубль|фишка)/g,
      'Бонусы используются только внутри игры.')
    .replace(/попаданий в деньги/gi, 'призовых финишей')
    .replace(/попаданий в деньгах/gi, 'призовых финишей')
    .replace(/Попаданий в деньги/g, 'Призовых финишей')
    .replace(/₽|&#8381;|&#x20bd;|&ruble;|\\u20bd/gi, '◉')
    .replace(/рублями/gi, 'фишками')
    .replace(/рублях/gi, 'фишках')
    .replace(/рублей/gi, 'фишек')
    .replace(/рубля/gi, 'фишки')
    .replace(/рубль/gi, 'фишка')
    .replace(/руб\./gi, 'фишек')
    .replace(/(\d)р(?:\.|(?=[\s,;:!?<"'`]|$))/g, '$1◉');
}
// Keep legacy input recognition as well as store notation. A cosmetic unit
// change must not break parsing of existing tournament records.
function chipsJavaScript(source) {
  const patterns = [];
  const protectedSource = source.replace(/\/((?:\\.|[^/\\\n"'`])+)\/([dgimsuvy]*)/g, function (full, body, flags) {
    if (!body.includes('₽')) return full;
    const index = patterns.push('/' + body.replace(/₽/g, '[₽◉]') + '/' + flags) - 1;
    return '__STORE_PATTERN_' + index + '__';
  });
  return chipsText(protectedSource).replace(/__STORE_PATTERN_(\d+)__/g, function (_, index) { return patterns[Number(index)]; });
}
if (typeof module !== 'undefined') module.exports = { chipsText, chipsJavaScript };
