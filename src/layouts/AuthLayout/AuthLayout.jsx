import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__wrapper">
        <div className="auth-layout__brand">
          <span className="auth-layout__brand-mark">K</span>
          <span>Kamili Educ@tric</span>
        </div>
        <div className="auth-layout__panel">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
