function roundedTopBarPath(x, y, width, height, radius) {
  if (height <= 0) return ''
  const r = Math.min(radius, height, width / 2)
  return `M ${x} ${y + height} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + width - r} ${y} Q ${x + width} ${y} ${x + width} ${y + r} L ${x + width} ${y + height} Z`
}

// Barres simples — style Power BI (grille de fond, étiquettes de valeurs).
export function BarChart({ data, max, formatValue = (v) => `${v}` }) {
  const width = 340
  const height = 200
  const baselineY = 160
  const maxBarHeight = 110
  const barWidth = 30
  const step = width / data.length
  const gridSteps = [0.25, 0.5, 0.75, 1]
  const chartLabel = `Valeurs : ${data
    .map((item) => `${item.label} ${formatValue(item.value)}`)
    .join(', ')}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="min-chart-svg" role="img" aria-label={chartLabel}>
      {gridSteps.map((frac) => {
        const y = baselineY - frac * maxBarHeight
        return (
          <g key={frac}>
            <line x1={0} y1={y} x2={width} y2={y} className="min-chart-grid" />
            <text x={4} y={y - 4} className="min-chart-grid-label">
              {Math.round(frac * max)}
            </text>
          </g>
        )
      })}
      <line x1={0} y1={baselineY} x2={width} y2={baselineY} className="min-chart-axis" />
      {data.map((item, index) => {
        const barHeight = (item.value / max) * maxBarHeight
        const x = index * step + (step - barWidth) / 2
        const y = baselineY - barHeight
        return (
          <g key={item.label}>
            <path d={roundedTopBarPath(x, y, barWidth, barHeight, 3)} className="min-chart-bar" />
            <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" className="min-chart-value-label">
              {formatValue(item.value)}
            </text>
            <text x={x + barWidth / 2} y={baselineY + 18} textAnchor="middle" className="min-chart-axis-label">
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Deux séries côte à côte (ex : filles / garçons) — style Power BI.
export function GroupedBarChart({ data, max, series, formatValue = (v) => `${v}` }) {
  const width = 340
  const height = 200
  const baselineY = 160
  const maxBarHeight = 110
  const groupWidth = 36
  const barWidth = 14
  const step = width / data.length
  const gridSteps = [0.25, 0.5, 0.75, 1]
  const chartLabel = `${series.map((s) => s.label).join(' / ')} : ${data
    .map((item) => `${item.label} ${series.map((s) => `${s.label} ${formatValue(item[s.key])}`).join(' ')}`)
    .join(', ')}`

  return (
    <div className="min-chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-chart-svg" role="img" aria-label={chartLabel}>
        {gridSteps.map((frac) => {
          const y = baselineY - frac * maxBarHeight
          return (
            <g key={frac}>
              <line x1={0} y1={y} x2={width} y2={y} className="min-chart-grid" />
              <text x={4} y={y - 4} className="min-chart-grid-label">
                {Math.round(frac * max)}
              </text>
            </g>
          )
        })}
        <line x1={0} y1={baselineY} x2={width} y2={baselineY} className="min-chart-axis" />
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
                    d={roundedTopBarPath(barX, barY, barWidth, barHeight, 3)}
                    className={`min-chart-bar ${s.className ?? ''}`}
                  />
                )
              })}
              <text x={x + groupWidth / 2} y={baselineY + 18} textAnchor="middle" className="min-chart-axis-label">
                {item.label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="min-chart-legend">
        {series.map((s) => (
          <span key={s.key} className="min-chart-legend-item">
            <span className={`min-chart-legend-dot ${s.className ?? ''}`} aria-hidden="true" />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// Courbe de tendance — style Power BI (grille, aire, points).
export function LineChart({ data, max, formatValue = (v) => `${v}` }) {
  const width = 360
  const height = 190
  const top = 26
  const bottom = 30
  const left = 30
  const right = 14
  const plotHeight = height - top - bottom
  const plotWidth = width - left - right
  const gridSteps = [0.25, 0.5, 0.75, 1]

  const coords = data.map((point, index) => ({
    ...point,
    x: left + (index / (data.length - 1)) * plotWidth,
    y: top + (1 - point.value / max) * plotHeight,
  }))

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')
  const baselineY = top + plotHeight
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`
  const chartLabel = `Évolution : ${data.map((point) => `${point.label} ${formatValue(point.value)}`).join(', ')}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="min-chart-svg" role="img" aria-label={chartLabel}>
      {gridSteps.map((frac) => {
        const y = top + (1 - frac) * plotHeight
        return (
          <g key={frac}>
            <line x1={left} y1={y} x2={left + plotWidth} y2={y} className="min-chart-grid" />
            <text x={2} y={y + 3} className="min-chart-grid-label">
              {Math.round(frac * max)}
            </text>
          </g>
        )
      })}
      <line x1={left} y1={baselineY} x2={left + plotWidth} y2={baselineY} className="min-chart-axis" />
      <path d={areaPath} className="min-chart-area" />
      <path d={linePath} className="min-chart-line" fill="none" />
      {coords.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={3} className="min-chart-dot" />
          <text x={c.x} y={baselineY + 18} textAnchor="middle" className="min-chart-axis-label">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Part-à-tout (sexe, niveaux) : nuances d'une seule teinte + libellé/icône.
export function DonutChart({ segments, size = 150, thickness = 26 }) {
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

  const chartLabel = `Répartition : ${segments.map((segment) => `${segment.label} ${segment.value}`).join(', ')}`

  return (
    <div className="min-donut">
      <svg viewBox={`0 0 ${size} ${size}`} className="min-donut__svg" role="img" aria-label={chartLabel}>
        <circle cx={center} cy={center} r={radius} strokeWidth={thickness} className="min-donut__track" />
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
            className={`min-donut__seg min-donut__seg--shade-${segment.index + 1}`}
          />
        ))}
        <text x={center} y={center + 7} className="min-donut__total">
          {total}
        </text>
      </svg>
      <ul className="min-donut__legend">
        {segments.map((segment, index) => (
          <li key={segment.key} className="min-donut__legend-item">
            <span className={`min-donut__swatch min-donut__seg--shade-${index + 1}`} aria-hidden="true" />
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

// Barre segmentée de statut : couleur réservée + libellé + icône, jamais seule.
export function StatusSegmentedBar({ segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  return (
    <div className="min-status">
      <div className="min-status__track">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={`min-status__segment min-status__segment--${segment.variant}`}
            style={{ flexGrow: segment.value || 0.0001 }}
            title={`${segment.label} : ${segment.value}`}
          />
        ))}
      </div>
      <ul className="min-status__legend">
        {segments.map((segment) => (
          <li key={segment.key} className="min-status__legend-item">
            <span className={`min-status__dot min-status__dot--${segment.variant}`} aria-hidden="true" />
            <span aria-hidden="true">{segment.icon}</span>
            <span>
              {segment.label} — {segment.value}
              {total > 0 && ` (${Math.round((segment.value / total) * 100)} %)`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Cartogramme choroplèthe du Cameroun (grille stylisée des 10 régions).
// La couleur est toujours accompagnée d'un libellé et d'une légende.
function formatCompact(n) {
  if (n >= 1000000) {
    return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  }
  if (n >= 1000) {
    return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  }
  return n.toLocaleString('fr-FR')
}

const legendSteps = [
  { min: 0, max: 20, className: 'min-map--1' },
  { min: 20, max: 40, className: 'min-map--2' },
  { min: 40, max: 60, className: 'min-map--3' },
  { min: 60, max: 80, className: 'min-map--4' },
  { min: 80, max: 101, className: 'min-map--5' },
]

function legendStepClass(normalized) {
  const step = legendSteps.find((s) => normalized >= s.min && normalized < s.max)
  return (step ?? legendSteps[legendSteps.length - 1]).className
}

export function CameroonMap({ regions, byRegion, metric, onSelect, selected }) {
  const values = byRegion.map((item) => item[metric.key])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  function formatValue(value) {
    if (metric.key === 'students') return formatCompact(value)
    return `${value} %`
  }

  function legendRange(lowFrac, highFrac) {
    const low = Math.round((min + range * lowFrac) * 10) / 10
    const high = Math.round((min + range * highFrac) * 10) / 10
    return `${formatValue(low)} – ${formatValue(high)}`
  }

  const chartLabel = `Carte du Cameroun : ${metric.label} par région. ${byRegion
    .map((item) => {
      const region = regions.find((r) => r.id === item.regionId)
      return `${region.name} ${formatValue(item[metric.key])}`
    })
    .join('. ')}`

  return (
    <div className="min-map">
      <svg viewBox="0 0 100 100" className="min-map__svg" role="img" aria-label={chartLabel}>
        {regions.map((region) => {
          const item = byRegion.find((d) => d.regionId === region.id)
          const value = item ? item[metric.key] : 0
          const normalized = ((value - min) / range) * 100
          const className = legendStepClass(normalized)
          const isSelected = selected === region.id
          return (
            <rect
              key={region.id}
              x={region.x}
              y={region.y}
              width={20}
              height={15}
              rx={2}
              className={`min-map__cell ${className}${isSelected ? ' min-map__cell--selected' : ''}`}
              onClick={() => onSelect?.(region.id)}
              role="button"
              aria-label={`${region.name} : ${formatValue(value)}`}
              tabIndex={0}
            >
              <title>
                {region.name} — {metric.label} : {formatValue(value)}
              </title>
            </rect>
          )
        })}
        {regions.map((region) => (
          <text
            key={`${region.id}-label`}
            x={region.x + 10}
            y={region.y + 8}
            textAnchor="middle"
            className="min-map__label"
          >
            {region.abbr}
          </text>
        ))}
      </svg>
      <div className="min-map__legend">
        <span className="min-map__legend-item">
          <span className="min-map__swatch min-map--1" aria-hidden="true" />
          {legendRange(0, 0.2)}
        </span>
        <span className="min-map__legend-item">
          <span className="min-map__swatch min-map--2" aria-hidden="true" />
          {legendRange(0.2, 0.4)}
        </span>
        <span className="min-map__legend-item">
          <span className="min-map__swatch min-map--3" aria-hidden="true" />
          {legendRange(0.4, 0.6)}
        </span>
        <span className="min-map__legend-item">
          <span className="min-map__swatch min-map--4" aria-hidden="true" />
          {legendRange(0.6, 0.8)}
        </span>
        <span className="min-map__legend-item">
          <span className="min-map__swatch min-map--5" aria-hidden="true" />
          {legendRange(0.8, 1)}
        </span>
      </div>
    </div>
  )
}