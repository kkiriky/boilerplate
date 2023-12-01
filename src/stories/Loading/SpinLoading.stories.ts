import { Meta, StoryObj } from '@storybook/react';
import { default as SpinLoadingComponent } from '@/components/Loading/SpinLoading';

const meta = {
  title: 'Boilerplate/Loading/SpinLoading',
  component: SpinLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SpinLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpinLoading: Story = {};
