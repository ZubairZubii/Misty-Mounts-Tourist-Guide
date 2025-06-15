import React from 'react';
import { FaBed, FaCouch, FaBath, FaUtensils, FaWifi, FaTv, FaParking, FaSwimmingPool, FaCoffee, FaConciergeBell, FaDumbbell } from 'react-icons/fa';
import { MdKitchen } from 'react-icons/md';

const DetailsComponent = ({ hotel }) => {
  const details = [
    { icon: <FaBed className="text-4xl text-blue-700 dark:text-blue-300 mb-3" />, label: "Bedrooms", value: "1" },
    { icon: <FaCouch className="text-4xl text-blue-700 dark:text-blue-300 mb-3" />, label: "Living Rooms", value: "1" },
    { icon: <FaBath className="text-4xl text-blue-700 dark:text-blue-300 mb-3" />, label: "Bathrooms", value: "1" },
    { icon: <MdKitchen className="text-4xl text-blue-700 dark:text-blue-300 mb-3" />, label: "Refrigerator", value: "1" },
    { icon: <FaWifi className="text-4xl text-blue-700 dark:text-blue-300 mb-3" />, label: "Internet Speed", value: "10 mbp/s" },
    { icon: <FaTv className="text-4xl text-blue-700 dark:text-blue-300 mb-3" />, label: "Televisions", value: "2" },
  ];

  const amenitiesIcons = {
    "Free Wi-Fi": <FaWifi className="text-2xl text-blue-600" />,
    "Swimming Pool": <FaSwimmingPool className="text-2xl text-blue-600" />,
    "Restaurant": <FaUtensils className="text-2xl text-blue-600" />,
    "Gym": <FaDumbbell className="text-2xl text-blue-600" />,
    "Spa": <FaConciergeBell className="text-2xl text-blue-600" />,
    "Parking": <FaParking className="text-2xl text-blue-600" />,
    "Coffee Shop": <FaCoffee className="text-2xl text-blue-600" />,
  };

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-4xl rounded-3xl p-10 md:p-20 mx-4 md:mx-auto max-w-7xl my-20 border border-gray-200 dark:border-gray-700 transform transition-all duration-700 ease-in-out hover:shadow-5xl hover:border-blue-300">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-14 text-center relative leading-tight">
        Room Details & Amenities
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-2.5 bg-blue-600 rounded-full opacity-90 animate-pulse-fast"></span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-20">
      {details.map((detail, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700 cursor-pointer group">
          {detail.icon}
            <p className="mt-5 text-2xl font-bold text-gray-900 dark:text-gray-100 text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">{detail.label}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 text-center group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">{detail.value}</p>
          </div>
        ))}
      </div>

      {hotel.amenities && hotel.amenities.length > 0 && (
        <div className="mt-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center relative leading-tight">
            Hotel Amenities
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-2.5 bg-blue-600 rounded-full opacity-90 animate-pulse-fast"></span>
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-4 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-8 py-4 rounded-full shadow-lg transition duration-500 hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105 border border-blue-200 dark:border-blue-800 cursor-pointer group">
                {amenitiesIcons[amenity]}
                <span className="font-semibold text-xl group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">{amenity}</span>
        </div>
      ))}
    </div>
        </div>
      )}
    </section>
  );
};

export default DetailsComponent;
