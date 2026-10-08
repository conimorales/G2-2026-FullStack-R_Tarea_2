export function Cargando({ texto = 'Cargando productos…' }) {
  return (
    <div className="text-center py-5" role="status">
      <div className="spinner-border text-secondary mb-2" aria-hidden="true"></div>
      <p className="text-muted mb-0">{texto}</p>
    </div>
  )
}

export function ErrorCarga({ texto = 'No pudimos cargar los productos.', onReintentar }) {
  return (
    <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-2" role="alert">
      <span>
        <i className="fa-solid fa-triangle-exclamation me-2"></i>
        {texto} Revisa tu conexión.
      </span>
      {onReintentar && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  )
}