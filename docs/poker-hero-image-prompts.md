# Imagegen: ПокерМанки / Два туза / Poker21

Использован встроенный `image_gen.imagegen`. Финальные изображения: четыре персональных образа и атлас восьми предметов. WebP используется только для оптимизации размера. Генерации делались отдельно для каждого варианта.

## Общая исходная постановка

Reference: `assets/summer-rating-player-pokermanki-v3.webp`.

Create a production game character asset adapting this EXACT personal PokerManki chimpanzee. Preserve his recognizable realistic face, facial proportions, serious slightly ironic expression, black fur, large ears, and adult body proportions from the reference. Full body, standing front-facing, both arms relaxed slightly away from body, hands naturally lowered, no held objects. Keep original luxurious emerald-green tracksuit with red-white narrow side stripes and white premium sneakers, but remove all commercial logos/monogram branding. A small understated spade embroidery is allowed, no text. No rocket, no balloon, no props, no pedestal, no background, true transparent alpha. Photorealistic high-end 3D character illustration, detailed fur, realistic satin knit fabric and seams. Entire character including shoes contained in portrait 1024x1536 canvas with consistent margins: top of head around y=160, feet at y=1430, centered x=512, head height about240, shoulder width440. This is the master idle pose for a poker wardrobe; preserve identity not a generic cartoon monkey. Single character, frontal view, neutral studio light from upper left. Save transparent PNG.

Первая генерация дала непрозрачную шахматную подложку. Она не вошла в приложение: следующие редакции заменили её единым тёмно-зелёным студийным фоном.

## Варианты одежды

Keep this EXACT character face, outfit, pose and framing unchanged. Replace the fake checkerboard background completely with a smooth solid very dark evergreen studio background #101b19. No checkerboard, no transparency. Keep head at same location, feet at same location. Premium photorealistic image for club poker wardrobe. No text.

Grinder: Change ONLY the clothing of this exact personal PokerManki chimpanzee to a modern live poker grinder: charcoal black premium zipped hoodie, hood DOWN preserving all the same hair and ears, dark grey joggers, clean white sneakers. Same face, identity, body shape, frontal relaxed standing pose, arms and feet locations, scale and camera framing unchanged. No headphones, hat, glasses, watch or held props. Replace checkerboard completely with a smooth solid dark evergreen studio background #101b19. Photorealistic detailed fabric, no text or logos.

Final: Change ONLY the clothing of this exact personal PokerManki chimpanzee to elegant poker final-table evening style: deep midnight navy velvet tuxedo jacket, crisp ivory shirt, narrow black bow tie, fitted black formal trousers, polished black loafers. Same face and fur, identity, body shape, frontal relaxed standing pose, arms and feet locations, scale and camera framing unchanged. No hat, glasses, watch or held props. Replace checkerboard completely with smooth solid dark evergreen studio background #101b19. Beautiful photorealistic tailoring and material detail, no text or commercial logos.

Oldschool: Change ONLY the clothing of this exact personal PokerManki chimpanzee to old-school live poker regular: warm caramel suede waistcoat over muted blue denim shirt with sleeves to wrists, dark indigo jeans, brown leather cowboy boots. NO hat or accessories. Same face, fur, identity, body shape, frontal relaxed standing pose, arms and feet locations, scale and camera framing unchanged. Replace checkerboard completely with smooth solid dark evergreen studio background #101b19. Premium photorealistic realistic suede denim leather, no text or logos.

## Финальная клубная символика, для каждого образа

Input1: соответствующий образ. Input2: `assets/logo-two-aces.png`. Input3: `assets/app-boot-poker21-plus-chip.webp`.

Edit target image1 only by adding beautiful small REAL embroidered club insignia to the clothes. Keep the EXACT same personal PokerManki chimp face, identity, fur, expression, pose, clothing silhouette, colors, shoes, lighting, framing and dark evergreen background unchanged. Reference2 is our Two Aces club insignia: two red and black dragons, paired heart ace and spade ace, gold circular trim. Reference3 is Poker21 Plus red-black-gold chip insignia. Put a tasteful small circular Two Aces embroidered patch on the left chest (viewer right), and subtle gold 'Poker21' wordmark on the opposite upper sleeve. On the [VARIANT]. No other text or logos, no changes to face or hands. Club branding should look physically sewn/engraved, not a flat pasted sticker. Single complete character image.

VARIANT:
- club: emerald tracksuit replace existing generic chest spade with Two Aces embroidery
- grinder: black hoodie use a dark subtle patch with gold outlines and tiny red accent
- final: navy tuxedo use a small gold enamel paired-aces lapel pin instead of a large patch; preserve elegance
- oldschool: suede waistcoat use a small antique gold paired-aces pin with dragon relief

## Атлас предметов

