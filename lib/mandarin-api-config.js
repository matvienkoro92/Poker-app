'use strict';
const links = require('./mandarin-payment-links');
const names = ['MANDARIN_API_KEY','MANDARIN_API_KEY_2','MANDARIN_API_KEY_3'];
function configuredLinks(env) {
  return links.flatMap((link, index) => {
    const key = String(env[names[index]] || '').trim();
    return key ? [{link, key}] : [];
  });
}
module.exports = {configuredLinks};
