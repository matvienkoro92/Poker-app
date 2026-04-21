# Chat Realtime Plan

Дата: 2026-04-22

## Цель

Довести чат до максимально близкого к мессенджеру поведения:

- моментальная доставка сообщений;
- моментальная отрисовка в открытом треде;
- моментальное обновление списка диалогов;
- снижение лишнего bandwidth;
- отказ от лишних полных refetch и full-read path.

## Текущее состояние

Сейчас чат уже заметно ускорен, но архитектурно это все еще:

- `long-poll + optimistic UI + push + selective refetch`.

Это хороший промежуточный слой, но не финальный realtime-first контур.

## Следующие шаги

### 1. Реальный realtime-канал для активного чата

Приоритет: самый высокий.

Нужно добавить `SSE` или `WebSocket` для:

- активного `general`;
- активного `DM`;
- активного `group`;
- списка диалогов.

Ожидаемый результат:

- событие о новом сообщении приходит почти сразу после записи на сервере;
- уходит зависимость от цикла `wait -> GET -> parse -> render`;
- снижается число пустых HTTP polling-запросов.

### 2. Delta-события вместо полного refetch

Нужно перейти от модели:

- `message created -> loadGeneral/loadMessages/loadContacts`

к модели:

- `message_created`
- `message_edited`
- `message_deleted`
- `message_delivered`
- `message_read`
- `message_reaction_changed`
- `thread_meta_changed`

Клиент должен:

- вставлять одно новое сообщение в DOM/store;
- обновлять один конкретный bubble;
- менять только нужный preview/unread/time в списке диалогов.

### 3. Мгновенное локальное обновление списка диалогов

Нужно добить optimistic/meta-store путь для dialog list:

- сразу поднимать диалог наверх после локальной отправки;
- сразу менять preview последнего сообщения;
- сразу менять last message time;
- сразу обновлять unread/status, не ожидая отдельного `contacts` ответа.

### 4. Единый client-side chat store

Нужно собрать единый state layer для:

- `threads`
- `messagesByThread`
- `threadMeta`
- `contactsMeta`
- `pendingOutgoing`
- `delivery/read states`

Это упростит:

- дедупликацию;
- optimistic insert;
- retry;
- read receipts;
- reconnect/resync.

### 5. Дальнейшая зачистка full-read path на сервере

Нужно продолжить удалять места, где сервер делает:

- полный `LRANGE`;
- полный `JSON.parse` больших лент;
- сборку тяжёлого ответа там, где нужен только хвост или только delta.

Приоритетные зоны:

- `general`
- `DM`
- `group`
- `contacts`
- admin/chat management branches

### 6. Разделение payload по важности

Нужно жёстко разделить payload:

- для списка диалогов: только `id`, `preview`, `unread`, `time`, `online`, `flags`;
- для активного треда: только новые сообщения или delta-события;
- для тяжёлых сущностей: lazy load и отдельный cache path.

Ожидаемый результат:

- меньше bandwidth;
- меньше parse/render cost;
- быстрее первый paint диалогов.

### 7. Разведение lightweight message и heavy attachment path

Нужно, чтобы отправка вложений не тормозила критический путь:

- сначала создаётся lightweight message record;
- затем вложение догружается отдельно;
- статус вложения меняется последующим событием.

Это улучшит:

- ACK latency;
- perceived send speed;
- устойчивость при слабой сети.

### 8. Соединение и reconnect UX

Нужно ввести явные состояния transport layer:

- `connecting`
- `connected`
- `reconnecting`
- `offline`

И при reconnect:

- подтягивать только delta после последнего известного revision;
- не перерисовывать весь тред без необходимости.

## Рекомендуемый порядок внедрения

1. `SSE` для активного треда и списка диалогов.
2. Переход на `delta events` без полного refetch после каждого события.
3. Локальный realtime-store для thread meta и pending outgoing.
4. Дальнейшая зачистка server full-read path.
5. Разведение attachments из критического send path.

## Критерии успеха

- новое сообщение в активном треде появляется у второго пользователя почти мгновенно;
- список диалогов меняется локально сразу после send/receive;
- нет временных дублей и лишних полных перерисовок;
- количество пустых `GET /api/chat` заметно ниже;
- payload списка диалогов и active thread становятся меньше.
