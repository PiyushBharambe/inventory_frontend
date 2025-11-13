import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import inventorySlice from './inventorySlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    inventory: inventorySlice,
  },
});

export default store;
