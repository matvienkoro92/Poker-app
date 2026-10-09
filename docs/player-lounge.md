# Гостиная друзей Two Aces

Третья комната слева от личного зала, на общей плоскости камеры. Переход использует существующую WAAPI-анимацию; доска приближается отдельно. Комната остаётся частью администраторского зала и не открывает доступ обычным пользователям.

Пять выбранных друзей представлены своими аватарами отдельными интерактивными слоями за столом. Можно менять и освобождать места; применение сохраняет состав, возврат отменяет примерку. Один друг занимает одно место. Из карточки доступен переход в его зал с возвращением непосредственно в гостиную. Список показывает до 100 друзей, даже если они не выбраны за столом. Пустая гостиная предлагает перейти в существующий раздел друзей.

Источники данных: существующий readNewsFriends с его правилами отображения имён и аватаров; подтверждённые результаты player-hall-tournament-results.json; серверная статистика гонки poker_app:garage:stats:<accountId>. На доске есть лучшие рекорды, свежие кубки и крупнейшие победы. Рассадка не означает присутствие онлайн: данные о присутствии не выдумываются.

Сохранение loungeSeats внутри существующего версионированного player_hall. Сервер проверяет ровно пять мест, отсутствие дублей и принадлежность каждого ID реальному списку друзей. Удалённый друг освобождает только своё место. Сбой загрузки запрещает изменение состава и сохраняет старое состояние; доступна повторная загрузка. Общие проверки владельца, администратора и CAS остаются прежними.

## Проверки

`node --test tests/player-lounge.test.js tests/player-hall.test.js tests/player-garage.test.js tests/monkey-race.test.js`

`node scripts/test-player-lounge-browser.js`

`GARAGE_BROWSER=webkit node scripts/test-player-lounge-browser.js`

Проверяются промежуточное движение камеры, пять мест, отмена/сохранение/повтор после сетевой ошибки, доска, список, возврат из чужого зала, отсутствие редактирования чужого зала, размеры 320/390/768 px и ошибки JS.

## Иллюстрация

Встроенный ImageGen, новая комната по визуальному референсу assets/player-hall/lounge-garage-stage-v16.webp. Источник: /Users/kosmonavt/.codex/generated_images/01a10e86-0a13-7491-8b47-de0b78614162/exec-02fa35dd-baa3-4605-a0cb-476c725d5bde.png. Нативное разрешение 941×1672; экспорт lossless WebP без увеличения. Новый фон содержит только символику Two Aces / Poker21; персонажи и надписи интерфейса не запечены в фон.

Промпт:

Create a new portrait 9:16 photorealistic cinematic poker club friends lounge, adjoining the supplied Poker21 trophy lounge reference on its LEFT. Match warm brass amber lamp lighting, dark charcoal patterned walls, polished stone floor, red/brown leather. Straight-on camera, deep elegant room full height for phone. Main green oval poker table in lower middle at 58%-75% height, five EMPTY leather chairs arranged behind and alongside it at positions x18 y48, x35 y42, x55 y42, x75 y48, x85 y60 percent. Keep chair head/back areas unobstructed for separate avatar layers. A clean dark rectangular framed wall board at x20-80 y17-30%, EMPTY interior for live UI records. Small tasteful TWO ACES lettering and spade emblem on green table apron only, Poker21 on brass door plaque. Doorway at RIGHT edge matching adjacent existing room. No people, no animals, no baked UI, no giant headlines, no random brands. Wide camera lens cinematic but straight walls, exquisitely sharp leather grain, brass, clean crisp details all throughout, no depth-of-field blur anywhere. High quality realistic film set interior.
