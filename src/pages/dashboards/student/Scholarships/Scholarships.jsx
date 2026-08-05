import Badge from '../../../../components/Badge/Badge.jsx'
import Table from '../../../../components/Table/Table.jsx'
import {
  scholarships,
  scholarshipStatusLabels,
} from '../../../../data/scholarships.js'
import '../StudentPage.css'

const statusVariant = {
  attribuee: 'success',
  'en-attente': 'warning',
  refusee: 'danger',
}

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function Scholarships() {
  const totalAwarded = scholarships
    .filter((scholarship) => scholarship.status === 'attribuee')
    .reduce((sum, scholarship) => sum + scholarship.amount, 0)

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Bourses</h1>
          <p>Suivi de vos demandes et attributions de bourses.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Montant total attribué</span>
          <span className="stat-tile__value">{formatAmount(totalAwarded)}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Bourses actives</span>
          <span className="stat-tile__value">
            {scholarships.filter((s) => s.status === 'attribuee').length}
          </span>
        </div>
      </div>

      <section className="student-page__section">
        <Table>
          <thead>
            <tr>
              <th>Bourse</th>
              <th>Période</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship) => (
              <tr key={scholarship.id}>
                <td>{scholarship.name}</td>
                <td>{scholarship.period}</td>
                <td>{formatAmount(scholarship.amount)}</td>
                <td>
                  <Badge variant={statusVariant[scholarship.status]}>
                    {scholarshipStatusLabels[scholarship.status]}
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

export default Scholarships
