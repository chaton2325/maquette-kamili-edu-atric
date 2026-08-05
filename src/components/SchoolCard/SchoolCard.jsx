import './SchoolCard.css'

function SchoolCard({
  name,
  type,
  address,
  stats = [],
  icon,
  badge,
  actions,
  onClick,
  className = '',
}) {
  const Wrapper = onClick ? 'button' : 'div'
  const interactiveProps = onClick
    ? { type: 'button', onClick, className: `schoolcard schoolcard--interactive ${className}`.trim() }
    : { className: `schoolcard ${className}`.trim() }

  return (
    <Wrapper {...interactiveProps}>
      <div className="schoolcard__head">
        {icon && (
          <span className="schoolcard__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="schoolcard__identity">
          <h4 className="schoolcard__name">{name}</h4>
          {type && <p className="schoolcard__type">{type}</p>}
        </div>
        {badge && <span className="schoolcard__badge">{badge}</span>}
      </div>

      {address && (
        <p className="schoolcard__address">
          <span className="schoolcard__address-icon" aria-hidden="true">📍</span>
          {address}
        </p>
      )}

      {stats.length > 0 && (
        <div className="schoolcard__stats">
          {stats.map((stat, index) => (
            <div className="schoolcard__stat" key={index}>
              <span className="schoolcard__stat-value">{stat.value}</span>
              <span className="schoolcard__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {actions && <div className="schoolcard__actions">{actions}</div>}
    </Wrapper>
  )
}

export default SchoolCard