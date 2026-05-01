# iOS PWA Chat Keyboard Notes

Документ фиксирует текущее состояние расследования бага строки ввода в открытом чате iOS PWA.

## Симптом

В установленной PWA на iOS при фокусе textarea в личном/общем чате строка ввода ведет себя нестабильно:

- иногда не поднимается над клавиатурой;
- иногда поднимается на одну высоту, иногда на другую;
- иногда вместе с composer уезжает вся chat-shell область, включая шапку диалога;
- чистый `Keyboard Lab` footer показывает, что WebView может держать fixed footer стабильнее, чем текущий chat-shell.

Главный признак по диагностике: `shell` получает отрицательный top, например `shell: -182+836`, а это значит, что iOS/WKWebView автоскроллит весь документ к focused textarea. В таком режиме шапка, если она находится внутри shell как обычный relative/flex элемент, уезжает вместе с shell.

## Рабочая история

До распила файлов похожий баг уже лечился в цепочке коммитов:

- `762fe5c Lift PWA chat composer above keyboard`;
- `a3a3cd5 Stabilize PWA chat keyboard dock`;
- `5a3d3ea Add CSS fallback for PWA chat keyboard`;
- `daaf8ae Force PWA chat composer keyboard lift`.

Важный вывод из сравнения: старая схема не пыталась для iOS PWA вычислять большой JS `bottom` по высоте клавиатуры. Она держала fixed composer у нижней кромки layout viewport, а визуальный подъем давала CSS fallback-логика.

После распила и последующих правок часть поведения изменилась: JS начал активнее считать `bottom` по `visualViewport`/baseline, а CSS fallback местами был убран или конкурировал с JS. Это дало два класса регрессий: "не поднялось" и "поднялось слишком высоко".

## Текущая реализация

Ключевые файлы:

- `app-chat-lifecycle.js` — focus/touch/blur pipeline для chat composer, `chat-keyboard-open`, root-scroll lock, `applyChatThreadComposerKeyboardDockFromCover`.
- `app-webview-keyboard.js` — `Keyboard Lab` и диагностика viewport/chat layout.
- `styles-home-sections.css` — поздние PWA/iOS keyboard overrides для composer, header и messages.
- `styles-chat-threads.css` и `styles-chat-threads-contacts-responsive.css` — базовый layout тредов и шапок.

Текущие версии/коммиты вокруг расследования:

- `9fda0bd` / `2.423` — стабилизация PWA composer lift.
- `23878ce` / `2.424` — root-scroll lock во время keyboard focus.
- `82f809f` / `2.425` — убран CSS `38dvh` как источник второго подъема.
- `a01632b` / `2.426` — fixed-режим только через JS dock.
- `ff9afcd` / `2.427` — dock стал принимать `focusTarget`.
- `8b20646` / `2.428` — преддок на `touchstart`.
- `0f8dc28` / `2.429` — возврат старой CSS fallback-архитектуры.
- `de8b0d8` / `2.430` — один iOS PWA `bottom` и ранний root-lock по `focusTarget`.
- `9381a10` / `2.431` — fixed header при iOS PWA keyboard.
- `94eccbb` / `2.432` — ранний `chat-keyboard-open` на `touchstart`.
- `b54f7fd` / `2.433` — расширенная диагностика `Keyboard Lab`.

## Диагностика

В `Keyboard Lab` добавлены строки:

- `viewName` — `body[data-view]`;
- `cls` — `chat-keyboard-open` на html/body и `poker-ios-pwa`;
- `css` — `--chat-vv-inset`, `--chat-keyboard-fallback-inset`, `--chat-input-lift`;
- `chatHdr` — rect/computed `position/top/bottom` шапки чата;
- `chatMsgs` — rect/computed для активной ленты сообщений;
- `chatCmp` — rect/computed для активной строки ввода и признак `chat-input-area--vv-dock`;
- старые метрики `ih`, `vv`, `shell`, `body/doc`, `scroll`, `active`.

Следующий полезный скрин должен быть сделан в момент, когда клавиатура открыта и composer не поднялся или поднялся неверно. По нему нужно смотреть:

- `hKb/bKb`: включился ли `chat-keyboard-open`;
- `chatCmp position/bottom/dock`: стал ли composer fixed и какой computed bottom;
- `chatHdr top/position`: fixed ли шапка и осталась ли сверху;
- `shell` и `body/doc`: уехал ли root/shell вверх;
- `fb/vv`: какая CSS-переменная реально управляет bottom.

## Инварианты Для Следующих Правок

- В открытом диалоге шапка не должна уезжать вместе с лентой. Если iOS двигает root/shell, шапку нужно держать отдельно от scrollable потока.
- В списке диалогов нижний tabbar должен оставаться; в конкретном чате tabbar скрывается, чтобы не мешать composer.
- Нельзя одновременно использовать несколько независимых источников подъема composer (`JS bottom`, `--chat-vv-inset`, `--chat-keyboard-fallback-inset`, `dvh fallback`) без четкого приоритета. Это дает две высоты.
- Нельзя завязывать критический старт keyboard-state только на `document.activeElement`: на iOS PWA focus/activeElement может запаздывать.
- Любой новый фикс должен проверяться по `Keyboard Lab` метрикам, а не только визуально.

## Что Не Делать

- Не возвращать большой JS `bottom = keyboardCover + gap` для iOS PWA без подтверждения метриками: это уже давало "улетает выше".
- Не убирать CSS fallback полностью, пока нет надежного раннего события и стабильного layout viewport.
- Не чинить PWA iOS и Telegram Mini App одной веткой: `telegram-web-app.js` может существовать в PWA, но это не значит, что среда является Telegram runtime.
- Не менять общий chat CSS без учета порядка импортов: поздние правила в `styles-home-sections.css` перебивают split chat CSS.

## Следующий Шаг

Если проблема повторяется после `2.433`, использовать расширенный скрин `Keyboard Lab` и принять решение по факту:

- если `hKb/bKb = 0` — чинить ранний trigger keyboard-state;
- если `chatCmp position != fixed` — чинить selector/cascade;
- если `chatCmp bottom` неверный — чинить один источник bottom;
- если `shell` уехал, а `chatHdr` не fixed — чинить header detachment/root-scroll;
- если `shell` уехал, но `chatHdr` fixed, а composer неверный — чинить только composer/messages, не шапку.
