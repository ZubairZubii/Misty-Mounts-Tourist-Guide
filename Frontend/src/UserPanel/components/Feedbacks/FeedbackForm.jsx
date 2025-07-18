import React, { useState } from 'react';
// import axios from 'axios'; // Removed axios import
import { Star, Send, MapPin } from 'lucide-react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [spotName, setSpotName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form fields
    if (!spotName.trim() || !rating || !feedback.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get existing feedback from localStorage or initialize with empty array
      const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');

      const newFeedback = {
        _id: `feedback${Date.now()}`,
        locationName: spotName,
        rating,
        comment: feedback,
        date: new Date().toISOString(),
        isApproved: false // Newly submitted feedback is pending by default
      };

      // Add new feedback to the array
      const updatedFeedback = [...existingFeedback, newFeedback];

      // Save to localStorage
      localStorage.setItem('feedback', JSON.stringify(updatedFeedback));

      setSuccess('Feedback submitted successfully!');
      // Reset the form after successful submission
      setSpotName('');
      setFeedback('');
      setRating(0);

    } catch (error) {
      setError('An error occurred while submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Display Error Message */}
      {error && (
        <div className="text-red-600 border border-red-600 p-2 rounded-md">
          {error}
        </div>
      )}

      {/* Display Success Message */}
      {success && (
        <div className="text-green-600 border border-green-600 p-2 rounded-md">
          {success}
        </div>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-8 w-8 text-blue-800" />
        <h2 className="text-2xl font-bold text-blue-800">Share Your Tourist Spot Experience</h2>
      </div>

      {/* Spot Name Input */}
      <div>
        <label htmlFor="spotName" className="block text-sm font-medium text-blue-800 mb-1">
          Tourist Spot Name
        </label>
        <input
          type="text"
          id="spotName"
          name="spotName"
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50"
          placeholder="Enter a name"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-blue-800 mb-1">Your Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                star <= (hoveredRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      {/* Feedback Input */}
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-blue-800 mb-1">
          Your Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-50"
          placeholder="Describe your experience, the sights, the atmosphere..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        <Send className="ml-2 -mr-1 h-5 w-5" />
      </button>
    </form>
  );
};

export default FeedbackForm;
