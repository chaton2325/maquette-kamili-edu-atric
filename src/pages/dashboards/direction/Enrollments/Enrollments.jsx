import Card from '../../../../components/Card/Card.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { schoolStats } from '../../../../data/direction.js'
import { enrollmentByLevel } from '../../../../data/direction.js'
import { enrollmentTrend } from '../../../../data/direction.js'
import { SegmentedBar } from '../charts.jsx'
import { LineChart } from '../charts.jsx'
import '../DirectionPage.css'

const kpis = [
  {
    label: 'Effectif total',
    value: schoolStats.students.toLocaleString('fr-FR'),
    icon: '🎓',
    meta: `${schoolStats.classes} classes`,
  },
  {
    label: 'Filles',
    value: schoolStats.girls.toLocaleString('fr-FR'),
    icon: '👧',
    meta: `${Math.round((schoolStats.girls / schoolStats.students) * 100)} % des effectifs`,
  },
  {
    label: 'Garçons',
    value: schoolStats.boys.toLocaleString('fr-FR'),
    icon: '👦',
    meta: `${Math.round((schoolStats.boys / schoolStats.students) * 100)} % des effectifs`,
  },
  {
    label: 'Nouveaux inscrits',
    value: schoolStats.newStudents.toLocaleString('fr-FR'),
    icon: '🎒',
    meta: 'Rentrée 2026-2027',
  },
]

const cycleSegments = [
  { key: 'primaire', label: 'Primaire', icon: '📚', value: 610 },
  { key: 'secondaire', label: 'Secondaire', icon: '🎓', value: 630 },
]

function Enrollments() {
  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Effectifs</h1>
          <p>Suivi des inscriptions et de la répartition des élèves.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <div className="kpi-card" key={kpi.label}>
              <span className="kpi-card__icon" aria-hidden="true">
                {kpi.icon}
              </span>
              <div className="kpi-card__content">
                <span className="kpi-card__label">{kpi.label}</span>
                <span className="kpi-card__value">{kpi.value}</span>
                <span className="kpi-card__delta kpi-card__delta--up">
                  {kpi.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dir-columns--wide">
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
            <Card.Header>Cycle d’enseignement</Card.Header>
            <Card.Body>
              <SegmentedBar segments={cycleSegments} />
            </Card.Body>
          </Card>
        </section>
      </div>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Répartition par niveau</h2>
        <Table>
          <thead>
            <tr>
              <th>Niveau</th>
              <th>Cycle</th>
              <th>Effectif</th>
              <th>Garçons</th>
              <th>Filles</th>
              <th>% des effectifs</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentByLevel.map((level) => (
              <tr key={level.key}>
                <td>
                  <span aria-hidden="true">{level.icon}</span> {level.level}
                </td>
                <td>{level.cycle}</td>
                <td>{level.students}</td>
                <td>{level.boys}</td>
                <td>{level.girls}</td>
                <td>
                  {Math.round((level.students / schoolStats.students) * 100)} %
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Enrollments
