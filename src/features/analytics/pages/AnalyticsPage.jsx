import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const forecastData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Actual',
        data: [12000, 15000, 13500, 18000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Forecast',
        data: [11000, 14500, 14000, 17500],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const shrinkageData = [
    { id: 1, product: 'Laptop', sku: 'SKU0001', expected: 45, actual: 42, difference: -3, value: -1200 },
    { id: 2, product: 'Mouse', sku: 'SKU0002', expected: 150, actual: 145, difference: -5, value: -75 },
    { id: 3, product: 'Keyboard', sku: 'SKU0003', expected: 80, actual: 78, difference: -2, value: -40 },
  ];

  const overstockData = [
    { id: 1, product: 'Old Model Phone', category: 'Electronics', quantity: 250, lastSale: '2 months ago', value: 12500 },
    { id: 2, product: 'Winter Jacket', category: 'Clothing', quantity: 180, lastSale: '45 days ago', value: 5400 },
  ];

  const profitabilityData = {
    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'],
    datasets: [
      {
        label: 'Profit Margin %',
        data: [32, 28, 45, 35, 40],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">View AI-powered insights and detailed reports</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="1year">Last Year</option>
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Locations</option>
          <option value="warehouse1">Warehouse 1</option>
          <option value="warehouse2">Warehouse 2</option>
          <option value="store1">Store 1</option>
        </select>

        <button className="ml-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
          📥 Export as CSV
        </button>
      </div>

      {/* Report 1: Forecast vs Actual */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Forecast vs. Actual Sales</h2>
        <Line
          data={forecastData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
        <p className="text-sm text-gray-600 mt-4">
          Forecast accuracy: <span className="font-semibold text-green-600">94.2%</span>
        </p>
      </div>

      {/* Report 2: Shrinkage */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">📉 Shrinkage Report</h2>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">SKU</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Expected</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Actual</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Difference</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Loss Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shrinkageData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.product}</td>
                  <td className="px-4 py-3 font-mono text-gray-600">{row.sku}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.expected}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{row.actual}</td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">{row.difference}</td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">${Math.abs(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report 3: Overstock */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">📦 Overstock Report</h2>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            Export CSV
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overstockData.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900">{item.product}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.category}</p>
              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="text-gray-600">Current Stock:</span>
                  <span className="ml-2 font-semibold text-gray-900">{item.quantity} units</span>
                </p>
                <p>
                  <span className="text-gray-600">Last Sale:</span>
                  <span className="ml-2 font-semibold text-orange-600">{item.lastSale}</span>
                </p>
                <p>
                  <span className="text-gray-600">Tied-up Value:</span>
                  <span className="ml-2 font-semibold text-red-600">${(Math.random() * 20000).toFixed(0)}</span>
                </p>
              </div>
              <button className="mt-4 w-full py-2 px-3 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
                Create Promotion
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report 4: Profitability */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">💹 Profitability Report</h2>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            Export CSV
          </button>
        </div>
        <Bar
          data={profitabilityData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          }}
        />
      </div>
    </div>
  );
}

export default AnalyticsPage;
