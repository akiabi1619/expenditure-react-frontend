import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log('Login response:', response.data);

      if (response.data.success) {
        onLogin(username, response.data.token); // Pass username and token to onLogin
        setSnackbarMessage('Login successful');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/'), 1000);
      } else {
        setSnackbarMessage('Invalid credentials');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setSnackbarMessage('Login failed');
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
        backgroundImage: 'url(/abcd.jpg)',
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
            fontFamily: 'Pacifico, cursive',
            fontWeight: 'normal',
            fontSize: '2rem',
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
            letterSpacing: '2px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          EXPENSE@TRACK
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
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
            Login
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography>
              Don't have an account? <a href="/signup">Sign Up</a>
            </Typography>
          </Box>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Login;
