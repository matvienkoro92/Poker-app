# Documentation Index

Current documentation:

- `../README.md` - setup, environment, runtime behavior, account model, and main product features.
- `../APP-GUIDE.md` - technical map of views, API handlers, integrations, build, and deployment.
- `pokerplus-integration-for-vendor.md` - Poker21 verification / PokerPlus API details for the external Poker21 developer.
- `identity-invariants.md` - account identity contract for `dtId`, channel ids, legacy keys, and aliases.
- `project-tasks.md` - active backlog under the `ЗАДАЧИ` label.
- `progress-summary.md` - current summary of completed quality/performance/architecture work and remaining priorities.
- `player-crm-dashboard.md` - актуальное описание CRM/дашборда игроков: доступ, периоды, источники данных, карточки, чат, график, модалки, рассылки и ограничения.
- `frontend-map.md` - current frontend file ownership map.
- `chat-keyboard-pwa.md` - iOS PWA chat keyboard investigation, completed composer/emoji/keyboard baseline through `2.695`, diagnostics, and invariants.

Historical worklogs, ordered by date:

- `2026-05-01-stability-worklog.md` - worklog for the May 1 stability pass: iOS PWA keyboard, tap latency, admin reports, and rating hydration.
- `2026-05-03-product-engineering-audit.md` - product UX and engineering audit with scores, verification results, and nearest fixes.
- `2026-05-03-telegram-chat-worklog.md` - Telegram chat fixes: composer focus, back buttons, dark-gold theme, dialog metadata, DM header hydration, native close clearance, and version/push discipline.
- `2026-05-03-raffles-chat-stability.md` - raffle admin actions, PWA/Telegram confirm split, raffle loading performance, chat debug overlay, emoji/composer focus, and quick chat back/send edge cases.
- `2026-05-03-ui-chat-product-worklog.md` - profile/home/download/chat/theme/rating product fixes plus closed chat delivery/bandwidth/open freshness work through app version `2.698`, kept as historical work before later CRM/Poker21/admin/rating tracks.
- `2026-05-03-ui-scroll-crm-worklog.md` - current UI/scroll/CRM notes: home theme visuals, tabbar icon rules, panel scrollports, cashout lazy images, CRM API mode, raffles performance, and keyboard debug gating.
- `2026-05-03-ui-worklog.md` - chat search/new-group polish, rating promo volume, and version bump/push notes.
- `2026-05-05-pwa-crm-theme-profile-worklog.md` - closed PWA composer, levels/fish/profile-click, Poker21 profile state, CRM period stats, respect buttons, and night-theme adaptation work; placed before later Poker21/debug/admin/rating work.
- `2026-05-06-engineering-splits-guards-worklog.md` - closed engineering split/guard baseline: thin runtime entrypoints, server chat split, HTML/modal fragments, CSS ownership, global dependency guard, startup/runtime budgets; placed before later Poker21/debug/admin/rating work.
- `2026-05-07-chat-club-access-worklog.md` - closed main-chat access modal fix after modal fragments: lazy delegation for approve/reject/close and filtered pending-request counts before later Poker21/debug/admin/rating work.
- `2026-05-08-poker21-debug-summary.md` - Poker21 binding/profile refresh/unbind/status/stats debug summary and current key-first integration contract.
- `2026-05-08-admin-reports-rakeback-worklog.md` - closed admin report/rakeback layer: large report tabs, third `Рейкбек` tab, grouped/live shared rakeback rows, manager-scoped report totals, mobile fit, weekly totals, desktop report-button prewarm, May 9 mobile/fullscreen work, room totals, chip multipliers, copy feedback, and ID templates through app version `3.024`; placed before later handoff/chat work.
- `2026-05-14-chat-delivery-cost-worklog.md` - closed chat delivery/Redis-cost baseline: presence split, request coalescing, compact `usersById` message payload, and cheap `chat_updates_rev` counters for `mode=updates`.
- `2026-05-14-current-handoff.md` - ordered handoff for the current dialog: what is old closed baseline, what came after it, and where future CRM/Poker21/admin/rating work should continue.
- `../CRON-SETUP.md` - cron setup notes.
- `../CARD_COLORS.md` - card suit color convention used by the project.
- `../assets/README.md` - asset folder naming notes.
- `../Карта10к.md` - product/technical scaling roadmap.

Removed from the active documentation set:

- old chat investigation reports;
- temporary article drafts and tournament summaries;
- stale task plans.

Those files are intentionally not kept in the working tree because they no longer describe the current project state. Use git history if one of them is needed later.
