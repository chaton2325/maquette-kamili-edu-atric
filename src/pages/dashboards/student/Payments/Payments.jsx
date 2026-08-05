import { useState } from 'react'
import Badge from '../../../../components/Badge/Badge.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Table from '../../../../components/Table/Table.jsx'
import {
  studentPayments as initialPayments,
  paymentStatusLabels,
} from '../../../../data/studentPayments.js'
import '../StudentPage.css'

const paymentVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function Payments() {
  const [payments, setPayments] = useState(initialPayments)

  const totalDue = payments
    .filter((payment) => payment.status !== 'a-jour')
    .reduce((sum, payment) => sum + payment.amount, 0)

  function handlePay(id) {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, status: 'a-jour' } : payment,
      ),
    )
  }

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Paiements</h1>
          <p>Frais de scolarité et autres frais scolaires.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile__label">Montant restant dû</span>
          <span className="stat-tile__value">{formatAmount(totalDue)}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile__label">Paiements en retard</span>
          <span className="stat-tile__value">
            {payments.filter((payment) => payment.status === 'en-retard').length}
          </span>
        </div>
      </div>

      <section className="student-page__section">
        <Table>
          <thead>
            <tr>
              <th>Motif</th>
              <th>Montant</th>
              <th>Échéance</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.label}</td>
                <td>{formatAmount(payment.amount)}</td>
                <td>{formatDate(payment.dueDate)}</td>
                <td>
                  <Badge variant={paymentVariant[payment.status]}>
                    {paymentStatusLabels[payment.status]}
                  </Badge>
                </td>
                <td>
                  {payment.status === 'a-jour' ? (
                    <Button variant="ghost" size="sm" disabled>
                      Payé
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handlePay(payment.id)}
                    >
                      Payer
                    </Button>
                  )}
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
