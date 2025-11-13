import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Low stock: Laptop (5 remaining)', type: 'warning', time: '2 min ago' },
    { id: 2, message: 'New purchase order received', type: 'info', time: '10 min ago' },
    { id: 3, message: 'Stock count completed for Store 1', type: 'success', time: '1 hour ago' },
  ]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          notifications={notifications}
          onClearNotification={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
