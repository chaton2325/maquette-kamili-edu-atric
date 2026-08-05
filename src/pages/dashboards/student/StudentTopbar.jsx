import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown.jsx'
import { studentProfile } from '../../../data/studentProfile.js'
import { studentNotifications } from '../../../data/studentNotifications.js'
import { wallet } from '../../../data/wallet.js'
import './StudentTopbar.css'

function formatAmount(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

function StudentTopbar() {
  const navigate = useNavigate()
  const unreadCount = studentNotifications.filter(
    (notification) => !notification.read,
  ).length

  return (
    <div className="student-topbar">
      <div className="student-topbar__title">Espace Élève</div>

      <div className="student-topbar__actions">
        <Link
          to="/dashboard/student/wallet"
          className="student-topbar__wallet"
        >
          <span aria-hidden="true">👛</span>
          <span>{formatAmount(wallet.balance)}</span>
        </Link>

        <Link
          to="/dashboard/student/notifications"
          className="student-topbar__bell"
          aria-label="Notifications"
        >
          <span aria-hidden="true">🔔</span>
          {unreadCount > 0 && (
            <span className="student-topbar__badge">{unreadCount}</span>
          )}
        </Link>

        <Dropdown
          align="right"
          label={
            <span className="student-topbar__user">
              <span className="student-topbar__avatar" aria-hidden="true">
                {studentProfile.avatar}
              </span>
              <span className="student-topbar__name">
                {studentProfile.firstName}
              </span>
            </span>
          }
          items={[
            {
              label: 'Mon profil',
              onClick: () => navigate('/dashboard/student/profile'),
            },
            { label: 'Déconnexion', onClick: () => navigate('/auth/login') },
          ]}
        />
      </div>
    </div>
  )
}

export default StudentTopbar
