import { useEffect, useMemo, useState } from 'react'
import Hero from '../components/Hero'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import gamesData from '../data/games.json'   // Fallback local

export default function Home() {
  const [games, setGames] = useState([])
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState('')
  const [genre, setGenre] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('https://www.cheapshark.com/api/1.0/deals?upperPrice=70&pageSize=20')
        if (!res.ok) throw new Error('API error')
        const deals = await res.json()
        const mapped = deals.map((d, i) => ({
          id: i + 1000,
          title: d.title ?? 'Juego en oferta',
          platform: 'PC',
          genre: 'Oferta',
          price: Number(d.salePrice ?? d.normalPrice ?? 0),
          image: d.thumb || '/images/placeholder.jpg',
          description: `Descuento ${Math.round(Number(d.savings || 0))}% · Normal $${d.normalPrice}`
        }))
        if (!cancelled) {
          setGames(mapped)
          localStorage.setItem('lastGames', JSON.stringify(mapped))
        }
      } catch {
        if (!cancelled) {
          setGames(gamesData)
          localStorage.setItem('lastGames', JSON.stringify(gamesData))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    return games.filter(g =>
      (!query || g.title.toLowerCase().includes(query.toLowerCase())) &&
      (!platform || g.platform === platform) &&
      (!genre || g.genre === genre)
    )
  }, [games, query, platform, genre])

  return (
    <main>
      <Hero />
      <h2 id="catalogo">Catálogo</h2>

      <Filters
        query={query} setQuery={setQuery}
        platform={platform} setPlatform={setPlatform}
        genre={genre} setGenre={setGenre}
        games={games}
      />

      {loading ? (
        <section className="grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="card skeleton" key={i}>
              <div className="img" />
              <div className="card-body">
                <div className="line w-60" />
                <div className="line w-40" />
                <div className="line w-30" />
              </div>
            </div>
          ))}
        </section>
      ) : (
        <>
          {filtered.length === 0 && <p>No se encontraron juegos.</p>}
          <section className="grid">
            {filtered.map(game => (
              <ProductCard key={game.id} game={game} />
            ))}
          </section>
        </>
      )}
    </main>
  )
}

