import Badge from '../../../components/Badge/Badge.jsx'
import { establishments, kindIcons } from '../../../data/national.js'
import { alerts, alertSeverityLabels } from '../../../data/ministry.js'
import '../ministry/MinistryPage.css'
import './MinesupPage.css'

const higherEd = establishments.filter((e) => e.ministry === 'MINESUP')

const severityVariant = {
  critique: 'danger',
  importante: 'warning',
  information: 'neutral',
}

function Alerts() {
  const minesupAlerts = alerts.filter((a) => a.origin === 'MINESUP')

  return (
    <div className="min-page">
      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Alertes actives</span>
          <span className="min-kpi__value">{minesupAlerts.length}</span>
          <span className="min-kpi__meta">flux MINESUP</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Critiques</span>
          <span className="min-kpi__value">{minesupAlerts.filter((a) => a.severity === 'critique').length}</span>
          <span className="min-kpi__delta min-kpi__delta--down">action requise</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Universités</span>
          <span className="min-kpi__value">{higherEd.length}</span>
          <span className="min-kpi__meta">sous supervision</span>
        </div>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Alertes de l’enseignement supérieur</span>
          <span className="pb-card__meta">flux national</span>
        </div>
        <div className="pb-card__body">
          <div className="min-alert-list">
            {minesupAlerts.map((alert) => (
              <div key={alert.id} className={`min-alert-item min-alert-item--${alert.severity}`}>
                <span className="min-alert-item__icon" aria-hidden="true">{alert.icon}</span>
                <div className="min-alert-item__body">
                  <div className="min-alert-item__title">
                    {alert.title}
                    <Badge variant={severityVariant[alert.severity]}>{alertSeverityLabels[alert.severity]}</Badge>
                  </div>
                  <p className="min-alert-item__detail">{alert.detail}</p>
                  <p className="min-alert-item__meta">MINESUP · {alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="pb-card__meta">
        Données simulées à des fins de démonstration —{' '}
        {[...new Set(higherEd.map((e) => e.kind))].map((k) => kindIcons[k]).join(' ')}
      </p>
    </div>
  )
}

export default Alerts