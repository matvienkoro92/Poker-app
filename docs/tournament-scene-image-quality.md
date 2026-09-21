# Tournament scene image quality

The Morf, Fishkopcheny and Cooler scenes use CSS `image-set`: the existing
900–960 px WebP on 1x displays and a native 1122 px WebP on 2x/3x displays.
The background and head-mask overlay share the same custom property so the
browser can reuse the selected resource. Other weekday scenes already use
1120–1122 px images. The bonus strip is already 1600 px wide.

HD exports use Sharp WebP quality 88, alpha quality 100, effort 6, without
upscaling. Do not create HD variants by enlarging the compressed runtime asset.

| Scene | Existing bytes | HD bytes |
| --- | ---: | ---: |
| Morf | 100560 | 155202 |
| Fishkopcheny | 96490 | 127954 |
| Cooler | 130340 | 196858 |

Original inputs:
- Morf: generated_images/01a0c1df-cbc1-7712-b135-bbc8954558a2/exec-6cb10e46-6c6f-46d8-a7ad-641fc28bae07.png
- Fishkopcheny: generated_images/01a0bcfa-0c98-7ea3-9d2b-2357b2292c3a/exec-6d6f2901-ed36-413e-99a0-64f93f992b87.png
- Cooler: assets/home-tournament-cooler-single-table-v2.png

Generated PNG inputs are under the local Codex generated_images directory.
