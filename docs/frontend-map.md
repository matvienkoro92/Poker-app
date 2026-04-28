# Frontend Map

Короткая карта клиентских файлов. Проект пока живет как набор глобальных `defer`-скриптов без сборщика, поэтому порядок подключения в `index.html` важен.

## App Entry

- `index.html` — DOM всех экранов, boot overlay, PWA auth shell и порядок подключения клиентских скриптов.
- `app.js` — оставшийся общий слой: тема, сетевые helpers, textarea autosize, boot helpers, радио/PWA install, `setView`, общая навигация экранов и финальная склейка чата/авторизации.
- `app-shell-layout.js` — измерение app shell, нижнего таббара и safe-area отступов.
- `app-navigation-scroll.js` — восстановление и синхронизация скролла при переходах между view.
- `app-api-tracking.js` — клиентские helpers для visitor/section tracking.

## Auth, PWA And Push

- `app-auth.js` — Telegram/PWA/VK auth helpers, API auth query/body, startapp parsing, share/link helpers.
- `app-pwa-auth.js` — экран входа PWA, Telegram Login Widget, восстановление PWA-сессии, guest mode и визуальная логика auth shell.
- `app-push.js` — Web Push подписка, синхронизация пушей и PWA badge/chat push helpers.

## Chat

- `app-chat-utils.js`, `app-chat-render-utils.js`, `app-chat-storage.js`, `app-chat-prefetch.js` — общие chat helpers, storage snapshots, render helpers и prefetch.
- `app-chat-contacts-render.js`, `app-chat-contacts-loader.js`, `app-chat-dialogs.js`, `app-chat-dialogs-meta.js` — список контактов/диалогов, мета, фильтры, cache и загрузка.
- `app-chat-general-loader.js`, `app-chat-general-sender.js`, `app-chat-personal-loader.js`, `app-chat-personal-sender.js` — загрузка и отправка сообщений общего/личного чата.
- `app-chat-message-builders.js`, `app-chat-message-render-helpers.js`, `app-chat-outgoing-helpers.js`, `app-chat-reactions.js`, `app-chat-edit-delete-ui.js`, `app-chat-context-menu.js` — рендер сообщений, outgoing placeholders, реакции, edit/delete и context menu.
- `app-chat-conversation-shell.js`, `app-chat-tab-dialog-shell.js`, `app-chat-open-shell.js`, `app-chat-keyboard.js`, `app-chat-polling.js`, `app-chat-auth-guard.js` — оболочка диалогов, открытие чатов, keyboard/WebView fixes, polling и защита авторизации.
- `app-chat-group-pickers.js`, `app-chat-group-add-members.js`, `app-chat-group-create.js`, `app-chat-group-info.js` — групповые чаты.
- `app-chat-user-modal.js`, `app-chat-club-access.js`, `app-chat-club-gate.js`, `app-chat-self-pins.js`, `app-chat-friend-actions.js`, `app-chat-unread.js` — профиль участника, доступ в клубный чат, закрепы, друзья и unread-индикаторы.

## Home And Content

- `app-home-media.js` — медиа и интерактивные элементы главной.
- `app-home-gazette-tasks.js` — газета, домашние задачи и связанные блоки главной.
- `app-updates.js` — блок обновлений.
- `app-tournament-day.js` — турнир дня и фрироллы.
- `app-cashout.js` — депозит/кэшаут entrypoints.

## Rating, Games And Learning

- `app-rating-core.js`, `app-rating.js`, `app-rating-week-tops.js` — рейтинги, lightbox, недельные топы, share/admin actions.
- `app-hall-fame.js` — зал славы.
- `app-games.js`, `app-equilator.js`, `app-club-tasks.js` — игровые и клубные инструменты.
- `app-raffles.js` — розыгрыши.
- `app-streams.js`, `app-video-lessons.js`, `app-video-lessons-modals.js` — стримы и видеоуроки.

## Profile And Admin

