import { REGIONES } from '../../data/regiones'

function SearchForm({ region, comuna, onRegionChange, onComunaChange }) {
  const comunas = region ? REGIONES[region].comunas : []

  return (
    <form className="card text-small" onSubmit={(e) => e.preventDefault()}>
      <div className="row g-2 align-items-end">
        <div className="col-sm-5">
          <label htmlFor="region" className="form-label">
            Región
          </label>
          <select
            id="region"
            className="form-select"
            value={region}
            onChange={onRegionChange}
          >
            <option value="">Todas</option>
            {Object.entries(REGIONES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="col-sm-5">
          <label htmlFor="comuna" className="form-label">
            Comuna
          </label>
          <select
            id="comuna"
            className="form-select"
            value={comuna}
            onChange={(e) => onComunaChange(e.target.value)}
            disabled={!region}
          >
            <option value="">
              {region ? 'Todas' : 'Primero elige región'}
            </option>
            {comunas.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-sm-2">
          <button type="submit" className="btn btn-primary" aria-label="Buscar arriendo">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm