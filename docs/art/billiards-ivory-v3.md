# Clean billiards room and club slippers

Created with built-in `image_gen.imagegen` on 2026-10-22.

Production assets:
- `assets/player-hall/billiards-table-ivory-v3.webp`: new room generation, lossless WebP at native resolution; used by the ivory table skin.
- `assets/player-hall/billiards-club-slippers-v2.png`: new transparent slippers with the existing club embroidery. Rendered with `object-fit:contain` to preserve proportions.

Previous assets remain available. Other table skins keep their own artwork.

## Final room prompt

Generate a BRAND NEW 2048x2560 portrait photoreal architectural photograph for a luxury billiards room game background. Maximum native resolution. NOT painterly, no depth of field blur: entire room, outdoor sea and foreground equally tack sharp using architectural focus stacking. Composition: dark wood coffered ceiling and brass pendant lamp at top center; panoramic sliding glass wall behind table reveals tropical palms, turquoise infinity swimming pool, two adult women reclining on loungers and perfectly sharp ocean waves, sunset clouds, crisp horizon. Burgundy leather lounge sofas at left; dark wood bar with stools, shelves and vertical cue rack at right. Centered ivory white and polished gold billiard table, view from front looking slightly down, professional pristine uniform teal cloth with almost invisible fine even weave (no dirty patches, no mottling), accurate crisp perfectly round colorful pool balls neatly clustered near far end, one white cue ball lower middle. Table playsurface occupies quadrilateral top edge from (35%,42%) to (65%,42%), near edge (23%,58%) to (77%,58%), ivory front apron below, two ornate ivory gold front legs extend to y82%. Six correct black leather pockets: four corners and two side midpoints only. Rails are ivory and gold with sharply resolved straight edges and diamond markers. Front floor from y82% down absolutely immaculate smooth uniform dark grey polished porcelain slabs, NO VEINING, NO MARBLE PATTERNS, NO PEBBLES, NO mottling or dirty cloudy patches: just clean flat dark grey slabs, fine straight gold-grey tile joints, elegant controlled clean reflections of warm lights. Floor sides also same immaculate plain material. Premium interior architectural photography, physically precise sharp materials, high microcontrast without halos, crystal clear outdoor view. No slippers (separate layer will be added), no cue leaning on table, no people inside room, no UI, no buttons, no text, no watermark.

## Final slippers prompt

Use case: product-mockup. Create a new photoreal pair of NORMAL hotel spa open toe slippers, isolated on truly transparent background. Reference image is ONLY the exact embroidery logo reference: preserve round red and black dragons with two ace cards and gold Cyrillic text '2 туза'. Change silhouette completely to normal slim elongated hotel slippers: two matching human-foot-sized left and right slippers side by side parallel with slight natural splay, full heels and toes visible, realistic proportions, thin flexible soles, emerald velvet, a single soft fabric vamp strap across each forefoot, understated gold piping, toe openings and visible insoles. Avoid enormous wide bulbous straps, chunky slides or cropped toes. Camera looking down at 45 degrees matching floor-view architectural scene. Feet point toward bottom of frame, heels toward top. Match normal hotel slipper proportions length about 2.6 times width per slipper. Small tasteful exact club embroidery centered on vamp, logo takes half vamp width, not huge. Both slippers are same size, no feet. Exceptionally sharp seams and embroidery, clean dark green velvet, warm interior light from above. Entire pair fits comfortably inside canvas with clear transparent margin all round. No floor or backdrop, no extra text except '2 туза' under logo.

## All table backgrounds, 2026-10-23

The earlier ivory-only update left embedded slippers in every other room image.
The separate branded slippers then overlapped that original pair. Every skin now
references its own `billiards-table-<id>-v3.webp`, including the default fallback
and the bundled standalone game. Each background has an empty floor; the shared
cue preview adds exactly one pair of branded slippers. Existing skin IDs and
level unlocks remain unchanged.

For each original room, imagegen received the original skin image and the clean
carbon-v3 floor reference, with instructions to preserve its table design, felt
color, geometry, room framing and furniture; remove all footwear; replace the
patterned floor with plain clean dark grey porcelain tiles; sharpen the ocean,
palms, balls, rails and cloth. The carbon image used the clean ivory-v3 floor as
its reference. Generated PNG sources are converted to lossless WebP.
