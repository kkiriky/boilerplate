import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const meta = {
  title: 'Boilerplate/Chart/DoughnutChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoughnutChart: Story = {
  render: function Render() {
    const data: ChartData<'doughnut'> = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Percentage',
          data: [20, 16, 19, 10, 31, 4],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions<'doughnut'> = {
      plugins: {
        title: { display: true, text: 'Doughnut Chart' },
        datalabels: {
          formatter: (value) => value + ' %',
          color: '#6543B6',
          font: { size: 12, weight: 'bold' },
          // 데이터 표시 위치
          align: 'center',
        },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.formattedValue} %`,
          },
        },
      },
    };

    return (
      <Doughnut
        data={data}
        options={options}
        plugins={[ChartDataLabels as Plugin<'doughnut'>]}
        className="w-600"
      />
    );
  },
};
