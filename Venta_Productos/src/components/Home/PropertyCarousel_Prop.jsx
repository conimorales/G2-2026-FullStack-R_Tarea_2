function PropertyCarousel({ propiedad }) {
  const carouselId = `carousel-${propiedad.id}`

  if (!propiedad.imagenes || propiedad.imagenes.length === 0) {
    return (
      <div className="property-img-placeholder">
        <i className="fa-solid fa-image"></i>
      </div>
    )
  }

  return (
    <div id={carouselId} className="carousel slide property-carousel" data-bs-ride="carousel">
      <div className="carousel-inner">
        {propiedad.imagenes.map((src, idx) => (
          <div key={src} className={`carousel-item${idx === 0 ? ' active' : ''}`}>
            <img src={src} className="d-block w-100 property-carousel-img" alt={`${propiedad.name} - foto ${idx + 1}`} />
          </div>
        ))}
      </div>

      {propiedad.imagenes.length > 1 && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </>
      )}
    </div>
  )
}

export default PropertyCarousel