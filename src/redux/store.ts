import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/homeSlice';
import cartReducer from './features/cartSlice';
// import orderReducer from './features/orderSlice';
// import dashboardReducer from './features/dashboardSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    // order: orderReducer,
    // dashboard: dashboardReducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
