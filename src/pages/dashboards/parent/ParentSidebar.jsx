import { NavLink } from 'react-router-dom'
import './ParentSidebar.css'

const navItems = [
  { to: '/dashboard/parent', label: 'Accueil', icon: '🏠', end: true },
  { to: '/dashboard/parent/overview', label: 'Tableau de bord', icon: '📊' },
  { to: '/dashboard/parent/statistics', label: 'Statistiques', icon: '📈' },
  { to: '/dashboard/parent/children', label: 'Mes enfants', icon: '🎓' },
  { to: '/dashboard/parent/register', label: 'Inscrire un élève', icon: '➕' },
  { to: '/dashboard/parent/payments', label: 'Paiements', icon: '💳' },
  { to: '/dashboard/parent/attendance', label: 'Présences', icon: '🗓️' },
  { to: '/dashboard/parent/grades', label: 'Notes', icon: '📝' },
  { to: '/dashboard/parent/results', label: 'Résultats', icon: '🏆' },
  { to: '/dashboard/parent/agenda', label: 'Agenda', icon: '📅' },
  { to: '/dashboard/parent/messages', label: 'Messages', icon: '💬' },
  { to: '/dashboard/parent/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/dashboard/parent/profile', label: 'Profil', icon: '👤' },
]

function ParentSidebar() {
  return (
    <nav className="parent-nav">
      <div className="parent-nav__brand">
        <span className="parent-nav__brand-mark">K</span>
        <span className="parent-nav__brand-name">Kamili Edu Campus</span>
      </div>
      <ul className="parent-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'parent-nav__link' +
                (isActive ? ' parent-nav__link--active' : '')
              }
            >
              <span className="parent-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="parent-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ParentSidebar
