import { useFetch } from '../../hooks/useFetch'
import { URL_CATEGORIAS } from '../../data/api'
import { nombreCategoria, ORDENES } from '../../data/productos'

function SearchForm({ categoria, onCategoriaChange, orden, onOrdenChange }) {
  const { data: categorias, cargando, error } = useFetch(URL_CATEGORIAS)

  return (
    <form className="card text-small p-3" onSubmit={(e) => e.preventDefault()}>
      <div className="row g-2 align-items-end">
        <div className={onOrdenChange ? 'col-sm-6' : 'col-12'}>
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => onCategoriaChange(e.target.value)}
            disabled={cargando || Boolean(error)}
          >
            <option value="">
              {cargando ? 'Cargando categorías…' : error ? 'No se pudieron cargar' : 'Todas'}
            </option>
            {categorias?.map((slug) => (
              <option key={slug} value={slug}>{nombreCategoria(slug)}</option>
            ))}
          </select>
        </div>

        {/* El selector de orden solo aparece si el padre lo pide */}
        {onOrdenChange && (
          <div className="col-sm-6">
            <label htmlFor="orden" className="form-label">Ordenar por</label>
            <select id="orden" className="form-select" value={orden} onChange={(e) => onOrdenChange(e.target.value)}>
              {Object.entries(ORDENES).map(([clave, { label }]) => (
                <option key={clave} value={clave}>{label}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchForm