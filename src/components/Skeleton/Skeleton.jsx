import './Skeleton.css'

function Skeleton({ variant = 'text', width, height, className = '', style = {}, count = 1, ...rest }) {
  const useStyle = { ...style }
  if (width) useStyle.width = width
  if (height) useStyle.height = height

  const items = Array.from({ length: count })

  return (
    <div className={`skeleton ${className}`.trim()}>
      {items.map((_, index) => (
        <span
          key={index}
          className={`skeleton__item skeleton__item--${variant}`}
          style={useStyle}
          {...rest}
        />
      ))}
    </div>
  )
}

export default Skeleton