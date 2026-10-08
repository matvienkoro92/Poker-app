# Отдельный персонаж зала

Встроенный imagegen. Фон без персонажа: `assets/player-hall/lounge-garage-empty-v13.webp` (1341 × 1173). Прозрачный персонаж: `assets/player-hall/seated-monkey-v1.webp` (1179 × 1334). Lossless WebP без изменения размера. Реестр `hallCharacters` и `characterLayer()` в `app-player-hall.js` позволяют менять спрайт независимо от фона. Ключ из `data.character` с запасным `monkey`; серверный выбор будущих персонажей пока не добавлен.

Персонаж внутри общей плоскости камеры. Столик и растения перекрывают его отдельным слоем переднего плана.

## Промпт фона

Remove ONLY the seated chimp character entirely from this supplied panorama: head, fur, hands, torso, clothes, legs and Nike sneakers. Restore a pristine EMPTY red leather armchair underneath with naturally upholstered backrest, seat cushion and armrests, and restore carpet/floor where the shoes were. Preserve exact chair outline, position, perspective, ALL wall plaques, shelves, lamps, garage, kart, table, glass, foreground plants and all other original pixels. No person or animal, no clothing, no shoes, no ghost silhouettes. Same panorama aspect ratio, crisp image. This is the empty-room layer for a separately composited character.

## Промпт персонажа

Create a TRANSPARENT BACKGROUND isolated character sprite of ONLY the seated chimp from supplied scene, no chair, no room, no table or props. Match precisely original identity, pose and silhouette: relaxed older chimp, head leaning on left hand, right forearm resting on invisible chair armrest, crossed legs, black and red poker racing jacket, black trousers, red black Nike high-top sneakers with clear swoosh. Entire head to both sneakers visible, reproduce pose and camera angle to sit perfectly back into original leather chair. Character fills portrait canvas with 3% transparent margins. Crisp detailed face eyes fur hands leather seams shoe laces, high quality natural realistic materials, no painterly blur. Warm amber lighting from above matching room. Genuine transparent alpha everywhere outside character including between limbs. No chair or extra shadow surfaces, no background, no lettering.
