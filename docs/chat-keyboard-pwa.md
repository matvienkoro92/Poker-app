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

## Дополнение 2026-05-03: Emoji, Partial Scroll Lift, Hidden Assets

Этот блок фиксирует свежие регрессии вокруг уже поднятого composer и клавиатуры. Их важно держать как часть keyboard/composer contract, потому что все три бага проявлялись не как отдельная верстка, а как нарушение состояния активного чата.

### Emoji Focus Contract

- Кнопка emoji и элементы picker считаются частью composer chrome. Tap по `.chat-emoji-btn`, `.chat-emoji-picker`, `.chat-emoji-picker__emoji` и связанным controls не должен закрывать native keyboard, если до тапа была активна chat textarea.
- `app-chat-lifecycle.js` должен сохранять активный composer textarea через `isChatEmojiComposerTextarea()`, `isTouchChatEmojiFocusContext()` и `shouldPreserveChatEmojiComposerFocus()`.
- На touch/mobile событиях emoji controls нужно предотвращать focus-steal: native focus должен остаться на textarea, а picker/emoji action должны выполняться поверх открытой клавиатуры.
- Этот guard нельзя сужать только до iOS PWA или Telegram runtime. Практически важный критерий - touch/mobile chat composer context с активной или недавно активной textarea.
- Pointer-dismiss и blur-cleanup должны игнорировать события внутри composer/emoji/attach/context/scroll-bottom controls. Emoji tap - не сигнал "пользователь ушел из ввода".

### Partial Scroll Lift Contract

- `updateChatMessagesKeyboardPad()` не должен ограничиваться сменой `padding-bottom`. Если лента слегка отскроллена вверх и не находится строго на самом дне, новый padding сам по себе не поднимет видимые сообщения вместе с composer.
- Перед изменением padding нужно сохранить `scrollTop`, предыдущий keyboard/composer pad и bottom gap. После роста pad, если пользователь находится близко к низу, нужно поднять scroll позицию примерно на дельту pad.
- Важная разница: near-bottom anchored lift не должен принудительно snap-ить ленту к последнему сообщению. Он сохраняет пользовательскую дистанцию от низа, но освобождает место под поднятый composer.
- Для iOS PWA/CSS-only dock, где обычный snap часто намеренно отключен, near-bottom lift все равно нужен. Иначе composer визуально поднимается, а лента остается под ним.
- Практический threshold для "слегка отскоролено вверх" должен быть шире, чем строгий bottom epsilon: ориентир - сотни пикселей или доля `clientHeight`, а не только `<= 2px`.

### Hidden Asset Contract

- Smoke navigation может ловить скрытые assets, которые грузятся до входа в их view. Последний пример - `dep-manager.jpg` и `dep-manager-vika.jpg` из cashout-раздела.
- Скрытые view-specific изображения не должны иметь обычный `src` в initial DOM. Использовать `data-src` и гидрировать `src` только при входе в соответствующий view.
- Для cashout `app-view-router.js` должен вызывать `updateCashoutManager()` при входе в `viewName === "cashout"`, а `app-cashout.js` должен выставлять manager image `src` только когда `body[data-view="cashout"]`.
- Это правило особенно важно для `smoke:nav`: preloaded hidden images считаются регрессией, даже если визуально раздел работает.

### Проверка После Таких Правок

- `node scripts/check-js-syntax.js`
- `npm run build`
- `npm run smoke`
- `npm run smoke:nav`

## Дополнение 2026-05-03: Resting Composer, Re-Armed Bottom Follow, Emoji Height

Этот блок уточняет contract после правок `2.570` и `2.572`. Главная идея: состояние composer делится на два разных режима, которые нельзя смешивать.

- Открытая keyboard: emoji/chrome controls должны сохранять активный composer и не закрывать клавиатуру.
- Закрытая keyboard, composer внизу: emoji/chrome controls не должны заново поднимать composer только из-за старого `activeElement` или emoji-only значения.

### Resting Composer И Cleanup Закрытой Keyboard

