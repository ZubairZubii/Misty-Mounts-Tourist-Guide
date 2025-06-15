import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaUserTag } from 'react-icons/fa';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!type) {
      setError('Please select a user type');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Signup successful! You can now log in.');
      setEmail('');
      setUsername('');
      setPassword('');
      setType('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="space-y-8 p-4"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Typography variant="h4" className="text-center mb-8 font-extrabold text-gray-900 dark:text-white leading-tight">
        Join Misty Mounts!
      </Typography>
      {error && <Alert severity="error" className="mb-6 text-base">{error}</Alert>}
      {success && <Alert severity="success" className="mb-6 text-base">{success}</Alert>}
      
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
            fontSize: '0.7rem',
            color: '#6b7280', // Gray 500
            transform: 'translate(14px, -9px) scale(0.9)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.9)',
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
              boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)',
            },
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
          },
          '& .MuiInputBase-input': {
            padding: '16px 12px 16px 12px',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
              fontWeight: 'normal',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginLeft: '12px'}}>
              <FaEnvelope className="text-gray-500 text-xl mr-2" />
            </InputAdornment>
          ),
          placeholder: "Enter your email",
        }}
      />
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mb-6"
        InputLabelProps={{
          shrink: true,
          sx: {
            fontSize: '0.7rem',
            color: '#6b7280',
            transform: 'translate(14px, -9px) scale(0.9)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.9)',
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
              boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)',
            },
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
          },
          '& .MuiInputBase-input': {
            padding: '16px 12px 16px 12px',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
              fontWeight: 'normal',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginLeft: '12px'}}>
              <FaUser className="text-gray-500 text-xl mr-2" />
            </InputAdornment>
          ),
          placeholder: "Enter your username",
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
            fontSize: '0.7rem',
            color: '#6b7280',
            transform: 'translate(14px, -9px) scale(0.9)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.9)',
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
              boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)',
            },
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
          },
          '& .MuiInputBase-input': {
            padding: '16px 12px 16px 12px',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
              fontWeight: 'normal',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginLeft: '12px'}}>
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
          placeholder: "Create your password",
        }}
      />
      <TextField
        fullWidth
        select
        label="User Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="mb-6"
        InputLabelProps={{
          shrink: true,
          sx: {
            fontSize: '0.7rem',
            color: '#6b7280',
            transform: 'translate(14px, -9px) scale(0.9)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.9)',
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
              boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)',
            },
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
          },
          '& .MuiInputBase-input': {
            padding: '16px 12px 16px 12px',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
              fontWeight: 'normal',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{marginLeft: '12px'}}>
              <FaUserTag className="text-gray-500 text-xl mr-2" />
            </InputAdornment>
          ),
          placeholder: "Select user type",
        }}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="local guide">Local Guide</MenuItem>
      </TextField>
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-extrabold py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.01] uppercase tracking-wide text-lg"
      >
        {loading ? 'SIGNING UP...' : 'SIGNUP'}
      </Button>
    </motion.form>
  );
};

export default Signup;

