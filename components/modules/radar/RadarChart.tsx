'use client';

import {
  ChartData,
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

        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };
  const data: ChartData = {
    labels: ['Frequency', 'Speed', 'Distance', 'Elevation'],
    datasets: [
      {
        label: 'Run',
        data: dataset1,
        fill: true,
        backgroundColor: '#EA5D2A20',
        borderColor: '#EA5D2A',
        pointBackgroundColor: '#EA5D2A',
        pointBorderWidth: 1,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#EA5D2A',
        pointRadius: 4,
      },
      {
        label: 'Ride',
        data: dataset2,
        fill: true,
        backgroundColor: '#4f46e520',
        borderColor: '#4f46e5',
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4f46e5',
        pointRadius: 4,
      },
    ],
  };
  //   @ts-ignore
  return <Radar data={data} options={options} />;
};

export default RadarChart;
