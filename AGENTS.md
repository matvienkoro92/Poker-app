# Project Instructions

- Do not run `git push` unless the user explicitly asks for it in the current conversation.
- Summer rating top-3 character art sizes are controlled by inline CSS variables from
  `summerRatingTop3ArtSizeStyle()` in `app-rating-view-adapter.js`. Do not tune those
  sizes via the older hard-coded background layers in `styles-rating-late.css`.
- Determine the rating league from the recognized buy-in: League 1 starts at 500,
  otherwise use League 2. If the buy-in is missing or ambiguous, stop for confirmation
  instead of defaulting to either league.
