import React, { Fragment } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  CategoryScale,
  LinearScale,
  ChartDataLabels,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display:false,
      position: 'top' ,
    },
    title: {
      display: false,
      text: 'Most registered courses',
    },
  },
};

const labels = ['SWE 466', 'SWE434', 'CSC 215', 'SWE 485', 'SWE 381'];

export const data = {
  labels,
  datasets: [
    {
      // label: 'Dataset 1',
      data: [20,30,40,45,15],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      datalabels: {
        display:true,
        color: 'white',
        labels: {
          title: {
            font: {
              weight: 'bold',
              size:16
            }
          },
         
        },
        // formatter: (val) => {
        //     return Number.isFinite(parseInt(val))&&val!=80? val + '%':val==80?null:null;
        //   }
      },
    },
   
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};
const BarChart = () => {
  return (
    <Fragment>
        <Bar options={options} data={data} />
    </Fragment>
  )
}

export default BarChart