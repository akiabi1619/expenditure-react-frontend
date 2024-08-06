import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const DeleteModal = ({ open, handleClose, handleDeleteExpense }) => {
  const [eid, setEid] = useState('');

  const handleChange = (e) => {
    setEid(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await handleDeleteExpense(eid);
      handleClose();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleClear = () => {
    setEid('');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2">
          Delete Record
        </Typography>
        <Divider sx={{ my: 2 }} />
        <TextField
          fullWidth
          label="Expense ID"
          variant="outlined"
          value={eid}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
