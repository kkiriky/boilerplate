import { Meta, StoryObj } from '@storybook/react';
import { default as PulseLoadingComponent } from '@/components/Loading/PulseLoading';

const meta = {
  title: 'Boilerplate/Loading/PulseLoading',
  component: PulseLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PulseLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PulseLoading: Story = {};
