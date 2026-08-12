import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.jpeg'
import './MinistrySidebar.css'

const navItems = [
  { to: '/dashboard/ministry', label: 'Supervision nationale', icon: '🇨🇲', end: true },
  { to: '/dashboard/ministry/establishments', label: 'Établissements', icon: '🏛️' },
  { to: '/dashboard/ministry/teachers', label: 'Enseignants', icon: '👩‍🏫' },
  { to: '/dashboard/ministry/results', label: 'Résultats par élève', icon: '📝' },
  { to: '/dashboard/ministry/charts', label: 'Graphiques', icon: '📊' },
  { to: '/dashboard/ministry/alerts', label: 'Alertes', icon: '🔔' },
]

const subLinks = [
  { to: '/dashboard/minesup', label: 'MINESUP · Universités', icon: '🎓' },
]

function MinistrySidebar() {
  return (
    <nav className="ministry-nav">
      <div className="ministry-nav__brand">
        <img className="ministry-nav__brand-mark" src={logo} alt="Kamili Edu Campus" />
        <span className="ministry-nav__brand-name">Kamili Edu Campus</span>
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
      <div className="ministry-nav__group">
        <p className="ministry-nav__group-label">Portails ministériels</p>
        <ul className="ministry-nav__list">
          {subLinks.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  'ministry-nav__link ministry-nav__link--sub' +
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
      </div>
    </nav>
  )
}

export default MinistrySidebar
