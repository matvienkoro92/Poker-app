# Sculpted wardrobe character

The live renderer is `scripts/garage-3d/character-sculpted-view.mjs`; its model is
built by `character-atelier.mjs`. `character-reconstruction.mjs` is a compatibility
export. The former front/rear/profile photograph projection is no longer used.

Anatomy is authored as implicit surfaces in `scripts/generate-character-sculpt.py`:
cranium and jaw, a facial mask with actual eye sockets and nostril cavities, and
joined hands with curved phalanges. Cloth is also sculpted: shoulder/sleeve junctions
and the trouser fork are continuous surfaces. Hidden limbs are omitted underneath
clothing, preventing fur from intersecting the garment. All surfaces bind to the
shared skeleton in `character-rig.mjs`. A restrained resting pose affects the arms
and head while keeping the legs and shoes planted.

The eight glasses families have real frames, lenses, bridges and temples. Five
headwear families are authored by `character-headwear.mjs`. Hairstyles attach to
the head, with separate tapered dreadlocks and textured fibers. Watches and rings
remain wrist/hand-bound. Necklaces use interlocked links; opening a helmet visor
reveals the actual facial mesh. Helmet shells conceal the ears.

The viewer uses a 30° perspective lens with framed orbit and wrist inspection.
Materials use physical scene lighting, ACES exposure, a studio reflection
environment and soft shadows. Fur has a tileable albedo and surface strands;
facial skin has an albedo and micro-normal detail. The original wardrobe artwork
is retained only as a transparent ink decal over the actual shirt. Sewing and
patch pockets conform to the cloth surface. Sewn hems replace the raw cloth edges
with matching clipping in the color and shadow passes. Sneakers have longitudinal lasts,
flat registration against layered rubber soles, eyelets, curved laces and stitching.

## Assets and reproducible authoring

Production meshes and textures live in
`assets/player-hall/character-3d/sculpt/`. The selected anatomy, tee and shorts use
less than 2.5 MB of raw mesh data. Other garments load when selected. Buffer data
are cached between wardrobe changes; each mounted instance owns its GPU geometry,
materials and textures and releases them on disposal.

To re-author the geometry, run the generator with Python and NumPy, then the
vendored meshoptimizer simplifier (1.3.0, MIT):

```sh
python3 scripts/generate-character-sculpt.py
node scripts/optimize-character-sculpt.mjs
npm run garage:3d
```

The generator also accepts mesh names to rebuild selected assets. For example:
`python3 scripts/generate-character-sculpt.py head face`. Ordinary app builds use
the saved binary assets and require neither Python nor a modelling application.
The simplifier keeps a relative error limit of 0.003, preserves normals and removes
zero-volume opposite triangle pairs before compacting buffers. See the
[meshoptimizer API](https://github.com/zeux/meshoptimizer/blob/master/js/README.md#simplifier).

The two albedo textures were produced with the built-in ImageGen tool. Exact
prompts, asset paths and geometry budgets are recorded in
[the asset manifest](../assets/player-hall/character-3d/sculpt/manifest.json).
Both selected textures are saved in this repository; no runtime external service
is required. `scripts/copy-to-public.js` explicitly includes dynamic mesh URLs and
albedo textures in the deployable build.

## Verification

```sh
node --test tests/character-volume.test.js tests/character-rig.test.js tests/character-hair.test.js tests/character-eyewear.test.js tests/wrist-watch.test.js tests/player-garage.test.js
node scripts/smoke-sculpted-character.cjs
node scripts/smoke-character-quality.cjs
```

`CHARACTER_LOOK` supplies a JSON loadout; `CHARACTER_LABEL` separates captured
variants. The studio smoke supports `CHARACTER_VIEWS=front,quarter,side,back`.
`CHARACTER_DETAIL=1` gives full-height captures in the mobile wardrobe smoke;
`CHARACTER_HD=1` uses the production pixel density of 2×;
`CHARACTER_SNAPSHOT=1` freezes animation and captures exact orbit angles using the
same production renderer. Leave it unset to exercise pointer dragging.
The production renderer's `snapshotOnly` state renders the same mesh/material
pipeline without running a continuous animation loop during studio inspection.

Checks cover actual anatomy and garment topology, normalized skin weights, camera
orbit and wrist focus restoration, body deformation, hidden-limb clipping, mobile
asset budgets, headwear attachment, helmet/visor behavior and resource disposal.
Always inspect front, three-quarter, side and rear images; passing tests alone is
not a visual quality gate.
