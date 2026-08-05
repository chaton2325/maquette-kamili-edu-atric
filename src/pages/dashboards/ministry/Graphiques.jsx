import { useState } from 'react'
import {
  ministry,
  ministryList,
  regions,
} from '../../../data/ministry.js'
import {
  BarChart,
  LineChart,
  GroupedBarChart,
  DonutChart,
} from './charts.jsx'
import './MinistryPage.css'

function formatCompact(n) {
  if (n >= 1000000) {
    return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  }
  if (n >= 1000) {
    return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  }
  return n.toLocaleString('fr-FR')
}

function Graphiques() {
  const [viewId, setViewId] = useState('MINEDUB')
  const view = ministry[viewId]

  const studentsByRegion = [...view.byRegion]
    .sort((a, b) => b.students - a.students)
    .map((item) => {
      const region = regions.find((r) => r.id === item.regionId)
      return { label: region.abbr, value: item.students }
    })

  const successByRegion = [...view.byRegion]
    .sort((a, b) => b.successRate - a.successRate)
    .map((item) => {
      const region = regions.find((r) => r.id === item.regionId)
      return { label: region.abbr, value: item.successRate }
    })

  const genderByRegion = [...view.byRegion]
    .sort((a, b) => b.students - a.students)
    .map((item) => {
      const region = regions.find((r) => r.id === item.regionId)
      return {
        label: region.abbr,
        filles: Math.round((item.students * item.girlsRate) / 100),
        garcons: item.students - Math.round((item.students * item.girlsRate) / 100),
      }
    })

  const girlsRate = view.kpis.girlsRate
  const genderSegments = [
    { key: 'filles', label: 'Filles', icon: '👧', value: Math.round((view.kpis.students * girlsRate) / 100) },
    { key: 'garcons', label: 'Garçons', icon: '👦', value: Math.round((view.kpis.students * (100 - girlsRate)) / 100) },
  ]

  return (
    <div className="min-page">
      <div className="min-filters">
        <div className="min-filters__field">
          <span className="min-filters__label">Vue ministère</span>
          <div className="min-view-tabs" role="group" aria-label="Vue ministère">
            {ministryList.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`min-view-tabs__button${item.id === viewId ? ' min-view-tabs__button--active' : ''}`}
                onClick={() => setViewId(item.id)}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.id}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="pb-card__meta" style={{ alignSelf: 'center' }}>
          {view.label} · {view.subtitle} — visualisations nationales
        </p>
      </div>

      <div className="min-canvas">
        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Évolution des effectifs</span>
            <span className="pb-card__meta">{view.id}</span>
          </div>
          <div className="pb-card__body">
            <LineChart data={view.trend} max={4} formatValue={formatCompact} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Effectifs par région</span>
            <span className="pb-card__meta">10 régions</span>
          </div>
          <div className="pb-card__body">
            <BarChart data={studentsByRegion} max={studentsByRegion[0].value} formatValue={formatCompact} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Taux de réussite par région</span>
            <span className="pb-card__meta">% aux examens</span>
          </div>
          <div className="pb-card__body">
            <BarChart data={successByRegion} max={100} formatValue={(v) => `${v} %`} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Filles vs Garçons par région</span>
            <span className="pb-card__meta">effectifs</span>
          </div>
          <div className="pb-card__body">
            <GroupedBarChart
              data={genderByRegion}
              max={genderByRegion[0]?.filles + genderByRegion[0]?.garcons || 1}
              series={[
                { key: 'filles', label: 'Filles' },
                { key: 'garcons', label: 'Garçons', className: 'min-chart-bar--secondary' },
              ]}
              formatValue={formatCompact}
            />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition par sexe</span>
            <span className="pb-card__meta">{view.id}</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={genderSegments} size={180} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-6">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition par niveau</span>
            <span className="pb-card__meta">{view.subtitle}</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={view.levels} size={180} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Graphiques