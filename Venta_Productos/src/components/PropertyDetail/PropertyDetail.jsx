import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { urlProducto } from '../../data/api'
import { nombreCategoria, formatearPrecio, precioFinal, tieneOferta } from '../../data/productos'
import { Cargando, ErrorCarga } from '../UI/Estados'
import PhotoGallery from './PhotoGallery'
import { armarCaracteristicas, armarCondiciones } from './helpers'
import './PropertyDetail.css'

const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

function PropertyDetail() {
  const { id } = useParams()
  // Antes: PROPIEDADES.find((p) => String(p.id) === id)
  // Ahora: le pedimos a la API el producto con ese id
  const { data: producto, cargando, error, reintentar } = useFetch(urlProducto(id))

  if (cargando) {
    return (
      <div className="container py-5">
        <Cargando texto="Cargando producto…" />
      </div>
    )
  }

  // La API responde 404 si el id no existe (ej: /products/9999)
  if (error?.status === 404 || (!error && !producto)) {
    return (
      <div className="container py-5">
        <p>No encontramos este producto.</p>
        <Link to="/products">Volver a los productos</Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <ErrorCarga texto="No pudimos cargar este producto." onReintentar={reintentar} />
      </div>
    )
  }

  const caracteristicas = armarCaracteristicas(producto)
  const condiciones = armarCondiciones(producto)
  const mensajeWhatsApp = encodeURIComponent(`Hola, me interesa: ${producto.title}`)

  return (
    <div className="container py-4">
      <div className="mb-3">
        <Link to={`/products?cat=${producto.category}`} className="badge-tipo mb-2 d-inline-block text-decoration-none">
          {nombreCategoria(producto.category)}
        </Link>
        <h1 className="h4 mb-1">{producto.title}</h1>
        {producto.brand && <p className="text-muted mb-0">{producto.brand}</p>}
      </div>

      {/* Los productos no traen ubicación, así que la galería se muestra sin mapa */}
      <PhotoGallery imagenes={producto.images} name={producto.title} />

      <div className="row mt-4 g-4">
        <div className="col-lg-8">
          <p className="mb-4">{producto.description}</p>

          <h2 className="h6 mb-3">Lo que este producto ofrece</h2>
          <ul className="feature-list mb-4">
            {caracteristicas.map((c) => (
              <li key={c.texto}>
                <i className={`fa-solid ${c.icono}`}></i>
                <span>{c.texto}</span>
              </li>
            ))}
          </ul>

          {condiciones.length > 0 && (
            <>
              <h2 className="h6 mb-2">Envío y garantía</h2>
              <ul className="mb-4">
                {condiciones.map((c) => (
                  <li key={c.titulo}>
                    <strong>{c.titulo}:</strong> {c.texto}
                  </li>
                ))}
              </ul>
            </>
          )}

          {producto.reviews?.length > 0 && (
            <>
              <h2 className="h6 mb-3">Reseñas ({producto.reviews.length})</h2>
              <div className="d-flex flex-column gap-2 mb-4">
                {producto.reviews.map((r, i) => (
                  <div key={i} className="card p-3">
                    <div className="d-flex justify-content-between flex-wrap gap-2">
                      <strong>{r.reviewerName}</strong>
                      <span className="text-warning" aria-label={`${r.rating} de 5 estrellas`}>
                        {'★'.repeat(r.rating)}
                        <span className="text-muted">{'★'.repeat(5 - r.rating)}</span>
                      </span>
                    </div>
                    <p className="mb-1">{r.comment}</p>
                    <small className="text-muted">{formatoFecha.format(new Date(r.date))}</small>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card p-4">
            <p className="h5 mb-1">{formatearPrecio(precioFinal(producto))}</p>
            {tieneOferta(producto) && (
              <p className="text-small mb-2">
                <s className="text-muted">{formatearPrecio(producto.price)}</s>{' '}
                <span className="text-danger fw-semibold">−{Math.round(producto.discountPercentage)}%</span>
              </p>
            )}
            <p className="text-small text-muted mb-3">
              {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Producto agotado'}
            </p>
            <a
              href={`https://wa.me/56900000000?text=${mensajeWhatsApp}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-100"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail