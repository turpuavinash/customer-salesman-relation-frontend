import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentsModal from './PaymentsModal';

const Payments = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://192.168.1.46:5001/api/payments');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (newData) => {
    try {
      const response = await axios.post('http://192.168.1.46:5001/api/payments', newData);
      const updatedData = [...data, response.data];
      setData(updatedData);
    } catch (error) {
      console.error('Error saving data to API:', error);
    } finally {
      setIsModalOpen(false);
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
                <th className="px-4 py-2 border-b">No. of Liters per Month</th>
                <th className="px-4 py-2 border-b">Liters Returned</th>
                <th className="px-4 py-2 border-b">Amount per Litre</th>
                <th className="px-4 py-2 border-b">Total Amount</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2 text-center border-b">{item.farm_name}</td>
                  <td className="px-4 py-2 text-center border-b">{item.liters_per_month}</td>
                  <td className="px-4 py-2 text-center border-b">{item.liters_returned}</td>
                  <td className="px-4 py-2 text-center border-b">{item.amount_per_liter}</td>
                  <td className="px-4 py-2 text-center border-b">{item.total_amount}</td>
                  <td className="px-4 py-2 text-center border-b">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <PaymentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </main>
  );
};

export default Payments;
