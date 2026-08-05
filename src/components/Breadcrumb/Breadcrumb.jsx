import { Link } from 'react-router-dom'
import './Breadcrumb.css'

function Crumb({ item, isLast }) {
  const { label, to, icon, onClick } = item
  const content = (
    <>
      {icon && <span className="breadcrumb__icon" aria-hidden="true">{icon}</span>}
      <span className="breadcrumb__text">{label}</span>
    </>
  )

  if (isLast) {
    return (
      <li className="breadcrumb__item" aria-current="page">
        <span className={`breadcrumb__crumb breadcrumb__crumb--current ${!icon ? 'breadcrumb__crumb--pad' : ''}`.trim()}>
          {content}
        </span>
      </li>
    )
  }

  if (to) {
    return (
      <li className="breadcrumb__item">
        <Link className={`breadcrumb__crumb ${!icon ? 'breadcrumb__crumb--pad' : ''}`.trim()} to={to}>
          {content}
        </Link>
      </li>
    )
  }

  return (
    <li className="breadcrumb__item">
      <button
        type="button"
        className={`breadcrumb__crumb ${!icon ? 'breadcrumb__crumb--pad' : ''}`.trim()}
        onClick={onClick}
      >
        {content}
      </button>
    </li>
  )
}

function Breadcrumb({
  items = [],
  separator = '/',
  ariaLabel = 'Fil d’Ariane',
  className = '',
}) {
  return (
    <nav className={`breadcrumb ${className}`.trim()} aria-label={ariaLabel}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <span key={item.label || index} className="breadcrumb__group">
              <Crumb item={item} isLast={isLast} />
              {!isLast && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </span>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb