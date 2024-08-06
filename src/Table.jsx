import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { format } from 'date-fns'; // Import date-fns
import './App.css'; // Make sure to import the CSS file

const columns = [
  { field: 'eid', headerName: 'EID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'category', headerName: 'Category', width: 100 },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 120,
  },
  {
    field: 'date',
    headerName: 'Date',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 280,
    renderCell: (params) => {
      // Format the date to dd-mm-yyyy
      const formattedDate = format(new Date(params.value), 'dd-MM-yyyy');
      return formattedDate;
    },
  },
];

const Table = () => {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/records'); // Ensure the URL matches your backend route
        console.log('Fetched data:', response.data); // Log the fetched data
        setRows(response.data.map((record) => ({
          ...record,
          // id: record._id // Map _id to id for DataGrid
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px',
        paddingTop: '8px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '5px',
          }}
        >
          Expense History
        </Typography>
        <Box sx={{ height: 270, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            getRowId={(row) => row._id} // Use MongoDB's _id as the unique row identifier
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Table;
