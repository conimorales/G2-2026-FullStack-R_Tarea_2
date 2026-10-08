import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import PropertyDetail from './components/PropertyDetail/PropertyDetail'
import Contacto from './components/Contact/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<PropertyDetail />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="*" element={<p className="container py-5">Esta página no existe.</p>} />
    </Routes>
  )
}

export default App