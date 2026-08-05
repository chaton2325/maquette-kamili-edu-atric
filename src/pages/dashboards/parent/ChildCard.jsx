import Badge from '../../../components/Badge/Badge.jsx'
import { paymentStatusLabels } from '../../../data/payments.js'
import './ChildCard.css'

const paymentVariant = {
  'a-jour': 'success',
  'en-attente': 'warning',
  'en-retard': 'danger',
}

function ChildCard({ child, onClick }) {
  const clickable = Boolean(onClick)

  function handleKeyDown(event) {
    if (!clickable) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={`child-card${clickable ? ' child-card--clickable' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <span className="child-card__avatar" aria-hidden="true">
        {child.avatar}
      </span>
      <div className="child-card__info">
        <p className="child-card__name">
          {child.firstName} {child.lastName}
        </p>
        <p className="child-card__meta">
          {child.classLevel} · {child.school}
        </p>
      </div>
      <div className="child-card__stats">
        <Badge variant={paymentVariant[child.paymentStatus]}>
          {paymentStatusLabels[child.paymentStatus]}
        </Badge>
        <span className="child-card__attendance">
          {child.attendanceRate}% présence
        </span>
      </div>
    </div>
  )
}

export default ChildCard
