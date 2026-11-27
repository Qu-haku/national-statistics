import { format } from './data.js';

export function line({ points, ticks, unit, label, endpoint, comparison, pins = [], yearStep }) {
  function draw(compact) {
    const width = compact ? 350 : 750;
    const height = compact ? 236 : 244;
    const left = compact ? 47 : 54;
    const right = width - 23;
    const top = 47;
    const bottom = height - 32;
    const first = points[0][0];
    const last = points.at(-1)[0];
    const x = year => left + (year - first) / (last - first) * (right - left);
    const y = value => bottom - (value - ticks[0]) / (ticks.at(-1) - ticks[0]) * (bottom - top);
    const coords = points.map(([year,value]) => [x(year),y(value)]);
    const path = coords.map(([a,b],i) => (i ? 'L' : 'M') + a + ' ' + b).join(' ');
    const [endX,endY] = coords.at(-1);
    const yearInterval = yearStep && (compact ? yearStep * 2 : yearStep);
    const yearLabels = points.filter(([year]) => year === first || year === last ||
      (yearInterval ? year % yearInterval === 0 && year - first >= yearInterval / 2 && last - year >= yearInterval / 2 : year !== 2015));
    const comparisonPath = comparison?.map(([year, value], i) =>
      `${i ? 'L' : 'M'}${x(year)} ${y(value)}`).join(' ');
    return `<svg class="line ${compact ? 'compact' : 'wide'}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
      <text x="0" y="17" class="axis">単位：${unit}</text>
      ${ticks.map(value => `<line class="grid" x1="${left}" x2="${right}" y1="${y(value)}" y2="${y(value)}"/>
        <text class="axis" x="${left - 8}" y="${y(value) + 4}" text-anchor="end">${format(value)}</text>`).join('')}
      ${yearLabels.map(([year]) =>
        `<line class="grid vertical" x1="${x(year)}" x2="${x(year)}" y1="${top}" y2="${bottom}"/>
        <text class="axis" x="${x(year)}" y="${bottom + 20}" text-anchor="middle">${year}</text>`).join('')}
      ${comparisonPath
        ? `<path class="chart-stroke chart-comparison" d="${comparisonPath}"/>`
        : `<path class="chart-fill" d="${path} L${endX} ${bottom} L${left} ${bottom} Z"/>`}
      <path class="chart-stroke" d="${path}"/>
      ${coords.slice(0,-1).map(([a,b]) => `<circle class="dot" cx="${a}" cy="${b}" r="3"/>`).join('')}
      ${pins.map(([year, value, text, align], index) => {
        const labelY = compact && index === 0 ? 40 : 25;
        return `<path class="peak-guide" d="M${x(year)} ${y(value)} V${labelY + 4}"/>
          <circle class="peak" cx="${x(year)}" cy="${y(value)}" r="4"/>
          <text class="peak-label" x="${x(year)}" y="${labelY}" text-anchor="${align}">${text}</text>`;
      }).join('')}
      <circle class="end-dot" cx="${endX}" cy="${endY}" r="4.6"/>
      ${endpoint ? `<text class="end-label" x="${endX - 7}" y="${endY - 12}" text-anchor="end">${endpoint}</text>` : ''}
    </svg>`;
  }
  return draw(false) + draw(true);
}

export function ageComposition(rows, latestAgeShares) {
  function draw(compact) {
    const width = compact ? 350 : 750;
    const left = 40;
    const right = width - 22;
    const top = 14;
    const bottom = 202;
    const x = index => left + index / (rows.length - 1) * (right - left);
    const y = share => bottom - share * (bottom - top);
    const bands = rows.map(([, ...ages]) => {
      const total = ages.reduce((sum, count) => sum + count, 0);
      return [0, ages[0] / total, (ages[0] + ages[1]) / total, 1];
    });
    return `<svg class="line ${compact ? 'compact' : 'wide'}" viewBox="0 0 ${width} 234" role="img"
      aria-label="${rows[0][0]}年から${rows.at(-1)[0]}年の年齢3区分別人口割合。${rows.at(-1)[0]}年は${latestAgeShares}。">
      ${['young', 'working', 'older'].map((band, index) => {
        const upper = bands.map((shares, i) => `${x(i)},${y(shares[index + 1])}`);
        const lower = bands.map((shares, i) => `${x(i)},${y(shares[index])}`).reverse();
        return `<polygon class="age-${band}" points="${upper.concat(lower).join(' ')}"/>`;
      }).join('')}
      ${[0, 25, 50, 75, 100].map(tick => `<line class="grid age-grid" x1="${left}" x2="${right}" y1="${y(tick / 100)}" y2="${y(tick / 100)}"/>
        <text class="axis" x="${left - 7}" y="${y(tick / 100) + 4}" text-anchor="end">${tick}%</text>`).join('')}
      ${rows.map(([year], index) => index === rows.length - 1 || index % (compact ? 4 : 2) === 0
        ? `<text class="axis" x="${x(index)}" y="${bottom + 20}" text-anchor="middle">${year}</text>` : '').join('')}
    </svg>`;
  }
  return draw(false) + draw(true);
}

export function bars(rows, ticks, unit) {
  const max = ticks.at(-1);
  return `<div class="bars">
    <div class="bar-axis"><span>単位：${unit}</span><div>${ticks.map(tick => `<span>${format(tick)}</span>`).join('')}</div></div>
    ${rows.map(({label,value,display,accent}) => `<div class="bar-row">
      <span>${label}</span><div class="bar-track">
        <svg viewBox="0 0 ${max} 16" preserveAspectRatio="none" aria-hidden="true">
          ${ticks.map(tick => `<line class="grid" x1="${tick}" x2="${tick}" y1="0" y2="16" vector-effect="non-scaling-stroke"/>`).join('')}
          <rect class="${accent ? 'bar-accent' : 'bar-ink'}" width="${value}" y="3" height="10"/>
        </svg>
        <strong>${display}</strong>
      </div></div>`).join('')}
  </div>`;
}

export function donut(value, display, label) {
  return `<svg class="donut" viewBox="0 0 200 200" role="img" aria-label="${label} ${display}">
    <circle class="donut-base" cx="100" cy="100" r="78"/>
    <circle class="donut-value" cx="100" cy="100" r="78" pathLength="100"
      stroke-dasharray="${value} ${100-value}" transform="rotate(-90 100 100)"/>
    <text x="100" y="91" text-anchor="middle" class="donut-label">${label}</text>
    <text x="100" y="121" text-anchor="middle" class="donut-number">${display}</text>
  </svg>`;
}

// Use mirrored bars when a series provides both sexes for each age band.
export function pyramid(rows, ticks, unit) {
  const max = ticks.at(-1);
  return `<div class="pyramid" aria-label="男女別人口ピラミッド">
    <p>男性 ／ 女性（${unit}）</p>
    <div class="pyramid-axis">${[...ticks.slice(1).reverse(), ...ticks].map(tick => `<span>${format(tick)}</span>`).join('')}</div>
    ${rows.map(({ label, men, women }) => `<div class="pyramid-row">
      <span>${label}</span><svg viewBox="0 0 ${max * 2} 18" preserveAspectRatio="none" aria-hidden="true">
        <rect class="bar-ink" x="${max - men}" width="${men}" height="18"/>
        <rect class="bar-accent" x="${max}" width="${women}" height="18"/>
      </svg><span>${format(men)} ／ ${format(women)}</span></div>`).join('')}
  </div>`;
}
