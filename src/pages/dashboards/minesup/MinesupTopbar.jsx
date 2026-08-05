import { useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown.jsx'
import './MinesupTopbar.css'

function MinesupTopbar() {
  const navigate = useNavigate()

  return (
    <div className="minesup-topbar">
      <div className="minesup-topbar__ribbon">
        <div className="minesup-topbar__brand">
          <span className="minesup-topbar__logo" aria-hidden="true">
            🎓
          </span>
          <div>
            <div className="minesup-topbar__title">
              Ministère de l’Enseignement Supérieur
            </div>
            <div className="minesup-topbar__subtitle">
              Kamili Edu Campus · Universités & Grandes Écoles du Cameroun
            </div>
          </div>
        </div>

        <Dropdown
          align="right"
          label={
            <span className="minesup-topbar__user">
              <span className="minesup-topbar__avatar" aria-hidden="true">
                🏛️
              </span>
              <span className="minesup-topbar__name">Jacques Fame Ndongo</span>
            </span>
          }
          items={[
            { label: 'Centre national de supervision', onClick: () => navigate('/dashboard/ministry') },
            { label: 'Déconnexion', onClick: () => navigate('/auth/login') },
          ]}
        />
      </div>
    </div>
  )
}

export default MinesupTopbar