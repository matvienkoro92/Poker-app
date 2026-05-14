# Chat Delivery / Redis Cost Worklog - 2026-05-14

Этот документ фиксирует закрытый этап оптимизации доставки новых сообщений, contacts meta, presence и Redis-cost в чате.

Запись намеренно стоит после раннего chat delivery baseline `2.696-2.698`, engineering split/guard baseline от 2026-05-06 и Poker21/debug worklog от 2026-05-08. Это уже сделанный слой производительности, а не текущий список открытых задач.

## Scope

- Ускорить доставку новых сообщений без роста bandwidth.
- Убрать лишний self-hit `notModified` после unified `mode=updates`.
- Отделить presence/online от доставки сообщений и contacts meta.
- Сократить payload сообщений через `messages + usersById`.
- Перевести contacts revision в `mode=updates` на дешёвые Redis counters вместо пересборки meta.
- Закрепить новые инварианты smoke-проверками.

## Closed Chat Delivery Work

### Unified Updates Without Self-Hit

- `app-chat-polling.js` после `mode=updates` теперь вызывает changed scopes с `skipPoll: true`.
- `loadGeneral`, `loadMessages` и `loadContacts` не добавляют `poll=1&sinceRev=...`, если получили `skipPoll`.
- Это убирает сценарий, где server уже сообщил новый rev, а следующий body fetch сразу возвращал `notModified`.

### Presence Split

- `contactsMetaOnly` теперь запрашивается с `skipPresence=1`.
- `computeContactsMetaPollRev` не включает `online` / `onlineCount` / `generalChatOnlineCount`.
- Online refresh вынесен в отдельный лёгкий `contactsPresenceOnly`.
- Клиент мерджит `onlineById` поверх последнего полного contacts payload, не ломая unread/preview merge.
- Presence имеет отдельный cadence `CHAT_PRESENCE_IDLE_MS`, поэтому online churn не будит delivery long-poll.

### Startup And Request Coalescing

- General, personal и contacts loaders получили per-scope `AbortController`.
- Новый запрос того же scope отменяет устаревший in-flight запрос.
- Таймауты не глотаются как обычный superseded abort: retries/error paths сохранены.
- Contacts scopes разделены на `full`, `meta`, `presence`, `fast-bare`, `fast-rich`, чтобы fast shadow и full load не мешали друг другу.

### Compact Message Payload

- GET general/thread поддерживают opt-in `usersById=1`.
- Сервер выносит sender metadata (`fromName`, avatar, `p21Id`, verified/status/admin/respect) из каждого сообщения в `usersById`.
- Клиент гидратит сообщения обратно через `pokerHydrateChatMessagesFromUsersById()` перед render/cache write.
- Формат подключен к normal loads, older pagination, dialog preview, personal prefetch и bootstrap general prefetch.
- Старый API остаётся совместимым: compact mode включается только новым клиентом.

### Cheap Redis Contact Revisions

- Добавлен hash `poker_app:chat_updates_rev`.
- Поля:
  - `contacts:<userId>` - user-specific contacts/list/unread/group revision;
  - `general` - global revision строки главного чата: preview, access/pending/member changes.
- `getContactsUpdateRev(userId)` возвращает строку `contacts-rev|<userRev>|<generalRev>`.
- `mode=updates` больше не вызывает `buildContactsMetaOnlyPayload()` и не считает `computeContactsMetaPollRev()`.
- `mode=updates` читает cheap rev через `HMGET`, сравнивает его с `contactsRev` и будит contacts body fetch только при изменении.
- `contactsMetaOnly` тоже использует cheap rev: если `sinceRev` совпал, `notModified` возвращается до сборки meta.

## Mutation Paths Covered

Cheap contacts rev bump добавлен в следующие источники изменений:

- DM send: sender + recipient.
- Group send: members.
- General send: global general rev через `writeThreadMeta(GENERAL_KEY, ...)`, unread recipients через wrappers.
- Read/unread state: `bumpSeenCursor`, `bumpGeneralLastSeen`, `reset*Unread`, `increment*Unread`.
- Message edit/delete/reaction: affected DM peer pair, group members или global general rev.
- Group create/add/update/delete/leave/remove: affected members.
- Group system messages при изменении состава группы теперь тоже bump'ают thread poll gen.
- Club chat application/access mutations: global general rev.
- General pin/unpin: global general rev.

## Redis Schema Impact

Новый ключ документирован в `docs/redis-schema.md`:

- `poker_app:chat_updates_rev` - HASH, дешевые revision counters для contacts updates.

Это не заменяет message storage, unread hashes или thread meta. Ключ нужен только для дешёвого сравнения в polling/update path.

## Guard Rails

Smoke теперь закрепляет:

- changed body fetch использует `skipPoll`;
- presence не входит в contacts meta rev;
- `contactsPresenceOnly` существует и мерджится отдельно;
- compact `usersById` path есть на клиенте и сервере;
- `mode=updates` использует `getContactsUpdateRev(myId)` и не содержит `buildContactsMetaOnlyPayload` / `computeContactsMetaPollRev`;
- write paths bump'ают cheap contacts rev.

## Verification Used In This Block

- `node scripts/check-js-syntax.js`;
- `node scripts/smoke-checks.js`;
- `node scripts/contract-tests.js`;
- `git diff --check`;
- PWA/cache version bump through `2.738`.

## State After This Block

Самый дорогой chat polling path закрыт: delivery updates больше не пересобирают contacts meta и не зависят от online churn. Дальнейшие chat performance задачи нужно начинать от этого baseline, а не от более старого delivery состояния `2.696-2.698`.

Оставшиеся потенциальные, но уже не срочные направления:

- добавить production metrics по `mode=updates` latency/Redis command count;
- при необходимости перевести thread/general poll rev на такие же counters;
- отдельно упростить general presence stats, если Redis-cost всё ещё заметен;
- продолжать split `app-chat-lifecycle.js` и server chat route helpers без изменения этих инвариантов.
