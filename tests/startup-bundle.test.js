const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const { bundleStartup } = require("../scripts/bundle-startup");

function fixture(t) {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), "poker-startup-bundle-"));
  t.after(() => fs.rmSync(output, { recursive: true, force: true }));
  const files = Array.from({ length: 12 }, (_, i) => "app-pwa-auth-part-" + i + ".js");
  files.forEach((name, i) => fs.writeFileSync(path.join(output, name), i === 0 ? "var calls = [0];\nfunction getCalls() { return calls; }" : "calls.push(" + i + ")"));
  const html = '<script defer src="./before.js"></script>\n' + files.map(name => '<script defer src="./' + name + '?v=1"></script>').join("\n") + '\n<script defer src="./after.js"></script>';
  fs.writeFileSync(path.join(output, "index.html"), html);
  return { output, files, html };
}

test("startup bundle retains global scope, ordered initialization, surrounding scripts and cache invalidation", t => {
  const { output, files, html } = fixture(t);
  const result = bundleStartup(output);
  const context = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(output, result.file), "utf8"), context);
  assert.deepEqual(Array.from(context.getCalls()), Array.from({ length: 12 }, (_, i) => i));
  assert.deepEqual(result.sources, files);
  const built = fs.readFileSync(path.join(output, "index.html"), "utf8");
  assert.ok(built.indexOf("before.js") < built.indexOf(result.file));
  assert.ok(built.indexOf(result.file) < built.indexOf("after.js"));
  assert.equal([...built.matchAll(/<script /g)].length, 3);
  fs.appendFileSync(path.join(output, files[11]), ";calls.push(12);");
  fs.writeFileSync(path.join(output, "index.html"), html);
  assert.notEqual(bundleStartup(output).file, result.file);
});

test("startup bundle rejects intervening code and script-specific semantics", t => {
  const { output, files, html } = fixture(t);
  fs.writeFileSync(path.join(output, "index.html"), html.replace('?v=1"></script>\n', '?v=1"></script><script>run();</script>\n'));
  assert.throws(() => bundleStartup(output), /contiguous/);
  fs.writeFileSync(path.join(output, "index.html"), html);
  fs.writeFileSync(path.join(output, files[1]), '"use strict"; calls.push(1);');
  assert.throws(() => bundleStartup(output), /semantics/);
  fs.writeFileSync(path.join(output, files[1]), "calls.push(document.currentScript.src);");
  assert.throws(() => bundleStartup(output), /semantics/);
});
