import './Switch.css'

function Switch({ checked, onChange, id, label, disabled = false }) {
  return (
    <label
      className={`switch${checked ? ' switch--on' : ''}${
        disabled ? ' switch--disabled' : ''
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  )
}

export default Switch