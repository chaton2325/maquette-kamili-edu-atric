import './NotificationCard.css'

const VARIANT_MAP = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

const ICONS = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  danger: '🚨',
}

function NotificationCard({
  title,
  body,
  time,
  variant = 'info',
  read = false,
  onClose,
  onClick,
  className = '',
}) {
  const classes = [
    'notif',
    VARIANT_MAP[variant] ? `notif--${VARIANT_MAP[variant]}` : '',
    read ? '' : 'notif--unread',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const Wrapper = onClick ? 'button' : 'div'
  const wrapperProps = onClick
    ? { type: 'button', onClick, className: classes }
    : { className: classes }

  return (
    <Wrapper {...wrapperProps}>
      <span className="notif__icon" aria-hidden="true">
        {ICONS[variant] || ICONS.info}
      </span>

      <div className="notif__content">
        <div className="notif__line">
          <span className="notif__title">{title}</span>
          {time && <span className="notif__time">{time}</span>}
        </div>
        {body && <p className="notif__body">{body}</p>}
      </div>

      {onClose && (
        <button
          type="button"
          className="notif__close"
          aria-label="Supprimer la notification"
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
        >
          ✕
        </button>
      )}
    </Wrapper>
  )
}

export default NotificationCard