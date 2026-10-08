import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GRUPOS_MENU, nombreCategoria } from '../../data/productos'

function MenuDrawer({ abierto, onCerrar }) {
  const [grupoActivo, setGrupoActivo] = useState(0)
  const botonCerrarRef = useRef(null)

  useEffect(() => {
    if (!abierto) return

    // Cerrar con la tecla Escape
    const alPresionarTecla = (e) => {
      if (e.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alPresionarTecla)

    // Evita que la página de fondo haga scroll mientras el menú está abierto
    document.body.style.overflow = 'hidden'
    botonCerrarRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', alPresionarTecla)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  const grupo = GRUPOS_MENU[grupoActivo]

  // En celular, tocar un grupo abierto lo cierra (acordeón)
  const alternarGrupo = (i) => setGrupoActivo(i === grupoActivo ? -1 : i)

  return (
    <div className="menu-overlay" onClick={onCerrar}>
      <aside
        className="menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de categorías"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Columna izquierda: grupos */}
        <div className="menu-col menu-col--grupos">
          <div className="menu-head">
            <span className="menu-saludo">¡Hola!</span>
            <button ref={botonCerrarRef} type="button" className="menu-cerrar" onClick={onCerrar} aria-label="Cerrar menú">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <ul className="menu-lista">
            <li>
              <Link to="/products?orden=rating-desc" className="menu-item" onClick={onCerrar}>
                <span>Mejor valorados <span className="menu-badge">TOP</span></span>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>
            <li>
              <Link to="/products" className="menu-item" onClick={onCerrar}>
                <span>Todos los productos</span>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </li>

            {GRUPOS_MENU.map((g, i) => (
              <li key={g.titulo}>
                <button
                  type="button"
                  className={`menu-item ${i === grupoActivo ? 'menu-item--activo' : ''}`}
                  onClick={() => alternarGrupo(i)}
                  onMouseEnter={() => setGrupoActivo(i)}
                  aria-expanded={i === grupoActivo}
                >
                  <span>{g.titulo}</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                {/* Solo en celular: subcategorías debajo del grupo */}
                {i === grupoActivo && (
                  <ul className="menu-sub menu-sub--movil">
                    {g.categorias.map((slug) => (
                      <li key={slug}>
                        <Link to={`/products?cat=${slug}`} onClick={onCerrar}>{nombreCategoria(slug)}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha (solo escritorio): subcategorías del grupo activo */}
        <div className="menu-col menu-col--sub">
          {grupo && (
            <>
              <h2 className="menu-sub-titulo">{grupo.titulo}</h2>
              <ul className="menu-sub">
                {grupo.categorias.map((slug) => (
                  <li key={slug}>
                    <Link to={`/products?cat=${slug}`} onClick={onCerrar}>{nombreCategoria(slug)}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}

export default MenuDrawer