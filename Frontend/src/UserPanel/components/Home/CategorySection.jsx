import React from 'react';
import { FaMountain, FaMosque, FaHotel, FaUtensils, FaShoppingBag, FaCamera } from 'react-icons/fa';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Mountains & Valleys',
      icon: <FaMountain className="w-8 h-8" />,
      description: 'Explore the majestic peaks and serene valleys of Pakistan',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Historical Sites',
      icon: <FaMosque className="w-8 h-8" />,
      description: 'Discover ancient monuments and architectural wonders',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Luxury Stays',
      icon: <FaHotel className="w-8 h-8" />,
      description: 'Experience world-class hospitality and comfort',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Local Cuisine',
      icon: <FaUtensils className="w-8 h-8" />,
      description: 'Savor authentic Pakistani flavors and delicacies',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Shopping',
      icon: <FaShoppingBag className="w-8 h-8" />,
      description: 'Find unique souvenirs and traditional crafts',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Photography',
      icon: <FaCamera className="w-8 h-8" />,
      description: 'Capture stunning landscapes and cultural moments',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the diverse experiences Pakistan has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  Explore {category.name}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
