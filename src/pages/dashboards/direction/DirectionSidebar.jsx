import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.jpeg'
import './DirectionSidebar.css'

const navItems = [
  { to: '/dashboard/direction', label: 'Vue générale', icon: '🏠', end: true },
  { to: '/dashboard/direction/enrollments', label: 'Effectifs', icon: '🎓' },
  { to: '/dashboard/direction/teachers', label: 'Enseignants', icon: '👩‍🏫' },
  { to: '/dashboard/direction/permissions', label: 'Permissions', icon: '🔐' },
  { to: '/dashboard/direction/classes', label: 'Classes', icon: '🏫' },
  { to: '/dashboard/direction/attendance', label: 'Présences', icon: '🗓️' },
  { to: '/dashboard/direction/results', label: 'Résultats', icon: '🏆' },
  { to: '/dashboard/direction/payments', label: 'Paiements', icon: '💳' },
  { to: '/dashboard/direction/finances', label: 'Finances', icon: '💰' },
  { to: '/dashboard/direction/charts', label: 'Graphiques', icon: '📊' },
  { to: '/dashboard/direction/alerts', label: 'Alertes', icon: '🔔' },
  { to: '/dashboard/direction/reports', label: 'Rapports', icon: '📄' },
  { to: '/dashboard/direction/profile', label: 'Profil', icon: '👤' },
]

function DirectionSidebar() {
  return (
    <nav className="direction-nav">
      <div className="direction-nav__brand">
        <img className="direction-nav__brand-mark" src={logo} alt="Kamili Edu Campus" />
        <span className="direction-nav__brand-name">Kamili Edu Campus</span>
      </div>
      <ul className="direction-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'direction-nav__link' +
                (isActive ? ' direction-nav__link--active' : '')
              }
            >
              <span className="direction-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="direction-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DirectionSidebar
