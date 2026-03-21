import React, { useMemo } from 'react';
import './leaderboard.css';
import { leaderboardRows as defaultLeaderboardRows } from './data.js';

const toneMap = {
  gold: {
    amountClass: 'lb-amount-gold',
    rankClass: 'lb-rank-gold',
    entryClass: 'lb-entry-gold',
    spark: '#c2ab63',
    chipClass: 'gold',
  },
  silver: {
    amountClass: 'lb-amount-silver',
    rankClass: 'lb-rank-silver',
    entryClass: 'lb-entry-silver',
    spark: '#b5bdc8',
    chipClass: 'silver',
  },
  bronze: {
    amountClass: 'lb-amount-bronze',
    rankClass: 'lb-rank-bronze',
    entryClass: 'lb-entry-bronze',
    spark: '#bd8f76',
    chipClass: 'bronze',
  },
  cyan: {
    amountClass: 'lb-amount-cyan',
    rankClass: '',
    entryClass: 'lb-entry-cyan',
    spark: '#67deea',
    chipClass: 'cyan',
  },
};

/** Точки HUD по умолчанию (как в исходном макете), если в строке нет `dots`. */
const DEFAULT_SPARKLINE_DOTS = [
  { x: 20, y: 15 },
  { x: 60, y: 13 },
  { x: 100, y: 14 },
];

function CrownIcon() {
  return (
    <svg className="lb-crown" viewBox="0 0 24 14" aria-hidden="true">
      <path d="M2 11 L4.5 4.5 L9 8 L12 2 L15 8 L19.5 4.5 L22 11 L22 13 L2 13 Z" />
    </svg>
  );
}

function Sparkline({ color, path, dots }) {
  const dotList =
    Array.isArray(dots) && dots.length > 0 ? dots : DEFAULT_SPARKLINE_DOTS;

  return (
    <svg
      className="lb-hud-svg"
      viewBox="0 0 132 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path className="lb-hud-micro" d="M2 20 H130" />
      <path
        className="lb-hud-axis"
        d="M8 18 V20 M28 16 V20 M48 15 V20 M68 13 V20 M88 16 V20 M108 15 V20"
      />
      {dotList.map((d, i) => (
        <circle
          key={i}
          className="lb-hud-dot"
          cx={d.x}
          cy={d.y}
          r="1.2"
        />
      ))}
      <path className="lb-hud-line" d={path} stroke={color} />
    </svg>
  );
}

function ChipStack({ tone }) {
  return (
    <div className={`lb-stack ${tone}`}>
      <span />
    </div>
  );
}

/**
 * @param {object} row
 * @param {number} index
 */
function normalizeLeaderboardRow(row, index) {
  const place = row.place ?? row.rank ?? index + 1;
  const toneKey = row.tone ?? row.tier ?? 'cyan';
  const crown = row.crown ?? place === 1;
  const path = row.path ?? '';
  const dots = row.dots;
  const defaultChip = toneMap[toneKey]?.chipClass ?? toneMap.cyan.chipClass;
  let chipTones;
  if (Array.isArray(row.chips)) {
    chipTones = row.chips;
  } else if (typeof row.chips === 'number' && row.chips > 0) {
    chipTones = Array.from({ length: row.chips }, () => defaultChip);
  } else {
    chipTones = [];
  }

  return {
    place,
    name: row.name ?? '',
    amount: row.amount ?? '',
    toneKey,
    crown,
    path,
    dots,
    chipTones,
  };
}

export default function Leaderboard({
  title = 'Топ выигрышей за один турнир',
  year = '2026',
  rows = defaultLeaderboardRows,
  className = '',
}) {
  const safeRows = useMemo(() => {
    const list = Array.isArray(rows) && rows.length ? rows : defaultLeaderboardRows;
    return list.map(normalizeLeaderboardRow);
  }, [rows]);

  const rootClass = ['lb-page', className].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className="lb-shell">
        <div className="lb-screen">
          <div className="lb-header">
            <h2 className="lb-title">
              {title}{' '}
              <span className="lb-year">({year})</span>
            </h2>
          </div>

          <div className="lb-laser" aria-hidden="true" />

          <div className="lb-rows">
            {safeRows.map((row, rowIndex) => {
              const tone = toneMap[row.toneKey] || toneMap.cyan;

              return (
                <div
                  className="lb-row"
                  key={`${row.place}-${rowIndex}-${row.name}-${row.amount}`}
                >
                  <div className={`lb-rank ${tone.rankClass}`.trim()}>
                    {row.crown ? <CrownIcon /> : null}
                    <span>{row.place}</span>
                  </div>

                  <div className={`lb-entry ${tone.entryClass}`}>
                    <div className="lb-entry-edge" aria-hidden="true" />
                    <div className="lb-entry-gloss" aria-hidden="true" />
                    <div className="lb-entry-grid" aria-hidden="true" />

                    <div className="lb-name">{row.name}</div>

                    <div className={`lb-amount ${tone.amountClass}`}>
                      {row.amount}
                    </div>

                    <div className="lb-hud">
                      <Sparkline
                        color={tone.spark}
                        path={row.path}
                        dots={row.dots}
                      />
                    </div>

                    <div className="lb-chips">
                      {row.chipTones.map((chipTone, index) => (
                        <ChipStack key={index} tone={chipTone} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
