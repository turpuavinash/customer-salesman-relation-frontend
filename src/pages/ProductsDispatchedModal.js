import React, { useState } from 'react';

const ProductsDispatchedModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    milk: '',
    curd: '',
    paneer: '',
    butter: '',
    ghee: '',
    honey: '',
    cheese: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl mb-4">Add New Products Dispatched Detail</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Milk</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="milk"
            value={formData.milk}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Curd</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="curd"
            value={formData.curd}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Paneer</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="paneer"
            value={formData.paneer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Butter</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="butter"
            value={formData.butter}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ghee</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="ghee"
            value={formData.ghee}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Honey</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="honey"
            value={formData.honey}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cheese</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="cheese"
            value={formData.cheese}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
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

export default ProductsDispatchedModal;
