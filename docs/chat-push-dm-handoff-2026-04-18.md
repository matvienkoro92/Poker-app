# Chat Push DM Handoff — 2026-04-18

## Контекст

Проект: `poker-club-miniapp`

Основная незакрытая задача:

- по клику на push-уведомление с личным сообщением пользователь должен попадать сразу в DM с отправителем

Фактическое текущее поведение на iPhone PWA при cold-open:

- push приходит
- по клику открывается раздел `Чаты`
- список диалогов и список игроков теперь уже прогружаются
- но конкретный DM не открывается, несмотря на многократные попытки открытия в коде

Актуальная версия на момент handoff:

- `1.798`
- ветка: `main`
- последний коммит: `4650ab2` — `Prefer resolved DM open for push deep links`

---

## Что уже установлено точно

Ниже то, что уже подтверждено логами, overlay и ручной проверкой, и не требует повторного гадания.

### 1. Канал push жив

- push-подписка не умерла окончательно
- push снова приходят в PWA
- была фаза с задержками доставки, но сам канал работает

Важно:

- слишком агрессивные попытки принудительного re-sync после `serviceWorker.register(...)` ухудшали доставку
- после отката eager re-sync push снова начали доходить

### 2. Проблема не в потере `with=<peer>`

Через overlay подтверждено:

- payload доходит до клиента
- pending state с нужным `tg_...` сохраняется
- код открытия нужного диалога реально вызывается

Логически это значит:

- проблема не в самом факте доставки deep-link
- проблема не в том, что peer id теряется до открытия чата

### 3. Проблема уже локализована в UI / chat-init path

По cold-open трассе видно:

- вызываются шаги `pending-dm`
- вызываются `openPendingNoContacts`
- вызываются `openConv-direct`
- вызывается post-refresh reopen

Но итоговое состояние остаётся:

- `view=chat`
- `tab=dialogs`
- `conv=0`

То есть код открытия DM вызывается, но UI не закрепляется в conversation view.

---

## Что было проверено и к чему это привело

Ниже перечислены основные гипотезы, которые уже были проверены серией релизов.

### Гипотеза A. Ломается передача push target из service worker

Что делали:

- правили `notificationclick` в `sw.js`
- передавали `openUrl` и `postMessage`
- фокусировали существующее окно
- навигировали newly opened client на deep-link

Вывод:

- это не основная проблема
- push target до клиента доходит

### Гипотеза B. Pending deep-link теряется в ранней инициализации PWA

Что делали:

- добавляли pending state
- late flush после экспорта chat-функций
- replay после `initChat`
- replay после `chatRefresh`
- post-refresh reopen

Вывод:

- часть ранних гонок действительно была
- их удалось сузить и частично закрыть
- но даже после этого UI не переключается в финальный conversation state

### Гипотеза C. Открытие не работает, потому что список чатов / контактов не успевает прогрузиться

Что делали:

- реализовали `openPendingNoContacts`
- пытались открыть DM вообще без зависимости от contacts list
- отдельно форсировали full bootstrap chat-экрана
- загружали `loadContacts()`, `loadGeneral()` и bootstrap fetch

Что выяснилось:

- раньше chat-screen действительно мог быть недоинициализирован
- это частично починили: список диалогов и список игроков теперь грузятся
- но даже после этого DM по push всё равно не открывается

Вывод:

- недогрузка chat-screen была частью проблемы
- но не является последней точкой сбоя

### Гипотеза D. Откат в список вызывает `showDialogs`, `showList` или `chatRefresh`

Что делали:

- добавили forced-peer guards в `showDialogs`
- добавили forced-peer guards в `showList`
- добавили anti-rollback в `chatRefresh`

Что увидели:

- по последним логам `chatRefresh-blocked` не появлялся
- значит именно `chatRefresh` уже не выглядит главным виновником отката

Вывод:

- rollback действительно был
- но текущий остаточный сбой, похоже, уже не сидит только в `chatRefresh`

### Гипотеза E. Direct shell open сам по себе недостаточен

Это сейчас наиболее вероятная рабочая гипотеза.

Что видно:

