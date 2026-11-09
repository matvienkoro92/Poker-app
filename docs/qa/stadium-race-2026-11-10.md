# Stadium race release verification — 2026-11-10

Implemented: garage vehicle snapshot, production-car opponents and traffic, rotating wheels, analog joystick and handbrake, track-relative slip and counter-steer, finite nitro, compact instruments, chase camera with crest clearance, stadium exit arch, city traffic, hairpins and short upper routes. Facades have shared material atlases, lit windows and surface relief; street light pools use one instanced draw instead of per-lamp lights. Geometry detail and pixel ratio adapt to load.

Automated evidence:
- 48 engine, wheel, render-quality and balance tests pass.
- Chromium mobile emulation checks both orientations, simultaneous joystick/handbrake, input release, pause/mute, garage BMW and opponent detail switching.
- Full route runner checks upper route, descent and finish; screenshots are local QA output.
- Deterministic balance driver: no steering finishes fourth (36.75 s); cornering without nitro second (30.22 s); cornering with nitro first (25.35 s). These are simulation results, not human difficulty ratings.

Remaining acceptance: real iOS/Android Telegram WebView frame pacing, thermal behaviour, sound permissions and human control feel. Software-rendered Chromium timings do not establish device FPS. Inspect `sessionStorage['poker21-race:last-performance']` after a real race for frame count, average FPS, recent p95 frame time, slow frames and draw calls. This is local session diagnostics, with no account data or network telemetry.

Art direction is an original lightweight city racer; visual parity with NFS is not claimed. Vehicle motion remains relative to the authored route, not an unrestricted rigid-body simulator.

Visual follow-up: rounded, terraced and masonry building silhouettes; shared instanced roofs/cornices; two player headlamps without shadow maps; ground-contact shadows aligned with road slopes. The browser test enforces fewer than 350 draw calls at each exit/city checkpoint, not only at the effects checkpoint.

Obstacle/environment pass: shared beveled metal pieces, textured Jersey barriers, reflector boards and beacons, tread-plate ramps, irregular water/oil, compact equipment-case and cylinder pickups. Decorative manholes/patches have no hitboxes. City blocks use plausible floor proportions, background quarters, street furniture, clustered foliage and port freight. Background footprints have at least 3 m conservative clearance from sampled road edges over the full route, including hairpins. Facades and shelter glass are instanced; repeated obstacles share exact geometry identities, with view-frustum culling. Gallery raycasts verify the ramp surface against the 1.1 m / 4 m simulation profile.

Final visual checks also cover keeping the car in frame on the right lane, repeated skyline UVs, softer headlamp falloff and rim-only shield shading so protection does not obscure the road.
