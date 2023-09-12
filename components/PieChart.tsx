'use client';
import { default as tailwindTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import type { ChartOptions } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ data: inputData, ...props }: any) => {
  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#ff000',
        formatter: (val, ctx) => {
          if (ctx.dataIndex < 3) {
            return ctx.chart.data.labels?.[ctx.dataIndex];
          } else {
            return 'Rest';
          }
        },
      },
    },
  };
  const data = {
    labels: inputData.map((item: any) => item.label),
    datasets: [
      {
        labels: inputData.map((item: any) => item.label),
        data: inputData.map((item: any) => item.value),
        backgroundColor: [
          theme?.colors?.orange?.[500],
          theme?.colors?.zinc?.[200],
          theme?.colors?.zinc?.[100],
          theme?.colors?.zinc?.[200],
          theme?.colors?.zinc?.[100],
          theme?.colors?.zinc?.[200],
          theme?.colors?.zinc?.[100],
          theme?.colors?.zinc?.[200],
          theme?.colors?.zinc?.[100],
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={cn('', props.className)}>
      {/* @ts-ignore */}
      <Doughnut data={data} plugins={[ChartDataLabels]} options={options} />
    </div>
  );
};

export default PieChart;

const theme: any = tailwindTheme;
