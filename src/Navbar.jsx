import React from 'react';
import { AppBar, Avatar, Box, Button, Toolbar, Typography, styled } from '@mui/material';

import InputModal from './InputModal';






const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Navbar = ({ username }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ paddingLeft: '60px', paddingRight: '60px' }}>
        <StyledToolbar>
          <Typography
            variant="h8" 
            sx={{
              fontFamily: 'Pacifico, cursive', 
              fontWeight: 'normal', 
              fontSize: '1 rem', 
              color: 'white', 
              textShadow: '1px 1px 2px rgba(0,0,0,0.4)', 
              letterSpacing: '2px',
              textAlign: 'center',
              marginTop: '2px',
              marginLeft: '65px'
            }}
          >
            EXPENSE@TRACK
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center",  marginTop: '2px', marginRight: '45px' }}>
            <InputModal>
              Add Expense
            </InputModal>
            <Avatar sx={{ ml: 2 }}>{username ? username.charAt(0).toUpperCase() : 'U'}</Avatar>
            <Typography sx={{ ml: 1 }}>{username || 'User'}</Typography>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
