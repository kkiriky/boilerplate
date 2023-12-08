import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
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
  title: 'Boilerplate/Chart/BarChart/HorizontalBarChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalBarChart: Story = {
  render: function Render() {
    const data: ChartData<'bar'> = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
          ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [...Array(7)].map(() =>
            faker.number.int({ min: -1000, max: 1000 })
          ),

          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    // x축, y축, 눈금
    const grid: Partial<GridLineOptions> = {
      drawTicks: false,
      // 축을 제외한 눈금 제거
      color: (context) => {
        if (context?.tick?.value !== 0 || context?.tick?.label === 'January') {
          return '';
        }

        return '#000';
      },
      lineWidth: 1,
      z: 10,
    };

    const border: Partial<BorderOptions> = {
      color: 'transparent',
    };

    const options: ChartOptions<'bar'> = {
      // y축을 기본축으로 설정(수평 차트)
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        // 범례
        legend: { position: 'right' },
        // 제목
        title: { display: true, text: 'Horizontal Bar Chart' },
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
            callback: (value) => `${value} $`,
          },
          grid, // x축, y축, 눈금
          border,
        },
        y: {
          ticks: {
            color: ['#a00173'], // y축 label 색상
            padding: 16,
          },
          grid, // x축, y축, 눈금
          beginAtZero: true,
          border,
        },
      },
    };

    return <Bar options={options} data={data} className="w-600" />;
  },
};
