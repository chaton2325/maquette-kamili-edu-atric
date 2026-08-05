import Card from '../../../../components/Card/Card.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { schoolStats } from '../../../../data/direction.js'
import { resultsByClass } from '../../../../data/direction.js'
import { mentionDistribution } from '../../../../data/direction.js'
import { topStudents } from '../../../../data/direction.js'
import { BarChart } from '../charts.jsx'
import { DonutChart } from '../charts.jsx'
import '../DirectionPage.css'

function Results() {
  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Résultats</h1>
          <p>Performances académiques par classe et mention.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              🏆
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Moyenne générale</span>
              <span className="kpi-card__value">{schoolStats.averageGrade}/20</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +0,4 vs Trimestre 1
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              ✅
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Taux de réussite</span>
              <span className="kpi-card__value">{schoolStats.successRate} %</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +2 % vs l’an dernier
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              🌟
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Mentions (TB + B)</span>
              <span className="kpi-card__value">
                {mentionDistribution[0].value + mentionDistribution[1].value}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                élèves concernés
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--danger" aria-hidden="true">
              ⚠️
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Insuffisant</span>
              <span className="kpi-card__value">
                {mentionDistribution[4].value}
              </span>
              <span className="kpi-card__delta kpi-card__delta--down">
                à accompagner
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="dir-columns--wide">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Moyenne par classe</Card.Header>
            <Card.Body>
              <BarChart
                data={resultsByClass.map((item) => ({
                  label: item.label,
                  value: item.average,
                }))}
                max={20}
                formatValue={(value) => `${value}`}
              />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Distribution des mentions</Card.Header>
            <Card.Body>
              <DonutChart segments={mentionDistribution} />
            </Card.Body>
          </Card>
        </section>
      </div>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Classement des meilleurs élèves</h2>
        <Table>
          <thead>
            <tr>
              <th>Rang</th>
              <th>Élève</th>
              <th>Niveau</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.rank}</td>
                <td>{student.name}</td>
                <td>{student.level}</td>
                <td>{student.average}/20</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Results