import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  suppliers: [],
  loading: false,
  error: null,
  searchQuery: '',
  activeTab: 'products',
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSuppliers: (state, action) => {
      state.suppliers = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCategories,
  setSuppliers,
  setSearchQuery,
  setActiveTab,
  setError,
  clearError,
} = inventorySlice.actions;

export default inventorySlice.reducer;