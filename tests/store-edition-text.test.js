'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { chipsJavaScript, chipsText } = require('../store-app/text');

test('store labels change without breaking recognition of legacy tournament amounts', () => {
  const source = 'const parse = text => text.match(/(\\d+)\\s*(?:₽|р\\.?)/i)[1]; const label = "125 ₽";';
  const result = vm.runInNewContext(chipsJavaScript(source) + '; ({legacy:parse("125 ₽"),chips:parse("125 ◉"),label})');
  assert.deepEqual({ ...result }, { legacy: '125', chips: '125', label: '125 ◉' });
});

test('store bonus description removes the old exchange claim', () => {
  const result = chipsText('Поменяйте через менеджера на беккинг-билеты от 300 ₽. 1 бонус = 1 рубль');
  assert.equal(result, 'Бонусы используются только внутри игры.');
});
