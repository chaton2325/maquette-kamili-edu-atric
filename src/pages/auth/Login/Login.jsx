import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button.jsx'
import Input from '../../../components/Input/Input.jsx'
import '../AuthForm.css'

function Login() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/auth/otp')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__header">
        <h1>Connexion</h1>
        <p>Accédez à votre espace Kamili Educ@tric.</p>
      </div>

      <Input
        id="email"
        type="email"
        label="Adresse email"
        placeholder="vous@exemple.com"
        autoComplete="email"
        required
      />
      <Input
        id="password"
        type="password"
        label="Mot de passe"
        placeholder="••••••••"
        autoComplete="current-password"
        required
      />

      <div className="auth-form__row">
        <Link to="/auth/forgot-password" className="auth-form__link">
          Mot de passe oublié ?
        </Link>
      </div>

      <Button type="submit" fullWidth>
        Se connecter
      </Button>
    </form>
  )
}

export default Login
