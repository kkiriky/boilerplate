import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const meta = {
  title: 'Boilerplate/Chart/ScatterChart',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScatterChart: Story = {
  render: function Render() {
    const data: ChartData<'scatter'> = {
      datasets: [
        {
          label: 'A dataset',
          data: [...Array(100)].map(() => ({
            x: faker.number.int({ min: -100, max: 100 }),
            y: faker.number.int({ min: -100, max: 100 }),
          })),
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };

    const options: ChartOptions<'scatter'> = {
      plugins: {
        title: { display: true, text: 'Scatter Chart' },
      },
    };

    return <Scatter data={data} options={options} className="w-600" />;
  },
};
