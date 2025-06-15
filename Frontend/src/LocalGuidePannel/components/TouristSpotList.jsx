import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaStar, FaClock, FaCalendarAlt, FaFilter, FaSort, FaImage } from 'react-icons/fa';

const TouristSpotList = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);

  // Default images for different types of tourist spots
  const defaultImages = {
    faisalMosque: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Faisal_Mosque_Islamabad.jpg/1280px-Faisal_Mosque_Islamabad.jpg',
    badshahiMosque: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Badshahi_Mosque_front_picture.jpg/1280px-Badshahi_Mosque_front_picture.jpg',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
    mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop',
    city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop',
    historical: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop',
    nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop',
    default: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop'
  };

  const getDefaultImage = (spot) => {
    // Try to determine the type of spot based on description or nearby places
    const description = (spot?.description || '').toLowerCase();
    const nearbyPlaces = spot?.nearbyPlaces || [];
    const cityName = (spot?.cityName || '').toLowerCase();
    
    // Check for specific landmarks
    if (description.includes('faisal') || cityName.includes('islamabad')) {
      return defaultImages.faisalMosque;
    }
    if (description.includes('badshahi') || cityName.includes('lahore')) {
      return defaultImages.badshahiMosque;
    }
    
    // Check for other types
    if (description.includes('beach') || description.includes('coast') || description.includes('sea')) {
      return defaultImages.beach;
    }
    if (description.includes('mountain') || description.includes('hill') || description.includes('peak')) {
      return defaultImages.mountain;
    }
    if (description.includes('city') || description.includes('urban') || description.includes('downtown')) {
      return defaultImages.city;
    }
    if (description.includes('historical') || description.includes('ancient') || description.includes('heritage')) {
      return defaultImages.historical;
    }
    if (description.includes('nature') || description.includes('forest') || description.includes('park')) {
      return defaultImages.nature;
    }
    
    // Check nearby places for hints
    const hasRestaurant = nearbyPlaces.some(place => place.type === 'Restaurant');
    const hasHotel = nearbyPlaces.some(place => place.type === 'Hotel');
    if (hasRestaurant && hasHotel) {
      return defaultImages.city;
    }
    
    return defaultImages.default;
  };

  useEffect(() => {
    try {
      const storedSpots = JSON.parse(localStorage.getItem('touristSpots')) || [];
      // Add default images to spots that don't have one
      const spotsWithImages = storedSpots.map(spot => ({
        ...spot,
        cityImageUrl: spot.cityImageUrl || getDefaultImage(spot)
      }));
      setTouristSpots(spotsWithImages);
      setFilteredSpots(spotsWithImages);
    } catch (err) {
      console.error('Error loading tourist spots:', err);
      setError('Failed to load tourist spots');
      setTouristSpots([]);
      setFilteredSpots([]);
    }
  }, []);

  useEffect(() => {
    try {
      let results = [...touristSpots];
      
      // Apply search filter
      if (searchTerm) {
        results = results.filter(spot =>
          spot?.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spot?.nearbyPlaces?.some(place => 
            place?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place?.location?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      
      // Apply sorting
      results.sort((a, b) => {
        if (!a || !b) return 0;
        
        let comparison = 0;
        switch (sortBy) {
          case 'name':
            comparison = (a.cityName || '').localeCompare(b.cityName || '');
            break;
          case 'rating':
            comparison = (a.rating || 0) - (b.rating || 0);
            break;
          case 'date':
            comparison = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            break;
          default:
            comparison = 0;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
      
      setFilteredSpots(results);
    } catch (err) {
      console.error('Error filtering/sorting spots:', err);
      setError('Error processing tourist spots');
    }
  }, [searchTerm, touristSpots, sortBy, sortOrder]);

  const handleDelete = (spotId) => {
    try {
      const updatedSpots = touristSpots.filter(spot => spot?._id !== spotId);
      setTouristSpots(updatedSpots);
      setFilteredSpots(updatedSpots);
      localStorage.setItem('touristSpots', JSON.stringify(updatedSpots));
      setShowDeleteModal(false);
      setSelectedSpot(null);
    } catch (err) {
      console.error('Error deleting spot:', err);
      setError('Failed to delete tourist spot');
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-900" />
            Tourist Spots
          </h2>
          <Link
            to="/local-guide/add-spot"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            Add New Spot
          </Link>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by city or place name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaFilter className="w-4 h-4" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="date">Date Added</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 text-gray-600 hover:text-gray-900 transition duration-200"
            >
              <FaSort className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {filteredSpots.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Tourist Spots Found</h3>
              <p className="text-gray-600">Start by adding a new tourist spot to your list.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <div key={spot._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition duration-200">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                  <img
                    src={spot.cityImageUrl || getDefaultImage(spot)}
                    alt={spot.cityName}
                    className="object-cover w-full h-48"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getDefaultImage(spot);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <FaImage className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{spot.cityName}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`w-4 h-4 ${
                            index < (spot.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="w-4 h-4" />
                      <span>Best Time: {spot.bestTimeToVisit || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>Added: {new Date(spot.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Nearby Places:</h4>
                    <div className="space-y-2">
                      {spot.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{place.name}</span>
                          <span className="text-gray-500">{place.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => {/* Handle edit */}}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSpot(spot);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-200"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Tourist Spot</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedSpot.cityName}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSpot(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedSpot._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristSpotList;
