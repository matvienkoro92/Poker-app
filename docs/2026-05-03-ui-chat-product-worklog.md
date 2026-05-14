# UI / Chat / Product Worklog - 2026-05-03

Рабочий срез по серии быстрых правок после stability pass 2026-05-01. Главная цель: закрепить реальные пользовательские замечания по iPhone/PWA, профилю, чату, фрироллам, download, рейтингу и темам так, чтобы следующий фикс не возвращал старое поведение.

## Scope

- Профиль: состояния Poker21/club profile, видимость текстов во время загрузки, language/respect controls, прокрутка вкладки "Профиль в клубе".
- Главная: первый пользовательский скролл не должен откатываться наверх delayed restore/init кодом.
- Фрироллы и download: вернуть список/ближайший фриролл и показать room-specific информационные подпункты.
- Чат: убрать debug/layout плашки, стабилизировать открытие диалогов, back buttons, composer, emoji/reactions, keyboard dock и send/mic controls.
- Friends: после удаления из друзей пользователь должен исчезать из списка сразу, без ожидания полной перезагрузки.
- Темы: dark-gold tabbar должен быть непрозрачным вокруг кнопок, active states должны быть очевидны, газета должна сохранять контраст.
- Рейтинги: весенний рейтинг должен иметь понятную навигацию, back arrow в ожидаемой зоне и кубок рядом с заголовком.
- Raffles/admin: админские действия турниров и подтверждения удаления не должны ломать фокус или основной сценарий.
- Player CRM: админский workspace добавлен как отдельный рабочий инструмент, но требует аккуратной поддержки контракта данных.

## Version Timeline

- `2.485-2.499` - профиль, главная, фрироллы, download, чат, friends, газета и spring rating:
  - Poker21 profile loading показывает только "Идет загрузка статуса...".
  - Непривязанный профиль показывает текст про привязку без "до уровня осталось".
  - Привязанный профиль показывает "до уровня осталось".
  - Первый скролл на главной защищен от delayed reset несколькими итерациями.
  - В home/download возвращены фрироллы и добавлены room-specific информационные подпункты.
  - Stats toggle в профиле стал заметнее, текст доступности статистики выводится под переключателем.
  - Poker21 verified badge заменен на зеленую галочку рядом с именем.
  - Кнопки обновить/отвязать растянуты по ширине.
  - Language buttons и respect controls в профиле получили рабочие tap handlers/hit areas.
  - "Профиль в клубе" получил рабочую прокрутку.
  - Dark-gold tabbar больше не прозрачный вокруг кнопок.
  - Friends удаляются из списка оптимистично.
  - Красная layout/debug плашка скрыта из чата.
  - Respect action buttons "Поднять уважение" и "Отменить" держатся в одной строке.
  - Газета получила более контрастный текст вместо плохо видимого желтого.
  - Spring rating: back arrow опущен в зону бывшего кубка, кубок перенесен вправо от заголовка.
- `2.500-2.540` - PWA chat stabilization:
  - Chat opening защищен от первого bounce назад в список.
  - Back buttons в personal chat стали отзывчивее.
  - Keyboard after send/reactions больше не закрывается преждевременно.
  - Composer dock разбит на более устойчивые шаги открытия, удержания и завершения keyboard animation.
  - Root scroll блокируется во время iOS composer opening, чтобы viewport не прыгал.
  - Dock cleanup не должен срабатывать, пока iOS keyboard активна.
  - Документирована отдельная keyboard-close ветка.
- `2.541-2.572` - визуальная полировка, chat controls, CRM, raffles:
  - Friends optimistic remove закреплен отдельным исправлением.
  - Chat send/mic/voice controls визуально унифицированы.
  - Back buttons чата получили immediate response.
  - Главная и gold theme несколько раз выровнены по фону, header, tabbar icons, rounded nav buttons и contrast.
  - Club charter получил более читаемый contrast.
  - Chat search/rating promo и личный chat header доработаны под Telegram/PWA.
  - Raffle admin tournament actions и delete confirmation стабилизированы.
  - Emoji composer focus сохраняется при действиях.
  - Добавлен Player CRM admin workspace.
  - Chat composer bottom behavior стабилизирован в актуальном HEAD `920740f`.
- `2.591-2.695` - закрывающий chat composer/emoji/keyboard блок:
  - Emoji-only insert/send больше не поднимает закрытый composer и keyboard.
  - `send` из нижнего composer не поднимает поле вверх, независимо от того, отправляется emoji-only, обычный текст или смешанное сообщение.
  - Composer поднимается вверх только по явному focus/touch на textarea, когда пользователь собирается печатать.
  - Первый focus, быстрый reopen после закрытия и native keyboard reopen защищены от stale cleanup timers и implicit blur.
  - Первый tap по свободной зоне при открытом emoji picker закрывает только picker; следующий внешний tap уже может снять focus.
  - Emoji picker перестал улетать наверх, должен помещаться во viewport и нормально скроллиться на узких экранах.
  - iOS safe-area/resting reserve проверен для узких экранов: composer не должен прятаться под системной строкой.
  - Личный chat header перестал мигать Poker21 ID: ID кешируется и не очищается partial/empty refresh или typing state.
  - Desktop composer lift восстановлен отдельной веткой, чтобы mobile guards не ломали обычный browser сценарий.

