import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  GridLineOptions,
  BorderOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const meta = {
  title: 'Boilerplate/Chart/BarChart/StackedBarChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const StackedBarChart: Story = {
  render: function Render() {
    const data: ChartData<'bar'> = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
          ),
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Dataset 2',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
          ),
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Dataset 3',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
          ),
          backgroundColor: 'rgb(53, 162, 235)',
        },
      ],
    };

    // x축, y축, 눈금
    const grid: Partial<GridLineOptions> = {
      drawTicks: false,
      // 축을 제외한 눈금 제거
      color: (context) => {
        if (context?.tick?.value !== 0) return '';

        return '#000';
      },
      lineWidth: 1,
      z: 10,
    };

    const border: Partial<BorderOptions> = {
      color: '#000',
      width: 1,
    };

    const options: ChartOptions<'bar'> = {
      plugins: {
        title: { display: true, text: 'Stacked Bar Chart' },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.formattedValue} $`,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid,
          ticks: {
            color: ['#a00173'], // x축 label 색상
            padding: 16,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: ['#a00173'], // y축 label 색상
            callback: (value) => `${value} $`,
            padding: 16,
          },
          grid,
          border,
        },
      },
    };

    return <Bar options={options} data={data} className="w-600" />;
  },
};
