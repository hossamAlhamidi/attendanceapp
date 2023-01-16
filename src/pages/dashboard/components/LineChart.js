import React, { Fragment } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { flatten } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display:false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['Sarwar', 'Mohsen', 'Shamim', 'Chentof', 'Hossam',];

export const data = {
  labels,
  datasets: [
    {
      // label: 'Dataset 1',
      data: [9,5,4,2,3],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      datalabels: {
        display:false,
      }
    },
   
  ],
};

const LineChart = () => {
  return (
    <Fragment>
        <Line options={options} data={data} />
    </Fragment>
  )
}

export default LineChart