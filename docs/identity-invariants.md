# Identity Invariants

Документ фиксирует текущий контракт идентификаторов, чтобы API handlers, Redis keys и миграции не расходились.

## Канонический аккаунт

- `dtId` вида `ID123456` - канонический публичный account id для профиля, Poker21/PokerPlus, respect, friends, personal info и chat display name.
- `dtId` хранится в Redis:
  - `poker_app:visitor_dt_ids`: `memberId -> dtId`;
  - `poker_app:id_to_user`: `dtId -> preferred memberId`.
- Данные профиля, которые должны переживать смену канала входа, читаются и пишутся по `dtId`, а не по legacy `memberId`.

## Member ids

- `tg_<numeric>` - Telegram identity из Mini App / Telegram Login.
- `vk_<id>` - VK/PWA identity.
- `mail_<...>` - email/PWA identity.
- `guest_<...>` - гостевой локальный identity; он может быть account id сам по себе и не обязан иметь `ID......`.
- `tg_roman` - legacy alias; перед сравнением/чатом нормализуется в `tg_<TELEGRAM_ROMAN_CHAT_ID>`.

## Чтение и запись

- Новые записи для account-scoped данных используют `dtId`: `poker_app:visitor_personal`, `poker_app:visitor_chat_display_names`, `poker_app:pokerplus_user_ids`, respect score/votes, friends.
- При чтении допустим fallback к legacy `memberId`, но успешный fallback должен мигрировать значение на `dtId`, когда это безопасно.
- Username хранится как `poker_app:visitor_usernames[memberId]`, потому что Telegram username относится к каналу входа, а не к account id.
- Поиск по username сначала находит `memberId`, затем через `poker_app:visitor_dt_ids` получает `dtId`; профильные поля после этого читаются по `dtId || memberId`.

## Публичные API

- `GET /api/users?id=ID123456` возвращает карточку по каноническому `dtId`.
- `GET /api/users?userId=tg_...|vk_...` резолвит `memberId` в `dtId` перед чтением profile-scoped данных.
- `GET /api/users?username=...` возвращает найденный `memberId`, опциональный `dtId`, и профильные поля по account id.
- API не должен смешивать пустой `searchId` с username lookup: для `personal` и `chatDisplayName` ключом является `dtId || userId`.

## Проверочный список для новых handlers

- Если данные принадлежат аккаунту, используем `ensureDtIdForUserId()` или `resolveAccountId()`.
- Если данные принадлежат конкретному каналу входа, ключом остаётся `memberId`.
- Перед сравнением админов и chat peers нормализуем `tg_`/legacy alias.
- Legacy fallback должен быть явным и покрытым cleanup/backfill задачей, а не случайным чтением из нескольких ключей.
