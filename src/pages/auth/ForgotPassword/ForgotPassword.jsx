import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button.jsx'
import Input from '../../../components/Input/Input.jsx'
import '../AuthForm.css'

function ForgotPassword() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/auth/otp')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__header">
        <h1>Mot de passe oublié</h1>
        <p>
          Entrez votre adresse email, nous vous enverrons un code de
          vérification.
        </p>
      </div>

      <Input
        id="email"
        type="email"
        label="Adresse email"
        placeholder="vous@exemple.com"
        autoComplete="email"
        required
      />

      <Button type="submit" fullWidth>
        Envoyer le code
      </Button>

      <p className="auth-form__footer">
        <Link to="/auth/login" className="auth-form__link">
          Retour à la connexion
        </Link>
      </p>
    </form>
  )
}

export default ForgotPassword
