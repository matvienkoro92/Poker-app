#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { transform, build } = require("esbuild");
const vm = require("node:vm");
const { bundleChat } = require("./bundle-chat");
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
  // Inline the startup stylesheet's imports in their original cascade order.
  // Asset URLs stay relative to public/, just as in the source stylesheets.
  const startupCss = await build({
    entryPoints: [path.join(output, "styles.css")],
    outfile: path.join(output, "styles.css"),
    bundle: true,
    write: false,
    allowOverwrite: true,
    minifyWhitespace: true,
    minifyIdentifiers: false,
    minifySyntax: false,
    legalComments: "inline",
    plugins: [{
      name: "keep-css-asset-urls",
      setup(builder) {
        builder.onResolve({ filter: /.*/ }, (args) =>
          args.kind === "url-token" ? { path: args.path, external: true } : undefined);
      },
    }],
  });
  if (startupCss.warnings.length) throw new Error(startupCss.warnings.map(w => w.text).join("; "));
  fs.writeFileSync(path.join(output, "styles.css"), startupCss.outputFiles[0].contents);
  // Discover remaining eager styles without fetching styles for unopened views.
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
  console.log("Chat bundles:", JSON.stringify(bundleChat(output)));
  console.log(JSON.stringify({ minifiedMiB: +(before / 1048576).toFixed(2), resultMiB: +(after / 1048576).toFixed(2), savedMiB: +((before - after) / 1048576).toFixed(2) }));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
