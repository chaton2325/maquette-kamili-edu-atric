import Card from '../../../../components/Card/Card.jsx'
import { schoolStats } from '../../../../data/direction.js'
import { attendanceByClass } from '../../../../data/direction.js'
import { attendanceTrend } from '../../../../data/direction.js'
import { BarChart } from '../charts.jsx'
import { LineChart } from '../charts.jsx'
import '../DirectionPage.css'

function attendanceByClassData() {
  return attendanceByClass.map((item) => {
    const total = item.present + item.absent + item.retard
    return {
      label: item.label,
      value: total > 0 ? Math.round((item.present / total) * 100) : 0,
    }
  })
}

function Attendance() {
  const totals = attendanceByClass.reduce(
    (acc, item) => ({
      present: acc.present + item.present,
      absent: acc.absent + item.absent,
      retard: acc.retard + item.retard,
    }),
    { present: 0, absent: 0, retard: 0 },
  )
  const grandTotal = totals.present + totals.absent + totals.retard
  const globalRate = Math.round((totals.present / grandTotal) * 100)

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Présences</h1>
          <p>Assiduité des élèves · {schoolStats.attendanceRate} % de présence moyenne.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              ✅
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Présents</span>
              <span className="kpi-card__value">{totals.present}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                aujourd’hui
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--danger" aria-hidden="true">
              ❌
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Absents</span>
              <span className="kpi-card__value">{totals.absent}</span>
              <span className="kpi-card__delta kpi-card__delta--down">
                aujourd’hui
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              ⏰
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">En retard</span>
              <span className="kpi-card__value">{totals.retard}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                aujourd’hui
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              📈
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Taux de présence</span>
              <span className="kpi-card__value">{globalRate} %</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +0,8 % vs mois dernier
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="dir-columns--wide">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Présence par classe</Card.Header>
            <Card.Body>
              <BarChart
                data={attendanceByClassData()}
                max={100}
                formatValue={(value) => `${value}%`}
              />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Évolution annuelle</Card.Header>
            <Card.Body>
              <LineChart
                data={attendanceTrend}
                max={100}
                formatValue={(value) => `${value}%`}
              />
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default Attendance