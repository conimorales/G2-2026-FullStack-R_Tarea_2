import Button from '../Button/Button'

function ContactCTA() {
  return (
    <section className="py-4" id="contacto">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <h2 className="h6 mb-1">¿Quieres realizar una compra?</h2>
          <p className="text-small text-muted mb-0">
            Te ayudamos a realizar tu compra, escríbenos.
          </p>
        </div>
        <Button
          variant="outline-primary"
          className="btn-sm btn-style-1"
          onClick={() => window.open('https://wa.me/56900000000')}
        >
          Contactar por WhatsApp
        </Button>
      </div>
    </section>
  )
}

export default ContactCTA