# Project Instructions

- Do not run `git push` unless the user explicitly asks for it in the current conversation.
- Summer rating top-3 character art sizes are controlled by inline CSS variables from
  `summerRatingTop3ArtSizeStyle()` in `app-rating-view-adapter.js`. Do not tune those
  sizes via the older hard-coded background layers in `styles-rating-late.css`.
- Treat all new rating results provided by the user as League 2 results, including
  cases where the buy-in is missing or ambiguous, unless the user explicitly says otherwise.