- `openConv-direct` вызывается
- `openPushDmImmediate(...)` вызывается
- shell принудительно переключается в personal/conv
- но экран всё равно остаётся на списке

Вывод:

- direct shell open, вероятно, не проходит какой-то полноценный “нормальный” путь инициализации
- из-за этого UI позже оказывается снова в режиме dialogs

Именно поэтому в `1.798` логика была смещена в сторону:

- если контакт уже найден, открывать DM через тот же путь, что обычный тап по строке (`chatOpenConvFromDialogs`)

---

## Хронология релизов 1.779–1.798

Ниже только подтверждённые шаги текущего цикла отладки.

### `1.779` — `07cb259`

- `sw.js`: по клику на push окно навигируется на `?startapp=club_chat_dm&with=<senderId>`
- `app.js`: deep-link дополнительно закреплялся через `history.replaceState`

### `1.780` — `8ec0cc1`

- защита от rollback в список чатов
- блокировка `showDialogs()` при активном push-open

### `1.781` — `cf4d89f`

- сохранение pending deep-link при `chatRefresh`

### `1.782` — `19f767c`

- детальный debug overlay
- state trace по ключевым точкам

### `1.783` — `4fe2819`

- late flush pending push-DM после готовности chat exports

### `1.784` — `d1ad0b8`

- прямое открытие pending DM при `setView("chat")`

### `1.785` — `c8bc0e3`

- попытка форсировать обновление SW через `updateViaCache: "none"` и `reg.update()`

Итог:

- привело к рискам по push-delivery
- затем эта линия была фактически свёрнута

### `1.786` — `cc5bbdb`

- `setView-chat-open-pending` переведён на direct fallback helper с повторами

### `1.787` — `1e81656`

- path открытия DM без ожидания полной загрузки contacts list

### `1.788` — `a8415cb`

- post-refresh reopen pending DM

### `1.789` — `be7a619`

- стабилизация conversation shell после direct-open

### `1.790` — `e5e26fa`

- принудительный full bootstrap chat-screen после push-open
- форс `loadContacts()`, `loadGeneral()`, bootstrap fetch

### `1.791` — `d0d33cc`

- найден и исправлен `ReferenceError` на `pokerEnsureOpenPendingChatPersonalFromDeepLink`
- helper вынесен в `window.__pokerEnsureOpenPendingChatPersonalFromDeepLink`

### `1.792` — `6dccc61`

- добиты оставшиеся прямые вызовы локального helper-а

### `1.793` — `8540856`

- попытка re-sync push subscription после регистрации SW

Итог:

- вызывало проблемы с доставкой push

### `1.794` — `2bde5eb`

- оставшиеся вызовы helper-а переведены на глобальный wrapper в runtime-критичных местах

### `1.795` — `e5b2b40`

- откат eager re-sync подписки после `serviceWorker.register(...)`

Итог:

- push снова начали приходить

### `1.796` — `b29900b`

- persistent push-open trace через `sessionStorage`
- overlay переживает cold-open и годится для дальнейшей диагностики

### `1.797` — `773fc59`

- anti-rollback в `chatRefresh`
- если активен `__pokerForcePushDmPeer`, refresh не должен закреплять `dialogs`

### `1.798` — `4650ab2`

- приоритет смещён на resolved-contact path
- если контакт уже найден, push-open пытается открыть DM через `chatOpenConvFromDialogs`, а не только через direct shell
- добавлен debug шаг `openConv-resolved`

---

## Текущее диагностическое состояние по логам

Последние пользовательские скрины overlay показывают примерно такую картину:

- `chat-exports-flush`
- `openPendingNoContacts :: tg_388008256`
- `openConv-direct :: tg_388008256`
- `setView-chat-post-refresh-open`
- далее повтор pending/openPendingNoContacts/openConv-direct

Что это значит:

- код несколько раз пытается открыть нужный DM
- но conversation view не фиксируется
- при этом сейчас список чатов и список игроков уже успешно грузятся

Ключевой практический вывод:

- баг уже не в “невозможности найти чат”
- баг уже не в “не пришёл peer id”
- баг уже не в “не загрузился список вообще”
- баг остаётся именно в окончательном переводе UI в открытый DM

---

