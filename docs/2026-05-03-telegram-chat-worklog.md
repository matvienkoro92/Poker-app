# 2026-05-03 Telegram Chat Worklog

Документ фиксирует актуальные правки Telegram Mini App / chat UI после серии фиксов `2.542` - `2.547`.

## Что Было Исправлено

### Composer И Клавиатура

- После отправки сообщения composer не должен терять focus и не должен закрывать keyboard.
- Keyboard закрывается только по явному tap вне composer/attach/emoji/context controls.
- Прыжок composer и ленты после отправки был связан с конфликтом focus/blur и пересчетом chat shell; новые правки держат composer в активной сессии отправки.

Инвариант: отправка сообщения не равна dismiss keyboard. Любой `blur`, root-scroll cleanup или scroll-to-bottom после send должен проверять, что пользователь действительно тапнул вне поля.

### Back-Кнопки В Чате

- Back в главном чате и личных сообщениях должен обрабатываться через расширенный hit-area и touch/pointer/click цепочку.
- Для лички критичны `#chatBackBtn`, `.chat-conv-top__toolbar-back` и делегирование через `.chat-conv-top`.
- Нельзя делать шапку/родителя inert, если внутри остается активная back-кнопка.
- На iPhone первый tap может теряться, если полагаться только на `click`: между `touchstart`, delayed stabilizer и keyboard/layout cleanup цель успевает сместиться или стать перекрытой.
- Рабочая схема: реальная ширина кнопки около `54px`, расширенная pseudo hit-area, `z-index` выше соседних слоев и ранний `touchstart` handler с timestamp-dedupe, чтобы не выполнить back дважды после последующего click.
- Pointer-dismiss для keyboard/composer не должен обрабатывать tap по `.chat-back-btn`, иначе keyboard cleanup может изменить layout до завершения жеста назад.

Инвариант: back-кнопка в личке должна быть кликабельна тем же первым tap, что и back в главном чате.

### Telegram Dark-Gold Theme

- В Telegram Mini App главная тема должна оставаться темно-золотой.
- Telegram-specific theme forcing не должен менять PWA/browser ветки.
- Кнопка `Инструкция` в Telegram версии должна оставаться кликабельной поверх home layout и Telegram top clearance.

Инвариант: Telegram home layout нельзя чинить через общий reset для всех окружений; все изменения должны быть gated через `html.app--telegram-miniapp` / `html.poker-telegram-miniapp` или runtime checks.

### Dialog List Metadata

- Быстрый `contactsBare` ответ больше не должен надолго оставлять список диалогов без имен, рыбок, уровней, `p21Id`, avatar и verified.
- `contactsBare` не должен затирать богатый contacts cache.
- Перед отрисовкой bare rows список дополняется из peer-meta cache.
- Rich/full contacts payload обновляет общий peer-meta cache.

Ключевые файлы:

- `app-chat-dialogs.js` — peer-meta helpers и contacts cache.
- `app-chat-contacts-loader.js` — merge/remember peer meta перед render и запрет записи bare payload в persistent cache.
- `app-chat-contacts-render.js` — отображение name, verified, status level и fish в строках контактов.

Инвариант: bare contacts payload можно использовать для быстрого списка, но он не является источником истины для пользовательских metadata.

### Personal DM Header Hydration

- Шапка лички больше не должна зависеть от глобальной функции, которая не видит локальные DOM refs из `initChat`.
- Гидрация DM header перенесена в локальный контекст `initChat`, где доступны реальные setters: title, avatar, `p21Id`, verified, fish/status level.
- Если contacts/meta не хватает, fallback идет через `/api/users` и применяет данные теми же local setters.
- `enrichPersonalThreadPeerMeta()` теперь прокидывает `fromStatusLevel`, чтобы сообщения тоже могли показывать уровень/рыбку.

Ключевые файлы:

- `app-chat-lifecycle.js` — local hydrate/schedule/profile fallback для DM header.
- `app-chat-dialogs-meta.js` — обогащение личных сообщений peer metadata.
- `app-chat-personal-loader.js` — fallback `fromStatusLevel` из payload/cache.

Инвариант: код, который обновляет DOM шапки лички, должен жить там, где доступны локальные refs `convTitle`, avatar, verified badge и fish controls.

### Telegram Native Close Clearance

- В Telegram Mini App шапка общего чата и `.chat-conv-top` лички должны находиться ниже нативной кнопки `Закрыть`.
- Правка ограничена Telegram runtime CSS selectors.
- PWA/browser не получают этот top clearance.

Ключевой файл:

- `styles-chat-threads-contacts-responsive.css` — `--chat-telegram-native-close-clearance` и Telegram-only `padding-top` для `.chat-conv-top`.

Инвариант: любые отступы под Telegram native chrome должны быть Telegram-only. Нельзя добавлять этот зазор в standalone PWA или обычный браузер.

## Version And Push Discipline

Текущий рабочий договор для этих мелких фиксов:

- каждый законченный fix пушится отдельно;
- перед push версия в `index.html` поднимается на `+0.001`;
- если версия поднята вручную, push делать с `SKIP_PWA_VERSION_BUMP=1`, чтобы не получить двойной bump.

Последние версии:

- `2.542` — chat composer/send focus и dark-gold rating button;
- `2.543` — personal chat back button tap area;
- `2.544` — Telegram home dark-gold theme;
- `2.545` — Telegram instruction button clickability;
- `2.546` — dialog list peer metadata и DM header hydration;
- `2.547` — Telegram native close clearance для chat header/back.

## Verification Checklist

После следующих правок в этой зоне проверять:

- `npm run check:syntax`;
- `npm run build`;
- Telegram Mini App: общий чат, личка, первый tap back, кнопка `Закрыть` сверху не перекрывает chat header;
- Telegram Mini App: список диалогов не деградирует до bare names/без рыбок после быстрого contacts load;
- PWA iOS: send message не закрывает keyboard и не дергает composer;
- Browser/PWA: Telegram-only top clearance не появился вне Telegram.

## Что Не Делать

- Не писать `contactsBare` в persistent contacts cache.
- Не обновлять DM header через глобальные функции, которые не имеют доступа к локальным refs `initChat`.
- Не смешивать Telegram Mini App top clearance с iOS PWA keyboard safe-area.
- Не использовать send action как повод снять focus с textarea.
- Не коммитить параллельные незаконченные UI-изменения вместе с точечными chat fixes.
