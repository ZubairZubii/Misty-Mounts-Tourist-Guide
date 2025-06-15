import React from 'react';
import { FaStar, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const TripPackageSection = () => {
  const packages = [
    {
      id: 1,
      title: 'Northern Pakistan Explorer',
      duration: '7 Days',
      price: 'PKR 85,000',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop',
      description: 'Experience the breathtaking beauty of Northern Pakistan, including Hunza Valley, Naltar Valley, and Attabad Lake.',
      highlights: ['Hunza Valley', 'Naltar Valley', 'Attabad Lake', 'Khunjerab Pass'],
      groupSize: 'Max 12 people'
    },
    {
      id: 2,
      title: 'Cultural Heritage Tour',
      duration: '5 Days',
      price: 'PKR 65,000',
      rating: 4.7,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Badshahi_Mosque_front_picture.jpg/1280px-Badshahi_Mosque_front_picture.jpg',
      description: 'Immerse yourself in Pakistan\'s rich cultural heritage, visiting historical sites and experiencing local traditions.',
      highlights: ['Lahore Fort', 'Badshahi Mosque', 'Shalimar Gardens', 'Walled City'],
      groupSize: 'Max 15 people'
    },
    {
      id: 3,
      title: 'Adventure Safari',
      duration: '4 Days',
      price: 'PKR 45,000',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop',
      description: 'Embark on an exciting adventure through Pakistan\'s diverse landscapes and wildlife sanctuaries.',
      highlights: ['Chitral Valley', 'Kalash Valley', 'Tirich Mir', 'Local Festivals'],
      groupSize: 'Max 10 people'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Trip Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-64">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{pkg.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300">
            View All Packages
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TripPackageSection;
