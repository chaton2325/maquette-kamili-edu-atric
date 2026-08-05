import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './DashboardLayout.css'

function DashboardLayout({ topbar, sidebar }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  function close() {
    setOpen(false)
  }

  // Ferme le tiroir à chaque changement de page (clic sur un lien du menu).
  useEffect(() => {
    close()
  }, [location.pathname])

  // Verrouille le défilement du fond quand le tiroir est ouvert.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const hasSidebar = Boolean(sidebar)

  return (
    <div
      className={`dashboard-layout${open ? ' is-drawer-open' : ''}${
        hasSidebar ? '' : ' dashboard-layout--no-sidebar'
      }`}
    >
      <header className="dashboard-layout__topbar">
        {hasSidebar && (
          <button
            type="button"
            className="dashboard-layout__toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="dashboard-sidebar"
          >
            <span className="dashboard-layout__bar" />
            <span className="dashboard-layout__bar" />
            <span className="dashboard-layout__bar" />
          </button>
        )}
        {topbar && <div className="dashboard-layout__topbar-inner">{topbar}</div>}
      </header>

      <div
        className="dashboard-layout__overlay"
        aria-hidden="true"
        onClick={close}
      />

      <aside
        id="dashboard-sidebar"
        className={`dashboard-layout__sidebar${open ? ' is-open' : ''}`}
      >
        {sidebar}
      </aside>

      <main className="dashboard-layout__content">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout