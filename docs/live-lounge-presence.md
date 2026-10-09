# Присутствие друзей за столом

Зал остаётся доступен только администратору. Действие `player-hall:presence` получает подтверждённых друзей владельца комнаты и сопоставляет связанные Poker21 ID со значениями `pos` в занятых столах. Сопоставление строковое, без потери точности числовых ID. Ответ содержит только внутренний accountId, известный characterId, статус и названия игр/лимиты; внешние ID и инвентарь не передаются клиенту.

Персонаж появляется только при статусе playing. При известном отсутствии — пустое кресло и «Не за столом»; без привязки — «Poker21 не привязан»; при сбое API или отсутствующей карте мест — «Статус недоступен». Несколько столов перечисляются в карточке, над персонажем виден первый с количеством остальных. Неизвестные лимиты не угадываются.

Обновление сразу при входе, каждые 30 секунд после ответа и при возвращении из фона. В другой комнате, закрытом зале и скрытом приложении опрос останавливается. Ответы предыдущего входа игнорируются. Сохранение рассадки запускает новую проверку. Сцена обновляется без пересоздания плоскости камеры и без отмены открытой примерки. Общий серверный снимок хранится 15 секунд; ошибка — 5 секунд, положительный устаревший снимок не используется. Метаданные персонажей читаются только для пяти выбранных друзей, проверенных сервером.

Идентичность берётся из закреплённого персонажа, выбранного героя или известного никнейма каталога. Для остальных используется ПокерМанки. Четыре посадочных изображения: ПокерМанки, Ваар, Кулер, Бабник. Персонажи прозрачными слоями; исходный стол закрывает нижнюю часть тела, кисти накладываются поверх столешницы. Интерфейс подписей остаётся отдельным от арта.

## Проверки

`node --test tests/lounge-presence.test.js tests/lounge-live-refresh.test.js tests/player-lounge.test.js tests/player-hall.test.js tests/pokerplus-tables.test.js`

`SMOKE_ROOT=public node scripts/test-lounge-presence-browser.js`

`SMOKE_ROOT=public GARAGE_BROWSER=webkit node scripts/test-lounge-presence-browser.js`

Сценарии: персональные герои, изменение лимита, несколько столов, выход из игры, ошибка/восстановление API, фон/возвращение, выход из комнаты, подписи на 320/390/768 px. Публичный опубликованный API проверен 09.10.2026: возвращает карты мест и фактические лимиты. Авторизованное сопоставление конкретного аккаунта проверено тестовыми данными; локальные ключи vendor API не настроены.

## Арт

Встроенный ImageGen, редактирование по референсам персонажей и посадочной позе. Все четыре результата имеют нативный размер 1145×1374 и прозрачный фон, экспортированы в lossless WebP без увеличения. Символика только Poker21 / Two Aces.

### pokermanki

`assets/player-hall/live-seated-pokermanki-v1.webp`

Источник: `/Users/kosmonavt/.codex/generated_images/01a10e86-0a13-7491-8b47-de0b78614162/exec-d356a9a4-aa62-4366-a209-ca395dafad10.png`

Промпт:

Create a transparent-background sprite of the EXACT adult realistic chimp PokerManki from reference1, seated naturally at the green poker table in reference2. Preserve his recognizable face, brown/black fur, serious friendly expression, emerald velvet green tracksuit with red-white stripes and Poker21 small chest/sleeve embroidery. Front-on slightly elevated table camera matching lounge, realistic cinematic amber/brass warm light, sharp fur and fabric, no blur. Character alone, NO chair, NO table, NO chips, NO floor, NO background, NO balloons, NO rocket. Seated bent knees visible bottom, torso leans forward slightly, relaxed both forearms extending forward resting on an invisible horizontal tabletop, elbows level and hands toward camera at 72 percent image height. Entire head and hands within canvas, no cropped fingers. Centered symmetrical silhouette, upper body fills canvas, soft warm edge light. Need correct proportions for naturally sitting behind table. No text except tiny Poker21 branding, no other brands. Full real alpha transparency, crisp high quality.

### waaar

`assets/player-hall/live-seated-waaar-v1.webp`

Источник: `/Users/kosmonavt/.codex/generated_images/01a10e86-0a13-7491-8b47-de0b78614162/exec-626981a6-2917-4f69-b652-bc991a584fc7.png`

Промпт:

Create one transparent-background seated poker character sprite. WAAAR: the exact cheerful young golden-brown monkey with big ears, spiky brown hair, lively grin and black-and-gold tailored poker outfit from reference1. Keep the face and hairstyle recognizable. Remove axe and vehicle. Use reference2 only for MATCHING seated pose and framing: head fully visible, seated torso, bent knees, relaxed forearms reaching forward with both hands resting on invisible horizontal tabletop at approximately 72 percent height. Slightly elevated frontal camera. No chair, no table, no chips, no floor, no backdrop. Character alone with true alpha. Maintain source character's personal identity and original proportions. Add only small Poker21/Two Aces spade branding on outfit. Cinematic warm amber lighting matching club lounge. All details crisp, fur/clothing/hands meticulously sharp. Entire head, ears and hands within canvas. Transparent margins minimal, entire body centered and visible. No other brands, no large text.

### cooler

`assets/player-hall/live-seated-cooler-v1.webp`

Источник: `/Users/kosmonavt/.codex/generated_images/01a10e86-0a13-7491-8b47-de0b78614162/exec-c01276ed-9a28-4652-b05b-d38849e7049a.png`

Промпт:

Create one transparent-background seated poker character sprite. COOLER: the exact cheerful brown monkey in backwards dark cap, sunglasses, black hoodie with orange accents and black headphones around neck from reference1. Keep identical recognizable face, hair, cap, shades, headphones. Remove computer cooler and all handheld objects. Use reference2 only for MATCHING seated pose and framing: head fully visible, seated torso, bent knees, relaxed forearms reaching forward with both hands resting on invisible horizontal tabletop at approximately 72 percent height. Slightly elevated frontal camera. No chair, no table, no chips, no floor, no backdrop. Character alone with true alpha. Maintain source character's personal identity and original proportions. Add only small Poker21/Two Aces spade branding on outfit. Cinematic warm amber lighting matching club lounge. All details crisp, fur/clothing/hands meticulously sharp. Entire head, ears and hands within canvas. Transparent margins minimal, entire body centered and visible. No other brands, no large text.

### babnik

`assets/player-hall/live-seated-babnik-v1.webp`

Источник: `/Users/kosmonavt/.codex/generated_images/01a10e86-0a13-7491-8b47-de0b78614162/exec-16e940ce-9081-4057-aebf-b46b2165bae5.png`

Промпт:

Create one transparent-background seated poker character sprite. BABNIK: the exact mature brown realistic chimp with slick brown hairstyle, dark sunglasses, black tailored suit and small red rose boutonniere from reference1. Keep his recognizable serious confident face and costume. Remove car. Use reference2 only for MATCHING seated pose and framing: head fully visible, seated torso, bent knees, relaxed forearms reaching forward with both hands resting on invisible horizontal tabletop at approximately 72 percent height. Slightly elevated frontal camera. No chair, no table, no chips, no floor, no backdrop. Character alone with true alpha. Maintain source character's personal identity and original proportions. Add only small Poker21/Two Aces spade branding on outfit. Cinematic warm amber lighting matching club lounge. All details crisp, fur/clothing/hands meticulously sharp. Entire head, ears and hands within canvas. Transparent margins minimal, entire body centered and visible. No other brands, no large text.

