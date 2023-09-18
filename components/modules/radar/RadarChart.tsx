'use client';

import {
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const RadarChart = ({ dataset1, dataset2 }: any) => {
  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        tension: 0.5,
      },
    },
    scales: {
      r: {
        type: 'radialLinear',
        grid: {
          circular: true,
        },
        beginAtZero: true,
      },
    },
  };
  const data = {
    labels: ['Frequency', 'Speed', 'Distance', 'Elevation'],
    datasets: [
      {
        label: 'My First Dataset',
        data: dataset1,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'My Second Dataset',
        data: dataset2,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };
  //   @ts-ignore
  return <Radar data={data} options={options} />;
};

export default RadarChart;
