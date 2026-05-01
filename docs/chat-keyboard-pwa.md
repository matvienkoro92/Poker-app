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

## Решение Самозакрытия Клавиатуры

Финальная подтвержденная причина самопроизвольного закрытия keyboard в iOS PWA была не в `blur` как таковом, а в конфликте между native opening textarea и нашим root-scroll-lock.

Во время первых кадров после `touchstart/focus` приложение несколько раз принудительно вызывало root-scroll reset:

- `attachPwaChatThreadRootScrollLock()` включался сразу при фокусе composer;
- `pwaChatThreadRootScrollToZero()` делал `window.scrollTo(0, 0)` и сбрасывал `document.scrollingElement/html/body.scrollTop`;
- дополнительные delayed-проходы выполнялись через `40/120/260/520 ms`;
- параллельно iOS/WKWebView еще открывал native keyboard и автоскроллил focused textarea.

На iOS PWA такой программный root scroll в момент открытия keyboard может отменить native keyboard session: клавиатура закрывается, но наш JS уже успел поставить `chat-keyboard-open` и `chat-input-area--vv-dock`, поэтому composer остается поднятым без клавиатуры.

Фикс в `51b37f3` / `2.511`:

- добавлен `shouldSkipPwaChatRootScrollDuringComposerOpen(focusTarget)`;
- `pwaChatThreadRootScrollToZero(focusTarget)` больше не трогает root scroll, пока открыт стартовый hold окна keyboard composer;
- защита проверяет именно iOS PWA chat thread composer, `chat-keyboard-open`, `__pokerChatKeyboardOpeningUntil` и свежий `__pokerChatKeyboardFocusAtMs`;
- после окна открытия обычная очистка scroll-артефактов остается доступной.

Практическое правило: во время открытия iOS PWA composer нельзя вызывать `window.scrollTo(0, 0)`, сбрасывать `html/body.scrollTop` или запускать аналогичный root-scroll cleanup. Сначала нужно дать iOS завершить native keyboard opening, а уже потом чистить root/shell артефакты, если они реально остались.

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
- `51b37f3` / `2.511` — запрет root-scroll reset во время открытия iOS PWA composer; устранил самозакрытие клавиатуры.

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
- Нельзя делать root-scroll reset во время opening hold iOS PWA composer: это может закрыть native keyboard, оставив composer в dock-состоянии.
- Любой новый фикс должен проверяться по `Keyboard Lab` метрикам, а не только визуально.

## Что Не Делать

- Не возвращать большой JS `bottom = keyboardCover + gap` для iOS PWA без подтверждения метриками: это уже давало "улетает выше".
- Не убирать CSS fallback полностью, пока нет надежного раннего события и стабильного layout viewport.
- Не вызывать `window.scrollTo(0, 0)`, `scrollMainDocumentToTop()` или прямой сброс `html/body.scrollTop` в первые кадры после `touchstart/focus` chat composer на iOS PWA.
- Не чинить PWA iOS и Telegram Mini App одной веткой: `telegram-web-app.js` может существовать в PWA, но это не значит, что среда является Telegram runtime.
- Не менять общий chat CSS без учета порядка импортов: поздние правила в `styles-home-sections.css` перебивают split chat CSS.

## Итоговая Зафиксированная Схема После Финальных Правок

Дата фиксации: 2026-05-02. Этот раздел описывает рабочее состояние после серии правок `2.521` - `2.527`, когда пользовательская проверка подтвердила: composer поднимается на нужное место, лента и шапки не дергаются, клавиатура не закрывается сама, а возврат в приложение больше не должен накапливать вторую высоту клавиатуры.

### Что Сработало Для iOS PWA Keyboard/Composer

- Основной режим для iOS PWA chat thread: `CSS-only dock` через `shouldUseCssOnlyIosPwaChatComposerDock()` и `applyCssOnlyIosPwaChatComposerDock()`.
- Для этого режима `--chat-vv-inset` намеренно ставится в `0px`, а `--chat-ios-accessory-inset` удаляется. Это важно: старый общий accessory inset вместе с fixed bottom давал двойной учет клавиатуры.
- Единственный источник высоты composer в этом режиме: `--chat-ios-pwa-thread-composer-bottom`, рассчитанный в `getCssOnlyIosPwaChatComposerBottomPx()`.
- В расчет bottom добавлен отдельный `accessoryLift` под белую iOS input accessory bar. После пользовательской проверки добавлен тонкий `fineLift = 4`, чтобы composer стоял чуть выше панели.
- CSS fallback в `styles-home-sections.css` и `styles-chat-after-responsive.css` поднят синхронно: `clamp(272px, calc(36vh + 52px), 424px)`. Это страховка до того, как JS успел выставить переменную.
- `updateChatMessagesKeyboardPad()` для CSS-only PWA берет тот же locked bottom (`__pokerChatIosPwaComposerBottomLockPx` / `__pokerChatThreadDockBottomCssPx`), поэтому лента и composer живут в одной системе координат.
- Задержка старта dock уменьшена: если `visualViewport` уже подтверждает открытую клавиатуру, dock можно применять примерно после `180ms`; если viewport еще не готов, остается защитная пауза. Это убрало ощущение, что строка поднимается только через секунду.

