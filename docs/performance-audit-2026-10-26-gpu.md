# GPU audit, 26 October 2026

The reported Windows screenshot shows system GPU utilization, not CPU utilization. Browser traces establish unnecessary rendering, but do not measure that laptop's temperature or predict its GPU percentage.

## Fixed

- Earlier home fix: stop the daily hand CTA's permanent glow/sweep and release animations/backdrop layers of hidden section loaders. Steady home baseline was 180 compositor DrawFrame events in 3 seconds; after the fix there were zero.
- Earlier tournament menu fix: stop share icon and character-specific decorative aura loops.
- Garage workshop: replace perpetual WebGL rendering/automatic rotation with drawing on changes. Pointer/keyboard rotation, zoom, equipment, lighting, resizing and visibility return request frames. Closing/removing the viewer disposes its resources and WebGL context. Offscreen views can redraw when intersecting again. Saved car snapshots remain explicitly rendered.
- 3D city: render active play at up to 30 fps independently of monitor refresh; stop continuous rendering during intro/pause and while hidden. Resume/input/resize request frames. Simulation retains its fixed timestep.
- Cooler flight and Monkey race: park canvas rendering on intro, pause, completed result and leaderboard; retain countdown, gameplay, spectator movement and finite effects. Panel changes and image completion wake the canvas. Prevent duplicate RAF scheduling when a frame itself changes a panel.
- Raffle CTA glows/sweeps run once instead of forever. Loading indicators remain functional.

## Browser measurements

Local real frontend assets with mocked APIs; no actual messages, wagers or balances were changed. Desktop viewport 1366×768 and mobile 390×844. Full app tracing waits 3.5 seconds after navigation, then samples 1.5 seconds.

| Screen at rest | Compositor DrawFrame events |
| --- | ---: |
| Home, profile, daily poker, raffles, schedule, hall of fame, summer rating | 0 each |
| Cooler flight intro, Monkey race intro, home after returning from games | 0 each |
| Tournament/menu screen | 1 |

Villa room fixture (lounge, garage, billiards, living room): no DrawFrame, Paint or UpdateLayoutTree events in each two-second idle sample; no infinite CSS animations.

Actual WebGL draw-call instrumentation: garage car makes no calls after settling, turning, zooming, changing equipment, mobile resize, hiding or closing. City intro, pause and hidden states make no calls after settling; movement and resume still draw.

Chess and network board game samples throttle CPU 4× and sample two seconds:

| State | DrawFrame | RAF callbacks | Main-thread task time |
| --- | ---: | ---: | ---: |
| Chess waiting for human / after computer reply | 2 / 2 | 0 / 0 | 11 / 8 ms |
| Chess hidden | 0 | 0 | 1 ms |
| Online chess player / spectator | 1 / 4 | 0 / 0 | 14 / 12 ms |
| Online short nards player / spectator | 1 / 4 | 0 / 0 | 14 / 10 ms |
| Online long nards player / spectator | 1 / 4 | 0 / 0 | 17 / 12 ms |

The remaining network frames update clocks/presence, rather than a continuous animation.

Short/long nards training at 4× CPU slowdown: idle and settled states have zero RAF callbacks, animations and DOM mutations; 0.46–2.87 ms main-thread task time in 1.4–1.8 seconds. Dice effects settle. Billiards hardware browser test: idle zero GPU draws/mutations, sound context suspended; moving balls capped at 30 fps; aiming, computer and network shots work.

## Regression checks

- `tests/app-idle-graphics-browser.cjs`: full app navigation, idle compositor activity, finite hover, hidden/visible loaders.
- `tests/villa-idle-graphics-browser.cjs`: real WebGL calls, garage controls/equipment/lifecycle, city movement/pause/background, desktop/mobile.
- `tests/chess-performance-browser.cjs`: computer reply, hidden chess, network players/spectators in chess and both nards modes.
- `tests/arcade-idle-browser.cjs`: both intros, start, pause, resume and exit.
- `tests/billiards-performance-browser.cjs`, `tests/nards-performance-browser.cjs` passed.
- `tests/cooler-flight-scroll-browser.cjs` passed at 320×568, 360×740, 390×844.
- Scheduler, scene resource disposal, city simulation, flight/race engine/service checks: 49 tests passed.
- CSS syntax: 108 files, zero warnings; changed JavaScript syntax and diff whitespace checks pass.

An additional existing `tests/city-garage-handoff.test.js` check fails because it expects synchronous booleans from the already-async `pokerLaunchCityFromVilla`, and its VM lacks a dynamic import callback. Both that test and `app-city-launch.js` are unchanged from HEAD; this is independent of the rendering changes.

Real-device thermal/GPU measurements after reopening the published mini-app are still needed to quantify the user's laptop improvement. Continuous active 3D gameplay still performs graphics work.
