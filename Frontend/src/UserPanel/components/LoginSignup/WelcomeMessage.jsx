import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaMountain, FaUserPlus } from 'react-icons/fa';

const WelcomeMessage = ({ isLogin }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
  };

  return (
    <div className="text-white text-center p-4">
      <motion.div variants={iconVariants} initial="hidden" animate="visible" className="mb-6">
        {isLogin ? <FaMountain className="text-7xl drop-shadow-lg" /> : <FaUserPlus className="text-7xl drop-shadow-lg" />}
      </motion.div>
      <motion.div variants={textVariants} initial="hidden" animate="visible">
        <Typography variant="h3" className="mb-4 font-extrabold drop-shadow-xl leading-tight">
          {isLogin ? 'Welcome Back!' : 'Join Misty Mounts!'}
        </Typography>
        <Typography variant="h6" className="font-light opacity-90 drop-shadow-md max-w-sm mx-auto">
          {isLogin
            ? 'Glad to see you again! Continue your journey with us.'
            : 'Start your new adventure with Misty Mounts. Register today and explore!'}
        </Typography>
      </motion.div>
    </div>
  );
};

export default WelcomeMessage;
