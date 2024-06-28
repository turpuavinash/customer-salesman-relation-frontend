import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import FarmDetailsModal from './FarmDetailsModal';

const FarmDetails = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const API_URL = 'http://192.168.1.46:5005/api/farm_details';

  useEffect(() => {
    fetchFarmDetails();
  }, []);

  const fetchFarmDetails = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching farm details:', error);
    }
  };

  const handleEdit = (id) => {
    const item = data.find((d) => d.id === id);
    setCurrentData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting farm detail:', error);
    }
  };

  const handleAdd = () => {
    setCurrentData(null);
    setIsModalOpen(true);
  };

  const handleSave = async (newData) => {
    if (newData.id) {
      // Update existing entry
      try {
        await axios.put(`${API_URL}/${newData.id}`, newData);
        setData(data.map(item => (item.id === newData.id ? newData : item)));
      } catch (error) {
        console.error('Error updating farm detail:', error);
      }
    } else {
      // Add new entry
      try {
        const response = await axios.post(API_URL, newData);
        setData([...data, { ...newData, id: response.data.id }]);
      } catch (error) {
        console.error('Error adding farm detail:', error);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="container mx-auto p-4">
          <div className="flex justify-end mb-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Farm Name</th>
                <th className="px-4 py-2 border-b">Farmer Name</th>
                <th className="px-4 py-2 border-b">Farmer Phone</th>
                <th className="px-4 py-2 border-b">Caretaker</th>
                <th className="px-4 py-2 border-b">Caretaker Phone</th>
                <th className="px-4 py-2 border-b">Location</th>
                <th className="px-4 py-2 border-b">Devices</th>
                <th className="px-4 py-2 border-b">Number of Cows</th>
                <th className="px-4 py-2 border-b">Number of Calves</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2 text-center border-b">{item.id}</td>
                  <td className="px-4 py-2 text-center border-b">{item.farm_name}</td>
                  <td className="px-4 py-2 text-center border-b">{item.farmer_name}</td>
                  <td className="px-4 py-2 text-center border-b">{item.farmer_phone}</td>
                  <td className="px-4 py-2 text-center border-b">{item.caretaker}</td>
                  <td className="px-4 py-2 text-center border-b">{item.caretaker_phone}</td>
                  <td className="px-4 py-2 text-center border-b">{item.location}</td>
                  <td className="px-4 py-2 text-center border-b">{item.devices}</td>
                  <td className="px-4 py-2 text-center border-b">{item.num_cows}</td>
                  <td className="px-4 py-2 text-center border-b">{item.num_calves}</td>
                  <td className="px-4 py-2 text-center border-b">{item.date}</td>
                  <td className="px-4 py-2 text-center border-b">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <FarmDetailsModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialData={currentData}
          />
        )}
      </section>
    </main>
  );
};

export default FarmDetails;
