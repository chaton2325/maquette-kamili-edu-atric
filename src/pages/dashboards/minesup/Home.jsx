import Badge from '../../../components/Badge/Badge.jsx'
import {
  establishments,
  kindLabels,
  kindIcons,
  regionName,
} from '../../../data/national.js'
import { regions, alerts, alertSeverityLabels } from '../../../data/ministry.js'
import { BarChart, DonutChart } from '../ministry/charts.jsx'
import '../ministry/MinistryPage.css'
import './MinesupPage.css'

function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`
  if (n >= 1000) return `${(n / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} k`
  return n.toLocaleString('fr-FR')
}

const higherEd = establishments.filter((e) => e.ministry === 'MINESUP')
const totalStudents = higherEd.reduce((s, e) => s + e.students, 0)
const totalTeachers = higherEd.reduce((s, e) => s + e.teachers, 0)
const avgSuccess = Math.round(higherEd.reduce((s, e) => s + e.successRate, 0) / higherEd.length)

const severityVariant = {
  critique: 'danger',
  importante: 'warning',
  information: 'neutral',
}

function Home() {
  const byRegion = regions
    .map((r) => ({
      label: r.abbr,
      value: higherEd.filter((e) => e.regionId === r.id).reduce((s, e) => s + e.students, 0),
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value)

  const kindSegments = ['universite', 'grande-ecole', 'institut'].map((k, i) => ({
    key: k,
    label: kindLabels[k],
    icon: kindIcons[k],
    value: higherEd.filter((e) => e.kind === k).length,
    index: i,
  }))

  const minesupAlerts = alerts.filter((a) => a.origin === 'MINESUP')

  return (
    <div className="min-page">
      <div className="minesup-hero">
        <div>
          <h1 className="minesup-hero__title">Enseignement Supérieur 🇨🇲</h1>
          <p className="minesup-hero__subtitle">
            Universités, grandes écoles et instituts — supervision du MINESUP.
          </p>
        </div>
        <Badge variant="accent">{higherEd.length} établissements</Badge>
      </div>

      <div className="min-kpi-grid">
        <div className="min-kpi">
          <span className="min-kpi__label">Établissements</span>
          <span className="min-kpi__value">{higherEd.length}</span>
          <span className="min-kpi__meta">universités & grandes écoles</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Étudiants</span>
          <span className="min-kpi__value">{formatCompact(totalStudents)}</span>
          <span className="min-kpi__delta min-kpi__delta--up">▲ +2,4 %</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Enseignants-chercheurs</span>
          <span className="min-kpi__value">{formatCompact(totalTeachers)}</span>
          <span className="min-kpi__meta">ratio {Math.round(totalStudents / totalTeachers)}:1</span>
        </div>
        <div className="min-kpi">
          <span className="min-kpi__label">Taux de réussite</span>
          <span className="min-kpi__value">{avgSuccess} %</span>
          <span className="min-kpi__meta">moyenne annuelle</span>
        </div>
      </div>

      <div className="min-canvas">
        <section className="pb-card min-canvas__span-7">
          <div className="pb-card__header">
            <span className="pb-card__title">Étudiants par région</span>
            <span className="pb-card__meta">effectifs inscrits</span>
          </div>
          <div className="pb-card__body">
            <BarChart data={byRegion} max={byRegion[0].value} formatValue={formatCompact} />
          </div>
        </section>

        <section className="pb-card min-canvas__span-5">
          <div className="pb-card__header">
            <span className="pb-card__title">Types d’établissements</span>
            <span className="pb-card__meta">MINESUP</span>
          </div>
          <div className="pb-card__body">
            <DonutChart segments={kindSegments} />
          </div>
        </section>
      </div>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Universités et grandes écoles</span>
          <span className="pb-card__meta">toutes régions</span>
        </div>
        <div className="pb-card__body">
          <div className="uni-grid">
            {higherEd.map((e) => (
              <div key={e.id} className="uni-card">
                <div className="uni-card__head">
                  <span className="uni-card__icon" aria-hidden="true">{kindIcons[e.kind]}</span>
                  <div className="uni-card__title">
                    <strong>{e.name}</strong>
                    <span>{regionName(e.regionId)} · {e.city}</span>
                  </div>
                </div>
                <div className="uni-card__stats">
                  <span>🎓 {formatCompact(e.students)}</span>
                  <span>👩‍🏫 {e.teachers}</span>
                  <span>✅ {e.successRate} %</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-card min-canvas__span-12">
        <div className="pb-card__header">
          <span className="pb-card__title">Alertes MINESUP</span>
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
    </div>
  )
}

export default Home