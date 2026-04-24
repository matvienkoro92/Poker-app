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

When we refresh a linked player profile, our backend reuses the saved:

- `user_app_id`
- `mail`, if it was available during binding

Then it calls the same PokerPlus bind endpoint again, but without `ciphertext`:

```text
POST /service_v1/getBindMiniAppPlayer
```

Refresh form-data fields:

```text
user_app_id = <numeric Telegram user ID>
mail        = <email linked to the user's account in our app, or an empty string>
token       = <token returned by getToken>
```

The returned player data is normalized and cached in our app.

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

The only integration detail that needs confirmation is whether numeric Telegram user ID is the expected value of `user_app_id`.
