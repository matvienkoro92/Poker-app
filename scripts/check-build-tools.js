#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createRequire } = require("node:module");
const { execFileSync } = require("node:child_process");
const assetsRequire = createRequire(require.resolve("@capacitor/assets"));
const cliRequire = createRequire(assetsRequire.resolve("@capacitor/cli"));
const root = fs.mkdtempSync(path.join(os.tmpdir(), "poker-build-tools-"));
(async () => {
  try {
    const sharp = assetsRequire("sharp");
    fs.mkdirSync(path.join(root, "assets"));
    fs.mkdirSync(path.join(root, "android/app/src/main/res"), { recursive: true });
    await sharp({ create: { width: 1024, height: 1024, channels: 4, background: "#f0b840" } }).png().toFile(path.join(root, "assets/icon-only.png"));
    const bin = path.resolve(__dirname, "../node_modules/.bin/capacitor-assets");
    execFileSync(bin, ["generate", "--android"], { cwd: root, stdio: "pipe", timeout: 60000 });
    const res = path.join(root, "android/app/src/main/res");
    const generated = fs.readdirSync(res).flatMap(dir => fs.readdirSync(path.join(res, dir)).map(file => path.join(res, dir, file))).filter(file => file.endsWith(".png"));
    assert.equal(generated.length, 12, "Android icon generation must finish, not silently return an error");
    for (const file of generated) assert.ok((await sharp(file).metadata()).width > 0);
    const project = require("xcode").project(path.join(root, "test.pbxproj"));
    project.hash = { project: { objects: {} } };
    assert.match(project.generateUuid(), /^[A-F0-9]{24}$/);
    const tar = cliRequire("tar");
    await tar.c({ file: path.join(root, "icons.tar"), cwd: root }, ["assets"]);
    fs.mkdirSync(path.join(root, "unpacked"));
    await tar.x({ file: path.join(root, "icons.tar"), cwd: path.join(root, "unpacked") });
    assert.deepEqual(fs.readFileSync(path.join(root, "unpacked/assets/icon-only.png")), fs.readFileSync(path.join(root, "assets/icon-only.png")));
    console.log("Build tools passed: 12 Android icons, image decoding, xcode UUID and tar round trip.");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
})().catch(error => { console.error(error); process.exitCode = 1; });