## Chronology Note

Этот worklog намеренно хранит работу 2026-05-03 - 2026-05-05 как уже завершенную. После `ee27448` / `2.695` в истории проекта уже идут отдельные направления: chat send polling, lazy/module split, CRM dashboard, Poker21 binding/profile, admin reports/rakeback и новые данные рейтинга. Поэтому пункты выше - baseline для будущих правок, а не текущий список открытых задач.

## Product Invariants

### Profile

- Loading state не смешивается с итоговыми подсказками.
- Если Poker21 профиль еще не привязан, показывается только призыв привязать аккаунт; прогресс до уровня скрыт.
- Если Poker21 профиль привязан, показывается прогресс "до уровня осталось".
- Verified state не должен занимать отдельную крупную плашку: достаточно зеленой галочки рядом с именем.
- Action buttons в profile card должны занимать доступную ширину и иметь комфортную hit area.
- Language/respect controls должны работать после lazy hydration и повторного входа в профиль.
- Вкладка "Профиль в клубе" должна скроллиться независимо от общего shell/layout состояния.

### Home Scroll

- Первый пользовательский scroll intent на главной отменяет любые delayed scroll-to-top, restore, layout sync и startup refresh.
- Нельзя чинить home scroll только таймером: проверять нужно сценарий первого свайпа после запуска/возврата в раздел.
- Header/theme refresh может обновлять фон и состояние, но не должен дергать scrollTop после пользовательского ввода.

### Chat

- Debug/layout панели не должны быть видны в production UI.
- Открытый personal/group chat не должен сам возвращаться в dialogs list из-за delayed poll, hydration или refresh.
- Back buttons должны иметь immediate touch response и достаточную hit area.
- Composer не должен терять фокус при emoji, send, reaction и transient blur во время iOS keyboard animation.
- Пока keyboard активна, cleanup/root scroll reset не должны конфликтовать с dock session.
- Voice/send/mic controls должны сохранять одинаковые размеры и не прыгать при смене состояния.

### Download And Freerolls

- Под XPoker показывается ближайший фриролл.
- Под Poker21 показывается актуальный турнир дня.
- Эти подпункты являются информационными подразделами, а не дополнительными CTA.
- Если в блоке "следующий фриролл" раньше был список всех фрироллов, нельзя заменять его одиночной карточкой без явного решения продукта.

### Themes And Readability

- Dark-gold tabbar должен иметь плотную подложку вокруг кнопок, без прозрачных дыр.
- Active states должны быть очевидны по заливке/рамке/контрасту, а не только по тонкому оттенку текста.
- В газете светлый желтый на бумажном фоне запрещен для основного текста: нужен читаемый темный/коричневый газетный цвет или более контрастная акцентная палитра.
- Light theme и club charter требуют отдельной проверки контраста, потому что темные fixes могут ломать светлые поверхности.

### Ratings

- В spring rating back arrow должен находиться в предсказуемой зоне навигации слева, ниже верхней кромки карточки.
- Кубок является частью заголовка/смысла рейтинга и должен стоять рядом с заголовком, а не занимать место навигации.
- Rating promo и gold button states должны проверяться вместе с home theme, потому что эти блоки визуально связаны.

### Raffles And Admin

- Admin tournament actions должны быть защищены от двойных/случайных taps.
- Delete confirmation должен быть явным и не ломать фокус composer/emoji.
- Raffle interactions не должны вмешиваться в chat focus state.

## Verification Checklist

- `npm run build` перед каждым push.
- После UI правок проверять `git diff --stat`, чтобы не закоммитить чужие незакоммиченные файлы.
- На iPhone/PWA вручную пройти:
  - первый свайп на главной;
  - профиль Poker21 loading / linked / unlinked;
  - language buttons;
  - respect raise/cancel;
  - прокрутку "Профиль в клубе";
  - download room info;
  - список friends после удаления;
  - opening personal chat, back, send, emoji, reaction, voice/mic;
  - закрытие/открытие keyboard;
  - spring rating back/cup placement;
  - газету в светлой бумажной теме;
  - dark-gold tabbar.

## Remaining Risks

- iOS PWA keyboard/composer остается самым чувствительным местом, но baseline `2.591-2.695` считается закрытым: новые изменения должны проверять сохранение инвариантов focus/reopen/send/emoji/safe-area, а не возвращать старые конфликты.
- В рабочем дереве могут оставаться пользовательские незакоммиченные изменения; документационные/версионные коммиты нужно stage-ить точечно.
- Некоторые visual fixes касаются общей gold theme, поэтому после каждого изменения нужно смотреть не один экран, а home/chat/download/profile/rating вместе.
- Player CRM добавляет админскую поверхность: следующие правки должны не смешивать CRM state с обычным пользовательским profile/chat state.
