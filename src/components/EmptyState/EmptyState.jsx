import Icon from '../Icon/Icon.jsx'
import './EmptyState.css'

function EmptyState({
  icon = 'search',
  title = 'Aucun élément',
  description = 'Aucune donnée à afficher pour le moment.',
  action,
  size = 'md',
  className = '',
}) {
  return (
    <div className={`empty-state empty-state--${size} ${className}`.trim()}>
      <div className="empty-state__illustration" aria-hidden="true">
        <span className="empty-state__blob empty-state__blob--a" />
        <span className="empty-state__blob empty-state__blob--b" />
        <Icon name={icon} size={size === 'lg' ? 'lg' : 'md'} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  )
}

export default EmptyState