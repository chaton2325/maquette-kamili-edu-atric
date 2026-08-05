import { useState } from 'react'
import Badge from '../../../components/Badge/Badge.jsx'
import {
  alerts,
  alertSeverityLabels,
  alertOriginIcons,
  ministryList,
} from '../../../data/ministry.js'
import './MinistryPage.css'

const severityVariant = {
  critique: 'danger',
  importante: 'warning',
  information: 'neutral',
}

function Alerts() {
  const [origin, setOrigin] = useState('all')

  const filtered =
    origin === 'all' ? alerts : alerts.filter((alert) => alert.origin === origin)

  const criticalCount = alerts.filter(
    (alert) => alert.severity === 'critique',
  ).length

  return (
    <div className="min-page">
      <div className="min-filters">
        <div className="min-filters__field">
          <span className="min-filters__label">Ministère</span>
          <div className="min-view-tabs" role="group" aria-label="Ministère">
            <button
              type="button"
              className={`min-view-tabs__button${origin === 'all' ? ' min-view-tabs__button--active' : ''}`}
              onClick={() => setOrigin('all')}
            >
              🇨🇲 Tous
            </button>
            {ministryList.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`min-view-tabs__button${origin === item.id ? ' min-view-tabs__button--active' : ''}`}
                onClick={() => setOrigin(item.id)}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Alertes actives</span>
          <span className="min-kpi__value">{alerts.length}</span>
          <span className="min-kpi__meta">toutes ministères</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Critiques</span>
          <span className="min-kpi__value">{criticalCount}</span>
          <span className="min-kpi__delta min-kpi__delta--down">action requise</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Vue filtrée</span>
          <span className="min-kpi__value">{filtered.length}</span>
          <span className="min-kpi__meta">
            {origin === 'all' ? 'toutes les vues' : origin}
          </span>
        </div>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Alertes du système éducatif</span>
          <span className="pb-card__meta">flux national</span>
        </div>
        <div className="pb-card__body">
          <div className="min-alert-list">
            {filtered.map((alert) => (
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
                    {alertOriginIcons[alert.origin]} {alert.origin} · {alert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Alerts