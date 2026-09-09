"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const vm = require("node:vm");

const MAX_BUNDLE_BYTES = 384 * 1024;

function bundleChat(output) {
  const htmlPath = path.join(output, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const tags = [...html.matchAll(/<script\b[^>]*>\s*<\/script>/g)].filter(([tag]) =>
    /\btype="application\/poker-lazy"/.test(tag) && /\bdata-poker-lazy-domain="chat"/.test(tag));
  if (!tags.length) throw new Error("No lazy chat scripts found for bundling");
  const groups = [];
  let group = { sources: [], code: "" };
  for (const [tag] of tags) {
    const match = tag.match(/\bsrc="\.\/([^"?]+)(?:\?[^" ]*)?"/);
    if (!match || !/^app-chat-[\w-]+\.js$/.test(match[1])) throw new Error("Unexpected chat script: " + tag);
    // Do not silently discard request attributes when replacing source tags.
    if (/\b(?:integrity|crossorigin|referrerpolicy)=/.test(tag)) throw new Error("Chat script has request attributes: " + match[1]);
    const name = match[1];
    const source = fs.readFileSync(path.join(output, name), "utf8");
    // A leading strict directive cannot safely be combined with legacy `with`
    // scripts. Keep such a migration explicit rather than changing semantics.
    if (/^\s*(?:(?:\/\*[\s\S]*?\*\/|\/\/[^\n]*)(?:\s*))*["']use strict["']/.test(source)) {
      throw new Error("Top-level strict chat script needs a separate bundle: " + name);
    }
    const part = ";\n/* " + name + " */\n" + source + "\n";
    if (group.sources.length && Buffer.byteLength(group.code + part) > MAX_BUNDLE_BYTES) {
      groups.push(group);
      group = { sources: [], code: "" };
    }
    group.sources.push(name);
    group.code += part;
  }
  groups.push(group);

  const bundles = groups.map((entry, index) => {
    const hash = crypto.createHash("sha256").update(entry.code).digest("hex").slice(0, 12);
    const file = `app-chat-bundle-${index + 1}-${hash}.js`;
    new vm.Script(entry.code, { filename: file });
    fs.writeFileSync(path.join(output, file), entry.code);
    return { file, bytes: Buffer.byteLength(entry.code), sources: entry.sources };
  });
  const replacements = bundles.map(({ file }) =>
    `<script type="application/poker-lazy" data-poker-lazy-domain="chat" src="./${file}"></script>`).join("\n    ");
  let bundledHtml = html;
  // Replace from the end so offsets still refer to the original HTML.
  for (let i = tags.length - 1; i >= 0; i--) {
    const tag = tags[i];
    bundledHtml = bundledHtml.slice(0, tag.index) + (i === 0 ? replacements : "") + bundledHtml.slice(tag.index + tag[0].length);
  }
  fs.writeFileSync(htmlPath, bundledHtml);
  fs.writeFileSync(path.join(output, "chat-bundles.json"), JSON.stringify({ sourceCount: tags.length, bundles }, null, 2) + "\n");
  return { sourceCount: tags.length, bundleCount: bundles.length, bytes: bundles.reduce((sum, entry) => sum + entry.bytes, 0) };
}

module.exports = { bundleChat };
