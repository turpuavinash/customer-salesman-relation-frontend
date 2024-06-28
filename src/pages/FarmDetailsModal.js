import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const FarmDetailsModal = ({ isOpen, onRequestClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    farm_name: '',
    farmer_name: '',
    farmer_phone: '',
    caretaker: '',
    caretaker_phone: '',
    location: '',
    devices: '',
    num_cows: 0,
    num_calves: 0,
    date: ''
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        farm_name: '',
        farmer_name: '',
        farmer_phone: '',
        caretaker: '',
        caretaker_phone: '',
        location: '',
        devices: '',
        num_cows: 0,
        num_calves: 0,
        date: ''
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl mb-4">{initialData ? 'Edit Farm Detail' : 'Add Farm Detail'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Farm Name:</label>
            <input
              type="text"
              name="farm_name"
              value={formData.farm_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Farmer Name:</label>
            <input
              type="text"
              name="farmer_name"
              value={formData.farmer_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Farmer Phone:</label>
            <input
              type="text"
              name="farmer_phone"
              value={formData.farmer_phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Caretaker:</label>
            <input
              type="text"
              name="caretaker"
              value={formData.caretaker}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Caretaker Phone:</label>
            <input
              type="text"
              name="caretaker_phone"
              value={formData.caretaker_phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Devices:</label>
            <input
              type="text"
              name="devices"
              value={formData.devices}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Number of Cows:</label>
            <input
              type="number"
              name="num_cows"
              value={formData.num_cows}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Number of Calves:</label>
            <input
              type="number"
              name="num_calves"
              value={formData.num_calves}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {initialData ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmDetailsModal;