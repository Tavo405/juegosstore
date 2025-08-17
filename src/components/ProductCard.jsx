import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ game }) {
  const { add } = useCart()
  return (
    <article className="card">
      <img src={game.image} alt={game.title} loading="lazy" />
      <div className="card-body">
        <h3>{game.title}</h3>
        <p className="muted">{game.platform} · {game.genre}</p>
        <p className="price">${game.price.toFixed(2)}</p>
        <div style={{display:'grid', gap:'.5rem', gridTemplateColumns:'1fr 1fr'}}>
          {/* Pasamos el juego en el estado del Link */}
          <Link className="btn" to={`/game/${game.id}`} state={{ game }}>Ver detalle</Link>
          <button className="btn" onClick={() => add({ id: game.id, title: game.title, price: game.price, image: game.image })}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
