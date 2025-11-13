import React, { useState } from 'react';

function StockManagementPage() {
  const [activeTab, setActiveTab] = useState('receive');
  const [scannedItems, setScannedItems] = useState([]);
  const [scanInput, setScanInput] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedPO, setSelectedPO] = useState('');

  const handleScan = (e) => {
    if (e.key === 'Enter' && scanInput.trim()) {
      const newItem = {
        id: Date.now(),
        sku: scanInput,
        quantity: parseInt(quantity),
        timestamp: new Date().toLocaleTimeString(),
      };
      setScannedItems([...scannedItems, newItem]);
      setScanInput('');
      setQuantity('1');
    }
  };

  const removeItem = (id) => {
    setScannedItems(scannedItems.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    if (scannedItems.length === 0) {
      alert('Please scan at least one item');
      return;
    }
    alert(`Processing ${scannedItems.length} items`);
    setScannedItems([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
        <p className="text-gray-600 mt-1">Manage inventory operations using barcode scanning</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {[
          { id: 'receive', label: 'Receive Stock' },
          { id: 'sale', label: 'Record Sale (POS)' },
          { id: 'count', label: 'Inventory Count' },
          { id: 'transfer', label: 'Stock Transfers' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Receive Stock Tab */}
      {activeTab === 'receive' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Receive Shipment</h3>

              {/* PO Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Order (Optional)
                </label>
                <select
                  value={selectedPO}
                  onChange={(e) => setSelectedPO(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a PO...</option>
                  <option value="PO-001">PO-001 - Tech Corp</option>
                  <option value="PO-002">PO-002 - Fashion Inc</option>
                </select>
              </div>

              {/* SKU Scan Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scan Product SKU
                </label>
                <input
                  type="text"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  onKeyPress={handleScan}
                  placeholder="Scan SKU or enter manually..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter to add item</p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={scannedItems.length === 0}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                Submit Shipment ({scannedItems.length} items)
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Scanned Items ({scannedItems.length})</h3>
              </div>

              {scannedItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg">📭 No items scanned yet</p>
                  <p className="text-sm mt-2">Scan products to add them to the shipment</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {scannedItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-mono text-gray-900">{item.sku}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.timestamp}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Sale Tab */}
      {activeTab === 'sale' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">POS - Record Sale</h3>
          <div className="text-center p-8 text-gray-500">
            <p className="text-lg">🛒 Simple POS interface</p>
            <p className="text-sm mt-2">Same scanner functionality as Receive Stock</p>
          </div>
        </div>
      )}

      {/* Inventory Count Tab */}
      {activeTab === 'count' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Count (Stock-take)</h3>
          <div className="text-center p-8 text-gray-500">
            <p className="text-lg">🔍 Physical inventory verification</p>
            <p className="text-sm mt-2">Scan products and enter actual counts</p>
          </div>
        </div>
      )}

      {/* Stock Transfers Tab */}
      {activeTab === 'transfer' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Transfers</h3>
          <div className="text-center p-8 text-gray-500">
            <p className="text-lg">🚚 Move inventory between locations</p>
            <p className="text-sm mt-2">Select from/to locations and scan products</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockManagementPage;
