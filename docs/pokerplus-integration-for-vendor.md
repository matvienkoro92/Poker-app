# PokerPlus Integration Notes

This document describes how the PokerPlus API integration is implemented on our side.

## Overview

The PokerPlus API is called from our backend, not directly from the browser or Telegram Mini App frontend.

The user enters only the PokerPlus secret key (`ciphertext`) in our app profile. Our server then:

1. Verifies the user session.
2. Resolves the internal account.
3. Reads the email linked to that account, if available.
4. Requests a PokerPlus API token.
5. Calls the PokerPlus bind endpoint with `user_app_id`, `ciphertext`, `mail`, and `token`.

## Relevant Files

- `lib/pokerplus.js` - PokerPlus API client and request formatting.
- `lib/api-handlers/pokerplus-bind.js` - Backend handler for binding a PokerPlus account.
- `lib/api-handlers/pokerplus-unbind.js` - Backend handler for unbinding.
- `lib/api-handlers/pokerplus-player.js` - Backend handler for reading/refreshing linked player info.
- `lib/api-handlers/pokerplus-tables.js` - Backend handler for currently playing tables.
- `lib/api-handlers/pokerplus-competitions.js` - Backend handler for upcoming competitions.
- `lib/api-handlers/pokerplus-maintenance.js` - Backend handler for game maintenance status.
- `app.js` - Frontend profile UI that sends the user-entered key to our backend.

## Current Production Behavior

The current implementation has these important details:

- `user_app_id` is the user's numeric Telegram user ID, for example `388008256`.
- `mail` is sent with the same letter casing that the user linked in our app. We keep a lowercase canonical email only for our own uniqueness checks, but PokerPlus receives the original linked email string.
- `mail` is optional for the initial key-based bind on our side. If the user has no linked email in our app, bind still calls PokerPlus and sends `mail` as an empty string.
- The initial bind request includes `ciphertext`.
- The profile refresh request is email-based: it calls the same PokerPlus endpoint without `ciphertext`, but only when the user has a linked email in our app.
- During refresh, if PokerPlus returns `Player data not found`, our backend retries common email case variants such as lowercase, first-letter uppercase, title-cased local part, and uppercase local part.
- During refresh for older local bindings, if the saved PokerPlus Telegram value is missing, our backend uses the current Telegram session's numeric user ID as a fallback and saves it after a successful refresh.
- Refresh can also create the local linked profile if PokerPlus returns player data and no local link was saved yet.
- If the user has no linked email, refresh does not call PokerPlus. The user should bind with the PokerPlus key instead.
- On normal profile opening, the frontend asks our backend for cached PokerPlus data only. A live PokerPlus refresh is made only when the user presses `Refresh`.
- PokerPlus requests are sent from our backend only. The frontend never calls `sp.poker21pro.com` directly.

## Configuration

The backend reads the following environment variables:

- `POKERPLUS_BASE_URL`
  - Optional.
  - Defaults to `https://sp.poker21pro.com/service_v1`.
- `POKERPLUS_MERCHANT_ID`
  - Used as `merchantId` in `getToken`.
- `POKERPLUS_SECRET_KEY`
  - Used as `secretKey` in `getToken`.
- `POKERPLUS_STORAGE_SECRET`
  - Used only on our side to encrypt the stored PokerPlus key.

No PokerPlus secret values are exposed to the frontend.

## Token Request

Before calling protected PokerPlus endpoints, our backend requests a token.

PokerPlus endpoint:

```text
POST https://sp.poker21pro.com/service_v1/getToken
Content-Type: form-data
```

Form-data fields:

```text
merchantId = <POKERPLUS_MERCHANT_ID>
secretKey  = <POKERPLUS_SECRET_KEY>
```

Expected response shape:

```json
{
  "status": 1,
  "message": "success",
  "data": {
    "token": "<token>"
  },
  "code": 0
}
```

The token is cached on our side for 28,740 seconds, slightly below the documented 8-hour lifetime.

## Bind Flow

Frontend request to our backend:

```text
POST https://poker-app-ebon.vercel.app/api/pokerplus-bind
Content-Type: application/json
```

Frontend sends:

```json
{
  "ciphertext": "<secret key copied from PokerPlus>",
  "initData": "<Telegram Mini App initData>"
}
```

or, in PWA mode:

```json
{
  "ciphertext": "<secret key copied from PokerPlus>",
  "pwaSession": "<signed PWA session>"
}
```

Our backend then resolves:

- `ciphertext` from the frontend request.
- `mail` from the email linked to the user's account in our app, if available. The original letter casing is preserved for PokerPlus.
- `user_app_id` from the user's numeric Telegram user ID.
- `token` from the PokerPlus `getToken` endpoint.

