import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const VendorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'vendor', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/register', formData);
      toast.success(res.data.message);
      setFormData({ name: '', email: '', password: '', role: 'vendor' });
      setTimeout(() => {
        navigate('/vendorlogin');
      }, 1000);
    } catch (error) {
      toast.error('Error in vendor registration!!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Registration
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        >
          <option value="vendor">Vendor</option>
          <option value="user">User</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default VendorRegister;
