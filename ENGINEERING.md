# Engineering Notes

## Release Flow

1. Make the smallest scoped change.
2. Run `npm run check:syntax`.
3. Run `npm run smoke`.
4. Run `npm run test:contracts`.
5. Run `npm run smoke:nav` for navigation/UI-route changes.
6. Run `npm run smoke:visual` for visible UI changes.
7. Run `npm run bump:pwa-version` before every push.
8. Run `npm run build`.
9. Run `npm run smoke` again.
10. Commit and push.

`npm run bump:pwa-version` increments `data-app-version` by `0.001` and updates local CSS/JS cache-bust query strings plus `styles.css` split-CSS imports to the same version.

## Auth

Core files:

- `app-auth.js`: shared auth storage, cookies, PWA session helpers and API auth payloads.
- `app-pwa-auth.js`: Telegram/PWA login screens, session restore and startup verification.
- `app-auth-debug.js`: admin-only browser-side auth diagnostics.
- `lib/poker-pwa-session.js`: server-side PWA session TTL/signing helpers.
- `lib/api-handlers/auth-telegram.js`, `lib/api-handlers/auth-email.js`, `lib/api-handlers/auth-pwa-code.js`: auth endpoints.

When debugging session persistence, use the admin `Auth debug` button. It reports Telegram initData, `window.__pokerTelegramAuth`, localStorage, sessionStorage, cookie and IndexedDB state for PWA sessions.

## Static Assets

`index.html` is the load-order source for JavaScript. `styles.css` is the CSS entrypoint.

Manifests:

- `js-manifest.json`: app module ownership by domain.
- `css-manifest.json`: style ownership by domain.

Both manifests are copied to `public/` and checked by `npm run smoke`.

## JS Domains

- `auth`: login, restore and diagnostics.
- `chat`: chat UI, storage, loading, sending, groups and reactions.
- `rating`: rating core, screens and weekly tops.
- `tournament`: tournament day and hall of fame.
- `profile`: profile and cashout.
- `push`: push subscription and notifications.
- `admin`: visitors, broadcasts, reports, tracking and auth debug.
- `home`, `media`, `raffles`, `shell`: supporting app surfaces.

Critical order is protected in smoke checks. Keep `app-auth.js` before auth consumers, chat utilities before chat renderers/builders, and `app.js` before section view helpers.

`app-lazy-loader.js` owns rare heavy JS domains. Chat, spring rating, games/fish and raffles stay eager; hall of fame, video/learn, equilator, streams, club tasks, player CRM and selected admin modals load by route or first click.

## CSS Domains

- `styles-auth.css`: PWA/auth styles.
- `styles-home.css`: home entrypoint split into shell, sections, modals and planner.
- `styles-home-tournament.css`: late home tournament overrides.
- `styles-chat.css`: chat entrypoint and split chat surfaces.
- `styles-rating.css`: rating entrypoint and split rating surfaces.
- `styles-tournament.css`: tournament day styles.
- `styles-hall.css`, `styles-profile.css`, `styles-admin.css`, `styles-layout.css`: domain surfaces.

When splitting CSS, preserve cascade order. Prefer turning the old large file into an entrypoint and moving contiguous blocks into imported files; verify by comparing the old file with the concatenated split files.

## Common Edits

Schedule changes usually touch `app-tournament-day.js` and related tournament/home CSS.

Push routing changes usually touch `app-push.js`, admin broadcast UI in `index.html`, and server handlers under `lib/api-handlers/`.

Auth/session changes should update smoke checks and should be tested with admin `Auth debug` in PWA and Telegram Mini App.
