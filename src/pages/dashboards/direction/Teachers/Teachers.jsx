import Badge from '../../../../components/Badge/Badge.jsx'
import Table from '../../../../components/Table/Table.jsx'
import Card from '../../../../components/Card/Card.jsx'
import { schoolStats } from '../../../../data/direction.js'
import { staff } from '../../../../data/direction.js'
import { staffTypeLabels } from '../../../../data/direction.js'
import { SegmentedBar } from '../charts.jsx'
import '../DirectionPage.css'

const typeVariant = {
  permanent: 'primary',
  contractuel: 'accent',
}

const statusVariant = {
  present: 'success',
  absent: 'danger',
  retard: 'warning',
}

const statusLabels = {
  present: 'Présent',
  absent: 'Absent',
  retard: 'En retard',
}

const contractSegments = [
  { key: 'permanent', label: 'Permanents', icon: '📘', value: 51 },
  { key: 'contractuel', label: 'Contractuels', icon: '📄', value: 17 },
]

function Teachers() {
  const presentToday = staff.filter((item) => item.status === 'present').length

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Enseignants</h1>
          <p>Équipe pédagogique et assiduité du jour.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              👩‍🏫
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Enseignants</span>
              <span className="kpi-card__value">{schoolStats.teachers}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +1,5 % vs l’an dernier
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              ✅
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Présents aujourd’hui</span>
              <span className="kpi-card__value">{presentToday}</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                sur {staff.length} affichés
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              📘
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Enseignants permanents</span>
              <span className="kpi-card__value">51</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                {Math.round((51 / schoolStats.teachers) * 100)} % de l’équipe
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              👥
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Élèves par enseignant</span>
              <span className="kpi-card__value">
                {Math.round(schoolStats.students / schoolStats.teachers)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ratio idéal ≈ 20
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="dir-columns">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Type de contrat</Card.Header>
            <Card.Body>
              <SegmentedBar segments={contractSegments} />
            </Card.Body>
          </Card>
        </section>
      </div>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Équipe pédagogique</h2>
        <Table>
          <thead>
            <tr>
              <th>Enseignant</th>
              <th>Matière</th>
              <th>Classes</th>
              <th>Contrat</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item) => (
              <tr key={item.id}>
                <td>
                  <span aria-hidden="true">{item.avatar}</span> {item.name}
                </td>
                <td>{item.subject}</td>
                <td>{item.classes}</td>
                <td>
                  <Badge variant={typeVariant[item.type]}>
                    {staffTypeLabels[item.type]}
                  </Badge>
                </td>
                <td>
                  <Badge variant={statusVariant[item.status]}>
                    {statusLabels[item.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Teachers
