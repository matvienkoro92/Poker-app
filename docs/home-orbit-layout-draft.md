# Черновик главной: круг "Зал славы" и 4 угловые кнопки

Дата: 2026-04-24

Этот черновик сохраняет вариант, где на главной:

- круг "Зал славы" расположен по центру и занимает почти всю ширину блока;
- вокруг него 4 угловые кнопки;
- у кнопок полупрозрачный фон;
- дуга у каждой кнопки рассчитана как окружность с зазором 7px от круга.

Чтобы вернуть этот вариант, нужно восстановить изменения ниже в `index.html` и `styles.css`.

## Изменения `index.html`

В блоке `.hero-row`:

```html
<div class="hero-row home-orbit-menu">
  <div class="hero home-orbit-menu__center">
```

У контейнера кнопок:

```html
<div class="home-mini-icons home-orbit-menu__items" aria-label="Быстрые действия">
```

Классы кнопок:

```html
home-orbit-menu__item home-orbit-menu__item--top-left
home-orbit-menu__item home-orbit-menu__item--top-right
home-orbit-menu__item home-orbit-menu__item--bottom-left
home-orbit-menu__item home-orbit-menu__item--bottom-right
```

Тексты:

```html
Канал клуба
Розыгрыш
```

## CSS для `styles.css`

Вставлялся перед комментарием `/* Узкие экраны: меньше отступы и gap, кнопки остаются в границах */`.

```css
.home-orbit-menu {
  --home-orbit-center: calc(100% - 14px);
  --home-orbit-gap: 7px;
  --home-orbit-mask-r: calc((var(--home-orbit-center) / 2) + var(--home-orbit-gap));
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  min-height: 0;
  display: block;
  margin-top: 18px;
  isolation: isolate;
}
.home-orbit-menu__center {
  position: absolute;
  z-index: 3;
  inset: 50% auto auto 50%;
  width: var(--home-orbit-center);
  height: var(--home-orbit-center);
  transform: translate(-50%, -50%);
}
.home-orbit-menu .hero__link {
  width: 100%;
  height: 100%;
  margin: 0;
}
.home-orbit-menu__items {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  margin: 0;
}
.home-orbit-menu .home-mini-icon-item {
  position: absolute;
  width: 50%;
  height: 50%;
  min-height: 0;
  padding: clamp(7px, 2.3vw, 11px);
  border-radius: 0;
  transform-origin: center;
  background: transparent;
  border: 0;
  box-shadow: none;
  overflow: visible;
}
.home-orbit-menu .home-mini-icon-item::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(145deg, rgba(120, 53, 15, 0.16), rgba(249, 115, 22, 0.04)),
    rgba(30, 41, 59, 0.08);
  border: 1px solid rgba(251, 146, 60, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 237, 213, 0.08);
  -webkit-mask-image: radial-gradient(circle at 100% 100%, transparent 0 var(--home-orbit-mask-r), #000 calc(var(--home-orbit-mask-r) + 1px));
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-image: radial-gradient(circle at 100% 100%, transparent 0 var(--home-orbit-mask-r), #000 calc(var(--home-orbit-mask-r) + 1px));
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}
.home-orbit-menu .home-mini-icon-item::after {
  display: none;
}
.home-orbit-menu .home-mini-icon-item--hover-scale:hover {
  transform: translateY(-1px);
}
.home-orbit-menu__item--top-left {
  top: 0;
  left: 0;
  align-items: flex-start;
  justify-content: flex-start;
}
.home-orbit-menu__item--top-left::before {
  transform: none;
}
.home-orbit-menu__item--top-right {
  top: 0;
  right: 0;
  align-items: flex-end;
  justify-content: flex-start;
}
.home-orbit-menu__item--top-right::before {
  transform: scaleX(-1);
}
.home-orbit-menu__item--bottom-left {
  bottom: 0;
  left: 0;
  align-items: flex-start;
  justify-content: flex-end;
}
.home-orbit-menu__item--bottom-left::before {
  transform: scaleY(-1);
}
.home-orbit-menu__item--bottom-right {
  right: 0;
  bottom: 0;
  align-items: flex-end;
  justify-content: flex-end;
}
.home-orbit-menu__item--bottom-right::before {
  transform: scale(-1);
}
.home-orbit-menu .home-mini-icon {
  width: clamp(20px, 6.2vw, 28px);
  height: clamp(20px, 6.2vw, 28px);
  font-size: clamp(15px, 4.9vw, 22px);
  color: #fed7aa;
}
.home-orbit-menu .home-mini-icon--telegram svg {
  width: clamp(20px, 6.2vw, 28px);
  height: clamp(20px, 6.2vw, 28px);
  fill: #fed7aa;
}
.home-orbit-menu .home-mini-icon__label {
  max-width: min(72px, 20vw);
  color: #ffedd5;
  font-size: clamp(7px, 2.15vw, 9px);
  font-weight: 900;
  line-height: 1.08;
  white-space: normal;
  text-wrap: balance;
  text-transform: none;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.75);
}
.home-orbit-menu__item--top-left .home-mini-icon__label,
.home-orbit-menu__item--top-right .home-mini-icon__label {
  max-width: min(58px, 16vw);
}
.home-orbit-menu .feature__badge {
  z-index: 5;
}
[data-theme="light"] .view--active[data-view="home"] .home-orbit-menu .home-mini-icon-item {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
[data-theme="light"] .view--active[data-view="home"] .home-orbit-menu .home-mini-icon-item::before {
  background:
    linear-gradient(145deg, rgba(251, 146, 60, 0.08), rgba(255, 247, 237, 0.14)),
    rgba(254, 215, 170, 0.1);
  border-color: rgba(234, 88, 12, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
[data-theme="light"] .view--active[data-view="home"] .home-orbit-menu .home-mini-icon,
[data-theme="light"] .view--active[data-view="home"] .home-orbit-menu .home-mini-icon__label {
  color: #9a3412;
}
[data-theme="light"] .view--active[data-view="home"] .home-orbit-menu .home-mini-icon--telegram svg {
  fill: #9a3412;
}
```
