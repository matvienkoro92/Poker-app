#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const { chipsText, chipsJavaScript } = require('../store-app/text');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'output', 'store-release');
const staging = path.join(output, 'source');
const workspace = path.join(output, 'native');
const web = path.join(workspace, 'www');
fs.mkdirSync(staging, { recursive: true });
fs.mkdirSync(path.join(staging, 'scripts'), { recursive: true });
// Existing static-copy workflow runs against a staging directory, never public/.
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(?:html|css|js|mjs|json)$/.test(entry.name)) continue;
  fs.copyFileSync(path.join(root, entry.name), path.join(staging, entry.name));
}
for (const dir of ['assets', 'html-fragments', 'starting-hands', 'api', 'lib']) {
  const target = path.join(staging, dir);
  if (!fs.existsSync(target) && fs.existsSync(path.join(root, dir))) fs.symlinkSync(path.join(root, dir), target, 'dir');
}
fs.copyFileSync(path.join(root, 'scripts/copy-to-public.js'), path.join(staging, 'scripts/copy-to-public.js'));
const result = spawnSync(process.execPath, [path.join(staging, 'scripts/copy-to-public.js')], { encoding: 'utf8' });
if (result.status !== 0) throw new Error(result.stderr || result.stdout);
fs.mkdirSync(workspace, { recursive: true });
fs.rmSync(web, { recursive: true, force: true });
fs.renameSync(path.join(staging, 'public'), web);
fs.rmSync(path.join(web, 'downloads'), { recursive: true, force: true });
const blockedViews = ['cashout', 'admin-bonuses', 'player-crm', 'video-lessons', 'learn-play-hub'];
const report = { builtAt: new Date().toISOString(), filesChanged: [], binaryAssets: [],
  blockedViews, websiteModified: false, blockers: [] };
function walk(dir, visitor) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, visitor); else visitor(file);
  }
}
walk(web, file => {
  const rel = path.relative(web, file);
  if (!/\.(?:html|js|mjs|css|json|svg|webmanifest)$/i.test(file)) {
    report.binaryAssets.push(rel); return;
  }
  const old = fs.readFileSync(file, 'utf8');
  let text = /\.(?:js|mjs)$/.test(file) ? chipsJavaScript(old) : chipsText(old);
  if (rel === 'app-view-router.js') {
    const signature = 'function setView(viewName, navOpts) {';
    if (!text.includes(signature)) throw new Error('Store router hook not found');
    text = text.replace(signature, signature + '\n  if (' + JSON.stringify(blockedViews) + '.includes(viewName)) viewName = "home";');
  }
  if (rel === 'index.html') {
    text = text.replace('<head>', '<head>\n    <script src="./store-text.js"></script>\n    <script src="./store-runtime.js"></script>');
    text = text.replace(/<div id="app"/, '<div data-store-edition="chips" id="app"');
    text = text.replace('<div class="view view--active" data-view="home">', '<div class="view view--active" data-view="home"><p class="store-chip-legend">◉ — игровые фишки</p>');
    text = text.replace('</head>', '<style>.store-chip-legend{margin:4px 0 8px;color:#d9bd83;font:12px/1.4 system-ui;text-align:center}</style></head>');
  }
  if (text !== old) { fs.writeFileSync(file, text); report.filesChanged.push(rel); }
});
// Do not package the old cash-desk screen or its manager links.
fs.writeFileSync(path.join(web, 'html-fragments/cashout.html'), '<div class="view" data-view="cashout"></div>\n');
fs.copyFileSync(path.join(root, 'store-app/text.js'), path.join(web, 'store-text.js'));
fs.copyFileSync(path.join(root, 'store-app/runtime.js'), path.join(web, 'store-runtime.js'));
const sanitize = spawnSync(process.execPath, [path.join(root, 'scripts/sanitize-store-html.js')], { encoding: 'utf8' });
if (sanitize.status !== 0) throw new Error(sanitize.stderr || sanitize.stdout);
console.log(sanitize.stdout.trim());
const config = { appId: 'club.twoaces.app', appName: 'Два туза', webDir: 'www',
  server: { androidScheme: 'https' }, android: { backgroundColor: '#030407', allowMixedContent: false } };
fs.writeFileSync(path.join(workspace, 'capacitor.config.json'), JSON.stringify(config, null, 2) + '\n');
const nativePackage = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
nativePackage.scripts = { 'android:sync': 'cap sync android', 'android:apk': 'cd android && ./gradlew assembleRelease',
  'android:aab': 'cd android && ./gradlew bundleRelease', 'ios:sync': 'cap sync ios' };
fs.writeFileSync(path.join(workspace, 'package.json'), JSON.stringify(nativePackage, null, 2) + '\n');
if (!fs.existsSync(path.join(workspace, 'node_modules'))) fs.symlinkSync(path.join(root, 'node_modules'), path.join(workspace, 'node_modules'), 'dir');
if (!fs.existsSync(path.join(workspace, 'android'))) fs.cpSync(path.join(root, 'android'), path.join(workspace, 'android'), {
  recursive: true, filter: src => !['build', '.gradle', 'local.properties'].includes(path.basename(src))
});
report.blockers.push('Review raster artwork and historical screenshots for currency text; text conversion does not edit pixels.');
report.blockers.push('Verify authenticated chip-only API behavior, account deletion, and external links before submitting.');
report.blockers.push('Review remaining editorial content and remotely loaded images, including historical rating prizes.');
report.blockers.push('Store accounts, release signing, Android SDK/JDK and iOS toolchain are required for submission.');
report.indexSha256 = crypto.createHash('sha256').update(fs.readFileSync(path.join(web, 'index.html'))).digest('hex');
fs.writeFileSync(path.join(output, 'build-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ output: workspace, convertedFiles: report.filesChanged.length, rasterAssetsForReview: report.binaryAssets.length, readyForSubmission: false }, null, 2));
