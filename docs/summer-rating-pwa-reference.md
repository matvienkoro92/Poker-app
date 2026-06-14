# Summer Rating PWA Reference

This file records the approved PWA reference layout for the Summer Rating podium.
This is the canonical reference ("эталон") for PWA element placement relative to the background.
Use it as the baseline before changing `styles-rating-late.css`.
If a future change moves any Summer Rating PWA element, compare it against this эталон first.

Reference screenshot from user: `Снимок экрана 2026-06-15 в 06.41.34.png`.

## Scope

The reference applies to the narrow desktop PWA layout:

```css
@media (max-width: 700px) and (hover: hover) and (pointer: fine),
  (min-width: 701px) and (max-width: 1100px) and (min-aspect-ratio: 4 / 5) and (hover: hover) and (pointer: fine)
```

Do not use the regular mobile layout as the source of truth for this PWA case.

## Top 3 Players

League 1 top3 character backgrounds:

```css
Waaar:      50% calc(26% + 28px) / 31% auto
Pokermanki: calc(11% - 3px) calc(44% + 35px) / 37% auto
Cooler91:   calc(89% - 9px) calc(50% + 35px) / 24% auto
```

League 2 top3 character backgrounds:

```css
Alena:     50% calc(26% + 28px) / 18.9% auto
Shkarubo:  calc(11% - 3px) calc(44% + 35px) / 30.1% auto
Sarmat:    calc(89% - 12px) calc(50% + 35px) / 21.7% auto
```

Top3 card anchors:

```css
Place 2 card: bottom 28px
Place 1 card: bottom 40px
Place 3 card: bottom 28px
```

Top3 medal/rank anchors:

```css
Place 2 rank: top 18px
Place 1 rank: top 2px
Place 3 rank: top 18px
```

Top3 nickname anchors:

```css
Place 2 nick: top 49px
Place 1 nick: top 39px
Place 3 nick: top 49px
```

## Top 4-10 Lower Podium

Lower podium wrapper variables:

```css
--summer-rating-mobile-lower-podium-height: 164px;
--summer-rating-mobile-lower-podium-table-gap: 7px;
--summer-rating-mobile-lower-podium-players-y: -69px;
--summer-rating-mobile-lower-podium-label-y: 116px;
--summer-rating-mobile-lower-podium-hitbox-y: 54px;
--summer-rating-mobile-lower-podium-hitbox-height: 98px;
```

League 1 top4-10 character backgrounds before the shared `translateY(-69px)`:

```css
Em13!!:      0.5% calc(78% + 3px) / 14.9% auto
WiNifly:     16.8% calc(78% + 3px) / 14.6% auto
MissClick:   calc(33.7% + 4px) calc(78% + 7px) / 14.3% auto
nikola233:   50.7% calc(77% + 4px) / 14.8% auto
MilkyWay77:  67.5% calc(76% + 4px) / 15.1% auto
Prushnik:    84% calc(79% + 3px) / 14.1% auto
хер вам))))): 100% calc(77% + 4px) / 14.4% auto
```

League 2 top4-10 character backgrounds before the shared `translateY(-69px)`:

```css
Prushnik:   0.5% calc(78% + 3px) / 14.1% auto
Viktor:     16.8% calc(78% + 3px) / 14.5% auto
WiNifly:    calc(33.7% + 4px) calc(78% + 7px) / 14.6% auto
Mr Fox:     50.7% calc(78% + 3px) / 13.8% auto
Babyshark:  67.5% calc(78% + 3px) / 15.4% auto
Aspirin:    84% calc(78% + 3px) / 14.6% auto
Ksyukha:    100% calc(78% + 3px) / 13.8% auto
```

Lower podium nickname label anchors:

```css
Label top: 116px
Place 4:  left 0;      transform translateX(-3px); width 14.285%
Place 5:  left 14.285%;                           width 14.285%
Place 6:  left 28.57%; transform translateX(4px);  width 14.285%
Place 7:  left 42.855%; transform translateX(7px); width 14.285%
Place 8:  left 57.14%; transform translateX(7px);  width 14.285%
Place 9:  left 71.425%; transform translateX(7px); width 14.285%
Place 10: left 85.71%; transform translateX(7px);  width 14.285%
```

## Table

The table starts after the lower podium with:

```css
margin-bottom: var(--summer-rating-mobile-lower-podium-table-gap); /* 7px */
```

This 7px gap is part of the approved PWA reference.
