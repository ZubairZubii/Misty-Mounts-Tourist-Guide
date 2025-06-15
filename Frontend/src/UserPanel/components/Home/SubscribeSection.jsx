import React, { useState } from 'react';
import { FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setStatus('success');
        setEmail('');
        // Reset status after 3 seconds
        setTimeout(() => setStatus(null), 3000);
      }, 1000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with MistyMounts
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive travel tips, special offers, and updates on new destinations
          </p>

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>

            {status === 'success' && (
              <div className="mt-4 flex items-center justify-center text-green-300">
                <FaCheck className="mr-2" />
                <span>Successfully subscribed!</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 flex items-center justify-center text-red-300">
                <FaTimes className="mr-2" />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <p className="mt-4 text-sm text-blue-200">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Exclusive Offers</h3>
              <p className="text-blue-100">Get access to special discounts and early bird offers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Travel Tips</h3>
              <p className="text-blue-100">Receive expert advice and insider knowledge</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">New Destinations</h3>
              <p className="text-blue-100">Be the first to know about our new travel packages</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
