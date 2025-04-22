import React, { useState, useEffect } from "react";

const slides = [
  "https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera_1258-118763.jpg",
  "https://img.freepik.com/free-photo/portrait-excited-happy-shopaholic-woman-holding-shopping-bags-showing-plastic-credit-card-smiling-amazed-standing-against-pink-background_1258-122870.jpg",
  "https://digitalscholar.in/wp-content/uploads/2022/09/seo-tips-for-fashion-e-commerce-website.jpg"
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[300px] md:h-[300px] lg:h-[400px] flex items-center justify-center text-center text-white px-6"
      style={{ backgroundImage: `url(${slides[currentSlide]})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0  bg-opacity-50"></div>
      <div className="relative max-w-2xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Welcome to ApnaMart</h1>
        <p className="text-lg md:text-xl font-light drop-shadow-md">
          Your one-stop shop for quality products at unbeatable prices!
        </p>
        <button className="mt-6 bg-white text-indigo-700 px-6 py-2 rounded-md font-semibold shadow-lg hover:bg-gray-200">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
