import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/products'); // Replace with your actual API
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
    if (halfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-gray-300" />);

    return stars;
  };

  return (

    <>
    <h1 className='px-4 py-4 text-lg font-bold'>All Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-contain rounded-md"
          />
          <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
            <button
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <FiShoppingCart size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Products;