## Какие файлы важны для следующего агента

### [app.js](/Users/kosmonavt/Documents/poker-club-miniapp/app.js)

Ключевые зоны:

- `pokerPushOpenDebug(...)`
- `pokerPushOpenStateDebug(...)`
- `pokerPushDebugRenderOverlay(...)`
- `pokerRestorePushDebugTrail(...)`
- `pokerFindChatContactByPeerId(...)`
- `pokerOpenResolvedChatPeer(...)`
- `pokerOpenChatPeerDirectFallback(...)`
- `pokerOpenPendingPushDmWithoutContacts(...)`
- `pokerEnsureOpenPendingChatPersonalFromDeepLink(...)`
- `setView(viewName, navOpts)` ветка `viewName === "chat"`
- `openPushDmImmediate(...)`
- `openConvFromDialogs(...)`
- `window.chatRefresh = function () { ... }`
- guards в `showDialogs()` и `showList()`

### [sw.js](/Users/kosmonavt/Documents/poker-club-miniapp/sw.js)

Ключевая зона:

- `notificationclick`

### [index.html](/Users/kosmonavt/Documents/poker-club-miniapp/index.html)

Ключевая зона:

- `data-app-version`
- после каждого отдельного push-фикса версия поднимается на `+0.001`

---

## Что уже не стоит делать снова без новой причины

Ниже список шагов, которые уже пробовались и в текущем виде не дали окончательного результата.

- снова бесконечно наращивать direct-shell retries
- снова aggressively форсировать SW update через `updateViaCache: "none"` и `reg.update()` без отдельной необходимости
- снова aggressively re-sync push subscription сразу после `serviceWorker.register(...)`
- снова лечить проблему как будто это потеря `with=<peer>` в payload

Эти направления уже либо не помогли, либо вредили push-delivery.

---

## Самая вероятная оставшаяся точка сбоя

Наиболее вероятное объяснение на текущем этапе:

- `openPushDmImmediate(...)` умеет визуально форсировать shell
- но не выполняет весь набор переходов/сайд-эффектов, который делает обычный пользовательский path `openConvFromDialogs(...)` + `showConv(...)` + связанная tab/init логика
- из-за этого после cold-open какой-то следующий этап инициализации возвращает UI в состояние dialogs, либо просто не считает conversation полноценно открытым

Именно поэтому текущая линия отладки смещена на:

- максимум использовать resolved-contact path
- максимум переиспользовать обычный пользовательский flow открытия диалога

---

## Рекомендуемый следующий шаг

Если `1.798` не закрывает баг, следующий агенту лучше идти не “ещё одним retry”, а так:

### Вариант 1 — приоритетный

Разобрать различие между:

- `openPushDmImmediate(...)`
- `openConvFromDialogs(...)`
- `showConv(...)`

и явно проверить, какие поля/классы/состояния после обычного тапа отличаются от cold-open push path.

Нужно сравнить минимум:

- `chatActiveTab`
- `chatWithUserId`
- состояние `dialogsView`, `personalView`, `listView`, `convView`
- вызовы `setTab("personal")`
- вызовы `showConv(...)`
- вызовы загрузки сообщений и побочные эффекты вокруг header / composer / focus-state

### Вариант 2

Если resolved-contact path не спасает, сделать не “direct shell opener”, а отдельный жёсткий helper:

- сначала дождаться полной готовности chat exports и contacts
- затем открыть DM исключительно через normal conv path
- и только если normal path невозможен, использовать shell fallback

### Вариант 3

Если на устройстве снова потребуется runtime-диагностика:

- опираться не на ручной консольный tracer
- а на текущий встроенный overlay / persistent trace

Потому что для cold-open это уже показало себя надёжнее, чем временный код из консоли Safari Web Inspector.

---

## Краткий итог

Работа дала реальный прогресс:

- push жив
- chat-screen после push инициализируется заметно лучше
- список диалогов и список игроков теперь загружаются
- проблема сузилась до узкого остаточного бага переключения из dialogs в конкретный DM

Главное:

- это уже не “всё ломается везде”
- это уже конкретный UI/open-path баг, локализованный в chat-init / conv-open поведении на cold-open PWA