Production game inventory atlas: exactly 8 isolated premium realistic 3D objects, clean 4 columns by 2 rows equal grid, each cell 384x384, full image 1536x768. Background perfectly flat solid dark evergreen #101b19 in every cell. No borders, no labels, no text, no lettering, no watermarks. Objects centered in each cell with 18% safe margin, same soft upper-left studio light and photographic detailed metal/materials. Top row left to right: 1 black over-ear noise cancelling headphones, 2 white ceramic espresso cup on saucer with coffee, 3 silver poker card protector coin with embossed spade leaning upright, 4 black polished sunglasses with gold hinges three-quarter product view. Bottom row left to right: 1 elegant golden two-handled poker tournament trophy cup on black square base with small spade motif, 2 angular translucent emerald crystal spade trophy on black base, 3 beautiful platinum poker championship bracelet with tiny red and black suit gemstones arranged in an arc, 4 small elegant black and gold rocket trophy on a circular brass stand, spade fin motif. Each complete object entirely inside its own cell, separate negative space. High-end realistic inventory assets for adult poker club game, not cartoon, no humans. Exactly eight objects and no additional objects.

Финальная редакция с двумя клубными логотипами:

Edit target image1 the inventory atlas. Preserve EXACT 4 columns x 2 rows layout, each object position, cell scale, dark evergreen background, materials, lighting and object silhouettes. Add tasteful accurate club branding from references2 and3: Two Aces club uses paired red/black dragons surrounding heart ace and spade ace, circular gold trim. Poker21 Plus uses red/black/gold casino-chip badge reading POKER 21 PLUS. Headphones small Two Aces badge on cup; coffee cup Poker21 Plus badge; card protector replace single spade with Two Aces double-dragon paired aces medallion; sunglasses small gold 21 on hinge. Golden trophy engraved paired aces and small 21 pedestal; crystal trophy gold Two Aces medallion on base; bracelet central gold plaque engraved 21; rocket black/gold body reads Poker21 vertically, like club rocket. No unrelated brands, no club ID numbers needed. Realistic premium engraved metal/enamel, restrained and beautiful, preserve negative space and each object inside its grid cell. No extra objects.


## Независимые надеваемые слои · версия 3

Встроенный imagegen. Edit target для всех: `assets/hero-poker/look-club-v1.webp`. Результаты сохранены в `assets/hero-poker/`, WebP 768×1152. Исходники оставлены в generated_images. Прозрачность не имитируется: сцена собирается CSS-масками по зарегистрированным изображениям.

### head-club-v1.webp

Use case: identity-preserve. Edit target: supplied full body personal PokerManki image. Add only a realistic dark emerald baseball cap with small embroidered gold Poker21 wordmark, brim raised enough to fully expose the eyes. Keep absolutely identical the chimp identity, head size and head location, nose mouth ears and fur, body shape, green tracksuit, pose, hands, legs, shoes, dark evergreen background, lighting, framing and 2:3 canvas. The whole character must remain at the exact same pixel positions as the input. This is a registered wardrobe image layer: no zoom, no crop, no reposition, no new shadows outside the head, no changes below the neck. Photorealistic premium materials. Preserve existing club emblem and Poker21 on clothing. Output full identical composition with only the requested wearable added.

### head-grinder-v1.webp

Use case: identity-preserve. Edit target: supplied full body personal PokerManki image. Add only realistic premium black over-ear headphones physically worn over the head and ears, gold 21 engraved on the outer ear cups. Keep absolutely identical the chimp identity, head size and head location, nose mouth ears and fur, body shape, green tracksuit, pose, hands, legs, shoes, dark evergreen background, lighting, framing and 2:3 canvas. The whole character must remain at the exact same pixel positions as the input. This is a registered wardrobe image layer: no zoom, no crop, no reposition, no new shadows outside the head, no changes below the neck. Photorealistic premium materials. Preserve existing club emblem and Poker21 on clothing. Output full identical composition with only the requested wearable added.

### head-oldschool-v1.webp

Use case: identity-preserve. Edit target: supplied full body personal PokerManki image. Add only a realistic caramel felt cowboy hat with a dark green band and small gold spade pin; keep the brim above the eyebrows. Keep absolutely identical the chimp identity, head size and head location, nose mouth ears and fur, body shape, green tracksuit, pose, hands, legs, shoes, dark evergreen background, lighting, framing and 2:3 canvas. The whole character must remain at the exact same pixel positions as the input. This is a registered wardrobe image layer: no zoom, no crop, no reposition, no new shadows outside the head, no changes below the neck. Photorealistic premium materials. Preserve existing club emblem and Poker21 on clothing. Output full identical composition with only the requested wearable added.

### head-final-v1.webp

