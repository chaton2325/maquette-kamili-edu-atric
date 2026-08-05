import { Link } from 'react-router-dom'
import Card from '../../../../components/Card/Card.jsx'
import { directionProfile } from '../../../../data/direction.js'
import { schoolStats } from '../../../../data/direction.js'
import { enrollmentByLevel } from '../../../../data/direction.js'
import { alerts } from '../../../../data/direction.js'
import { LineChart } from '../charts.jsx'
import { enrollmentTrend } from '../../../../data/direction.js'
import '../DirectionPage.css'

const kpis = [
  {
    label: 'Effectifs',
    value: schoolStats.students.toLocaleString('fr-FR'),
    delta: '+3,2 %',
    up: true,
    icon: '🎓',
  },
  {
    label: 'Enseignants',
    value: schoolStats.teachers,
    delta: '+1,5 %',
    up: true,
    icon: '👩‍🏫',
  },
  {
    label: 'Taux de présence',
    value: `${schoolStats.attendanceRate} %`,
    delta: '+0,8 %',
    up: true,
    icon: '🗓️',
  },
  {
    label: 'Moyenne générale',
    value: `${schoolStats.averageGrade}/20`,
    delta: '+0,4',
    up: true,
    icon: '🏆',
  },
  {
    label: 'Taux de réussite',
    value: `${schoolStats.successRate} %`,
    delta: '+2 %',
    up: true,
    icon: '✅',
  },
  {
    label: 'Taux de recouvrement',
    value: `${schoolStats.recoveryRate} %`,
    delta: '+3 %',
    up: true,
    icon: '💳',
  },
]

const levelIcons = {
  maternelle: '🧸',
  primaire: '📚',
  college: '🎒',
  lycee: '🎓',
}

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function Home() {
  const activeAlerts = alerts
    .filter((alert) => alert.status === 'active')
    .slice(0, 4)
  const totalStudents = enrollmentByLevel.reduce(
    (sum, level) => sum + level.students,
    0,
  )

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Bonjour, {directionProfile.firstName} 👋</h1>
          <p>
            {directionProfile.title} · {directionProfile.school}
          </p>
        </div>
      </div>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Vue d’ensemble de l’établissement</h2>
        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <div className="kpi-card" key={kpi.label}>
              <span
                className="kpi-card__icon"
                aria-hidden="true"
              >
                {kpi.icon}
              </span>
              <div className="kpi-card__content">
                <span className="kpi-card__label">{kpi.label}</span>
                <span className="kpi-card__value">{kpi.value}</span>
                <span
                  className={`kpi-card__delta ${kpi.up ? 'kpi-card__delta--up' : 'kpi-card__delta--down'}`}
                >
                  {kpi.up ? '▲' : '▼'} {kpi.delta} vs mois dernier
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dir-columns">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Évolution des effectifs</Card.Header>
            <Card.Body>
              <LineChart data={enrollmentTrend} max={1300} />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Répartition par cycle</Card.Header>
            <Card.Body>
              <ul className="dir-list">
                {enrollmentByLevel.map((level) => (
                  <li key={level.key} className="dir-list__item">
                    <span>
                      <span aria-hidden="true">{levelIcons[level.key]}</span>{' '}
                      {level.level}
                    </span>
                    <span className="dir-list__meta">
                      {level.students} élèves
                    </span>
                  </li>
                ))}
                <li className="dir-list__item">
                  <strong>Total</strong>
                  <strong>{totalStudents} élèves</strong>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </section>
      </div>

      <div className="dir-columns">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Alertes actives</Card.Header>
            <Card.Body>
              <ul className="dir-list">
                {activeAlerts.map((alert) => (
                  <li key={alert.id} className="dir-list__item">
                    <span>
                      <span aria-hidden="true">{alert.icon}</span> {alert.title}
                    </span>
                    <span className="dir-list__meta">{alert.date}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dashboard/direction/alerts" className="dir-list__link">
                Voir toutes les alertes →
              </Link>
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Actions rapides</Card.Header>
            <Card.Body>
              <ul className="dir-list">
                <li className="dir-list__item">
                  <span>👩‍🏫 Nouvel enseignant</span>
                  <span className="dir-list__meta">à créer</span>
                </li>
                <li className="dir-list__item">
                  <span>💳 Paiements en retard</span>
                  <span className="dir-list__meta">
                    {formatAmount(1200000)}
                  </span>
                </li>
                <li className="dir-list__item">
                  <span>📄 Générer le rapport</span>
                  <span className="dir-list__meta">mensuel</span>
                </li>
                <li className="dir-list__item">
                  <span>🏫 Affectation des salles</span>
                  <span className="dir-list__meta">Trimestre 2</span>
                </li>
              </ul>
              <Link to="/dashboard/direction/reports" className="dir-list__link">
                Accéder aux rapports →
              </Link>
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Home
