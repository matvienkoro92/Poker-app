# Burbenog TD 2.43: browser adaptation

The added mission has stable chapter ID 14 and appears immediately before the
existing Valera finale (ID 11). It replaces the earlier twelve-wave prototype.
It is a local single-player commander mode for four sectors, not network co-op.

## Reference and regeneration

Reference: https://www.epicwar.com/maps/344560/

Map: `output/burbenog-reference/BurbenogTDv2.43Legends.w3x`

SHA-256: `e0caef6f4b3d09005b5a07ccc603a8fb3b22b7f805266a13c2a9f7ea778f661a`.

`python3 scripts/burbenog/read-map.py` extracts the known MPQ entries, including
ordinary MPQ-encrypted sectors. It checks the reference hash and does not execute
map scripts. `python3 scripts/burbenog/extract.py` regenerates
`app-last-buy-in-td-data.js` from those entries and baseline tables in
`output/burbenog-reference/base/`.

Baseline tables are from `sumneko/w3x2lni`, `data/enUS-1.27.1/`: Custom unit,
ability and upgrade INIs, and Unit/Ability/UpgradeMetaData SLKs. This baseline is
**not a verified exact match to the map's advertised Warcraft 1.23a runtime**.
Source map overrides take precedence. Runtime data contains numbers and object
names, rather than the original map's long prose, changelogs or help text.

## Transferred source data and rules

- Fifteen governors, their primary and three secondary builder choices.
- Fifteen builder lists: 120 towers and 15 technology buildings.
- Costs, build times, attack dice/cooldowns/ranges/targets, armor, prerequisites,
  ability parameters, hero training choices and research parameters.
- All 42 wave definitions: source unit, original HP/speed/bounty, count per corner.
- Original ordered ground route regions (`M4`) and separate air regions (`S4`).
  Their centers become movement waypoints. Build locations come from `war3map.wpm`.
- Thirty starting gold per sector; per-kill bounty, shared bounty option, round
  bonus starting at 12 and increasing by 2; one lumber every five waves.
- Secondary builders cost lumber; technology buildings and hybrid requirements
  gate the advanced towers; gold mines yield twice the wave number at round end.
- Sale of completed buildings returns 50%; cancelled construction returns its cost.
- Easy has 50 shared lives and 40 waves; normal has 25 and hard has 1, with the
  damage-test and tester stages enabled in those latter two modes. Blitz doubles
  wave counts.
- Ground/air target restrictions, armor multipliers, splash, basic frost/poison,
  detection and Magic Sentry research. Several spell/aura/trigger effects are
  represented, including the documented Death Curse and Disruption formulas.

## Browser-specific behavior and remaining parity gaps

This is **not a complete 1:1 Warcraft simulation**. Do not describe it as one.

- One person controls all four sectors. Networking, four remote clients, lobby
  voting, disconnect redistribution, chat commands and Warcraft replays are absent.
- Graphics are canvas drawings. Region-center movement, fixed build pads, enemy
  spacing, projectiles and collision differ from Warcraft pathfinding/physics.
- Hero movement, leveling, mana and spell execution are simplified. Not every
  native spell, aura, triggered interaction, inventory/item or summon is faithfully
  simulated. Some active effects resolve immediately instead of channeling.
- Siege attacks, repair cost, damage-test duration and final tester spawning are
  approximations, not source-verified parity implementations.
- Campaign retries restore the most recent between-wave checkpoint and restore
  base lives, unlike a fresh Warcraft lobby. Save data is local to the device.
- Whole-game balance has not been demonstrated with a legitimate complete
  playthrough. The first wave has a verified winning strategy using only starting
  resources. Terminal-stage tests exercise transitions, not balance.

## Validation

`node --test tests/last-buy-in-td.test.js` checks extracted known values, route
structure, economy, restrictions, first-wave combat, defeat, save restoration,
research timing and terminal-stage transitions. Browser checks cover construction,
sector switching, help and wave start at 390×844, 375×667 and 844×390. These do not
establish complete behavioral equivalence to Warcraft III.
