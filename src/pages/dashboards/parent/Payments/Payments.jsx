import { useState } from 'react'
import Badge from '../../../../components/Badge/Badge.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Dropdown from '../../../../components/Dropdown/Dropdown.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { children } from '../../../../data/children.js'
import { payments as initialPayments, paymentStatusLabels } from '../../../../data/payments.js'
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

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function Payments() {
  const [payments, setPayments] = useState(initialPayments)
  const [childFilter, setChildFilter] = useState('all')

  const filteredPayments =
    childFilter === 'all'
      ? payments
      : payments.filter((payment) => payment.childId === childFilter)

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

  const filterItems = [
    { label: 'Tous les enfants', onClick: () => setChildFilter('all') },
    ...children.map((child) => ({
      label: `${child.firstName} ${child.lastName}`,
      onClick: () => setChildFilter(child.id),
    })),
  ]

  const filterLabel =
    childFilter === 'all'
      ? 'Tous les enfants'
      : childName(childFilter)

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Paiements</h1>
          <p>Suivez les frais de scolarité, cantine et transport de vos enfants.</p>
        </div>
        <Dropdown label={filterLabel} items={filterItems} align="right" />
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

      <section className="parent-page__section">
        <Table>
          <thead>
            <tr>
              <th>Enfant</th>
              <th>Motif</th>
              <th>Montant</th>
              <th>Échéance</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{childName(payment.childId)}</td>
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
