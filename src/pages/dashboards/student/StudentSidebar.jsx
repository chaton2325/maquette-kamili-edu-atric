import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.jpeg'
import './StudentSidebar.css'

const navItems = [
  { to: '/dashboard/student', label: 'Accueil', icon: '🏠', end: true },
  { to: '/dashboard/student/grades', label: 'Notes', icon: '📝' },
  { to: '/dashboard/student/timetable', label: 'Emploi du temps', icon: '🗓️' },
  { to: '/dashboard/student/homework', label: 'Devoirs', icon: '📚' },
  { to: '/dashboard/student/library', label: 'Bibliothèque', icon: '📖' },
  { to: '/dashboard/student/housing', label: 'Logement', icon: '🏘️' },
  { to: '/dashboard/student/scholarships', label: 'Bourses', icon: '🏅' },
  { to: '/dashboard/student/payments', label: 'Paiements', icon: '💳' },
  { to: '/dashboard/student/wallet', label: 'Portefeuille', icon: '👛' },
  { to: '/dashboard/student/messages', label: 'Messagerie', icon: '💬' },
  { to: '/dashboard/student/agenda', label: 'Agenda', icon: '📅' },
  { to: '/dashboard/student/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/dashboard/student/profile', label: 'Profil', icon: '👤' },
]

function StudentSidebar() {
  return (
    <nav className="student-nav">
      <div className="student-nav__brand">
        <img className="student-nav__brand-mark" src={logo} alt="Kamili Edu Campus" />
        <span className="student-nav__brand-name">Kamili Edu Campus</span>
      </div>
      <ul className="student-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'student-nav__link' +
                (isActive ? ' student-nav__link--active' : '')
              }
            >
              <span className="student-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="student-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default StudentSidebar
