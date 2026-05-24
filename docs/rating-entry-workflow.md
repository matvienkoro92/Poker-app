# Быстрый ввод рейтинга со скриншотов

Цель: быстро переносить данные со скриншотов в весенний рейтинг, но не считать баллы руками.

## Полуавтоматический импорт

Если скрины лежат в `Downloads` или другой папке, проще всего дать импортёру исходники через `source:`:

```bash
npm run rating:import < /path/to/input.txt
```

Он сам:

- сожмёт PNG/JPG в `assets/rating-compressed-preview/` примерно до 50 КБ;
- добавит турниры в нужный `spring-rating-data-*.js`;
- добавит скрины в `spring-rating-images-league1.js` / `spring-rating-images-league2.js`;
- обновит майский календарный блок и подпись «обновлено …»;
- запустит `rating:validate`, `check:syntax` и `build`.

Полезные флаги:

```bash
npm run rating:import -- --dry-run < /path/to/input.txt
npm run rating:import -- --no-build < /path/to/input.txt
npm run rating:import -- --force < /path/to/input.txt
```

## Поток

1. Сохрани скриншоты в `assets/` или укажи исходные файлы через `source:`.
2. Распознай или перепиши строки турнира в простой текст.
3. Для полного импорта прогони текст через импортёр:

```bash
npm run rating:import < /path/to/input.txt
```

Либо только сгенерируй JS-сниппет:

```bash
npm run rating:snippet < /path/to/input.txt
```

Если используешь только `rating:snippet`, дальше вручную:

4. Вставь полученный блок в месячный файл: март в `spring-rating-data-march.js`, апрель в `spring-rating-data-april.js`.
5. Если в сниппете есть строка `SPRING_RATING_IMAGES_LEAGUE1[...]` или `SPRING_RATING_IMAGES_LEAGUE2[...]`, перенеси файлы в `spring-rating-images-league1.js` или `spring-rating-images-league2.js`.
6. Проверь базу:

```bash
npm run rating:validate
```

Для ручной ревизии старых исключений:

```bash
npm run rating:validate:strict
```

## Формат input.txt

```text
date: 15.04.2026
league: 1
time: 18:00
name: Monday 250k
buyin: 5000
screens: rating-15-04-2026-league1-monday-250k-18h.png
source: /Users/kosmonavt/Downloads/IMG_0001.PNG
players:
1 | Nick One | 12000
2 | Nick Two | 7000
9 | Nick Without Prize | 0
```

Можно повторять блоки `time/name/buyin/screens/players` несколько раз для одной даты.

Для синих скринов добавляй перед игроками:

```text
blue: yes
```

или явно:

```text
multiplier: 100
```

Тогда выплаты из строк игроков будут умножены на 100 в готовом JS.

Строки с минусовым значением выигрыша не добавляй в рейтинг.

Баллы считаются автоматически по правилу проекта: приз должен быть больше нуля, места 1-8 дают `135/110/90/70/60/50/40/30`.

## OCR-черновик

Чтобы не переписывать все строки руками, можно сначала получить черновик из скринов:

```bash
npm run rating:ocr -- /Users/kosmonavt/Downloads/IMG_0001.PNG /Users/kosmonavt/Downloads/IMG_0002.PNG
```

Этот шаг использует локальный macOS Vision OCR. В Codex он может попросить разрешение на системный `swift`, потому что в песочнице OCR возвращает пустой результат.

Вывод нужно быстро проверить: особенно места с кубками, потому что OCR иногда не видит цифру внутри медали. После проверки этот текст можно сразу подать в импорт:

```bash
npm run rating:ocr -- /Users/kosmonavt/Downloads/IMG_0001.PNG > /private/tmp/rating-input.txt
npm run rating:import < /private/tmp/rating-input.txt
```
