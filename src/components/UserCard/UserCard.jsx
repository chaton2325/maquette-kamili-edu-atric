import Avatar from '../Avatar/Avatar.jsx'
import './UserCard.css'

function UserCard({
  name,
  role,
  src,
  emoji,
  status,
  meta = [],
  actions,
  onClick,
  className = '',
}) {
  const Wrapper = onClick ? 'button' : 'div'
  const interactiveProps = onClick
    ? { type: 'button', onClick, className: `usercard usercard--interactive ${className}`.trim() }
    : { className: `usercard ${className}`.trim() }

  return (
    <Wrapper {...interactiveProps}>
      <div className="usercard__head">
        <Avatar src={src} emoji={emoji} name={name} size="lg" status={status} />
        <div className="usercard__identity">
          <h4 className="usercard__name">{name}</h4>
          {role && <p className="usercard__role">{role}</p>}
        </div>
        {actions && <div className="usercard__actions">{actions}</div>}
      </div>

      {meta.length > 0 && (
        <div className="usercard__meta">
          {meta.map((item, index) => (
            <div className="usercard__meta-item" key={index}>
              {item.icon && (
                <span className="usercard__meta-icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  )
}

export default UserCard