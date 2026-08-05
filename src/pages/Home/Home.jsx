import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <h1>Kamili Educ@tric</h1>
      <p>
        <Link to="/auth/login">Accéder à la connexion →</Link>
      </p>
    </section>
  )
}

export default Home
