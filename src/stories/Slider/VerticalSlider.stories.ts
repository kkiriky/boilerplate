import type { Meta, StoryObj } from '@storybook/react';
import { default as VerticalSliderComponent } from '@/components/Slider/VerticalSlider';

const meta = {
  title: 'Boilerplate/Slider/VerticalSlider',
  component: VerticalSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VerticalSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalSlider: Story = {};
