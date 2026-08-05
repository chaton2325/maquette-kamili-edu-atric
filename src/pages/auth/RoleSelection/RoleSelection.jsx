import { useNavigate } from 'react-router-dom'
import { roles } from '../../../data/roles.js'
import './RoleSelection.css'

function RoleSelection() {
  const navigate = useNavigate()

  const roleRoutes = {
    parent: '/dashboard/parent',
    eleve: '/dashboard/student',
    enseignant: '/dashboard/teacher',
  }

  function handleSelect(roleId) {
    navigate(roleRoutes[roleId] ?? '/')
  }

  return (
    <section className="role-selection">
      <div className="role-selection__header">
        <span className="role-selection__eyebrow">Kamili Educ@tric</span>
        <h1>Choisissez votre profil</h1>
        <p>
          Sélectionnez le profil correspondant à votre utilisation de la
          plateforme.
        </p>
      </div>

      <div className="role-selection__grid">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            className="role-card"
            onClick={() => handleSelect(role.id)}
          >
            <span className="role-card__icon">{role.emoji}</span>
            <span className="role-card__label">{role.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default RoleSelection
