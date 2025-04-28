import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/cart.context.tsx'
import { HistoryProvider } from './context/historial.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </CartProvider>
  </StrictMode>,
)
