#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { transform } = require("esbuild");
const vm = require("node:vm");
const output = path.join(__dirname, "..", "public");
async function main() {
  let before = 0, after = 0;
  for (const name of fs.readdirSync(output)) {
    if (!/^(?:app.*\.js|styles.*\.css)$/.test(name)) continue;
    const file = path.join(output, name);
    const source = fs.readFileSync(file, "utf8");
    // esbuild can duplicate block functions inside legacy `with` scopes.
    // Keep those scripts intact and validate the actual executable output.
    if (name.endsWith(".js") && /\bwith\s*\(/.test(source)) {
      new vm.Script(source, { filename: name });
      before += Buffer.byteLength(source);
      after += Buffer.byteLength(source);
      continue;
    }
    const result = await transform(source, {
      loader: name.endsWith(".css") ? "css" : "js",
      minifyWhitespace: true, minifyIdentifiers: false, minifySyntax: false,
      legalComments: "inline", sourcefile: name,
    });
    if (result.warnings.length) throw new Error(name + ": " + result.warnings.map(w => w.text).join("; "));
    if (name.endsWith(".js")) new vm.Script(result.code, { filename: name });
    const inputBytes = Buffer.byteLength(source);
    const outputBytes = Buffer.byteLength(result.code);
    before += inputBytes;
    // Keep a smaller original, and never rename globals or reorder CSS layers.
    if (outputBytes < inputBytes) fs.writeFileSync(file, result.code);
    after += Math.min(inputBytes, outputBytes);
  }
  // Discover imported CSS before the entry stylesheet arrives, without changing
  // legacy file boundaries or cascade order.
  const imports = new Set();
  function collectCss(name) {
    const source = fs.readFileSync(path.join(output, name), "utf8");
    for (const match of source.matchAll(/@import\s*(?:url\(\s*)?["'](\.\/[^"']+)["']/g)) {
      if (imports.has(match[1])) continue;
      imports.add(match[1]);
      collectCss(match[1].slice(2).split("?")[0]);
    }
  }
  collectCss("styles.css");
  const htmlPath = path.join(output, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const match of html.matchAll(/<link rel="stylesheet" href="(\.\/styles[^" ]+\.css(?:\?[^" ]+)?)"/g)) imports.add(match[1]);
  collectCss("styles-tournament.css");
  const preloads = [...imports].map(href => '<link rel="preload" as="style" href="' + href + '">').join("");
  fs.writeFileSync(htmlPath, fs.readFileSync(htmlPath, "utf8").replace('<link rel="stylesheet" href="./styles.css', preloads + '<link rel="stylesheet" href="./styles.css'));
  console.log(JSON.stringify({ minifiedMiB: +(before / 1048576).toFixed(2), resultMiB: +(after / 1048576).toFixed(2), savedMiB: +((before - after) / 1048576).toFixed(2) }));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
