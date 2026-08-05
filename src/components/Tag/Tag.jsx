import './Tag.css'

function Tag({ variant = 'neutral', onRemove, className = '', children, ...rest }) {
  const classes = ['tag', `tag--${variant}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
      {onRemove && (
        <button
          type="button"
          className="tag__remove"
          aria-label="Retirer"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  )
}

export default Tag
