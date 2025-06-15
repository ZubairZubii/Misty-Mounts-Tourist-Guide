import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaDollarSign } from 'react-icons/fa';

const BookingComponent = ({ name, price }) => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [days, setDays] = useState(0);

  // Calculate total amount and days whenever dates or guests change
  React.useEffect(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const calculatedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDays(calculatedDays > 0 ? calculatedDays : 0);
      setTotalAmount(calculatedDays > 0 ? price * calculatedDays : 0);
    } else {
      setDays(0);
      setTotalAmount(0);
    }
  }, [checkInDate, checkOutDate, price]);

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate || days <= 0 || guests <= 0) {
      alert("Please select valid check-in/check-out dates and number of guests.");
      return;
    }

    navigate('/payment', {
      state: {
        subtotal: totalAmount,
        fee: 9, // Example fee
        hotelName: name,
        hotelImage: "Front.jpg", // Replace with dynamic image URL if available
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests,
        days: days,
      }
    });
  };

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-4xl rounded-3xl p-10 md:p-20 mx-4 md:mx-auto max-w-xl my-20 border border-blue-200 dark:border-gray-700 transform transition-all duration-700 ease-in-out hover:shadow-5xl hover:border-blue-300">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-14 text-center relative leading-tight">
        Secure Your Stay
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-2.5 bg-blue-600 rounded-full opacity-90 animate-pulse-fast"></span>
      </h2>
      
      <div className="flex flex-col space-y-8 mb-10">
        <div className="relative group">
          <FaCalendarAlt className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 group-focus-within:text-blue-700 transition-colors duration-200 text-2xl" />
          <label htmlFor="checkin-date" className="sr-only">Check-in Date</label>
          <input
            id="checkin-date"
            type="date"
            className="w-full pl-14 pr-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 shadow-sm hover:shadow-md text-lg"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className="relative group">
          <FaCalendarAlt className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 group-focus-within:text-blue-700 transition-colors duration-200 text-2xl" />
          <label htmlFor="checkout-date" className="sr-only">Check-out Date</label>
          <input
            id="checkout-date"
            type="date"
            className="w-full pl-14 pr-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 shadow-sm hover:shadow-md text-lg"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="relative group">
          <FaUsers className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 group-focus-within:text-blue-700 transition-colors duration-200 text-2xl" />
          <label htmlFor="num-guests" className="sr-only">Number of Guests</label>
          <input
            id="num-guests"
            type="number"
            min="1"
            className="w-full pl-14 pr-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 shadow-sm hover:shadow-md text-lg"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="flex flex-col space-y-5 mb-10 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-xl font-semibold">Price per Night:</p>
          <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 flex items-center">
            <FaDollarSign className="text-2xl mr-2" />{price}
          </p>
        </div>
        {days > 0 && (
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xl font-semibold">Nights:</p>
            <p className="text-3xl font-bold">{days}</p>
          </div>
        )}
        {totalAmount > 0 && (
          <div className="flex justify-between items-center pt-5 mt-5">
            <p className="text-2xl font-bold">Total Amount:</p>
            <p className="text-5xl font-extrabold text-blue-800 dark:text-blue-200 flex items-center">
              <FaDollarSign className="text-3xl mr-2" />{totalAmount.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-extrabold py-5 rounded-2xl transition duration-300 transform hover:scale-[1.02] shadow-xl text-xl uppercase tracking-wide animate-pulse-fast border border-blue-500"
      >
        Book Now!
      </button>
    </section>
  );
};

export default BookingComponent;
