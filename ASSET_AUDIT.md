# Asset Audit

## 2026-08-08

Optimized production delivery:

- Rating lightbox JPEG previews referenced by the spring/summer maps are converted to AVIF at quality 45 without resizing. The reproducible command is `npm run rating:optimize:previews`.
- `xpoker-join-example.png` remains as an editable source master; the download fragment ships the 1000 px WebP derivative instead (about 64 KB instead of 1.6 MB).
- The current SNG home banners ship only WebP. Their multi-megabyte PNG source masters are no longer production fallbacks.
- Four large club-news/profile PNG masters now have WebP delivery variants. The source masters stay in `assets/` for future editing, but are not copied to `public/` while unreferenced.
- Added `npm run assets:report` to show current/core/archive and startup-eager byte totals.
- The report also measures the home entrypoint's gzip transfer estimate, raw JavaScript parse input,
  raw CSS parse input, and request count. These budgets are enforced by `npm run release:check`.
- Rating thumbnails are copied only when referenced; the production build no longer includes the
  complete optional archive thumbnail directory.
- Home SNG banners use 900px responsive WebP variants on mobile while preserving the full-size source.

The current-season budget is 28 MiB because it now covers the complete June-August season, including both tiny list thumbnails and on-demand lightbox images. This does not represent startup traffic.

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
