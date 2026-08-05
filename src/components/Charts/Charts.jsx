import './Charts.css'

const BAR_HEIGHTS = [46, 70, 38, 82, 58, 90, 50, 74, 62, 44, 86, 54]

function Bars() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 320 120"
      role="img"
      aria-label="Graphique à barres (illustration)"
    >
      {BAR_HEIGHTS.map((h, i) => (
        <rect
          key={i}
          x={8 + i * 26}
          y={112 - h}
          width="18"
          height={h}
          rx="4"
        />
      ))}
    </svg>
  )
}

function Line() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 320 120"
      role="img"
      aria-label="Graphique en courbe (illustration)"
    >
      <polyline points="8,96 52,80 96,86 140,56 184,64 228,34 272,44 312,20" />
      <circle cx="312" cy="20" r="4" />
    </svg>
  )
}

function Area() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 320 120"
      role="img"
      aria-label="Graphique en aires (illustration)"
    >
      <path d="M8,96 L8,118 L312,118 L312,34 L268,48 L224,28 L180,60 L136,44 L92,70 L48,52 Z" />
    </svg>
  )
}

function Donut() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Graphique en anneau (illustration)"
    >
      <circle cx="60" cy="60" r="44" fill="none" strokeWidth="20" />
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="none"
        strokeWidth="20"
        strokeDasharray="110 166"
        transform="rotate(-90 60 60)"
      />
    </svg>
  )
}

function Pie() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Graphique en secteurs (illustration)"
    >
      <circle cx="60" cy="60" r="44" />
      <path d="M60 60 L60 16 A44 44 0 0 1 102 78 Z" />
    </svg>
  )
}

function Scatter() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 320 120"
      role="img"
      aria-label="Graphique à nuage de points (illustration)"
    >
      <circle cx="30" cy="92" r="5" />
      <circle cx="64" cy="70" r="5" />
      <circle cx="98" cy="84" r="5" />
      <circle cx="128" cy="52" r="5" />
      <circle cx="166" cy="66" r="5" />
      <circle cx="202" cy="40" r="5" />
      <circle cx="238" cy="58" r="5" />
      <circle cx="276" cy="30" r="5" />
      <circle cx="304" cy="46" r="5" />
    </svg>
  )
}

function Radar() {
  return (
    <svg
      className="chart-ph__skeleton"
      viewBox="0 0 160 160"
      role="img"
      aria-label="Graphique radar (illustration)"
    >
      <polygon points="80,18 140,60 116,126 44,126 20,60" />
      <polygon points="80,44 116,70 104,110 56,110 44,70" />
    </svg>
  )
}

const SKELETONS = {
  bar: Bars,
  line: Line,
  area: Area,
  donut: Donut,
  pie: Pie,
  scatter: Scatter,
  radar: Radar,
}

const LABELS = {
  bar: 'Graphique à barres',
  line: 'Graphique en courbe',
  area: 'Graphique en aires',
  donut: 'Graphique en anneau',
  pie: 'Graphique en secteurs',
  scatter: 'Nuage de points',
  radar: 'Graphique radar',
}

function ChartPlaceholder({
  type = 'bar',
  title,
  height = 260,
  footer,
  className = '',
}) {
  const Skeleton = SKELETONS[type] || Bars
  const label = LABELS[type] || LABELS.bar

  return (
    <section
      className={`chart-ph ${className}`.trim()}
      style={{ '--chart-ph-height': `${height}px` }}
    >
      <header className="chart-ph__header">
        <span className="chart-ph__title">{title || label}</span>
        <span className="chart-ph__badge">Simulation</span>
      </header>
      <div className="chart-ph__body">
        <Skeleton />
      </div>
      {footer && <footer className="chart-ph__footer">{footer}</footer>}
    </section>
  )
}

export function BarChartPlaceholder(props) {
  return <ChartPlaceholder type="bar" {...props} />
}

export function LineChartPlaceholder(props) {
  return <ChartPlaceholder type="line" {...props} />
}

export function AreaChartPlaceholder(props) {
  return <ChartPlaceholder type="area" {...props} />
}

export function DonutChartPlaceholder(props) {
  return <ChartPlaceholder type="donut" {...props} />
}

export function PieChartPlaceholder(props) {
  return <ChartPlaceholder type="pie" {...props} />
}

export function ScatterChartPlaceholder(props) {
  return <ChartPlaceholder type="scatter" {...props} />
}

export function RadarChartPlaceholder(props) {
  return <ChartPlaceholder type="radar" {...props} />
}

export default ChartPlaceholder