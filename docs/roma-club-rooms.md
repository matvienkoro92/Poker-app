# Залы Ромы Банкомата

Семь последовательных залов: гардероб, покерный зал, коктейльный бар, турнирный зал, VIP-галерея, касса, служебный коридор. Далее хранилище с Чеком и Рейзом. После зачистки открывается дверь справа сверху; Рома подходит и нажимает X или движется вправо у двери. Переход 45 кадров, здоровье и супер-перезарядка сохраняются, за новый зал восстановление одного пункта здоровья как раньше.

Верхняя граница пола 205 вместо 270; арт стены заканчивается на 180, ноги героев остаются на полу. Рост сложности: 2–5 охранников, 4–6 здоровья, скорость движения +5.5% за зал, интервал атак сокращается со 165 до 111 кадров; с пятого зала стрелки дают веер из трёх выстрелов. Боссы сохраняют свои четыре способности.

Растровый атлас четырёх интерьеров: `assets/last-buy-in/roma-club-rooms-v1.webp`, встроенный imagegen. Палитры и обозначения отличают дополнительные залы, семейства помещений переиспользуют арт. Исходник: /Users/kosmonavt/.codex/generated_images/01a0f87e-25f4-7fd0-bf05-3a8ca00ee854/exec-c3a6d513-e6e0-48b6-9617-e192c6efc1af.png

Промпт:

Use case: stylized-concept. Asset type: game background atlas, a precise 2 columns x 2 rows grid of FOUR distinct club rooms, each full rectangular panel, no borders or gutters, total portrait 1536x2048. Reference is style only: elegant emerald gold poker club Two Aces. Each panel camera frontal slightly elevated videogame beat-em-up, back wall ends at 35% panel height and expansive EMPTY parquet or marble walkable floor fills bottom 65%, no furniture on walking floor. Back wall has usable gold framed exit door at right (x86%, floor seam y35%), blank dark doorway. Upper left reception cloakroom dark burgundy velvet brass; upper right emerald poker lounge tables ONLY against rear wall; lower left turquoise cocktail bar with bottles brass arches along rear wall; lower right VIP counting room cream marble gold vault and emerald curtains. Keep each environment distinctive but same club. No people, no text, no labels, no letters, no cash on floor. Beautiful polished cinematic 3D game environment, warm lamps, readable clean wide floor, consistent perspective and exact 2x2 grid.

Проверки: 11 тестов `tests/last-buy-in.test.js`, включая проход через семь дверей до боссов и обычное полное прохождение; `tests/last-buy-in-roma-rooms-ui.cjs` — реальный переход X и верхняя граница пола на ширинах 390 и 1024.
