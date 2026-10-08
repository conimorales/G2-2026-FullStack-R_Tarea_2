// Arma la lista "Lo que este producto ofrece" desde los campos de la API
export function armarCaracteristicas(p) {
    const lista = []

    if (p.brand) lista.push({ icono: 'fa-tag', texto: `Marca ${p.brand}` })
    lista.push({ icono: 'fa-star', texto: `Valoración ${p.rating.toFixed(1)} de 5` })
    lista.push({
        icono: p.stock > 0 ? 'fa-boxes-stacked' : 'fa-ban',
        texto: p.stock > 0 ? `${p.stock} unidades en stock` : 'Sin stock',
    })
    if (p.dimensions) {
        const { width, height, depth } = p.dimensions
        lista.push({ icono: 'fa-ruler-combined', texto: `${width} × ${height} × ${depth} cm` })
    }
    if (p.weight) lista.push({ icono: 'fa-weight-hanging', texto: `Peso ${p.weight} kg` })
    if (p.minimumOrderQuantity > 1) {
        lista.push({ icono: 'fa-cart-shopping', texto: `Compra mínima de ${p.minimumOrderQuantity} unidades` })
    }

    return lista
}

// Equivalente a tus "condiciones": envío, garantía y devolución
export function armarCondiciones(p) {
    return [
        p.shippingInformation && { titulo: 'Envío', texto: p.shippingInformation },
        p.warrantyInformation && { titulo: 'Garantía', texto: p.warrantyInformation },
        p.returnPolicy && { titulo: 'Devoluciones', texto: p.returnPolicy },
    ].filter(Boolean)
}