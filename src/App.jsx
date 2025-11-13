import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Pages
import LoginPage from './features/auth/pages/LoginPage';
import Layout from './shared/components/Layout';
import Dashboard from './features/analytics/pages/Dashboard';
import InventoryPage from './features/inventory/pages/InventoryPage';
import StockManagementPage from './features/scanning/pages/StockManagementPage';
import OrdersPage from './features/orders/pages/OrdersPage';
import AnalyticsPage from './features/analytics/pages/AnalyticsPage';
import SettingsPage from './features/auth/pages/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/stock-management" element={<StockManagementPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
