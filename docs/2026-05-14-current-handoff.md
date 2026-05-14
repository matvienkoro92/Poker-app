# Current Handoff - 2026-05-14

Этот документ закрывает текущий рабочий диалог и фиксирует, как читать уже сделанную работу по порядку. Он не заменяет подробные worklog-и, а связывает их в хронологию, чтобы старые закрытые слои не воспринимались как свежие TODO.

## Как читать историю

1. `2026-05-01-stability-worklog.md` - ранний слой стабильности: iOS/PWA keyboard, задержки кликов, доступ к админским отчетам и повторная гидрация рейтинга.
2. `2026-05-03-*` worklog-и - первый большой продуктовый слой: чат, профиль, главная, download/freerolls, friends, темы, raffle/admin, базовый Player CRM и UI/scroll инварианты.
3. `player-crm-dashboard.md` - состояние CRM/дашборда после майской сборки 2026-05-04: доступы, периоды, карточки, чат, график, игроки, рассылки, рыбка/уровни и честные ограничения по источникам данных.
4. `2026-05-05-pwa-crm-theme-profile-worklog.md` - уже более поздний слой поверх CRM: period stats, mobile PWA CRM shell, Poker21 profile state, уровни/рыбка, desktop PWA composer и night theme.
5. `2026-05-06-engineering-splits-guards-worklog.md` - инженерный слой после продуктовых правок: thin entrypoints, HTML/modal fragments, CSS ownership, global dependency guard и startup/runtime budgets.
6. `2026-05-07-chat-club-access-worklog.md` - точечный слой после modal fragments: кликабельная модалка доступа к главному чату, approve/reject/close handlers и filtered pending count.
7. `2026-05-08-poker21-debug-summary.md` - более поздний Poker21 слой: key-first binding, dtId fallback, refresh/unbind, status/stats contract и диагностика следующих ошибок.
8. `2026-05-08-admin-reports-rakeback-worklog.md` - закрытый слой по админскому отчету после Poker21/debug: крупные вкладки, третья вкладка `Рейкбек`, live-черновик общей таблицы, строки/доп. строки, персональные итоги по менеджерам, недельные итоги, backend payload/Telegram summary и desktop prewarm кнопки `Отчет`.
9. `2026-05-15-chat-delivery-cost-worklog.md` - более поздний закрытый chat delivery/Redis-cost слой: unified updates без self-hit, presence split, request coalescing, compact `usersById` payload и дешевые Redis revision counters.
10. Более поздние незакоммиченные изменения после этих документов относятся к последующим направлениям. Их не нужно смешивать с базовыми CRM/chat/admin worklog-ами.

## Что уже сделано и считается baseline

### Player CRM / Dashboard

- CRM доступна только разрешенным владельцам и скрыта от остальных.
- CRM стала операционным дашбордом: база, регистрации, Poker21, bot/push, депозиты, чатовые метрики, график прироста и списки по клику.
- Периоды поддерживают 7/30/90 дней, текущую/прошлую неделю, текущий/прошлый месяц, все время и ручные даты через календарь.
- Показатели не должны придумываться без источника данных. Игры и турниры не считаются, пока нет честного источника.
- Подписки bot/push за период считаются только по датированным событиям, а не по текущему состоянию канала.
- Игроки показываются порциями, карточка игрока открывается отдельным окном.
- Модалки списков имеют собственный scroll, период и раскрытие `Показать всех`.
- График показывает прирост по датам, имеет отдельный период, галочки серий, tooltip и вертикальную пунктирную линию при наведении.

### Chat / CRM Metrics

- Чат вынесен в отдельный блок от CRM.
- Есть метрики главного чата, личных диалогов, групповых чатов, диалогов Ани, Вики и остальных.
- По главному чату открывается топ авторов за период.
- По менеджерским диалогам открывается список диалогов, а затем сама переписка.
- Модалка доступа к главному чату после HTML/modal fragments считается закрытой: lazy-вставка больше не ломает `Принять`/`Отклонить`/`Закрыть`, а бейдж заявок считает только реальные `tg_*`/`vk_*` заявки.

### Admin Reports / Rakeback

