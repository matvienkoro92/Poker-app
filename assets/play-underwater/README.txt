Aquarium Play screen, v1 (2026-10-28)

Provided sources:
- Reference: Подводный покер в гигантском аквариуме (2).png
- Background: Роскошный подводный лаунж с мантой.png
- Billiards tile: Премиальная плитка Бильярд-1.png
- Chess tile: Премиальная шахматная плитка с золотой рамкой-2.png
- Nards tile: Премиальная плитка игры Нарды-3.png

Background: resized WebP variants 480/720/851 px, quality 68/70/72.
Tiles: scene-only crops; labels and frames are live HTML/CSS, WebP 240/480 px.
Foreground: imagegen extraction of the supplied reference trio and poker table,
transparent WebP 480/720/1000 px, quality 76, alpha quality 85.
Final source: exec-642cff26-10f0-43c5-9c5f-be2152a73eb6.png in this task's
Codex generated_images folder; original source retained there.
Icons: resized from the existing winners trophy and Last Longer chip to 120 px.

No animation loop, video or canvas is used by this screen. Art uses responsive
srcset/image-set; tournament terms, navigation and buttons remain live controls.
QA: node tests/play-underwater-browser.cjs

Clean background v2 (2026-10-29)
Built-in image_gen edit of lounge-851.webp; source retained at:
/Users/kosmonavt/.codex/generated_images/01a18501-62d9-7bb2-a041-65af323c42ed/exec-1b0bea14-c557-4e62-872f-444967453e12.png
Project assets: lounge-clean-v2-{480,720,851}.webp, quality 72.
Prompt: Remove all restaurant tables, chairs, wine glasses, lamps and distant
furniture; replace with calm aquarium windows, dark teal architecture and open
polished floor. Preserve ocean, manta ray, gold frames and lower-left teal sofa.
Extend upward ~15% for Telegram controls, tall portrait ~1:2.35. No people,
monkeys, poker table, text or UI. Preserve perspective and stylized 3D realism.
Character/table foreground pixels are unchanged. Cat uses a square sprite frame
matching its original two-frame 768x384 source, without stretching.
