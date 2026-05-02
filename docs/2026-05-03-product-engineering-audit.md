# Product And Engineering Audit - 2026-05-03

Аудит фиксирует состояние проекта с двух сторон: удобство для игрока/админа и инженерное качество поддержки. Код в рамках аудита не менялся.

## Проверки

- `npm run check:syntax` - passed, checked 178 JavaScript files.
- `npm run smoke` - passed, 57 smoke checks.
- `npm run test:contracts` - passed, backend contract tests for chat, auth/admin, raffle, respect, profile/user lookup.
- `npm run smoke:visual` - passed on mobile viewport 390x844 for `home`, `chat`, `download`, `cashout`, `profile`, `video-lessons`, `spring-rating`.
- `npm run smoke:nav` - failed on first-load resource invariant: hidden section images `dep-manager.jpg` and `dep-manager-vika.jpg` load before navigation.

Visual smoke produced screenshots in `tmp/visual-smoke/` during the audit run. No horizontal overflow, blank active view, or hidden bottom navigation was detected in the checked mobile views.

## UX Score: 7.4 / 10

The application is already a real product surface rather than a prototype. It includes profile, Telegram/PWA auth, public and private chat, friend/social mechanics, respect, raffles, ratings, video lessons, hall of fame, deposit/cashout, push subscriptions, and admin workflows. The core navigation and visual mobile smoke tests are healthy.

The main UX weakness is perceived weight. The first screen does work for sections that the user has not opened yet. This matters most in Telegram WebView and mobile networks, where early HTML hydration, many eager scripts, and hidden images can make the app feel slower than the feature set deserves.

Concrete issue found:

- `app-html-fragments.js` eagerly hydrates primary views, including `chat`, from the idle queue.
- `html-fragments/chat.html` contains admin dialog avatars with `fetchpriority="high"` and `loading="eager"`.
- As a result, `npm run smoke:nav` catches `dep-manager.jpg` and `dep-manager-vika.jpg` loading before user navigation.

Secondary UX risk: feature density. The bottom navigation is understandable for regular club members, but a new or returning user can still face too many equivalent-looking options: home, chat, download, deposit, profile, plus ratings, raffles, training, gazette, hall of fame, and admin surfaces. The product would benefit from clearer "next useful action" guidance on the home screen.

### UX Strengths

- Real mobile-first SPA with bottom navigation and lazy HTML fragments.
- Visual smoke covers core mobile views and catches overflow/blank-screen regressions.
- Chat, rating, raffle, profile, and admin flows are broad enough for a live club workflow.
- PWA and Telegram-specific auth/onboarding states are explicitly documented.
- The interface has many domain-specific affordances rather than generic placeholder screens.

### UX Weaknesses

- First load still performs too much work for hidden sections.
- Some hidden images are loaded before the relevant section is opened.
- The first-use path is not as clear as the amount of functionality: users need stronger prioritization of what to do next.
- Error/empty/loading states should be more consistently action-oriented, especially in chat and auth-gated surfaces.
- Telegram/iOS keyboard and WebView behavior remain a high-regression-risk area despite existing fixes and diagnostics.

## Engineering Score: 7.0 / 10

The engineering baseline is stronger than a typical vanilla static SPA: there are docs, file ownership maps, manifests, smoke checks, contract tests, a build copy script, and explicit release flow notes. The team has clearly invested in keeping a large no-build-step application maintainable.

The main engineering constraint is still the global script architecture. `index.html` is the load-order source and connects many `defer` files directly. `js-manifest.json`, `css-manifest.json`, and smoke checks reduce risk, but the cost of changes remains high because modules communicate through global functions, global state, DOM ids, and load order.

Concrete maintainability issue:

- `app-chat-lifecycle.js` is roughly 10k lines and carries too much responsibility for one file: chat lifecycle, keyboard/WebView behavior, shell state, media/composer behavior, and compatibility logic.
- This file is a high-value refactor target because chat is also the highest-risk UX surface.

### Engineering Strengths

