# Redis Schema

Документ фиксирует рабочую карту Redis-ключей проекта. Канонический namespace: `poker_app:*`.

## Identity

| Key | Type | Owner | Purpose |
| --- | --- | --- | --- |
| `poker_app:visitor_dt_ids` | HASH `userId -> IDxxxxxx` | `lib/account-id.js` | Основная связь runtime-id (`tg_*`, `vk_*`, `mail_*`) с публичным `dtId`. |
| `poker_app:id_to_user` | HASH `IDxxxxxx -> userId` | `lib/account-id.js` | Обратный индекс для поиска владельца `dtId`. |
| `poker_app:visitor_usernames` | HASH `userId -> username` | chat/users | Telegram username / login label. |
| `poker_app:visitor_chat_display_names` | HASH `accountId|userId -> displayName` | chat/users | Отображаемое имя в чате. |
| `poker_app:account_passwords` | HASH `accountId -> passwordRecord` | `lib/account-password.js` | PWA пароль аккаунта. |
| `poker_app:email_links` | HASH `email -> dtId` | `lib/email-auth.js` | Email auth link. |
| `poker_app:email_originals` | HASH `dtId -> originalEmail` | `lib/email-auth.js` | Исходное написание email. |
| `poker_app:email_code:<email>` | STRING TTL | `lib/email-auth.js` | Временный код email-входа. |

### Identity Invariants

- `dtId`: только `ID` + 6 цифр, пример `ID123456`.
- Telegram runtime id: `tg_<numericId>`; legacy alias `tg_roman` должен резолвиться в числовой `tg_*`, но может встречаться в старых чат-партнёрах.
- VK runtime id: `vk_<id>`.
- Email runtime id: `mail_*`, но каноническим account id для профиля остаётся `dtId`.
- Legacy id вроде `tg_ID123456`, `vk_ID123456`, `mail_ID123456` нормализуется к `ID123456`.
- Для новых account-scoped данных предпочтителен `dtId`; runtime-id допустим там, где данные привязаны к конкретному каналу доставки.

## Chat

| Key | Type | Owner | Purpose |
| --- | --- | --- | --- |
| `poker_app:chat_messages` | LIST | `lib/api-handlers/chat.js` | Главный чат клуба. |
| `poker_app:chat:<idA>_<idB>` | LIST | chat | Личный диалог, id отсортированы в `convKey`. |
| `poker_app:chat_partners:<userId>` | SET | chat | Собеседники пользователя. |
| `poker_app:chat_group_meta:<groupId>` | STRING JSON | chat | Метаданные группового чата. |
| `poker_app:chat_group_msgs:<groupId>` | LIST | chat | Сообщения группового чата. |
| `poker_app:user_chat_groups:<userId>` | SET | chat | Группы пользователя. |
| `poker_app:chat_thread_meta:<redisKey>` | HASH | chat | Индекс последнего сообщения: время, id, preview. |
| `poker_app:chat_thread_msg_index:<redisKey>` | HASH | chat | Быстрый поиск сообщения по id. |
| `poker_app:chat_thread_poll_gen` | HASH | chat | Ревизии long-poll тредов. |
| `poker_app:chat_seen_cursor` | HASH | chat | Прочитано до: `viewerId|peerId -> ISO`. |
| `poker_app:chat_general_seen` | HASH | chat | Прочитано до для главного чата. |
| `poker_app:chat_unread:<viewerId>` | HASH | chat | Непрочитанные по peer/group. |
| `poker_app:chat_general_unread` | HASH | chat | Непрочитанные главного чата. |
| `poker_app:chat_online` | ZSET | chat | Online score = timestamp ms. |
| `poker_app:chat_last_seen` | HASH | chat | Последняя активность. |
| `poker_app:chat_dm_focus:<userId>` | STRING TTL | chat/webpush | Активный DM, чтобы не слать push. |
| `poker_app:chat_typing:<recipientId>:<senderId>` | STRING TTL | chat | Typing indicator. |
| `poker_app:chat_blocked` | SET | chat admin | Блокировки чата. |
| `poker_app:general_chat_pinned` | STRING JSON | chat admin | Закреп главного чата. |
| `poker_app:club_chat_pending` | SET | chat | Заявки в клубный чат. |
| `poker_app:club_chat_members` | SET | chat | Участники клубного чата. |
| `poker_app:club_chat_member_joined_at` | HASH | chat | Время вступления. |
| `poker_app:club_chat_general_revoked` | SET | chat | Отозванный доступ к главному чату. |

