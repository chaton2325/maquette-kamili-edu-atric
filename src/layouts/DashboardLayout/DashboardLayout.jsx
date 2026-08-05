import { Outlet } from 'react-router-dom'
import './DashboardLayout.css'

function DashboardLayout({ topbar, sidebar }) {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-layout__topbar">{topbar}</header>
      <aside className="dashboard-layout__sidebar">{sidebar}</aside>
      <main className="dashboard-layout__content">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