- Documented release flow in `ENGINEERING.md`.
- Frontend ownership map in `docs/frontend-map.md`.
- JS/CSS manifests protect file ownership and load-order expectations.
- `scripts/smoke-checks.js`, `scripts/smoke-navigation.js`, and `scripts/smoke-visual.js` catch structural and visual regressions.
- Backend contract tests cover core API behavior without needing real Redis.
- HTML fragments keep initial DOM lighter than a single giant HTML page.

### Engineering Weaknesses

- Too many eager startup scripts in `index.html`, including domains not needed for the first screen.
- Lazy HTML fragments are partly defeated by idle eager hydration of many primary views.
- Global functions and implicit load order make refactors risky.
- Several files are still very large, especially `app-chat-lifecycle.js`, `app-home-gazette-tasks.js`, `app-pwa-auth.js`, `app-profile.js`, and `app-rating.js`.
- CI expectations are documented locally but should be enforced automatically.

## Nearest Fixes: UI Bugs And Lags

1. Fix `npm run smoke:nav` by preventing hidden chat admin avatars from loading on first screen.
   - Option A: remove `chat` from the eager primary view hydration queue in `app-html-fragments.js`.
   - Option B: keep chat hydration but change admin avatars in `html-fragments/chat.html` from high/eager to lazy/default priority.
   - Preferred: Option A first, because it fixes the broader "hidden view work" pattern.

2. Review the eager hydration queue in `app-html-fragments.js`.
   - Keep only views that materially improve first-session experience.
   - Load `download`, `profile`, `winter-rating`, `hall-of-fame`, `raffles`, `video-lessons`, and `equilator` on first navigation unless telemetry proves preload is needed.

3. Add a first-screen performance budget smoke.
   - Assert maximum startup script count.
   - Assert no hidden section images before first navigation.
   - Assert no heavy domain scripts before first navigation unless explicitly allowlisted.

4. Run targeted Telegram/iOS manual QA after the next UI change.
   - Open app from Telegram.
   - Open chat.
   - Focus composer.
   - Send message.
   - Open a private dialog.
   - Background/foreground the app.

## Nearest Functional Improvements

1. Add a clearer "next action" block on the home screen.
   - Examples: enter chat, verify profile, join raffle, check today's tournament, deposit/cashout.
   - The block should be state-aware: guest, logged-in user, verified player, admin.

2. Improve onboarding language for Telegram/PWA auth.
   - Make the current state obvious: verifying, needs Telegram, PWA session restored, guest mode, retry needed.
   - Keep the visible copy short and action-focused.

3. Strengthen chat empty/error states.
   - No access: explain why and show the request/join action.
   - Network error: show retry.
   - No messages: prompt the first useful action.

4. Add contextual CTAs in rating/raffle/training surfaces.
   - Share rating.
   - Subscribe to updates.
   - Invite friend.
   - Open relevant chat/thread.

## Nearest Engineering Improvements

1. Start with first-load reduction.
   - Move heavy domains toward view-triggered loading.
   - Candidates: hall of fame, raffles, video lessons, games, equilator, admin tools, tracking, auth debug, `winter-rating-data.js`, `peerjs.min.js`.

2. Split `app-chat-lifecycle.js` by responsibility.
   - Keyboard/WebView fixes.
   - Conversation shell state.
   - Composer/media handling.
   - Chat lifecycle/init glue.
   - Compatibility helpers.

3. Promote local verification into CI.
   - `npm run check:syntax`
   - `npm run smoke`
   - `npm run test:contracts`
   - `npm run smoke:nav`
   - `npm run smoke:visual`

4. Add resource-budget reporting to smoke output.
   - Number of JS resources before first navigation.
   - Number of CSS resources before first navigation.
   - Hidden view images loaded before first navigation.
   - Heavy allowlisted vs non-allowlisted scripts.

5. Continue replacing implicit global coupling with explicit contracts.
   - Each view module should expose a small init/load contract.
   - Router should own view hydration.
   - Domain modules should avoid depending on incidental `index.html` order when possible.

## Recommended First Task

The best first fix is to make `npm run smoke:nav` green again by stopping hidden chat/deposit avatars from loading before navigation. It is small, user-visible on slower devices, and creates a clean baseline for the larger first-load reduction work.
