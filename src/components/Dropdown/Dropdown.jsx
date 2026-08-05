import { useEffect, useRef, useState } from 'react'
import './Dropdown.css'

function Dropdown({ label, items = [], align = 'left' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="dropdown" ref={rootRef}>
      <button
        type="button"
        className="dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <span className="dropdown__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className={`dropdown__menu dropdown__menu--${align}`} role="menu">
          {items.map((item, index) => (
            <li key={item.key ?? index} role="none">
              <button
                type="button"
                role="menuitem"
                className="dropdown__item"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.()
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
