import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Divider, Typography } from '@mui/material';
import { format, parseISO, isFuture } from 'date-fns';
import axios from 'axios';

const categories = ['travel', 'food', 'movie', 'rent', 'loan', 'health', 'misc'];

const InputModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    eid: '',
    title: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    category: '',
  });
  const [dateError, setDateError] = useState('');
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const currentId = useRef(1);

  useEffect(() => {
    if (open) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: format(new Date(), 'yyyy-MM-dd'),
      }));
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'date' ? format(parseISO(value), 'yyyy-MM-dd') : value,
    });
  };

  const handleSubmit = async () => {
    if (isFuture(new Date(formData.date))) {
      setDateError('Date cannot be in the future.');
      return;
    } else {
      setDateError('');
    }

    try {
      const newFormData = {
        ...formData,
        eid: currentId.current, // Assign the integer ID to eid
      };

      // Send data to backend
      await axios.post('http://localhost:3000/records', newFormData);

      alert('Expense added successfully! The page will refresh shortly'); // Show success message
      currentId.current += 1; // Increment the ID for the next submit

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload(); // Reload the window after a 1-second delay
      }, 500);

      handleClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleClear = () => {
    setFormData({
      eid: '',
      title: '',
      amount: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      category: '',
    });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem' }}>Enter Details of Expense:</h2>
        <Divider sx={{ border: '1px solid rgba(0, 0, 0, 0.2)' }} />

        <TextField
          fullWidth
          margin="dense"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: currentDate }} // Restrict to current date or past dates
        />
        {dateError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {dateError}
          </Typography>
        )}
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ border: '1px solid rgba(0, 0, 0, 0.2)', marginTop: '6px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="text"
            onClick={handleClose}
            sx={{ color: 'error.main', mt: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClear}
            sx={{ mt: 1 }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 1 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InputModal;
