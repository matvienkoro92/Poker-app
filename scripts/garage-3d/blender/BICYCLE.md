# Bicycle model and level upgrades

Build and inspect the model natively in Blender:

```sh
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup --python scripts/garage-3d/blender/build-bicycle.py
npm run garage:3d
node --test tests/bicycle-upgrades.test.js
node tests/bicycle-garage-browser.cjs
```

The only runtime model is `assets/garage/models/bicycle-v1.glb`; all variants
share this asset. Native checkpoints and eight base/upgraded inspection renders
live in `output/blender-bicycle/` and are not runtime downloads.

Parts are grouped under `bike__KIND__ID` nodes. The runtime toggles these groups
from the server-validated selection, and colors the `Bicycle frame` material.
The asset includes no image textures and is loaded only when a bike is displayed.

`app-bicycle-catalog.js` is the shared client/server authority for parts and levels.
Level 1 supplies the complete base bicycle. Levels 2–12 each unlock one upgrade.
Selections are stored under the hall's independent `bicycle` property; car and
clothing saves must preserve it, and bike saves must not touch their loadouts or
reserve a car number plate. Public showcases expose only verified bike choices.

Local interactive preview: `/output/bicycle-preview.html?level=1` or
`/output/bicycle-preview.html?level=12&upgraded=1`.
