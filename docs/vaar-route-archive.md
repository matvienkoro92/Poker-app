# Маршрут Вааара и архив

Маршрут длиной 13 850 единиц больше не копирует первую половину: разные ширины опор, высоты и разрывы образуют пять участков. Есть подъёмники, обрушения, посты грибной охраны, вентиляционные шахты, падающие ловушки и отключаемые электрические полосы.

Три ключа открывают архив. Они сохраняются после потери жизни. Дверь открывается за 60 тактов. Победа наступает только после входа и нажатия «Забрать дело». Дело ведёт к подписи Валеры и следующей миссии с Миссликом.

Проверки: tests/last-buy-in-vaar-route.test.js, tests/last-buy-in-shells.test.js и tests/last-buy-in-campaign.test.js. Тестовый игрок проходит все новые главы обычными кнопками. Сам маршрут Вааара занял 114 модельных секунд, без потери общей жизни, с одним оставшимся очком здоровья; это проверка проходимости, а не оценка времени реального игрока.

## Иллюстрация

Встроенный imagegen. Файл: assets/last-buy-in/vaar-archive-v1.webp. Прозрачный фасад с открытым интерьером; решётка, замки, подсветка и интерактив накладываются в canvas. Исходник сохраняется в generated_images. Оптимизация: trim, ширина 800, WebP 86.

Референсы: assets/last-buy-in/vaar-city-route-v1.webp, assets/last-buy-in/vaar-city-intro-v1.webp.

Промпт:

Use case: stylized-concept. Production game environment sprite for a side scrolling platformer in a neon tropical Poker21 city police department. Reference image 1 supplies pastel teal pink art deco architecture at sunset and polished painterly 3D game style; reference image 2 supplies mushroom police identity only, do NOT include characters. Create a standalone attractive mushroom-police ARCHIVE entrance facade, front-facing orthographic-ish SIDE SCROLLER view, completely transparent outside the facade. Wide squat Art Deco police archive booth, pastel teal and pale pink masonry, amber wall lamps, central open doorway with warm lit archive shelves visible and a brass desk with a prominent golden sealed paper dossier, mushroom police crest above doorway. Small elegant sign exact Cyrillic text АРХИВ. Ground-level flat base aligned along bottom edge, no floating floor, no background city or sky, no hero, no police characters, no HUD, no arrows, no captions. The open door must be broad and readable, actual walk-through space, not a blank closed wall. Facade proportions approximately width 5 height 4, architectural detail clean and clear at 260 pixels wide. High quality sharp game asset. Keep alpha transparent.
