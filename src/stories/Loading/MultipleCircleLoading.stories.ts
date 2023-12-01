import { Meta, StoryObj } from '@storybook/react';
import { default as MultipleCircleLoadingComponent } from '@/components/Loading/MultipleCircleLoading';

const meta = {
  title: 'Boilerplate/Loading/MultipleCircleLoading',
  component: MultipleCircleLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MultipleCircleLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleCircleLoading: Story = {};
