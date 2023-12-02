import type { Meta, StoryObj } from '@storybook/react';
import { default as HorizontalSliderComponent } from '@/components/Slider/HorizontalSlider';

const meta = {
  title: 'Boilerplate/Slider/HorizontalSlider',
  component: HorizontalSliderComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HorizontalSliderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalSlider: Story = {};
