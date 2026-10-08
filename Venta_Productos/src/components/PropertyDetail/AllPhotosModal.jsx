function AllPhotosModal({ imagenes, name, onClose }) {
  return (
    <div className="photos-modal-overlay" onClick={onClose}>
      <div className="photos-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="photos-modal-close" onClick={onClose} aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="h6 mb-3">{name}</h2>
        <div className="photos-modal-grid">
          {imagenes.map((src, idx) => (
            <img key={src} src={src} alt={`${name} - foto ${idx + 1}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllPhotosModal