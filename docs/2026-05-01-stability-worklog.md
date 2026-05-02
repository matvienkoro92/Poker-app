# Stability Worklog — 2026-05-01

Рабочий журнал по серии правок, которые закрывали нестабильность первого тапа, iOS PWA keyboard/composer, ленивую гидрацию разделов, видимость админских отчетов и рейтинг.

## Scope

- Первый фокус в чатовых textarea: клавиатура должна открываться от пользовательского тапа без потери фокуса.
- Выезд клавиатуры в iOS PWA: composer, лента сообщений и шапка должны синхронно переходить в docked-состояние.
- Поднятие строки чата: composer не должен застревать между исходным и финальным положением.
- Поднятие ленты: messages viewport должен освобождать место под keyboard/composer без автоскролла в неожиданные места.
- Поведение шапки: header в личном и общем чате не должен уезжать при docked keyboard.
- Снятие фокуса и возврат клавиатуры: клики по чату/композеру не должны провоцировать blur и закрытие клавиатуры.
- Первый заход в разделы: chat/rating/modals должны быть готовы после HTML fragment hydration.
- Микрозадержки кликов: tabbar, hall of fame, rating и глобальные модалки не должны ждать тяжелую lazy-гидрацию в самом tap handler.
- Доступ к отчетам: кнопку и отправленные отчеты видят только реальные админы.
- Рейтинг: top wins должен инициализироваться после lazy HTML hydration.

## Version Timeline

- `2.463` / `a86e9b2` — защита открытого диалога от возврата в список чатов во время initial refresh.
- `2.464` / `568a39c` — фикс шапки общего чата во время keyboard dock.
- `2.465` / `2388f0a` — защита главной от auto-jump вверх после пользовательского скролла/ввода.
- `2.466` / `950d610` — улучшение читаемости spring rating podium и готовности player modal после lazy load.
- `2.467` / `334a0e1` — eager hydration глобальных модалок.
- `2.468` / `a059663` — повторная привязка freeroll modal после eager hydration.
- `2.469` / `9b76106` — прозрачность overlay spring podium в gold theme, чтобы карточки не темнели до нечитаемости.
- `2.470` / `3fad937` — ускорение mobile tap handling через fast-tap CSS и быстрый fallback для click sound.
- `2.471` / `2f4fb75` — preload тяжелых views и defer click sound вне критического пути клика.
- `2.472` / `e40984c` — скрытие отправленных отчетов от не-админов.
- `2.473` / `9126012` — кнопка отчетов видна только реальным админам.
- `2.474` / `b04d77c` — повторная инициализация rating top wins после lazy hydration.
- `2.475` — этот документационный срез.
- `2.476` / `f0d18f5` — стабилизация мобильных back-кнопок, защиты от ложного возврата из личного/группового чата в список, фиксация метаданных игрока в шапке диалога.
- `2.477` / `385deb1` — защита главной от первого scroll snapback вверх после входа/возврата в раздел.
- `2.478` / `fd28701` — Hall of Fame `top2026`: список топ выигрышей теперь рендерится даже без активной winter-rating страницы.
- `2.479` / `20eaddf` — шапка личного чата показывает имя, PokerPlus verification badge, уровень и рыбку в одной строке.
- `2.480` / `1208a7f` — iOS PWA keyboard dock: шапка общего/группового/личного треда фиксируется сверху и не сползает вниз при поднятии composer.
- `2.481` / `f4c995c` — активная вкладка `Все` / `Друзья` в списке чатов стала явно видимой в темно-золотой теме.
- `2.482` / `c2d3f0b` — модалка партнерства получила 5 новых сжатых изображений, старые `partnership-*.jpg` удалены.
- `2.483` / `af9e4eb` — удален лишний underline у активной вкладки `Все` / `Друзья`, оставлено только цветовое выделение.
- `2.484` / `547c014` — verification badge в шапке личного чата больше не пропадает после загрузки сообщений.

## Implementation Notes

### iOS PWA Chat

