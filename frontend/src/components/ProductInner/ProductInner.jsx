import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProductInner = () => {
    const { productId } = useParams();
    const products = [
        {
          id: 1,
          name: 'Wireless Headphones',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqvnmE2DkVNHkIHfuDbGjFsmcfGOxV88XoaQ&s',
          price: 2999,
          description: 'High-quality wireless headphones with noise cancellation.',
          rating: 4.5,
        },
        {
          id: 2,
          name: 'Sample',
          image:'data:image/jpeg;base64,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',
          price: 4999,
          description: 'Track your fitness, health, and notifications with ease.',
          rating: 4,
        },
        {
          id: 3,
          name: 'Gaming Mouse',
          image: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg',
          price: 1599,
          description: 'Ergonomic design with customizable DPI and RGB lighting.',
          rating: 3.5,
        },
      ];
    
      const product = products.find((prod) => prod.id === parseInt(productId));
      console.log(product)
   
  return (
    <div>
        <div className='max-w-2xl mx-auto py-10 px-4'>
            <h1 className="text-4xl font-bold text-center mb-6">Product Details</h1>
            <img src={`${product.image}`} alt={product.name} className="w-full h-64 object-cover" />
            <h2 className="text-3xl font-bold text-center mt-4">{product.name}</h2>     
            <p className="text-xl text-center mt-2">Price: ₹{product.price}</p>
            <p className="text-gray-600 text-center mt-2">{product.description}</p>
            <p className="text-yellow-400 text-center mt-2">Rating: {product.rating}</p>
            <div className="flex justify-center mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded ml-4">Buy Now</button>
                </div>
        </div>
    </div>
  )
}

export default ProductInner