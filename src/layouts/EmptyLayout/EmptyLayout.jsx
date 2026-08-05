import { Outlet } from 'react-router-dom'
import './EmptyLayout.css'

function EmptyLayout() {
  return (
    <div className="empty-layout">
      <div className="empty-layout__inner">
        <Outlet />
      </div>
    </div>
  )
}

export default EmptyLayout
