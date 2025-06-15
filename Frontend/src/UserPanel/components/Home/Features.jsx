import React from 'react';
import { FaShieldAlt, FaMapMarkedAlt, FaUserFriends, FaGlobeAsia, FaHeadset, FaMobileAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Safe & Secure',
      description: 'Your safety is our priority. We ensure all destinations and activities meet the highest safety standards.',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 2,
      icon: <FaMapMarkedAlt className="w-8 h-8" />,
      title: 'Expert Guides',
      description: 'Explore with experienced local guides who know every hidden gem and secret spot.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      icon: <FaUserFriends className="w-8 h-8" />,
      title: 'Community',
      description: 'Join a community of travelers, share experiences, and make lasting connections.',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      icon: <FaGlobeAsia className="w-8 h-8" />,
      title: 'Local Experience',
      description: 'Immerse yourself in authentic local culture and traditions.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 5,
      icon: <FaHeadset className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Our dedicated support team is always ready to assist you.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 6,
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: 'Easy Booking',
      description: 'Simple and secure booking process with instant confirmation.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose MistyMounts?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the best of Pakistan with our unique features and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            <h3 className="text-xl font-bold mb-2">Ready to Start Your Adventure?</h3>
            <p className="mb-4">Join thousands of happy travelers who chose MistyMounts</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
