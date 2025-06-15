import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/user/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userType', data.type);

      if (data.type === 'local guide') {
        navigate('/local-guide');
      } else if (data.type === 'user') {
        navigate('/');
      } else {
        throw new Error('Unknown user type');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="space-y-8 p-4"
      onSubmit={handleLogin}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Typography variant="h4" className="text-center mb-8 font-extrabold text-gray-900 dark:text-white leading-tight">
        Welcome Back!
      </Typography>
      {error && <Alert severity="error" className="mb-6 text-base">{error}</Alert>}
      
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-6"
        InputLabelProps={{
          shrink: true,
          sx: {
            fontSize: '0.75rem',
            color: '#6b7280', // Gray 500
            transform: 'translate(14px, -12px) scale(0.9)', // Adjusted transform for small label
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -12px) scale(0.9)', // Ensure it stays shrunk
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: '#f8f8f8', // Lighter gray background
            padding: '0', // Reset padding here for better control via InputBase-input
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)', // Blue 500 shadow
            },
            '& fieldset': {
              borderColor: '#e2e8f0', // Light border
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1', // Slightly darker border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6', // Blue 500
            },
          },
          '& .MuiInputBase-input': {
            padding: '18px 12px 18px 0', // Adjusted input text padding: top/bottom 18px, left 12px, right 0
            '&::placeholder': {
              color: '#9ca3af', // Gray 400 for placeholder
              opacity: 1, // Ensure placeholder is visible
              fontWeight: 'normal',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginLeft: '16px'}}>
              <FaEnvelope className="text-gray-500 text-xl mr-2" />
            </InputAdornment>
          ),
          placeholder: "Enter your email", // Placeholder text
        }}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-6"
        InputLabelProps={{
          shrink: true,
          sx: {
            fontSize: '0.75rem',
            color: '#6b7280',
            transform: 'translate(14px, -12px) scale(0.9)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -12px) scale(0.9)',
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: '#f8f8f8',
            padding: '0',
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
            },
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
          '& .MuiInputBase-input': {
            padding: '18px 12px 18px 0',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
              fontWeight: 'normal',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginLeft: '16px'}}>
              <FaLock className="text-gray-500 text-xl mr-2" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="medium"
                sx={{
                  color: '#9ca3af',
                  '&:hover': {
                    color: '#6b7280',
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          placeholder: "Enter your password", // Placeholder text
        }}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-extrabold py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.01] uppercase tracking-wide text-lg"
      >
        {loading ? 'LOGGING IN...' : 'LOGIN'}
      </Button>
      <Typography variant="body2" className="text-center mt-6 text-gray-700 dark:text-gray-400 text-base">
        Forgot password? <Link to="#" className="text-blue-600 hover:underline font-semibold">Reset it</Link>
      </Typography>
    </motion.form>
  );
};

export default Login;
