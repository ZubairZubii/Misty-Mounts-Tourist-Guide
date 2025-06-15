import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Removed axios import
import Navbar from "../components/Navbar";
import HeroSection from '../components/Hotels/HeroSection';
import AboutSection from '../components/Hotels/AboutSection';
import DetailsComponent from '../components/Hotels/DetailsComponent';
import BookingComponent from '../components/Hotels/BookingComponent';
// const API_BASE_URL = 'http://localhost:5000/api/admin'; // Removed API_BASE_URL

const defaultHotelData = {
  _id: "hotel1",
  name: "Serena Hotel",
  location: "Islamabad",
  description: "A luxurious hotel located in the heart of Islamabad, offering stunning views and world-class amenities.",
  price: 250,
  picture: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  amenities: ["Free Wi-Fi", "Swimming Pool", "Restaurant", "Gym", "Spa"],
  rooms: [
    { type: "Standard", price: 150, available: 10 },
    { type: "Deluxe", price: 250, available: 5 },
    { type: "Suite", price: 400, available: 2 }
  ]
};

const Hotel = () => {
  const { id } = useParams(); // Capture the hotel id from the URL
  const [hotelData, setHotelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data with default data
    setTimeout(() => {
      setHotelData(defaultHotelData);
      setIsLoading(false);
    }, 500); // Simulate a network request delay

    // Removed original fetchHotelData function
    // const fetchHotelData = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/accommodations/${id}`);  // API call
    //     setHotelData(response.data);
    //     setIsLoading(false);
    //   } catch (err) {
    //     console.error('Error fetching hotel data:', err);
    //     setError('Failed to fetch hotel data');
    //     setIsLoading(false);
    //   }
    // };

    // fetchHotelData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar></Navbar>
      <HeroSection name={hotelData.name} picture={hotelData.picture} />
      <AboutSection description={hotelData.description} />
      <DetailsComponent hotel={hotelData} />
      <BookingComponent price={hotelData.price} name={hotelData.name} />
    </div>
  );
};

export default Hotel;
