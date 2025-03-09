import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import homeReducer from './features/homeSlice';
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';
import dashboardReducer from './features/dashboardSlice';
// import wishlistReducer from './features/wishlistSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    home: homeReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
    // wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 