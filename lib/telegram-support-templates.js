'use strict';
const text='Пишите пожалуйста в\nОДНОМ СООБЩЕНИИ:\n\n▪️Название турнира\n▪️Время начала турнира по Московскому времени\n▪️Ваш Айди\n\nСумма списания = сумме входа в турнир\nМинимально списать можно 300 рублей\nОбменять можно только на билет\n\n🔺В другом виде заявку не приму🔻';
const template={text,entities:[{type:'bold',offset:text.indexOf('ОДНОМ СООБЩЕНИИ:'),length:'ОДНОМ СООБЩЕНИИ:'.length}]};
const transferText='Перевод между аккаунтами от 1000₽\nПишите в ОДНОМ сообщении\n\nсвой айди, айди клуба, сумма перевода, свой айди и айди клуба куда перевести )\nПример: с 2314803, 1786376\nперевести 1000 на 829805, 19645';
const transferTemplate={text:transferText,entities:['ОДНОМ','Пример'].map(word=>({type:'bold',offset:transferText.indexOf(word),length:word.length}))};
const cryptoText='✅ USDT trc20\nTT5tkbCRj8WPC939gNF5eEwHW8GT6bDt3c\n\n✅ Депозит от 10$\n✅ Вывод от 10$ без комисси\n\n✅После перевода напишите мне\nв ОДНОМ сообщении:\n➡️ Сумму перевода\n➡️ Свой айди\n➡️ Айди клуба';
const cryptoTemplate={text:cryptoText,entities:['USDT trc20','✅ Депозит от 10$','✅ Вывод от 10$ без комисси','✅После перевода напишите мне','в ОДНОМ сообщении:','Сумму перевода','Свой айди','Айди клуба'].map(word=>({type:'bold',offset:cryptoText.indexOf(word),length:word.length}))};
const rulesTemplate={text:'🔺Оплата строго по реквизитам которые мы прислали, с точной суммой, без комментариев к платежу и на тот банк который указали (у нас программа которая считывает чек по реквизитам на подлинность), в противном случае деньги на ветер 🌬️\n\n‼️ С электронных кошельков, кошельков ЦУПИС, Сбер KIDS оплату не принимаем‼️\n\n🔺После перевода пришлите\n\nЧЕК только в PDF формате (Скрины, фотки не принимаем) без PDF чека депозит будет не действителен\n\n❗️РЕКВИЗИТЫ ОДНОРАЗОВЫЕ\n\nПЕРЕД КАЖДЫМ ПЕРЕВОДОМ УТОЧНЯЙТЕ ПОЖАЛУЙСТА РЕКВИЗИТЫ❗️\n\nРеквизиты действуют 10 мин с момента запроса',entities:[]};
function resolve(message){
 const command=String(message?.text||'').trim();
 if(/^\/(?:ticket|билет)(?:@Poker_dvatuza_bot)?$/i.test(command))return template;
 if(/^\/(?:переводы|perevody)(?:@Poker_dvatuza_bot)?$/i.test(command))return transferTemplate;
 if(/^(?:\/скрин(?:@Poker_dvatuza_bot)?\s+кассы|\/cash_screen(?:@Poker_dvatuza_bot)?)$/i.test(command))return {text:'Пришлите пожалуйста скрин кассы в приложении )',entities:[]};
 if(/^\/(?:ожидайте|wait)(?:@Poker_dvatuza_bot)?$/i.test(command))return {text:'Пожалуйста ожидайте 🙏',entities:[]};
 if(/^(?:\/крипта(?:@Poker_dvatuza_bot)?\s+кошел[её]к|\/crypto_wallet(?:@Poker_dvatuza_bot)?)$/i.test(command))return cryptoTemplate;
 if(/^\/(?:правила|rules)(?:@Poker_dvatuza_bot)?$/i.test(command))return rulesTemplate;
 if(/^\/(?:випки|vip)(?:@Poker_dvatuza_bot)?$/i.test(command))return {text:'Золото 1000р\nСеребро 800р\nНа месяц',entities:[]};
 return null;
}
module.exports={resolve,commands:[{command:'zapisat',description:'Записать — приход, перевод и бонусы'},{command:'ticket',description:'Заявка на билет — отправить шаблон игроку'},{command:'perevody',description:'Переводы между аккаунтами — отправить шаблон игроку'},{command:'cash_screen',description:'Скрин кассы — попросить у игрока'},{command:'wait',description:'Пожалуйста ожидайте 🙏'},{command:'crypto_wallet',description:'Крипта кошелёк — USDT TRC20 и инструкция'},{command:'rules',description:'Правила оплаты — отправить игроку'},{command:'vip',description:'Випки — стоимость на месяц'}]};