- `pokerRepairClosedChatComposerRestingState(reason)` в `app-chat-keyboard.js` - общий repair для случаев, когда клавиатура уже закрыта, а composer/лента оставили stale dock-state.
- Repair чистит `chat-keyboard-open`, `chat-vv-lift`, `chat-input-area--vv-dock`, inline `position/bottom/transform`, CSS-переменные `--chat-vv-inset`, `--chat-keyboard-fallback-inset`, `--chat-ios-pwa-thread-composer-bottom`, `--chat-ios-accessory-inset` и inline `padding-bottom` у `.chat-messages`.
- `styles-chat-after-responsive.css` задает нижний resting reserve для общего и личного треда. В закрытом состоянии composer не должен стоять вплотную к нижней кромке, особенно на iPhone safe-area.
- Pointer-dismiss в `app-chat-lifecycle.js` должен сначала выставить dismiss flags (`__pokerChatPwaUserDismissAt`, сброс opening/keepAlive), затем вызвать `blur()`, затем дать быстрый и поздний cleanup. Это защищает от состояния "клавиатура уехала, composer остался наверху".
- Tap по `.chat-messages`/`.chat-messages-wrap` вне controls не должен ставить keep-alive. Это явное снятие фокуса, а не продолжение ввода.

### Re-Armed Bottom Follow После Ручного Скролла

- Старый `__pokerChatOpeningStickBottom` включался при первом открытии треда, но после ручного scroll up выключался и не включался обратно при возврате вниз. Итог: пользователь снова у последних сообщений, но следующий focus composer не поднимает ленту.
- `rememberChatMessagesBottomAffinity(el)` запоминает возврат пользователя к низу с расширенным порогом `CHAT_SCROLL_BOTTOM_REARM_PX = 220`.
- `chatMessagesShouldFollowKeyboardLift(el)` используется перед применением keyboard padding/dock. Это важно делать до изменения padding, потому что после padding distance-to-bottom уже искажен.
- `scheduleChatKeyboardBottomFollow(el, reason)` несколько кадров дотягивает ленту к `scrollHeight` после focus/pad. Это покрывает асинхронность `visualViewport`, fixed composer и пересчета высоты ленты.
- Явный жест вверх должен вызывать `clearChatMessagesKeyboardBottomFollow(el)`, чтобы чтение старых сообщений не перебивалось автоскроллом.

### Emoji Height Contract

- Emoji являются содержимым сообщения, но не являются текстом для расчета высоты composer.
- `app-chat-lifecycle.js` нормализует значение для замера через `chatComposerValueForHeight(value)`: удаляются emoji ranges, variation selectors и zero-width joiner. Реальная `textarea.value` не меняется.
- `chatComposerValueHasTextForHeight(value)` отвечает только на вопрос "есть ли текст, который должен влиять на высоту".
- `app-shared-helpers.js` поддерживает `pokerAutosizeTextarea(ta, { measureValue })`. Это позволяет хранить одно значение в textarea, а измерять высоту по другому.
- Правила высоты:
  - emoji-only -> `44px`, `overflowY = hidden`;
  - текст + emoji -> высота считается по тексту без emoji;
  - длинный обычный текст -> autosize до `140px` как раньше.
- `shouldPreserveChatEmojiComposerFocus()` не должен считать один только `document.activeElement === textarea` причиной для повторного dock, если `isChatKeyboardLayoutEffectivelyClosed({ ignoreDockBottom: true })` говорит, что keyboard закрыта.

### Версии, Коммиты, Проверки

- `080d1b2` / `2.570` / `build 1.719` - resting bottom reserve, repair закрытой keyboard, pointer-dismiss cleanup.
- `920740f` / `2.572` / `build 1.720` - re-armed bottom follow после ручного скролла, emoji не будит закрытый dock, emoji не увеличивает высоту composer.
- `2.571` относится к промежуточному player CRM изменению, поэтому следующий chat composer блок зафиксирован как `2.572`.
- Проверки для этих сценариев:
  - `node --check app-chat-keyboard.js`;
  - `node --check app-chat-lifecycle.js`;
  - `node --check app-shared-helpers.js`;
  - `git diff --check`;
  - `npm run build`;
  - Playwright smoke: dismiss outside -> composer возвращается вниз;
  - Playwright smoke: scroll down -> scroll up -> scroll down -> focus/pad -> bottom gap `0`;
  - Playwright smoke: 25 emoji -> textarea `44px`, длинный текст -> autosize до `140px`.

### Push И Version Bump

