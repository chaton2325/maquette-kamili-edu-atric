import { useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown.jsx'
import { teacherProfile } from '../../../data/teacherProfile.js'
import './TeacherTopbar.css'

function TeacherTopbar() {
  const navigate = useNavigate()

  return (
    <div className="teacher-topbar">
      <div className="teacher-topbar__title">Espace Enseignant</div>

      <Dropdown
        align="right"
        label={
          <span className="teacher-topbar__user">
            <span className="teacher-topbar__avatar" aria-hidden="true">
              {teacherProfile.avatar}
            </span>
            <span className="teacher-topbar__name">
              {teacherProfile.firstName}
            </span>
          </span>
        }
        items={[
          {
            label: 'Mon profil',
            onClick: () => navigate('/dashboard/teacher/profile'),
          },
          { label: 'Déconnexion', onClick: () => navigate('/auth/login') },
        ]}
      />
    </div>
  )
}

export default TeacherTopbar
