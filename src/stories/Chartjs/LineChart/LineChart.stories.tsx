import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  GridLineOptions,
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
  Legend
);

const meta = {
  title: 'Boilerplate/Chart/LineChart/LineChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineChart: Story = {
  render: function Render() {
    const data: ChartData<'line'> = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
          ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // 점의 색상
        },
        {
          label: 'Dataset 2',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
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
      responsive: true,
      plugins: {
        title: { display: true, text: 'Line Chart' },
      },
      scales: {
        x: {
          ticks: {
            color: ['#a00173'], // y축 label 색상
            padding: 16,
          },
          grid,
          border,
        },
        y: {
          ticks: {
            color: ['#a00173'], // y축 label 색상
            padding: 16,
            callback: (value) => `${value} $`,
          },
          grid,
          border,
        },
      },
    };

    return <Line options={options} data={data} className="w-600" />;
  },
};