- Диагностика вынесена в `docs/chat-keyboard-pwa.md` и `Keyboard Lab`.
- Ключевые состояния проверяются через классы keyboard-state, CSS-переменные, rect/computed styles header/messages/composer и root/shell scroll.
- Фиксы должны ориентироваться на метрики `visualViewport`, active textarea, composer bottom, header top и scroll root, а не только на скриншоты.

### HTML Hydration And Tap Latency

- `app-html-fragments.js` догружает основные view/fragments раньше, чтобы первый тап по tabbar/rating/hall не попадал в тяжелую загрузку.
- Глобальные модалки гидрируются заранее, а обработчики после этого перевешиваются идемпотентно.
- `app-view-router.js` откладывает click sound после критического пути навигации, чтобы звук не добавлял задержку к ощущению тапа.
- `styles-base.css` закрепляет быстрые mobile taps через `touch-action: manipulation` на интерактивных элементах.

### Rating

- `app-rating-week-tops.js` переведен на явную функцию `window.pokerInitWinterRatingWeekTops`.
- Инициализация идемпотентная: повторный вызов после HTML fragment hydration не должен дублировать listeners.
- `app-html-fragments.js` вызывает reinit для `winter-rating`, чтобы блок "Топ выигрышей за один турнир" появлялся и после первого lazy-open.
- `app-rating-week-tops.js` также поддерживает hall-only container `hallFameSingleTopList`: Hall of Fame `top2026` не зависит от наличия controls winter rating.
- `app-hall-fame.js` вызывает и обновляет single top list при открытии панели `top2026`.

### Chat Header Meta

- Шапка личного диалога в `html-fragments/chat.html` содержит отдельные элементы:
  - `#chatConvVerifiedBadge` — PokerPlus verification badge в строке имени.
  - `#chatConvTitleLevel` — текстовый уровень игрока.
  - `#chatConvTitleFish` — fish/status icon.
  - `#chatConvTitleId` — P21 id во второй строке.
- `app-chat-lifecycle.js` связывает уровень и fish через `setChatConvTitleFish(level)`: если уровень очищается, очищаются и level/fish; если уровень есть, показываются оба.
- `app-chat-personal-loader.js` не должен сбрасывать verification badge пустым/ложным `otherPokerPlusVerified` после того, как verified уже пришел из списка чатов или из сообщений.
- Для verified в личке действует правило "true can promote, missing/false must not demote known header state" внутри открытого peer.
- Для групповых чатов `showConv` по-прежнему очищает personal-only метаданные: verification, level/fish и личный P21 id не должны протекать в group thread.

### Chat Navigation And Scroll

- Back-кнопки в чате получили увеличенную hit area и touch handling, чтобы первый tap на iPhone не терялся.
- Открытие personal/group conversation защищено от delayed refresh, который раньше мог вернуть пользователя назад в dialogs list.
- Home scroll restore теперь учитывает user scroll intent: если пользователь уже начал скроллить, delayed scroll-to-top отменяется.
- При iOS PWA keyboard-open шапки `.chat-general-header` и `.chat-conv-top` фиксируются в верхней части viewport, а composer докуется отдельно.

### Chat Dialogs UI

- В темно-золотой теме active state `Все` / `Друзья` использует более контрастную золотую заливку, glow/border и text shadow.
- Дополнительный `::after` underline был удален: цветового выделения достаточно, линия визуально перегружала tabs.

### Partnership Modal Assets

- 5 новых изображений сжаты через `sharp` в JPEG 760x760:
  - `assets/partnership-2026-overview.jpg` — ~62 KB.
  - `assets/partnership-2026-step1.jpg` — ~56 KB.
  - `assets/partnership-2026-step2.jpg` — ~64 KB.
  - `assets/partnership-2026-step3.jpg` — ~55 KB.
  - `assets/partnership-2026-cost.jpg` — ~61 KB.
- Старые файлы удалены:
  - `assets/partnership-intro.jpg`
  - `assets/partnership-step1.jpg`
  - `assets/partnership-step2.jpg`
  - `assets/partnership-step3.jpg`
  - `assets/partnership-cost.jpg`
