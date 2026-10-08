function HowItWorks() {
  return (
    <section className="section3 home-how-it-works">
      <div className="container py-4">
        <h2 className="h6 text-center mb-4">Arrendar en tres pasos</h2>

        <div className="row g-4 text-center text-md-start">
          <div className="col-md-4">
            <span className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2 step-circle">
              1
            </span>
            <h3 className="h6">Busca y filtra</h3>
            <p className="text-small text-muted mb-0">Elige región, comuna y tipo de propiedad.</p>
          </div>

          <div className="col-md-4">
            <span className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2 step-circle">
              2
            </span>
            <h3 className="h6">Agenda una visita</h3>
            <p className="text-small text-muted mb-0">Coordina directo con nosotros, sin intermediarios.</p>
          </div>

          <div className="col-md-4">
            <span className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2 step-circle">
              3
            </span>
            <h3 className="h6">Firma y múdate</h3>
            <p className="text-small text-muted mb-0">Cierra el contrato y listo: tu nuevo hogar te espera.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks