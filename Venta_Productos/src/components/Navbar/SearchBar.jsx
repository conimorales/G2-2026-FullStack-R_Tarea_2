import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [texto, setTexto] = useState('')
  const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault()
  const q = texto.trim()
  navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
}

  return (
    <div className="flex-grow-1 d-flex justify-content-center mx-lg-4">
      <form className="search-pill" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-pill-field"
          placeholder="¿Qué estás buscando?"
          aria-label="Buscar productos"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <span className="search-pill-divider" aria-hidden="true"></span>
        <button type="submit" className="search-pill-btn" aria-label="Buscar">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar