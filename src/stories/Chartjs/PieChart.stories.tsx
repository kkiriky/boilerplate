import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
  Legend,
  ChartOptions,
  Plugin,
  ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Title, Legend);

const meta = {
  title: 'Boilerplate/Chart/PieChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PieChart: Story = {
  render: function Render() {
    const data: ChartData<'pie'> = {
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

    const options: ChartOptions<'pie'> = {
      plugins: {
        title: { display: true, text: 'Pie Chart' },
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
      <Pie
        options={options}
        data={data}
        plugins={[ChartDataLabels as Plugin<'pie'>]}
        className="w-600"
      />
    );
  },
};
