import Card from '../../../../components/Card/Card.jsx'
import { schoolStats } from '../../../../data/direction.js'
import { enrollmentTrend } from '../../../../data/direction.js'
import { enrollmentByLevel } from '../../../../data/direction.js'
import { attendanceTrend } from '../../../../data/direction.js'
import { resultsByClass } from '../../../../data/direction.js'
import { mentionDistribution } from '../../../../data/direction.js'
import { financeMonthly } from '../../../../data/direction.js'
import { BarChart } from '../charts.jsx'
import { LineChart } from '../charts.jsx'
import { GroupedBarChart } from '../charts.jsx'
import { DonutChart } from '../charts.jsx'
import '../DirectionPage.css'

const enrollmentByLevelChart = enrollmentByLevel.map((level) => ({
  key: level.key,
  label: level.level,
  icon: level.icon,
  value: level.students,
}))

function Charts() {
  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Graphiques</h1>
          <p>Toutes les tendances clés de l’établissement au même endroit.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Indicateurs suivis</span>
          <span className="stat-tile__value">12</span>
          <span className="stat-tile__meta">mis à jour quotidiennement</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Moyenne générale</span>
          <span className="stat-tile__value">{schoolStats.averageGrade}/20</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Taux de présence</span>
          <span className="stat-tile__value">{schoolStats.attendanceRate} %</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Taux de réussite</span>
          <span className="stat-tile__value">{schoolStats.successRate} %</span>
        </div>
      </div>

      <div className="dir-columns">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Effectifs — évolution annuelle</Card.Header>
            <Card.Body>
              <LineChart data={enrollmentTrend} max={1300} />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Effectifs par niveau</Card.Header>
            <Card.Body>
              <BarChart
                data={enrollmentByLevelChart}
                max={500}
                formatValue={(value) => `${value}`}
              />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Présence — évolution annuelle</Card.Header>
            <Card.Body>
              <LineChart
                data={attendanceTrend}
                max={100}
                formatValue={(value) => `${value}%`}
              />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Moyennes par classe</Card.Header>
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
            <Card.Header>Recettes vs dépenses (mensuel)</Card.Header>
            <Card.Body>
              <GroupedBarChart
                data={financeMonthly}
                max={14000000}
                series={[
                  { key: 'revenue', label: 'Recettes' },
                  {
                    key: 'expenses',
                    label: 'Dépenses',
                    className: 'dir-chart-bar--secondary',
                  },
                ]}
                formatValue={(value) =>
                  `${(value / 1000000).toLocaleString('fr-FR')} M`
                }
              />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Répartition par cycle</Card.Header>
            <Card.Body>
              <DonutChart
                segments={enrollmentByLevelChart}
                size={180}
              />
            </Card.Body>
          </Card>
        </section>
      </div>

      <section className="dir-page__section">
        <Card>
          <Card.Header>Distribution des mentions</Card.Header>
          <Card.Body>
            <DonutChart segments={mentionDistribution} size={220} />
          </Card.Body>
        </Card>
      </section>
    </div>
  )
}

export default Charts