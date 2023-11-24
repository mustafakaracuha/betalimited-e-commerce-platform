import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import productsSlice from './features/products/productsSlice'
import basketSlice from './features/basket/basketSlice'

export const store = configureStore({
  reducer: {
   auth: authSlice,
   products: productsSlice,
   basket: basketSlice
  },
})