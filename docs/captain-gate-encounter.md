# Колл: перекрытый выезд

После 90 препятствий движение дороги останавливается. За 90 кадров усиленный шлагбаум закрывает выезд за Манки. Колл объясняет свою мотивацию в пяти репликах, которые игрок листает кнопкой «Далее». Физика и таймеры атак стоят до последней реплики.

В бою остаются смена дорожек, прыжок и пригибание. Колл отмечает дорожку и таранит: если Манки успел уйти, передний край тарана достигает координаты шлагбаума x=52. В этом месте показываются искры, деформация балки и разбитая машина; Колл теряет одну из шести пластин брони. Остальные атаки сохранены.

Ассет: `assets/monkey-race/captain-gate-v1.webp`, настоящий прозрачный фон. Стойка и балка вырезаются отдельно при рисовании, балка вращается вокруг шарнира. Сгенерировано встроенным imagegen, преобразовано в WebP через sharp.

Промпт: «Use case: stylized-concept. Asset type: isolated side-view game sprite, transparent background. Create a high quality reinforced police road barrier gate for a bright tropical coastal arcade game. One heavy dark steel vertical rectangular gate motor pedestal at LEFT, firmly bolted onto broad concrete base, small amber warning beacon on top. A long thick RED AND WHITE striped horizontal rectangular steel boom extends RIGHT from the pivot at the upper third of the pedestal. Strong metal boom, visible bolts and slight three-dimensional depth, reinforced bumper end. Entire object visible, facing directly SIDE ON (orthographic), no perspective foreshortening. Transparent background, no ground scenery, no lettering, no characters, no cars. Polished colorful stylized 3D game art. Horizontal boom must be visually clear as a physical solid obstacle that a ram can crash into. The image will be split into the left pedestal and boom to animate rotation.»

Проверки: `tests/monkey-race-campaign.test.js`, `tests/monkey-race-gate-ui.cjs`.

## Усиление атак

После каждой потерянной пластины брони интервал залпов уменьшается на 4 кадра, предупреждение — на 2 кадра; скорость снаряда увеличивается на 0.45. Серия содержит 4–6 залпов по двум дорожкам, свободная дорожка меняется. Прыжковые барьеры и верхние балки идут сериями по 3–5: интервал уменьшается на 5 кадров, время подхода — на 6 кадров за пластину. Восстановление жизни очищает всю текущую серию. Тесты проверяют уклонение без пригибания от залпов и своевременные прыжки/пригибание от препятствий при каждом из шести состояний брони.
