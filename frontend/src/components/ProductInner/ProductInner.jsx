import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductInner = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: for loading state
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const product = products.find((prod) => prod._id === productId);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!product) return <div className="text-center py-10">Product not found!</div>;

  return (
    <div className='max-w-2xl mx-auto py-10 px-4'>
      <h1 className="text-4xl font-bold text-center mb-6">Product Details</h1>
      <img src={product.image} alt={product.name} className="w-full h-64 object-contain" />
      <h2 className="text-3xl font-bold text-center mt-4">{product.name}</h2>     
      <p className="text-xl text-center mt-2">Price: ₹{product.price}</p>
      <p className="text-gray-600 text-center mt-2">{product.description}</p>
      <p className="text-yellow-400 text-center mt-2">Rating: {product.rating}</p>
      <div className="flex justify-center mt-4">
        <button
        // onClick={}
         className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded ml-4">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductInner;
