import { Link } from 'react-router-dom'
import PropertyCarousel from './PropertyCarousel'
import { nombreCategoria, formatearPrecio, precioFinal, tieneOferta } from '../../data/productos'

function PropertyCard({ producto }) {
  const urlDetalle = `/products/${producto.id}`

  return (
    <div className="card product-card h-100">
      <PropertyCarousel producto={producto} />

      <div className="product-card-body">
        <span className="badge-tipo align-self-start">{nombreCategoria(producto.category)}</span>

        <h3 className="product-card-title">
          <Link to={urlDetalle}>{producto.title}</Link>
        </h3>

        <p className="product-card-meta">
          {producto.brand || 'Sin marca'} · <i className="fa-solid fa-star text-warning"></i> {producto.rating.toFixed(1)}
        </p>

        {/* El precio va abajo y grande: es lo que más mira el comprador */}
        <div className="product-card-precio">
          <span className="precio-actual">{formatearPrecio(precioFinal(producto))}</span>
          {tieneOferta(producto) && (
            <span className="precio-oferta">
              <s>{formatearPrecio(producto.price)}</s> −{Math.round(producto.discountPercentage)}%
            </span>
          )}
        </div>

        <Link to={urlDetalle} className="btn btn-sm btn-style-1 w-100">
          Ver producto
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard