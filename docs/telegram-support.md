# Manager dialogs in Telegram

Owner-approved scenario: private messages to `Poker_dvatuza_bot` are copied into
one forum topic per lead in the dedicated managers' group «Диалоги». Managers
reply through the same bot. This does not enable greetings, campaigns, membership
notifications, or unrestricted replies in other groups. Salebot forwarding is
disabled in the webhook, including when its obsolete environment variable exists.

Setup: create a private supergroup with topics, add the bot with permission to
manage topics, and have an owner (Telegram ID 388008256 or 5053253480) send
`/support_setup` in that group. This explicitly binds its exact chat ID in Redis
`poker_app:telegram:support:config:v1`. Bot admin status alone never activates the
feature. A migrated basic group's old ID must not be used. No new bot token or
webhook URL is needed.

The first ordinary private message creates a topic with the lead's name and
Telegram ID, a contact header and two buttons. Text, photos, documents, voice,
audio, video, video notes, stickers, animations, contacts and locations are copied
without exposing the manager's account to the lead. Existing history is not
backfilled. In automatic mode, slash commands retain existing club behavior;
ordinary messages go to the managers' topic. Existing automated dialogs are not
invented by this feature.

1. An app administrator replies directly in the topic. The first ordinary reply
   automatically assigns the dialog and is immediately sent to the lead. Existing admin IDs include
   Anya 2144406710 and Vika 1897001087. Telegram group membership alone does not
   authorize sending to leads.
2. Ordinary content from the assigned manager in that topic is sent to the lead.
   Messages beginning with `//` and slash commands remain internal. Bot, anonymous
   sender, other manager and service messages never go to the lead. Explain this
   rule before allowing managers to work: typing normal text in a taken topic
   sends it immediately.
3. Successful outbound messages do not create extra confirmation messages. Permanent Telegram
   400/403 failures are reported in the topic; transient failures retry via the
   webhook. Photos/documents are separate messages; albums are not reconstructed.
4. **Вернуть боту** releases the dialog. Another manager cannot seize or release
   an assigned dialog; an owner may override it. Ordinary private messages stay in the human dialog. Bot commands remain usable
   regardless of assignment; commands recognized by the club menu bypass the
   manager relay.

Only new `message` and the two button `callback_query` events are handled.
Edits, reactions, member updates, join requests, Business messages and unrelated
groups do not relay. Group policy restricts `support-dialog` to the bound group,
its topics and copies from that group to private recipients. No group update is
forwarded to Salebot. The existing signed webhook remains mandatory.

Redis keeps durable lead↔topic mappings and assignment state. A 60-second client
lock serializes operations; a busy delivery returns 503 for Telegram to retry.
Message receipts deduplicate successful delivery for 30 days. The last 100 control
callbacks are remembered per dialog. A process crash between Telegram accepting a
message/topic and Redis recording it can duplicate that action: Telegram does not
offer an idempotency key for these methods. Never describe this as exactly-once
delivery. Deleted topics or unsupported protected messages need manual review.

To stop the pilot, set `enabled:false` in the config object while preserving its
chat ID. Do not delete client mappings or real payment records. After re-enabling,
existing assignments still apply.

Validation: `node --test tests/telegram-support.test.cjs
tests/telegram-group-policy.test.js`. All tests mock Redis and Telegram. A live
trial requires a real user message to the bot, a direct manager reply and
release; never fabricate a real user's update for this purpose.

