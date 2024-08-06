import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const Chart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    values: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/records');
        const records = response.data;

        // Process the records to get the data you need for the chart
        const categories = ['travel', 'food', 'movie', 'rent', 'loan', 'health', 'misc'];
        const data = categories.map(category => {
          const categoryTotal = records
            .filter(record => record.category === category)
            .reduce((sum, record) => sum + record.amount, 0);
          return categoryTotal;
        });

        setChartData({
          labels: categories,
          values: data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BarChart
      xAxis={[{ data: chartData.labels, scaleType: 'band',label:'Category' }]}
      series={[{ data: chartData.values, color: '#4A90E2',label:'Amount(in Rs.)' }]} // Set the bar color to a lighter shade of blue
      width={400}
      height={355}
    />
  );
};

export default Chart;

