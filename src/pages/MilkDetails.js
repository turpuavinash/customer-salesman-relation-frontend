
import React, { useState, useEffect } from 'react';
import MilkDetailsModal from './MilkDetailsModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const MilkDetails = () => {
  const [data, setData] = useState([]);
  const [farmNames, setFarmNames] = useState([]);
  const [snfStatuses, setSnfStatuses] = useState([]);
  const [alcoholStatuses, setAlcoholStatuses] = useState([]);
  const [antibioticStatuses, setAntibioticStatuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const apiUrl = "http://192.168.1.46:5005/api/milk_details";
  const farmNamesUrl = "http://192.168.1.46:5005/api/farm_names";
  const snfStatusesUrl = "http://192.168.1.46:5005/api/snf_statuses";
  const alcoholStatusesUrl = "http://192.168.1.46:5005/api/alcohol_statuses";
  const antibioticStatusesUrl = "http://192.168.1.46:5005/api/antibiotic_statuses";

  const fetchData = async () => {
    try {
      const [milkResponse, farmResponse, snfResponse, alcoholResponse, antibioticResponse] = await Promise.all([
        axios.get(apiUrl),
        axios.get(farmNamesUrl),
        axios.get(snfStatusesUrl),
        axios.get(alcoholStatusesUrl),
        axios.get(antibioticStatusesUrl)
      ]);

      setData(milkResponse.data);
      setFarmNames(farmResponse.data);
      setSnfStatuses(snfResponse.data);
      setAlcoholStatuses(alcoholResponse.data);
      setAntibioticStatuses(antibioticResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    setSelectedItem({ ...data[index], index });
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    const id = data[index].id;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSave = async (newData) => {
    try {
      if (selectedItem !== null) {
        await axios.put(`${apiUrl}/${newData.id}`, newData);
        const updatedData = [...data];
        updatedData[selectedItem.index] = newData;
        setData(updatedData);
      } else {
        const response = await axios.post(apiUrl, newData);
        setData([...data, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving data:', error.response ? error.response.data : error.message);
    }
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
                <th className="px-4 py-2 border-b">Farm Name</th>
                <th className="px-4 py-2 border-b">Milk Liters</th>
                <th className="px-4 py-2 border-b">SNF</th>
                <th className="px-4 py-2 border-b">SNF Status</th>
                <th className="px-4 py-2 border-b">Alcohol</th>
                <th className="px-4 py-2 border-b">Alcohol Status</th>
                <th className="px-4 py-2 border-b">Antibiotic</th>
                <th className="px-4 py-2 border-b">Antibiotic Status</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50`}
                  >
                    <td className="px-4 py-2 text-center border-b">{item.farm_name}</td>
                    <td className="px-4 py-2 text-center border-b">{item.milk_liters}</td>
                    <td className="px-4 py-2 text-center border-b">{item.snf}</td>
                    <td className="px-4 py-2 text-center border-b">{item.snf_status}</td>
                    <td className="px-4 py-2 text-center border-b">{item.alcohol}</td>
                    <td className="px-4 py-2 text-center border-b">{item.alcohol_status}</td>
                    <td className="px-4 py-2 text-center border-b">{item.antibiotic}</td>
                    <td className="px-4 py-2 text-center border-b">{item.antibiotic_status}</td>
                    <td className="px-4 py-2 text-center border-b">{item.date}</td>
                    <td className="px-4 py-2 text-center border-b">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-2 text-center border-b">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <MilkDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={selectedItem}
        farmNames={farmNames}
        snfStatuses={snfStatuses}
        alcoholStatuses={alcoholStatuses}
        antibioticStatuses={antibioticStatuses}
      />
    </main>
  );
};

export default MilkDetails;
