import Badge from '../../../../components/Badge/Badge.jsx'
import Table from '../../../../components/Table/Table.jsx'
import Card from '../../../../components/Card/Card.jsx'
import { financeSummary } from '../../../../data/direction.js'
import { financeTransactions } from '../../../../data/direction.js'
import { SegmentedBar } from '../charts.jsx'
import '../DirectionPage.css'

const expenseSegments = [
  { key: 'salaires', label: 'Salaires', icon: '👩‍🏫', value: financeSummary.salaryShare },
  { key: 'fonctionnement', label: 'Fonctionnement', icon: '🏢', value: financeSummary.operationsShare },
  { key: 'maintenance', label: 'Maintenance', icon: '🛠️', value: financeSummary.maintenanceShare },
]

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function Finances() {
  return (
    <div className="dir-page">
      <div className="dir-page__header">
        <div className="dir-page__heading">
          <h1>Finances</h1>
          <p>Trésorerie, recettes et dépenses de l’établissement.</p>
        </div>
      </div>

      <section className="dir-page__section">
        <div className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-card__icon" aria-hidden="true">
              💰
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Recettes annuelles</span>
              <span className="kpi-card__value">
                {formatAmount(financeSummary.totalRevenue)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                ▲ +8 % vs l’an dernier
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--danger" aria-hidden="true">
              📤
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Dépenses annuelles</span>
              <span className="kpi-card__value">
                {formatAmount(financeSummary.totalExpenses)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                {Math.round((financeSummary.totalExpenses / financeSummary.totalRevenue) * 100)} % des recettes
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--accent" aria-hidden="true">
              ⚖️
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Solde disponible</span>
              <span className="kpi-card__value">
                {formatAmount(financeSummary.balance)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                excédent positif
              </span>
            </div>
          </div>
          <div className="kpi-card">
            <span className="kpi-card__icon kpi-card__icon--info" aria-hidden="true">
              🎯
            </span>
            <div className="kpi-card__content">
              <span className="kpi-card__label">Budget prévisionnel</span>
              <span className="kpi-card__value">
                {formatAmount(financeSummary.annualBudget)}
              </span>
              <span className="kpi-card__delta kpi-card__delta--up">
                {Math.round((financeSummary.totalRevenue / financeSummary.annualBudget) * 100)} % atteint
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="dir-columns">
        <section className="dir-page__section">
          <Card>
            <Card.Header>Répartition des dépenses</Card.Header>
            <Card.Body>
              <SegmentedBar segments={expenseSegments} />
            </Card.Body>
          </Card>
        </section>

        <section className="dir-page__section">
          <Card>
            <Card.Header>Recettes du mois d’août</Card.Header>
            <Card.Body>
              <ul className="dir-list">
                {financeTransactions
                  .filter((tx) => tx.type === 'credit')
                  .map((tx) => (
                    <li key={tx.id} className="dir-list__item">
                      <span>
                        <span aria-hidden="true">💰</span> {tx.label}
                      </span>
                      <span className="dir-list__meta">
                        {formatAmount(tx.amount)}
                      </span>
                    </li>
                  ))}
              </ul>
            </Card.Body>
          </Card>
        </section>
      </div>

      <section className="dir-page__section">
        <h2 className="dir-page__section-title">Transactions récentes</h2>
        <Table>
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Catégorie</th>
              <th>Date</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {financeTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.label}</td>
                <td>{tx.category}</td>
                <td>{tx.date}</td>
                <td>
                  <Badge variant={tx.type === 'credit' ? 'success' : 'danger'}>
                    {tx.type === 'credit' ? '+' : '−'} {formatAmount(Math.abs(tx.amount))}
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

export default Finances