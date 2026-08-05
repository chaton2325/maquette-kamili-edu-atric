import './Avatar.css'

const SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Avatar({ src, emoji, name, size = 'md', status, className = '' }) {
  const classes = [
    'avatar',
    SIZES[size] ? `avatar--${SIZES[size]}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} title={name}>
      {src ? (
        <img className="avatar__img" src={src} alt={name || 'avatar'} />
      ) : emoji ? (
        <span className="avatar__emoji" aria-hidden="true">
          {emoji}
        </span>
      ) : (
        <span className="avatar__initials" aria-hidden="true">
          {initials(name)}
        </span>
      )}
      {status && (
        <span
          className={`avatar__status avatar__status--${status}`}
          aria-label={`Statut : ${status}`}
        />
      )}
    </div>
  )
}

export default Avatar