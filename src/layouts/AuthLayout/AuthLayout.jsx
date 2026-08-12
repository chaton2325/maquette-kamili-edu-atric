import { Outlet } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'
import './AuthLayout.css'

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__wrapper">
        <div className="auth-layout__brand">
          <img className="auth-layout__brand-mark" src={logo} alt="Kamili Edu Campus" />
          <span>Kamili Edu Campus</span>
        </div>
        <div className="auth-layout__panel">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
