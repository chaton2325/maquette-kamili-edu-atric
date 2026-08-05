import { Outlet } from 'react-router-dom'
import './EmptyLayout.css'

function EmptyLayout() {
  return (
    <div className="empty-layout">
      <Outlet />
    </div>
  )
}

export default EmptyLayout
