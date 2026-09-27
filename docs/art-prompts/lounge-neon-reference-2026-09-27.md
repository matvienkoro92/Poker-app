# Neon lounge buttons

Based on the user-supplied `ChatGPT Image 27 сент. 2026 г., 08_00_43.png`.
Imagegen edit preserves the three characters, blue/red/gold neon frames and
icons; removes baked names, action titles, amounts and the fixed raffle count.
`assets/home-lounge-neon-reference-v1.webp` is the resulting 1836×857 image,
WebP quality 93, no upscaling, 406110 bytes.

The shared background aligns with three equal clickable columns. Names, action
labels, active raffle count and reward amounts remain HTML. Existing Telegram,
raffle and hall-of-fame handlers are retained. Checked at widths 390 and 1000;
players modal and raffle navigation work. Preview uses fixture count 3 and
amount 27k; those values are not hard-coded into the application.

## Original figures and isolated buttons

The original three figure assets are restored. Amount subtitles are hidden;
names and live raffle count remain. `home-lounge-neon-buttons-v1.webp` contains
three complete neon plaques extracted via imagegen from the reference, with
real RGBA transparency verified in the PNG and preserved in WebP. Native sprite
size 2172×724, quality 94 / alpha quality 100, 177206 bytes. Each plaque includes
its full outline and feet; no scene crop or floor strip is used. Rendered as
three equal background cells behind the live button titles. Checked at 390px
and 1000px with working raffle navigation and players modal.
