import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown.jsx'
import { parentProfile } from '../../../data/parentProfile.js'
import { notifications } from '../../../data/notifications.js'
import './ParentTopbar.css'

function ParentTopbar() {
  const navigate = useNavigate()
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="parent-topbar">
      <div className="parent-topbar__title">Espace Parent</div>

      <div className="parent-topbar__actions">
        <Link
          to="/dashboard/parent/notifications"
          className="parent-topbar__bell"
          aria-label="Notifications"
        >
          <span aria-hidden="true">🔔</span>
          {unreadCount > 0 && (
            <span className="parent-topbar__badge">{unreadCount}</span>
          )}
        </Link>

        <Dropdown
          align="right"
          label={
            <span className="parent-topbar__user">
              <span className="parent-topbar__avatar" aria-hidden="true">
                {parentProfile.avatar}
              </span>
              <span className="parent-topbar__name">
                {parentProfile.firstName}
              </span>
            </span>
          }
          items={[
            {
              label: 'Mon profil',
              onClick: () => navigate('/dashboard/parent/profile'),
            },
            { label: 'Déconnexion', onClick: () => navigate('/auth/login') },
          ]}
        />
      </div>
    </div>
  )
}

export default ParentTopbar
