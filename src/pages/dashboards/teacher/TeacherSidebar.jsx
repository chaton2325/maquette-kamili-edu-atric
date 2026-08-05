import { NavLink } from 'react-router-dom'
import './TeacherSidebar.css'

const navItems = [
  { to: '/dashboard/teacher', label: 'Mes classes', icon: '🏫', end: true },
  { to: '/dashboard/teacher/attendance', label: 'Présences', icon: '✅' },
  { to: '/dashboard/teacher/grades', label: 'Notes', icon: '📝' },
  { to: '/dashboard/teacher/logbook', label: 'Cahier de texte', icon: '📔' },
  { to: '/dashboard/teacher/planning', label: 'Planning', icon: '📅' },
  { to: '/dashboard/teacher/parents', label: 'Parents', icon: '👪' },
  { to: '/dashboard/teacher/messages', label: 'Messages', icon: '💬' },
  { to: '/dashboard/teacher/exams', label: 'Examens', icon: '📋' },
  { to: '/dashboard/teacher/statistics', label: 'Statistiques', icon: '📊' },
  { to: '/dashboard/teacher/profile', label: 'Profil', icon: '👤' },
]

function TeacherSidebar() {
  return (
    <nav className="teacher-nav">
      <div className="teacher-nav__brand">
        <span className="teacher-nav__brand-mark">K</span>
        <span className="teacher-nav__brand-name">Kamili Educ@tric</span>
      </div>
      <ul className="teacher-nav__list">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'teacher-nav__link' +
                (isActive ? ' teacher-nav__link--active' : '')
              }
            >
              <span className="teacher-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="teacher-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TeacherSidebar
