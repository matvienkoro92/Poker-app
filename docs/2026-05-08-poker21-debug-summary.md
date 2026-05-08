# Poker21: summary of fixes and conclusions from 2026-05-08

This note records what we changed while debugging Poker21 profile binding, refresh, unbind, status display, and stats rendering on May 8, 2026.

## Main conclusion

The Poker21 key must be treated as the primary proof for binding.

If a user has no Poker21 account linked in our app and enters a valid Poker21 key for the first time, our app should not require a previously saved Poker21 binding, Telegram ID match, or email match before trying that key. The first outbound request to Poker21 must be key-only plus API `token`.

Optional metadata (`mail`, `user_app_id`) can be retried only as compatibility fallbacks after the key-only request fails.

Follow-up from May 9, 2026: a real production bind succeeded only after the backend retried `user_app_id` with the stable app account id (`dtId`, for example `ID400800`). Poker21 rejected the same clean 6-character key with the Telegram numeric `user_app_id` (`Binding failed`). Therefore `dtId` is a required bind fallback, especially for PWA/email profiles.

## Current binding algorithm

Frontend sends the user-entered key to our backend as:

```json
{
  "ciphertext": "<Poker21 key>"
}
```

Backend then:

1. Verifies the Telegram Mini App session or PWA session.
2. Resolves the internal account ID (`dtId`).
3. Requests a Poker21 API token through `getToken`.
4. Normalizes only accidental input issues:
   - trims spaces;
   - removes whitespace inside the key;
   - removes invisible zero-width characters that can appear during copy/paste;
   - replaces Cyrillic lookalike letters with Latin equivalents;
   - preserves letter casing.
5. Calls `getBindMiniAppPlayer` with key-only payload first:

```json
{
  "ciphertext": "<Poker21 key>",
  "token": "<Poker21 API token>"
}
```

6. If the key-only request fails with a retryable Poker21 error, tries compatible key field names for the current 6-character key flow:
   - `ciphertext`
   - `cipherText`
   - `key`
   - `code`
7. Only after the key-only attempts fail, retries the same compatible key fields with optional metadata:
   - linked email variants in `mail`;
   - numeric Telegram IDs in `user_app_id`;
   - the stable app account id (`dtId`) in `user_app_id` as a final compatibility fallback.
8. On success, stores the returned Poker21 player ID in Redis and marks the app profile as Poker21 verified.

## What we changed

- Removed the requirement that key bind must have a Telegram ID before calling Poker21.
- Removed the first-request dependency on email.
- Changed the first bind attempt to omit both `mail` and `user_app_id`.
- Added compatibility attempts for 6-character keys with `cipherText`, `key`, and `code` field names.
- Extended those compatible key-field attempts to metadata fallbacks too, so a changed Poker21 payload shape like `key + user_app_id` is covered.
- Added `dtId` as a key-bind `user_app_id` fallback after Telegram candidates, because Poker21's Mini App binding can reject a valid key when the external user id does not match the id used while generating the key.
- Confirmed in production on May 9, 2026: the successful bind path for account `ID400800` used the `dtId` fallback; the key itself was clean (`length: 6`, ASCII/alphanumeric).
- Kept `ciphertext` as the documented first field.
- Stopped lowercasing or otherwise changing key letter casing.
- Added whitespace, invisible-character cleanup, and Cyrillic lookalike normalization for manual copy/paste mistakes.
- Made missing `POKERPLUS_STORAGE_SECRET` non-blocking: binding can succeed without it, but the key cannot be saved for future encrypted refresh.
- Added safe server logs for failed bind attempts. Logs include attempted field names and whether optional metadata was present, but never include the actual key.
- Server logs keep the full safe attempt matrix and include `attemptsTotal`, so the first key-only attempts are not lost when many email/Telegram fallbacks run.
- Updated user-facing errors so we do not incorrectly claim that Telegram ID/email validation failed before a first-time key bind.
- If any key-bind attempt returns `Binding failed`, the user-facing bind error prioritizes that key rejection over later email fallback errors such as `Player data not found`.

## Refresh behavior

Opening the profile does not automatically make a live Poker21 request. It reads cached Poker21 profile data first.

Pressing `Refresh` does a live refresh:

