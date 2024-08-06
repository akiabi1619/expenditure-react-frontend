import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const categories = ['travel', 'food', 'movie', 'rent', 'loan', 'health', 'misc'];

const EditModal = ({ open, handleClose }) => {
  const [eid, setEid] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  const fetchRecord = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/records/${eid}`);
      const record = response.data;
      setTitle(record.title);
      setAmount(record.amount);
      setDate(record.date);
      setCategory(record.category);
      setIsFetched(true);
    } catch (error) {
      console.error('Error fetching record:', error);
      alert('Error fetching record.');
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/records/${eid}`, {
        title,
        amount,
        date,
        category
      });
      alert('Record updated successfully! The page will refresh shortly'); // Show success message
      setTimeout(() => {
        window.location.reload(); // Reload the window after a 5-second delay
      }, 500); // 5-second delay
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Error updating record.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Expense ID"
          type="text"
          fullWidth
          variant="standard"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
          onBlur={fetchRecord}
          helperText="Enter Expense ID and press anywhere to fetch data"
        />
        {isFetched && (
          <>
            <TextField
              margin="dense"
              //label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              //label="Amount"
              type="number"
              fullWidth
              variant="standard"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              margin="dense"
             // label="Date"
              type="date"
              fullWidth
              variant="standard"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit} disabled={!isFetched}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
