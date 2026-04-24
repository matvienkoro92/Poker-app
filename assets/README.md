# Assets

Static images, audio, screenshots, and UI media live here.

## Common Asset Groups

- Rating screenshots: files named like `rating-DD-MM-YYYY.png` and optional numbered variants (`-2`, `-3`, etc.).
- Download/tutorial images: screenshots used by the download instructions.
- Gazette and article images: images referenced by the newspaper UI.
- Profile/game media: images and sounds used by profile, games, hall of fame, and seasonal sections.

## Conventions

- Prefer descriptive lowercase filenames with hyphens.
- Keep files referenced by `index.html`, `app.js`, or `styles.css` in this folder unless the code explicitly expects another path.
- After adding or replacing assets, run `npm run build` so the files are copied to `public/assets`.
- Avoid storing temporary screenshots here unless they are used by the app.
