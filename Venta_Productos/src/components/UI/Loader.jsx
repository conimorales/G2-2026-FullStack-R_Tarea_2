function Loader({ texto = 'Cargando productos…' }) {
  return (
    <div className="text-center py-5" role="status">
      <div className="spinner-border text-secondary mb-2" aria-hidden="true"></div>
      <p className="text-muted mb-0">{texto}</p>
    </div>
  )
}

export default Loader