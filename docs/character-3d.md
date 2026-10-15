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
