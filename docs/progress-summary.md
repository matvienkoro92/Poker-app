# Progress Summary

Срез состояния проекта после серии работ по качеству, производительности и архитектуре.

Текущая продуктовая цель: оставить приложение живым и клубным, но сделать первый запуск легче, навигацию стабильнее, а backend/frontend проще поддерживать.

## Сделано

### Frontend Startup

- Чат, весенний рейтинг, рыбка/игры и розыгрыши остаются eager, чтобы основные клубные сценарии открывались без догрузки JS.
- В `app-lazy-loader.js` закреплен доменный lazy-loading для более редких тяжелых разделов: зал славы, видеоуроки/«Научиться играть», equilator, streams, club tasks, player CRM, зимний рейтинг и часть админ-модалок.
- Зимний рейтинг переведен в архивный lazy state: DOM грузится через `html-fragments/winter-rating.html`, а `app-rating-winter-runtime.js` и `winter-rating-data.js` лежат в lazy-домене `rating-winter`. Общий view adapter остается eager, потому что им пользуется весенний рейтинг.
- Smoke проверяет переходы:
  - `home -> chat -> download -> cashout -> profile -> home -> raffles -> spring-rating`;
  - наличие DOM после lazy HTML hydration;
  - попадание lazy-файлов в `public`.
- Стартовый root JS-count удерживается в лимите для Telegram WebView.
- С 2026-05-06 smoke дополнительно держит static budgets: `index.html <= 100 KB`, eager scripts `<= 152`, lazy scripts `<= 25`, плюс line/byte budgets для крупных runtime-файлов.

### HTML Fragments

Из `index.html` вынесены тяжелые view/fragments:

- `html-fragments/chat.html`;
- `html-fragments/profile.html`;
- `html-fragments/video-lessons.html`;
- `html-fragments/hall-of-fame.html`;
- `html-fragments/equilator.html`;
- `html-fragments/winter-rating.html`;
- `html-fragments/raffles.html`;
- `html-fragments/download.html`;
- `html-fragments/global-modals.html`.

`index.html` теперь содержит легкие hosts с `data-html-fragment`, а тяжелая разметка догружается при входе в раздел, idle-гидрации основных экранов или при первом открытии модалок.

Позже, в закрытом инженерном блоке 2026-05-06, дополнительно вынесены secondary/utility fragments:

- `html-fragments/bonus-game.html`;
- `html-fragments/cooler-game.html`;
- `html-fragments/plasterer-game.html`;
- `html-fragments/learn-play-hub.html`;
- `html-fragments/poker-tasks.html`;
- `html-fragments/cashout.html`;
- `html-fragments/streams.html`;
- `html-fragments/schedule.html`.

`global-modals.html` после этого не хранит весь тяжелый modal tail внутри одного файла: media/admin/home/chat-rating/access вынесены в отдельные подфрагменты и гидрируются через `app-html-fragments.js`.

### App.js Split

`app.js` сокращен до тонкого bootstrap/orchestration слоя.

Вынесены отдельные модули:

- `app-network.js` — retrying/no-store fetch helpers и сетевые ошибки.
- `app-view-router.js` — `setView`, view switching, tabbar route handling, deep-link view logic.
- `app-chat-lifecycle.js` — chat init, polling/bootstrap, unread/PWA badge integration.
- `app-webview-keyboard.js` — Telegram/iOS keyboard fixes и keyboard lab.
- `app-shared-helpers.js` — shared helpers: textarea autosize, boot overlay network state, member-id hints.
- `app-home-init.js` — theme, radio, start button, raffle badge, home/task click listeners.
- `app-pwa-open-handlers.js` — PWA install/share, auth event retry, open-from-push и foreground visibility sync.
- `app-popstate-recovery.js` — popstate/body scroll-lock recovery.
- `app-shell-bootstrap.js` — shell-ready bootstrap for rating, gazette/tasks, chat, visitor counter and shows.
- `app-visitor-id.js` / `app-visitor-id.module.mjs` — visitor id runtime and first ES module bridge.

Дополнительно закрыт слой thin entrypoints:

- `app-home-planner.js` делегирует в `app-home-planner-runtime.js`, access logic вынесена в `app-home-planner-access.js`.
- `app-pwa-auth.js` делегирует в `app-pwa-auth-runtime.js`, mode и overlay вынесены в `app-pwa-auth-mode.js` и `app-pwa-auth-overlay.js`.
- `app-player-crm.js` делегирует в `app-player-crm-runtime.js`, registrations и viewport shell вынесены в отдельные модули.
- `app-player-crm-formatters.js` получил ES module bridge `app-player-crm-formatters.module.mjs`.
- `lib/api-handlers/chat.js` стал wrapper'ом на `lib/api-handlers/chat-runtime.js`; display label, profile status/lookups и read receipts вынесены в `lib/chat-*.js`.

