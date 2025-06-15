import React from 'react';
import { FaHotel, FaStar, FaMapMarkerAlt, FaConciergeBell, FaSmileBeam } from 'react-icons/fa';

const AboutSection = ({ description }) => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-8 md:px-20 lg:px-32 rounded-3xl shadow-3xl my-20 mx-4 md:mx-auto max-w-7xl border border-blue-200 dark:border-gray-700 transform transition-all duration-700 ease-in-out hover:shadow-4xl hover:border-blue-300">
      <div className="flex flex-col items-center justify-center mb-10">
        <FaHotel className="text-blue-700 dark:text-blue-300 text-7xl mb-4 animate-scale-in" />
        <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white text-center leading-tight tracking-tight relative mb-6">
          Discover Your Perfect Stay
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-2.5 bg-blue-600 rounded-full opacity-85 animate-pulse-slow"></span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-5xl mx-auto font-light border-l-4 border-blue-500 pl-6 italic shadow-text animate-fade-in-delay">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div className="flex flex-col items-center p-8 bg-blue-50 dark:bg-blue-950/50 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-500 border border-blue-200 dark:border-blue-800 group">
          <FaStar className="text-yellow-500 text-5xl mb-4 animate-fade-in group-hover:animate-bounce-icon" />
          <span className="font-bold text-2xl text-blue-800 dark:text-blue-100 mb-2">5-Star Service</span>
          <p className="text-md text-gray-700 dark:text-gray-300 text-center">Unmatched quality and attention to detail for an exquisite experience.</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-green-50 dark:bg-green-950/50 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-500 border border-green-200 dark:border-green-800 group">
          <FaMapMarkerAlt className="text-green-600 text-5xl mb-4 animate-fade-in group-hover:animate-bounce-icon" />
          <span className="font-bold text-2xl text-green-800 dark:text-green-100 mb-2">Prime Location</span>
          <p className="text-md text-gray-700 dark:text-gray-300 text-center">Strategically located to offer you the best of the city's attractions.</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-purple-50 dark:bg-purple-950/50 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-500 border border-purple-200 dark:border-purple-800 group">
          <FaSmileBeam className="text-purple-600 text-5xl mb-4 animate-fade-in group-hover:animate-bounce-icon" />
          <span className="font-bold text-2xl text-purple-800 dark:text-purple-100 mb-2">Exceptional Comfort</span>
          <p className="text-md text-gray-700 dark:text-gray-300 text-center">Your home away from home, designed for ultimate relaxation and luxury.</p>
        </div>
      </div>
      
      <div className="text-center">
        <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-extrabold py-5 px-16 rounded-full transition duration-400 transform hover:scale-105 shadow-2xl tracking-wide uppercase text-xl animate-fade-in-up-delay border border-blue-400">
          Explore All Amenities
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
