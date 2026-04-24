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
- `app.js` - Frontend profile UI that sends the user-entered key to our backend.

## Current Production Behavior

The current implementation has these important details:

- `user_app_id` is the user's numeric Telegram user ID, for example `388008256`.
- `mail` is optional for the initial key-based bind on our side. If the user has no linked email in our app, bind still calls PokerPlus and sends `mail` as an empty string.
- The initial bind request includes `ciphertext`.
- The profile refresh request is email-based: it calls the same PokerPlus endpoint without `ciphertext`, but only when the user has a linked email in our app.
- Refresh can also create the local linked profile if PokerPlus returns player data and no local link was saved yet.
- If the user has no linked email, refresh does not call PokerPlus. The user should bind with the PokerPlus key instead.
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
- `mail` from the email linked to the user's account in our app, if available.
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
mail        = <email linked to the user's account in our app, or an empty string>
token       = <token returned by getToken>
```

Example payload shape:

```json
{
  "user_app_id": "388008256",
  "ciphertext": "0K0GQ7E6D925UVGWV0805DK3H1R",
  "mail": "user@example.com",
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
- `mail`, from the email linked in our app

Then it calls the same PokerPlus bind endpoint again, but without `ciphertext`:

```text
POST /service_v1/getBindMiniAppPlayer
```

Refresh form-data fields:

```text
user_app_id = <numeric Telegram user ID>
mail        = <email linked to the user's account in our app>
token       = <token returned by getToken>
```

Refresh example payload:

```json
{
  "user_app_id": "388008256",
  "mail": "user@example.com",
  "token": "<token from getToken>"
}
```

The returned player data is normalized and cached in our app.

If our app has no local linked PokerPlus profile yet, a refresh request still calls PokerPlus by numeric Telegram user ID and linked email. If PokerPlus returns a successful player response, we save the returned player ID locally and mark the profile as linked.

If the user has no linked email in our app, refresh returns an error and does not call PokerPlus. In that case the user can use the key-based bind flow instead.

If PokerPlus returns `Player data not found` during refresh, our backend returns a user-facing message explaining that no PokerPlus account was found for the linked email and that the user can bind with the PokerPlus key instead.

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
- balance;
- role;
- statistics, when `total_counter` contains an object with values.

If `total_counter` is an empty array, we treat it as no statistics available and do not show a stats row. This does not break the profile display.

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

The only integration detail that needs confirmation is whether numeric Telegram user ID is the expected value of `user_app_id`.
