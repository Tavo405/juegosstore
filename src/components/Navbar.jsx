import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { count, toggle } = useCart()
  return (
    <header className="navbar">
      <Link to="/" className="brand">🎮 JuegosStore</Link>
      <nav className="links" style={{display:'flex', alignItems:'center', gap:'.75rem'}}>
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        <button className="cart-btn" onClick={toggle}>
          🛒<span className="badge">{count}</span>
        </button>
      </nav>
    </header>
  )
}