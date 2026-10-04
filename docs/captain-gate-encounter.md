# Колл: перекрытый выезд

После 90 препятствий движение дороги останавливается. За 90 кадров усиленный шлагбаум закрывает выезд за Манки. Колл объясняет свою мотивацию в шести репликах, которые игрок листает кнопкой «Далее». Физика и таймеры атак стоят до последней реплики.

В бою остаются смена дорожек, прыжок и пригибание. Колл отмечает дорожку и таранит: если Манки успел уйти, передний край тарана достигает координаты шлагбаума x=52. В этом месте показываются искры, деформация балки и разбитая машина; Колл теряет одну из шести пластин брони. Остальные атаки сохранены.

Ассет: `assets/monkey-race/captain-gate-v1.webp`, настоящий прозрачный фон. Стойка и балка вырезаются отдельно при рисовании, балка вращается вокруг шарнира. Сгенерировано встроенным imagegen, преобразовано в WebP через sharp.

Промпт: «Use case: stylized-concept. Asset type: isolated side-view game sprite, transparent background. Create a high quality reinforced police road barrier gate for a bright tropical coastal arcade game. One heavy dark steel vertical rectangular gate motor pedestal at LEFT, firmly bolted onto broad concrete base, small amber warning beacon on top. A long thick RED AND WHITE striped horizontal rectangular steel boom extends RIGHT from the pivot at the upper third of the pedestal. Strong metal boom, visible bolts and slight three-dimensional depth, reinforced bumper end. Entire object visible, facing directly SIDE ON (orthographic), no perspective foreshortening. Transparent background, no ground scenery, no lettering, no characters, no cars. Polished colorful stylized 3D game art. Horizontal boom must be visually clear as a physical solid obstacle that a ram can crash into. The image will be split into the left pedestal and boom to animate rotation.»

Проверки: `tests/monkey-race-campaign.test.js`, `tests/monkey-race-gate-ui.cjs`.
