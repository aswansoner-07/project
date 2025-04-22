import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ApnaMart</h2>
          <p className="text-sm">Your trusted e-commerce partner for electronics and more.</p>
          <div className="flex mt-4 gap-3">
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-500"><FaFacebookF /></a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-pink-500"><FaInstagram /></a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-400"><FaTwitter /></a>
            <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-700"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">My Account</a></li>
            <li><a href="#" className="hover:text-white">Orders</a></li>
            <li><a href="#" className="hover:text-white">Wishlist</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-sm mb-4">Get updates about new products and offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TV-Mart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
