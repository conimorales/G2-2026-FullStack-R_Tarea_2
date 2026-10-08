import { Link } from 'react-router-dom'
import PropertyCarousel from './PropertyCarousel'
import { TIPO_LABELS } from './constants'

function PropertyCard({ propiedad }) {
  return (
    <div className="card col-sm-12 col-lg-12">
      <PropertyCarousel propiedad={propiedad} />
      <div className="p-3">
        <span className="badge-tipo mb-2">{TIPO_LABELS[propiedad.category]}</span>
        <h3 className="h6 mb-1">{propiedad.name}</h3>
        <p className="text-small text-muted mb-1">{propiedad.comuna}</p>
        <p className="fw-semibold mb-2">{propiedad.precio} / mes</p>
        <Link to={`/propiedades/${propiedad.id}`} className="badge-tipo text-decoration-none d-inline-block">
          Ver detalles
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard