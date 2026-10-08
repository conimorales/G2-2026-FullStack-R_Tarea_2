// La API entrega las categorías en inglés; las mostramos en español
const NOMBRES_CATEGORIA = {
    beauty: 'Belleza',
    fragrances: 'Perfumes',
    furniture: 'Muebles',
    groceries: 'Almacén',
    'home-decoration': 'Decoración',
    'kitchen-accessories': 'Cocina',
    laptops: 'Notebooks',
    'mens-shirts': 'Camisas hombre',
    'mens-shoes': 'Zapatos hombre',
    'mens-watches': 'Relojes hombre',
    'mobile-accessories': 'Accesorios móviles',
    motorcycle: 'Motos',
    'skin-care': 'Cuidado de la piel',
    smartphones: 'Smartphones',
    'sports-accessories': 'Deportes',
    sunglasses: 'Lentes de sol',
    tablets: 'Tablets',
    tops: 'Poleras y tops',
    vehicle: 'Vehículos',
    'womens-bags': 'Carteras',
    'womens-dresses': 'Vestidos',
    'womens-jewellery': 'Joyería',
    'womens-shoes': 'Zapatos mujer',
    'womens-watches': 'Relojes mujer',
}

export function nombreCategoria(slug = '') {
    if (NOMBRES_CATEGORIA[slug]) return NOMBRES_CATEGORIA[slug]
    const texto = slug.replace(/-/g, ' ')
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export const ORDENES = {
    '': { label: 'Relevancia' },
    'precio-asc': { label: 'Precio: menor a mayor', sortBy: 'price', order: 'asc' },
    'precio-desc': { label: 'Precio: mayor a menor', sortBy: 'price', order: 'desc' },
    'rating-desc': { label: 'Mejor valorados', sortBy: 'rating', order: 'desc' },
}

const formatoUSD = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD' })
export const formatearPrecio = (valor) => formatoUSD.format(valor)

// La API entrega el precio y el % de descuento por separado
export function precioFinal(producto) {
    const descuento = producto.discountPercentage || 0
    return Math.round(producto.price * (1 - descuento / 100) * 100) / 100
}

export const tieneOferta = (producto) => (producto.discountPercentage || 0) >= 5


export const GRUPOS_MENU = [
    { titulo: 'Mujer', categorias: ['womens-dresses', 'tops', 'womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches'] },
    { titulo: 'Hombre', categorias: ['mens-shirts', 'mens-shoes', 'mens-watches'] },
    { titulo: 'Belleza', categorias: ['beauty', 'fragrances', 'skin-care'] },
    { titulo: 'Tecnología', categorias: ['smartphones', 'laptops', 'tablets', 'mobile-accessories'] },
    { titulo: 'Hogar', categorias: ['furniture', 'home-decoration', 'kitchen-accessories', 'groceries'] },
    { titulo: 'Deportes y vehículos', categorias: ['sports-accessories', 'motorcycle', 'vehicle'] },
    { titulo: 'Accesorios', categorias: ['sunglasses'] },
]