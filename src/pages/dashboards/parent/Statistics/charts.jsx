function roundedTopBarPath(x, y, width, height, radius) {
  if (height <= 0) return ''
  const r = Math.min(radius, height, width / 2)
  return `M ${x} ${y + height} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + width - r} ${y} Q ${x + width} ${y} ${x + width} ${y + r} L ${x + width} ${y + height} Z`
}

// Comparaison de magnitude entre enfants (catégories nominales) : une seule
// teinte pour toutes les barres, la hauteur porte déjà l'information.
export function AttendanceBarChart({ data }) {
  const width = 320
  const height = 200
  const baselineY = 150
  const maxBarHeight = 110
  const barWidth = 28
  const step = width / data.length
  const chartLabel = `Taux de présence par enfant : ${data
    .map((item) => `${item.label} ${item.value}%`)
    .join(', ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="chart-svg"
      role="img"
      aria-label={chartLabel}
    >
      <line
        x1={0}
        y1={baselineY}
        x2={width}
        y2={baselineY}
        className="chart-axis"
      />
      {data.map((item, index) => {
        const barHeight = (item.value / 100) * maxBarHeight
        const x = index * step + (step - barWidth) / 2
        const y = baselineY - barHeight
        return (
          <g key={item.label}>
            <path
              d={roundedTopBarPath(x, y, barWidth, barHeight, 4)}
              className="chart-bar"
            />
            <text
              x={x + barWidth / 2}
              y={y - 10}
              textAnchor="middle"
              className="chart-value-label"
            >
              {item.value}%
            </text>
            <text
              x={x + barWidth / 2}
              y={baselineY + 22}
              textAnchor="middle"
              className="chart-axis-label"
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Petit multiple : une tendance = une série = une seule teinte, pas de
// paire catégorielle à valider. L'échelle (0–max) est partagée entre tous
// les petits multiples pour une comparaison honnête.
export function GradeTrendMiniChart({ points, max = 20 }) {
  const width = 220
  const height = 140
  const top = 26
  const bottom = 34
  const left = 20
  const right = 20
  const plotHeight = height - top - bottom
  const plotWidth = width - left - right

  const coords = points.map((point, index) => ({
    ...point,
    x: left + (index / (points.length - 1)) * plotWidth,
    y: top + (1 - point.value / max) * plotHeight,
  }))

  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`)
    .join(' ')
  const baselineY = top + plotHeight
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`
  const chartLabel = `Évolution de la moyenne : ${points
    .map((point) => `${point.label} ${point.value}/20`)
    .join(', ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="chart-svg"
      role="img"
      aria-label={chartLabel}
    >
      <line
        x1={left}
        y1={baselineY}
        x2={left + plotWidth}
        y2={baselineY}
        className="chart-axis"
      />
      <path d={areaPath} className="chart-area" />
      <path d={linePath} className="chart-line" fill="none" />
      {coords.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={4} className="chart-dot" />
          <text
            x={c.x}
            y={c.y - 10}
            textAnchor="middle"
            className="chart-value-label"
          >
            {c.value}
          </text>
          <text
            x={c.x}
            y={baselineY + 20}
            textAnchor="middle"
            className="chart-axis-label"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Part-à-tout : couleurs de statut (réservées), toujours accompagnées d'une
// icône et d'un libellé — jamais la couleur seule.
export function StatusStackedBar({ segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="status-bar">
      <div className="status-bar__track">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={`status-bar__segment status-bar__segment--${segment.key}`}
            style={{ flexGrow: segment.value || 0.0001 }}
            title={`${segment.label} : ${segment.value}`}
          />
        ))}
      </div>
      <ul className="status-bar__legend">
        {segments.map((segment) => (
          <li key={segment.key} className="status-bar__legend-item">
            <span
              className={`status-bar__dot status-bar__dot--${segment.key}`}
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