## Social

| Key | Type | Owner | Purpose |
| --- | --- | --- | --- |
| `poker_app:respect_score` | HASH `accountId -> score` | `respect.js` | Счёт уважения. |
| `poker_app:respect_votes:<accountId>` | HASH `voterAccountId -> up/down` | `respect.js` | Голоса по пользователю. |
| `poker_app:friends:<accountId>` | SET | `friends.js` / chat | Друзья пользователя. |
| `poker_app:friend_alias:<accountId>` | HASH `peerId -> alias` | `friends.js` / chat | Локальные имена друзей. |
| `poker_app:avatar:<accountId>` | HASH/STRING by handler | `avatar.js` / chat | Аватары. |

## PokerPlus

| Key | Type | Owner | Purpose |
| --- | --- | --- | --- |
| `poker_app:pokerplus:token` | STRING TTL | `lib/pokerplus.js` | Cached API token. |
| `poker_app:pokerplus_user_ids` | HASH `accountId -> pokerPlusUserId` | pokerplus | Binding. |
| `poker_app:pokerplus_profiles` | HASH | pokerplus | Cached profile JSON. |
| `poker_app:pokerplus_profiles_synced_at` | HASH | pokerplus | Sync timestamp. |
| `poker_app:pokerplus_emails` | HASH | pokerplus | Linked email. |
| `poker_app:pokerplus_ciphertexts` | HASH | pokerplus | Encrypted service payload. |
| `poker_app:pokerplus_telegram_values` | HASH | pokerplus | Linked Telegram values. |

## Push, Gazette, Rating, Tracking

| Key | Type | Owner | Purpose |
| --- | --- | --- | --- |
| `poker_app:chat_push_sub:<accountId>` | HASH | webpush | Browser push subscriptions. |
| `poker_app:chat_push_registry` | SET | webpush | Accounts with push subscriptions. |
| `poker_app:chat_push_disabled` | SET/HASH | webpush | Disabled push state. |
| `poker_app:gazette_editor_planner_tasks_v1` | STRING JSON | gazette | Shared planner. |
| `poker_app:gazette_editor_planner_tasks_solo_<bucket>_v1` | STRING JSON | gazette | Solo planner bucket. |
| `poker_app:track_links:z` | ZSET | tracking | Tracking link ordering. |
| `poker_app:track_links:meta` | HASH | tracking | Tracking link metadata. |
| `poker_app:track_links:totals` | HASH | tracking | Total hits. |
| `poker_app:track_links:unique` | HASH | tracking | Unique hits. |
| `poker_app:track_links:log:<slug>` | LIST | tracking | Recent hit log. |
| `poker_app:track_links:ev_n:<slug>` | STRING | tracking | Event count. |
| `poker_app:track_links:ev_u:<slug>` | SET | tracking | Unique event users. |
| `poker_app:track_links:ev_by:<slug>` | HASH | tracking | Event breakdown. |
| `poker_app:track_links:vd:<slug>` | HASH | tracking | Visitor dedupe. |
| `poker_app:pikhanina_claimed_count` | STRING | pikhanina | Claimed count resettable script key. |

## Legacy / Audit Notes

- `tg_roman` in chat partners is legacy and should be migrated/removed when `tg_388008256` is present.
- Respect legacy votes/scores may exist under runtime ids; `respect.js` migrates target score/votes opportunistically to `dtId`.
- Avatar keys may exist both as runtime-id and `dtId`; prefer `poker_app:avatar:<dtId>` where account-scoped.
- Planner browser-local legacy keys are client-side (`poker_roman1787443_planner_v1`) and are not Redis.
- Any key outside `poker_app:*` should be treated as suspicious unless explicitly documented.

## Operational Rules

- Destructive cleanup must be two-step: run audit, review report, then run a dedicated migration with explicit `--apply`.
- `npm run redis:audit` is read-only and reports known schema/legacy findings.
- `npm run redis:cleanup` is dry-run by default; `npm run redis:cleanup:apply` writes only safe backfills. Legacy deletion additionally requires `node scripts/redis-cleanup-backfill.js --apply --delete-legacy`.
- New account-scoped keys should use `dtId`, not `tg_*` / `vk_*`.
- New Redis keys must be added to this document in the same PR/commit.
