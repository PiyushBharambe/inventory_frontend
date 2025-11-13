import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '🏠', description: 'Overview & KPIs' },
  { id: 'inventory', label: 'Inventory', path: '/inventory', icon: '📦', description: 'Product Catalog' },
  { id: 'stock', label: 'Stock Management', path: '/stock-management', icon: '📋', description: 'Receive & Count' },
  { id: 'orders', label: 'Purchase Orders', path: '/orders', icon: '🚚', description: 'Supplier Orders' },
  { id: 'analytics', label: 'Analytics & Reports', path: '/analytics', icon: '📊', description: 'AI Insights' },
];

function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">
            📦
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-bold">Smart Inventory</h1>
              <p className="text-xs text-slate-400">Intelligence System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{item.label}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 truncate">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      {isOpen && (
        <div className="px-4 py-4 border-t border-slate-700">
          <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Quick Actions</div>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-all">
              🔍 Quick Search
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-all">
              📥 Receive Stock
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-all">
              🛒 Record Sale
            </button>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="border-t border-slate-700 p-4">
        <Link
          to="/settings"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            location.pathname === '/settings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title={!isOpen ? 'Settings' : ''}
        >
          <span className="text-xl">⚙️</span>
          {isOpen && <span className="text-sm font-semibold">Settings</span>}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
