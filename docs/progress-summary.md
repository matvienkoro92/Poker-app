# Progress Summary

Срез состояния проекта после серии работ по качеству, производительности и архитектуре.

Текущая продуктовая цель: оставить приложение живым и клубным, но сделать первый запуск легче, навигацию стабильнее, а backend/frontend проще поддерживать.

## Сделано

### Frontend Startup

- Чатовые, рейтинговые, видео/игровые, админские, турнирные и raffle-скрипты переведены в доменный lazy-loading.
- В `app-lazy-loader.js` закреплена карта доменов для ключевых разделов.
- Smoke проверяет переходы:
  - `home -> chat -> download -> cashout -> profile -> home -> raffles -> spring-rating`;
  - наличие DOM после lazy HTML hydration;
  - попадание lazy-файлов в `public`.
- Стартовый root JS-count удерживается в лимите для Telegram WebView.

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

`index.html` теперь содержит легкие hosts с `data-html-fragment`, а тяжелая разметка догружается при входе в раздел или при первом открытии модалок.

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

Smoke закрепляет, что эти домены больше не возвращаются в `app.js`.

### CSS Ownership

- `styles.css` оставлен entrypoint с импортами.
- `css-manifest.json` описывает ownership по доменам.
- Smoke проверяет:
  - что split CSS-файлы покрыты manifest;
  - что root CSS-файлы реально импортируются;
  - что build output содержит все CSS imports.

Оставшиеся CSS-риски: поздние `after/prelude/overrides` файлы и смешанный домен `rating`, где еще живут learning/games/download/raffles styles.

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
- respect vote/withdraw;
- profile/user lookup.

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

## Текущее состояние

- Архитектура стала модульнее, но без миграции на фреймворк.
- Первый DOM стал легче за счет HTML fragments.
- Стартовые скрипты ограничены, тяжелые домены догружаются по входу в раздел.
- Backend Redis-доступ централизован.
- Критичные пользовательские маршруты закреплены smoke-тестами.

## Что осталось

### P1

- Закончить стабилизацию iOS PWA chat keyboard по метрикам из `Keyboard Lab`, а не визуально: проверить, что `chat-keyboard-open`, fixed header, composer bottom и root-scroll включаются в одном сценарии.
- Расширить backend contract tests:
  - friends;
  - auth-email / auth-pwa-code;
  - tracking links;
  - push subscribe/broadcast;
  - gazette/rating notifications.
- Продолжить HTML split:
  - `cashout`;
  - `schedule`;
  - `streams`;
  - `poker-tasks` / games views;
  - большие части `global-modals.html` разнести по modal fragments.
- Дочистить `app.js`:
  - visitor tracking;
  - early rating/lightbox bootstrap;
  - popstate/bootstrap orchestration.

### P2

- CSS cleanup:
  - уменьшить `after/prelude/overrides`;
  - отделить `download/raffles/learning/games` от общего `rating` CSS;
  - добавить visual smoke еще на несколько экранов.
- Assets:
  - добавить smoke на максимальный размер отдельного asset;
  - продолжить проверку unused images/media после следующих HTML fragments.

## Рекомендуемый порядок следующих работ

1. Расширить backend contract tests.
2. Вынести `cashout`, `schedule`, `streams` в HTML fragments.
3. Разнести CSS домены, начиная с `rating`.
4. Дочистить `app.js` до почти чистого bootstrap.
5. Усилить продуктовую аналитику: funnel, retention, admin CRM reports.
