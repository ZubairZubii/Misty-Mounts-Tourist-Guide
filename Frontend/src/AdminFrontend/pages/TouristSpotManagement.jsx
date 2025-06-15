import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";
import React, { useState, useEffect } from "react";
import TouristSpotForm from "../components/TouristSpotForm"; // Assuming this form handles adding and updating spots
import "font-awesome/css/font-awesome.min.css";
import SideMenu from "../components/SideMenu";
import TopBar from "../components/TopBar";
import LoadingComponent from "../components/Loading";

// Default tourist spots data
const defaultSpots = [
  {
    _id: "default1",
    city: "Islamabad",
    nearbyPlaces: [
      {
        _id: "default1_place1",
        name: "Faisal Mosque",
        location: "Shah Faisal Avenue, Islamabad",
        description: "The largest mosque in Pakistan and one of the largest in the world. Its unique design combines traditional Islamic architecture with modern elements.",
        picture: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    isApproved: true
  },
  {
    _id: "default2",
    city: "Lahore",
    nearbyPlaces: [
      {
        _id: "default2_place1",
        name: "Badshahi Mosque",
        location: "Walled City of Lahore",
        description: "One of the world's largest mosques, built in 1673. Known for its stunning Mughal architecture and beautiful courtyard.",
        picture: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    isApproved: true
  },
  {
    _id: "default3",
    city: "Karachi",
    nearbyPlaces: [
      {
        _id: "default3_place1",
        name: "Clifton Beach",
        location: "Clifton, Karachi",
        description: "A popular beach destination with beautiful views of the Arabian Sea. Known for its sunset views and recreational activities.",
        picture: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    isApproved: true
  }
];

const TouristSpotManagement = () => {
  const [NavOpen, IsNavOpen] = useState(false);
  const [spots, setSpots] = useState(defaultSpots); // Initialize with default spots
  const [loading, setLoading] = useState(false); // Set to false since we're using default spots
  const [error, setError] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [spotsPerPage, setSpotsPerPage] = useState(1);
  const indexOfLastSpot = currentPage * spotsPerPage;
  const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;

  // Slice the spots to show only the current page's spots
  const currentSpots = spots.slice(indexOfFirstSpot, indexOfLastSpot);

  // Handle Pagination Logic
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Handle spot approval or rejection
  const handleApproval = async (touristSpotId) => {
    try {
      const touristSpot = spots.find((spot) => spot._id === touristSpotId);
      if (!touristSpot) {
        throw new Error("Tourist Spot not found");
      }
      // Update local state only
      const updatedSpots = spots.map(spot => 
        spot._id === touristSpotId ? { ...spot, isApproved: true } : spot
      );
      setSpots(updatedSpots);
    } catch (error) {
      console.error("Error approving tourist spot:", error);
    }
  };

  // Handle spot disapproval
  const handleDisapproval = async (touristSpotId) => {
    try {
      const touristSpot = spots.find((spot) => spot._id === touristSpotId);
      if (!touristSpot) {
        throw new Error("Tourist Spot not found");
      }
      // Update local state only
      const updatedSpots = spots.map(spot => 
        spot._id === touristSpotId ? { ...spot, isApproved: false } : spot
      );
      setSpots(updatedSpots);
    } catch (error) {
      console.error("Error disapproving tourist spot:", error);
    }
  };

  // Handle adding a new spot
  const handleAddSpot = async (newSpot) => {
    try {
      // Add to local state only
      const spotWithId = {
        ...newSpot,
        _id: `default${spots.length + 1}`,
        isApproved: true
      };
      setSpots([...spots, spotWithId]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding tourist spot:", error);
    }
  };

  // Handle updating a spot
  const handleUpdateSpot = async (updatedSpot) => {
    if (!selectedSpot) return;
    try {
      // Update local state only
      const updatedSpots = spots.map(spot => 
        spot._id === selectedSpot._id ? { ...spot, ...updatedSpot } : spot
      );
      setSpots(updatedSpots);
      setSelectedSpot(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating tourist spot:", error);
    }
  };

  // Handle deleting a spot
  const handleDeleteSpot = async (id) => {
    try {
      // Update local state only
      const updatedSpots = spots.filter(spot => spot._id !== id);
      setSpots(updatedSpots);
    } catch (error) {
      console.error("Error deleting tourist spot:", error);
    }
  };

  // Handle selecting a spot for update
  const handleSelectSpotForUpdate = (spot) => {
    setSelectedSpot(spot); // Set the selected spot for editing
    setShowForm(true); // Show the form
  };

  {
    showForm && (
      <TouristSpotForm
        spot={selectedSpot} // Pass selectedSpot to pre-fill the form
        onSubmit={selectedSpot ? handleUpdateSpot : handleAddSpot}
        refreshSpots={() => {}}
      />
    );
  }

  // Function to navigate to Tourist Spot Management
  const navigate = useNavigate(); // Initialize navigate

  const goToTouristSpotManagement = () => {
    navigate("/admin/tourist-spots"); // Navigating to the tourist spots management page
  };

  const goToAccommodationManagement = () => {
    navigate("/admin/accommodation"); // Navigating to the tourist spots management page
  };

  const goToAdminDashboard = () => {
    navigate("/admin/dashboard"); // Navigating to the tourist spots management page
  };

  const goToTransportManagement = () => {
    navigate("/admin/transportation"); // Navigating to the tourist spots management page
  };
  const goToPaymentManagement = () => {
    navigate("/admin/payments"); // Navigating to the tourist spots management page
  };

  return (
    <div className="flex">
      <SideMenu
        NavOpen={NavOpen}
        IsNavOpen={IsNavOpen}
        goToAdminDashboard={goToAdminDashboard}
        goToAccommodationManagement={goToAccommodationManagement}
        goToTouristSpotManagement={goToTouristSpotManagement}
        goToTransportManagement={goToTransportManagement}
        goToPaymentManagement={goToPaymentManagement}
      />
      <div className="w-full flex flex-col md:ml-20">
        <TopBar NavOpen={NavOpen} IsNavOpen={IsNavOpen} />
        <div className="transition-all duration-1000 ease-in-out">
          <div className={`flex flex-col w-full justify-between gap-5 p-5 mt-20 ${
            NavOpen
              ? "md:max-w-[calc(100vw_-_100px)] sm:max-w-[calc(100vw_-_160px)] md:pl-36 transition-all duration-500"
              : "md:max-w-[calc(100vw_-_100px)] transition-all duration-500"
          }`}>
            <div>
              <h1 className="text-center text-2xl font-bold">
                Tourist Spot Management
              </h1>

              {error && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                  <p>{error}</p>
                </div>
              )}

              {/* Toggle Button */}
              <div className="text-center my-4">
                <button
                  onClick={() => setShowForm((prev) => !prev)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  {showForm ? "Hide Form" : "Add New Tourist Spot"}
                </button>
              </div>

              {/* Conditionally Render the Form */}
              {showForm && (
                <>
                  <h2>
                    {selectedSpot
                      ? "Update Tourist Spot"
                      : "Add New Tourist Spot"}
                  </h2>
                  <TouristSpotForm
                    spot={selectedSpot} // Pass the selected spot for editing
                    onSubmit={selectedSpot ? handleUpdateSpot : handleAddSpot} // Handle form submission based on mode
                    refreshSpots={() => {}} // Refresh spots after adding or updating
                  />
                </>
              )}

              {loading ? (
                    <LoadingComponent
                    message="Fetching data, please wait..."
                    size="large"
                    color="#ff5733"
                  />
              ) : (
                <>
                  <h2 className="text-center text-2xl font-bold mt-6">
                    Manage Existing Spots
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {spots.map((spot) => {
                      // Calculate the range of nearby places to show based on current page
                      const startIndex = (currentPage - 1) * spotsPerPage;
                      const endIndex = startIndex + spotsPerPage;
                      const nearbyPlaceToShow = spot.nearbyPlaces.slice(
                        startIndex,
                        endIndex
                      );

                      return (
                        <div
                          key={spot._id}
                          className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                          {/* Image Section */}
                          <div
                            className="w-full h-56 bg-cover bg-center rounded-lg mb-4"
                            style={{
                              backgroundImage: `url(${
                                nearbyPlaceToShow[0]?.picture ||
                                "/default-image.jpg"
                              })`, // Show the first image in nearbyPlaceToShow
                            }}
                          ></div>

                          {/* Spot Details Section */}
                          <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                              {nearbyPlaceToShow[0]?.name ||
                                "No nearby place available"}{" "}
                              {/* Display the name of the first nearby place */}
                            </h3>
                            <h1 className="text-lg font-semibold">
                              {spot.city || "No city specified"}{" "}
                              {/* Display the city */}
                            </h1>

                            {/* Display the current nearby places */}
                            {nearbyPlaceToShow.map((nearbyPlace, index) => (
                              <div key={index}>
                                <p className="text-gray-600 text-sm min-h-10 font-semibold mb-2">
                                  Location: {nearbyPlace.location}
                                </p>
                                <p className="text-gray-600 min-h-20 text-sm mb-2">
                                  {nearbyPlace.description}
                                </p>
                                <div className="flex items-center justify-between mb-2">
                                  {/* Approval Status */}
                                  <span
                                    className={`text-sm font-semibold ${
                                      spot.isApproved
                                        ? "text-green-600"
                                        : spot.isApproved === false
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }`}
                                  >
                                    {spot.isApproved
                                      ? "Approved"
                                      : spot.isApproved === false
                                      ? "Rejected"
                                      : "Pending Approval"}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {/* Action Buttons */}
                            <div className="flex gap-6 mt-4">
                              {/* Update Icon */}
                              <button
                                className="p-3 rounded-full border border-zinc-700 hover:bg-gray-300 text-white focus:outline-none transition-all duration-300"
                                onClick={() => handleSelectSpotForUpdate(spot)}
                                title="Update Spot"
                              >
                                <div className="h-8 w-8">
                                  <img src="/update.png" alt="" />
                                </div>
                              </button>

                              {/* Delete Icon */}
                              <button
                                className="p-3 rounded-full border border-zinc-700 hover:bg-gray-300 text-white focus:outline-none transition-all duration-300"
                                onClick={() => handleDeleteSpot(spot._id)}
                                title="Delete Spot"
                              >
                                <div className="h-8 w-8">
                                  <img src="/delete.png" alt="" />
                                </div>
                              </button>

                              {/* Approve Icon */}
                              <button
                                className="p-3 rounded-full border border-zinc-700 hover:bg-gray-300 text-white focus:outline-none transition-all duration-300"
                                onClick={() =>
                                  handleApproval(
                                    spot._id,
                                    spot.nearbyPlaces[0]._id, // Assuming approval applies to the first nearby place
                                    true
                                  )
                                }
                                title="Approve Spot"
                              >
                                <div className="h-8 w-8">
                                  <img src="/mark.png" alt="" />
                                </div>
                              </button>

                              {/* Reject Icon */}
                              <button
                                className="p-3 rounded-full hover:bg-gray-300 border border-zinc-700 text-white focus:outline-none transition-all duration-300"
                                onClick={() =>
                                  handleDisapproval(
                                    spot._id,
                                    spot.nearbyPlaces[0]._id, // Assuming disapproval applies to the first nearby place
                                    false
                                  )
                                }
                                title="Reject Spot"
                              >
                                <div className="h-8 w-8">
                                  <img src="/trash.png" alt="" />
                                </div>
                              </button>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-between mt-4">
                              <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="text-white px-4 py-2 rounded-full h-16 w-16 hover:bg-gray-200 transition duration-300"
                              >
                                <img src="/left.png" alt="" />
                              </button>
                              <button
                                onClick={handleNextPage}
                                disabled={
                                  currentPage * spotsPerPage >=
                                  spot.nearbyPlaces.length
                                }
                                className="text-white px-4 py-2 rounded-full h-16 w-16 hover:bg-gray-200 transition duration-300"
                              >
                                <img src="/next.png" alt="" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TouristSpotManagement;
