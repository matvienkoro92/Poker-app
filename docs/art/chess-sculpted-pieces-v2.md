# Sculpted chess collections v2

The four level-one SVG sets remain unchanged. Staunton, Arabesque, Crystal and Regalia now use generated sculptural artwork. New sets: `roman-revolt` (level 20) and `prison-wardens` (level 35).

Each collection has 12 independent 256×256 alpha WebP sprites, one for each type and side. King/queen/bishop/knight/rook/pawn retain different heights and a shared baseline. `collectionPiece()` is shared by live play, collection cards and the villa board preview. No live 3D renderer or animated image filters are used.

Original generated sheets are kept in `output/imagegen/chess-pieces-v2/`. Prepare sprites using `node scripts/board-games/prepare-sculpted-pieces.cjs <style> ...`, then regenerate SVG preview wrappers and bundle the board game and villa preview. The sheets have six equal columns (k,q,b,n,r,p) and two rows (white, black). Sprite preparation preserves alpha and adds safe padding.

Visual references researched (not copied as shipped artwork):
- https://chessthegame.com/product/the-gladiator-chess/
- https://en.le-palais-des-echecs.com/products/resin-chess-set-romans-vs-gladiators/
- https://www.chess-collection.de/pow-chess-set--belgium--1944

All shipped sculpture images are original imagegen outputs. Collection IDs and level gates are validated in `lib/chess-equipment.js`; multiplayer still uses the creator's server-validated equipment snapshot.

## Carved board frames v3

The Celtic oak, ebony dragons and royal rosewood frames were generated as original transparent relief artwork. Source sheets: `output/imagegen/chess-frames-v3/`. Optimized frame textures and measured opening bounds live in `assets/board-games/chess/sculpted-frames-v3/`. The board generator maps eight frame sections around a mathematically exact 8×8 field (central 75%); the self-contained SVG embeds its texture once. This keeps CSS border rendering and villa previews aligned.

References researched for wood carving and motifs:
- https://lionlaurel.com/products/chess-set-square-wooden-design-with-bronze-legs-1
- https://www.etsy.com/listing/1735449332/premium-fire-dragons-chess-board-carved

## Mobile silhouette sizing

The sprite preparation script normalizes each role to an explicit silhouette box before adding 256×256 padding: king 160×232, queen 156×220, bishop 144×202, knight 178×204, rook 154×180 and pawn up to 124×174 (fit inside, preserving source aspect ratio). This intentionally gives sculptures broader bases at small sizes and separates pawns from bishops. All feet share y=240. Live squares, equipment previews and living-room previews use an 86% SVG box, leaving a 7% gutter on all four sides. The broader normalized silhouettes keep carved sets readable inside this gutter. Rebuild all six collections together after changing these dimensions.

Use `--pawns-only` with the six style names to rebuild just the pawn sprites without touching the other roles. Pawn alpha bounds are measured after resizing; centering and the y=240 baseline use the actual resized dimensions.

Carved sets use a static radial contact shadow at the shared y=240 foot line, with role-specific width and a narrow contact core. A 0.35 CSS-pixel silhouette shadow adds a restrained edge on both square colors. Shadows remain within the existing SVG and cell gutters; there is no animation or render loop.
