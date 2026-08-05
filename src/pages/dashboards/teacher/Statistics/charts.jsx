function roundedTopBarPath(x, y, width, height, radius) {
  if (height <= 0) return ''
  const r = Math.min(radius, height, width / 2)
  return `M ${x} ${y + height} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + width - r} ${y} Q ${x + width} ${y} ${x + width} ${y + r} L ${x + width} ${y + height} Z`
}

// Comparaison de magnitude entre catégories nominales (classes) : une seule
// teinte pour toutes les barres, la hauteur porte déjà l'information.
export function MagnitudeBarChart({ data, max = 100, formatValue = (value) => `${value}` }) {
  const width = 320
  const height = 200
  const baselineY = 150
  const maxBarHeight = 110
  const barWidth = 28
  const step = width / data.length
  const chartLabel = `${data.map((item) => `${item.label} ${formatValue(item.value)}`).join(', ')}`

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
        const barHeight = (item.value / max) * maxBarHeight
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
              {formatValue(item.value)}
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
