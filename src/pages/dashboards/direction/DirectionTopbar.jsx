import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown.jsx'
import { directionProfile } from '../../../data/direction.js'
import { alerts } from '../../../data/direction.js'
import './DirectionTopbar.css'

function DirectionTopbar() {
  const navigate = useNavigate()
  const activeAlerts = alerts.filter((alert) => alert.status === 'active').length

  return (
    <div className="direction-topbar">
      <div className="direction-topbar__title">Espace Direction</div>

      <div className="direction-topbar__actions">
        <Link
          to="/dashboard/direction/alerts"
          className="direction-topbar__bell"
          aria-label="Alertes"
        >
          <span aria-hidden="true">🔔</span>
          {activeAlerts > 0 && (
            <span className="direction-topbar__badge">{activeAlerts}</span>
          )}
        </Link>

        <Dropdown
          align="right"
          label={
            <span className="direction-topbar__user">
              <span className="direction-topbar__avatar" aria-hidden="true">
                {directionProfile.avatar}
              </span>
              <span className="direction-topbar__name">
                {directionProfile.firstName}
              </span>
            </span>
          }
          items={[
            {
              label: 'Mon profil',
              onClick: () => navigate('/dashboard/direction/profile'),
            },
            { label: 'Déconnexion', onClick: () => navigate('/auth/login') },
          ]}
        />
      </div>
    </div>
  )
}

export default DirectionTopbar
