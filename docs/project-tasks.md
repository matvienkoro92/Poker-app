# ЗАДАЧИ

Этот список зафиксирован как рабочий backlog проекта.

## P0

- Закрыть или сделать admin-only `/api/account-debug`.
- Починить мёртвый API route `twitch-viewers`: либо добавить handler, либо убрать маршрут из `api/[[...slug]].js`.
- Исправить поиск пользователя по username в `lib/api-handlers/users.js`: runtime-риск с `DT_IDS_KEY` и неверными ключами для `personal`/`chatDisplay`.
- Проверить и исправить `scripts/copy-to-public.js`, чтобы в `public/` попадали все скрипты из `index.html`, включая `telegram-web-app.js` и `poker-tasks-data.js`.
- Зафиксировать единые identity-инварианты для `dtId`, `tg_...`, `vk_...`, `ID...`, legacy-ключей и aliases вроде `tg_roman`.

## P1

- Начать дробить `app.js`, сначала зоны chat, profile, auth.
- Начать дробить `styles.css` по feature-зонам.
- Централизовать admin/auth config: `isAdmin`, `ADMIN_IDS`, `parseBody`, `authRequired`, CORS.
- Провести Redis schema audit: документ ключей, legacy-ключи, cleanup/backfill script.
