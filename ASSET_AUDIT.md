# Asset Audit

## 2026-04-29

Removed:

- `assets/rat_2.mov` — 7.3 MB, unused.

Build guard:

- `scripts/copy-to-public.js` skips `.mov` files when copying `assets/` into `public/assets/`.

Current large assets in `assets/`:

- `download-hero.png` — 5.5 MB, 2048x2048. It is now lazy-loaded and no longer preloaded from `index.html`.
- `plasterer-sad.png` — 2.3 MB.
- `plasterer-happy.png` — 2.1 MB.
- `prilozhenie-k-obucheniyu.pdf` — 1.2 MB.
- `tournament-day-monday-magic-500.png` — 851 KB.
- `tournament-day-moscow-open-100.png` — 809 KB.
- `tournament-day-championship-500.png` — 729 KB.

Notes:

- `public/assets/` is build output, so duplicated files there are expected after `npm run build`.
- Local tools available in this workspace cannot currently encode WebP/AVIF: `cwebp`, `avifenc`, `magick` are missing, and `sips` cannot write WebP here.

Next asset pass:

- Add an image encoder to the toolchain, preferably `sharp`, and generate WebP/AVIF variants for `download-hero.png` and `plasterer-*.png`.
- Replace heavy PNG references with `<picture>` sources where the images are static HTML.
- For dynamic JS image swaps, add a helper that prefers WebP/AVIF when variants exist and falls back to PNG.
