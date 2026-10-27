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
