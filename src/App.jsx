import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Detail from './pages/Detail'
import CartDrawer from './components/CartDrawer'

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Detail />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
      <CartDrawer />
      <footer className="footer">© {new Date().getFullYear()} Tienda de Videojuegos</footer>
    </div>
  )
}