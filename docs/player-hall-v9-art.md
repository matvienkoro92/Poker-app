# Зазор у транспорта и мобильная камера

Встроенный imagegen. Файл: `assets/player-hall/lounge-garage-panorama-v9.webp`, WebP lossless. Транспорт сдвинут вперёд и вправо, между задним колесом и стойкой виден пол. Кроссовки Nike и расположение плашек сохранены.

Перемещение камеры использует Web Animations: transform и transform-origin интерполируются вместе, начальный кадр берётся из текущего состояния. По запросу пользователя движение остаётся плавным и на мобильном экране. Повторный переход начинается с текущего положения камеры. Тест проверяет промежуточный кадр и активную анимацию; поддерживает Chromium и `HALL_BROWSER=webkit`.

## Итоговый промпт

Make ONE small precise edit to this image: the parked green/gold poker-table kart is currently touching the vertical doorway post with its rear tire. Move the entire kart slightly forward and RIGHT by 3% of total image width (about 40 pixels in this image), maintaining its exact scale, orientation, green felt, turbine, gold trim, wheels, cards and headlights. Its rear tire must have a clear visible 25-35 pixel gap of illuminated concrete floor between tire and doorway post. No wheel may intersect the wall or post. Preserve ALL other pixels and composition: seated chimp with black/red Nike sneakers, chair, shelves, architecture, lighting, floor. Repair only the vacated floor shadow area. Keep sharp image quality and same panorama aspect ratio. No new objects, no text, no UI, no second kart.