Smoke закрепляет, что эти домены больше не возвращаются в `app.js`.

### CSS Ownership

- `styles.css` оставлен entrypoint с импортами.
- `css-manifest.json` описывает ownership по доменам.
- Smoke проверяет:
  - что split CSS-файлы покрыты manifest;
  - что root CSS-файлы реально импортируются;
  - что rating entrypoint больше не импортирует learning/games/raffles/download;
  - что build output содержит все CSS imports.
- Закрытый слой 2026-05-06 вынес home/rating promo late CSS в `styles-home-rating-promo-legacy.css` и `styles-home-rating-promo-late.css`, а shared touch targets - в `styles-layout-touch-targets.css`.

Оставшиеся CSS-риски: поздние `after/prelude/overrides` файлы и отдельные legacy selector tails, если новые домены снова начнут использовать общие override-хвосты.

### Redis Layer

- Добавлен общий слой `lib/redis.js`.
- Вынесены helpers:
  - `pipeline`;
  - `getJson`;
  - `setJson`;
  - `hgetall`;
  - `timeout`;
  - `normalizeRedisError`;
  - `isConfigured`.
- Убраны локальные Redis pipeline-клоны из API handlers и scripts.
- Smoke проверяет, что прямые `/pipeline` fetch-клоны не возвращаются в проектный код.

### Backend Contract Tests

Добавлен `scripts/contract-tests.js` с Redis/mock окружением без реального Upstash.

Покрыто:

- auth required;
- admin-only;
- chat send/edit/delete;
- raffle join/leave;
- raffle admin delete;
- respect vote/withdraw;
- profile/user lookup.

CI запускает `npm run test:contracts`, `npm run smoke:nav`, `npm run smoke`, `npm run check:syntax` и build.

### Engineering Guards - 2026-05-06

- `global-deps-manifest.json` покрывает явные browser global exports/consumers.
- `global-deps-window-baseline.json` фиксирует legacy direct `window.*` globals, существовавшие на момент закрытия этапа.
- Smoke теперь ловит новый прямой `window.name = ...` / `window["name"] = ...`, если он не описан в `global-deps-manifest.json`.
- Baseline не должен расти от новых фич: новые globals нужно либо описывать в manifest, либо убирать через modules/local state.
- Smoke держит budgets для startup и крупных runtime-файлов и показывает конкретные числа при пробитии лимита.
- Подробности этапа закреплены в `2026-05-06-engineering-splits-guards-worklog.md`.

### Assets/Public

- Проведен asset audit.
- Тяжелые визуальные assets получили WebP/AVIF варианты.
- Удалены/исключены крупные неиспользуемые movie/assets хвосты.
- Smoke проверяет:
  - наличие modern image variants;
  - отсутствие крупных unused files в `public`;
  - размер `public`;
  - lazy policy для тяжелых картинок.

### Navigation And Product Stability

