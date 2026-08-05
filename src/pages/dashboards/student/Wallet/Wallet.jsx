import { useState } from 'react'
import Button from '../../../../components/Button/Button.jsx'
import Input from '../../../../components/Input/Input.jsx'
import Table from '../../../../components/Table/Table.jsx'
import { wallet as initialWallet } from '../../../../data/wallet.js'
import '../StudentPage.css'
import './Wallet.css'

function formatAmount(amount) {
  const sign = amount > 0 ? '+' : ''
  return `${sign}${amount.toLocaleString('fr-FR')} FCFA`
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
}

function Wallet() {
  const [balance, setBalance] = useState(initialWallet.balance)
  const [transactions, setTransactions] = useState(initialWallet.transactions)
  const [amount, setAmount] = useState('')

  function handleRecharge(event) {
    event.preventDefault()
    const value = Number(amount)
    if (!value || value <= 0) return

    setBalance((prev) => prev + value)
    setTransactions((prev) => [
      {
        id: `tx-${prev.length + 1}`,
        label: 'Recharge Mobile Money',
        amount: value,
        type: 'credit',
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
    setAmount('')
  }

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Portefeuille</h1>
          <p>Solde et historique de vos transactions scolaires.</p>
        </div>
      </div>

      <div className="wallet-balance-card">
        <span className="wallet-balance-card__label">Solde disponible</span>
        <span className="wallet-balance-card__value">
          {balance.toLocaleString('fr-FR')} FCFA
        </span>
        <form className="wallet-balance-card__form" onSubmit={handleRecharge}>
          <Input
            aria-label="Montant à recharger"
            type="number"
            min="1"
            placeholder="Montant (FCFA)"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <Button type="submit" variant="accent">
            Recharger
          </Button>
        </form>
      </div>

      <section className="student-page__section">
        <h2 className="student-page__section-title">
          Historique des transactions
        </h2>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Libellé</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.label}</td>
                <td
                  className={
                    transaction.type === 'credit'
                      ? 'wallet-amount--credit'
                      : 'wallet-amount--debit'
                  }
                >
                  {formatAmount(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default Wallet
