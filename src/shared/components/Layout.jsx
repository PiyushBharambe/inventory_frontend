/**
 * Base Layout Component
 * Provides navigation, sidebar, and main content area
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useApi';

export const Layout = ({ children }) => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-blue-900 text-white p-4 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-blue-200">Intelligence System</p>
        </div>

        <div className="mb-6 p-3 bg-blue-800 rounded">
          <p className="text-sm font-semibold">{user?.first_name || 'User'}</p>
          <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
        </div>

        <ul className="space-y-2">
          {/* Admin/Manager Menu */}
          {(hasRole('admin') || hasRole('manager')) && (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  📊 Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/inventory"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  📦 Inventory
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  🏷️ Products
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  📋 Purchase Orders
                </Link>
              </li>
            </>
          )}

          {/* Admin Only */}
          {hasRole('admin') && (
            <>
              <li>
                <Link
                  to="/users"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  👥 Users
                </Link>
              </li>
              <li>
                <Link
                  to="/locations"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  📍 Locations
                </Link>
              </li>
              <li>
                <Link
                  to="/audit-logs"
                  className="block px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  📝 Audit Logs
                </Link>
              </li>
            </>
          )}

          {/* Staff Menu */}
          <li className="border-t border-blue-700 pt-2 mt-2">
            <Link
              to="/scanning/receive-stock"
              className="block px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              📥 Receive Stock
            </Link>
          </li>
          <li>
            <Link
              to="/scanning/stock-count"
              className="block px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              🔍 Stock Count
            </Link>
          </li>
          <li>
            <Link
              to="/scanning/record-sale"
              className="block px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              🛒 Record Sale
            </Link>
          </li>
        </ul>

        <div className="border-t border-blue-700 mt-6 pt-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Management</h2>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};
