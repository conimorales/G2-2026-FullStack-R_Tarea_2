# Compra de productos 🛍️

Plataforma web de compra de productos desarrollada en React, que consume la API pública [DummyJSON](https://dummyjson.com/docs/products).

## Descripción

Este proyecto simula una tienda online. El usuario puede:

- Ver en el inicio los productos mejor valorados, filtrados por categoría.
- Buscar productos por nombre o marca desde el buscador del navbar.
- Ver el catálogo completo, con filtro por categoría, orden por precio o valoración, y paginación.
- Ingresar al detalle de un producto: galería de fotos, descripción, características, envío y garantía, y reseñas de compradores.
- Ver el precio con descuento cuando el producto está en oferta.
- Cambiar entre modo claro y oscuro.
- Consultar por un producto vía WhatsApp o mediante el formulario de contacto.

## Consumo de la API

Los datos se obtienen en tiempo real desde DummyJSON. Todas las URLs están centralizadas en `src/data/api.js`:

| Endpoint | Uso |
|---|---|
| `/products?limit=&skip=` | Catálogo con paginación |
| `/products/search?q=` | Búsqueda desde el navbar |
| `/products/category/:slug` | Filtro por categoría |
| `/products?sortBy=&order=` | Orden por precio o valoración |
| `/products/:id` | Detalle de un producto |
| `/products/category-list` | Lista de categorías para el filtro |

Las peticiones se hacen con el hook personalizado `useFetch` (`src/hooks/useFetch.js`), que:

- Maneja los estados de **carga**, **error** y **datos**.
- Cancela la petición anterior con `AbortController` si cambian los filtros, para evitar resultados desordenados.
- Expone una función `reintentar` para el botón de error.

Los filtros del catálogo (búsqueda, categoría, orden y página) se guardan en la **URL** con `useSearchParams`. Así se pueden compartir, recargar y navegar con el botón "atrás" del navegador.

## Componentes creados

**Navegación**
- **Navbar / HeaderLogo**: logo, nombre de la marca y barra de navegación principal.
- **SearchBar**: buscador del navbar; redirige al catálogo con la búsqueda en la URL.
- **NavLinks**: links de navegación, con estado activo usando `NavLink`.
- **ThemeToggle**: alterna entre modo claro y oscuro (`useState` + `useEffect` + `localStorage`).

**Inicio**
- **Home**: página de inicio; muestra los productos destacados usando `.map`.
- **SearchForm**: filtro por categoría (cargada desde la API) y orden opcional; inputs controlados.
- **PropertyCard**: tarjeta de producto; recibe el producto por props (título, precio, descuento, marca, categoría, valoración e imágenes).
- **PropertyCarousel**: carrusel de fotos dentro de cada tarjeta.
- **HowItWorks**: sección con los pasos para comprar.
- **ContactCTA**: llamado a la acción de contacto.

**Catálogo**
- **Products**: catálogo completo con búsqueda, filtro, orden y paginación.
- **Pagination**: paginación reutilizable con las clases de Bootstrap.

**Detalle**
- **PropertyDetail**: detalle de un producto, obtenido por su `id` desde la API.
- **PhotoGallery**: galería de fotos con modal para ver todas las imágenes.
- **AllPhotosModal**: modal con todas las fotos del producto.

**Generales**
- **Estados** (`Cargando` y `ErrorCarga`): spinner de carga y alerta de error con botón para reintentar.
- **Button**: botón reutilizable con variantes (primary, outline-secondary, etc.).
- **Contacto**: formulario de contacto.
- **Footer**: pie de página.

## Estructura de datos

Cada producto de la API incluye, entre otros campos:

- `id`, `title`, `description`
- `price` y `discountPercentage` (el precio final se calcula con el descuento)
- `category`, `brand`, `rating`, `stock`
- `images` y `thumbnail`
- `dimensions`, `weight`
- `shippingInformation`, `warrantyInformation`, `returnPolicy`
- `reviews` (reseñas de compradores)

Los nombres de las categorías se traducen al español en `src/data/productos.js`, que también contiene las funciones de formato de precio y las opciones de orden.

## Tecnologías usadas

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/) (clases de grid y componentes)
- [Font Awesome](https://fontawesome.com/) (iconografía)
- [DummyJSON](https://dummyjson.com/) (API pública de productos)
- CSS personalizado con variables (soporte de modo claro/oscuro)

## Instrucciones para ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/conimorales/G2-2026-Diplomado-FullStack-React.git

# 2. Entrar a la carpeta del proyecto
cd G2-2026-Diplomado-FullStack-React/arriendo-casas

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev
```

### Dependencias principales

El comando `npm install` instala automáticamente todo lo listado en `package.json`, entre ellas:

```bash
npm install react react-dom react-router-dom bootstrap
npm install @fortawesome/fontawesome-free
```

- `react-router-dom`: navegación entre páginas (`/`, `/products`, `/products/:id`, `/contacto`).
- `bootstrap`: sistema de grid y estilos base (`row`, `col-*`, `btn`, `form-select`, `pagination`, etc.).

> Font Awesome se carga vía CDN en `index.html`, no requiere instalación con npm.
>
> No se necesita API key: DummyJSON es una API pública y gratuita.

## Capturas de pantalla

### Inicio
![Vista inicio](./src/assets/img1.png)

### Catálogo de productos
![Vista catálogo](./src/assets/img2.png)

### Detalle de producto
![Vista detalle](./src/assets/img4.png)

---

Proyecto desarrollado como parte del Diplomado Full Stack React.

### Estado del proyecto

- [x] Consumo de la API de DummyJSON
- [x] Buscador del navbar conectado
- [x] Filtro por categoría, orden y paginación
- [x] Detalle de producto
- [ ] Carrito de compras
- [ ] Mejorar vista de contacto