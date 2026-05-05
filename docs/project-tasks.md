# ЗАДАЧИ

Этот список зафиксирован как рабочий backlog проекта.

## Done

- Переведены тяжелые JS-домены в lazy-loading: chat, rating, media/video, games, admin, tournaments, raffles.
- Вынесены тяжелые HTML-разделы в fragments: chat, profile, video-lessons, hall-of-fame, equilator, winter-rating, raffles, download, global modals.
- Разобран `app.js`: router, chat lifecycle, webview keyboard, network, shared helpers, home init и PWA/open handlers живут в отдельных `app-*.js`.
- Добавлен общий Redis layer `lib/redis.js`; локальные pipeline-клоны в handlers/scripts убраны.
- Добавлены backend contract tests без реального Redis: auth/admin, chat, raffles, respect, profile/users, auth-email/auth-pwa-code, friends, push, tracking links, rating/gazette notifications.
- Добавлен smoke на tabbar/key routes, lazy HTML/JS, CSS ownership, global dependency guard, assets/public size и Redis layer.
- Проведен asset pass: тяжелые картинки получили WebP/AVIF, крупные unused movie/assets хвосты исключены из shipping.
- Закрыт `/api/account-debug`: endpoint доступен только admin.
- Починен route `twitch-viewers`: handler добавлен и маршрут живой.
- Исправлен поиск пользователя по username в `lib/api-handlers/users.js`: `DT_IDS_KEY` импортирован, profile-ключи читаются через актуальный account id.
- Исправлен `scripts/copy-to-public.js`: в `public/` попадают локальные скрипты из `index.html`, включая `telegram-web-app.js`, `poker-tasks-data.js`, `app-*.js` и `peerjs.min.js`.
- Зафиксированы identity-инварианты для `dtId`, `tg_...`, `vk_...`, `ID...`, legacy-ключей и aliases вроде `tg_roman` в `docs/identity-invariants.md`.

## P1

- Продолжить HTML split: cashout, schedule, streams, poker-tasks/games, крупные части global modals.
- Дочистить `app.js`: visitor tracking, early rating/lightbox bootstrap, popstate/bootstrap orchestration.
- Дочистить CSS ownership: уменьшить after/prelude/overrides и продолжить selector-level split legacy home/download tail.