- Закреплен smoke на tabbar и ключевые переходы.
- Исправлялись проблемы первого клика, chat tabbar, init dialogs, auth/network retry и исчезающего tabbar.
- Чатовые dialogs и lifecycle защищены lazy-loading smoke-проверками.
- По iOS PWA keyboard/chat composer добавлена отдельная документация `chat-keyboard-pwa.md` и расширенная диагностика `Keyboard Lab`: теперь видны классы keyboard-state, CSS-переменные, header/messages/composer rect/computed styles и root/shell scroll.
- В `chat-keyboard-pwa.md` добавлен блок `2026-05-03: Resting Composer, Re-Armed Bottom Follow, Emoji Height`: зафиксированы правила для закрытого composer state, tap outside dismiss, возврата к низу после ручного scroll up/down, emoji-only высоты textarea и ручного version bump перед push.
- В `chat-keyboard-pwa.md` добавлен закрытый исторический блок `2026-05-03 - 2026-05-05: Composer, Emoji, Keyboard`: версии `2.591-2.695` фиксируют, что emoji-only не поднимает закрытый composer, `send` не поднимает keyboard, первый focus/reopen снова поднимает composer, emoji picker закрывается первым внешним tap без dismiss keyboard, узкие iOS safe-area покрыты, а Poker21 ID в шапке ЛС стабилен.
- В `2026-05-03-ui-chat-product-worklog.md` добавлен закрытый исторический блок `2.696-2.698` по chat delivery/bandwidth/open freshness: post-send refetch убран при наличии persisted message, старые snapshots больше не мигают при входе в диалог, а thread + contacts meta long-poll объединены в один `mode=updates`.
- Серия правок от 2026-05-01 задокументирована в `2026-05-01-stability-worklog.md`: первый фокус, выезд keyboard/composer, задержки кликов, видимость отчетов только админам и повторная инициализация rating top wins после lazy hydration.
- Серия Telegram/chat правок от 2026-05-03 задокументирована в `2026-05-03-telegram-chat-worklog.md`: composer focus после отправки, hit-area back-кнопок, dark-gold Telegram theme, кликабельность инструкции, быстрые dialog metadata, DM header hydration и отступ chat header под нативную кнопку `Закрыть`.
- Серия raffle/chat-stability правок от 2026-05-03 задокументирована в `2026-05-03-raffles-chat-stability.md`: admin delete/cancel теперь не зависят от ложного `Telegram.WebApp` в PWA, admin-запросы используют PWA/auth body, stale fallback listeners очищаются при reinit, загрузка розыгрышей сначала показывает активный блок, а тяжелый completed archive/leaders рендерится отложенно.
- Серия продуктовых/UI правок до версии `2.695` задокументирована в `2026-05-03-ui-chat-product-worklog.md`: профиль, первый скролл главной, download/freerolls, friends, темы, газета, spring rating, raffles/admin, Player CRM и закрытая стабилизация chat composer/emoji/keyboard.
- Серия PWA/CRM/theme/profile правок от 2026-05-05 задокументирована в `2026-05-05-pwa-crm-theme-profile-worklog.md`: desktop PWA composer не поднимается после отправки, периодные CRM-карточки считают новые bot/push подписки за период, уровни/рыбка открывают профиль без закрытия родительской модалки, Poker21 profile state не показывает фейковый level без реальных данных, а night theme очищена от dark-gold/green/blue визуальных артефактов. Этот блок считается закрытым историческим этапом перед последующей работой по Poker21/debug, chat keyboard baseline, admin reports/rakeback и spring rating data.
- Красная chat keyboard debug-панель больше не должна появляться у игроков/админов в production только из-за старого `localStorage`: включение разрешено на localhost или явным `?chatKeyboardDebug=1`, а production runtime очищает старый флаг.
- После закрытия chat keyboard/delivery блока работа ушла дальше: CRM/dashboard, module split/lazy loading, Poker21 binding/profile, admin reports/rakeback и новые spring rating data уже идут в истории после него.
- Закрытый module split/lazy loading/guard блок от 2026-05-06 отдельно описан в `2026-05-06-engineering-splits-guards-worklog.md`; после него в истории уже идут Poker21/debug/admin/rating изменения, поэтому этот этап считается baseline, а не текущей задачей.
- Закрытый фикс доступа к главному чату от 2026-05-07 отдельно описан в `2026-05-07-chat-club-access-worklog.md`: после modal fragments админская модалка снова стабильно обрабатывает `Принять`/`Отклонить`/`Закрыть`, а бейдж заявок использует filtered count только по `tg_*`/`vk_*`.
- Закрытый admin reports/rakeback блок от 2026-05-08 отдельно описан в `2026-05-08-admin-reports-rakeback-worklog.md`: крупные вкладки `Отчет`/`Рейкбек`/`Отправленные`, общая live-таблица рейкбека, связанные доп. строки, `-15%`, остатки подзаписей, manager-scoped итоги для отправки отчета, mobile fit, backend/Telegram summary и desktop prewarm кнопки `Отчет`.
- Закрытый chat delivery/Redis-cost блок от 2026-05-14 отдельно описан в `2026-05-14-chat-delivery-cost-worklog.md`: `mode=updates` больше не пересобирает contacts meta, presence вынесен отдельно, loaders coalesce/abort устаревшие запросы, сообщения используют compact `usersById`, а contacts rev читается через cheap Redis counters. Этот этап идет после прежнего `2.696-2.698` delivery baseline и считается новой закрытой отправной точкой.

### Admin Reports / Rakeback - 2026-05-08