- If the profile is already linked, the UI hides the key field. Pressing `Refresh` runs the saved-binding refresh only; the user should not have to paste the Poker21 key again.
- If the profile is not linked and a key is entered before pressing `Refresh`, the backend can still run the same key-only-first flow as initial binding and save the successful binding.
- If Poker21 returns `Player data not found` for email refresh, the app explains that no player was found by profile email and asks the user to use the key.
- If Poker21 returns `Binding failed` for an already-linked refresh, the app keeps showing saved data and suggests unbinding/rebinding only if the error repeats.

## Unbind behavior

Unbind should be idempotent from the user's point of view.

If Poker21 says there is no binding information, our backend treats that as already unbound, clears local Poker21 binding/profile/cache data, and returns success to the app.

We also clear local binding data for the resolved `dtId`, so the profile stops showing stale Poker21 data after unbind.

## Status display behavior

If the Poker21 account is not linked, the app must not show a Poker21 level or progress scale.

The status block is hidden/unlinked until a real Poker21 binding exists. A user with no linked Poker21 account has no Poker21 level in our app.

## Stats behavior

Poker21 can return dated/stat period counters:

- `today_counter`
- `week_counter`
- `total_counter`

The frontend displays these groups when they are present. We removed the rule that hid negative values, so negative cash/MTT/SNG values are now visible instead of being filtered out.

Known normalized stats fields:

- `fee`
- `hands`
- `winnings`
- `mtt_winnings`
- `sng_winnings`
- `bb`
- `ofc_winnings`

## Active player rule update

The active player rule was updated to remove the balance condition.

Current wording:

```text
Активным считается тот, кто депал хотя бы раз за последние 2 недели или наиграл от 1000 комиссии за прошлую неделю.
```

## How to diagnose the next failure

If a user says "the key is correct" and the app still shows that Poker21 did not accept it:

1. Check production Vercel logs for `/api/pokerplus-bind`.
2. Look for:

```text
Poker21 bind attempts failed
```

3. The log should show safe attempt metadata:
   - `keyField`: which field name was tried;
   - `userAppId`: `present` or `omitted`;
   - `mail`: `present` or `omitted`;
   - `error`: Poker21's returned message;
   - `attemptsTotal`: total number of safe attempts made;
   - `keyMeta`: safe key diagnostics (`length`, `ascii`, `alnum`) without the actual key.

The log does not print the user's Poker21 key.

If all key-only field variants fail and Poker21 returns the same key rejection, the remaining likely causes are on the Poker21 side:

- the generated key is not active yet;
- the key expired or was already used;
- the key belongs to a different Poker21 environment/club;
- the endpoint expects a different field name or a changed payload shape;
- Poker21's API rejects the key even though the UI displays it as valid.

In that case, send Poker21 the safe attempt matrix from logs and ask which exact field/payload they expect for the current 6-character key.

## Files touched in this Poker21 work

- `lib/pokerplus.js`
  - Poker21 token request, bind, refresh, unbind, profile normalization, key normalization, retry order.
- `lib/api-handlers/pokerplus-bind.js`
  - Bind API route, user-facing errors, safe failed-attempt logging.
- `lib/api-handlers/pokerplus-player.js`
  - Profile read/refresh route and refresh error messages.
- `lib/api-handlers/pokerplus-unbind.js`
  - Unbind route and local cleanup.
- `lib/api-handlers/users.js`
  - Current-user/profile Poker21 verification and status payload.
- `app-profile-pokerplus.js`
  - Profile UI, bind/refresh/unbind buttons, stats rendering, status sync.
- `docs/pokerplus-integration-for-vendor.md`
  - Integration details for Poker21/PokerPlus API behavior.

## Important product decisions

- Key-first binding is the correct product behavior.
- First-time bind must not depend on an old local binding.
- First-time bind must not depend on Telegram ID match.
- First-time bind must not depend on email match.
- Email and Telegram ID are only fallbacks/metadata for compatibility.
- `dtId` is the final `user_app_id` fallback and can be the required id for Poker21 Mini App key binding.
- No linked Poker21 account means no Poker21 level.
- Negative Poker21 stats should be visible.
- Unbind should clear stale local data even when Poker21 says no remote binding exists.