### Что Сработало Против Самозакрытия Клавиатуры

- Не делать root-scroll reset во время opening hold iOS PWA composer. Это остается главным правилом.
- `shouldSkipPwaChatRootScrollDuringComposerOpen()` защищает первые кадры native keyboard session от `window.scrollTo(0, 0)` и сброса `html/body.scrollTop`.
- `finalizeIosPwaChatThreadClosedKeyboard()` должен срабатывать только когда viewport реально выглядит закрытым. Нельзя считать keyboard закрытой только по временному `activeElement`/focus-скачку.
- Pointer-dismiss оставлен только для явного клика вне composer/emoji/attach/context/scroll-bottom controls. Он не должен реагировать на события внутри строки ввода.

### Что Сработало При Сворачивании И Возврате В PWA

- При `visibilitychange hidden` и `pagehide` нужно сбрасывать именно визуальный dock-state iOS PWA: классы `chat-keyboard-open`, `chat-input-area--vv-dock`, CSS-переменные keyboard/composer и locked bottom.
- При этом нельзя принудительно чистить текст или ломать содержание composer.
- При `pageshow`, `visibilitychange visible` и `window focus` dock собирается заново только если активная textarea еще есть и `isIosPwaChatThreadKeyboardOpenConfirmed()` подтверждает открытую клавиатуру.
- Это предотвращает накопление второй высоты клавиатуры после сценария: нажал composer -> свернул приложение -> вернулся.

### Что Сработало Для Навигации В Чате

- Первый вход в личный/групповой диалог защищен от delayed refresh, который мог вернуть пользователя в список диалогов.
- Back-кнопки в чате получили более надежную touch/hit-area обработку, чтобы первый tap на iPhone не терялся.
- Header личного/общего чата держится отдельно от keyboard composer dock: шапка не должна участвовать в нижнем подъеме composer.

### Что Сработало Для Друзей И Контактов

- Удаление друга теперь optimistic: локальный UI обновляется сразу, а не ждет полного reload contacts.
- В `pokerRemoveLocalFriendFromChatContacts()` удаление идет по связке id: `userId`, `chatUserId`, `accountId`, `id`, `__friendAccountId` и нормализованные варианты. Это важно, потому что список чатов и список друзей могут ссылаться на одного игрока разными id.
- Открытая модалка друзей тоже чистится сразу через `pokerRemoveFriendFromOpenFriendsList()`.
- При ошибке API локальное состояние возвращается через `pokerApplyLocalFriendToChatContacts()`.

### Что Можно Менять Аккуратно

- Визуал кнопок composer (`.chat-send-btn`, `.chat-send-btn--mic`, `.chat-voice-preview__send`) можно менять CSS-ом, если не трогать id, текстовые переключатели, классы состояния и обработчики в JS.
- Цвета/тени кнопок безопасны, пока не меняются размеры `36px` для основной action column и не меняется ширина `.chat-composer-actions`; иначе можно задеть позицию emoji/scroll-bottom.

### Коммиты Финального Стабильного Блока

- `5758def` / `2.521` — стабилизация iOS PWA focus gesture.
- `8f94c70` / `2.522` — восстановление active composer lift session.
- `c88cde2` / `2.523` — поднятие composer над iOS accessory bar.
- `541e0a6` / `2.524` — точная настройка высоты `+4px` и более ранний dock после подтвержденного viewport.
- `ac4021e` / `2.525` — сброс dock-state при уходе PWA в background и пересборка при возврате.
- `684204e` / `2.526` — чисто визуальная полировка кнопок отправки/микрофона без изменения функционала.
- `9a3dfe3` / `2.527` — optimistic удаление друзей из списков и кэшей по всем связанным id.

### Финальные Инварианты

- Для iOS PWA thread composer должен быть один нижний источник правды: `--chat-ios-pwa-thread-composer-bottom`.
- `--chat-ios-accessory-inset` не включать обратно в CSS-only dock, иначе высок риск двойной клавиатуры.
- Root scroll cleanup запрещен в первые кадры открытия keyboard.
- Background/foreground должен сбрасывать старый dock перед пересборкой.
- Лента сообщений должна получать padding из того же locked bottom, что и composer.
- Любая правка keyboard должна проверяться сценариями: первый tap, личный чат, общий чат, закрытие keyboard, сворачивание/возврат, повторный tap, tap вне composer.

## Следующий Шаг

Если проблема повторяется после `2.527`, использовать расширенный скрин `Keyboard Lab` и принять решение по факту:

- если `hKb/bKb = 0` — чинить ранний trigger keyboard-state;
- если `chatCmp position != fixed` — чинить selector/cascade;
- если `chatCmp bottom` неверный — чинить один источник bottom;
- если `shell` уехал, а `chatHdr` не fixed — чинить header detachment/root-scroll;
- если `shell` уехал, но `chatHdr` fixed, а composer неверный — чинить только composer/messages, не шапку.
