# Два туза: последний бай-ин

Игровой прототип кампании для владельца. Вход в профиле вместе с «На последнюю регистрацию» скрыт для остальных аккаунтов. Статические страницы можно открыть по прямому адресу; скрытие карточки не является серверной защитой страницы. Клубные рекорды, призы и существующие дуэли кампанией не изменяются.

## Сценарий

Нит хочет стать победителем собственного турнира без риска проиграть. Под предлогом запрета покера он закрывает клуб, забирает деньги и билеты и собирает приглашённых игроков в башне. «Железный натс» управляет охраной и подменой карт. Его слабость: машина зависит от обычных служебных коммуникаций.

ПокерМанки видел изъятие и записал разговор перевозчиков. Он хороший на протяжении всей истории. Эмиля пригласили как сильного игрока; он использует приглашение, чтобы раскрыть обман. Ваар возвращает деньги, не бросает команду и не становится соперником.

| Время сюжета | Глава / герой | Действие и причинный переход |
|---|---|---|
| 17:05 | Гонка / Манки | Доставляет запись в клуб, уводит Колла в заграждения. |
| 17:12 | Драка / Рома | Освобождает клуб, находит накладную: сейф отправлен на станцию, билеты — в башню. |
| 17:20 | Вентиляция / Мисслик | Открывает железнодорожный тоннель и шлюзы; сохраняет признание Нита. |
| 17:29 | Поезд / Ваар | Снимает три вагонные блокировки, побеждает Удава, возвращает деньги Роме. Берёт ключ для Эмиля. |
| 17:38 | Полёт / Кулер | Получает турбо-модуль, сбивает три охлаждающих бака Натса и открывает аварийный выход башни. |
| 17:45 | Операция / Эмиль | Проходит охрану, играет три раздачи, обезвреживает Слоуплея. Находит билеты и выводит признание Нита на экран турнира. |
| 17:54 | Финал / команда | Рома ломает броню, Мисслик отключает защиту, Кулер бьёт двигатель, Манки не даёт Ниту сбежать. Ваар и Эмиль помогают и забирают билеты. |
| 17:59 | Развязка | Команда возвращается в освобождённый клуб. Деньги и билеты возвращены. Ниту предлагают играть честно, на общих условиях. |

Время постановочное, не часы реального ежедневного турнира. Внутриигровые билеты не выдаются аккаунту и не являются настоящим призом.

## Gameplay revision 2

1. Chapter one embeds the existing app-monkey-race.js and its renderer, controls and engine. After 12 obstacles, Captain Call locks a lane, charges, and can be lured into three barriers. Campaign runs never call the record API. The regular game is unchanged.
2. Roma: a 1900px club arena, four guard encounters, solid furniture, a three-hit combo, limited chair projectiles with knockback, jumping to evade, and separate shield/baton brothers.
3. Missclick: a 3370px route, moving lifts, steam traps, chips, two checkpoints, a door lever and a complete solid boss arena.
4. Vaar: one continuous 13-car bending train, three real locks, local checkpoints, no repeated teleport to the beginning, then the coil boss.
5. Cooler: the real CoolerFlightEngine physics through 15 gates, upgrade after 10 gates, checkpoint healing, temporary shield and six hits on the cooling robot.
6. Emil: three tactical rooms, different cover layouts, chip launcher, six-shot magazine, manual/automatic reload, smoke, three visible poker hands and a telegraphed sniper boss.
7. Final: four hero phases, 24 boss health, card rain, targeted volleys, frontal armour windows and team support.

Full-body Roma and Missclick use idle/walk/punch/jump images. Check, Raise, Reshuffle, Nuts, Slowplay and Nit have distinct art. Four scenic backgrounds are stored in assets/last-buy-in with the prompts in prompts-v2.txt. Images generated using the built-in image_gen tool and converted to WebP with alpha preserved.

All chapters remain available to the owner for testing. Best score and medals use localStorage poker-last-buy-in:v1. The game stops its RAF on map/exit, pause and results. Sound, elaborate sprite animation and cloud campaign saves are not implemented.

## Проверка

`node --test tests/last-buy-in.test.js tests/monkey-race.test.js tests/cooler-flight.test.js`

`node output/last-buy-in/check.cjs` — мобильные размеры 320/390, семь глав с обычными управляющими действиями (ускоренная симуляция только в тесте), переходы истории, боссы, пауза, удержание кнопки, медали после перезагрузки, ошибки JS и загрузки ресурсов.

`RACE_DUCK=1 RACE_PERF=1 SMOKE_ROOT=public node output/monkey-race/check.cjs` — короткий свайп вниз меняет дорожку, удержание после свайпа включает пригибание, дуэль/реванш и нагрузка на кадр.

## Вступление и ролики

Первый экран — одно превью и «Начать». Вступление автоматически сменяет анимированные сцены с субтитрами; погоня Манки заканчивается его прибытием в клуб. После ролика сразу запускается глава 2 за Рому. Остальные главы доступны в меню после вступления; перед каждой и после победы проигрывается отдельный ролик. «Пропустить ролик» сохраняет правильный переход. В скрытой вкладке таймер сцен приостанавливается. Факт просмотра вступления хранится отдельно от медалей.

## Баланс глав

Гонка и полёт доводят игрока до 70 препятствий перед боссом. За основу темпа полёта взят тот же CoolerFlightEngine: повышение каждые пять ворот, уменьшение на 25-х. Драка — семь залов, платформер — 34 участка и восемь паровых преград, поезд — семь замков, штурм — семь помещений и три раздачи. Частота атак охраны растёт по мере прохождения. Все главы заканчиваются боссом; финальный бой сохраняет четыре фазы. Это исходная настройка для игровых проб, а не доказанная одинаковая сложность разных механик.

В длинном полёте ремонт на 20-х, 40-х и 60-х воротах восстанавливает по одному здоровью. Тараны Колла ускоряются после каждого попадания в шлагбаум. Пар в тоннеле срабатывает чаще, раскачивание состава усиливается по мере снятия замков.

## Постепенное раскрытие

Вступление содержит только опечатку клуба и старт погони Манки. После него начинается первая игровая глава. Названия, герои и боссы будущих глав скрыты до последовательного прохождения предыдущих; заранее переходить к ним нельзя. Пройденные главы доступны для повтора.
