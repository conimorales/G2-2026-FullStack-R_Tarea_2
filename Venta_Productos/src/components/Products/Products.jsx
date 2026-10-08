import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { urlProductos, PRODUCTOS_POR_PAGINA } from '../../data/api'
import { ORDENES, nombreCategoria } from '../../data/productos'
import { Cargando, ErrorCarga } from '../UI/Estados'
import SearchForm from '../Home/SearchForm'
import PropertyCard from '../Home/PropertyCard'
import Pagination from './Pagination'
import '../Home/Home.css'

function Products() {
  // Los filtros se leen de la URL: /products?q=phone&cat=...&orden=...&pagina=2
  const [params, setParams] = useSearchParams()
  const busqueda = params.get('q') || ''
  const categoria = params.get('cat') || ''
  const orden = ORDENES[params.get('orden')] ? params.get('orden') : ''
  const pagina = Math.max(1, Number(params.get('pagina')) || 1)

  const { sortBy, order } = ORDENES[orden]
  const { data, cargando, error, reintentar } = useFetch(
    urlProductos({ busqueda, categoria, sortBy, order, pagina })
  )

  const actualizar = (cambios) => {
    const nuevos = new URLSearchParams(params)
    Object.entries(cambios).forEach(([clave, valor]) => {
      if (valor) nuevos.set(clave, valor)
      else nuevos.delete(clave)
    })
    // Cualquier cambio de filtro vuelve a la página 1
    if (!('pagina' in cambios)) nuevos.delete('pagina')
    setParams(nuevos)
  }

  const cambiarPagina = (p) => {
    actualizar({ pagina: p > 1 ? String(p) : '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const total = data?.total ?? 0
  const productos = data?.products ?? []

  let titulo = 'Todos los productos'
  if (busqueda) titulo = `Resultados para "${busqueda}"`
  else if (categoria) titulo = nombreCategoria(categoria)

  return (
    <section className="section2">
      <div className="container py-4">
        <h1 className="h4 mb-1">{titulo}</h1>
        <p className="text-small text-muted mb-3">
          {!cargando && !error && `${total} ${total === 1 ? 'producto' : 'productos'}`}
          {busqueda && (
            <button type="button" className="btn btn-link btn-sm p-0 ms-2" onClick={() => actualizar({ q: '' })}>
              Quitar búsqueda
            </button>
          )}
        </p>

        {/* La API no combina búsqueda + categoría: elegir categoría limpia la búsqueda */}
        <SearchForm
          categoria={busqueda ? '' : categoria}
          onCategoriaChange={(cat) => actualizar({ cat, q: '' })}
          orden={orden}
          onOrdenChange={(o) => actualizar({ orden: o })}
        />

        <div className="mt-4">
          {cargando ? (
            <Cargando />
          ) : error ? (
            <ErrorCarga onReintentar={reintentar} />
          ) : productos.length === 0 ? (
            <p className="text-muted">
              {busqueda
                ? `No encontramos productos para "${busqueda}". Prueba con "phone", "watch" o "perfume".`
                : 'No hay productos disponibles con esos filtros por ahora.'}
            </p>
          ) : (
            <>
              <div className="row g-3">
                {productos.map((p) => (
                  <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                    <PropertyCard producto={p} />
                  </div>
                ))}
              </div>
              <Pagination
                actual={pagina}
                total={Math.ceil(total / PRODUCTOS_POR_PAGINA)}
                onCambiar={cambiarPagina}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Products