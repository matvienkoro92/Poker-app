'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const art = require('../lib/raffle-announcement-art');
test('announcement card uses live prize amounts, access, participants and deadline', async () => {
 const raffle = {prizeKind:'tournament_ticket',groups:[{count:30,prize:'Беккинг-билет 500 ₽ — Нокаут (18:00)',accessLevel:10}],participantsCount:7,endDate:'2026-11-06T14:00:00Z'};
 const now = Date.parse('2026-11-06T12:04:41Z'), card = art.cardData(raffle, now);
 assert.equal(card.amount,'15 000 ₽');assert.equal(card.access,'Доступ: уровень 10+');assert.equal(card.participants,7);assert.equal(card.countdown,'01:55:19');
 const svg = art.svgFor(raffle, now);
 assert.match(svg,/500 ₽<\/text>/);assert.doesNotMatch(svg,/>₽<\/text>/);
 const buffer = await art.render(raffle, now), meta = await require('sharp')(buffer).metadata();
 assert.equal(meta.format,'jpeg');assert.equal(meta.width,900);assert.ok(buffer.length < 1000000);
});
test('cash and mixed prize groups are totaled without inventing unknown values', () => {
 assert.equal(art.cardData({prizeKind:'cash',groups:[{count:7,prize:'1000'},{count:15,prize:'200'}]}).amount,'10 000 ₽');
 assert.equal(art.cardData({groups:[{count:1,prize:'Сюрприз'}]}).amount,'Розыгрыш');
 assert.equal(art.cardData({groups:[],endDate:'invalid'}).countdown,'Скоро');
 assert.equal(art.cardData({groups:[{count:1,prize:'500 ₽',accessLevel:10},{count:2,prize:'200 ₽',accessLevel:1}]}).access,'Доступ: уровень 1+ · по группам');
});
