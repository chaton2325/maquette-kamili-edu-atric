import Badge from '../../../../components/Badge/Badge.jsx'
import Table from '../../../../components/Table/Table.jsx'
import Card from '../../../../components/Card/Card.jsx'
import { paymentSummary } from '../../../../data/direction.js'
import { payments } from '../../../../data/direction.js'
import { paymentStatusLabels } from '../../../../data/direction.js'
import { StatusSegmentedBar } from '../charts.jsx'
import '../DirectionPage.css'

const statusVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

const statusSegments = [
  { key: 'a-jour', label: 'À jour', icon: '✅', value: 4, variant: 'success' },
  { key: 'en-attente', label: 'En attente', icon: '⏳', value: 2, variant: 'warning' },
  { key: 'en-retard', label: 'En retard', icon: '⚠️', value: 2, variant: 'danger' },
]

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function Payments() {
  const overduePayments = payments.filter(
    (payment) => payment.status === 'en-retard',
  ).length

  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Paiements</h1>
          <p>Suivi des frais de scolarité et de la trésorerie encaissée.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              💰
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Encaissé</span>
              <span className="kpi-card__value">
                {formatAmount(paymentSummary.collected)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +12 % vs l’an dernier
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              ⏳
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">En attente</span>
              <span className="kpi-card__value">
                {formatAmount(paymentSummary.pending)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                à recouvrer
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--danger" aria-hidden="true">
              ⚠️
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">En retard</span>
              <span className="kpi-card__value">
                {formatAmount(paymentSummary.overdue)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--down">
                {overduePayments} paiements concernés
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              📈
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Taux de recouvrement</span>
              <span className="kpi-card__value">{paymentSummary.recoveryRate} %</span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +3 % vs l’an dernier
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="dir-page__section">
        <Card>
          <Card.Header>Statut des paiements récents</Card.Header>
          <Card.Body>
            <StatusSegmentedBar segments={statusSegments} />
          </Card.Body>
        </Card>
      </section>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Paiements récents</h2>
        <Table>
          <thead>
            <tr>
              <th>Élève</th>
              <th>Niveau</th>
              <th>Motif</th>
              <th>Montant</th>
              <th>Échéance</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.student}</td>
                <td>{payment.level}</td>
                <td>{payment.label}</td>
                <td>{formatAmount(payment.amount)}</td>
                <td>{payment.dueDate}</td>
                <td>
                  <Badge variant={statusVariant[payment.status]}>
                    {paymentStatusLabels[payment.status]}
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

export default Payments