import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentsModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    farm_name: '',
    liters_per_month: '',
    liters_returned: '',
    amount_per_liter: '',
    total_amount: '',
    status: ''
  });
  const [statusOptions, setStatusOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const fetchStatusOptions = async () => {
    try {
      const response = await axios.get('http://192.168.1.46:5001/api/payment-status');
      setStatusOptions(response.data);
    } catch (error) {
      console.error('Error fetching status options:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatusOptions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl mb-4">Add New Payment Detail</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Farm Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="farm_name"
            value={formData.farm_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Liters Per Month</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="liters_per_month"
            value={formData.liters_per_month}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Liters Returned</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="liters_returned"
            value={formData.liters_returned}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount Per Liter</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="amount_per_liter"
            value={formData.amount_per_liter}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Total Amount</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsModal;