- `html-fragments/global-modals.html` и prefetch list в `app-home-gazette-tasks.js` должны ссылаться только на `partnership-2026-*`.
- В модалке сохраняется 5 листов: overview, step 1, step 2, step 3, cost/contact.

### Admin Reports

- `app-admin-reports.js` больше не показывает отправленные отчеты пользователям без реального admin status.
- `app-visitors-admin.js` скрывает кнопку отчетов для всех, кроме реальных админов.
- `adminReportAccess` больше не считается достаточным основанием для отображения кнопки отчетов.

### Theme Readability

- Gold/dark-gold rating podium не должен иметь темный overlay, который гасит карточки игроков.
- Для модалок и podium проверять не только layout, но и контраст текста/карточек на реальном темном фоне.

## Verification

Обязательные проверки перед push:

- `npm run check:syntax`
- `npm run build`

Ручная PWA-проверка на iPhone:

- Первый тап в textarea открывает клавиатуру.
- Composer поднимается сразу к клавиатуре и не застревает по пути.
- Лента сообщений освобождает место под composer/keyboard без скачка.
- Header личного и общего чата остается на своем месте.
- Header не сползает вниз при поднятии composer в iOS PWA.
- В личном чате после загрузки сообщений остаются видимыми verification badge, level и fish, если эти данные были известны при открытии.
- Keyboard не закрывается сама после открытия.
- При закрытии keyboard composer возвращается вниз.
- Tabbar, hall of fame и rating открываются без ощутимой паузы.
- Hall of Fame `top2026` показывает список топ выигрышей 2026.
- На списке чатов active tab `Все` / `Друзья` очевиден, но без underline.
- Модалка партнерства показывает 5 новых сжатых изображений, старые assets нигде не используются.
- Не-админ не видит кнопку отчетов.
- Rating top wins отображается после первого открытия рейтинга и после перехода между разделами.

## Addendum 2026-05-03

Последний пакет правок закрывает три связанных класса регрессий в уже открытом mobile chat/composer состоянии.

- Emoji controls теперь документируются как часть composer chrome: tap по emoji button или emoji picker не должен уводить focus с активной chat textarea и не должен закрывать native keyboard.
- `app-chat-lifecycle.js` должен хранить textarea focus в touch/mobile emoji context через `shouldPreserveChatEmojiComposerFocus()` и родственные guards. Pointer-dismiss/blur cleanup не должны считать emoji tap кликом вне ввода.
- Лента сообщений должна подниматься не только когда она строго на самом дне. Если пользователь слегка отскоролил ленту вверх, `updateChatMessagesKeyboardPad()` должен сохранить bottom-distance ощущение и поднять `scrollTop` на дельту нового keyboard/composer padding, не snap-ясь к последнему сообщению.
- Для iOS PWA/CSS-only dock это особенно важно: snap может быть отключен, но near-bottom anchored lift все равно должен освобождать место под поднятый composer.
- Cashout manager images (`dep-manager.jpg`, `dep-manager-vika.jpg`) не должны грузиться из скрытого DOM до входа в cashout. Initial markup хранит путь в `data-src`, а `updateCashoutManager()` гидрирует `src` только на активном cashout view.
- Router entry for cashout должен вызывать `updateCashoutManager()` до инициализации формы, чтобы картинка активного менеджера появилась при открытии раздела без ранней загрузки скрытых assets.

Проверки для этого пакета:

- `node scripts/check-js-syntax.js`
- `npm run build`
- `npm run smoke`
- `npm run smoke:nav`

## Remaining Risks

- iOS PWA keyboard остается чувствительным к версии iOS, режиму standalone, predictive bar и моменту `visualViewport` resize.
- Eager hydration снижает задержку клика, но добавляет немного фоновой работы после старта.
- Все fragment hooks должны оставаться идемпотентными, иначе повторная гидрация начнет дублировать события.
- После новых lazy fragments нужно отдельно проверять, что view-specific init вызывается после вставки HTML.
