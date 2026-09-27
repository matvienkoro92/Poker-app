# Hakas · independent premium scene layers

Generated with built-in imagegen on 27.09.2026. Reference: `assets/home-tournament-hakas-month-v2.webp`.

## Assets

- `assets/home-tournament-hakas-layered-v1.webp`: character, eagle and rebuilt ticket, with ХАКАС chest patch; no baked table or bonus objects.
- `assets/home-tournament-table-premium-v1.webp`: empty table with transparency.
- `assets/home-tournament-chip-green-v1.webp`: separate green chip and stack.
- `assets/home-tournament-chip-blue-v1.webp`: separate blue chip and stack.
- `assets/home-tournament-chip-red-v1.webp`: separate red chip and stack.
- `assets/home-tournament-chip-orange-v1.webp`: separate orange chip and stack.
- `assets/home-tournament-glove-premium-v1.webp`: separate glove trophy with blank plaque.

WebP quality 92, alpha quality 100. No upscaling. All labels, amounts and controls are live HTML. Each bonus uses its own image background and click target. The table is a separate scene pseudo-element. Only Hakas currently uses these layers.

## Character prompt

Rebuild this poker app scene in premium ultra crisp detailed 3D illustration. Same 4:5 composition, identity Hakas and eagle left, exact positions and scale of head hands LAST LONGER chip and blank orange red ticket. REMOVE the entire table and all four bonus chip stacks from bottom 41%: bottom 41% must be pure black empty background for separate table layer. Character ends naturally at waist at 60% height. Reconstruct ticket border perfectly smooth sharp luminous orange metal, crisp perforation dashes, no blur or messy doubled border. Preserve blank ticket and text space, no text there. Add beautifully legible gold embroidered Cyrillic name 'ХАКАС' on Hakas's upper right chest/shoulder leather panel below fur collar, visible beside chip. Improve fur leather and feathers with fine precise texture, no grunge cracks. Eagle stays left below ticket. Image dimensions high resolution portrait 4:5. No table, no foreground bonus chips, no glove.

## Table prompt

Premium poker table separate UI asset on true transparent background. Wide landscape 2.4:1 canvas. A single empty luxurious oval casino poker table viewed from seated player eye-level tilted slightly down, broad green felt surface visible, top rail shallow arc, front rail curved arc. Entire table fits canvas with 2% margin. Very fine emerald wool baize texture, immaculate supple black leather padded rail with precise gold stitching and thin polished champagne gold trim, subtle realistic studio highlights, high-end photoreal 3D rendering exquisitely sharp. No cracks, no distressed texture. No legs visible, no room, no people, no chips, no cards, no text, no logo. Felt occupies most of oval. Suitable compositing in front of seated character. Transparent outside silhouette, no opaque background. 2400px wide quality.

## Chip prompt (one call per color)

Single premium casino bonus chip UI asset, true transparent background, square canvas 800x800. One large upright circular poker chip resting atop a short neat stack of 4 matching chips, front-on face, slight perspective visible on the stack. Black ceramic and COLOR alternating edge inlays, fine metallic champagne gold rings, micro engraved edge detail, luxurious matte dark green blank center disk occupying 68% of upright chip diameter for later HTML text. Absolutely no text, symbols or numbers anywhere. Studio macro product rendering, crisp precise geometry, refined material texture, no plastic toy shine, no neon, no glow. Object centered fills 88% of image height and 82% width, all edges visible. Upright chip face center at 50% x 38% y. Soft tiny contact shadow, otherwise fully transparent. Same premium consistent collection design.

COLOR: emerald green / sapphire blue / ruby red / amber orange.

## Glove prompt

Single luxury boxing glove trophy separate UI asset on true transparent background. Square canvas. Front three-quarter view one upright black supple leather boxing glove, delicate champagne gold piping and fine gold embroidery of spade symbol, mounted on small elegant black marble and gold pedestal. Blank dark polished gold-rimmed horizontal plaque at base for later HTML text. Exquisite sharp studio product 3D render matching premium casino chip assets, fine stitching, restrained metallic highlights, realistic smooth leather grain no cracks no scratches no grunge. Object occupies 90% image height centered, full silhouette visible, small contact shadow. No text, no numbers, no background, no table, no other objects.

## Proportion adjustment

`assets/home-tournament-hakas-layered-v2.webp` reduces Hakas, his held chip and
his eagle while retaining the original ticket size and position. Built-in imagegen
edit of v1: shrink character to approximately 77% and eagle to 80%, preserve
identity, clothing, blank ticket, black background, no table or bonus objects.
Saved at native 1122×1402 as WebP quality 92 (150256 bytes).

The independent table keeps its geometry. Bonus boxes decrease from 23cqw to
17.5cqw and move inward to 17%, 33.5%, 50%, 66.5%, 83%, with top at 73%.
Live labels and the Last Longer hit area follow the resized art.

## Raised composition and readable knockout bonus

`home-tournament-hakas-layered-v3.webp` moves Hakas and the eagle upward about
5–6% of scene height while keeping their scale and the ticket geometry. Generated
as an imagegen edit of v2; native 1122×1402 WebP, quality 92, 143956 bytes.
The independent table moves from top 61% to 55%; bonuses move to 65% and return
to 21cqw for a fuller appearance and larger live lettering. The knockout reward
gets a separate legible gold-bordered label: «5 000 ₽ / Нокаут ПокерМанки».
The Last Longer hit area moves upward with the held chip.

## Restore the classic chip design

User clarified that the requested change was the chip appearance, not a larger
version of the ornate chips. `home-tournament-chips-classic-v1.webp` restores the
bright lime, blue, red and orange inserts with polished black bodies and a thin
gold inner ring, using `home-bonus-stacks-reference-v2.webp` as the imagegen
reference. Four evenly spaced cells, native 2172×724, WebP quality 92, no upscaling.
Each CSS cell is 3:4, so chip circles are not stretched. The generator returned an
opaque background despite the transparency request; the UI applies
`home-tournament-classic-chip-mask.svg` to each cell to reveal the table outside
the chip silhouette. Live labels remain HTML. Checked at 390px and 1000px with
3× device pixel ratio; knockout bonus still opens its 5000 ₽ conditions.

## Final felt placement

Classic chip cells were reduced from 19cqw to 17cqw, then another 10% to
15.3×20.4cqw. Centers are 17%, 33.5%, 50%, and 83%; tops 64%, 66%, 66.8%,
and 64% form a shallow arc. Live lettering scales with the chips. Soft radial
contact shadows render beneath the stacks outside the artwork mask. All stacks
remain on the felt with visible clearance from the padded rail.
