import { useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  ministry,
  ministryList,
  regions,
  years,
  mapMetrics,
  computeDisparities,
  alerts,
  alertSeverityLabels,
} from '../../../data/ministry.js'
import {
  CameroonMap,
  BarChart,
  LineChart,
  DonutChart,
  StatusSegmentedBar,
} from './charts.jsx'
import './MinistryPage.css'

function formatNumber(n) {
  return n.toLocaleString('fr-FR')
}

function formatCompact(n) {
  if (n >= 1000000) {
    return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  }
  if (n >= 1000) {
    return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  }
  return n.toLocaleString('fr-FR')
}

const severityVariant = {
  critique: 'danger',
  importante: 'warning',
  information: 'neutral',
}

function Supervision() {
  const [viewId, setViewId] = useState('MINEDUB')
  const [regionId, setRegionId] = useState('all')
  const [metricKey, setMetricKey] = useState('students')

  const view = ministry[viewId]
  const metric = mapMetrics[metricKey]
  const totalStudents = view.kpis.students
  const disparities = computeDisparities(viewId)

  const girlsRate = view.kpis.girlsRate
  const genderSegments = [
    { key: 'filles', label: 'Filles', icon: '👧', value: Math.round((totalStudents * girlsRate) / 100) },
    { key: 'garcons', label: 'Garçons', icon: '👦', value: Math.round((totalStudents * (100 - girlsRate)) / 100) },
  ]

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

  const selectedRegion = regionId === 'all' ? null : regions.find((r) => r.id === regionId)
  const selectedData = view.byRegion.find((d) => d.regionId === regionId)
  const selectedShare = selectedData ? Math.round((selectedData.students / totalStudents) * 100) : 100

  const activeAlerts = alerts.filter((alert) => alert.origin === viewId).slice(0, 3)
  const nationalAlerts = alerts.slice(0, 3)

  return (
    <div className="min-page">
      {/* Ruban de filtres (filtres Power BI) */}
      <div className="min-filters">
        <div className="min-filters__field">
          <span className="min-filters__label">Vue ministère</span>
          <div className="min-view-tabs" role="group" aria-label="Vue ministère">
            {ministryList.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`min-view-tabs__button${item.id === viewId ? ' min-view-tabs__button--active' : ''}`}
                onClick={() => {
                  setViewId(item.id)
                  setRegionId('all')
                }}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="min-year">
            Année scolaire
          </label>
          <select
            id="min-year"
            className="min-filters__select"
            defaultValue={years[1]}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="min-filters__field">
          <label className="min-filters__label" htmlFor="min-region">
            Région
          </label>
          <select
            id="min-region"
            className="min-filters__select"
            value={regionId}
            onChange={(event) => setRegionId(event.target.value)}
          >
            <option value="all">Toutes les régions</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-filters__field">
          <span className="min-filters__label">Métrique carte</span>
          <div className="min-map-metrics" role="group" aria-label="Métrique cartographique">
            {Object.values(mapMetrics).map((m) => (
              <button
                key={m.key}
                type="button"
                className={`min-map-metrics__button${m.key === metricKey ? ' min-map-metrics__button--active' : ''}`}
                onClick={() => setMetricKey(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI nationaux */}
      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Effectifs {view.id}</span>
          <span className="min-kpi__value">{formatCompact(totalStudents)}</span>
          <span className="min-kpi__meta">{formatNumber(totalStudents)} élèves</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +2,1 %</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Établissements</span>
          <span className="min-kpi__value">{formatCompact(view.kpis.schools)}</span>
          <span className="min-kpi__meta">publics & privés</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +1,4 %</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Enseignants</span>
          <span className="min-kpi__value">{formatCompact(view.kpis.teachers)}</span>
          <span className="min-kpi__meta">ratio {Math.round(totalStudents / view.kpis.teachers)}:1</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +1,9 %</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Taux de réussite</span>
          <span className="min-kpi__value">{view.kpis.successRate} %</span>
          <span className="min-kpi__meta">examen national</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +1,5 pt</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Taux de présence</span>
          <span className="min-kpi__value">{view.kpis.attendanceRate} %</span>
          <span className="min-kpi__meta">moyenne annuelle</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +0,6 pt</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Part des filles</span>
          <span className="min-kpi__value">{view.kpis.girlsRate} %</span>
          <span className="min-kpi__meta">parité des sexes</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +0,4 pt</span>
        </div>
      </div>

      {/* Canevas : carte + statistiques régionales */}
      <div className="min-canvas">
        <section className="pb-card min-canvas__span-5">
          <div className="pb-card__header">
            <span className="pb-card__title">Carte du Cameroun</span>
            <span className="pb-card__meta">{metric.label}</span>
          </div>
          <div className="pb-card__body">
            <CameroonMap
              regions={regions}
              byRegion={view.byRegion}
              metric={metric}
              selected={regionId}
              onSelect={setRegionId}
            />
          </div>
        </section>

        <section className="pb-card min-canvas__span-7">
          <div className="pb-card__header">
            <span className="pb-card__title">Statistiques régionales</span>
            <span className="pb-card__meta">{view.subtitle}</span>
          </div>
          <div className="pb-card__body">
            <div className="min-region-panel">
              <div className="min-region-panel__name">
                {selectedRegion
                  ? `${selectedRegion.name} (${selectedRegion.abbr})`
                  : 'Ensemble du pays 🇨🇲'}
              </div>
              <div className="min-region-panel__stats">
                <div className="min-region-panel__row">
                  <span>Effectifs</span>
                  <span className="min-region-panel__value">
                    {formatCompact(selectedData ? selectedData.students : totalStudents)}
                    {selectedRegion && ` (${selectedShare} % du national)`}
                  </span>
                </div>
                <div className="min-region-panel__row">
                  <span>Établissements</span>
                  <span className="min-region-panel__value">
                    {selectedData ? formatCompact(selectedData.schools) : formatCompact(view.kpis.schools)}
                  </span>
                </div>
                <div className="min-region-panel__row">
                  <span>Taux de réussite</span>
                  <span className="min-region-panel__value">
                    {selectedData ? selectedData.successRate : view.kpis.successRate} %
                  </span>
                </div>
                <div className="min-region-panel__row">
                  <span>Taux de présence</span>
                  <span className="min-region-panel__value">
                    {selectedData ? selectedData.attendanceRate : view.kpis.attendanceRate} %
                  </span>
                </div>
                <div className="min-region-panel__row">
                  <span>Part des filles</span>
                  <span className="min-region-panel__value">
                    {selectedData ? selectedData.girlsRate : view.kpis.girlsRate} %
                  </span>
                </div>
              </div>
            </div>

            <StatusSegmentedBar
              segments={[
                { key: 'filles', label: 'Filles', icon: '👧', value: genderSegments[0].value, variant: 'success' },
                { key: 'garcons', label: 'Garçons', icon: '👦', value: genderSegments[1].value, variant: 'info' },
              ]}
            />
          </div>
        </section>
      </div>

      {/* Canevas : effectifs, sexe, niveau */}
      <div className="min-canvas">
        <section className="pb-card min-canvas__span-4">
          <div className="pb-card__header">
            <span className="pb-card__title">Effectifs par région</span>
            <span className="pb-card__meta">top régions</span>
          </div>
          <div className="pb-card__body">
            <BarChart data={studentsByRegion} max={studentsByRegion[0].value} formatValue={formatCompact} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-4">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition par sexe</span>
            <span className="pb-card__meta">{view.id}</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={genderSegments} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-4">
          <div className="pb-card__header">
            <span className="pb-card__title">Répartition par niveau</span>
            <span className="pb-card__meta">{view.subtitle}</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={view.levels} />
          </div>
        </section>
      </div>

      {/* Canevas : réussite, présence */}
      <div className="min-canvas">
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
            <span className="pb-card__title">Présences — tendance</span>
            <span className="pb-card__meta">% annuel</span>
          </div>
          <div className="pb-card__body">
            <LineChart data={view.trend} max={4} formatValue={formatCompact} />
          </div>
        </section>
      </div>

      {/* Disparités */}
      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Disparités régionales</span>
          <span className="pb-card__meta">écarts vs moyenne nationale</span>
        </div>
        <div className="pb-card__body pb-card__body--flush">
          <div className="min-region-panel__stats" style={{ padding: 'var(--space-4)' }}>
            {disparities.slice(0, 6).map((item) => {
              const isLow = item.successGap < 0
              const isVeryLow = item.successGap < -2
              const fillClass = isVeryLow
                ? 'min-gauge__fill--very-low'
                : isLow
                  ? 'min-gauge__fill--low'
                  : 'min-gauge__fill'
              const level = Math.min(100, Math.max(8, 100 - item.successGap * 4))
              return (
                <div className="min-gauge" key={item.regionId}>
                  <div className="min-region-panel__row">
                    <span>
                      {item.name} · réussite {item.successRate} % · filles {item.girlsRate} %
                    </span>
                    <span className="min-region-panel__value">
                      {item.successGap >= 0 ? '+' : ''}
                      {item.successGap} pt vs national
                    </span>
                  </div>
                  <div className="min-gauge__bar">
                    <div className={`min-gauge__fill ${fillClass}`} style={{ width: `${level}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Alertes */}
      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Alertes nationales</span>
          <span className="pb-card__meta">à la une</span>
        </div>
        <div className="pb-card__body">
          <div className="min-alert-list">
            {nationalAlerts.map((alert) => (
              <div key={alert.id} className={`min-alert-item min-alert-item--${alert.severity}`}>
                <span className="min-alert-item__icon" aria-hidden="true">
                  {alert.icon}
                </span>
                <div className="min-alert-item__body">
                  <div className="min-alert-item__title">
                    {alert.title}
                    <Badge variant={severityVariant[alert.severity]}>
                      {alertSeverityLabels[alert.severity]}
                    </Badge>
                  </div>
                  <p className="min-alert-item__detail">{alert.detail}</p>
                  <p className="min-alert-item__meta">
                    {alert.origin} · {alert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeAlerts.length > 0 && (
        <p
          className="pb-card__meta"
          style={{
            textAlign: 'right',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          Données simulées à des fins de démonstration — {activeAlerts.length} alerte(s) {view.label}.
        </p>
      )}
    </div>
  )
}

export default Supervision