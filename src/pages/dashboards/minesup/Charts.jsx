import { establishments, kindLabels, kindIcons } from '../../../data/national.js'
import { regions } from '../../../data/ministry.js'
import { GroupedBarChart, LineChart, DonutChart } from '../ministry/charts.jsx'
import '../ministry/MinistryPage.css'
import './MinesupPage.css'

function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  if (n >= 1000) return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  return n.toLocaleString('fr-FR')
}

const higherEd = establishments.filter((e) => e.ministry === 'MINESUP')

function Charts() {
  const byRegion = regions
    .map((r) => ({
      label: r.abbr,
      region: r,
      students: higherEd.filter((e) => e.regionId === r.id).reduce((s, e) => s + e.students, 0),
      teachers: higherEd.filter((e) => e.regionId === r.id).reduce((s, e) => s + e.teachers, 0),
    }))
    .filter((d) => d.students > 0)
    .sort((a, b) => b.students - a.students)

  const kindSegments = ['universite', 'grande-ecole', 'institut'].map((k, i) => ({
    key: k,
    label: kindLabels[k],
    icon: kindIcons[k],
    value: higherEd.filter((e) => e.kind === k).length,
    index: i,
  }))

  const relevance = higherEd.map((e) => ({
    label: e.acronym,
    value: e.successRate,
  }))

  return (
    <div className="min-page">
      <div className="min-canvas">
        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Étudiants vs enseignants par région</span>
            <span className="pb-card__meta">effectifs</span>
          </div>
          <div className="pb-card__body">
            <GroupedBarChart
              data={byRegion}
              max={byRegion[0].students}
              series={[
                { key: 'students', label: 'Étudiants' },
                { key: 'teachers', label: 'Enseignants', className: 'min-chart-bar--secondary' },
              ]}
              formatValue={formatCompact}
            />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition par type d’établissement</span>
            <span className="pb-card__meta">MINESUP</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={kindSegments} size={180} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Taux de réussite par établissement</span>
            <span className="pb-card__meta">% annuel</span>
          </div>
          <div className="pb-card__body">
            <LineChart data={relevance} max={100} formatValue={(v) => `${v} %`} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Charts