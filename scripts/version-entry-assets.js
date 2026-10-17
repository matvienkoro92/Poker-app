'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

// Browser HTTP caches outlive Cache Storage. Give each entry asset a URL that
// changes with its published bytes, including scripts with manually dated URLs.
function versionEntryAssets(html, output) {
  return html.replace(/\b(src|href)=(['"])(\.\/([^'"?#/]+\.(?:js|css)))(?:\?([^'"#]*))?\2/g, (tag, attr, quote, url, name, query) => {
    const file = path.join(output, name);
    if (!fs.existsSync(file)) return tag;
    const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16);
    const params = new URLSearchParams(query || '');
    params.set('v', hash);
    return attr + '=' + quote + url + '?' + params.toString() + quote;
  });
}
module.exports = { versionEntryAssets };
