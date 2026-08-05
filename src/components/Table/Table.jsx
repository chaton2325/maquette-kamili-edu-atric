import './Table.css'

function Table({ className = '', children, ...rest }) {
  const classes = ['table', className].filter(Boolean).join(' ')
  return (
    <div className="table-wrapper">
      <table className={classes} {...rest}>
        {children}
      </table>
    </div>
  )
}

export default Table
