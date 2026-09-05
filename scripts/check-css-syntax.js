#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { transformSync } = require("esbuild");
const root = path.resolve(__dirname, "..");
const files = fs.readdirSync(root).filter(name => name.endsWith(".css"));
let failures = 0;
for (const name of files) {
  const result = transformSync(fs.readFileSync(path.join(root, name), "utf8"), { loader: "css", sourcefile: name });
  for (const warning of result.warnings) {
    failures++;
    console.error(`${name}:${warning.location?.line || 1}: ${warning.text}`);
  }
}
if (failures) process.exitCode = 1;
else console.log(`CSS syntax passed: ${files.length} files, zero warnings.`);
