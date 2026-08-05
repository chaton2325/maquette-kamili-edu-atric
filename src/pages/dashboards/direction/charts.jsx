function roundedTopBarPath(x, y, width, height, radius) {
  if (height <= 0) return ''
  const r = Math.min(radius, height, width / 2)
  return `M ${x} ${y + height} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + width - r} ${y} Q ${x + width} ${y} ${x + width} ${y + r} L ${x + width} ${y + height} Z`
}

// Comparaison de magnitude entre catégories nominales : une seule teinte
// pour toutes les barres, la hauteur porte déjà l'information.
export function BarChart({
  data,
  max,
  formatValue = (value) => `${value}`,
}) {
  const width = 320
  const height = 200
  const baselineY = 150
  const maxBarHeight = 110
  const barWidth = 28
  const step = width / data.length
  const chartLabel = `Valeurs : ${data
    .map((item) => `${item.label} ${formatValue(item.value)}`)
    .join(', ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="dir-chart-svg"
      role="img"
      aria-label={chartLabel}
    >
      <line
        x1={0}
        y1={baselineY}
        x2={width}
        y2={baselineY}
        className="dir-chart-axis"
      />
      {data.map((item, index) => {
        const barHeight = (item.value / max) * maxBarHeight
        const x = index * step + (step - barWidth) / 2
        const y = baselineY - barHeight
        return (
          <g key={item.label}>
            <path
              d={roundedTopBarPath(x, y, barWidth, barHeight, 4)}
              className="dir-chart-bar"
            />
            <text
              x={x + barWidth / 2}
              y={y - 10}
              textAnchor="middle"
              className="dir-chart-value-label"
            >
              {formatValue(item.value)}
            </text>
            <text
              x={x + barWidth / 2}
              y={baselineY + 22}
              textAnchor="middle"
              className="dir-chart-axis-label"
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Comparaison de deux séries côte à côte (ex : recettes / dépenses).
// Une série = une teinte, les barres d'une même série sont identiques.
export function GroupedBarChart({
  data,
  max,
  series,
  formatValue = (value) => `${value}`,
}) {
  const width = 360
  const height = 200
  const baselineY = 150
  const maxBarHeight = 110
  const groupWidth = 34
  const barWidth = 14
  const step = width / data.length
  const chartLabel = `${series.map((s) => s.label).join(' / ')} : ${data
    .map(
      (item) =>
        `${item.label} ${series
          .map((s) => `${s.label} ${formatValue(item[s.key])}`)
          .join(' ')}`,
    )
    .join(', ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="dir-chart-svg"
      role="img"
      aria-label={chartLabel}
    >
      <line
        x1={0}
        y1={baselineY}
        x2={width}
        y2={baselineY}
        className="dir-chart-axis"
      />
      {data.map((item, index) => {
        const x = index * step + (step - groupWidth) / 2
        return (
          <g key={item.label}>
            {series.map((s, seriesIndex) => {
              const barHeight = (item[s.key] / max) * maxBarHeight
              const barX = x + seriesIndex * barWidth
              const barY = baselineY - barHeight
              return (
                <path
                  key={s.key}
                  d={roundedTopBarPath(barX, barY, barWidth, barHeight, 4)}
                  className={`dir-chart-bar ${s.className ?? ''}`}
                />
              )
            })}
            <text
              x={x + groupWidth / 2}
              y={baselineY + 22}
              textAnchor="middle"
              className="dir-chart-axis-label"
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Tendance : une série = une seule teinte, échelle partagée 0–max.
export function LineChart({
  data,
  max,
  formatValue = (value) => `${value}`,
}) {
  const width = 360
  const height = 190
  const top = 26
  const bottom = 30
  const left = 24
  const right = 16
  const plotHeight = height - top - bottom
  const plotWidth = width - left - right

  const coords = data.map((point, index) => ({
    ...point,
    x: left + (index / (data.length - 1)) * plotWidth,
    y: top + (1 - point.value / max) * plotHeight,
  }))

  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`)
    .join(' ')
  const baselineY = top + plotHeight
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`
  const chartLabel = `Évolution : ${data
    .map((point) => `${point.label} ${formatValue(point.value)}`)
    .join(', ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="dir-chart-svg"
      role="img"
      aria-label={chartLabel}
    >
      <line
        x1={left}
        y1={baselineY}
        x2={left + plotWidth}
        y2={baselineY}
        className="dir-chart-axis"
      />
      <path d={areaPath} className="dir-chart-area" />
      <path d={linePath} className="dir-chart-line" fill="none" />
      {coords.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={3} className="dir-chart-dot" />
          <text
            x={c.x}
            y={baselineY + 18}
            textAnchor="middle"
            className="dir-chart-axis-label"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Part-à-tout nominal : barre segmentée en nuances d'une seule teinte,
// toujours accompagnée d'un libellé et d'une icône — jamais la couleur seule.
export function SegmentedBar({ segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="dir-segmented-bar">
      <div className="dir-segmented-bar__track">
        {segments.map((segment, index) => (
          <div
            key={segment.key}
            className={`dir-segmented-bar__segment dir-segmented-bar__segment--shade-${index + 1}`}
            style={{ flexGrow: segment.value || 0.0001 }}
            title={`${segment.label} : ${segment.value}`}
          />
        ))}
      </div>
      <ul className="dir-segmented-bar__legend">
        {segments.map((segment, index) => (
          <li
            key={segment.key}
            className="dir-segmented-bar__legend-item"
          >
            <span
              className={`dir-segmented-bar__dot dir-segmented-bar__dot--shade-${index + 1}`}
              aria-hidden="true"
            />
            <span aria-hidden="true">{segment.icon}</span>
            <span>
              {segment.label} — {segment.value}
              {total > 0 && ` (${Math.round((segment.value / total) * 100)}%)`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Part-à-tout avec statut : couleurs de statut réservées, toujours
// accompagnées d'un libellé et d'une icône.
export function StatusSegmentedBar({ segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="dir-segmented-bar">
      <div className="dir-segmented-bar__track">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={`dir-segmented-bar__segment dir-segmented-bar__segment--${segment.variant}`}
            style={{ flexGrow: segment.value || 0.0001 }}
            title={`${segment.label} : ${segment.value}`}
          />
        ))}
      </div>
      <ul className="dir-segmented-bar__legend">
        {segments.map((segment) => (
          <li key={segment.key} className="dir-segmented-bar__legend-item">
            <span
              className={`dir-segmented-bar__dot dir-segmented-bar__dot--${segment.variant}`}
              aria-hidden="true"
            />
            <span aria-hidden="true">{segment.icon}</span>
            <span>
              {segment.label} — {segment.value}
              {total > 0 && ` (${Math.round((segment.value / total) * 100)}%)`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Donut nominal : nuances d'une seule teinte + légende avec libellé/icône.
export function DonutChart({ segments, size = 160, thickness = 24 }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  let offset = 0
  const normalized = segments.map((segment, index) => {
    const dash = (segment.value / total) * circumference
    const item = { ...segment, index, dash, offset }
    offset += dash
    return item
  })

  const chartLabel = `Répartition : ${segments
    .map((segment) => `${segment.label} ${segment.value}`)
    .join(', ')}`

  return (
    <div className="dir-donut">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="dir-donut__svg"
        role="img"
        aria-label={chartLabel}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
          className="dir-donut__track"
        />
        {normalized.map((segment) => (
          <circle
            key={segment.key}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            strokeDasharray={`${segment.dash} ${circumference - segment.dash}`}
            strokeDashoffset={-segment.offset}
            transform={`rotate(-90 ${center} ${center})`}
            className={`dir-donut__seg dir-donut__seg--shade-${segment.index + 1}`}
          />
        ))}
        <text x={center} y={center + 8} className="dir-donut__total">
          {total}
        </text>
      </svg>
      <ul className="dir-donut__legend">
        {segments.map((segment, index) => (
          <li key={segment.key} className="dir-donut__legend-item">
            <span
              className={`dir-donut__swatch dir-donut__seg--shade-${index + 1}`}
              aria-hidden="true"
            />
            <span aria-hidden="true">{segment.icon}</span>
            <span>
              {segment.label} — {segment.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
