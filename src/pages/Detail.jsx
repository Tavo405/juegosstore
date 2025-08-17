import { useParams, Link, useLocation } from 'react-router-dom'
import localGames from '../data/games.json'

export default function Detail() {
  const { id } = useParams()
  const location = useLocation()
  // 1) si venimos desde el catálogo, el juego viene en el state
  let game = location.state?.game

  // 2) si no hay state (recarga / URL directa), buscamos en localStorage
  if (!game) {
    try {
      const last = JSON.parse(localStorage.getItem('lastGames') || '[]')
      game = last.find(g => String(g.id) === String(id)) || null
    } catch {
      // ignore
    }
  }

  // 3) último intento: en el JSON local del proyecto
  if (!game) {
    game = localGames.find(g => String(g.id) === String(id)) || null
  }

  if (!game) {
    return (
      <main>
        <p>Juego no encontrado.</p>
        <Link to="/" className="btn">Volver al catálogo</Link>
      </main>
    )
  }

  return (
    <main className="detail">
      <img src={game.image} alt={game.title} />
      <div>
        <h1>{game.title}</h1>
        <p className="muted">{game.platform} · {game.genre}</p>
        <p>{game.description}</p>
        <p className="price">${Number(game.price).toFixed(2)}</p>
        <Link to="/" className="btn">Volver</Link>
      </div>
    </main>
  )
}
