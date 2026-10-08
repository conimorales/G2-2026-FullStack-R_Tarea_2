import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { urlProductos } from '../../data/api'
import { Cargando, ErrorCarga } from '../UI/Estados'
import SearchForm from './SearchForm'
import PropertyCard from './PropertyCard'
// import HowItWorks from './HowItWorks'
import ContactCTA from './ContactCTA'
import './Home.css'

function Home() {
  const [categoria, setCategoria] = useState('')

  // La API filtra por categoría y devuelve los 4 mejor valorados
  const { data, cargando, error, reintentar } = useFetch(
    urlProductos({ categoria, sortBy: 'rating', order: 'desc', limite: 4 })
  )
  const destacados = data?.products ?? []

  return (
    <>
      <section className="section1 hero-compact">
        <div className="container">
          <h1 className="h3 mb-1">Tu tienda online</h1>
          <p className="text-muted mb-3">
            Tecnología, belleza, hogar y más. Compra fácil y recibe en tu casa.
          </p>

          {/* Beneficios: lo primero que muestra cualquier tienda */}
          <div className="row g-2 mb-3 text-small">
            <div className="col-4 d-flex align-items-center gap-2">
              <i className="fa-solid fa-truck-fast text-danger"></i> Envío gratis sobre $100
            </div>
            <div className="col-4 d-flex align-items-center gap-2">
              <i className="fa-solid fa-lock text-danger"></i> Pago seguro
            </div>
            <div className="col-4 d-flex align-items-center gap-2">
              <i className="fa-solid fa-rotate-left text-danger"></i> 30 días para devolver
            </div>
          </div>

          <SearchForm categoria={categoria} onCategoriaChange={setCategoria} />
        </div>
      </section>

      <section className="section2">
        <div className="container">
          <h2 className="h5 mb-3">Productos mejor valorados</h2>

          {cargando ? (
            <Cargando />
          ) : error ? (
            <ErrorCarga onReintentar={reintentar} />
          ) : destacados.length === 0 ? (
            <p className="text-muted">No hay productos en esta categoría por ahora.</p>
          ) : (
            <>
              <div className="row g-3">
                {destacados.map((p) => (
                  <div className="col-6 col-md-3" key={p.id}>
                    <PropertyCard producto={p} />
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <Link
                  to={categoria ? `/products?cat=${categoria}` : '/products'}
                  className="btn btn-outline-primary btn-sm btn-style-1"
                >
                  Ver todos los productos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* <HowItWorks /> */}
      <ContactCTA />
    </>
  )
}

export default Home