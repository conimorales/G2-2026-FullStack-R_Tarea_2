import { useState } from 'react'
import MiniMap from './MiniMap'
import AllPhotosModal from './AllPhotosModal'

function PhotoGallery({ imagenes, name, ubicacion }) {
  const [showModal, setShowModal] = useState(false)

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="gallery-placeholder">
        <i className="fa-solid fa-image"></i>
      </div>
    )
  }

  const conMapa = Boolean(ubicacion)
  const maxFotos = conMapa ? 4 : 5
  const visibles = imagenes.slice(0, maxFotos)
  const totalCeldas = conMapa ? visibles.length + 1 : visibles.length
  const restantes = imagenes.length - visibles.length

  return (
    <>
      <div className={`gallery-grid gallery-grid--${totalCeldas}`}>
        {visibles.map((src, idx) => (
          <div className="gallery-cell" key={src}>
            <img src={src} alt={`${name} - foto ${idx + 1}`} />
          </div>
        ))}
        {conMapa && <MiniMap ubicacion={ubicacion} name={name} />}
      </div>

      {restantes > 0 && (
        <button
          type="button"
          className="gallery-more-badge gallery-more-badge--standalone"
          onClick={() => setShowModal(true)}
        >
          <i className="fa-solid fa-grip"></i> Mostrar todas las fotos ({imagenes.length})
        </button>
      )}

      {showModal && (
        <AllPhotosModal imagenes={imagenes} name={name} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export default PhotoGallery