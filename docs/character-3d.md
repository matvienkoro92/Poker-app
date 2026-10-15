# Wardrobe character

The browser character is assembled by `scripts/garage-3d/character-reconstruction.mjs`.
A shared 29-bone skeleton (`character-rig.mjs`) binds anatomy, clothing, hands,
fingers and sneakers using normalized, blended weights. Wrist accessories attach
to bones while preserving their rest-pose positions. Idle movement eases to the
rest pose during drag, watch inspection and reduced-motion mode; feet remain planted.

The original wardrobe canvas supplies the front appearance. The existing rear
and profile assets remain texture sources; unseen surfaces receive garment color,
fabric shading and authored geometry. This remains an approximation of unseen
anatomy, rather than a scanned character. `character-tailoring.mjs` supplies lapels,
pockets, seams, tongue panels and laces. Sneakers have separate beveled soles;
shirt cuffs are separate wrist-bound meshes for jacket outfits.

Run `npm run garage:3d` after editing the modules. Relevant checks:
`node --test tests/character-volume.test.js tests/character-rig.test.js tests/wrist-watch.test.js tests/player-garage.test.js`.

Open limbs use smooth anatomical sections without garment folds. Side fur and
hand colors are authored rather than projecting narrow photograph strips around
the limb. Low-top sneakers use a shallow vamp joined to the ankle; laces follow
that surface. Front lapels come from the wardrobe texture to avoid duplicate
flat panels over the garment. `scripts/smoke-character-quality.cjs` renders the
mobile editor in a T-shirt and shorts from the front and side.

Fur shading uses continuous object-space noise, blended into the front portrait;
forearms have authored elbow, muscle and wrist sections. Finger tips curve toward
the palm. The quality smoke captures front, three-quarter, side and back views.

`character-shape.mjs` deforms the torso, abdomen, arms and legs for all five
body choices before skin binding, while keeping footwear registration fixed.
`character-hair.mjs` creates head-bound volumes for selected hairstyles; the
head shader removes the old painted crown and rear hair. Natural hair retains
the portrait texture, and headgear suppresses the additional hair volumes.
The quality smoke accepts `CHARACTER_LOOK` (JSON) and `CHARACTER_LABEL` for
comparing body and hair choices without overwriting other captured variants.
