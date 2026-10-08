import { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import HeaderLogo from './HeaderLogo'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import MenuDrawer from './MenuDrawer'
import './Navbar.css'

function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // useCallback: la función no cambia entre renders, así el efecto del menú no se reinicia
  const cerrarMenu = useCallback(() => setMenuAbierto(false), [])

  return (
    <>
      <header className="site-header">
        <div className="container-fluid header-row">
          <HeaderLogo />

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuAbierto(true)}
            aria-expanded={menuAbierto}
          >
            <i className="fa-solid fa-bars"></i>
            <span>Menú</span>
          </button>

          <SearchBar />

          <div className="header-acciones">
            <NavLink to="/contacto" className="header-icono">
              <i className="fa-solid fa-headset"></i>
              <span>Contacto</span>
            </NavLink>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <MenuDrawer abierto={menuAbierto} onCerrar={cerrarMenu} />
    </>
  )
}

export default Navbar