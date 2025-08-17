import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { open, toggle, items, increase, decrease, remove, total, clear } = useCart()

  return (
    <>
      {open && <div className="overlay" onClick={toggle} />}
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <header className="drawer-head">
          <h3>Tu carrito</h3>
          <button className="btn" onClick={toggle}>Cerrar</button>
        </header>

        {items.length === 0 ? (
          <p className="muted" style={{padding:'0 1rem'}}>Tu carrito está vacío.</p>
        ) : (
          <ul className="cart-list">
            {items.map(item => (
              <li className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="info">
                  <strong>{item.title}</strong>
                  <span className="muted">${item.price.toFixed(2)}</span>
                  <div className="qty">
                    <button onClick={() => decrease(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increase(item.id)}>+</button>
                  </div>
                </div>
                <button className="remove" onClick={() => remove(item.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}

        <footer className="drawer-foot">
          <div>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="drawer-actions">
            <button className="btn" onClick={clear}>Vaciar</button>
            <button className="btn">Pagar</button>
          </div>
        </footer>
      </aside>
    </>
  )
}