Bot API references: [forum topics](https://core.telegram.org/bots/api#createforumtopic),
[copying messages](https://core.telegram.org/bots/api#copymessage).

Pilot activated on 2026-11-13 by the owner’s chat request in forum group
`-1003942075074` («Диалоги»). Verified the bot has `can_manage_topics` and
webhook subscriptions include `message` and `callback_query`.
Working domain: `poker-app-ebon.vercel.app`, actual Vercel project `poker-app`
(`prj_V8sgQdBeoNdXwmKkRHFniRBclfsU`), not the separate project named
`poker-app-ebon`. Deployment: `dpl_2c1mVGTPNzLfBk4MWKZSzRLZYMJf`; previous
working deployment: `dpl_2Yj5r62ZiBeDPpYtgP7xYzsQezww`. The source was matched
against all 11,594 files of the previous working release before applying only
the support changes. The separate project was restored to its previous release.

Deployment caveat: the existing production build script
`scripts/generate-club-news-data.js` invokes the existing day-hero push scenario.
This build reported 114 accepted accounts, 142 accepted devices and 3 failed
accounts. Do not rerun a production build merely to repeat already-passed checks.

Updated 2026-11-13 after the live trial: taking a dialog is automatic on the
first ordinary manager response; the old take button remains compatible but
is no longer shown in new headers. Notes and commands do not take the dialog.
Replies by another manager get a visible local non-delivery notice. Old messages
written before takeover are not resent retrospectively.

Operator identity: outgoing text is prefixed with the operator’s first name and
«· менеджер» (fixed names Аня and Вика for the existing manager IDs). Entity
offsets are shifted to preserve formatting. Media and text too long for a prefix
receive a separately deduplicated operator label followed by the original copy.
Private text sends are restricted by group policy to known support clients.

Response queue status: topic titles show 🔴 while the latest forwarded client
message awaits a successful manager response, and 🟢 with the responding
operator’s name after delivery. The lead’s Telegram ID remains in the title.
Read markers, topic views, reactions, notes and takeover/release buttons do not
clear waiting status. Duplicate old events cannot clear a newer pending message.
Failed title updates retry without repeating a recorded delivery. Older topics
acquire status after the next client message; history is not guessed.

Status rename service notices are automatically removed when delivered as
forum_topic_edited updates from this bot in the bound support group. Only
previously issued status titles for mapped topics qualify. Each exact service
message receives a temporary deletion permit, checked by the group policy;
arbitrary message deletions, human renames and other groups remain denied.
Telegram may display the service notice briefly before its webhook is processed.
Existing past notices are not guessed or bulk-deleted.

Operator headers use the bold text «👤 Имя · менеджер:». Formatting uses explicit
Telegram entities; the original text entities are shifted using UTF-16 offsets.
Media labels use the same bold header.

Support topics use the fixed neutral 💬 custom emoji icon
`5417915203100613993` returned by Telegram’s topic icon sticker list. Status
colors appear only in the title, avoiding a stale red default icon beside a
green title. Existing mapped topics can be refreshed under the normal client
lock using `refreshTopicStatus`. Own neutral-icon service notices are cleaned
with the same narrowly scoped deletion permits as status title notices.

Player deposits: private `/деп`, `деп` (also dep/deposit aliases) and the Pulse
«Пополнить счёт» button ask for an amount in the next message. An amount supplied
in the command skips the question. Amount prompts expire after 15 minutes and
can be cancelled with `/отмена`. Known 1,000/1,500/2,000 RUB amounts use existing
verified shared payment links and display credit, fee and gross price. Other
amounts are mirrored to the manager dialog without inventing prices. Issuing a
link never creates income or credits a game-room account. Group accounting
commands keep their existing admin-only flow; no new group sending is enabled.

Minimum player deposit: 1,000 RUB. Lower amounts get a minimum notice and a
new amount prompt, without creating a payment link or notifying managers.
Amounts without a fixed verified link get «Ожидайте, ищем реквизиты на … ₽»
and are mirrored to the manager dialog.

Requisites waiting is specifically for 3,000 RUB and above. Other amounts
between the minimum and 3,000 that have no verified link prompt for a supported
choice, rather than silently promising a requisites search.

The bot’s amount question for `/деп` and the Pulse deposit button is also copied
into the lead’s support topic. Menu-first contacts create their topic as needed.
The question has a durable prompt receipt and per-topic copy receipt for retries;
mirroring a bot question does not mark a manager response delivered or clear
the waiting status.

Intermediate player amounts between 1,000 and 3,000 RUB now offer exactly
the nearest lower and upper choices from 1,000 / 1,500 / 2,000 / 3,000.
Buttons are bound to the caller’s active private prompt and its offered options;
stale or forged choices cannot issue links. Choosing 3,000 uses the manager
requisites flow. Proposals and selected-result messages are mirrored to the
lead’s support topic for manager context. Minimum and >=3,000 direct requests
retain their existing behavior.

Owner update: all authorized managers can reply in any lead topic at any time;
there is no exclusive assignment lock or “another manager” rejection. The client
lock only serializes deliveries, and the last successful sender is recorded for
status/signature information. Any manager may release manual mode. Notes and
unauthorized senders retain existing restrictions.

Owner update: the private amount question stays unchanged for the player, but
the manager topic receives only «Игрок хочет пополнить, ждем сумму». One
message ID is persisted per lead and removed after an entered amount (including
a below-minimum amount) or cancellation. Repeated prompts reuse the same note.
Deletion requires a per-message permit and a matching pending-note ID on that
client record; other messages cannot be removed through this path.

After a payment link is successfully sent to the player, the manager topic gets
a short notice identifying Robokassa/Prodamus, the player credit amount, gross
amount due and «Ожидаем перевод». This applies both to direct amounts and button
selections. It does not mean payment is confirmed and does not record income.
The private payment message ID and manager notice receipt are persisted so an
ordinary retry does not resend the link or duplicate the notice.

Default monogram icon replaces the custom speech icon after a repeated client
display issue. Topic names begin with the lead name, with the status circle
after the first separator. editForumTopic explicitly clears icon_custom_emoji_id
so a status emoji cannot become the default first-character monogram. Existing
pilot topics are refreshed under their normal client locks.

Incoming lead text in manager topics is prefixed with a bold Telegram username
(«👤 @username:»), falling back to name plus Telegram ID. Original text entity
offsets are shifted to retain formatting. Attachments and long text retain their
original copy, with a separately deduplicated identity line immediately before it.

Manager-facing player messages and payment-link notices now include the saved
player name and Poker21 ID. Identity resolution follows Telegram visitor_dt_ids
to the canonical app account, then its authoritative pokerplus_user_ids binding.
A matching cached profile or Poker21 nickname directory supplies the saved name;
a profile for a different Poker21 ID cannot supply identity. Missing IDs are
shown as not found; lookup failure is shown as unavailable without blocking the
relay. Telegram IDs are never displayed as Poker21 IDs.

Manager signatures include the sender’s Telegram handle for Anya and Vika
(verified via Telegram getChat): @Qweenpoker and @vikipoker. The actual sender
username takes precedence, with the verified configured handle as fallback.
Name, manager role, handle and trailing colon share the existing bold header.

Owner update: topic names are now fixed at initialization, using the saved player
name and confirmed Poker21 ID when available, otherwise Telegram identity.
Response status no longer renames topics. A single pinned «Ждут ответа» message
in General lists pending leads with topic links, ten per page. Only authorized
managers can switch its pages. A new inbound message adds a lead; a successful
manager response removes it. Reading «Все», notes and failed replies do not clear
the queue. Redis persists the pending index and board message ID; policy permits
editing/pinning only that stored board in the configured support group.

Player identity headers now use two bold lines: Telegram first/last name and
@username (Telegram ID if no username), followed by saved gaming nickname and
confirmed Poker21 ID. This keeps Telegram name distinct from the gaming nick.

Player headers additionally show XПокер IDs from the deposit directory profile
linked to the confirmed Poker21 account. The lookup projects only playerAccounts
from the ledger; unrelated account IDs are excluded. Missing and unavailable
lookups are labelled explicitly and never inferred from Telegram IDs.

Owner-approved manager reactions: ordinary emoji reactions on newly relayed player
messages in the bound forum are applied by the bot to the original private
message. Only app admins qualify. Source/target mappings expire after 30 days.
The latest manager reaction wins; removal by its manager clears it. Paid/custom
reactions, anonymous actors, unmapped messages and other groups are ignored.
Reactions never clear the response queue or forward to Salebot.

Owner header format: two bold lines, «Имя @telegram» then
«Ник P21:ID X:ID», without leading emoji or expanded room labels.

## Deposit reply ordering

For every private deposit reply (amount question, ready link, requisites wait,
minimum amount, neighboring choices, and cancellation), the bot sends and
persists the player's reply before manager work. The per-user lock covers only
reply issuance and prompt state. A separate per-event lock protects retries
while manager synchronization runs; a slow previous support request therefore
cannot block the player's next deposit command.

Pending support steps are saved in Redis for seven days without the bot token.
The webhook still awaits support and returns a retryable error on failure.
Retries resume unfinished steps without resending links, reissuing them, or
changing a newer prompt. Old amount notices cannot replace or delete newer
ones. Tracking updates run after deposit handling instead of before the reply.
This is synchronous work with durable retry state; Redis, payment ledger
issuance and Telegram delivery still affect time to the first reply.
`[player-deposit-reply]` logs report reply latency and Telegram request time
without message content, user IDs or tokens.

## Closed topics

Closing a mapped lead topic pauses incoming relays and bot-message mirrors in
that topic and removes the lead from the unanswered queue. The bot does not
reopen it automatically. Manually reopening resumes new messages; messages
received during the pause are not replayed. Topic-state service updates apply
only to the configured support group and the current mapped topic; older
service updates cannot override newer ones.

For topics closed before this behavior was deployed, a `TOPIC_CLOSED` rejection
records the pause and acknowledges the update without retrying or reopening.
Deleted topics continue to use the separate replacement-topic recovery.
The separate payment topic «Приходы» retains its own automatic reopening.

## Player card in the topic header

The existing dialog header includes Рейк, Депозиты, В розыгрышах,
В крутках and Сыграно в нарды. Rake uses the bound Poker21 profile's total fee;
deposits use active application ledger entries with confirmed player links;
raffles sum monetary prize values for matching account/Telegram winners,
excluding cancelled raffles and failed winners. Daily poker uses its lifetime
credited bonus and ticket totals. Backgammon sums completed free and paid games
in the current short, long, crazy and six-one statistics buckets.

The header refreshes on dialog activity at most once per twelve hours and edits
the stored header message. Closed lead topics remain paused. Missing account
bindings and source errors display explicit unavailable labels instead of zero.
The card does not show a last payment link or last operator reply, and has no return-to-bot button. Player totals are cached for twelve hours. Inactive leads do not trigger scheduled refreshes.

Rake also shows the current Monday-based week, month-to-date starting on the
1st, and the complete preceding calendar month, using Moscow dates. Month
amounts use lifetime-fee baselines reconstructed from first-day snapshots
(total fee minus that day's fee). Missing boundaries are reported as unavailable.
The saved weekly counter is used only when its sync date is in the current week.

Owner-requested bulk updates use `scripts/refresh-telegram-support-cards.cjs`:
first run without `--apply` to verify bot/group/inventory, then with `--apply`.
This edits existing cards in place, including closed topics, without reopening
those topics. Routine activity keeps the twelve-hour refresh limit.

Player message signatures use an emoji-prefixed name and game-identity line in
bold, followed by a plain @username when present. Missing XPoker IDs and numeric
Telegram-ID lines are omitted. The saved topic header has an «✉️ Открыть профиль»
URL button targeting `tg://user?id=<lead id>` instead of a return-to-bot button.

When exact monthly rake boundaries are absent, the support card falls back to
processed weekly reports of club 758417. `lib/support-rake-reports.json` stores
only Poker21 IDs and rake in kopecks, with source date ranges. Synchronize it
from the processed report archive before deploying updated report data:

```
node scripts/sync-support-rake-reports.cjs --source=/path/to/data/union-periods.json
```

The importer rejects duplicate players, negative/invalid rake and overlapping
weeks, and reports periods without player details as skipped. Weeks crossing a
month boundary are apportioned by days. Current-week profile rake is included
only if that week has no complete processed report, through the profile's sync
date. Every day must be covered; missing weeks are never silently extrapolated.
Fallback month totals are labeled ≈. Exact snapshot totals retain priority.
The archive requires this synchronization after future weekly report processing;
it is bundled server data, not a live external fetch on every player message.

Extended cards include deposit count, total, average and latest recorded date
(Moscow), direct invitation count and inviter, first recorded tracking source,
favorite game by accumulated rake in the imported report archive, lifetime game
result from the bound Poker21 profile, and rake change between the last two
adjacent complete report weeks. Trend dates are displayed explicitly. Referral
counts share a bounded, deduplicated scan cached for 15 minutes; individual
cards retain their 12-hour metrics cache. Missing sources are distinguished from
zero activity. Favorite game describes report rake, not a stated preference.
The report sync artifact now includes per-game rake as well as weekly totals.