- Закрытый слой админского отчета идет после Poker21/debug и до handoff/chat delivery работ, чтобы не выглядеть свежей незакрытой задачей.
- В модалке отчета закреплены крупные вкладки `Форма`, `Рейкбек`, `Отправленные`.
- Вкладка `Рейкбек` получила строки `Рум / Айди / Рейк / Процент / Рейкбек`, выбор рума из `Покер21`, `Х`, `Супрема`, `PP`, авторасчет `Рейк * Процент / 100` и связанные доп. строки к той же группе.
- Последующая стабилизация этого же исторического слоя сделала рейкбек-таблицу общей для админов, но отчетные итоги персональными по `ownerId`: введенное Викой попадает только в отчет Вики, Аней - только в отчет Ани, Романом - только в отчет Романа.
- Недельные итоги рейкбека считаются по группам и попадают в отправленные отчеты, копирование недельной сводки и backend/Telegram summary.
- Desktop-кнопка `Отчет` ускорена через parallel fragment/script prewarm в `app-html-fragments.js`.
- Поздний follow-up этого же закрытого блока зафиксирован в worklog: итоги разделены по активной вкладке и `Итого по всем румам`, фишечные румы пересчитываются через множители (`Хпокер *100`, `Супрема/PPpoker *115`), значения `РБ` округляются до целых, сохраненный ID копируется кликом с кратким статусом, а для `Покер21`/`Хпокер`/`Супрема`/`PPpoker` добавлены пустые ID-шаблоны для дозаполнения.
- Блок был запушен в `main` коммитом `195349f Improve admin report rakeback tab`; последующие version/cache bump-ы уже относятся к более поздним работам.

### UI Polish

- В гостевых состояниях чата и профиля уточнены пустые/авторизационные подсказки.
- Верхняя строка списка чатов получила стабильный SVG-поиск, стеклянное поле ввода, объемную кнопку `+` для нового группового чата и боковые отступы `2px`.
- Промо "Рейтинг турнирщиков" получило общий объемный слой: верхний блик, мягкую нижнюю тень, hover lift, active press и усиленные кубки.
- Зимняя карточка рейтинга в Hall of Fame отдельно усилена фоном и тенями для dark/gold и light theme.
- Серия UI-правок и версия `2.541` задокументированы в `2026-05-03-ui-worklog.md`.

## Текущее состояние

- Архитектура стала модульнее, но без миграции на фреймворк.
- Первый DOM стал легче за счет HTML fragments.
- Стартовые скрипты ограничены избирательно: основные сценарии eager, редкие тяжелые домены догружаются по входу в раздел.
- Backend Redis-доступ централизован.
- Server chat handler и несколько крупных frontend entrypoints уже разрезаны на thin wrappers/runtime/helpers.
- Новые direct `window.*` globals и startup/runtime budget regressions ловятся smoke-проверками.
- Критичные пользовательские маршруты закреплены smoke-тестами.
- Chat keyboard/composer зона имеет отдельный закрытый baseline до `2.695`; ранний chat delivery/open freshness baseline закрыт до `2.698`, а последующий delivery/Redis-cost baseline закрыт до `2.738` в `2026-05-14-chat-delivery-cost-worklog.md`.
- Закрытый инженерный baseline 2026-05-06 описан отдельно; после него в истории уже идут Poker21/debug/admin/rating работы.
- Текущий handoff от 2026-05-14 добавлен в `2026-05-14-current-handoff.md`: он связывает старые закрытые слои CRM/PWA/Poker21/engineering в правильном порядке и отделяет их от более поздних admin reports/rating направлений.
- Закрытый admin reports/rakeback слой от 2026-05-08 описан отдельно и уже стоит до последующих handoff/chat delivery записей.

## Что осталось

### P1

- Поддерживать iOS PWA chat keyboard по метрикам из `Keyboard Lab` при новых регрессиях: закрытый baseline `2.591-2.695` уже зафиксирован, поэтому проверять нужно сохранение инвариантов focus/reopen/send/emoji/safe-area.
- Постепенно переводить legacy direct `window.*` globals из `global-deps-window-baseline.json` в ES modules/domain APIs.
- Дорезать `app-chat-lifecycle.js`: open-conversation glue, view-state/bootstrap coordinator и оставшиеся runtime-связки.
- Разделить iOS/PWA keyboard dock на pure metric/core, DOM adapter и narrow smoke/unit tests.
- Продолжить split крупных runtime-файлов: PWA auth, player CRM, home planner, rating view adapter, chat runtime.
- Двигать `app-view-router.js` к более явной route registration модели.

### P2

- CSS cleanup:
  - не давать новым доменам возвращаться в late override tails;
  - продолжить selector-level split оставшихся legacy хвостов;
  - добавить visual smoke еще на несколько экранов.
- Assets:
  - держать individual/public asset budgets в smoke;
  - продолжить проверку unused images/media после следующих fragment/screen changes.
- Server API:
  - дальше выделять commands/side-effects в `player-crm`, `raffles` и chat route handlers;
  - держать contract tests рядом с high-risk auth/chat/push/rating flows.

## Рекомендуемый порядок следующих работ

1. Сокращать legacy `window.*` baseline по доменам, начиная с chat/auth/router/rating.
2. Дорезать `app-chat-lifecycle.js` и keyboard dock.
3. Продолжить split runtime-файлов и server API handlers.
4. Поддерживать startup/runtime budgets без поднятия лимитов.
5. Усилить продуктовую аналитику: funnel, retention, admin CRM reports.
