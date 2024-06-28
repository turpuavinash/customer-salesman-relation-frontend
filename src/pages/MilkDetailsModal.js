import React, { useState, useEffect } from 'react';
import moment from 'moment';

const MilkDetailsModal = ({ isOpen, onClose, onSave, initialData, farmNames, snfStatuses, alcoholStatuses, antibioticStatuses }) => {
  const initialFormData = {
    farm_name: '',
    milk_liters: '',
    snf: '',
    snf_status: '',
    alcohol: '',
    alcohol_status: '',
    antibiotic: '',
    antibiotic_status: '',
    date: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...initialData });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      // Handle date input specifically for HTML5 date type
      setFormData(prevState => ({
        ...prevState,
        [name]: value // value is already in YYYY-MM-DD format for type="date"
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    if (formData.farm_name === '') {
      alert('Please select a valid farm name');
      return;
    }

    let formattedDate;
    try {
      formattedDate = moment(formData.date).format('DD/MM/YYYY');
      if (formattedDate === 'Invalid date') {
        throw new Error('Invalid date format');
      }
    } catch (error) {
      alert('Please enter a valid date');
      return;
    }

    const formattedData = {
      ...formData,
      date: formattedDate
    };

    onSave(formattedData);
    onClose();
  };

  if (!isOpen) return null;

  // Ensure farmNames is an array and filter out duplicates
  const uniqueFarmNames = Array.isArray(farmNames) ? [...new Set(farmNames)] : [];
  // Ensure snfStatuses is an array and filter out duplicates
  const uniqueSnfStatuses = Array.isArray(snfStatuses) ? [...new Set(snfStatuses)] : [];
  // Ensure alcoholStatuses is an array and filter out duplicates
  const uniqueAlcoholStatuses = Array.isArray(alcoholStatuses) ? [...new Set(alcoholStatuses)] : [];
  // Ensure antibioticStatuses is an array and filter out duplicates
  const uniqueAntibioticStatuses = Array.isArray(antibioticStatuses) ? [...new Set(antibioticStatuses)] : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl mb-4">{initialData ? 'Edit Milk Detail' : 'Add New Milk Detail'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Farm Name</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="farm_name"
            value={formData.farm_name}
            onChange={handleChange}
          >
            <option value="">Select Farm Name</option>
            {uniqueFarmNames.map((farm, index) => (
              <option key={index} value={farm}>{farm}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Milk Liters</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="milk_liters"
            value={formData.milk_liters}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">SNF</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="snf"
            value={formData.snf}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">SNF Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="snf_status"
            value={formData.snf_status}
            onChange={handleChange}
          >
            <option value="">Select SNF Status</option>
            {uniqueSnfStatuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Alcohol</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Alcohol Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="alcohol_status"
            value={formData.alcohol_status}
            onChange={handleChange}
          >
            <option value="">Select Alcohol Status</option>
            {uniqueAlcoholStatuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 mb-2">Antibiotic</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            name="antibiotic"
            value={formData.antibiotic}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Antibiotic Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            name="antibiotic_status"
            value={formData.antibiotic_status}
            onChange={handleChange}
          >
            <option value="">Select Antibiotic Status</option>
            {uniqueAntibioticStatuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
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
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>{initialData ? 'Update' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default MilkDetailsModal;