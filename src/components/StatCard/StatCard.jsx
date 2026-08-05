import './StatCard.css'

const VARIANTS = {
  default: 'default',
  primary: 'primary',
  accent: 'accent',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

function StatCard({
  label,
  value,
  icon,
  delta,
  direction = 'up',
  hint,
  variant = 'default',
  className = '',
}) {
  const classes = [
    'statcard',
    VARIANTS[variant] ? `statcard--${VARIANTS[variant]}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const showUp = direction === 'up'

  return (
    <div className={classes}>
      <div className="statcard__head">
        {icon && (
          <span className="statcard__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="statcard__label">{label}</span>
      </div>

      <div className="statcard__value">{value}</div>

      <div className="statcard__foot">
        {delta && (
          <span
            className={`statcard__delta statcard__delta--${
              showUp ? 'up' : 'down'
            }`}
            aria-label={`${showUp ? 'Hausse' : 'Baisse'} de ${delta}`}
          >
            {showUp ? '▲' : '▼'} {delta}
          </span>
        )}
        {hint && <span className="statcard__hint">{hint}</span>}
      </div>
    </div>
  )
}

export default StatCard