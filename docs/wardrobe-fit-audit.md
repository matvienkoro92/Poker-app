# Wardrobe fit audit — 2026-10-17

The current mobile wardrobe uses the canvas renderer in `app-garage-catalog.js`
through `app-garage-workshop.js`. The audit targets that live path.

## Coverage

Every selectable catalog item, including locked items, is rendered on `bodySlim`,
`bodyNormal`, and `bodyBelly`. The current catalog has 151 choices across 11 groups:
30 tops, 20 bottoms, 19 footwear choices, 9 helmet choices, 13 hats, 13 hairstyles,
9 glasses, 15 watches, 12 necklaces, 7 rings, and 4 patches. Counts include the
relevant “none” choices. This produces 453 individual fittings.

Eight helmets are also rendered with closed visors and glasses equipped to check
occlusion. Eight complete outfits cover shorts with low footwear, suits with
formal trousers, winter clothing, hoodies with joggers, leather with a helmet,
cardigans, a bare torso with accessories, and tees with jeans. Those 48 additional
renders bring the audit to 501. This is individual-item coverage plus selected
interaction cases, not every possible combination of items.

Visual inspection covers shoulders, necklines, armholes, fabric silhouettes,
prints, cuffs, hands, hems, waistbands, ankle/footwear joins, face/ear occlusion,
headroom, glasses, necklaces, patches, watches, and rings. The mobile check covers
three physiques at 320×568, 390×844, and 440×956, plus watch/ring enlargement and
return to the full figure.

## Corrections

- Fit sleeves before expanding the torso, avoiding rectangular cuts into the
  flanks of belly-sized clothing.
- Normalize each source garment once, without retaining a second unscaled lower
  section. Preserve authored sleeve registration and cuff openings.
- Fit belly garment length from actual fabric alpha coverage, rather than from
  transparent image padding.
- Preserve calves above each footwear model's actual top edge; clearing a fixed
  rectangle detached low shoes from legs when wearing shorts.
- Use isolated watch art and a wrist-bound strap instead of photos containing a
  different hand and a black sleeve. The transparent carbon watch remains usable.
- Conceal bare ears beneath helmet shells.
- Bound the full-size character render cache to 12 entries during repeated fitting.

## Reproduction

- `npm run audit:wardrobe` generates labeled visual sheets and an asset-load manifest
  in `output/wardrobe-audit/current/`. Inspect the generated sheets; rendering alone
  does not establish visual correctness.
- `npm run smoke:wardrobe-fit` checks 16 belly garment boundary cases, all 42 watch
  placements, 54 shoe/calf joins, and 15 mobile layout/detail interactions.
- `SMOKE_URL=http://127.0.0.1:8766 node scripts/smoke-character-body-consistency.cjs`
  checks 90 top/body combinations for preserved hands, feet, and exposed legs.
  Supply a running local origin as appropriate.

The saved audit gallery is `output/wardrobe-audit/index.html`. These changes have
not been deployed.
