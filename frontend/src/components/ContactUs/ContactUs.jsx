import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Contact <span className="text-indigo-600">Us</span>
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiMail size={24} className="text-indigo-600" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">support@tvmart.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiPhone size={24} className="text-indigo-600" />
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin size={24} className="text-indigo-600" />
              <div>
                <h4 className="text-lg font-semibold">Location</h4>
                <p className="text-gray-600">Indore, Madhya Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition-all w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
