import './Timeline.css'

const VARIANT_MAP = {
  primary: 'primary',
  accent: 'accent',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

function Timeline({ items = [], className = '' }) {
  return (
    <ol className={`timeline ${className}`.trim()}>
      {items.map((item, index) => {
        const { title, description, time, icon, variant = 'primary' } = item
        return (
          <li className="timeline__item" key={index}>
            <div className="timeline__rail">
              <span
                className={[
                  'timeline__dot',
                  VARIANT_MAP[variant] ? `timeline__dot--${VARIANT_MAP[variant]}` : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              >
                {icon}
              </span>
            </div>
            <div className="timeline__content">
              <div className="timeline__head">
                <span className="timeline__title">{title}</span>
                {time && <span className="timeline__time">{time}</span>}
              </div>
              {description && <p className="timeline__desc">{description}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline