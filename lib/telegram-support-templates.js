'use strict';
const text='Пишите пожалуйста в\nОДНОМ СООБЩЕНИИ:\n\n▪️Название турнира\n▪️Время начала турнира по Московскому времени\n▪️Ваш Айди\n\nСумма списания = сумме входа в турнир\nМинимально списать можно 300 рублей\nОбменять можно только на билет\n\n🔺В другом виде заявку не приму🔻';
const template={text,entities:[{type:'bold',offset:text.indexOf('ОДНОМ СООБЩЕНИИ:'),length:'ОДНОМ СООБЩЕНИИ:'.length}]};
function resolve(message){return /^\/(?:ticket|билет)(?:@Poker_dvatuza_bot)?$/i.test(String(message?.text||'').trim())?template:null;}
module.exports={resolve,commands:[{command:'zapisat',description:'Записать — приход, перевод и бонусы'},{command:'ticket',description:'Заявка на билет — отправить шаблон игроку'}]};
