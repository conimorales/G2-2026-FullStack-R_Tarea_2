import { NavLink } from 'react-router-dom'

function HeaderLogo() {
  return (
    <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
      <i className="fa-solid fa-house"></i>
      <span className="d-flex flex-column lh-1">
        <span className="brand-name">CMORALES</span>
        <span className="brand-sub">GROUP</span>
      </span>
    </NavLink>
  )
}

export default HeaderLogo