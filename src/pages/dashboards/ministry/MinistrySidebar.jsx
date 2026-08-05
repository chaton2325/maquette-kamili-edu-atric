import { NavLink } from 'react-router-dom'
import './MinistrySidebar.css'

const navItems = [
  { to: '/dashboard/ministry', label: 'Supervision nationale', icon: '🇨🇲', end: true },
  { to: '/dashboard/ministry/charts', label: 'Graphiques', icon: '📊' },
  { to: '/dashboard/ministry/alerts', label: 'Alertes', icon: '🔔' },
]

function MinistrySidebar() {
  return (
    <nav className="ministry-nav">
      <div className="ministry-nav__brand">
        <span className="ministry-nav__brand-mark">K</span>
        <span className="ministry-nav__brand-name">Kamili Educ@tric</span>
      </div>
      <ul className="ministry-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'ministry-nav__link' +
                (isActive ? ' ministry-nav__link--active' : '')
              }
            >
              <span className="ministry-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="ministry-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MinistrySidebar
