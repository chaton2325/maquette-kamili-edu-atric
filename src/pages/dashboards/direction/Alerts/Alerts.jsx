import Badge from '../../../../components/Badge/Badge.jsx'
import { alerts } from '../../../../data/direction.js'
import { alertSeverityLabels } from '../../../../data/direction.js'
import '../DirectionPage.css'

const severityVariant = {
  critique: 'danger',
  importante: 'warning',
  information: 'neutral',
}

const statusLabels = {
  active: 'Active',
  traite: 'Traitée',
}

function Alerts() {
  const activeCount = alerts.filter((alert) => alert.status === 'active').length
  const criticalCount = alerts.filter(
    (alert) => alert.severity === 'critique',
  ).length

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Alertes</h1>
          <p>Événements nécessitant l’attention de la direction.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              🔔
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Alertes actives</span>
              <span className="kpi-card__value">{activeCount}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                à traiter
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--danger" aria-hidden="true">
              🚨
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Critiques</span>
              <span className="kpi-card__value">{criticalCount}</span>
              <span className="kpi-card__delta kpi-card__delta--down">
                action requise
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              ✅
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Traitée cette semaine</span>
              <span className="kpi-card__value">
                {alerts.filter((alert) => alert.status === 'traite').length}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                bon suivi
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              ⚡
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Dernière alerte</span>
              <span className="kpi-card__value">
                {alerts[0]?.date ?? '—'}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                la plus récente
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Toutes les alertes</h2>
        <div className="dir-alert-list">
          {alerts.map((alert) => (
            <article
              key={alert.id}
              className={`dir-alert-item dir-alert-item--${alert.severity}`}
            >
              <span className="dir-alert-item__icon" aria-hidden="true">
                {alert.icon}
              </span>
              <div className="dir-alert-item__body">
                <div className="dir-alert-item__title">
                  {alert.title}
                  <Badge variant={severityVariant[alert.severity]}>
                    {alertSeverityLabels[alert.severity]}
                  </Badge>
                </div>
                <p className="dir-alert-item__detail">{alert.detail}</p>
                <p className="dir-alert-item__meta">
                  {alert.date} · {statusLabels[alert.status]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Alerts