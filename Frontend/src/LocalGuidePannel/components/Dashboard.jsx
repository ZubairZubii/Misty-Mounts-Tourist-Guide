import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlus, FaChartBar, FaUser, FaCog, FaExclamationTriangle, FaBell, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigation = [
    { name: 'Tourist Spots', href: '/local-guide', icon: FaMapMarkerAlt },
    { name: 'Add Tourist Spot', href: '/local-guide/add-spot', icon: FaPlus },
    { name: 'Natural Disasters', href: '/local-guide/natural-disasters', icon: FaExclamationTriangle },
    { name: 'Feedback', href: '/local-guide/feedback', icon: FaChartBar },
    { name: 'Messages', href: '/local-guide/messages', icon: FaUser },
    { name: 'Settings', href: '/local-guide/settings', icon: FaCog },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r text-gray-700 w-72 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="px-4">
          <Link to="/local-guide" className={`${darkMode ? 'text-white' : 'text-gray-900'} flex items-center space-x-3`}>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-900'} p-2 rounded-lg`}>
              <FaMapMarkerAlt className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Local Guide</span>
          </Link>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block py-3 px-4 rounded-lg transition duration-200 ${
                location.pathname === item.href 
                  ? `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'} font-medium` 
                  : `${darkMode ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${location.pathname === item.href ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition duration-200 ${
              darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`flex justify-between items-center py-4 px-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} focus:outline-none md:hidden`}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} rounded-lg transition duration-200`}>
                <FaBell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
            <Link
              to="/local-guide/add-spot"
              className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-900 hover:bg-gray-800'} text-white px-4 py-2 rounded-lg transition duration-300 flex items-center space-x-2`}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Tourist Spot</span>
            </Link>
            <Link
              to="/local-guide/add-natural-disaster"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center space-x-2"
            >
              <FaExclamationTriangle className="w-4 h-4" />
              <span>Report Disaster</span>
            </Link>
            <button
              className={`p-2 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} rounded-lg transition duration-200`}
            >
              <FaSignOutAlt className="w-5 h-5" />
            </button>
          </div>
        </header>
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

