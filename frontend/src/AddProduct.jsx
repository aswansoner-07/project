import React,{useState} from 'react';
import axios from 'axios';


const AddProduct = () => {

       const [formData,setFormData]=useState({name:'',price:'',rating:'',image:'',description:''});

       const handleChange=(e)=>{
            setFormData({...formData,[e.target.name]:e.target.value})
       }


       const handleSubmit= async(e)=>{
        e.preventDefault();
         try{
            await axios.post('http://localhost:8001/add-product',formData);
            alert('product added successfully!!');
            setFormData({name:'',price:'',rating:'',image:'',description:''})
         }
         catch(error){
          console.log(error)
             alert('error in adding product!!');
         }
       }

  return (
    <div className='max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Add Product</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name' className='block text-gray-600 font-medium'>
            Product Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            placeholder='Enter product name'
          />
        </div>

        <div>
          <label htmlFor='price' className='block text-gray-600 font-medium'>
            Price
          </label>
          <input
            type='number'
            name='price'
            id='price'
            value={formData.price}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            placeholder='Enter price'
          />
        </div>

        <div>
          <label htmlFor='rating' className='block text-gray-600 font-medium'>
            Rating
          </label>
          <input
            type='number'
            name='rating'
            id='rating'
            value={formData.rating}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            placeholder='Enter rating'
          />
        </div>

        <div>
          <label htmlFor='image' className='block text-gray-600 font-medium'>
           Image link
          </label>
          <input
            type='text'
            name='image'
            id='image'
            value={formData.image}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            placeholder='Enter image link'
          />
        </div>

        <div>
          <label htmlFor='description' className='block text-gray-600 font-medium'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none'
            placeholder='Enter product description'
            rows='3'
          ></textarea>
        </div>

        <button
          type='submit'
          className='w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200'
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;