- Если `node scripts/bump-pwa-login-version.js` или `npm run bump:pwa-version` уже выполнен вручную перед commit, push делать через `SKIP_PWA_VERSION_BUMP=1 git push origin main`.
- Иначе pre-push hook добавит еще один `+0.001`, и версия уйдет на лишний шаг.
- Chat visible build marker в `html-fragments/chat.html` обновлять вместе с пользовательскими chat composer фиксами, чтобы скриншоты из главного чата можно было связать с конкретным rollout.

## Дополнение 2026-05-03: Keyboard Debug Overlay

Красная diagnostic-панель внизу чата предназначена только для локальной отладки keyboard/composer. Она не должна автоматически включаться у админов или игроков в production.

- Источник регрессии: у части пользователей в `localStorage` оставался старый `poker_chat_keyboard_debug=1`, а код также мог показывать панель для `chatIsAdmin`.
- Production/PWA/Telegram runtime должен очищать старый `localStorage.poker_chat_keyboard_debug` и возвращать `false`, если нет явно разрешенной debug-среды.
- Разрешенные способы включения:
  - localhost / `127.0.0.1` / `0.0.0.0` / empty hostname;
  - явный URL-флаг `?chatKeyboardDebug=1`.
- Admin status сам по себе не является причиной показывать debug-панель.
- Если похожая красная панель снова появляется у пользователя, первым делом проверять `shouldShowChatKeyboardDebugPanel()` и `isChatKeyboardDebugAllowedEnvironment()` в `app-chat-lifecycle.js`, а не CSS.

## Завершенный Блок 2026-05-03 - 2026-05-05: Composer, Emoji, Keyboard

Этот блок фиксирует уже закрытую работу после старого состояния `2.572`. Его важно читать как исторический baseline: после него в git-истории уже пошли отдельные треки CRM, module split/lazy loading, Poker21 binding, admin reports/rakeback и обновления рейтинга. Новые правки не должны снова трактовать эти пункты как открытые TODO.

### Что Закрыто

- Emoji-only ввод больше не поднимает закрытый composer и не открывает keyboard, если в поле нет обычного текста.
- `send` больше не является причиной подъема composer: если keyboard закрыта и пользователь отправляет emoji-only, текст или смешанное сообщение из нижнего состояния, composer остается внизу.
- Composer поднимается только от явного намерения печатать: touch/focus на textarea или восстановление реальной native keyboard session.
- Первый фокус в поле ввода восстановлен: composer должен подниматься сразу, даже после предыдущего закрытия keyboard или после быстрого повторного открытия.
- Быстрый reopen защищен от старых cleanup timers: отложенный dismiss/root-scroll cleanup не должен закрывать keyboard, если уже началась новая сессия открытия.
- Клик по emoji picker и emoji controls считается частью composer chrome. Он не должен воровать focus у textarea и не должен закрывать native keyboard.
- Первый клик по свободной зоне при открытом emoji picker закрывает только picker и оставляет composer/keyboard в текущем состоянии. Второй внешний клик уже может снять focus.
- Emoji picker закреплен как нижнее overlay-окно рядом с composer: он не должен улетать наверх, выпадать за viewport или ломать scroll на узких iPhone.
- На узких iOS экранах composer держит safe-area/resting reserve и не уезжает под системную строку.
- Лента сообщений сохраняет bottom-affinity при focus/open: если пользователь находится у низа или вернулся к низу после ручного scroll, keyboard pad поднимает ленту вместе с composer.
- Desktop/browser composer lift тоже восстановлен отдельно от iOS PWA ветки.
- В личном чате Poker21 ID в шапке стабилизирован: partial/empty `fastOpen`, typing state и быстрые refresh не должны заставлять ID то появляться, то исчезать.

### Версии И Коммиты

