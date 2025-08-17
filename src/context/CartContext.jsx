import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload };
    case 'TOGGLE':
      return { ...state, open: !state.open };
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id);
      const items = exists
        ? state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.item, qty: 1 }];
      return { ...state, items };
    }
    case 'INCREASE':
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) };
    case 'DECREASE':
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const initial = { open: false, items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) });
    } catch {}
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const count = useMemo(() => state.items.reduce((a, b) => a + b.qty, 0), [state.items]);
  const total = useMemo(() => state.items.reduce((a, b) => a + b.price * b.qty, 0), [state.items]);

  const value = {
    open: state.open,
    items: state.items,
    count,
    total,
    toggle: () => dispatch({ type: 'TOGGLE' }),
    add: (item) => dispatch({ type: 'ADD', item }),
    increase: (id) => dispatch({ type: 'INCREASE', id }),
    decrease: (id) => dispatch({ type: 'DECREASE', id }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
