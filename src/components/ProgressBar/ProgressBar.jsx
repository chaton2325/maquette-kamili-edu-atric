import './ProgressBar.css'

const SIZE_MAP = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

const VARIANT_MAP = {
  primary: 'primary',
  accent: 'accent',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  label,
  showValue = false,
  className = '',
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const classes = ['progress']
  classes.push(SIZE_MAP[size] ? `progress--${SIZE_MAP[size]}` : '')
  classes.push(VARIANT_MAP[variant] ? `progress--${VARIANT_MAP[variant]}` : '')
  if (className) classes.push(className)
  const rootClass = classes.filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      {(label || showValue) && (
        <div className="progress__head">
          {label && <span className="progress__label">{label}</span>}
          {showValue && (
            <span className="progress__value">{Math.round(percent)}%</span>
          )}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progression'}
      >
        <div className="progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar