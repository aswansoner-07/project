import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white py-12 px-4 md:px-10 lg:px-20" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10"
          data-aos="zoom-in"
        >
          About <span className="text-indigo-600">ApnaMart</span>
        </h2>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <img
            src="https://img.freepik.com/premium-vector/worker-customer-support-flat-design_494347-22.jpg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-md"
            data-aos="fade-right"
          />

          {/* Text */}
          <div data-aos="fade-left">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Who We Are</h3>
            <p className="text-gray-600 mb-4">
              ApnaMart is a trusted multi-vendor e-commerce platform where technology meets convenience. 
              We connect passionate sellers with smart buyers who are looking for the best electronic products in the market.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2">Our Mission</h4>
            <p className="text-gray-600 mb-4">
              To empower vendors and simplify the electronics shopping experience with transparency, innovation, and trust.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2">Why Choose Us?</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Verified & trusted sellers</li>
              <li>Fast and reliable customer support</li>
              <li>Secure and direct communication with vendors</li>
              <li>Wide variety of electronics at great prices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
