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
- Keyboard не закрывается сама после открытия.
- При закрытии keyboard composer возвращается вниз.
- Tabbar, hall of fame и rating открываются без ощутимой паузы.
- Не-админ не видит кнопку отчетов.
- Rating top wins отображается после первого открытия рейтинга и после перехода между разделами.

## Remaining Risks

- iOS PWA keyboard остается чувствительным к версии iOS, режиму standalone, predictive bar и моменту `visualViewport` resize.
- Eager hydration снижает задержку клика, но добавляет немного фоновой работы после старта.
- Все fragment hooks должны оставаться идемпотентными, иначе повторная гидрация начнет дублировать события.
- После новых lazy fragments нужно отдельно проверять, что view-specific init вызывается после вставки HTML.
