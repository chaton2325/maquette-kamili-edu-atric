import './Tabs.css'

const VARIANT_MAP = {
  underline: 'underline',
  pills: 'pills',
}

function Tabs({
  tabs = [],
  active,
  onChange,
  variant = 'underline',
  ariaLabel = 'Onglets',
  className = '',
}) {
  const classes = [
    'tabs',
    VARIANT_MAP[variant] ? `tabs--${VARIANT_MAP[variant]}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        const { id, label, icon, disabled } = tab
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            className={[
              'tabs__tab',
              isActive ? 'tabs__tab--active' : '',
              variant === 'pills' ? 'tabs__tab--pills' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange?.(id)}
          >
            {icon && <span className="tabs__icon" aria-hidden="true">{icon}</span>}
            <span className="tabs__label">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Tabs