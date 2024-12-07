import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";
import React, { useState, useEffect } from "react";
import TouristSpotForm from "../components/TouristSpotForm"; // Assuming this form handles adding and updating spots
import "font-awesome/css/font-awesome.min.css";

const TouristSpotManagement = () => {
  const [NavOpen, IsNavOpen] = useState(false);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [selectedSpot, setSelectedSpot] = useState(null); // For updating a spot
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [spotsPerPage, setSpotsPerPage] = useState(1); // 1 spot per page for example
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
  // Fetch all spots
  const fetchSpots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/spots");
      setSpots(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching tourist spots:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []); // Fetch spots on component mount

  // Handle spot approval or rejection
  const handleApproval = async (touristSpotId) => {
    try {
      // Find the tourist spot by its _id using the find method
      const touristSpot = spots.find((spot) => spot._id === touristSpotId);

      if (!touristSpot) {
        throw new Error("Tourist Spot not found");
      }

      // Update the 'isApproved' field to true
      touristSpot.isApproved = true;

      // Save the changes to the tourist spot document
      await axios.put(
        `http://localhost:5000/api/admin/spots/${touristSpotId}`,
        { isApproved: true }
      );

      console.log("Tourist spot approved successfully");
      fetchSpots(); // Refresh the spots after approval
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

      // Update the 'isApproved' field to false
      touristSpot.isApproved = false;

      // Save the changes to the tourist spot document
      await axios.put(
        `http://localhost:5000/api/admin/spots/${touristSpotId}`,
        { isApproved: false }
      );

      console.log("Tourist spot disapproved successfully");
      fetchSpots(); // Refresh the spots after disapproval
    } catch (error) {
      console.error("Error disapproving tourist spot:", error);
    }
  };

  // Handle adding a new spot
  const handleAddSpot = async (newSpot) => {
    try {
      await axios.post("http://localhost:5000/api/admin/spots", newSpot);
      fetchSpots(); // Refresh the spots after adding
      setShowForm(false); // Close the form after successful addition
    } catch (error) {
      console.error("Error adding tourist spot:", error);
    }
  };

  // Handle updating a spot
  const handleUpdateSpot = async (updatedSpot) => {
    if (!selectedSpot) return;
    try {
      await axios.put(
        `http://localhost:5000/api/admin/spots/${selectedSpot._id}`,
        updatedSpot
      );
      fetchSpots(); // Refresh the spots after updating
      setSelectedSpot(null); // Reset the selected spot after update
      setShowForm(false); // Close the form after successful addition
    } catch (error) {
      console.error("Error updating tourist spot:", error);
    }
  };

  // Handle deleting a spot
  const handleDeleteSpot = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/spots/${id}`);
      fetchSpots(); // Refresh the spots after deletion
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
        refreshSpots={fetchSpots}
      />
    );
  }

  // Function to navigate to Tourist Spot Management
  const goToTouristSpotManagement = () => {
    navigate("/admin/tourist-spots"); // Navigating to the tourist spots management page
  };

  const goToAccommodationManagement = () => {
    navigate("/admin/accommodation"); // Navigating to the accommodation management page
  };

  const goToAdminDashboard = () => {
    navigate("/admin/dashboard"); // Navigating to the admin dashboard
  };
  const goToTransportManagement = () => {
    navigate("/admin/transportation"); // Navigating to the tourist spots management page
  };
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="flex">
      <div
        className={`bg-white transition-all duration-500 ease-in-out h-screen md:h-[600px] gap-12 pl-4 rounded-br-lg shadow-md flex-col fixed z-10 sm:flex ${
          NavOpen ? "w-[200px] top-0 left-0" : "w-[78px] -left-52 sm:left-0"
        }`}
      >
        <div className="flex pl-2.5 pt-8 px-5 justify-between items-center">
          <a href="#_">
            <img src="/mountain.png" alt="logo" />
          </a>
        </div>
        <div className="flex flex-col items-start gap-14 justify-between pr-5 py-5 h-full mt-5 md:mt-0">
          <div className="flex flex-col gap-10 h-full">
            <button
              onClick={goToAdminDashboard}
              className={`flex gap-3 items-center ${
                NavOpen ? "hover:bg-[#D8FFFF] px-1 rounded-sm" : ""
              }`}
            >
              <div className="hover:bg-[#D8FFFF] transition-colors duration-300 w-[42px] h-[42px] flex items-center justify-center rounded-sm">
                <img className="h-8 w-8" src="/home.png" alt="logo" />
              </div>
              <span
                className={`${
                  NavOpen ? "block delay-700 delayed-text" : "hidden"
                }`}
              >
                Home
              </span>
            </button>
            <button
              onClick={goToAccommodationManagement}
              className={`flex gap-3 items-center ${
                NavOpen ? "hover:bg-[#D8FFFF] px-1 rounded-sm" : ""
              }`}
            >
              <div className="hover:bg-[#D8FFFF] transition-colors duration-300 w-[42px] h-[42px] flex items-center justify-center rounded-sm">
                <img className="h-8 w-8" src="/accomodation.png" alt="logo" />
              </div>
              <span
                className={`${
                  NavOpen ? "block delay-700 delayed-text" : "hidden"
                }`}
              >
                Accommodation
              </span>
            </button>
            <button
              onClick={goToTouristSpotManagement}
              className={`flex gap-3 items-center ${
                NavOpen ? "hover:bg-[#D8FFFF] px-1 rounded-sm" : ""
              }`}
            >
              <div className="hover:bg-[#D8FFFF] transition-colors duration-300 w-[42px] h-[42px] flex items-center justify-center rounded-sm">
                <img className="h-8 w-8" src="/landmark.png" alt="logo" />
              </div>
              <span
                className={`${
                  NavOpen ? "block delay-700 delayed-text" : "hidden"
                }`}
              >
                Tourist Spot
              </span>
            </button>
            <button
              onClick={goToTransportManagement}
              className={`flex gap-3 items-center ${
                NavOpen ? "hover:bg-[#D8FFFF] px-1 rounded-sm" : ""
              }`}
            >
              <div className="hover:bg-[#D8FFFF] transition-colors duration-300 w-[42px] h-[42px] flex items-center justify-center rounded-sm">
                <img className="h-8 w-8" src="/delivery.png" alt="logo" />
              </div>
              <span
                className={` ${
                  NavOpen ? "block delay-700 delayed-text" : "hidden"
                }`}
              >
                Transport
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:ml-20">
        <div className="px-5 md:px-10 py-5 bg-white flex items-center justify-between w-full fixed z-20">
          <div className="hidden sm:block z-50 bg-transparent">
            <a href="#_" onClick={() => IsNavOpen(!NavOpen)}>
              <img className="h-5 w-5" src="/hamburger.png" alt="" />
            </a>
          </div>
          <div className="flex gap-12 md:mr-16">
            <div>
              <div className="md:flex items-center bg-blue-100 rounded-3xl px-3 py-2.5 hidden border-transparent border-2 group focus-within:border-[#09D7C9]">
                <img className="h-5 w-5" src="/search.png" alt="search" />
                <input
                  type="text"
                  placeholder="Search.."
                  className="bg-transparent px-4 focus:outline-none group "
                />
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <a href="#_" className="md:hidden">
                <img src="/search.png" alt="searchicon" />
              </a>
              <a href="#_">
                <img src="/assets/travelagency-admin/bell.svg" alt="" />
              </a>
              <a href="#_">
                <img className="h-8 w-8" src="/manager.png" alt="profileicon" />
              </a>
              <a href="#_" onClick={() => IsNavOpen(!NavOpen)}>
                <img src="/hamburger.png" alt="" className="sm:hidden" />
              </a>
            </div>
          </div>
        </div>
        <div className="transition-all duration-1000 ease-in-out">
          <div
            className={`flex flex-col w-full justify-between gap-5 p-5 mt-20 ${
              NavOpen
                ? "md:max-w-[calc(100vw_-_100px)] sm:max-w-[calc(100vw_-_160px)] md:pl-36 transition-all duration-500"
                : "md:max-w-[calc(100vw_-_100px)] transition-all duration-500"
            }`}
          >
            <div>
              <h1 className="text-center text-2xl font-bold">
                Tourist Spot Management
              </h1>

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
                    refreshSpots={fetchSpots} // Refresh spots after adding or updating
                  />
                </>
              )}

              {loading ? (
                <p>Loading spots...</p>
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
                                <p className="text-gray-600 text-sm font-semibold mb-2">
                                  Location: {nearbyPlace.location}
                                </p>
                                <p className="text-gray-600 text-sm mb-2">
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
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                              >
                                Previous
                              </button>
                              <button
                                onClick={handleNextPage}
                                disabled={
                                  currentPage * spotsPerPage >=
                                  spot.nearbyPlaces.length
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                              >
                                Next
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
