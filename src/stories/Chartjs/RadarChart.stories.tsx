import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Title,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  Filler
);

const meta = {
  title: 'Boilerplate/Chart/RadarChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadarChart: Story = {
  render: function Render() {
    const data: ChartData<'radar'> = {
      labels: [
        'Thing 1',
        'Thing 2',
        'Thing 3',
        'Thing 4',
        'Thing 5',
        'Thing 6',
      ],
      datasets: [
        {
          label: '# of Votes',
          data: [2, 9, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions<'radar'> = {
      plugins: {
        title: { display: true, text: 'Radar Chart' },
      },
      scales: {
        r: {
          // angleLines: { display: false },
          suggestedMin: 0,
          suggestedMax: 9,
        },
      },
    };

    return <Radar data={data} options={options} className="w-600" />;
  },
};
