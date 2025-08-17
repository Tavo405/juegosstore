import { useMemo } from 'react'

export default function Filters({ query, setQuery, platform, setPlatform, genre, setGenre, games }) {
  const platforms = useMemo(() => Array.from(new Set(games.map(g => g.platform))), [games])
  const genres = useMemo(() => Array.from(new Set(games.map(g => g.genre))), [games])

  return (
    <section className="filters">
      <input
        type="text"
        placeholder="Buscar por título..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <select value={platform} onChange={e => setPlatform(e.target.value)}>
        <option value="">Todas las plataformas</option>
        {platforms.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <select value={genre} onChange={e => setGenre(e.target.value)}>
        <option value="">Todos los géneros</option>
        {genres.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
    </section>
  )
}