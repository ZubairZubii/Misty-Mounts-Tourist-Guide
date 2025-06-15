import React, { useState } from 'react';
import Login from '../components/LoginSignup/Login';
import Signup from '../components/LoginSignup/Signup';
import WelcomeMessage from '../components/LoginSignup/WelcomeMessage';
import { Paper, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '/logo.png';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (event, newValue) => {
    setIsLogin(newValue === 0);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const panelVariants = {
    hidden: { opacity: 0, x: isLogin ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-950 items-center justify-center p-6 md:p-12">
      <motion.div
        className="relative w-full max-w-7xl bg-white dark:bg-gray-800 rounded-3xl shadow-3xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-700 ease-in-out border border-gray-200 dark:border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={`w-full md:w-2/5 p-16 flex flex-col items-center justify-center text-white transition-all duration-700 ease-in-out relative z-10
            ${isLogin ? 'bg-gradient-to-br from-blue-700 to-indigo-800' : 'bg-gradient-to-br from-green-600 to-teal-700'}
            transform ${isLogin ? 'md:translate-x-0' : 'md:translate-x-full'}
          `}
          variants={panelVariants}
          key={isLogin ? 'login-panel' : 'signup-panel'}
          initial="hidden"
          animate="visible"
        >
          <img src={logo} alt="Misty Mounts Logo" className="h-24 w-auto mb-8 drop-shadow-xl animate-fade-in" />
          <WelcomeMessage isLogin={isLogin} />
        </motion.div>

        <div className={`w-full md:w-3/5 p-16 transition-all duration-700 ease-in-out relative z-0 bg-gray-50 dark:bg-gray-850
          ${isLogin ? 'md:translate-x-0' : 'md:-translate-x-full'}
        `}>
          <div className="mb-10 flex justify-center">
            <Tabs
              value={isLogin ? 0 : 1}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              className="bg-gray-100 dark:bg-gray-700 rounded-full p-1.5 shadow-lg transform scale-105"
              sx={{
                '& .MuiTabs-indicator': {
                  height: '100%',
                  borderRadius: '9999px',
                  backgroundColor: isLogin ? '#2563EB' : '#10B981',
                  transition: 'background-color 0.4s ease-in-out',
                  opacity: 0.95,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  zIndex: 1,
                  color: '#6b7280',
                  minHeight: '48px',
                  padding: '0 24px',
                  transition: 'color 0.3s ease-in-out',
                  '&.Mui-selected': {
                    color: '#fff',
                    fontWeight: 'extrabold',
                  },
                  '&:hover': {
                    color: isLogin ? '#3b82f6' : '#34d399',
                    opacity: 0.8,
                  },
                },
              }}
            >
              <Tab label="Login" sx={{ '&.Mui-selected': { color: '#fff !important' } }} />
              <Tab label="Sign Up" sx={{ '&.Mui-selected': { color: '#fff !important' } }} />
            </Tabs>
          </div>
          <div className="px-6 py-8 md:px-10 md:py-12 bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700">
            {isLogin ? <Login /> : <Signup />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Authentication;