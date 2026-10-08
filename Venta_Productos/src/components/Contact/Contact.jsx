import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { urlProducto } from '../../data/api'
import { formatearPrecio, precioFinal } from '../../data/productos'

const MOTIVOS = {
  producto: 'Consulta sobre un producto',
  pedido: 'Estado de mi pedido',
  devolucion: 'Cambio o devolución',
  otro: 'Otro',
}

// Estos motivos necesitan el número de pedido
const PIDE_NUMERO_PEDIDO = ['pedido', 'devolucion']

function Contacto() {
  // Si llegas desde un producto, la URL trae su id: /contacto?id=12
  const [params] = useSearchParams()
  const productoId = params.get('id')

  const formularioVacio = {
    nombre: '',
    correo: '',
    motivo: productoId ? 'producto' : '',
    pedido: '',
    mensaje: '',
  }

  const [form, setForm] = useState(formularioVacio)
  const [enviado, setEnviado] = useState(null)

  // Un solo handler para todos los campos: usa el "name" del input
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí podrías conectar con un backend o servicio de email (Formspree, EmailJS, etc.)
    setEnviado({ nombre: form.nombre, correo: form.correo })
    setForm(formularioVacio)
  }

  const handleReset = () => {
    setForm(formularioVacio)
    setEnviado(null)
  }

  const pideNumeroPedido = PIDE_NUMERO_PEDIDO.includes(form.motivo)

  return (
    <div className="container py-4">
      <h1 className="h4 mb-1">Contacto</h1>
      <p className="text-muted mb-4">
        ¿Tienes dudas sobre un producto o una compra? Escríbenos y te respondemos en menos de 24 horas.
      </p>

      {productoId && <ProductoConsultado id={productoId} />}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="tucorreo@ejemplo.cl"
                  required
                />
              </div>

              <div className={pideNumeroPedido ? 'col-md-6' : 'col-12'}>
                <label htmlFor="motivo" className="form-label">Motivo</label>
                <select
                  className="form-select"
                  id="motivo"
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un motivo</option>
                  {Object.entries(MOTIVOS).map(([valor, texto]) => (
                    <option key={valor} value={valor}>{texto}</option>
                  ))}
                </select>
              </div>

              {/* Solo aparece si el motivo es pedido o devolución */}
              {pideNumeroPedido && (
                <div className="col-md-6">
                  <label htmlFor="pedido" className="form-label">Número de pedido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pedido"
                    name="pedido"
                    value={form.pedido}
                    onChange={handleChange}
                    placeholder="Ej: 10234"
                    required
                  />
                </div>
              )}

              <div className="col-12">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos en qué te podemos ayudar…"
                  required
                ></textarea>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                <i className="fa-solid fa-paper-plane me-1"></i> Enviar consulta
              </button>
              <button type="reset" className="btn btn-outline-secondary">
                Limpiar
              </button>
            </div>

            {enviado && (
              <div className="alert alert-success mt-3" role="alert">
                ✅ Gracias, {enviado.nombre}. Recibimos tu consulta y te responderemos a <strong>{enviado.correo}</strong>.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

// Muestra arriba del formulario el producto por el que se pregunta
function ProductoConsultado({ id }) {
  const { data: producto, cargando, error } = useFetch(urlProducto(id))

  if (cargando) return <p className="text-muted">Cargando producto…</p>
  if (error || !producto) return null

  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center gap-3">
        <img
          src={producto.thumbnail}
          alt={producto.title}
          width="64"
          height="64"
          style={{ objectFit: 'contain', background: '#fff', borderRadius: 8 }}
        />
        <div className="flex-grow-1">
          <p className="text-small text-muted mb-0">Estás consultando por:</p>
          <p className="fw-semibold mb-0">{producto.title}</p>
          <p className="text-small mb-0">{formatearPrecio(precioFinal(producto))}</p>
        </div>
        <Link to={`/products/${producto.id}`} className="text-small">Ver producto</Link>
      </div>
    </div>
  )
}

export default Contacto