Current `user_app_id` format:

```text
telegram_user_id
```

Example outbound request from our backend to PokerPlus:

```text
POST https://sp.poker21pro.com/service_v1/getBindMiniAppPlayer
Content-Type: form-data
```

Form-data fields:

```text
user_app_id = <numeric Telegram user ID>
ciphertext  = <secret key copied from PokerPlus>
mail        = <email linked to the user's account in our app, preserving letter casing, or an empty string>
token       = <token returned by getToken>
```

Example payload shape:

```json
{
  "user_app_id": "388008256",
  "ciphertext": "0K0GQ7E6D925UVGWV0805DK3H1R",
  "mail": "User@example.com",
  "token": "<token from getToken>"
}
```

If the user has no linked email in our app, the same request is sent with an empty `mail` value:

```json
{
  "user_app_id": "388008256",
  "ciphertext": "0K0GQ7E6D925UVGWV0805DK3H1R",
  "mail": "",
  "token": "<token from getToken>"
}
```

## Important Note About `user_app_id`

The current implementation sends the numeric Telegram user ID:

```text
388008256
```

Please confirm whether this is the expected value for:

```text
user_app_id - Unique user ID in the third-party app
```

If PokerPlus expects a different stable internal application ID, we can send one of these values instead:

- Our internal account ID, for example `ID123456`.
- Another agreed stable identifier.

## Unbind Flow

PokerPlus endpoint:

```text
POST https://sp.poker21pro.com/service_v1/unBindMiniAppId
Content-Type: form-data
```

Form-data fields:

```text
user_app_id = <numeric Telegram user ID>
token       = <token returned by getToken>
```

## Player Refresh Flow

When we refresh a linked player profile, our backend uses:

- `user_app_id`
- `mail`, from the email linked in our app, preserving the user's original letter casing

Then it calls the same PokerPlus bind endpoint again, but without `ciphertext`:

```text
POST /service_v1/getBindMiniAppPlayer
```

Refresh form-data fields:

```text
user_app_id = <numeric Telegram user ID>
mail        = <email linked to the user's account in our app, preserving letter casing>
token       = <token returned by getToken>
```

Refresh example payload:

```json
{
  "user_app_id": "388008256",
  "mail": "User@example.com",
  "token": "<token from getToken>"
}
```

The returned player data is normalized and cached in our app.

If our app has no local linked PokerPlus profile yet, a refresh request still calls PokerPlus by numeric Telegram user ID and linked email. If PokerPlus returns a successful player response, we save the returned player ID locally and mark the profile as linked.

For older local bindings, the saved PokerPlus player ID can exist while the saved Telegram value is still empty. In that case, refresh uses the numeric Telegram ID from the current verified Telegram session as a fallback `user_app_id`. After a successful refresh, this value is saved locally and future refreshes can use it directly.

If the user has no linked email in our app, refresh returns an error and does not call PokerPlus. In that case the user can use the key-based bind flow instead.

If PokerPlus returns `Player data not found` during refresh, our backend returns a user-facing message explaining that no PokerPlus account was found for the linked email and that the user can bind with the PokerPlus key instead.

Note: email matching may be case-sensitive on the PokerPlus side. Because of that, our backend does not lowercase `mail` before sending it to PokerPlus, and refresh retries several common case variants when PokerPlus responds with `Player data not found`. A fully case-insensitive match still needs to be supported by PokerPlus, because only PokerPlus can compare against every stored email casing.

## Displayed Player Data

When PokerPlus returns a successful response, we already normalize and display the returned player data in the app profile.

Example PokerPlus response:

```json
{
  "status": 1,
  "message": "success",
  "data": {
    "Id": "907778",
    "Nike": "smjl123456",
    "HeadImageUrl": "http://sp.poker21pro.com/upload/player_headimg/202509/1757587642559.jpg",
    "league_id": "184691",
    "group_id": "758417",
    "RegisterDate": "1776863698",
    "position": "0",
    "total_counter": [],
    "gold": "0.0000",
    "LastLoginDate": "",
    "LastLoginIp": "",
    "Country": "",
    "Role": "Member"
  },
  "code": 0
}
```

Normalized fields used by our app:

- `data.Id` -> `pokerPlusUserId`
- `data.Nike` -> `nickname`
- `data.HeadImageUrl` -> `avatarUrl`
- `data.league_id` -> `leagueId`
- `data.group_id` -> `groupId`
- `data.RegisterDate` -> `registerDate`
- `data.position` -> `position`
- `data.gold` -> `balance`
- `data.LastLoginDate` -> `lastLoginDate`
- `data.LastLoginIp` -> `lastLoginIp`
- `data.Country` -> `country`
- `data.Role` -> `role`
- `data.total_counter` -> statistics, if it is an object

Currently visible in the profile UI:

- linked PokerPlus player: nickname and player ID;
- avatar;
- balance;
- registration date;
- position;
- country, if present;
- role;
- last login date, if present;
- last login IP, if present;
- statistics, when `total_counter` contains an object with values.

`leagueId` and `groupId` are stored by the backend, but they are currently hidden in the profile UI.

If `total_counter` is an empty array, we treat it as no statistics available and do not show a stats row. This does not break the profile display.

PokerPlus profile values are not filtered by day on our side. We display the aggregate/current values returned by PokerPlus. The current refresh request does not send `date_from`, `date_to`, `day`, or other period filters.

## Playing Tables Flow

Our backend can request currently playing tables from PokerPlus.

PokerPlus endpoint:

```text
POST https://sp.poker21pro.com/service_v1/getPlayingTables
Content-Type: form-data
```

Form-data fields:

```text
token = <token returned by getToken>
```

Our public backend endpoint:

```text
GET https://poker-app-ebon.vercel.app/api/pokerplus-tables
```

Normalized table fields:

```json
{
  "playerCount": 0,
  "deskId": "",
  "deskName": "",
  "unionId": "",
  "leagueId": "",
  "groupId": "",
  "playType": "",
  "blindAnnotation": "",
  "entryFees": null
}
```

The frontend does not currently display this list in the profile UI.

## Upcoming Competitions Flow

Our backend can request upcoming competitions from PokerPlus.

PokerPlus endpoint:

```text
POST https://sp.poker21pro.com/service_v1/getTheUpcomingCompetitions
Content-Type: form-data
```

Form-data fields:

```text
token = <token returned by getToken>
```

Our public backend endpoint:

```text
GET https://poker-app-ebon.vercel.app/api/pokerplus-competitions
```

Normalized competition fields:

```json
{
  "competitionId": "",
  "competitionName": "",
  "unionId": "",
  "leagueId": "",
  "groupId": "",
  "playType": "",
  "startTime": null,
  "endTime": null
}
```

The frontend does not currently display this list in the profile UI.

## Maintenance Status Flow

Our backend can request game maintenance status from PokerPlus.

PokerPlus endpoint:

```text
POST https://sp.poker21pro.com/service_v1/getGameMaintainStatus
Content-Type: form-data
```

Form-data fields:

```text
token = <token returned by getToken>
```

Our public backend endpoint:

```text
GET https://poker-app-ebon.vercel.app/api/pokerplus-maintenance
```

Normalized maintenance fields:

```json
{
  "maintainStatus": -1,
  "startTime": "",
  "endTime": "",
  "content": "",
  "title": ""
}
```

The frontend does not currently display this status in the profile UI.

## PWA Profile Loading Notes

The normal PWA profile screen also shows non-PokerPlus data such as email, Telegram username, respect score, display name, internal account ID, and Poker21 ID.

Recent frontend behavior:

- The profile screen shares one `/api/users` request through a short in-memory cache instead of firing several duplicate profile requests at once.
- Linked email and linked Telegram username are read from `/api/users`, then cached locally for faster subsequent profile openings.
- The respect score shows the last locally cached value immediately and updates quietly from `/api/respect`.
- These local profile caches are cleared when the user logs out.
- PokerPlus live refresh is not part of the initial PWA profile load unless the user presses `Refresh`.

## Error Handling

Our backend treats responses with:

```json
{ "status": 1 }
```

as successful.

If the response has another status, or the HTTP request fails, our backend returns an error to the frontend.

If the token appears to be expired or invalid, our backend requests a fresh token and retries the PokerPlus request once.

## Current Implementation Summary

Our integration matches the PokerPlus API documentation in:

- URL paths.
- HTTP method: `POST`.
- Request body type: `form-data`.
- Token flow via `getToken`.
- Bind fields: `user_app_id`, `ciphertext`, `mail`, `token`.
- Unbind fields: `user_app_id`, `token`.
- Refresh fields: `user_app_id`, `mail`, `token` without `ciphertext`.
- Tables endpoint: `getPlayingTables`.
- Competitions endpoint: `getTheUpcomingCompetitions`.
- Maintenance endpoint: `getGameMaintainStatus`.

The only integration detail that needs confirmation is whether numeric Telegram user ID is the expected value of `user_app_id`.
