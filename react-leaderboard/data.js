/**
 * Демо-строки премиального лидерборда.
 * Поддерживаемые поля (см. нормализацию в Leaderboard.jsx):
 * - `place` | `rank`, `tone` | `tier`, `name`, `amount`, `path`, `dots[]`,
 * - `chips`: число стопок или массив тонов (`gold` | `silver` | `bronze` | `cyan`),
 * - `crown`: явный флаг короны (иначе корона при place/rank === 1).
 */
export const DEFAULT_LEADERBOARD_ROWS = [
  {
    rank: 1,
    name: 'Sarmat1305',
    amount: '491 248 ₽',
    tier: 'gold',
    chips: ['gold', 'gold', 'gold'],
    path: 'M2 16 L18 6 L34 9 L48 13 L66 11 L82 6 L98 13 L116 15',
    dots: [
      { x: 18, y: 17 },
      { x: 58, y: 14.5 },
      { x: 96, y: 15.5 },
    ],
  },
  {
    rank: 2,
    name: 'Waaar',
    amount: '414 575 ₽',
    tier: 'silver',
    chips: ['silver', 'silver', 'silver'],
    path: 'M2 14 L18 6 L33 8 L48 15 L64 9 L80 8 L98 11 L116 5',
    dots: [
      { x: 20, y: 15 },
      { x: 62, y: 13.5 },
      { x: 104, y: 14 },
    ],
  },
  {
    rank: 3,
    name: 'BOTEZGAMBIT',
    amount: '270 000 ₽',
    tier: 'bronze',
    chips: ['bronze', 'bronze', 'bronze'],
    path: 'M2 16 L19 13 L36 14 L54 8 L70 14 L88 15 L102 11 L116 9',
    dots: [
      { x: 22, y: 16 },
      { x: 60, y: 13.5 },
      { x: 96, y: 14.5 },
    ],
  },
  {
    rank: 4,
    name: 'ПокерМанки',
    amount: '267 750 ₽',
    tier: 'cyan',
    chips: ['cyan', 'cyan'],
    path: 'M2 16 L18 11 L35 7 L51 8 L66 13 L82 7 L98 9 L116 13',
    dots: [
      { x: 18, y: 16 },
      { x: 60, y: 14 },
      { x: 98, y: 15 },
    ],
  },
  {
    rank: 5,
    name: 'FrankL',
    amount: '243 825 ₽',
    tier: 'cyan',
    chips: ['cyan', 'cyan'],
    path: 'M2 18 L16 7 L34 5 L50 11 L68 9 L86 6 L102 13 L116 10',
    dots: [
      { x: 24, y: 13 },
      { x: 56, y: 15 },
      { x: 96, y: 13.5 },
    ],
  },
  {
    rank: 6,
    name: 'Фокс',
    amount: '182 268 ₽',
    tier: 'cyan',
    chips: ['cyan', 'cyan'],
    path: 'M2 15 L18 7 L34 9 L49 13 L67 7 L84 8 L101 11 L116 6',
    dots: [
      { x: 20, y: 14 },
      { x: 58, y: 12.5 },
      { x: 104, y: 14 },
    ],
  },
  {
    rank: 7,
    name: 'Фокс',
    amount: '182 142 ₽',
    tier: 'cyan',
    chips: ['cyan'],
    path: 'M2 14 L20 13 L38 10 L55 8 L72 14 L92 9 L116 9',
    dots: [
      { x: 24, y: 15 },
      { x: 62, y: 12 },
      { x: 100, y: 13 },
    ],
  },
  {
    rank: 8,
    name: 'Дикий',
    amount: '144 305 ₽',
    tier: 'cyan',
    chips: ['cyan'],
    path: 'M2 16 L18 9 L36 8 L53 11 L70 12 L88 6 L103 9 L116 11',
    dots: [
      { x: 18, y: 15 },
      { x: 58, y: 13 },
      { x: 102, y: 13.5 },
    ],
  },
  {
    rank: 9,
    name: 'Фокс',
    amount: '130 072 ₽',
    tier: 'cyan',
    chips: ['cyan'],
    path: 'M2 17 L19 16 L37 12 L55 8 L72 15 L90 10 L116 10',
    dots: [
      { x: 22, y: 16 },
      { x: 56, y: 14 },
      { x: 94, y: 14.5 },
    ],
  },
  {
    rank: 10,
    name: 'Em13!!',
    amount: '120 000 ₽',
    tier: 'cyan',
    chips: ['cyan'],
    path: 'M2 13 L18 11 L36 13 L54 16 L71 10 L89 8 L104 13 L116 9',
    dots: [
      { x: 18, y: 14 },
      { x: 62, y: 12 },
      { x: 104, y: 14 },
    ],
  },
  {
    rank: 11,
    name: 'FrankL',
    amount: '110 300 ₽',
    tier: 'cyan',
    chips: ['bronze'],
    path: 'M2 15 L18 8 L35 12 L51 10 L69 14 L86 9 L102 11 L116 7',
    dots: [
      { x: 24, y: 14 },
      { x: 64, y: 13 },
      { x: 98, y: 13.5 },
    ],
  },
  {
    rank: 12,
    name: 'Waaar',
    amount: '109 958 ₽',
    tier: 'cyan',
    chips: ['silver'],
    path: 'M2 14 L20 14 L38 9 L55 7 L72 13 L92 11 L116 8',
    dots: [
      { x: 16, y: 14 },
      { x: 58, y: 11.5 },
      { x: 103, y: 12.5 },
    ],
  },
];

/** Алиас для пропа `rows` в компоненте Leaderboard (те же данные). */
export const leaderboardRows = DEFAULT_LEADERBOARD_ROWS;
