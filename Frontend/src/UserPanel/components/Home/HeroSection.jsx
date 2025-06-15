import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const HeroSection = () => {
  const defaultDestinations = [
    {
      id: 1,
      name: 'Faisal Mosque',
      image: '/faisal.jpeg',
      location: 'Islamabad',
      description: 'The largest mosque in Pakistan, known for its unique architecture.'
    },
    {
      id: 2,
      name: 'Badshahi Mosque',
      image: '/badshae.jpeg',
      location: 'Lahore',
      description: 'One of the world\'s largest mosques, a masterpiece of Mughal architecture.'
    },
    {
      id: 3,
      name: 'Hunza Valley',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop',
      location: 'Gilgit-Baltistan',
      description: 'A breathtaking valley surrounded by snow-capped mountains.'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop"
          alt="Mountain Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src="/logo.png"
          alt="MistyMounts Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover the Beauty of Pakistan
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            Explore breathtaking landscapes, rich culture, and unforgettable experiences
          </p>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 mb-12 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Travelers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Featured Destinations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {defaultDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">{destination.location}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{destination.description}</p>
                  <Link
                    to={`/user/destinations/${destination.id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
