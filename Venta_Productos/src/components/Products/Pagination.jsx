function Pagination({ actual, total, onCambiar }) {
  if (total <= 1) return null

  // Muestra como máximo 5 números alrededor de la página actual
  const desde = Math.max(1, Math.min(actual - 2, total - 4))
  const hasta = Math.min(total, desde + 4)
  const paginas = []
  for (let p = desde; p <= hasta; p++) paginas.push(p)

  return (
    <nav aria-label="Paginación de productos" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${actual === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onCambiar(actual - 1)} aria-label="Página anterior">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </li>

        {paginas.map((p) => (
          <li key={p} className={`page-item ${p === actual ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onCambiar(p)}>
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${actual === total ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onCambiar(actual + 1)} aria-label="Página siguiente">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination