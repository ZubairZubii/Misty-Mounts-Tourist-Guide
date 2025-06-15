import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaInfoCircle, FaFilter, FaSort } from 'react-icons/fa';

const NaturalDisasterList = () => {
  const [disasters, setDisasters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDisasters, setFilteredDisasters] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const storedDisasters = JSON.parse(localStorage.getItem('naturalDisasters')) || [];
    setDisasters(storedDisasters);
    setFilteredDisasters(storedDisasters);
  }, []);

  useEffect(() => {
    let results = disasters;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(disaster =>
        disaster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disaster.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disaster.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'severity':
          comparison = getSeverityValue(a.severity) - getSeverityValue(b.severity);
          break;
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredDisasters(results);
  }, [searchTerm, disasters, sortBy, sortOrder]);

  const getSeverityValue = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDelete = (disasterId) => {
    const updatedDisasters = disasters.filter(disaster => disaster._id !== disasterId);
    setDisasters(updatedDisasters);
    setFilteredDisasters(updatedDisasters);
    localStorage.setItem('naturalDisasters', JSON.stringify(updatedDisasters));
    setShowDeleteModal(false);
    setSelectedDisaster(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaExclamationTriangle className="text-gray-900" />
            Natural Disasters
          </h2>
          <Link
            to="/local-guide/add-natural-disaster"
            className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            Report Disaster
          </Link>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by disaster name, location, or type..."
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
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="severity">Severity</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 text-gray-600 hover:text-gray-900 transition duration-200"
            >
              <FaSort className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {filteredDisasters.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaExclamationTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Disasters Found</h3>
              <p className="text-gray-600">There are no natural disasters reported in your area.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisasters.map((disaster) => (
              <div key={disaster._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{disaster.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        {disaster.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(disaster.severity)}`}>
                      {disaster.severity}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>Reported: {new Date(disaster.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{disaster.description}</p>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setSelectedDisaster(disaster);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                    >
                      <FaInfoCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {/* Handle edit */}}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDisaster(disaster);
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
      {showDeleteModal && selectedDisaster && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Disaster Report</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the report for {selectedDisaster.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedDisaster(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedDisaster._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedDisaster && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{selectedDisaster.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  {selectedDisaster.location}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(selectedDisaster.severity)}`}>
                {selectedDisaster.severity}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedDisaster.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Type</h4>
                  <p className="text-gray-600">{selectedDisaster.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Date Reported</h4>
                  <p className="text-gray-600">{new Date(selectedDisaster.date).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedDisaster.affectedAreas && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Affected Areas</h4>
                  <p className="text-gray-600">{selectedDisaster.affectedAreas}</p>
                </div>
              )}

              {selectedDisaster.safetyMeasures && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Safety Measures</h4>
                  <p className="text-gray-600">{selectedDisaster.safetyMeasures}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedDisaster(null);
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NaturalDisasterList;

