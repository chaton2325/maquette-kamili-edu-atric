import './Badge.css'

function Badge({ variant = 'neutral', className = '', children, ...rest }) {
  const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}

export default Badge
