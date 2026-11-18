"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const vm = require("node:vm");

// Only this contiguous, ordered group is combined. Keep global declarations and
// script order intact; do not wrap classic scripts in module/IIFE scopes.
function bundleGroup(output, pattern, expected, label) {
  const htmlPath = path.join(output, "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");
  const tags = [...html.matchAll(pattern)];
  if (tags.length !== expected) throw new Error("Review " + label + " bundle: expected " + expected + " scripts");
  const first = tags[0].index;
  const last = tags.at(-1).index + tags.at(-1)[0].length;
  let gap = html.slice(first, last);
  for (const tag of tags) gap = gap.replace(tag[0], "");
  if (gap.trim()) throw new Error(label + " scripts must remain contiguous");
  const sources = tags.map(tag => tag[1]);
  const code = sources.map(name => {
    const source = fs.readFileSync(path.join(output, name), "utf8");
    if (/^\s*(?:(?:\/\*[\s\S]*?\*\/|\/\/[^\n]*)(?:\s*))*["']use strict["']/.test(source) || /document\.currentScript/.test(source)) {
      throw new Error("Review classic script semantics before bundling " + name);
    }
    return ";\n/* " + name + " */\n" + source + "\n";
  }).join("");
  const hash = crypto.createHash("sha256").update(code).digest("hex").slice(0, 12);
  const file = "app-" + label + "-bundle-" + hash + ".js";
  new vm.Script(code, { filename: file });
  fs.writeFileSync(path.join(output, file), code);
  html = html.slice(0, first) + '<script defer src="./' + file + '"></script>' + html.slice(last);
  fs.writeFileSync(htmlPath, html);
  const result = { file, sources, bytes: Buffer.byteLength(code), sourceCount: sources.length, bundleCount: 1 };

  return result;
}

function bundleStartup(output) {
  const auth = bundleGroup(output, /<script defer src="\.\/(app-pwa-auth(?:-[\w-]+)?\.js)(?:\?[^" ]*)?"><\/script>/g, 12, "auth");
  fs.writeFileSync(path.join(output, "startup-bundles.json"), JSON.stringify(auth, null, 2) + "\n");
  return auth;
}

function bundleHome(output) {
  const home = /<script defer src="\.\/(app-(?:home-(?:planner-access|planner-runtime|planner|tasks|widgets-bootstrap|deeplinks|club-info-modals|vpn-proxy-modal|gazette-comments|gazette-tasks)|tournament-(?:day|history-data|history|share))\.js)(?:\?[^" ]*)?"><\/script>/g;
  const shell = /<script defer src="\.\/(app-(?:shell-layout|navigation-scroll|html-fragments|webview-keyboard)\.js)(?:\?[^" ]*)?"><\/script>/g;
  return [bundleGroup(output, home, 14, "home"), bundleGroup(output, shell, 4, "layout")];
}
module.exports = { bundleStartup, bundleHome };
