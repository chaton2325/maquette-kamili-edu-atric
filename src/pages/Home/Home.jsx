import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import './Home.css'

const roles = [
  { to: '/dashboard/ministry', label: 'Ministère', icon: '🏛️' },
  { to: '/dashboard/direction', label: 'Direction', icon: '🏫' },
  { to: '/dashboard/teacher', label: 'Enseignant', icon: '👩‍🏫' },
  { to: '/dashboard/parent', label: 'Parent', icon: '👨‍👩‍👧' },
  { to: '/dashboard/student', label: 'Élève', icon: '🎓' },
]

function Home() {
  return (
    <section className="landing">
      <img className="landing__logo" src={logo} alt="Kamili Edu Campus" />
      <span className="landing__badge">Maquette de démonstration</span>
      <h1 className="landing__title">
        Kamili <span className="landing__accent">Edu Campus</span>
      </h1>
      <p className="landing__subtitle">
        La plateforme de gestion scolaire unifiée pour tous les acteurs de
        l’éducation au Cameroun.
      </p>
      <div className="landing__actions">
        <Link to="/etablissements" className="btn btn--primary btn--lg">
          Parcourir les établissements
        </Link>
        <Link to="/auth/login" className="btn btn--secondary btn--lg">
          Se connecter
        </Link>
        <Link to="/auth/role" className="btn btn--secondary btn--lg">
          Explorer les espaces
        </Link>
      </div>

      <div className="landing__roles">
        {roles.map((role, index) => (
          <Link
            key={role.to}
            to={role.to}
            className="landing__role anim-fade-up"
            style={{ '--delay': `${index * 60}ms` }}
          >
            <span className="landing__role-icon" aria-hidden="true">
              {role.icon}
            </span>
            <span className="landing__role-label">{role.label}</span>
            <span className="landing__role-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>

      <footer className="landing__footer">
        <span>Kamili Edu Campus</span>
        <span aria-hidden="true">·</span>
        <span>by Atric Sarl</span>
      </footer>
    </section>
  )
}

export default Home