Use case: identity-preserve. Edit target: supplied full body personal PokerManki image. Add only a realistic elegant black felt fedora with a satin gold band and a small gold 21 pin; keep brim above eyebrows. Keep absolutely identical the chimp identity, head size and head location, nose mouth ears and fur, body shape, green tracksuit, pose, hands, legs, shoes, dark evergreen background, lighting, framing and 2:3 canvas. The whole character must remain at the exact same pixel positions as the input. This is a registered wardrobe image layer: no zoom, no crop, no reposition, no new shadows outside the head, no changes below the neck. Photorealistic premium materials. Preserve existing club emblem and Poker21 on clothing. Output full identical composition with only the requested wearable added.

### eyes-v1.webp

Use case: identity-preserve. Edit target: supplied full body personal PokerManki image. Add only realistic black poker sunglasses actually worn over the eyes, narrow rectangular lenses, gold 21 temple hinges; no other headgear. Keep absolutely identical the chimp identity, head size and head location, nose mouth ears and fur, body shape, green tracksuit, pose, hands, legs, shoes, dark evergreen background, lighting, framing and 2:3 canvas. The whole character must remain at the exact same pixel positions as the input. This is a registered wardrobe image layer: no zoom, no crop, no reposition, no new shadows outside the head, no changes below the neck. Photorealistic premium materials. Preserve existing club emblem and Poker21 on clothing. Output full identical composition with only the requested wearable added.

### legs-final-v1.webp

Use case: identity-preserve. Edit the attached master image, changing only one wearable. Replace ONLY the green trousers with tailored black formal trousers, waist at exactly the existing waistline. Keep green jacket unchanged, no blazer or coat. Photorealistic materials. Keep absolutely identical face identity, pose, hands, green branded top, club emblems, head, placement and scale, studio background and every other pixel. Same 2:3 full body framing and exact registered character geometry. Do not zoom or shift anything. This image will be used as an individual clothing layer over the master.

### feet-oldschool-v1.webp

Use case: identity-preserve. Edit the attached master image, changing only one wearable. Replace ONLY white sneakers with elegant caramel brown leather cowboy ankle boots. Their tops meet existing green trouser hems, no white socks or white shoe parts. Keep the green trousers and ankle positions identical. Photorealistic materials. Keep absolutely identical face identity, pose, hands, green branded top, club emblems, head, placement and scale, studio background and every other pixel. Same 2:3 full body framing and exact registered character geometry. Do not zoom or shift anything. This image will be used as an individual clothing layer over the master.

### feet-final-v1.webp

Use case: identity-preserve. Edit the attached master image, changing only one wearable. Replace ONLY white sneakers with elegant shiny black leather penny loafers and black socks if any sock is visible. Their tops meet existing green trouser hems, no white sock or white shoe parts. Keep the green trousers and ankle positions identical. Photorealistic materials. Keep absolutely identical face identity, pose, hands, green branded top, club emblems, head, placement and scale, studio background and every other pixel. Same 2:3 full body framing and exact registered character geometry. Do not zoom or shift anything. This image will be used as an individual clothing layer over the master.

## Сувениры персонажей · версия 4

Встроенный imagegen. Референсы: `assets/logo-two-aces.png`, `assets/club-news-personal/waaar-news-cutout-v3.webp`, `assets/club-news-personal/babnik-car-transparent-v3.webp`. Результат: `assets/hero-poker/character-props-v1.webp` (1536×512, четыре клетки 3:4). Оптимизирован WebP без изменения композиции. Сетка результата 3:1, поэтому карточки используют аспект клетки 3:4.

Use case: product-mockup. Create a premium photorealistic poker club collectible inventory atlas: exactly FOUR equal square cells in one horizontal row, 4:1 composition, each centered object fully contained with generous padding, same solid dark evergreen studio backdrop in each cell, no dividers, no captions. Cell 1: a miniature emerald Poker21 rocket on a small gold poker-chip pedestal, recognizable paired red/black dragons and heart/spade aces medallion of supplied club logo on the base. Cell 2: an elegant black and gold miniature yacht card protector inspired by Waaar reference character yacht, miniature polished gold battle axe emblem on side, gold 21 on base. Cell 3: a glossy red miniature classic convertible card protector inspired by Babnik reference car, subtle black spade and gold 21 on base. Cell 4: two upright interlocking gold poker chips, one heart ace and one spade ace, on a shared small black plinth, a friendship/together-in-the-money trophy with gold 21. These are collectible objects for a realistic personal monkey poker wardrobe. Exact material detail, polished metal, enamel, premium miniature craftsmanship. No characters, no hands, no other objects, no watermark. Logo reference only for club insignia, do not reproduce tiny ring IDs. Character references only for yacht/car motifs. All four items must be visually distinct.

## 2026-09-11 — отдельные украшения (встроенный imagegen)

