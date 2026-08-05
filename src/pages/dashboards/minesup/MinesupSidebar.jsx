import { NavLink } from 'react-router-dom'
import './MinesupSidebar.css'

const navItems = [
  { to: '/dashboard/minesup', label: 'Vue d’ensemble', icon: '🏛️', end: true },
  { to: '/dashboard/minesup/universities', label: 'Universités & écoles', icon: '🎓' },
  { to: '/dashboard/minesup/teachers', label: 'Enseignants du supérieur', icon: '👩‍🏫' },
  { to: '/dashboard/minesup/results', label: 'Résultats par étudiant', icon: '📝' },
  { to: '/dashboard/minesup/charts', label: 'Graphiques', icon: '📊' },
  { to: '/dashboard/minesup/alerts', label: 'Alertes', icon: '🔔' },
]

function MinesupSidebar() {
  return (
    <nav className="minesup-nav">
      <div className="minesup-nav__brand">
        <span className="minesup-nav__brand-mark">S</span>
        <span className="minesup-nav__brand-name">MINESUP · Universités</span>
      </div>
      <ul className="minesup-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'minesup-nav__link' +
                (isActive ? ' minesup-nav__link--active' : '')
              }
            >
              <span className="minesup-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="minesup-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MinesupSidebar