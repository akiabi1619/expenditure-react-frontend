import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chart from './Chart.jsx';
import Table from './Table.jsx';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputModal from './InputModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import axios from 'axios';

const Content = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/records');
      const records = response.data;

      setRecords(records);

      const total = records.reduce((sum, record) => sum + record.amount, 0);
      setTotalExpense(total);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const weekly = records
        .filter(record => new Date(record.date) >= oneWeekAgo)
        .reduce((sum, record) => sum + record.amount, 0);
      setWeeklyExpense(weekly);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDeleteExpense = async (eid) => {
    try {
      await axios.delete(`http://localhost:3000/records/${eid}`);
      alert('Expense deleted successfully. The page will refresh shortly'); // Show alert
      setTimeout(() => {
        window.location.reload(); // Reload the window after a 5-second delay
      }, 500);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingTop: '20px',
        position: 'relative',
        paddingLeft: '5px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          '& > :not(style)': {
            m: 1,
            width: 405,
            height: 110,
          },
        }}
      >
        <Paper elevation={4} sx={{ borderRadius: '15px', width: '100%' }}>
          <Typography sx={{ fontSize: 9, textAlign: 'center' }} color="text.secondary" gutterBottom>
            Expense for the week (all categories)
          </Typography>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
            Weekly Expense
            <Divider />
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            {`Rs. ${weeklyExpense.toFixed(2)}`}
          </Typography>
        </Paper>
        <Paper elevation={4} sx={{ borderRadius: '15px', width: '100%', mt: -16 }}>
          <Typography sx={{ fontSize: 9, textAlign: 'center' }} color="text.secondary" gutterBottom>
            Total Expenditure of all categories
          </Typography>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
            Total Expenditure
            <Divider />
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            {`Rs. ${totalExpense.toFixed(2)}`}
          </Typography>
        </Paper>
        <Box sx={{ width: '100%', mt: 1 }}>
          <Paper elevation={4} sx={{ borderRadius: '15px', width: '100%' }}>
            <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
              Expenditure Graph
              <Divider />
            </Typography>
            <Chart />
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4.5, ml: 1 }}>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit" sx={{ ml: 8 }} onClick={handleEditOpen}>
              <EditIcon />
            </Fab>
            <Fab color="error" aria-label="delete" sx={{ ml: 8 }} onClick={handleDeleteOpen}>
              <DeleteIcon />
            </Fab>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            '& > :not(style)': {
              m: 0,
              width: 799,
              height: 140,
            },
          }}
        >
          <Table sx={{ width: '100%', height: '100%', ml: 3 }} records={records} /> {/* Pass records to Table */}
        </Box>
      </Box>
      <InputModal open={open} handleClose={handleClose} />
      <EditModal open={editOpen} handleClose={handleEditClose} />
      <DeleteModal open={deleteOpen} handleClose={handleDeleteClose} handleDeleteExpense={handleDeleteExpense} />
    </Box>
  );
};

export default Content;
