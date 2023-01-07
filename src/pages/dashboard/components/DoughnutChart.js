import React, { Fragment } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement,ChartDataLabels, Tooltip, Legend);
const options={
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      legend: {
        position: 'left',
        display: false,
      },
      title: {
        display: false,
        text: 'Most Sections that has absent students',
      },
    },
  }
export const data = {
  labels: ['22354', '22344', '12554', '32545', '11456', '22546'],
  datasets: [
    {
      // label: '# of Votes',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        
      ],
     
        borderWidth: 0,
        hoverOffset: 40,
        cutout: 80,
        hoverBorderJoinStyle: 'round',
        radius: '75%',
        datalabels: {
            
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold',
                size:8
              }
            },
           
          },
          formatter: (val,context) => {
            console.log(context,"val")
            return context.chart.data.labels[context.dataIndex];
            }
        },
    },
  ],
};

const DoughnutChart = () => {
  return (
    <Fragment>
        <Doughnut data={data} options={options}/>
    </Fragment>
  )
}

export default DoughnutChart