- `app-profile.js` — профиль, Poker21/PokerPlus данные, аватар, статус, друзья и настройки видимости.
- `app-visitors-admin.js`, `app-admin-reports.js`, `app-section-views.js`, `app-share-stats.js`, `app-tracking-links.js` — админские модалки, отчеты, посетители, просмотры разделов и tracking links.

## CSS

- `styles.css` — entrypoint; только `@import`, порядок менять осторожно.
- `styles-base.css` — переменные, темы, базовый layout, scroll/card primitives.
- `styles-home-rating-promo.css` — home rating promo и summary блоки рейтинга весны.
- `styles-pwa.css` — PWA/auth/install/header states.
- `styles-home.css` — главная, welcome, устав и газета.
- `styles-chat.css` — chat CSS entrypoint; только `@import`, порядок менять осторожно.
- `styles-chat-messages.css` — базовые chat surfaces, сообщения, метаданные, реакции и context menu.
- `styles-chat-composer-media.css` — composer, attach/media preview, voice controls, lightbox, PDF viewer и emoji picker.
- `styles-chat-dialogs-groups.css` — switcher, диалоги, фильтры контактов, создание/инфо групп.
- `styles-chat-threads-contacts.css` — layout тредов, закрепы, шапки общего/личного чата и строки контактов.
- `styles-chat-prelude.css`, `styles-chat-after.css` — legacy-блоки, которые пока оставлены вокруг chat-каскада для сохранения порядка.
- `styles-rating.css` — rating CSS entrypoint; только `@import`, порядок менять осторожно.
- `styles-rating-learning-games.css` — видеоуроки, poker tasks и игровые challenge-поверхности.
- `styles-rating-raffles.css` — розыгрыши, tickets, участники, победители и raffle admin.
- `styles-rating-home-download.css` — legacy home/download-блоки, которые пока оставлены перед рейтингами для сохранения порядка.
- `styles-rating-tables-modals.css` — зимний/весенний рейтинг, таблицы, podium, share/actions и rating history modals.
- `styles-rating-chat-modals.css` — chat preview, user card и template modals, которые раньше шли после rating rules.
- `styles-hall.css` — hall CSS entrypoint; только `@import`, порядок менять осторожно.
- `styles-hall-rating-lightbox.css` — calendar/date rating view, screenshots и rating lightbox.
- `styles-hall-tournament-day.css` — tournament day tooltip/card, ticket и freeroll table visuals.
- `styles-hall-main.css` — зал славы: toolbar, panels, albums, shame board, seasonal rating cards и game-adjacent surfaces.
- `styles-hall-footer.css` — footer meta, visitor counters и visitor admin shortcut.
- `styles-hall-prelude.css` — legacy chat/rating хвост перед hall rules.
- `styles-admin.css` — visitors/reports/tracking/share admin modals.
- `styles-profile.css` — profile CSS entrypoint; только `@import`, порядок менять осторожно.
- `styles-profile-core-avatar.css` — profile shell, tabs, hero, avatar и chat display name controls.
- `styles-profile-poker21.css` — Poker21 visibility, email/auth binding, stats и responsive profile layouts.
- `styles-profile-status-social.css` — profile status scale, fish collection, profile sections, friends и chat push controls.
- `styles-profile-adjacent-tools.css` — streams, schedule и equilator rules, которые пока оставлены после profile social controls.
- `styles-profile-modals-tail.css` — respect voters, friends list, personal info и legacy profile tail.
- `styles-layout.css` — bottom nav, boot overlay и поздние scroll/layout fallbacks.
- `styles-chat-overlays.css` — поздние skeleton/iOS compose overlay правила.
- `styles-home-overrides.css` — поздние home tournament/freeroll overrides.

## Next Development Rules

- Новый крупный JS-код добавлять рядом с доменом, а не обратно в `app.js`.
- `app.js` трогать в основном для общей склейки, `setView`, boot и truly shared helpers.
- CSS переносить между файлами только после визуальной проверки: порядок каскада сейчас сохранен импортами.
- После изменений запускать `npm run build`, `node scripts/check-js-syntax.js`, `npm run smoke`.
