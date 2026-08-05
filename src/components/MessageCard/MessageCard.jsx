import Avatar from '../Avatar/Avatar.jsx'
import './MessageCard.css'

function MessageCard({
  name,
  preview,
  time,
  src,
  emoji,
  online = false,
  unread = false,
  onClick,
  className = '',
}) {
  const classes = [
    'msg',
    unread ? 'msg--unread' : '',
    onClick ? 'msg--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const Wrapper = onClick ? 'button' : 'div'
  const wrapperProps = onClick ? { type: 'button', onClick } : {}

  return (
    <Wrapper className={classes} {...wrapperProps}>
      <Avatar src={src} emoji={emoji} name={name} size="md" status={online ? 'online' : undefined} />

      <div className="msg__content">
        <div className="msg__line">
          <span className="msg__name">{name}</span>
          {time && <span className="msg__time">{time}</span>}
        </div>
        <p className="msg__preview">{preview}</p>
      </div>

      {unread && (
        <span className="msg__dot" aria-label="Message non lu" />
      )}
    </Wrapper>
  )
}

export default MessageCard