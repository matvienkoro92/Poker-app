# Быстрый ввод рейтинга со скриншотов

Цель: быстро переносить данные со скриншотов в `winter-rating-data.js`, но не считать баллы руками.

## Поток

1. Сохрани скриншоты в `assets/`.
2. Распознай или перепиши строки турнира в простой текст.
3. Прогони текст через генератор сниппета:

```bash
npm run rating:snippet < /path/to/input.txt
```

4. Вставь полученный блок в `SPRING_RATING_TOURNAMENTS_BY_DATE`.
5. Если в сниппете есть строка `SPRING_RATING_IMAGES_LEAGUE1[...]` или `SPRING_RATING_IMAGES_LEAGUE2[...]`, перенеси файлы в соответствующий блок скринов.
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

Баллы считаются автоматически по правилу проекта: приз должен быть больше нуля, места 1-8 дают `135/110/90/70/60/50/40/30`.
