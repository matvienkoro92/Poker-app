# Raffles And Chat Stability Worklog — 2026-05-03

Рабочий журнал по блоку правок вокруг розыгрышей, админских кнопок, ускорения входа в раздел `raffles`, debug-оверлея клавиатуры и мелких iOS/PWA chat composer сценариев.

## Scope

- Админские кнопки розыгрышей: `Завершить`, `Отменить`, `Удалить`, удаление завершенных розыгрышей.
- Поведение confirm в Telegram Mini App и в PWA/браузере.
- Скорость первого входа в раздел `Розыгрыши`.
- Защита от stale DOM/listeners после lazy HTML fragment hydration.
- Красная debug-панель chat keyboard, которая не должна попадать пользователям.
- Emoji/composer фокус в iOS PWA: выбор смайлов не должен закрывать клавиатуру.
- Back из личного диалога: быстрый tap не должен оставлять пользователя в полудиалоге с tabbar.
- Отправка сообщения при опущенном composer: send не должен поднимать composer, если уже есть текст/вложение.

## Version Timeline

- `2.567` / `168aaba` — фикс быстрых chat/back сценариев, send при опущенном composer, первичная повторная привязка raffle admin controls.
- `2.568` / `79859b6` — усиление keep-alive для emoji/composer и fallback для активных raffle admin buttons.
- `2.569` / `b3abb59` — реальная причина неработающего удаления розыгрыша: fake `Telegram.WebApp.showConfirm` вне Telegram; confirm переведен на environment-aware helper.
- После `2.569` в рабочем дереве добавлены pending-правки: ускорение загрузки `raffles` и запрет production debug-панели keyboard.

## Raffle Admin Buttons

### Найденные причины

1. `telegram-web-app.js` создает `window.Telegram.WebApp` даже вне настоящего Telegram runtime.
2. Код проверял только наличие `tg.showConfirm`, поэтому в PWA/браузере вызывался Telegram popup bridge.
3. В PWA/браузере этот bridge не возвращает callback, и действие не выполняется. Визуально это выглядит как "кнопка не срабатывает".
4. После lazy hydration `initRaffles()` мог считать listeners уже привязанными, хотя реальные DOM-кнопки появились позже или были заменены.
5. Fallback-listener на root мог жить со старым closure и старым `currentRaffleId`, если root не пересоздавался.
6. Часть соседних admin actions для рассылки все еще требовала только `initData`, хотя админ в PWA может приходить через `pwaSession`.

### Зафиксированная схема

- `confirmRaffleAdminAction(message, onOk)` — единая точка подтверждения для raffle admin actions.
- Telegram popup используется только если `isTelegramWebApp()` подтверждает настоящий Telegram runtime.
- В PWA/браузере используется обычный `window.confirm`.
- Активные `cancel/delete` идут через общий `runActiveRaffleAdminAction()`.
- При повторной инициализации старый fallback listener снимается через `removeEventListener`, чтобы не оставался stale closure.
- `retryFailedBroadcast` и `purgeBlockedSubscribers` используют `pokerGuestOrAuthedPostBody()`, а не только raw `initData`.

### Инварианты

- Не проверять Telegram runtime только через существование `window.Telegram.WebApp`.
- Для действий, которые зависят от callback, всегда проверять `isTelegramWebApp()`.
- Admin UI может быть показан по `pwaSession`; POST body тоже должен уметь нести `pwaSession`.
- Любой listener, который закрывает над `currentRaffleId`, должен пересоздаваться или явно сниматься при reinit.

## Raffles Loading Performance

### Симптом

При входе в раздел `Розыгрыши` пользователь видит долгую загрузку, хотя для первого экрана нужен в основном активный розыгрыш.

### Найденные причины

- Frontend после получения API-ответа сразу строил тяжелую вкладку `Завершенные`: список всех завершенных карточек, winners, leaders.
- Это происходило до того, как пользователь видел активный розыгрыш.
- Backend list endpoint читал каждый raffle из Redis отдельным `await redisPipeline([GET])` в цикле.
- Гидрация имен участников и победителей также выполнялась по одному raffle, что размножало `HMGET`.

### Pending-исправления

