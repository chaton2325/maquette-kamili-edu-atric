import './Alert.css'

function Alert({ variant = 'info', title, children, onClose, className = '' }) {
  const classes = ['alert', `alert--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="alert">
      <div className="alert__content">
        {title && <p className="alert__title">{title}</p>}
        {children && <div className="alert__body">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="alert__close"
          aria-label="Fermer"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Alert
