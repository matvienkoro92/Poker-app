const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const { bundleChat } = require("../scripts/bundle-chat");

const root = path.join(__dirname, "..");

function fixture(t, files, html) {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), "poker-chat-bundles-"));
  t.after(() => fs.rmSync(output, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(output, name), content);
  fs.writeFileSync(path.join(output, "index.html"), html);
  return output;
}

function tag(name) {
  return `<script type="application/poker-lazy" data-poker-lazy-domain="chat" src="./${name}?v=1"></script>`;
}

test("bundles retain shared globals and legacy with scopes, and hash changes invalidate cached URLs", t => {
  const html = tag("app-chat-first.js") + '<script defer src="./app-other.js"></script>' + tag("app-chat-second.js");
  const output = fixture(t, {
    "app-chat-first.js": "var result = []; var scope = {value: 7}; result.push(1)",
    "app-chat-second.js": "(function () { with (scope) { result.push(value); } })();",
  }, html);
  bundleChat(output);
  const manifest = JSON.parse(fs.readFileSync(path.join(output, "chat-bundles.json")));
  const ctx = vm.createContext({});
  for (const bundle of manifest.bundles) vm.runInContext(fs.readFileSync(path.join(output, bundle.file), "utf8"), ctx);
  assert.equal(JSON.stringify(ctx.result), "[1,7]");
  const builtHtml = fs.readFileSync(path.join(output, "index.html"), "utf8");
  assert.ok(builtHtml.includes('<script defer src="./app-other.js"></script>'));
  assert.ok(builtHtml.includes(tag(manifest.bundles[0].file).replace("?v=1", "")));
  assert.ok(!builtHtml.includes('src="./app-chat-first.js'));
  fs.writeFileSync(path.join(output, "app-chat-first.js"), "var result = []; var scope = {value: 8}; result.push(1)");
  fs.writeFileSync(path.join(output, "index.html"), html);
  bundleChat(output);
  const updated = JSON.parse(fs.readFileSync(path.join(output, "chat-bundles.json")));
  assert.notEqual(updated.bundles[0].file, manifest.bundles[0].file);
});

test("real chat bundles preserve every source, initialization value and global function", t => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const names = [...html.matchAll(/<script\b[^>]*data-poker-lazy-domain="chat"[^>]*src="\.\/([^"?]+)[^"]*"[^>]*>/g)].map(m => m[1]);
  const files = Object.fromEntries(names.map(name => [name, fs.readFileSync(path.join(root, name), "utf8")]));
  const output = fixture(t, files, html);
  bundleChat(output);
  const manifest = JSON.parse(fs.readFileSync(path.join(output, "chat-bundles.json")));
  assert.deepEqual(manifest.bundles.flatMap(bundle => bundle.sources), names);
  assert.ok(manifest.bundles.length <= 6);
  function initialized(scripts) {
    const ctx = { addEventListener() {}, document: { addEventListener() {} } };
    ctx.window = ctx;
    vm.createContext(ctx);
    for (const name of scripts) vm.runInContext(fs.readFileSync(path.join(output, name), "utf8"), ctx, { filename: name });
    return Object.fromEntries(Object.keys(ctx).filter(key => key !== "window").sort().map(key => [
      key, typeof ctx[key] === "function" ? String(ctx[key]) : JSON.stringify(ctx[key]),
    ]));
  }
  assert.deepEqual(initialized(manifest.bundles.map(bundle => bundle.file)), initialized(names));
});

test("a new top-level strict script fails the build instead of changing legacy semantics", t => {
  const output = fixture(t, { "app-chat-strict.js": '/* strict module */\n"use strict"; var value = 1;' }, tag("app-chat-strict.js"));
  assert.throws(() => bundleChat(output), /Top-level strict/);
});