- В `app-raffles.js` активный розыгрыш рендерится первым.
- Счетчики вкладки `Завершенные` обновляются сразу, но тяжелый DOM списка и leaders строятся через deferred pass.
- Если пользователь уже находится на вкладке `Завершенные` или действие само переключает туда, список строится сразу.
- В `lib/api-handlers/raffles.js` список raffle keys читается пачкой через один pipeline.
- Имена участников/победителей собираются по всем raffles и гидратятся двумя `HMGET`, а не отдельно на каждый raffle.
- Измененные hydrated raffles пишутся обратно пачкой.

### Инварианты

- Первый экран `raffles` не должен ждать архив завершенных розыгрышей.
- Backend list endpoint не должен делать N последовательных Redis round-trips для N розыгрышей.
- Если нужно показать только active tab, тяжелый archive DOM должен быть lazy/deferred.
- При переходе на `completed` нужно строить архив без пустого состояния и без ожидания следующего API fetch.

## Chat Keyboard Debug Overlay

### Симптом

У некоторых пользователей в чате видна красная debug-панель вида:

`ver:... iosPwa:... ih:... vv:... kb:...`

### Причина

- Debug-панель включалась через `localStorage.poker_chat_keyboard_debug=1`.
- У части клиентов этот флаг остался после диагностики.
- Код также показывал debug automatically для `chatIsAdmin` в iOS PWA.

### Зафиксированная схема

- Production больше не должен уважать `localStorage.poker_chat_keyboard_debug`.
- На боевом домене старый localStorage-флаг автоматически удаляется.
- Админ больше не видит debug-панель автоматически.
- Debug допускается только:
  - на `localhost` / `127.0.0.1` / `0.0.0.0`;
  - или при явном URL-флаге `?chatKeyboardDebug=1`.

### Инварианты

- Диагностический UI не должен включаться у пользователей из persistent localStorage.
- Admin status не должен сам по себе включать визуальный debug.
- Любой debug-флаг должен быть explicit и желательно URL-scoped.

## Emoji / Composer Focus

### Симптом

Когда iOS PWA composer поднят и пользователь нажимает кнопку смайлов, клавиатура может уехать/закрыться.

### Причина

- Emoji button и emoji picker элементы могут на короткий момент украсть focus у textarea.
- Старая защита работала только если app уже считал keyboard open.
- На iOS важна ранняя стадия `pointerdown/touchstart`, до того как blur успел закрыть native keyboard session.

### Зафиксированная схема

- `primeChatEmojiComposerKeepAlive()` ставит keep-alive до попытки вернуть focus.
- `shouldPreserveChatEmojiComposerFocus()` учитывает не только текущий `chat-keyboard-open`, но и fresh focus/opening/keepAlive windows.
- Повторные focus-pass delays расширены, чтобы пережить delayed blur/viewport события.
- Для touch/mobile context разрешается сохранять textarea focus раньше, чем desktop/physical-keyboard branch.

### Инварианты

- Tap по emoji controls внутри composer не считается явным dismiss keyboard.
- Не полагаться только на `document.activeElement` после touch event.
- Keep-alive должен ставиться на раннем pointer/touch этапе.

## Chat Back And Send Edge Cases

### Back Из Лички

- Быстрый tap по back мог сработать во время delayed open stabilizer.
- Итог: пользователь оставался в диалоге, появлялся tabbar, back переставал работать.
- Защита: back увеличивает `window.__pokerChatConvBackSeq`; delayed stabilizers обязаны сравнить seq и не возвращать conversation state после back.

### Send При Опущенном Composer

- Если в textarea уже есть текст/вложение, tap по send не должен фокусить textarea и поднимать composer.
- `bindChatSendTap()` проверяет sendable content до focus-lift и сразу запускает отправку.

## Verification

Минимальные проверки для этого блока:

- `node --check app-raffles.js`
- `node --check lib/api-handlers/raffles.js`
- `node --check app-chat-lifecycle.js`
- `node scripts/contract-tests.js`
- `npm run build`

Дополнительный smoke, который уже использовался:

- PWA/non-Telegram environment: click `#raffleDeleteBtn` должен вызвать обычный confirm и отправить POST `{ action: "delete", raffleId }`.

Ручная проверка:

- В PWA/браузере кнопка `Удалить розыгрыш` открывает confirm и после подтверждения удаляет розыгрыш.
- В Telegram Mini App confirm остается Telegram-native.
- Первый вход в `Розыгрыши` показывает активную карточку без ожидания тяжелого архива.
- Красная debug-панель не появляется у обычных пользователей и админов на боевом домене.
- Emoji picker открывается без закрытия keyboard.
