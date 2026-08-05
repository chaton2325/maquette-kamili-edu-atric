import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button.jsx'
import '../AuthForm.css'
import './Otp.css'

const CODE_LENGTH = 6
const RESEND_DELAY = 30

function Otp() {
  const navigate = useNavigate()
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY)
  const inputsRef = useRef([])

  useEffect(() => {
    if (secondsLeft === 0) return undefined
    const timer = setInterval(() => {
      setSecondsLeft((value) => value - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  function handleChange(index, rawValue) {
    const digit = rawValue.replace(/\D/g, '').slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    if (digit && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handleResend() {
    setSecondsLeft(RESEND_DELAY)
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/auth/role')
  }

  const code = digits.join('')
  const isComplete = code.length === CODE_LENGTH

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__header">
        <h1>Vérification</h1>
        <p>Entrez le code à 6 chiffres envoyé à votre adresse.</p>
      </div>

      <div className="otp-inputs">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            className="otp-inputs__field"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
      </div>

      <Button type="submit" fullWidth disabled={!isComplete}>
        Vérifier
      </Button>

      <p className="auth-form__footer">
        {secondsLeft > 0 ? (
          <>Renvoyer le code dans {secondsLeft}s</>
        ) : (
          <button
            type="button"
            className="auth-form__link"
            onClick={handleResend}
          >
            Renvoyer le code
          </button>
        )}
      </p>

      <p className="auth-form__footer">
        <Link to="/auth/login" className="auth-form__link">
          Retour à la connexion
        </Link>
      </p>
    </form>
  )
}

export default Otp
