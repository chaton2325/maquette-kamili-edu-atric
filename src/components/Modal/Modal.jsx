import { useEffect } from 'react'
import './Modal.css'

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <div className="modal__header">
            <h3 className="modal__title">{title}</h3>
            <button
              type="button"
              className="modal__close"
              aria-label="Fermer"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
