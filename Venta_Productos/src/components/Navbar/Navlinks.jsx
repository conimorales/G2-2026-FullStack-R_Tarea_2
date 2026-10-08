import { NavLink } from 'react-router-dom'

function NavLinks() {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item navbar-li">
        <NavLink
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          to="/"
        >
          <i className="fa-solid fa-building"></i> Inicio
        </NavLink>
      </li>
      <li className="nav-item navbar-li">
        <NavLink
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          to="/products"
        >
          <i className="fa-solid fa-building"></i> Productos
        </NavLink>
      </li>
      <li className="nav-item navbar-li">
        <NavLink
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          to="/contacto"
        >
          <i className="fa-solid fa-phone"></i> Contacto
        </NavLink>
      </li>
    </ul>
  )
}

export default NavLinks