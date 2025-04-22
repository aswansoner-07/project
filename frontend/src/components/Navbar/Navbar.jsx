import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-700">ApnaMart</div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-indigo-600">Products</Link></li>
          <li><Link to="/aboutus" className="hover:text-indigo-600">About Us</Link></li>
          <li><Link to="/contactus" className="hover:text-indigo-600">Contact Us</Link></li>
          
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-gray-700 hover:text-indigo-600 text-xl">
            <FaShoppingCart />
          </Link>
          <Link to="/vendorlogin" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Login
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md p-4 space-y-4 text-center">
          <li><Link to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link></li>
          <li><Link to="/aboutus" className="block text-gray-700 hover:text-indigo-600">About Us</Link></li>
          <li><Link to="/contactus" className="block text-gray-700 hover:text-indigo-600">Contact Us</Link></li>
          <li><Link to="/products" className="block text-gray-700 hover:text-indigo-600">Products</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
