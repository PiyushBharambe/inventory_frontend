import React, { useState } from 'react';

function OrdersPage() {
  const [showNewPOModal, setShowNewPOModal] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 1,
      po_number: 'PO-001',
      supplier: 'Tech Corp',
      status: 'confirmed',
      date_created: '2025-11-10',
      items: 5,
    },
    {
      id: 2,
      po_number: 'PO-002',
      supplier: 'Fashion Inc',
      status: 'shipped',
      date_created: '2025-11-08',
      items: 12,
    },
    {
      id: 3,
      po_number: 'PO-003',
      supplier: 'Food Distributor',
      status: 'draft',
      date_created: '2025-11-12',
      items: 3,
    },
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      shipped: 'bg-purple-100 text-purple-800',
      received: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
        <p className="text-gray-600 mt-1">Manage purchase orders to your suppliers</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowNewPOModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Create New PO
        </button>
      </div>

      {/* PO List */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">PO Number</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Supplier</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900">{order.po_number}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.supplier}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items} items</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.date_created}</td>
                <td className="px-6 py-4 text-sm space-x-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">View</button>
                  {order.status === 'draft' && (
                    <>
                      <button className="text-orange-600 hover:text-orange-700 font-medium">Edit</button>
                      <button className="text-green-600 hover:text-green-700 font-medium">Send</button>
                    </>
                  )}
                  {order.status === 'sent' && (
                    <button className="text-purple-600 hover:text-purple-700 font-medium">Receive</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New PO Modal */}
      {showNewPOModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Purchase Order</h2>

            <form className="space-y-4">
              {/* Supplier Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select supplier...</option>
                  <option>Tech Corp</option>
                  <option>Fashion Inc</option>
                  <option>Food Distributor</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Location
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Warehouse 1</option>
                  <option>Warehouse 2</option>
                  <option>Store 1</option>
                </select>
              </div>

              {/* Add Products Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Products
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search or scan SKU..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowNewPOModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Send to Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
