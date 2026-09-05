# Project Instructions

- Do not run `git push` unless the user explicitly asks for it in the current conversation.
- Summer rating top-3 character art sizes are controlled by inline CSS variables from
  `summerRatingTop3ArtSizeStyle()` in `app-rating-view-adapter.js`. Do not tune those
  sizes via the older hard-coded background layers in `styles-rating-late.css`.
- Determine the rating league from the recognized buy-in: League 1 starts at 500,
  otherwise use League 2. If the buy-in is missing or ambiguous, stop for confirmation
  instead of defaulting to either league.
- Rating screenshot workflow (target: about two minutes for a routine batch, excluding deployment):
  run one `rating:daily -- --dry-run` for the exact new files, using system OCR permission
  when needed. Inspect the screenshots together and compare every positive row, amount,
  place, date and buy-in with the draft. Correct parser/dictionary issues using the existing
  OCR cache; do not use `--refresh-ocr` unless the OCR tokens themselves are wrong.
  Then run `rating:daily` once for those files: it already runs data validation, syntax
  checks and the full build. Do not repeat those commands after a successful import unless
  subsequent edits require it. Verify the generated news date/count and summer exclusion
  for September, then commit/push when authorized. Report actual timings; do not promise
  a fixed completion time for ambiguous screenshots or deployment.
