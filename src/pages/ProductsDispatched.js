import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsDispatchedModal from './ProductsDispatchedModal';

const ProductsDispatched = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://192.168.1.46:5004/api/products_dispatched');
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
      const response = await axios.post('http://192.168.1.46:5005/api/products_dispatched', newData);
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
                <th className="px-4 py-2 border-b">Milk</th>
                <th className="px-4 py-2 border-b">Curd</th>
                <th className="px-4 py-2 border-b">Paneer</th>
                <th className="px-4 py-2 border-b">Butter</th>
                <th className="px-4 py-2 border-b">Ghee</th>
                <th className="px-4 py-2 border-b">Honey</th>
                <th className="px-4 py-2 border-b">Cheese</th>
                <th className="px-4 py-2 border-b">Date</th>
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
                  <td className="px-4 py-2 text-center border-b">{item.milk}</td>
                  <td className="px-4 py-2 text-center border-b">{item.curd}</td>
                  <td className="px-4 py-2 text-center border-b">{item.paneer}</td>
                  <td className="px-4 py-2 text-center border-b">{item.butter}</td>
                  <td className="px-4 py-2 text-center border-b">{item.ghee}</td>
                  <td className="px-4 py-2 text-center border-b">{item.honey}</td>
                  <td className="px-4 py-2 text-center border-b">{item.cheese}</td>
                  <td className="px-4 py-2 text-center border-b">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <ProductsDispatchedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </main>
  );
};

export default ProductsDispatched;
