import './Input.css'

function Input({
  id,
  label,
  helperText,
  error,
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = ['input', `input--${size}`, error ? 'input--error' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="field">
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={classes} aria-invalid={Boolean(error)} {...rest} />
      {error ? (
        <p className="field__message field__message--error">{error}</p>
      ) : helperText ? (
        <p className="field__message">{helperText}</p>
      ) : null}
    </div>
  )
}

export default Input
