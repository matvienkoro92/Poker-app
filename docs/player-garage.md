# Гараж Poker21 / Two Aces

Гараж доступен через зал, который пока виден только администраторам. Из гаража игра не запускается; дополнительные комнаты не добавлены.

Мастерская сохраняет окраску, диски, подсветку, номер, шлем, костюм и обувь. Примерка локальная до сохранения. Настройки отображаются на машине в комнате, на отдельном слое персонажа и в гонке. Два ракурса машины доступны в мастерской.

Открытия зависят от подтверждённых заездов, рекорда и собранных фишек. Сервер проверяет доступность каждого предмета. Результат учитывается после проверки повторного воспроизведения заезда и только один раз. Исторический рекорд мигрирует из существующей таблицы; заезды и фишки учитываются с введения гаража. Доска показывает личный рекорд, лучший рекорд привязанных друзей и выбранную следующую цель.

Хранение: `poker_app:garage:stats:<accountId>` для результатов, `garage` внутри существующей версии состояния зала для оформления. Сохранение использует существующую проверку владельца и версии.

Проверки: `node --test tests/player-garage.test.js tests/player-hall.test.js tests/monkey-race.test.js`; `node scripts/test-garage-browser.js`; `GARAGE_BROWSER=webkit node scripts/test-garage-browser.js`; `node scripts/test-garage-race-browser.js`.

## Иллюстрации

Созданы встроенным ImageGen в режиме edit по исходным иллюстрациям проекта, затем сохранены lossless WebP без увеличения разрешения. Фон 1341×1173; машина 1536×1024 с альфа-каналом; боковой шлем 1254×1254 с альфа-каналом. Новые предметы имеют только символику Poker21 / Two Aces. Перекраска материалов в приложении сохраняет исходные детали и прозрачность.

### garageEmptyPrompt

Edit this exact panoramic Poker21 / Two Aces garage room background. ONLY remove the entire green black gold poker-table kart parked at lower center-right, including wheels, turbine, reflections and its shadow. Reconstruct the unobstructed polished floor behind it with matching geometric tile seams and warm reflections. Preserve every other pixel/composition as closely as possible: empty red leather chair LEFT, green framed wall board, lit EMPTY trophy niches, doorway, shelving, lamps, shelves helmet/tool props, carpets, foreground table glass plants. No people, no characters, no vehicle remaining anywhere. Exact reference camera, exact aspect ratio 1341:1173, same furniture positions because live HTML hotspots overlay them. Keep everything sharply detailed in deep focus. No redesign, no blur. This is the empty stage for a separately customizable vehicle layer.

### garageKartPrompt

Produce a single transparent-background isolated 3D vehicle cutout: precisely the green black gold poker-table kart parked in the attached Poker21 garage reference, and ONLY that vehicle. NO driver, no monkey, no people, no garage, no floor. Camera three-quarter FRONT view from slightly above, kart front points RIGHT and toward viewer, turbine is rear LEFT. Match exact design: green felt oval poker table deck with cards and stacks of red/blue/white chips, black leather padded rail with gold edging, four thick black tires gold rims and gold spade emblem, black gold cyan turbine behind rear seat, steering wheel gold spade, front gold trim and cyan running lights. Physical grounded realistic proportions, crisp material detail, deep focus, no blur, no depth of field, no fog, no huge shadows outside car, no motion streaks. On a clearly visible side plate include perfectly legible gold wording 'Two Aces' and subtle Poker21 emblem, no third-party branding. Actual transparent alpha. Complete vehicle no clipped wheels, fill canvas with small transparent margin, landscape 1536x1024 requested. Keep pose comparable to the reference parked vehicle for placing on same floor as separate customizable layer.

### garageHelmetPrompt

Create one isolated premium photoreal 3D racing motorcycle helmet asset on TRUE TRANSPARENT BACKGROUND, no head, no person, no floor, no shadow outside object. Side profile facing RIGHT, like a chimp racer facing right in a side-scrolling game. Glossy black carbon shell, tasteful gold striping, tiny spade crest, luxurious Poker21 motorsport styling. OPEN FACE helmet silhouette: dome covers scalp and back of head, forehead brow rim, short transparent lightly smoked raised visor; wide open lower front face area so chimp eyes muzzle and face remain entirely visible when this image is overlaid on a character. NO full-face chin bar, no closed black visor covering the face. Sharp intricate material, clear clean edges, realistic highlights, no depth of field blur, no haze. Single helmet centered fills canvas with small transparent margin, approximately square. No lettering. Intended as transparent game accessory, clean antialiased alpha around helmet only.

### garageHelmetFrontPrompt

Create a single isolated empty open-face racing helmet on TRUE TRANSPARENT background for a character accessory layer. Camera FRONT three-quarter view with front opening facing slightly to RIGHT, matching the seated chimp in reference image 1. NO chimp, NO head, NO body, NO chair, ONLY HELMET shell. Shape premium black carbon open-face helmet with polished gold trim, tiny gold spade Poker21 club emblem on brow and beautifully legible small 'Poker21' branding on side. Large fully empty face opening so chimp eyes, muzzle and expression remain unobscured. Visor raised above forehead, not over face. No chin bar. Cutout item entire shell high detail, no background, no floor, no external shadow, no blur. Glossy warm-lit cinematic material like reference2 helmet, frontal perspective. 1024x1024 requested.


Исходные PNG: `/Users/kosmonavt/.codex/generated_images/01a10e86-0a13-7491-8b47-de0b78614162/exec-de50f178-80f6-4837-891d-b945e3d5cab5.png` (фон), `exec-1203dab4-70d6-4109-8b3e-1be17923dbce.png` (машина), `exec-aef086e4-3e3c-4cbb-97a9-faf6b98edd2e.png` (шлем сбоку), `exec-733bf09f-f150-4321-9a17-99a8f2c1a2d6.png` (шлем спереди), остальные имена относительно той же папки.

Финальная проверка: 20 серверных тестов прошли; сценарий мастерской прошёл в Chromium и мобильном WebKit; фактическое применение сохранённого оформления проверено на canvas гонки. Статическая сборка и минификация прошли.