Исходники: `assets/hero-poker/look-{club,grinder,oldschool,final}-v1.webp`. Для каждого выполнен отдельный edit. Сохранённые результаты: `assets/hero-poker/accessories-v1/clean-{club,grinder,oldschool,final}.webp`.

Промпт удаления: “Precise object edit of attached registered full-body chimp game sprite. Remove ONLY round chest badge, playing-card metal chest brooch (where present), and Poker21 lettering with underline on sleeve. Reconstruct matching blank original clothing material underneath. Keep exact framing, face identity, body position, clothing folds, seams, hands feet background lighting. Full body same composition 2:3. No new markings.” Для пиджака отдельно указано сохранение pocket square, black satin, navy velvet; для жилета — brown vest and blue denim; club — green velvet; grinder — black hoodie.

Промпт атласа: “One production sprite atlas, transparent RGBA background, 3 columns × 4 rows. Photorealistic premium embroidered patches and metal poker accessories. Row 1: red/black/gold two aces crest; green/gold crest; black/silver crest. Row 2: Poker21 embroidered tabs, gold on navy; cream on green; silver on black. Row 3: gold pair of aces pin; silver spade in laurel pin; gold poker chip with red heart pin. Row 4: matched pairs of gold square aces cufflinks; silver round spade cufflinks; black/gold 21 cufflinks. Regular cells, isolated, centered, generous margins, front-facing, no character, clothing, labels, grid lines or checkerboard.” Референс: исходный пиджак.

Первый атлас содержал нарисованный фон. Второй edit: “Background extraction ONLY. Remove all gray checkerboard pixels and fabric-like background noise between accessories, output genuine transparent alpha background (RGBA PNG), NOT a painted checkerboard. Preserve all 12 accessories, positions, colors, text, edges, embroidery and metal. Do not redesign or rearrange. Every pixel outside objects must be transparent.” Альфа-канал результата проверен. Итог: `assets/hero-poker/accessories-v1/accessory-source.png`; нарезка на отдельные WebP — `scripts/generate-hero-accessories.js`.

## Evening lounge — 2026-09-11

New background only; the personal chimp and clothing are composed from existing assets.

Prompt: Photorealistic background plate for a premium poker club personal character portrait, portrait 2:3. An elegant intimate navy velvet and dark walnut poker lounge at evening, warm brass wall sconces, muted emerald accents, a tasteful out-of-focus poker table along the far right background. The CENTER foreground must be EMPTY and dark, reserved for compositing a full-body standing chimp character. No people, no animals, no trophies, no text or logos or signage. Restrained believable luxury, cinematic soft amber rim lighting near the edges, finely textured dark carpet floor with realistic contact lighting, straight-on camera at character waist height, uncluttered low-contrast central 65% of frame. Beautiful real interior photograph rather than illustration, subtle depth of field. No bright distracting objects, no gambling advertisements.

Saved as `assets/hero-poker/evening-v1/lounge.webp` (720×1080) and `lounge-thumb.webp` (240×360). Full outfit covers in `outfits-v1` are browser renders of actual composition, reproducible with `scripts/generate-hero-outfit-covers.js`.

## Pilot identities and matte outfit — 2026-09-11

Imagegen edits used the original `look-club-v1.webp` as the exact registration target (768×1152) and club-news cutouts as identity references. Waaar: cheerful broad smile, tan muzzle, warm brown spiky swept hair from `waaar-news-cutout-v3.webp`. Cooler: broad toothy grin and swept chestnut tuft from `cooler-news-cutout.webp`. Prompt required unchanged body/pose/hands/shoes/background; no hats, glasses or handheld props, as these need independent compatible layers. Outputs saved non-destructively to `pilots-v1/{waaar,cooler}.webp` with 128×192 thumbnails. Original PokerManki identity is unchanged.

Cooler fan prompt: isolated realistic premium black square computer fan, brushed-metal corners, emerald-and-gold RGB ring, dark blades, central golden spade emblem, no text, no monkey/hand/background, studio photograph and true alpha. Saved `pilots-v1/cooler-fan.webp`, 256×256.

Matte edit prompt: replace only all green jacket/pants fabric with uniform deep emerald MATTE technical cotton-knit, clean broad folds and stitching, red-white piping preserved; NO velvet, satin, oily highlights, mottling, speckles, grunge or painterly finish. Remove embedded chest badge and sleeve embroidery; retain exact face, pose, clothing boundaries, hands, shoes and background. Generated source saved as `matte-v2/club-source.webp`; `scripts/generate-hero-matte-assets.js` derives registered body/legs layers and card thumbnails. The UI applies these same cloth layers on all three identities. Accessories remain separate. Regenerate outfit covers with `scripts/generate-hero-outfit-covers.js` after cloth changes.
