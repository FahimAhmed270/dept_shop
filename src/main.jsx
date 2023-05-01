import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { FilterContextProvider } from './Context/FilterContext.jsx'
import { AppProvider } from './Context/ProductContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterContextProvider>
  </AppProvider>
)
