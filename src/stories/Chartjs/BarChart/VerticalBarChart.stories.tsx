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
  GridLineOptions,
  ChartData,
  BorderOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  title: 'Boilerplate/Chart/BarChart/VerticalBarChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalBarChart: Story = {
  render: function Render() {
    const data: ChartData<'bar'> = {
      // x축 label
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // 데이터
      datasets: [
        {
          label: 'Dataset 1', // 범례에 들어갈 label
          data: [...Array(7)].map(() =>
            faker.number.int({ min: 0, max: 1000 })
          ),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // bar의 색을 하나하나 지정 가능
          // backgroundColor: ['#D7D7D7', '#D7D7D7', '#D7D7D7', '#D7D7D7', '#AB98D3'],
          // barThickness: 30,
        },
        {
          label: 'Dataset 2', // 범례에 들어갈 label
          data: [...Array(7)].map(() =>
            faker.number.int({ min: 0, max: 1000 })
          ),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    // 눈금
    const grid: Partial<GridLineOptions> = {
      drawTicks: false,
      // 눈금 제거
      color: () => undefined,
    };

    const border: Partial<BorderOptions> = {
      color: '#000',
      width: 2,
    };

    const options: ChartOptions<'bar'> = {
      plugins: {
        // 제목
        title: { display: true, text: 'Vertical Bar Chart' },
        // bar 위에 데이터 값 표시
        datalabels: {
          formatter: (value, context) => {
            if (context.dataIndex !== context.dataset.data.length - 1)
              return '';

            return `$ ${value}`;
          },
          color: '#6543B6',
          font: { size: 12, weight: 'bold' },
          // 데이터 표시 위치
          anchor: 'end',
          align: 'top',
        },
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
            callback: (value) => `$ ${value}`,
            padding: 16,
          },
          grid, // x축, y축, 눈금
          border,
        },
      },
    };

    return (
      <Bar
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
        className="w-600"
      />
    );
  },
};
