# ЗАДАЧИ

Этот список зафиксирован как рабочий backlog проекта.

## Done

- Закрыт `/api/account-debug`: endpoint доступен только admin.
- Починен route `twitch-viewers`: handler добавлен и маршрут живой.
- Исправлен поиск пользователя по username в `lib/api-handlers/users.js`: `DT_IDS_KEY` импортирован, profile-ключи читаются через актуальный account id.
- Исправлен `scripts/copy-to-public.js`: в `public/` попадают локальные скрипты из `index.html`, включая `telegram-web-app.js`, `poker-tasks-data.js`, `app-*.js` и `peerjs.min.js`.
- Зафиксированы identity-инварианты для `dtId`, `tg_...`, `vk_...`, `ID...`, legacy-ключей и aliases вроде `tg_roman` в `docs/identity-invariants.md`.

## P1

- Продолжить дробить `app.js`, сначала зоны chat, profile, auth.
- Начать дробить `styles.css` по feature-зонам.