- `96ec564` / `2.591` - emoji controls сохраняют keyboard focus.
- `743db03` / `2.595` - стабилизация focus composer после пользовательской проверки на версии `2.595`.
- `f270bf9` / `2.600` - iOS docking composer, safe-area/resting reserve и соседние visual fixes.
- `d2cab58` / `2.601` - первая расширенная защита iOS keyboard focus.
- `5853d95` / `2.602` - запрет лишнего scroll во время открытия keyboard.
- `ba7322c` / `2.603` - разделение focus conflicts: send не поднимает composer, а явный focus поднимает.
- `3a12b6a` / `2.604` - защита быстрого reopen от старых cleanup timers.
- `cefa0f6` / `2.606` - стабильный Poker21 ID в header личного чата.
- `8b0f48d` / `2.607` - корректный dismiss composer в iOS PWA.
- `d75ddae` / `2.608` - opening keyboard и обновление notification sound без поломки keyboard session.
- `dc5c0d7` / `2.610` - cleanup не закрывает keyboard при reopen.
- `bc4091b` / `2.611` - дополнительная защита race при iOS PWA reopen.
- `61a0edc` / `2.616` - первый open keyboard/composer после входа в чат.
- `73e5a0a` / `2.621` - keyboard после scrolled feed и возврата к низу.
- `2235398` / `2.625` - stale cleanup не перебивает активную iOS PWA keyboard session.
- `cd5c4ca` / `2.662` - Keyboard Lab закреплен в footer для нормальной диагностики.
- `4c9a2de` / `2.680` - desktop composer lift восстановлен отдельно от mobile guards.
- `c3f9c4d` / `2.692` - стабилизация native keyboard reopen.
- `83b966d` / `2.693` - восстановлен первый lift composer.
- `c642e42` / `2.694` - rescue для implicit blur composer.
- `ee27448` / `2.695` - внешний tap по emoji закрывает picker без подъема composer и без первого dismiss keyboard.

### Соседний Theme Блок

Рядом с chat keyboard работой закрывался visual/theme хвост, который тоже не является открытой задачей:

- `c7fbfbb` / `2.492` - gold tabbar стал непрозрачным.
- `cc130f2` / `2.542` - chat composer и gold rating button.
- `0dcdd92` / `2.544` - Telegram home принудительно входит в gold theme.
- `1c54f54` / `2.549`, `a6f5000` / `2.550`, `4696ab1` / `2.552`, `7c519e9` / `2.553` - выравнивание gold/dark-blue фонов, блоков и tabbar icons.
- `a2bbadd` / `2.556` - light theme contrast.
- `72952a7` / `2.558` - cashout gold theme приведена к download.
- `9e6f888` / `2.559`, `7cc506b` / `2.562`, `2b7f7b6` / `2.566` - единый home background, легкий shimmer и активный цвет tabbar.

### Финальные Инварианты После `2.695`

- Не поднимать composer из `send`; подъем разрешен только от явного focus/touch intent или подтвержденной native keyboard session.
- Не считать emoji-only значимым текстом для lift/autosize. Emoji остаются содержимым сообщения, но не должны будить закрытую keyboard.
- Не вызывать root-scroll cleanup в первые кадры открытия keyboard и не запускать старый cleanup, если появился новый open intent.
- Emoji picker, attach controls, context menu и scroll-bottom controls входят в composer chrome для hit-test/pointer-dismiss.
- Внешний tap при открытом emoji picker сначала закрывает picker; dismiss textarea/keyboard начинается только со следующего внешнего tap.
- Header личного чата хранит последний известный Poker21 ID и не очищает его из-за partial/empty refresh.

### Проверки

- `npm run check:syntax`;
- `npm run smoke`;
- `npm run smoke:visual`;
- `git diff --check`;
- ручные iOS сценарии: первый focus, закрытие/open/reopen без паузы, emoji-only insert/send, text send из нижнего composer, emoji picker outside tap, scrolled feed -> focus, narrow iPhone safe-area, личный чат с Poker21 ID в header;
- `npm run smoke:nav` на момент этих правок мог падать на unrelated hidden asset/images, поэтому его результат нужно читать отдельно от keyboard/composer фиксов.

## Следующий Шаг

Если похожая проблема повторяется после `2.695`, использовать расширенный скрин `Keyboard Lab` и принять решение по факту, не откатывая закрытые инварианты выше:

- если `hKb/bKb = 0` — чинить ранний trigger keyboard-state;
- если `chatCmp position != fixed` — чинить selector/cascade;
- если `chatCmp bottom` неверный — чинить один источник bottom;
- если `shell` уехал, а `chatHdr` не fixed — чинить header detachment/root-scroll;
- если `shell` уехал, но `chatHdr` fixed, а composer неверный — чинить только composer/messages, не шапку.
