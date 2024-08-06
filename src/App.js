import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './SignUp';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check session storage for authentication state
    const storedUser = sessionStorage.getItem('username');
    const storedToken = sessionStorage.getItem('authToken');

    if (storedUser && storedToken) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = (user, token) => {
    setIsAuthenticated(true);
    setUsername(user);
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('authToken', token); // Store token in sessionStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken'); // Remove token on logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={isAuthenticated ? (
          <Home username={username} onLogout={handleLogout} /> // Pass onLogout to Home
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>
    </Router>
  );
};

export default App;
