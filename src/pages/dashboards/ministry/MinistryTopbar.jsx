import { useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown.jsx'
import './MinistryTopbar.css'

const ministerProfiles = {
  MINEDUB: { name: 'Laurent Serge Etoundi Ngoa', avatar: '🏛️' },
  MINESEC: { name: 'Pauline Nalova Lyonga', avatar: '🏛️' },
  MINESUP: { name: 'Jacques Fame Ndongo', avatar: '🏛️' },
}

function MinistryTopbar({ view = 'MINEDUB' }) {
  const navigate = useNavigate()
  const minister = ministerProfiles[view] ?? ministerProfiles.MINEDUB

  return (
    <div className="ministry-topbar">
      <div className="ministry-topbar__ribbon">
        <div className="ministry-topbar__brand">
          <span className="ministry-topbar__logo" aria-hidden="true">
            🇨🇲
          </span>
          <div>
            <div className="ministry-topbar__title">
              Centre National de Supervision
            </div>
            <div className="ministry-topbar__subtitle">
              Kamili Educ@tric · Système Éducatif du Cameroun
            </div>
          </div>
        </div>

        <Dropdown
          align="right"
          label={
            <span className="ministry-topbar__user">
              <span className="ministry-topbar__avatar" aria-hidden="true">
                {minister.avatar}
              </span>
              <span className="ministry-topbar__name">{minister.name}</span>
            </span>
          }
          items={[
            { label: 'Changer de ministère', onClick: () => navigate('/dashboard/ministry') },
            { label: 'Déconnexion', onClick: () => navigate('/auth/login') },
          ]}
        />
      </div>
    </div>
  )
}

export default MinistryTopbar
