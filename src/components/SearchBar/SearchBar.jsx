import { useState } from 'react'
import './SearchBar.css'

function SearchBar({
  placeholder = 'Rechercher…',
  value,
  defaultValue = '',
  onChange,
  onSearch,
  onClear,
  size = 'md',
  className = '',
}) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const handleChange = (event) => {
    const next = event.target.value
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch?.(current)
  }

  const handleClear = () => {
    if (!isControlled) setInternal('')
    onChange?.('')
    onClear?.()
  }

  return (
    <form
      className={`searchbar searchbar--${size} ${className}`.trim()}
      role="search"
      onSubmit={handleSubmit}
    >
      <span className="searchbar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        className="searchbar__input"
        type="search"
        value={current}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={handleChange}
      />
      {current && (
        <button
          type="button"
          className="searchbar__clear"
          aria-label="Effacer la recherche"
          onClick={handleClear}
        >
          ✕
        </button>
      )}
    </form>
  )
}

export default SearchBar