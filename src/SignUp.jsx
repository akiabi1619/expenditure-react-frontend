
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/signup', { username, password });
      setSnackbarMessage('Account created successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/login'), 1000); // Redirect after showing the snackbar
    } catch (error) {
      console.error('Signup failed:', error);
      setSnackbarMessage('Signup failed');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/abcd.jpg)', // Path to your local wallpaper
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ 
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        opacity: 0.9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography
          variant="h4"
          sx={{
            mb: 2, // Margin bottom
            fontFamily: 'Pacifico, cursive',
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
          }}
        >
          Create a New Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
            width: '100%',
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography>
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
