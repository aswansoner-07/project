import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Vendor Dashboard</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-contain rounded"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">{product.name}</td>
                  <td className="px-4 py-2 line-clamp-2">{product.description}</td>
                  <td className="px-4 py-2 font-semibold text-indigo-600">₹{product.price}</td>
                  <td className="px-4 py-2">{product.stock || 0}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      className="text-indigo-600 hover:text-indigo-800"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <FaEye size={16} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <FaEdit size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
