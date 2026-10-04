# Frankl / Morf — Порт под замком

Глава 6 заменяет подводную миссию. Эмиль зовёт Frankl за картой доступа на три портовых склада. На каждом складе нужно уничтожить замки и охрану, затем забрать часть карты у выхода. Три разных раскладки, более быстрая охрана, цепные взрывы, усиления радиуса и вместимости бомб. Прогресс сохраняется после потери жизни.

Графика: `bomber-kit-*-v1.webp`, `frank-bomber-v1.webp`, `frank-bomber-preview-v1.webp` в `assets/last-buy-in`.

## Atlas prompt

Use case: stylized-concept. Game asset atlas for a Bomberman-style mission in a Kaliningrad harbor warehouse. Strict 4 columns x 2 rows grid, 2048x1024, each 512x512 cell, transparent background for objects. Eight assets in exact row-major order: 1 seamless square dark teal cobblestone harbor floor tile fully filling cell; 2 solid steel/stone square obstacle pillar topdown slight 3/4 perspective; 3 wooden shipping crate brass corners topdown slight perspective; 4 round black gold POKER21 chip bomb lit orange fuse full isolated; 5 hostile navy uniform security robot full body seen from elevated view; 6 exact Emil monkey from reference in black gold Poker21 hoodie backwards cap, full body elevated view; 7 golden security card fragment glowing cyan chip isolated; 8 heavy port warehouse exit hatch with green light topdown. Consistent elevated overhead camera for all objects, clear bold shapes readable at 35px, sharp polished cartoon 3D videogame graphics, no tiny clutter. Objects centered inside individual cells with at least40px transparent padding, nothing touching cell boundaries except floor. No captions, cell dividers or background scene.

Первоначальная ячейка Эмиля не используется: главный герой заменён отдельным спрайтом Frankl по уточнению пользователя.

## Frankl sprite prompt

Use case: identity-preserve. Create transparent full-body mobile game sprite of Frankl aka Morf from reference: dark spiky hair chimp, black/orange futuristic tracksuit, amber cyber sunglasses with concentric orange lens, black orange sneakers, tail. Same face and identity. Bomberman-style elevated overhead 3/4 camera, compact readable proportions with LARGE head, short legs, complete feet. Holds a small black/gold poker chip bomb with orange fuse, ready pose. No disappearing polygon effect, entire body fully solid. Polished 3D cartoon game art, crisp clear silhouette, no background, no shadow, no text, centered with transparent padding.

## Preview prompt

Use case: illustration-story. Portrait 1024x1536 cinematic mobile videogame chapter preview. Hero Frankl aka Morf exact character from reference, dark spiky hair chimp black orange futuristic tracksuit amber cyber sunglasses circular lens, solid full body, holds black gold poker chip bomb orange fuse. He sneaks into a Kaliningrad port warehouse with shipping crates and steel pillars forming Bomberman maze; one controlled cross-shaped explosion lights a crate corridor behind him and armored navy security robots are approaching farther back. A gold cyan access card fragment lies beside an open green-lit warehouse hatch. Window high background shows Kaliningrad brick cathedral and river cranes dusk. Large clear hero and objects, polished sharp 3D cartoon game art, uncluttered mobile composition, bottom25% quieter dark floor for live caption. No lettering or UI. Motivated careful confident hero, no random destruction outside warehouse.
