function PropertyCarousel({ producto }) {
  const carouselId = `carousel-${producto.id}`
  const imagenes = producto.images?.length ? producto.images : [producto.thumbnail].filter(Boolean)

  if (imagenes.length === 0) {
    return (
      <div className="property-img-placeholder">
        <i className="fa-solid fa-image"></i>
      </div>
    )
  }

  return (
    <div id={carouselId} className="carousel slide property-carousel">
      <div className="carousel-inner">
        {imagenes.map((src, idx) => (
          <div key={src} className={`carousel-item${idx === 0 ? ' active' : ''}`}>
            <img
              src={src}
              className="d-block w-100 property-carousel-img"
              alt={`${producto.title} - foto ${idx + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {imagenes.length > 1 && (
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