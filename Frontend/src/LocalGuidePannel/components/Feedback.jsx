import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaCalendarAlt, FaComment, FaThumbsUp, FaThumbsDown, FaFilter } from 'react-icons/fa';

// Default feedback data
const defaultFeedbacks = [
  {
    _id: "feedback1",
    userName: "Ahmed Khan",
    rating: 5,
    message: "Excellent service! The local guide was very knowledgeable and helpful. The tour was well-organized and the spots were amazing.",
    date: "2024-03-15T10:30:00",
    response: "Thank you for your positive feedback! We're glad you enjoyed the tour."
  },
  {
    _id: "feedback2",
    userName: "Sara Ali",
    rating: 4,
    message: "Great experience overall. The guide was friendly and professional. Would recommend to others.",
    date: "2024-03-14T15:45:00"
  },
  {
    _id: "feedback3",
    userName: "Mohammad Hassan",
    rating: 3,
    message: "Good service but could improve on punctuality. The spots were beautiful though.",
    date: "2024-03-13T09:15:00",
    response: "We apologize for the delay. We're working on improving our timing."
  },
  {
    _id: "feedback4",
    userName: "Fatima Zahra",
    rating: 5,
    message: "Best tour guide ever! Very informative and made the experience memorable. Will definitely book again.",
    date: "2024-03-12T14:20:00"
  },
  {
    _id: "feedback5",
    userName: "Usman Malik",
    rating: 2,
    message: "The guide was late and seemed unprepared. The spots were good but the service needs improvement.",
    date: "2024-03-11T11:00:00"
  }
];

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    // Get feedback from localStorage or use default feedback
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks'));
    if (storedFeedbacks && storedFeedbacks.length > 0) {
      setFeedbacks(storedFeedbacks);
      setFilteredFeedbacks(storedFeedbacks);
    } else {
      setFeedbacks(defaultFeedbacks);
      setFilteredFeedbacks(defaultFeedbacks);
      localStorage.setItem('feedbacks', JSON.stringify(defaultFeedbacks));
    }
  }, []);

  useEffect(() => {
    let results = feedbacks;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(feedback =>
        feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (filter !== 'all') {
      results = results.filter(feedback => feedback.rating === parseInt(filter));
    }
    
    setFilteredFeedbacks(results);
  }, [searchTerm, filter, feedbacks]);

  const handleResponse = (feedbackId, response) => {
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback._id === feedbackId) {
        return { ...feedback, response };
      }
      return feedback;
    });
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaComment className="text-gray-900" />
            Feedback Management
          </h2>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaComment className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaFilter className="w-4 h-4" />
              <span>Filter by rating:</span>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-4">
              <FaComment className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Feedback Found</h3>
              <p className="text-gray-600">There are no feedback entries matching your search criteria.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{feedback.userName}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <FaCalendarAlt className="w-3 h-3" />
                          {new Date(feedback.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`w-4 h-4 ${
                            index < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{feedback.message}</p>
                  </div>

                  {feedback.response ? (
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-900">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">Your response:</span> {feedback.response}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleResponse(feedback._id, 'Thank you for your positive feedback!')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition duration-200"
                      >
                        <FaThumbsUp className="w-4 h-4" />
                        Quick Response
                      </button>
                      <button
                        onClick={() => handleResponse(feedback._id, 'We apologize for the inconvenience. We will look into this matter.')}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200"
                      >
                        <FaThumbsDown className="w-4 h-4" />
                        Quick Response
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback; 