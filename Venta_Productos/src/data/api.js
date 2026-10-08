const BASE_URL = 'https://dummyjson.com'

export const PRODUCTOS_POR_PAGINA = 12

const CAMPOS_LISTADO = 'title,price,discountPercentage,rating,thumbnail,images,category,brand,stock'

export function urlProductos({ busqueda, categoria, sortBy, order, pagina = 1, limite = PRODUCTOS_POR_PAGINA }) {
    const params = new URLSearchParams({
        limit: limite,
        skip: (pagina - 1) * limite,
        select: CAMPOS_LISTADO,
    })

    if (sortBy) {
        params.set('sortBy', sortBy)
        params.set('order', order)
    }

    let ruta = '/products'
    if (busqueda) {
        ruta = '/products/search'
        params.set('q', busqueda)
    } else if (categoria) {
        ruta = `/products/category/${encodeURIComponent(categoria)}`
    }

    return `${BASE_URL}${ruta}?${params}`
}

export const urlProducto = (id) => `${BASE_URL}/products/${id}`

export const URL_CATEGORIAS = `${BASE_URL}/products/category-list`