- Модалка `Отчет за смену` имеет крупные вкладки `Форма`, `Рейкбек`, `Отправленные`.
- Вкладка `Рейкбек` хранит строки `Рум / Айди / Рейк / Процент / Рейкбек` и считает сумму из `Рейк * Процент / 100`.
- Связанные доп. строки относятся к той же группе `Рум + Айди`.
- Общая live-таблица рейкбека видна админам, но в отчет попадают только строки текущего менеджера по `ownerId`.
- Недельные итоги рейкбека попадают в отправленные отчеты, копирование недельной сводки и backend/Telegram summary.
- Desktop-кнопка `Отчет` прогревает fragments/scripts заранее, чтобы первое открытие не ощущалось тяжелым.
- Общий черновик рейкбека теперь считает нижний `Итого рейкбек` по всем строкам, но обычные админы могут удалять только свои записи.
- Романы (`388008256`, `2144406710`, `roman1787443`, `roman1_matvienko`) могут удалять любые строки общего черновика.

### Chat Delivery / Redis Cost

- `mode=updates` больше не делает мгновенный `notModified` после собственного send/edit/delete/reaction/unread/group-meta события.
- Presence вынесен из тяжелого contacts meta poll в отдельный легкий cadence.
- General/personal/contacts загрузчики coalesce одинаковые запросы и abort-ят устаревшие ответы.
- Message payload поддерживает compact `usersById=1`, чтобы не дублировать user objects на каждом сообщении.
- Contacts meta freshness в `mode=updates` опирается на `poker_app:chat_updates_rev`, а не на пересборку contacts meta ради сравнения.

### Home / Profile / Poker21

- На главном экране CRM вынесена в компактную иконку.
- Рыбка вынесена рядом с весенним рейтингом и открывает список игроков по уровню.
- Домашняя рыбка Poker21 ждет готовую Telegram/PWA auth-сессию и для linked-профиля показывает `Уровень X`, а не преждевременное `Привяжите Poker21`.
- Poker21 profile не показывает фейковый уровень без реального linked/profile state.
- Poker21 binding работает key-first и использует dtId как важный fallback для `user_app_id`.
- Unbind должен очищать локальное состояние даже если Poker21 уже считает аккаунт отвязанным.

### Engineering

- Крупные views вынесены в HTML fragments.
- Ряд больших frontend entrypoints превращен в thin wrappers с runtime/helpers.
- Chat API handler разрезан на wrapper/runtime/helpers.
- CSS ownership закреплен через manifest и smoke.
- Новые browser globals и startup/runtime разрастание ловятся smoke-guard'ами.

## Что не нужно переоткрывать без нового регресса

- Не начинать заново расследование старого chat keyboard состояния `2.572`: закрытый baseline уже описан в `chat-keyboard-pwa.md`.
- Не возвращать fake CRM данные ради заполнения пустых блоков.
- Не смешивать текущие сегменты reachability (`channels.bot`, `channels.push`) с исторической статистикой за период.
- Не считать Poker21 level у не linked пользователя.
- Не возвращать дорогую пересборку contacts meta в `mode=updates` без нового профиля/регресса: закрытый baseline использует дешевые Redis revision counters.
- Не складывать новые инженерные TODO в старые worklog-и за 2026-05-03/05-05; для новых направлений нужен новый dated worklog.

## Где продолжать после этого

- Для CRM-логики: `player-crm-dashboard.md`.
- Для мобильной CRM/PWA shell и period stats: `2026-05-05-pwa-crm-theme-profile-worklog.md`.
- Для Poker21 binding/profile: `2026-05-08-poker21-debug-summary.md`.
- Для закрытого слоя admin reports/rakeback от 2026-05-08: `2026-05-08-admin-reports-rakeback-worklog.md`.
- Для инженерной нарезки и smoke guards: `2026-05-06-engineering-splits-guards-worklog.md`.
- Для закрытого фикса доступа к главному чату после modal fragments: `2026-05-07-chat-club-access-worklog.md`.
- Для закрытого chat delivery/Redis-cost baseline: `2026-05-15-chat-delivery-cost-worklog.md`.
- Для новых admin reports/rating работ после 2026-05-14 лучше завести отдельный dated worklog, а не дописывать старые baseline-документы.
