import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaImage, FaInfoCircle, FaClock, FaStar, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import NearbyPlaceForm from './NearbyPlaceForm';

const AddTouristSpot = () => {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [cityImageUrl, setCityImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [bestTimeToVisit, setBestTimeToVisit] = useState('');
  const [rating, setRating] = useState(0);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [showNearbyPlaceForm, setShowNearbyPlaceForm] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!cityName.trim()) newErrors.cityName = 'City name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!bestTimeToVisit.trim()) newErrors.bestTimeToVisit = 'Best time to visit is required';
    if (nearbyPlaces.length === 0) newErrors.nearbyPlaces = 'At least one nearby place is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const newTouristSpot = {
      _id: Date.now().toString(),
      cityName,
      cityImageUrl,
      description,
      bestTimeToVisit,
      rating,
      nearbyPlaces,
      createdAt: new Date().toISOString()
    };

    const storedSpots = JSON.parse(localStorage.getItem('touristSpots')) || [];
    const updatedSpots = [...storedSpots, newTouristSpot];
    localStorage.setItem('touristSpots', JSON.stringify(updatedSpots));

    setIsSubmitting(false);
    navigate('/local-guide');
  };

  const handleAddNearbyPlace = (place) => {
    if (editingPlace) {
      setNearbyPlaces(places =>
        places.map(p => p._id === editingPlace._id ? { ...place, _id: p._id } : p)
      );
      setEditingPlace(null);
    } else {
      setNearbyPlaces(places => [...places, { ...place, _id: Date.now().toString() }]);
    }
    setShowNearbyPlaceForm(false);
  };

  const handleEditPlace = (place) => {
    setEditingPlace(place);
    setShowNearbyPlaceForm(true);
  };

  const handleDeletePlace = (placeId) => {
    setNearbyPlaces(places => places.filter(place => place._id !== placeId));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-900" />
            Add Tourist Spot
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City Name
                </label>
                <input
                  type="text"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.cityName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
                  placeholder="Enter city name"
                />
                {errors.cityName && (
                  <p className="mt-1 text-sm text-red-600">{errors.cityName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={cityImageUrl}
                    onChange={(e) => setCityImageUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FaInfoCircle className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className={`w-full pl-10 pr-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
                  placeholder="Enter description"
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Best Time to Visit
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={bestTimeToVisit}
                    onChange={(e) => setBestTimeToVisit(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border ${errors.bestTimeToVisit ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent`}
                    placeholder="e.g., Summer, Winter, etc."
                  />
                </div>
                {errors.bestTimeToVisit && (
                  <p className="mt-1 text-sm text-red-600">{errors.bestTimeToVisit}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={`w-6 h-6 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Nearby Places</h3>
              <button
                type="button"
                onClick={() => setShowNearbyPlaceForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-200"
              >
                <FaPlus className="w-4 h-4" />
                Add Place
              </button>
            </div>

            {errors.nearbyPlaces && (
              <p className="mb-4 text-sm text-red-600">{errors.nearbyPlaces}</p>
            )}

            {nearbyPlaces.length === 0 ? (
              <div className="text-center py-8">
                <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Places Added</h4>
                <p className="text-gray-600">Add nearby places to make your tourist spot more informative.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {nearbyPlaces.map((place) => (
                  <div
                    key={place._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{place.name}</h4>
                      <p className="text-sm text-gray-600">{place.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditPlace(place)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePlace(place._id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-200"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/local-guide')}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Tourist Spot'}
            </button>
          </div>
        </form>
      </div>

      {showNearbyPlaceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingPlace ? 'Edit Nearby Place' : 'Add Nearby Place'}
              </h3>
              <button
                onClick={() => {
                  setShowNearbyPlaceForm(false);
                  setEditingPlace(null);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <NearbyPlaceForm
              onSubmit={handleAddNearbyPlace}
              initialData={editingPlace}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTouristSpot;
