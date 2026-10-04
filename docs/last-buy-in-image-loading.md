# Story image loading

The original full-resolution assets remain available. UI references use these optimized WebP copies:

| Image | Original bytes | Optimized bytes | Encoding |
| --- | ---: | ---: | --- |
| Tall entrance poster v10 | 1,861,570 | 411,192 | WebP quality 92, effort 6, smart chroma subsampling |
| Captain Koll victory v3 | 2,116,476 | 411,974 | WebP quality 88, effort 6, smart chroma subsampling |
| City map v3 | 510,532 | 450,266 | WebP quality 84, effort 6, smart chroma subsampling |

Pixel dimensions are unchanged. Already compressed previews were retained when recompression did not reduce bytes meaningfully.

The poster has high fetch priority. Campaign sprites and backdrops load by selected mode; legacy sprites load only when entering a legacy chapter. General character preloading at entrance was removed. The current chapter's victory art is fetched at low priority during gameplay.

Validation: `CAMPAIGN_URL=http://127.0.0.1:4204/last-buy-in.html node tests/last-buy-in-image-loading-ui.cjs`. Checks initial image requests, poster/map decoding and start-up in every campaign mode plus the legacy fight and finale.
