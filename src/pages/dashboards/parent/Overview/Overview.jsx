import Badge from '../../../../components/Badge/Badge.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { children } from '../../../../data/children.js'
import { payments, paymentStatusLabels } from '../../../../data/payments.js'
import { grades } from '../../../../data/grades.js'
import '../ParentPage.css'

const paymentVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

function childName(childId) {
  const child = children.find((item) => item.id === childId)
  return child ? `${child.firstName} ${child.lastName}` : '—'
}

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function Overview() {
  const averageAttendance = Math.round(
    children.reduce((sum, child) => sum + child.attendanceRate, 0) /
      children.length,
  )

  const gradedChildren = children.filter(
    (child) => child.averageGrade !== null,
  )
  const averageGrade = (
    gradedChildren.reduce((sum, child) => sum + child.averageGrade, 0) /
    gradedChildren.length
  ).toFixed(1)

  const pendingPayments = payments.filter(
    (payment) => payment.status !== 'a-jour',
  ).length

  const recentPayments = payments.slice(0, 5)
  const recentGrades = grades.slice(0, 5)

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Tableau de bord</h1>
          <p>Vue d’ensemble de la scolarité de vos enfants.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Enfants inscrits</span>
          <span className="stat-tile__value">{children.length}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Présence moyenne</span>
          <span className="stat-tile__value">{averageAttendance}%</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Paiements à traiter</span>
          <span className="stat-tile__value">{pendingPayments}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Moyenne générale</span>
          <span className="stat-tile__value">{averageGrade}/20</span>
        </div>
      </div>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">Paiements récents</h2>
        <Table>
          <thead>
            <tr>
              <th>Enfant</th>
              <th>Motif</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{childName(payment.childId)}</td>
                <td>{payment.label}</td>
                <td>{formatAmount(payment.amount)}</td>
                <td>
                  <Badge variant={paymentVariant[payment.status]}>
                    {paymentStatusLabels[payment.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="parent-page__section">
        <h2 className="parent-page__section-title">Dernières notes</h2>
        <Table>
          <thead>
            <tr>
              <th>Enfant</th>
              <th>Matière</th>
              <th>Trimestre</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {recentGrades.map((grade) => (
              <tr key={grade.id}>
                <td>{childName(grade.childId)}</td>
                <td>{grade.subject}</td>
                <td>{grade.term}</td>
                <td>{grade.score}/20</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Overview
