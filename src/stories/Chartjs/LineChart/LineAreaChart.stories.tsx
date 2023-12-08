import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  GridLineOptions,
  ChartData,
  ChartOptions,
  BorderOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const meta = {
  title: 'Boilerplate/Chart/LineChart/LineAreaChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineAreaChart: Story = {
  render: function Render() {
    const data: ChartData<'line'> = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          fill: true,
          label: 'Dataset 1',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: 0, max: 1000 })
          ),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)', // 점의 색상
        },
      ],
    };

    // x축, y축, 눈금
    const grid: Partial<GridLineOptions> = {
      drawTicks: false,
    };

    const border: Partial<BorderOptions> = {
      color: '#000',
      width: 2,
    };

    const options: ChartOptions<'line'> = {
      plugins: {
        title: { display: true, text: 'Area Chart' },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.formattedValue} $`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: ['#a00173'], // x축 label 색상
            // minRotation: 60,
            padding: 16,
          },
          grid, // x축, y축, 눈금
          border,
        },
        y: {
          ticks: {
            color: ['#a00173'], // y축 label 색상
            padding: 16,
            callback: (value) => `${value} $`,
          },
          grid, // x축, y축, 눈금
          border,
          beginAtZero: true,
        },
      },
    };

    return <Line options={options} data={data} className="w-600" />;
  },
};
