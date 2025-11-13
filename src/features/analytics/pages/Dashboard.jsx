import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    itemsToReorder: 0,
    inventoryValue: 0,
    salesToday: 0,
    stockouts: 0,
    totalProducts: 0,
    lowStockItems: 0,
    pendingOrders: 0,
    monthlyRevenue: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [criticalItems, setCriticalItems] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadDashboardData();
  }, [selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        itemsToReorder: 12,
        inventoryValue: 125430,
        salesToday: 4230,
        stockouts: 3,
        totalProducts: 1247,
        lowStockItems: 18,
        pendingOrders: 5,
        monthlyRevenue: 89750,
      });

      // Sales vs Forecast Chart
      setChartData({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Actual Sales',
            data: [1200, 1900, 1500, 2200, 2400, 2100, 2800],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Forecasted Demand',
            data: [1300, 1800, 1600, 2100, 2300, 2200, 2700],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            borderDash: [5, 5],
          },
        ],
      });

      // Category Distribution
      setCategoryData({
        labels: ['Electronics', 'Clothing', 'Food & Beverage', 'Books', 'Home & Garden'],
        datasets: [
          {
            data: [35, 25, 20, 12, 8],
            backgroundColor: [
              '#3b82f6',
              '#10b981',
              '#f59e0b',
              '#ef4444',
              '#8b5cf6',
            ],
            borderWidth: 0,
          },
        ],
      });

      // Recent Activity
      setRecentActivity([
        { id: 1, action: 'Stock received', item: 'Laptop Pro 15"', quantity: 25, time: '2 min ago', type: 'receive' },
        { id: 2, action: 'Sale recorded', item: 'Wireless Mouse', quantity: 3, time: '5 min ago', type: 'sale' },
        { id: 3, action: 'Low stock alert', item: 'USB Cable', quantity: 8, time: '12 min ago', type: 'alert' },
        { id: 4, action: 'Purchase order sent', item: 'PO-2024-001', quantity: null, time: '1 hour ago', type: 'order' },
        { id: 5, action: 'Stock count completed', item: 'Store 1 - Electronics', quantity: null, time: '2 hours ago', type: 'count' },
      ]);

      // Critical Items (Low Stock)
      setCriticalItems([
        { id: 1, name: 'Laptop Pro 15"', sku: 'LAP001', current: 5, reorder: 20, category: 'Electronics' },
        { id: 2, name: 'USB-C Cable', sku: 'CBL003', current: 8, reorder: 50, category: 'Electronics' },
        { id: 3, name: 'Office Chair', sku: 'CHR012', current: 2, reorder: 10, category: 'Furniture' },
        { id: 4, name: 'Notebook A4', sku: 'NTB005', current: 15, reorder: 100, category: 'Stationery' },
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'receive': return '📥';
      case 'sale': return '🛒';
      case 'alert': return '⚠️';
      case 'order': return '📋';
      case 'count': return '🔍';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user.username || 'User'}! 👋</h1>
          <p className="text-lg text-gray-600 mt-2">Here's your inventory overview for today</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button 
            onClick={() => navigate('/analytics')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            📊 View Full Reports
          </button>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Items to Reorder - Most Important */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border border-yellow-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-yellow-800 text-sm font-semibold uppercase tracking-wide">Critical - Reorder Now</p>
              <p className="text-4xl font-bold text-yellow-900 mt-2">{stats.itemsToReorder}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-2xl">⚠️</div>
          </div>
          <button 
            onClick={() => navigate('/inventory?filter=low-stock')}
            className="w-full py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
          >
            View Critical Items
          </button>
        </div>

        {/* Inventory Value */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${(stats.inventoryValue / 1000).toFixed(1)}K</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">💰</div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Products: {stats.totalProducts}</span>
            <span className="text-green-600 font-medium">+2.3% this month</span>
          </div>
        </div>

        {/* Sales Today */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Sales Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.salesToday.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">📈</div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Target: $5,000</span>
            <span className="text-green-600 font-medium">+12% vs yesterday</span>
          </div>
        </div>

        {/* Stockouts */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Stockouts This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.stockouts}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">❌</div>
          </div>
          <button 
            onClick={() => navigate('/analytics?report=stockouts')}
            className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            View Stockout Report
          </button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/stock-management')}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">📥</div>
            <span className="text-sm font-medium text-gray-900">Receive Stock</span>
          </button>
          <button 
            onClick={() => navigate('/stock-management?tab=sale')}
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">🛒</div>
            <span className="text-sm font-medium text-gray-900">Record Sale</span>
          </button>
          <button 
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">📋</div>
            <span className="text-sm font-medium text-gray-900">Create PO</span>
          </button>
          <button 
            onClick={() => navigate('/stock-management?tab=count')}
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
            <span className="text-sm font-medium text-gray-900">Stock Count</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Sales vs. Forecasted Demand</h2>
              <div className="text-sm text-gray-500">Forecast Accuracy: <span className="font-semibold text-green-600">94.2%</span></div>
            </div>
            {chartData && (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
                height={300}
              />
            )}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory by Category</h3>
          {categoryData && (
            <div className="h-64">
              <Doughnut
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Critical Items */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Critical Stock Levels</h3>
              <button 
                onClick={() => navigate('/inventory?filter=low-stock')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {criticalItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.sku} • {item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">{item.current} left</p>
                    <p className="text-xs text-gray-500">Reorder: {item.reorder}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.item}
                      {activity.quantity && ` (${activity.quantity})`}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
