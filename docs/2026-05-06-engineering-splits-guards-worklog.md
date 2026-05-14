# Engineering Splits / Guards Worklog - 2026-05-06

Этот документ фиксирует закрытый инженерный этап от 2026-05-06, коммит `bc53907 Tighten module splits and engineering guards`.

Запись намеренно стоит исторически после PWA/CRM/Profile/Night Theme worklog от 2026-05-05 и до более поздних Poker21/debug/admin/rating работ. Это уже сделанный слой архитектурной нарезки и защитных smoke-guard'ов, а не текущий план.

## Scope

- Дорезать крупные frontend entrypoints без изменения пользовательского поведения.
- Сделать редкие HTML/modal surfaces ленивыми и убрать часть тяжелого DOM из `index.html`.
- Закрепить ownership JS/CSS/HTML в manifest и smoke.
- Укрепить dependency guard для browser globals.
- Добавить static budget-check, чтобы проект сам ругался при разрастании startup/runtime.

## Closed Architecture Work

### Thin Entrypoints And Runtime Splits

- `app-home-planner.js` стал тонким entrypoint'ом; основная логика перенесена в `app-home-planner-runtime.js`, доступ и user-gate - в `app-home-planner-access.js`.
- `app-pwa-auth.js` стал тонким entrypoint'ом; runtime перенесен в `app-pwa-auth-runtime.js`, auth mode - в `app-pwa-auth-mode.js`, overlay/auth UI - в `app-pwa-auth-overlay.js`.
- `app-player-crm.js` стал тонким entrypoint'ом; runtime перенесен в `app-player-crm-runtime.js`, регистрации - в `app-player-crm-registrations.js`, viewport shell - в `app-player-crm-viewport-shell.js`.
- `app-player-crm-formatters.js` получил ES module bridge через `app-player-crm-formatters.module.mjs`.
- `app-visitor-id.js` получил ES module bridge через `app-visitor-id.module.mjs`.
- `app.js` дополнительно разгружен в `app-popstate-recovery.js`, `app-shell-bootstrap.js` и `app-visitor-id.js`.

### Server Chat Split

- `lib/api-handlers/chat.js` стал thin wrapper'ом на `lib/api-handlers/chat-runtime.js`.
- Из chat runtime вынесены helpers:
  - `lib/chat-display-label.js`;
  - `lib/chat-profile-status.js`;
  - `lib/chat-profile-lookups.js`;
  - `lib/chat-read-receipts.js`.
- Route-level split, сделанный раньше, закреплен smoke-проверками, чтобы GET/POST/actions не возвращались обратно в monolith.

### HTML Fragment And Modal Split

- В отдельные HTML fragments вынесены utility/secondary views:
  - `html-fragments/bonus-game.html`;
  - `html-fragments/cooler-game.html`;
  - `html-fragments/plasterer-game.html`;
  - `html-fragments/learn-play-hub.html`;
  - `html-fragments/poker-tasks.html`;
  - `html-fragments/cashout.html`;
  - `html-fragments/streams.html`;
  - `html-fragments/schedule.html`.
- `global-modals.html` разнесен на подфрагменты:
  - `global-modals-media.html`;
  - `global-modals-admin.html`;
  - `global-modals-home.html`;
  - `global-modals-chat-rating.html`;
  - `global-modals-access.html`.
- `app-html-fragments.js` получил hydration подфрагментов глобальных модалок.
- Smoke закрепляет, что тяжелый DOM больше не лежит напрямую в `index.html`.

### CSS Ownership

- Home/rating promo late CSS вынесен в `styles-home-rating-promo-legacy.css` и `styles-home-rating-promo-late.css`.
- Shared touch targets вынесены в `styles-layout-touch-targets.css`.
- `styles-rating.css` больше не владеет learning/games/raffles/download ownership.
- `css-manifest.json` и smoke закрепляют split ownership, чтобы late overrides не возвращались в случайные домены.

### Static Assets

- Удален неиспользуемый `assets/chat-push-notify.wav`.
- Chat notify source закреплен на существующем lightweight audio asset через smoke.
- Build/smoke продолжают проверять modern image variants, public asset budget и отсутствие крупных unused assets.

## Closed Guard Work

### Browser Global Dependency Guard

- `global-deps-manifest.json` продолжает описывать явные browser global exports/consumers.
- Добавлен `global-deps-window-baseline.json` - legacy baseline прямых `window.*` globals, которые существовали на момент закрытия этапа.
- `npm run smoke` теперь ловит новый прямой `window.name = ...` или `window["name"] = ...`, если он не добавлен в `global-deps-manifest.json`.
- Baseline не предназначен для новых фич. Новый global должен идти в `global-deps-manifest.json`, либо код должен уходить в module/local state.

На момент закрытия этапа:

- manifest globals: `120`;
- legacy direct window globals baseline: `721`.

### Startup And Runtime Budgets

В `scripts/smoke-checks.js` добавлены static engineering budgets:

- `index.html` max: `100 KB`;
- eager scripts max: `152`;
- lazy scripts max: `25`;
- `app-pwa-auth-runtime.js`: `76 KB`, `1700` lines;
- `app-player-crm-runtime.js`: `80 KB`, `1680` lines;
- `app-home-planner-runtime.js`: `76 KB`, `1780` lines;
- `lib/api-handlers/chat-runtime.js`: `60 KB`, `1450` lines.

Smoke теперь выводит конкретные числа/файлы при пробитии бюджета.

На момент закрытия этапа:

- `index.html`: `94537` bytes;
- eager scripts: `148`;
- lazy scripts: `22`;
- tracked runtime files оставались внутри лимитов.

## Verification Used In This Block

- `npm run build`;
- `npm run smoke`;
- `npm run check:syntax`;
- `git diff --check`;
- push to `main`: `84e4c2b..bc53907`.

## State After This Block

После этого этапа проект стал заметно лучше защищен от обратного распухания: крупные entrypoints стали тоньше, часть DOM ушла в fragments, CSS ownership стал жестче, а новые globals/startup-size regressions теперь падают в smoke.

Оставшийся инженерный долг после этого блока:

- постепенно переводить legacy `window.*` в ES modules/domain APIs;
- дальше резать `app-chat-lifecycle.js`;
- отдельно упрощать iOS/PWA keyboard dock;
- продолжать split крупных runtime-файлов и server API handlers;
- держать startup budget под контролем, потому что eager script запас уже небольшой.

Более поздние задачи и изменения должны ссылаться на этот worklog как на уже закрытый baseline, а не смешивать его с текущими Poker21/debug/admin/rating работами.
