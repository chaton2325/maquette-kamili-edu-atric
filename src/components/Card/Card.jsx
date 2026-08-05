import './Card.css'

function Card({ className = '', children, ...rest }) {
  const classes = ['card', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

function CardHeader({ className = '', children, ...rest }) {
  const classes = ['card__header', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

function CardBody({ className = '', children, ...rest }) {
  const classes = ['card__body', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

function CardFooter({ className = '', children, ...rest }) {
  const classes = ['card__footer', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
