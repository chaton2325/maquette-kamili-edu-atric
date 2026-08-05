import { children } from '../../../../data/children.js'
import { results } from '../../../../data/results.js'
import { payments, paymentStatusLabels } from '../../../../data/payments.js'
import { AttendanceBarChart, GradeTrendMiniChart, StatusStackedBar } from './charts.jsx'
import '../ParentPage.css'
import './Statistics.css'

const termShortLabels = {
  'Trimestre 1': 'T1',
  'Trimestre 2': 'T2',
}

const statusIcons = {
  'a-jour': '✅',
  'en-attente': '⏳',
  'en-retard': '⚠️',
}

function Statistics() {
  const attendanceData = children.map((child) => ({
    label: child.firstName,
    value: child.attendanceRate,
  }))

  const trendsByChild = children.map((child) => ({
    child,
    points: results
      .filter((result) => result.childId === child.id)
      .map((result) => ({
        label: termShortLabels[result.term] ?? result.term,
        value: result.average,
      })),
  }))

  const paymentSegments = ['a-jour', 'en-attente', 'en-retard'].map((status) => ({
    key: status,
    label: paymentStatusLabels[status],
    icon: statusIcons[status],
    value: payments.filter((payment) => payment.status === status).length,
  }))

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Statistiques</h1>
          <p>Analyse de la présence, des résultats et des paiements.</p>
        </div>
      </div>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">Présence par enfant</h2>
        <div className="chart-card">
          <AttendanceBarChart data={attendanceData} />
        </div>
      </section>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">
          Évolution de la moyenne générale
        </h2>
        <div className="chart-grid">
          {trendsByChild.map(({ child, points }) => (
            <div key={child.id} className="chart-card">
              <span className="chart-card__title">
                {child.avatar} {child.firstName}
              </span>
              {points.length >= 2 ? (
                <>
                  <GradeTrendMiniChart points={points} />
                  <span className="chart-card__caption">
                    Dernière moyenne : {points[points.length - 1].value}/20
                  </span>
                </>
              ) : (
                <span className="chart-card__caption">
                  Pas encore de notes enregistrées.
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">
          Répartition des paiements
        </h2>
        <div className="chart-card">
          <StatusStackedBar segments={paymentSegments} />
        </div>
      </section>
    </div>
  )
}

export default Statistics
